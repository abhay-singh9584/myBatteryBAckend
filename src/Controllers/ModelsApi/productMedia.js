const {productMedia}=require('../../models/index')
const Joi=require('joi');
const { validationErrorResponseData, validationMessageKey, successResponseWithoutData, successResponseData, errorResponseWithoutData } = require('../../Helper/Responce');
const { NO_DATA, SUCCESS, FAIL } = require('../../Helper/Constant');

module.exports = {

    productMediaCreateController : async (req,res)=>{
        
        body=req.body
        const reqObj = {
            ProductImages: Joi.string().optional().allow(''),
            productVideos: Joi.string().optional().allow(''),
            };
        
        const schema = Joi.object(reqObj);
        const { error } = schema.validate(body);
    
        if (error) {
            return validationErrorResponseData(
                res,
                (validationMessageKey("Service Validation", error))
            );
        }

        let productMediaDetails =  await productMedia.findOne({
            where : {ProductImages: body.ProductImages,
                productVideos: body.productVideos,
        }})

        if(productMediaDetails.length>0){
            return errorResponseWithoutData(res,res.__('Data Already Exists'),FAIL)
        }

    
        await productMedia.create({
            ProductImages: body.ProductImages,
            productVideos: body.productVideos,
        })
        .then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No Product Media Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Product Media Data Added Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
        })
     },

     productMediaGetService : async (req,res,next)=>{

        const {productMediaId} = req.query;
        let options = {
            where :{},
            
            attributes : { exclude :["createdAt","updatedAt"] }
        }
        
        if(productMediaId){
            options["where"]['id'] =  productMediaId 
        }

        let method = productMedia.findAll(options);

        method.then((data)=>{
            if(!data.length>0){
                return successResponseWithoutData(res, res.__('No Product Media Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Product Media Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
         })
    },


    productMediaDeleteController : async (req , res ,next) => {

        let productMediaExistingData=await productMedia.findByPk(req.params.id)

        if(!productMediaExistingData){
            errorResponseWithoutData(res,res.__('No Such Id Found'),NO_DATA)
        }

        await productMedia.destroy({
            where: {
              id: req.params.id
            }
          }).then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No Product Media Data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('Product Media Data Deleted Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
         })
    },

    productMediaUpdateController : async (req,res,next)=>{

        body=req.body
        const reqObj = {
            productImages: Joi.string().required().allow(''),
            productVideos: Joi.string().optional().allow(''),
            };
        
        const schema = Joi.object(reqObj);
        const { error } = schema.validate(body);
    
        if (error) {
            return validationErrorResponseData(
                res,
                (validationMessageKey("Service Validation", error))
            );
        }

        const productMediaDetails=await productMedia.findOne({where:{id:req.params.id}})
        if(!productMediaDetails){
            return errorResponseWithoutData(res,'No Such Id Found',NO_DATA)
        }

        await productMedia.update({ 
            productVideos: body.productVideos,
            productImages: body.productImages,
         }, {
            where: {
              id:req.params.id
            }
          }).then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No Product Media Data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('Product Media Data Updated Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
         })
    },
}
