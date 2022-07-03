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
                    (validationMessageKey("Service Validation", error))
                );
            }
            
            let subCategoryDetails =  await subcategory.findOne({
                where : {subcategoryName : body.subcategoryName 
                }})
                
            let subCategoryPositionDetails =  await subcategory.findOne({
                where : {
                    subcategoryPosition:body.subcategoryPosition
            }})
        
            if(subCategoryDetails){
                return errorResponseWithoutData(res,res.__('SubCategory Already Exists'),FAIL)
            }
            else if(subCategoryPositionDetails){
                return errorResponseWithoutData(res,res.__('SubCategory Position Already Exists'),FAIL)
            }
                
            await subcategory.create({
                subcategoryName: body.subcategoryName,
                subcategoryDesc: body.subcategoryDesc,
                subcategoryIcon: body.subcategoryIcon,
                subcategoryPosition: body.subcategoryPosition,
            })
            .then((data)=>{
                if(!data){
                    return successResponseWithoutData(res, res.__('No Sub Category Data Found'),NO_DATA)
                }
                return successResponseData(res,data,SUCCESS,res.__('Sub Category Data Added Successfully'))
            }).catch((err)=>{ 
                return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
            })
     },

     subCategoryGetService : async (req,res,next)=>{
        await subcategory.findAll()
        .then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No Sub Category Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Sub Category Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
         })
    },

     subCategoryFindOneController : async (req, res,next) => {
        await subcategory.findByPk(req.params.id)
        .then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No Sub Category Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Sub Category Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
         })
    },

    subCategoryDeleteController : async (req , res ,next) => {
        await subcategory.destroy({
            where: {
              id: req.params.id
            }
          }).then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No Sub Category Data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('Sub Category Data Deleted Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
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
                    (validationMessageKey("Service Validation", error))
                );
            }


        const subcategoryDetails=await subcategory.findOne({where:{id:req.params.id}})
        if(!subcategoryDetails){
            return errorResponseWithoutData(res,'No Such Id Found',NO_DATA)
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
                return successResponseWithoutData(res, res.__('No Sub Category Data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('Sub Category Data Updated Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
         })
    },
}
