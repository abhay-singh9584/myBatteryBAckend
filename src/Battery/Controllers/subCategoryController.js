const {subcategory}=require('../../models/index')
const Joi=require('joi');
const { validationErrorResponseData, validationMessageKey, successResponseWithoutData, successResponseData, errorResponseWithoutData } = require('../../Helper/Responce');
const { NO_DATA, SUCCESS, FAIL } = require('../../Helper/Constant');
module.exports = {

    subCategoryCreateController : async (req,res,next)=>{
        
        body=req.body
        const reqObj = {
            subcategoryName: Joi.string().required(),
            subcategoryDesc : Joi.string().optional().allow(''),
            subcategoryIcon: Joi.string().optional().allow(''),
            subcategoryPosition: Joi.string().required(),
            };
        
            const schema = Joi.object(reqObj);
            const { error } = schema.validate(body);
        
            if (error) {
                return validationErrorResponseData(
                    res,
                    (validationMessageKey("Service validation", error))
                );
            }

        await subcategory.create({
             subcategoryName: body.subcategoryName,
             subcategoryDesc: body.subcategoryDesc,
             subcategoryIcon: body.subcategoryIcon,
             subcategoryPosition: body.subcategoryPosition,
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

     subCategoryGetService : async (req,res,next)=>{
        await subcategory.findAll()
        .then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something went wrong',FAIL)
         })
    },

     subCategoryFindOneController : async (req, res,next) => {
        await subcategory.findByPk(req.params.id)
        .then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something went wrong',FAIL)
         })
    },

    subCategoryDeleteController : async (req , res ,next) => {
        await subcategory.destroy({
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

    subCategoryUpdateController : async (req,res,next)=>{
        body=req.body

        const reqObj = {
            subcategoryName: Joi.string().required(),
            subcategoryDesc : Joi.string().optional().allow(''),
            subcategoryIcon: Joi.string().optional().allow(''),
            subcategoryPosition: Joi.number().required()
            };
        
            const schema = Joi.object(reqObj);
            const { error } = schema.validate(body);
        
            if (error) {
                return validationErrorResponseData(
                    res,
                    (validationMessageKey("Service validation", error))
                );
            }

        await subcategory.update({ 
            subcategoryName: body.subcategoryName,
            subcategoryDesc: body.subcategoryDesc,
            subcategoryIcon: body.subcategoryIcon,
            subcategoryPosition: body.subcategoryPosition,
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
