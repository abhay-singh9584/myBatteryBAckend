const {secondaryName,batteryBrand}=require('../../models')
const {successResponseData,validationMessageKey, successResponseWithoutData, errorResponseWithoutData, errorResponseData, validationErrorResponseData}=require('../../Helper/Responce')
const Joi = require('joi')
const { SUCCESS, FAIL, NO_DATA } = require('../../Helper/Constant')



module.exports ={

    createSecondaryName : async (req,res)=>{

        body=req.body
        const reqObj = {
            secondaryName: Joi.string().required(),
            brandId: Joi.number().required(),
        };

    const schema = Joi.object(reqObj);
    const { error } = schema.validate(body);

    if (error) {
        return validationErrorResponseData(
            res,
            (validationMessageKey("Service Validation", error))
        );
    }

    let batteryDetails = await batteryBrand.findByPk(body.brandId);

    if(!batteryDetails){
        return errorResponseWithoutData(
            res,res.__('No Battery Brand Exists With Given Id'),FAIL)
    }

    let secondaryNameObj = {
        secondaryName: body.secondaryName,
        brandId: body.brandId,
    }

    let secondaryNameDetails =  await secondaryName.findOne({
        where : {secondaryName : body.secondaryName 
            , brandId : body.brandId 
        }})

    if(secondaryNameDetails){
        return errorResponseWithoutData(res,res.__('secondaryName Already Exists'),FAIL)
    }
        
    await secondaryName.create(secondaryNameObj)
        .then((data)=>{
        if(!data){
            return successResponseWithoutData(res, res.__('No Data Found'),NO_DATA)
        }
        return successResponseData(res,data,SUCCESS,res.__('secondaryName Added Successfully'))
        }).catch((err)=>{ 

            console.log( "eerr" , err);

            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
        })
    },

    secondaryNameGetService : async (req,res)=>{

        const {secondaryNameId ,brandId} = req.query;
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

        let method = secondaryName.findAll(options);

        if(secondaryNameId){
            options['where']['id'] = secondaryNameId;
            method = secondaryName.findOne(options)   
        }

        method.then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No secondaryName Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('secondaryName Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
        })
    },

    secondaryNameDeleteController: async (req , res ) => {

        let secondaryNameExistingData=await secondaryName.findByPk(req.params.id)

        if(!secondaryNameExistingData){
            errorResponseWithoutData(res,res.__('No Such Id Found'),NO_DATA)
        }

        await secondaryName.destroy({
            where: {
            id: req.params.id
            }
        }).then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No secondaryName Data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('Data Deleated Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
        })
    },

    secondaryNameUpdateController : async (req,res)=>{

        body=req.body
        const reqObj = {
            secondaryName: Joi.string().required(),
            brandId: Joi.number().required(),
            };
    
        const schema = Joi.object(reqObj);
        const { error } = schema.validate(body);
    
        if (error) {
            return validationErrorResponseData(
                res,
                (validationMessageKey("Service Validation", error))
            );
        }
    
        const secondaryNameDetails=await secondaryName.findOne({where:{id:req.params.id}})
        if(!secondaryNameDetails){
            return errorResponseWithoutData(res,'No Such Id Found',NO_DATA)
        }

    await secondaryName.update({ 
        secondaryName: body.secondaryName,
        brandId: body.brandId,
     }, {
        where: {
          id:req.params.id
        }
      }).then((data)=>{
        if(!data){
            return successResponseWithoutData(res, res.__('No secondaryName Data Found'),NO_DATA)
        }
        return successResponseWithoutData(res,res.__('Data Updated Successfully'),SUCCESS)
    }).catch((err)=>{ 
        return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
     })
    }
}