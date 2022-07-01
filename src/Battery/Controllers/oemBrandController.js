const {oemBrand}=require('../../models/index')
const Joi=require('joi');
const { validationErrorResponseData, validationMessageKey, successResponseWithoutData, successResponseData, errorResponseWithoutData } = require('../../Helper/Responce');
const { NO_DATA, SUCCESS, FAIL } = require('../../Helper/Constant');
module.exports = {

    oemBrandCreateController : async (req,res,next)=>{
        
        body=req.body
        const reqObj = {
            OEMBrand: Joi.string().required(),
            OEMBrandImage : Joi.string().optional().allow(''),
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

        await oemBrand.create({
             OEMBrand: body.OEMBrand,
             OEMBrandImage: body.OEMBrandImage,
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

     oemBrandGetService : async (req,res,next)=>{
        await oemBrand.findAll()
        .then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something went wrong',FAIL)
         })
    },

     oemBrandFindOneController : async (req, res,next) => {
        await oemBrand.findByPk(req.params.id)
        .then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something went wrong',FAIL)
         })
    },

    oemBrandDeleteController : async (req , res ,next) => {
        await oemBrand.destroy({
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

    oemBrandUpdateController : async (req,res,next)=>{
        body=req.body

        const reqObj = {
            OEMBrand: Joi.string().required(),
            OEMBrandImage : Joi.string().optional().allow(''),
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

        await oemBrand.update({ 
            OEMBrand: body.OEMBrand,
            OEMBrandImage: body.OEMBrandImage,
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
