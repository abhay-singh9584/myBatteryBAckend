const {oemModel}=require('../../models/index')
const Joi=require('joi');
const { validationErrorResponseData, validationMessageKey, successResponseWithoutData, successResponseData, errorResponseWithoutData } = require('../../Helper/Responce');
const { NO_DATA, SUCCESS, FAIL } = require('../../Helper/Constant');
module.exports = {

    oemModelCreateController : async (req,res,next)=>{
        
        body=req.body
        const reqObj = {
            oemModel: Joi.string().required(),
            oemModelImage : Joi.string().optional().allow(''),
            OEMB: Joi.string().optional().allow(''),
            };
        
            const schema = Joi.object(reqObj);
            const { error } = schema.validate(body);
        
            if (error) {
                return validationErrorResponseData(
                    res,
                    (validationMessageKey("Service validation", error))
                );
            }

        await oemModel.create({
             oemModel: body.oemModel,
             oemModelImage: body.oemModelImage,
             OEMB: body.OEMB,
        })
        .then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Data Added Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something went wrong',FAIL)
         })
     },

     oemModelGetService : async (req,res,next)=>{
        await oemModel.findAll()
        .then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something went wrong',FAIL)
         })
    },

     oemModelFindOneController : async (req, res,next) => {
        await oemModel.findByPk(req.params.id)
        .then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something went wrong',FAIL)
         })
    },

    oemModelDeleteController : async (req , res ,next) => {
        await oemModel.destroy({
            where: {
              id: req.params.id
            }
          }).then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('Data Deleted Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something went wrong',FAIL)
         })
    },

    oemModelUpdateController : async (req,res,next)=>{
        body=req.body

        const reqObj = {
            oemModel: Joi.string().required(),
            oemModelImage : Joi.string().optional().allow(''),
            OEMB: Joi.string().optional().allow(''),
            };
        
            const schema = Joi.object(reqObj);
            const { error } = schema.validate(body);
        
            if (error) {
                return validationErrorResponseData(
                    res,
                    (validationMessageKey("Service validation", error))
                );
            }

        await oemModel.update({ 
            oemModel: body.oemModel,
            oemModelImage: body.oemModelImage,
            OEMB: body.OEMB,
         }, {
            where: {
              id:req.params.id
            }
          }).then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('Data Updated Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something went wrong',FAIL)
         })
    },
}