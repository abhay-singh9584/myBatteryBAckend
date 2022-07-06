const {modelDimension}=require('../../models/index')
const {successResponseData, successResponseWithoutData, errorResponseWithoutData, errorResponseData, validationErrorResponseData, validationMessageKey}=require('../../Helper/Responce')

const {SUCCESS, FAIL,NO_DATA} = require("../../Helper/Constant")
const Joi=require('joi')

module.exports = {

    modelDimensionCreateController : async (req,res)=>{
        
        const body=req.body

        const reqObj = {
            modelName: Joi.string().required(),
            modelDesc : Joi.string().optional().allow(''),
            modelIcon: Joi.string().optional().allow(''),
            modelPosition: Joi.number().required(),
            length:Joi.number().optional().allow(''),
            width:Joi.number().optional().allow(''),
            height:Joi.number().optional().allow(''),
            layout:Joi.number().optional().allow(''),
            acidIndicator:Joi.number().optional().allow(''),
            currentCapacity:Joi.number().optional().allow(''),
            mrp:Joi.number().optional().allow(''),
            mop:Joi.number().optional().allow(''),
            dp:Joi.number().optional().allow(''),
            nlc:Joi.number().optional().allow(''),
            warranty:Joi.number().optional().allow(''),
            warrantyDesc:Joi.string().optional().allow(''),
            weight:Joi.number().optional().allow(''),
            };

            const modelObj={
                modelName: body.modelName,
                modelDesc : body.modelDesc,
                modelIcon: body.modelIcon,
                modelPosition: body.modelPosition,
                length:body.length,
                width:body.width,
                height:body.height,
                layout:body.layout,
                acidIndicator:body.acidIndicator,
                currentCapacity:body.currentCapacity,
                mrp:body.mrp,
                mop:body.mop,
                dp:body.dp,
                nlc:body.nlc,
                warranty:body.warranty,
                warrantyDesc:body.warrantyDesc,
                weight:body.weight,
            }
        
        const schema = Joi.object(reqObj);
        const { error } = schema.validate(body);
    
        if (error) {
            return validationErrorResponseData(
                res,
                (validationMessageKey("Service Validation", error))
            );
        }
        
        let modelDimensionDetails =  await modelDimension.findOne({
            where : {modelName : body.modelName  
            }})

        let modelDimensionPositionDetails =  await modelDimension.findOne({
            where : {
                modelPosition:body.modelPosition
        }})

        if(modelDimensionDetails){
            return errorResponseWithoutData(res,res.__('Model Already Exists'),FAIL)
        }
        else if(modelDimensionPositionDetails){
            return errorResponseWithoutData(res,res.__('Model Position Already Exists'),FAIL)
        }

        await modelDimension.create(modelObj)
        .then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No Model Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Model Data Added Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
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
            if(!data){
                return successResponseWithoutData(res, res.__('No Model Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Model Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
         })
    },

    modelDimensionDeleteController : async (req , res ) => {

        let modelDimensionExistingData=await modelDimension.findByPk(req.params.id)

        if(!modelDimensionExistingData){
            errorResponseWithoutData(res,'No Model Data Found',FAIL)
        }

        await modelDimension.destroy({
            where: {
              id: req.params.id
            }
          }).then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No Model Data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('model Data Deleted Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
         })
    },

    modelDimensionUpdateController : async (req,res)=>{

        body=req.body
        const reqObj = {
            modelName: Joi.string().required(),
            modelDesc : Joi.string().optional().allow(''),
            modelIcon: Joi.string().optional().allow(''),
            modelPosition: Joi.number().required(),
            length:Joi.number().optional().allow(''),
            width:Joi.number().optional().allow(''),
            height:Joi.number().optional().allow(''),
            layout:Joi.number().optional().allow(''),
            acidIndicator:Joi.number().optional().allow(''),
            currentCapacity:Joi.number().optional().allow(''),
            mrp:Joi.number().optional().allow(''),
            mop:Joi.number().optional().allow(''),
            dp:Joi.number().optional().allow(''),
            nlc:Joi.number().optional().allow(''),
            warranty:Joi.number().optional().allow(''),
            warrantyDesc:Joi.string().optional().allow(''),
            weight:Joi.number().optional().allow(''),
            };
        const modelObj={
            modelName: body.modelName,
            modelDesc : body.modelDesc,
            modelIcon: body.modelIcon,
            modelPosition: body.modelPosition,
            length:body.length,
            width:body.width,
            height:body.height,
            layout:body.layout,
            acidIndicator:body.acidIndicator,
            currentCapacity:body.currentCapacity,
            mrp:body.mrp,
            mop:body.mop,
            dp:body.dp,
            nlc:body.nlc,
            warranty:body.warranty,
            warrantyDesc:body.warrantyDesc,
            weight:body.weight,
        }
        
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
            if(!data){
                return successResponseWithoutData(res, res.__('No Model Data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('Model Data Updated Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
         })
    },
}