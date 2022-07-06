const {batteryDetail,batteryBrand,group,modelDimension,oemModel,scheme,secondaryName,segment,subcategory}=require('../../models')
const {successResponseData,validationMessageKey, successResponseWithoutData, errorResponseWithoutData, errorResponseData, validationErrorResponseData}=require('../../Helper/Responce')

const Joi = require('joi')
const { SUCCESS, FAIL, NO_DATA, CONFLICT } = require('../../Helper/Constant')

module.exports={

    createBatteryDetails : async (req,res)=>{

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



        // let Details =  await batteryDetails.findOne({
        //     where : detailsObj
        // })    

        // if(Details){
        //     return errorResponseWithoutData(res,res.__('BatteryDetails Already Exists'),FAIL)
        // }
            
        await batteryDetail.create(detailsObj)
        .then((battery_data)=>{
            if(!battery_data){
                return successResponseWithoutData(res, res.__('No Data Found'),NO_DATA)
            }
            return successResponseData(res,battery_data,SUCCESS,res.__('Details Data Found Successfully'))
        }).catch((err)=>{ 
            console.log(err);
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
        })
    },

    batteryDetailsGetService : async (req,res)=>{

        const {DetailsId} = req.query;

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
            
            if(DetailsId){
                options["where"]['id'] =  DetailsId 
            }

            let method = batteryDetail.findAll(options);

        method.then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Details Data Found Successfully'))
        }).catch((err)=>{ 
            console.log(err);
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
        })
    },


    batteryDetailsDeleteController : async (req , res ) => {

        let batteryDetailsExistingData=await batteryDetails.findByPk(req.params.id)

        if(!batteryDetailsExistingData){
            errorResponseWithoutData(res,res.__('No Details Data Found'),NO_DATA)
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
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
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

            await batteryDetails.update({ 
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
                return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
            })
    }
}