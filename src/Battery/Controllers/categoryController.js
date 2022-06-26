const {category}=require('../models/index')
const {successResponseData, successResponseWithoutData, errorResponseWithoutData, errorResponseData}=require('../../Helper/Responce')
const {isAuthenticRequest}=require('../../Middleware/apiAuth')

exports.categoryCreateController=async (req,res,next)=>{
    body=req.body
    isAuthenticRequest(req,res,next);
    await category.create({
         categoryName: body["categoryName"],
         categoryDesc: body["categoryDesc"],
         categoryIcon: body["categoryIcon"],
         categoryPosition: body["categoryPosition"],
    })
    .then((i)=>{
        successResponseData(res,i,'Data Added Successfully')
    }).catch((err)=>{
         console.log(err);
     })
 }

 exports.categoryGetService=async (req,res,next)=>{
    isAuthenticRequest(req,res,next);
    await category.findAll()
    .then((i)=>{
        successResponseData(res,i,'Data Found Successfully')
    }).catch((err)=>{
         console.log(err);
     })
}

 exports.categoryFindOneController = async (req, res,next) => {
    isAuthenticRequest(req,res,next);
    await category.findByPk(req.params.id)
    .then((i)=>{
        successResponseData(res,i,'Data Successfully Found')
    }).catch((err)=>{
         console.log(err);
     })
}

exports.categoryDeleteController = async (req , res ,next) => {
    isAuthenticRequest(req,res,next);
    await category.destroy({
        where: {
          id: req.params.id
        }
      }).then((i)=>{
        successResponseWithoutData(res,'Data Deleted Successfully',200)
    }).catch((err)=>{
         errorResponseWithoutData(res,'Unable to delete data')
     })
}

exports.categoryUpdateController=async (req,res,next)=>{
    body=req.body
    isAuthenticRequest(req,res,next);
    await category.update({ 
        categoryName: body["categoryName"],
        categoryDesc: body["categoryDesc"],
        categoryIcon: body["categoryIcon"],
        categoryPosition: body["categoryPosition"],
     }, {
        where: {
          id:req.params.id
        }
      }).then((i)=>{
        successResponseWithoutData(res,'Data Updated Successfully',200)
    }).catch((err)=>{
         console.log(err);
     })
}

exports.bulkInsertionCategoryController = (req,res,next) => {
	isAuthenticRequest(req,res,next)
    body=req.body
    body.JSONData.forEach(data => {
        category.findAll({
            where: {
              brandName:data.brandName
            }
          }).then(duplicateData => {
            if(!(duplicateData.length > 0)){
                category.create(data)
                    .then((data) => successResponseData(res,data,200,'Successfull Bulk Inserstion'))
                    .catch((err) =>  errorResponseWithoutData(res,'Bul insertion failed'))
            } 
            else{					
                errorResponseWithoutData(res,'Unique data inserted,failed for duplicate data')					
            }
            
        }) 
        .catch(err => errorResponseWithoutData(res,'Failed to insert data'));
    })
}