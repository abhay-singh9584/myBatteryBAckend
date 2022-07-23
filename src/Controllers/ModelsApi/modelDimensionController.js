const {modelDimension}=require('../../models/index')
const {successResponseData, successResponseWithoutData, errorResponseWithoutData, errorResponseData, validationErrorResponseData, validationMessageKey}=require('../../Helper/Responce')

const {SUCCESS, FAIL,NO_DATA} = require("../../Helper/Constant")
const Joi=require('joi')

module.exports = {

    modelDimensionCreateController : async (req,res)=>{
        
        const body=req.body

        const reqObj = {
          lengthUnit: Joi.string().optional().allow(""),
          lengthValue: Joi.number().optional().allow(""),
          widthUnit: Joi.string().optional().allow(""),
          widthValue: Joi.number().optional().allow(""),
          heightUnit: Joi.string().optional().allow(""),
          heightValue: Joi.number().optional().allow(""),
          layoutValue: Joi.number().optional().allow(""),
          acidIndicatorUnit: Joi.string().optional().allow(""),
          acidIndicatorValue: Joi.number().optional().allow(""),
          currentCapacityUnit: Joi.string().optional().allow(""),
          currentCapacityValue: Joi.number().optional().allow(""),
          warrantyUnit: Joi.string().optional().allow(""),
          warrantyValue: Joi.number().optional().allow(""),
          warrantyDesc: Joi.string().optional().allow(""),
          weightUnit: Joi.string().optional().allow(""),
          weightValue: Joi.number().optional().allow(""),
        };

        const modelObj = {
            lengthUnit: body.lengthUnit,
            lengthValue: body.lengthValue,
            widthUnit: body.widthUnit,
            widthValue: body.widthValue,
            heightUnit: body.heightUnit,
            heightValue: body.heightValue,
            layoutValue: body.layoutValue,
            acidIndicatorUnit: body.acidIndicatorUnit,
            acidIndicatorValue: body.acidIndicatorValue,
            currentCapacityUnit: body.currentCapacityUnit,
            currentCapacityValue: body.currentCapacityValue,
            warrantyUnit: body.warrantyUnit,
            warrantyValue: body.warrantyValue,
            warrantyDesc: body.warrantyDesc,
            weightUnit: body.weightUnit,
            weightValue: body.weightValue,
        };
        
        const schema = Joi.object(reqObj);
        const { error } = schema.validate(body);
    
        if (error) {
            return validationErrorResponseData(
                res,
                (validationMessageKey("Service Validation", error))
            );
        }
        const modelDimensionDetails=modelDimension.findOne({where : modelObj})
        
        if(modelDimensionDetails){
            return errorResponseWithoutData(res,res.__('Data Already Exist'),FAIL)
        }
        
        await modelDimension.create(modelObj)
        .then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No Model Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Model Data Added Successfully'))
        }).catch((err)=>{ 
            console.log(err)
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
        })
    },

    modelDimensionGetService : async (req,res)=>{

        const {modelDimensionId} = req.query;
        let options = {
            where :{},
            attributes : { exclude :["createdAt","updatedAt"] }
        }
  
        if(modelDimensionId){
            options["where"]['id'] =  modelDimensionId 
        }

        let method = modelDimension.findAll(options);

        method.then((data)=>{
            if(!data.length>0){
                return successResponseWithoutData(res, res.__('No Model Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Model Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
         })
    },

    modelDimensionDeleteController : async (req , res ) => {

        let modelDimensionExistingData=await modelDimension.findByPk(req.params.id)

        if(!modelDimensionExistingData){
            errorResponseWithoutData(res,res.__('No Such Id Found'),NO_DATA)
        }

        await modelDimension.destroy({
            where: {
              id: req.params.id
            }
          }).then((data)=>{
            if(!data.length>0){
                return successResponseWithoutData(res, res.__('No Model Data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('model Data Deleted Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
         })
    },

    modelDimensionUpdateController : async (req,res)=>{

        body=req.body
        const reqObj = {
          lengthUnit: Joi.string().optional().allow(""),
          lengthValue: Joi.number().optional().allow(""),
          widthUnit: Joi.string().optional().allow(""),
          widthValue: Joi.number().optional().allow(""),
          heightUnit: Joi.string().optional().allow(""),
          heightValue: Joi.number().optional().allow(""),
          layoutValue: Joi.number().optional().allow(""),
          acidIndicatorUnit: Joi.string().optional().allow(""),
          acidIndicatorValue: Joi.number().optional().allow(""),
          currentCapacityUnit: Joi.string().optional().allow(""),
          currentCapacityValue: Joi.number().optional().allow(""),
          warrantyUnit: Joi.string().optional().allow(""),
          warrantyValue: Joi.number().optional().allow(""),
          warrantyDesc: Joi.string().optional().allow(""),
          weightUnit: Joi.string().optional().allow(""),
          weightValue: Joi.number().optional().allow(""),
        };
        const modelObj = {
          lengthUnit: body.lengthUnit,
          lengthValue: body.lengthValue,
          widthUnit: body.widthUnit,
          widthValue: body.widthValue,
          heightUnit: body.heightUnit,
          heightValue: body.heightValue,
          layoutValue: body.layoutValue,
          acidIndicatorUnit: body.acidIndicatorUnit,
          acidIndicatorValue: body.acidIndicatorValue,
          currentCapacityUnit: body.currentCapacityUnit,
          currentCapacityValue: body.currentCapacityValue,
          warrantyUnit: body.warrantyUnit,
          warrantyValue: body.warrantyValue,
          warrantyDesc: body.warrantyDesc,
          weightUnit: body.weightUnit,
          weightValue: body.weightValue,
        };
        
        const schema = Joi.object(reqObj);
        const { error } = schema.validate(body);
    
        if (error) {
            return validationErrorResponseData(
                res,
                (validationMessageKey("Service Validation", error))
            );
        }

        const modelDimensionDetails=await modelDimension.findOne({where:{id:req.params.id}})
        if(!modelDimensionDetails){
            return errorResponseWithoutData(res,'No Such Id Found',NO_DATA)
        }

        await modelDimension.update(modelObj, {
            where: {
              id:req.params.id
            }
          }).then((data)=>{
            if(!data.length>0){
                return successResponseWithoutData(res, res.__('No Model Data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('Model Data Updated Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
         })
    },
}
