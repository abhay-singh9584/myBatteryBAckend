const {oemModel}=require('../../models/index')
const Joi=require('joi');
const {batteryBrand}=require('../../models/index')

const { validationErrorResponseData, validationMessageKey, successResponseWithoutData, successResponseData, errorResponseWithoutData } = require('../../Helper/Responce');
const { NO_DATA, SUCCESS, FAIL } = require('../../Helper/Constant');
module.exports = {

    oemModelCreateController : async (req,res,next)=>{
        
        body=req.body
        const reqObj = {
            OEMModelName: Joi.string().required(),
            FuelType: Joi.string().required(),
            OEMModelDesc : Joi.string().optional().allow(''),
            OEMModelImage: Joi.string().optional().allow(''),
            OEMModelPosition: Joi.number().required(),
            OEMBrandId:Joi.number().required()
            };
        
            const schema = Joi.object(reqObj);
            const { error } = schema.validate(body);
        
            if (error) {
                return validationErrorResponseData(
                    res,
                    (validationMessageKey("Service Validation", error))
                );
            }
        
            let oemModelDetails =  await oemModel.findOne({
                where : {OEMModelName : body.OEMModelName 
                    , OEMBrandId : body.OEMBrandId 
                }}).catch((err)=>console.log('ioeiroweior',err))
    
            let oemModelPositionDetails =  await oemModel.findOne({
                where : {
                    OEMModelPosition:body.OEMModelPosition
            }})
    
            if(oemModelDetails){
                return errorResponseWithoutData(res,res.__('oemModel Already Exists'),FAIL)
            }
            if(oemModelPositionDetails){
                return errorResponseWithoutData(res,res.__('oemModel Position Already Exists'),FAIL)
            }
        
        await oemModel.create({
            OEMModelName: body.OEMModelName,
            FuelType: body.FuelType,
            OEMModelImage: body.OEMModelImage,
            OEMModelPosition: body.OEMModelPosition,
            OEMBrandId: body.OEMBrandId,
        })
        .then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No OEM Model Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('OEM Model Data Added Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
        })
        
     },

     oemModelGetService : async (req,res,next)=>{
        const {oemModelId ,brandId} = req.query;

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

        let method = oemModel.findAll(options);

        if(oemModelId){
            options['where']['id'] = oemModelId;
            method = oemModel.findOne(options)   
        }

        // console.log(" :: brandId :: ", brandId);
        // return res.send(options)

        method
        .then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No OEM Model Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('OEM Model Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
         })
    },

     

    oemModelDeleteController : async (req , res ,next) => {
        await oemModel.destroy({
            where: {
              id: req.params.id
            }
          }).then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No OEM Model Data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('OEM Model Data Deleted Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
         })
    },

    oemModelUpdateController : async (req,res,next)=>{
        body=req.body

        const reqObj = {
            OEMModelName: Joi.string().required(),
            FuelType: Joi.string().required(),
            OEMModelDesc : Joi.string().optional().allow(''),
            OEMModelImage: Joi.string().optional().allow(''),
            OEMModelPosition: Joi.number().required(),
            OEMBrandId:Joi.number().required()
            };
        
            const schema = Joi.object(reqObj);
            const { error } = schema.validate(body);
        
            if (error) {
                return validationErrorResponseData(
                    res,
                    (validationMessageKey("Service Validation", error))
                );
            }
        
        const oemModelDetails=await oemModel.findOne({where:{id:req.params.id}})
        if(!oemModelDetails){
            return errorResponseWithoutData(res,'No Such Id Found',NO_DATA)
        }

        await oemModel.update({ 
            OEMModelName: body.OEMModelName,
            FuelType: body.FuelType,
            OEMModelImage: body.OEMModelImage,
            OEMModelPosition: body.OEMModelPosition,
            OEMBrandId: body.OEMBrandId,
         }, {
            where: {
              id:req.params.id
            }
          }).then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No OEM Model Data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('OEM Model Data Updated Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
         })
    },
}
