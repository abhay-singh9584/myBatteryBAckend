const {segment,batteryBrand}=require('../../models')
const {successResponseData,validationMessageKey, successResponseWithoutData, errorResponseWithoutData, errorResponseData, validationErrorResponseData}=require('../../Helper/Responce')
const Joi = require('joi')
const { SUCCESS, FAIL, NO_DATA } = require('../../Helper/Constant')

module.exports ={

    createSegment : async (req,res)=>{
       
        body=req.body
        const reqObj = {
            segmentName: Joi.string().required(),
            segmentDesc : Joi.string().optional().allow(''),
            segmentIcon: Joi.string().optional().allow(''),
            segmentPosition: Joi.string().required(),
            segmentBrandId: Joi.string().required(),
        };

    const schema = Joi.object(reqObj);
    const { error } = schema.validate(body);

    if (error) {
        return validationErrorResponseData(
            res,
            (validationMessageKey("Service Validation", error))
        );
    }

    let batteryDetails = await batteryBrand.findByPk(body.segmentBrandId);

    if(!batteryDetails){
        return errorResponseWithoutData(
            res,res.__('No Battery Brand Exists With Given Id'),FAIL)
    }

    let segmentObj = {
        segmentName: body.segmentName,
        segmentDesc: body.segmentDesc,
        segmentIcon: body.segmentIcon,
        segmentPosition: body.segmentPosition,
        segmentBrandId: body.segmentBrandId,
    }

    let segmentDetails =  await segment.findOne({
        where : {segmentName : body.segmentName 
            , segmentBrandId : body.segmentBrandId 
        }})

    let segmentPositionDetails =  await segment.findOne({
        where : {
            segmentPosition:body.segmentPosition
    }})

    if(segmentDetails){
        return errorResponseWithoutData(res,res.__('Segment Already Exists'),FAIL)
    }
    else if(segmentPositionDetails){
        return errorResponseWithoutData(res,res.__('Segment Position Already Exists'),FAIL)
    }

    await segment.create(segmentObj)
        .then((data)=>{
        if(!data){
            return successResponseWithoutData(res, res.__('No Data Found'),NO_DATA)
        }
        return successResponseData(res,data,SUCCESS,res.__('Segment Added Successfully'))
        }).catch((err)=>{ 

            console.log( "eerr" , err);

            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
        })
    },

    segmentGetService : async (req,res)=>{

        const {segmentId ,brandId} = req.query;

        let options = {
            where :{},
            include:[
                {
                    model : batteryBrand,
                    attributes :["id","brandName"],
                    where :{}
                }
            ],
            attributes : { exclude :["createdAt","updatedAt"] }
        }
        
        if(brandId){
            options["include"][0]["where"]['id'] =  brandId 
        }

        let method = segment.findAll(options);

        if(segmentId){
            options['where']['id'] = segmentId;
            method = segment.findOne(options)   
        }

        method.then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No Segment Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Segment Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
        })
    },

    segmentDeleteController: async (req , res ) => {

        let segmentExistingData=await segment.findByPk(req.params.id)

        if(!segmentExistingData){
            errorResponseWithoutData(res,res.__('No Such Id Found'),NO_DATA)
        }

        await segment.destroy({
            where: {
            id: req.params.id
            }
        }).then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No Segment Data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('Data Deleated Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
        })
    },

    segmentUpdateController : async (req,res)=>{

    body=req.body
    const reqObj = {
        segmentName: Joi.string().required(),
        segmentDesc : Joi.string().optional().allow(''),
        segmentIcon: Joi.string().optional().allow(''),
        segmentPosition: Joi.string().required(),
        segmentBrandId: Joi.string().required(),
        };
    
    const schema = Joi.object(reqObj);
    const { error } = schema.validate(body);

    if (error) {
        return validationErrorResponseData(
            res,
            (validationMessageKey("Service Validation", error))
        );
    }

    const segmentDetails=await segment.findOne({where:{id:req.params.id}})
    if(!segmentDetails){
        return errorResponseWithoutData(res,'No Such Id Found',NO_DATA)
    }

    await segment.update({ 
        segmentName: body.segmentName,
        segmentDesc: body.segmentDesc,
        segmentIcon: body.segmentIcon,
        segmentPosition: body.segmentPosition,
        segmentBrandName: body.segmentLogo,
     }, {
        where: {
          id:req.params.id
        }
      }).then((data)=>{
        if(!data){
            return successResponseWithoutData(res, res.__('No Segment Data Found'),NO_DATA)
        }
        return successResponseWithoutData(res,res.__('Data Updated Successfully'),SUCCESS)
    }).catch((err)=>{ 
        return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
     })
    }

}