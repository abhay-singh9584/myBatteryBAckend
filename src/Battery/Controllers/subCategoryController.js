const {subcategory,category}=require('../../models')
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
            subcategoryPosition: Joi.number().required(),
            categoryId: Joi.number().required(),
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
            where : {subcategoryName : body.subcategoryName ,
                categoryId:body.categoryId
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
            categoryId:body.categoryId
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

        const {subcategoryId ,categoryId} = req.query;

        let options = {
            where :{},
            include:[
                {
                    model : category,
                    attributes :["id","categoryName"],
                    where :{}
                }
            ],
            attributes : { exclude :["createdAt","updatedAt"] }
        }

        if(categoryId){
            options["include"][0]["where"]['id'] =  categoryId 
        }

        let method = subcategory.findAll(options);

        if(subcategoryId){
            options['where']['id'] = subcategoryId;
            method = subcategory.findOne(options)   
        }

        method.then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No Sub Category Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Sub Category Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
         })
    },

    subCategoryDeleteController : async (req , res ,next) => {

        let subcategoryExistingData=await subcategory.findByPk(req.params.id)

        if(!subcategoryExistingData){
            errorResponseWithoutData(res,'No Subcategory Data Found',FAIL)
        }

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
            subcategoryPosition: Joi.number().required(),
            categoryId: Joi.number().required(),
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
            categoryId:body.categoryId

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
