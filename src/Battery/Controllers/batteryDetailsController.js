const {batteryDetail,batteryBrand,group,modelDimension,oemModel,scheme,secondaryName,segment,subcategory}=require('../../models')
const {successResponseData,validationMessageKey, successResponseWithoutData, errorResponseWithoutData, errorResponseData, validationErrorResponseData}=require('../../Helper/Responce')

const Joi = require('joi')
const { SUCCESS, FAIL, NO_DATA, CONFLICT } = require('../../Helper/Constant')

module.exports={

    createBatteryDetails : async (req,res)=>{

        const body=req.body
        const reqObj = {
            brandId: Joi.number().required(),
            modelId: Joi.number().required(),
            groupId : Joi.number().required(),
            oemModelId: Joi.number().required(),
            schemeId: Joi.number().required(),
            secondaryNameId: Joi.number().required(),
            segmentId: Joi.number().required(),
            subCategoryId: Joi.number().required(),
        };

        const schema = Joi.object(reqObj);
        const { error } = schema.validate(body);

        if (error) {
            return validationErrorResponseData(
                res,
                (validationMessageKey("Service Validation", error))
            );
        }

        const detailsObj={
            brandId: body.brandId,
            modelId: body.modelId,
            groupId : body.groupId,
            oemModelId: body.oemModelId,
            schemeId: body.schemeId,
            secondaryNameId: body.secondaryNameId,
            segmentId: body.segmentId,
            subCategoryId: body.subCategoryId,
        }

        let brandDetails = await batteryBrand.findByPk(body.brandId);
        let modelDetails = await modelDimension.findByPk(body.modelId);
        let groupDetails = await group.findByPk(body.groupId);
        let oemModelDetails = await oemModel.findByPk(body.oemModelId);
        let schemeDetails = await scheme.findByPk(body.schemeId);
        let secondaryNameDetails = await secondaryName.findByPk(body.secondaryNameId);
        let segmentDetails = await segment.findByPk(body.segmentId);
        let subCategoryDetails = await subcategory.findByPk(body.subCategoryId);


        if(!brandDetails){
            return errorResponseWithoutData(res,res.__('No Brand Exists With Given Id'),FAIL)
        }
        else if(!modelDetails){
            return errorResponseWithoutData(res,res.__('No Model Exists With Given Id'),FAIL)
        }
        else if(!groupDetails){
            return errorResponseWithoutData(res,res.__('No Group Exists With Given Id'),FAIL)
        }
        else if(!oemModelDetails){
            return errorResponseWithoutData(res,res.__('No OEMModel Exists With Given Id'),FAIL)
        }
        else if(!schemeDetails){
            return errorResponseWithoutData(res,res.__('No Scheme Exists With Given Id'),FAIL)
        }
        else if(!secondaryNameDetails){
            return errorResponseWithoutData(res,res.__('No Secondary Name Exists With Given Id'),FAIL)
        }
        else if(!segmentDetails){
            return errorResponseWithoutData(res,res.__('No Segment Exists With Given Id'),FAIL)
        }
        else if(!subCategoryDetails){
            return errorResponseWithoutData(res,res.__('No Sub Category Exists With Given Id'),FAIL)
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

        const {detailsId,brandId,modelId,groupId,oemModelId,schemeId,secondaryNameId,segmentId,subCategoryId} = req.query;

        let options = {
            where :{},
            include:[
                {
                    model : batteryBrand,
                    attributes :["id",'brandName'],
                    where :{}
                },{
                    model : modelDimension,
                    attributes :["id",'modelName'],
                    where :{}
                },{
                    model : group,
                    attributes :["id",'groupName'],
                    where :{}
                },{
                    model : oemModel,
                    attributes :["id"],
                    where :{}
                },{
                    model : scheme,
                    attributes :["id"],
                    where :{}
                },{
                    model : secondaryName,
                    attributes :["id",'secondaryName'],
                    where :{}
                },{
                    model : segment,
                    attributes :["id",'segmentName'],
                    where :{}
                },{
                    model : subcategory,
                    attributes :["id"],
                    where :{}
                },
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
        else if(secondaryNameId){
            options["include"][0]["where"]['id'] =  secondaryNameId 
        }
        else if(segmentId){
            options["include"][0]["where"]['id'] =  segmentId 
        }
        else if(subCategoryId){
            options["include"][0]["where"]['id'] =  subCategoryId 
        }
        
        
        let method = batteryDetail.findAll(options);
        
        if(detailsId){
            options["where"]['id'] =  detailsId 
        }
        

        method.then((data)=>{
            if(!data){
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
            brandId: Joi.number().required(),
            modelId: Joi.number().required(),
            groupId : Joi.number().required(),
            oemModelId: Joi.number().required(),
            schemeId: Joi.number().required(),
            secondaryNameId: Joi.number().required(),
            segmentId: Joi.number().required(),
            subCategoryId: Joi.number().required(),
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

            await batteryDetail.update({ 
                brandId: body.brandId,
                modelId: body.modelId,
                groupId : body.groupId,
                oemModelId: body.oemModelId,
                schemeId: body.schemeId,
                secondaryNameId: body.secondaryNameId,
                segmentId: body.segmentId,
                subCategoryId: body.subCategoryId,
            }, {
                where: {
                id:req.params.id
                }
            }).then((data)=>{
                if(!data){
                    return successResponseWithoutData(res, res.__('No Data Found'),NO_DATA)
                }
                return successResponseWithoutData(res,res.__('Details Data Updated Successfully'),SUCCESS)
            }).catch((err)=>{ 
                return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
            })
    }
}
