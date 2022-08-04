const {category,subcategory}=require('../../models/index')
const {successResponseData, successResponseWithoutData, errorResponseWithoutData, errorResponseData, validationErrorResponseData, validationMessageKey}=require('../../Helper/Responce')

const {SUCCESS, FAIL,NO_DATA} = require("../../Helper/Constant")
const Joi=require('joi')

module.exports = {

    categoryCreateController : async (req,res)=>{
        
        body=req.body
        const reqObj = {
            categoryName: Joi.string().required(),
            categoryDesc : Joi.string().optional().allow(''),
            categoryIcon: Joi.string().optional().allow(''),
            categoryPosition: Joi.number().required(),
            subCategoryId : Joi.number().required() 
            };
        
            const schema = Joi.object(reqObj);
            const { error } = schema.validate(body);
        
            if (error) {
                return validationErrorResponseData(
                    res,
                    (validationMessageKey("Service Validation", error))
                );
            }
            
    
            let categoryPositionDetails =  await category.findOne({
                where : {
                    categoryPosition:body.categoryPosition
            }})
            
            let subCategoryDetails = await subcategory.findByPk(body.subCategoryId);

            if(!subCategoryDetails){
                return errorResponseWithoutData(
                    res,res.__('No Sub Category Exists With Given Id'),FAIL)
            }
    
            if(categoryPositionDetails){
                return errorResponseWithoutData(res,res.__('Category Position Already Exists'),FAIL)
            }

            await category.create({
                categoryName: body.categoryName,
                categoryDesc: body.categoryDesc,
                categoryIcon: body.categoryIcon,
                categoryPosition: body.categoryPosition,
                subCategoryId : body.subCategoryId
            })
            .then((data)=>{
                if(!data){
                    return errorResponseWithoutData(res, res.__('No Category Data Found'),NO_DATA)
                }
                return successResponseData(res,data,SUCCESS,res.__('Category Data Added Successfully'))
            }).catch((err)=>{ 
                return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
            })
    },

    categoryGetService : async (req,res)=>{

        const {categoryId} = req.query;
        let options = {
            where :{},
            include:[
                {
                    model : subcategory,
                    attributes :["id","subCategoryName"],
                    where :{}
                }
            ],
            attributes : { exclude :["createdAt","updatedAt"] }
        }
  
        if(categoryId){
            options["where"]['id'] =  categoryId 
        }

        let method = category.findAll(options);

        method.then((data)=>{
            if(!data.length>0){
                return errorResponseWithoutData(res, res.__('No Category Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Category Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
         })
    },

    categoryDeleteController : async (req , res ) => {

        let categoryExistingData=await category.findByPk(req.params.id)

        if(!categoryExistingData){
            errorResponseWithoutData(res,res.__('No Such Id Found'),NO_DATA)
        }

        await category.destroy({
            where: {
              id: req.params.id
            }
          }).then((data)=>{
            if(!data.length>0){
                return errorResponseWithoutData(res, res.__('No Category Data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('Category Data Deleted Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
         })
    },

    categoryUpdateController : async (req,res)=>{

        body=req.body
        const reqObj = {
            categoryName: Joi.string().required(),
            categoryDesc : Joi.string().optional().allow(''),
            categoryIcon: Joi.string().optional().allow(''),
            categoryPosition: Joi.number().required(),
            subCategoryId : Joi.number().required() 
            };
        
        const schema = Joi.object(reqObj);
        const { error } = schema.validate(body);
    
        if (error) {
            return validationErrorResponseData(
                res,
                (validationMessageKey("Service Validation", error))
            );
        }

        const categoryDetails=await category.findOne({where:{id:req.params.id}})
        if(!categoryDetails){
            return errorResponseWithoutData(res,'No Such Id Found',NO_DATA)
        }

        await category.update({ 
            categoryName: body.categoryName,
            categoryDesc: body.categoryDesc,
            categoryIcon: body.categoryIcon,
            categoryPosition: body.categoryPosition,
            subCategoryId : body.subCategoryId
         }, {
            where: {
              id:req.params.id
            }
          }).then((data)=>{
            if(!data.length>0){
                return errorResponseWithoutData(res, res.__('No Category Data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('Category Data Updated Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
         })
    },
}