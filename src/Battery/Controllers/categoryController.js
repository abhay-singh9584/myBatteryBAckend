const {category}=require('../../models/index')
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
                // brandLogo: body.brandLogo,
                // brandDesc: body.brandDesc,
                // brandIcon: body.brandIcon,
                brandPosition: body.brandPosition,
            }
        }).then(async(data)=>{
            if(data){
                return errorResponseWithoutData(res, res.__('Duplicate data cannot be added'),CONFLICT)
            }
            await category.create({
                categoryName: body.categoryName,
                categoryDesc: body.categoryDesc,
                categoryIcon: body.categoryIcon,
                categoryPosition: body.categoryPosition,
            })
            .then((data)=>{
                if(!data){
                    return successResponseWithoutData(res, res.__('No Category Data Found'),NO_DATA)
                }
                return successResponseData(res,data,SUCCESS,res.__('Category Data Added Successfully'))
            }).catch((err)=>{ 
                return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
            })
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something went wrong',FAIL)
        })
    },

    categoryGetService : async (req,res)=>{
        await category.findAll()
        .then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No Category Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Category Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
         })
    },

     categoryFindOneController : async (req, res) => {
        await category.findByPk(req.params.id)
        .then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No Category Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Category Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
         })
    },

    categoryDeleteController : async (req , res ) => {
        await category.destroy({
            where: {
              id: req.params.id
            }
          }).then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No Category Data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('Category Data Deleted Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
         })
    },

    categoryUpdateController : async (req,res)=>{
        body=req.body

        const reqObj = {
            categoryName: Joi.string().required(),
            categoryDesc : Joi.string().optional().allow(''),
            categoryIcon: Joi.string().optional().allow(''),
            categoryPosition: Joi.number().required(),
            };
        
            const schema = Joi.object(reqObj);
            const { error } = schema.validate(body);
        
            if (error) {
                return validationErrorResponseData(
                    res,
                    (validationMessageKey("Service validation", error))
                );
            }

        await category.update({ 
            categoryName: body.categoryName,
            categoryDesc: body.categoryDesc,
            categoryIcon: body.categoryIcon,
            categoryPosition: body.categoryPosition,
         }, {
            where: {
              id:req.params.id
            }
          }).then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No Category Data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('Category Data Updated Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
         })
    },

//     bulkInsertionCategoryController : async (req,res) => {
//         body=req.body
//         body.JSONData.forEach(data => {
//             category.findAll({
//                 where: {
//                   brandName:data.brandName
//                 }
//               }).then(duplicateData => {
//                 if(!(duplicateData.length > 0)){
//                     category.create(data)
//                         .then((data) => successResponseData(res,data,200,'Successfull Bulk Inserstion'))
//                         .catch((err) =>  errorResponseWithoutData(res,'Bul insertion failed'))
//                 } 
//                 else{					
//                     errorResponseWithoutData(res,'Unique data inserted,failed for duplicate data')					
//                 }

//             }) 
//             .catch(err => errorResponseWithoutData(res,'Failed to insert data'));
//         })
//     }

}