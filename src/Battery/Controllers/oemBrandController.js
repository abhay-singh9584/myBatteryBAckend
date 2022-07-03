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
        await batteryBrand.findOne({
            where:{
            brandName: body.brandName,
            brandLogo: body.brandLogo,
            brandDesc: body.brandDesc,
            brandIcon: body.brandIcon,
            brandPosition: body.brandPosition,
        }
        }).then(async (data)=>{
            if(data){
                return errorResponseWithoutData(res, res.__('Duplicate data cannot be added'),CONFLICT)
            }
            await oemBrand.create({
                OEMBrand: body.OEMBrand,
                OEMBrandImage: body.OEMBrandImage,
                OEMB: body.OEMB,
            })
            .then((data)=>{
                if(!data){
                    return successResponseWithoutData(res, res.__('No OEM Brand Data Found'),NO_DATA)
                }
                return successResponseData(res,data,SUCCESS,res.__('OEM Brand Data Added Successfully'))
            }).catch((err)=>{ 
                return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
            })
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something went wrong',FAIL)
        })
     },

     oemBrandGetService : async (req,res,next)=>{
        await oemBrand.findAll()
        .then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No OEM Brand Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('OEM Brand Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
         })
    },

     oemBrandFindOneController : async (req, res,next) => {
        await oemBrand.findByPk(req.params.id)
        .then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No OEM Brand Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('OEM Brand Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
         })
    },

    oemBrandDeleteController : async (req , res ,next) => {
        await oemBrand.destroy({
            where: {
              id: req.params.id
            }
          }).then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No OEM Brand Data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('OEM Brand Data Deleted Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
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
                return successResponseWithoutData(res, res.__('No OEM Brand Data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('OEM Brand Data Updated Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
         })
    },
}
