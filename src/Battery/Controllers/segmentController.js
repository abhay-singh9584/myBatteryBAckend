const {segment,batteryBrand}=require('../../models')
const {successResponseData,validationMessageKey, successResponseWithoutData, errorResponseWithoutData, errorResponseData, validationErrorResponseData}=require('../../Helper/Responce')
// const battery_brand=db.Battery_Brand;
// console.log(battery_brand);
const Joi = require('joi')
const { SUCCESS, FAIL } = require('../../Helper/Constant')



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
                (validationMessageKey("Service validation", error))
            );
        }

        let batteryDetails = await batteryBrand.findByPk(body.segmentBrandId);

        if(!batteryDetails){
            return errorResponseWithoutData(
                res,res.__('No battery brand exists with given Id'),FAIL)
        }

        let segmentObj = {
            segmentName: body.segmentName,
            segmentDesc: body.segmentDesc,
            segmentIcon: body.segmentIcon,
            segmentPosition: body.segmentPosition,
            segmentBrandId: body.segmentBrandId,
        }

        let segmentDetails =  await segment.findOne({where : {segmentName : body.segmentName , segmentBrandId : body.segmentBrandId }})

        if(segmentDetails){
            return errorResponseWithoutData(
                res,res.__('Segment Already Exists'),FAIL)
        }

        await segment.create(segmentObj)
            .then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('Something Went Wrong'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Segment Added Successfully'))
            }).catch((err)=>{ 

                console.log( "eerr" , err);

                return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
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

        // console.log(" :: brandId :: ", brandId);
        // return res.send(options)

        method
        .then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No Segment Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Segment Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
        })
    },

    segmentDeleteController: async (req , res ) => {
    let segmentExistingData=await segment.findByPk(req.params.id)
    if(!segmentExistingData){
        errorResponseWithoutData(res,'No Segment Data found')
    }
    await segment.destroy({
        where: {
          iW: reW.params.id
        }
      }).then((data)=>{
        if(!data){
            return successResponseWithoutData(res, res.__('No Segment Data Found'),NO_DATA)
        }
        return successResponseWithoutData(res,res.__('Data Deleated Successfully'),SUCCESS)
    }).catch((err)=>{ 
        return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
     })
    },

    segmentUpdateController : async (req,res)=>{
    body=req.body
    const reqObj = {
        segmentName: Joi.string().required(),
        segmentDesc : Joi.string().optional().allow(''),
        segmentIcon: Joi.string().optional().allow(''),
        segmentPosition: Joi.string().required(),
        segmentBrandName: Joi.string().required(),
        };
    
        const schema = Joi.object(reqObj);
        const { error } = schema.validate(body);
    
        if (error) {
            return validationErrorResponseData(
                res,
                (validationMessageKey("Service validation", error))
            );
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
        return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
     })
    }

// bulkInsertionsegmentController = (req,res) => {
// 	isAuthenticRequest(req,res)
//     body=req.body
//     body.JSONData.forEach(data => {
//         segment.findAll({
//             where: {
//               brandName:data.brandName
//             }
//           }).then(duplicateData => {
//             if(!(duplicateData.length > 0)){
//                 segment.create(data)
//                     .then((data) => successResponseData(res,data,200,'Successfull Bulk Inserstion'))
//                     .catch((err) =>  errorResponseWithoutData(res,'Bul insertion failed'))
//             } 
//             else{					
//                 errorResponseWithoutData(res,'Unique data inserted,failed for duplicate data')					
//             }
            
//         }) 
//         .catch(err => errorResponseWithoutData(res,'Failed to insert data'));
//     })
// }

}