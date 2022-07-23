const {batteryDetail,productModel,productMedia,productPricing,productType,batteryBrand,group,modelDimension,oemModel,scheme,segment,category}=require('../../models')
const {successResponseData,validationMessageKey, successResponseWithoutData, errorResponseWithoutData, errorResponseData, validationErrorResponseData}=require('../../Helper/Responce')

const Joi = require('joi')
const { SUCCESS, FAIL, NO_DATA, CONFLICT } = require('../../Helper/Constant')
// const productModel = require('./productModel')



module.exports={

    createBatteryDetails : async (req,res)=>{

        const body=req.body

        const reqObj = {
          primaryName: Joi.string().required(),
          secondaryName: Joi.string().required(),
          productImage: Joi.string().required(),
          brandId: Joi.number().required(),
          modelId: Joi.number().required(),
          groupId: Joi.number().required(),
          categoryId: Joi.number().required(),
          oemModelId: Joi.number().required(),
          schemeId: Joi.number().required(),
          segmentId: Joi.number().required(),
          productMediaId: Joi.number().optional().allow(''),
          productPricingId: Joi.number().required(),
          productTypeId: Joi.number().required(),
          modelDimensionId: Joi.number().required(),
        };
  
        const schema = Joi.object(reqObj);
        const { error } = schema.validate(body);

        if (error) {
            return validationErrorResponseData(
                res,
                (validationMessageKey("Service Validation", error))
            );
        }

        const detailsObj = {
          primaryName: body.primaryName,
          secondaryName: body.secondaryName,
          productImage: body.productImage,
          brandId: body.brandId,
          modelId: body.modelId,
          groupId: body.groupId,
          categoryId: body.categoryId,
          oemModelId: body.oemModelId,
          schemeId: body.schemeId,
          segmentId: body.segmentId,
          productMediaId: body.productMediaId,
          productPricingId: body.productPricingId,
          productTypeId: body.productTypeId,
          modelDimensionId: body.modelDimensionId,
        };


        let brandDetails = await batteryBrand.findByPk(body.brandId);
        let modelDetails = await modelDimension.findByPk(body.modelId);
        let groupDetails = await group.findByPk(body.groupId);
        let categoryDetails = await category.findByPk(body.categoryId);
        let oemModelDetails = await oemModel.findByPk(body.oemModelId);
        let schemeDetails = await scheme.findByPk(body.schemeId);
        let segmentDetails = await segment.findByPk(body.segmentId);
        let productMediaDetails = await productMedia.findByPk(body.productMediaId);
        let productPricingDetails = await productPricing.findByPk(body.productPricingId);
        let productTypeDetails = await productType.findByPk(body.productTypeId);
        let modelDimensionDetails = await modelDimension.findByPk(body.modelDimensionId);

        if (!brandDetails) {
          return errorResponseWithoutData(
            res,
            res.__("No Battery Brand Exists With Given Id"),
            FAIL
          );
        } else if (!modelDetails) {
          return errorResponseWithoutData(
            res,
            res.__("No Model Exists With Given Id"),
            FAIL
          );
        } else if (!groupDetails) {
          return errorResponseWithoutData(
            res,
            res.__("No Group Exists With Given Id"),
            FAIL
          );
        } else if (!categoryDetails) {
          return errorResponseWithoutData(
            res,
            res.__("No Category Exists With Given Id"),
            FAIL
          );
        } else if (!oemModelDetails) {
          return errorResponseWithoutData(
            res,
            res.__("No OEMModel Exists With Given Id"),
            FAIL
          );
        } else if (!schemeDetails) {
          return errorResponseWithoutData(
            res,
            res.__("No Scheme Exists With Given Id"),
            FAIL
          );
        } else if (!segmentDetails) {
          return errorResponseWithoutData(
            res,
            res.__("No Segment Exists With Given Id"),
            FAIL
          );
        }  else if (!productPricingDetails) {
          return errorResponseWithoutData(
            res,
            res.__("No Category Exists With Given Id"),
            FAIL
          );
        } else if (!productTypeDetails) {
          return errorResponseWithoutData(
            res,
            res.__("No productType Exists With Given Id"),
            FAIL
          );
        }
        else if (!modelDimensionDetails) {
            return errorResponseWithoutData(
              res,
              res.__("No ModelDimension Exists With Given Id"),
              FAIL
            );
          }
          else if (!productMediaDetails) {
            return errorResponseWithoutData(
              res,
              res.__("No product media Exists With Given Id"),
              FAIL
            );
          }


        let Details =  await batteryDetail.findOne({
            where : detailsObj
        })    

        if(Details){
            return errorResponseWithoutData(res,res.__('Battery Details Already Exists'),FAIL)
        }
            
      await batteryDetail.create(detailsObj)
      .then((battery_data)=>{
          if(!battery_data){
              return successResponseWithoutData(res, res.__('No Data Found'),NO_DATA)
          }
          return successResponseData(res,battery_data,SUCCESS,res.__('Battery Details Data Found Successfully'))
        }).catch((err)=>{ 
            console.log(err);
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
        })
    },

    batteryDetailsGetService : async (req,res)=>{

      const {detailsId,brandId,modelId,groupId,oemModelId,schemeId,segmentId,categoryId,modelDimensionId,typeId,priseId} = req.query;

      let options = {
          where :{},
          include:[
              {
                  model : productMedia,
                  attributes :["id"],
                  where: {}
              },{
                  model : batteryBrand,
                  attributes :["id",'brandName'],
                  where : {}
              },{
                  model : productModel,
                  attributes :["id","modelName"],
                  where : {}
              },{
                  model : group,
                  attributes :["id",'groupName'],
                  where : {}
              },{
                  model : oemModel,
                  attributes :["id"],
                  where : {}
              },{
                  model : scheme,
                  attributes :["id"],
                  where : {}
              },{
                  model : segment,
                  attributes :["id",'segmentName'],
                  where : {}
              },{
                  model : category,
                  attributes :["id"],
                  where : {}
              },{
                  model : productType,
                  attributes : ["id","typeName"],
                  where : {}
              },{
                  model : modelDimension,
                  attributes : ["id"],
                  where : {}
              },{
                  model : productPricing,
                  attributes : ["id","mrpValue"],
                  where : {}
              }
          ],
          attributes : { exclude :["createdAt","updatedAt"] }
      }
        
        if(brandId){
          options["include"][0]["where"]['id'] =  brandId 
        }
        else if(modelId){
            options["include"][0]["where"]['id'] =  modelId 
        }
        else if(groupId){
            options["include"][0]["where"]['id'] =  groupId 
        }   
        else if(oemModelId){
            options["include"][0]["where"]['id'] =  oemModelId 
        }
        else if(schemeId){
            options["include"][0]["where"]['id'] =  schemeId 
        }
        else if(modelDimensionId){
            options["include"][0]["where"]['id'] =  modelDimensionId 
        }
        else if(segmentId){
            options["include"][0]["where"]['id'] =  segmentId 
        }
        else if(categoryId){
            options["include"][0]["where"]['id'] =  categoryId 
        }
        
        
        let method = batteryDetail.findAll(options);
        
        if(detailsId){
            options["where"]['id'] =  detailsId 
        }
        

        method.then((data)=>{
          // console.log(data.length)
          if(!data.length>0){
              return successResponseWithoutData(res, res.__('No Data Found'),NO_DATA)
          }
          return successResponseData(res,data,SUCCESS,res.__('Battery Details Data Found Successfully'))
        }).catch((err)=>{ 
            console.log(err);
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
        })
    },


    batteryDetailsDeleteController : async (req , res ) => {

        let batteryDetailsExistingData=await batteryDetail.findByPk(req.params.id)

        if(!batteryDetailsExistingData){
            errorResponseWithoutData(res,res.__('No Such Id Found'),NO_DATA)
        }

        await batteryDetail.destroy({
            where: {
            id: req.params.id
            }
        }).then((data)=>{
            if(!data){
                return errorResponseWithoutData(res, res.__('No Data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('Details Data Deleted Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
        })
    },

    batteryDetailsUpdateController : async (req,res)=>{

        body=req.body
        const reqObj = {
          primaryName: Joi.string().required(),
          secondaryName: Joi.string().required(),
          productImage: Joi.string().required(),
          brandId: Joi.number().required(),
          modelId: Joi.number().required(),
          groupId: Joi.number().required(),
          categoryId: Joi.number().required(),
          oemModelId: Joi.number().required(),
          schemeId: Joi.number().required(),
          segmentId: Joi.number().required(),
          productMediaId: Joi.number().required(),
          productPricingId: Joi.number().required(),
          productTypeId: Joi.number().required(),
          modelDimensionId: Joi.number().required(),
        };
        
        const schema = Joi.object(reqObj);
        const { error } = schema.validate(body);
    
        if (error) {
            return validationErrorResponseData(
                res,
                (validationMessageKey("Service Validation", error))
            );
        }
    
        const Details=await batteryDetail.findOne({where:{id:req.params.id}})
        if(!Details){
            return errorResponseWithoutData(res,'No Such Id Found',NO_DATA)
        }

        let brandDetails = await batteryBrand.findByPk(body.brandId);
        let modelDetails = await modelDimension.findByPk(body.modelId);
        let groupDetails = await group.findByPk(body.groupId);
        let categoryDetails = await category.findByPk(body.categoryId);
        let oemModelDetails = await oemModel.findByPk(body.oemModelId);
        let schemeDetails = await scheme.findByPk(body.schemeId);
        let segmentDetails = await segment.findByPk(body.segmentId);
        let productMediaDetails = await productMedia.findByPk(body.productMediaId);
        let productPricingDetails = await productPricing.findByPk(body.productPricingId);
        let productTypeDetails = await productType.findByPk(body.productTypeId);
        let modelDimensionDetails = await modelDimension.findByPk(body.modelDimensionId);

        if (!brandDetails) {
          return errorResponseWithoutData(
            res,
            res.__("No Battery Brand Exists With Given Id"),
            FAIL
          );
        } else if (!modelDetails) {
          return errorResponseWithoutData(
            res,
            res.__("No Model Exists With Given Id"),
            FAIL
          );
        } else if (!groupDetails) {
          return errorResponseWithoutData(
            res,
            res.__("No Group Exists With Given Id"),
            FAIL
          );
        } else if (!categoryDetails) {
          return errorResponseWithoutData(
            res,
            res.__("No Category Exists With Given Id"),
            FAIL
          );
        } else if (!oemModelDetails) {
          return errorResponseWithoutData(
            res,
            res.__("No OEMModel Exists With Given Id"),
            FAIL
          );
        } else if (!schemeDetails) {
          return errorResponseWithoutData(
            res,
            res.__("No Scheme Exists With Given Id"),
            FAIL
          );
        } else if (!segmentDetails) {
          return errorResponseWithoutData(
            res,
            res.__("No Segment Exists With Given Id"),
            FAIL
          );
        }  else if (!productPricingDetails) {
          return errorResponseWithoutData(
            res,
            res.__("No Category Exists With Given Id"),
            FAIL
          );
        } else if (!productTypeDetails) {
          return errorResponseWithoutData(
            res,
            res.__("No productType Exists With Given Id"),
            FAIL
          );
        }
        else if (!modelDimensionDetails) {
            return errorResponseWithoutData(
              res,
              res.__("No ModelDimension Exists With Given Id"),
              FAIL
            );
          }
          else if (!productMediaDetails) {
            return errorResponseWithoutData(
              res,
              res.__("No product media Exists With Given Id"),
              FAIL
            );
          }


        await batteryDetail
          .update(
            {
              primaryName: body.primaryName,
              secondaryName: body.secondaryName,
              productImage: body.productImage,
              brandId: body.brandId,
              modelId: body.modelId,
              groupId: body.groupId,
              categoryId: body.categoryId,
              oemModelId: body.oemModelId,
              schemeId: body.schemeId,
              segmentId: body.segmentId,
              productMediaId: body.segmentId,
              productPricingId: body.segmentId,
              productTypeId: body.segmentId,
              modelDimensionId: body.segmentId,
            },
            {
              where: {
                id: req.params.id,
              },
            }
          )
          .then((data) => {
            if (!data) {
              return successResponseWithoutData(
                res,
                res.__("No Data Found"),
                NO_DATA
              );
            }
            return successResponseWithoutData(
              res,
              res.__("Details Data Updated Successfully"),
              SUCCESS
            );
          })
          .catch((err) => {
            return errorResponseWithoutData(
              res,
              res.__("Something Went Wrong"),
              FAIL
            );
          });
    }
}
