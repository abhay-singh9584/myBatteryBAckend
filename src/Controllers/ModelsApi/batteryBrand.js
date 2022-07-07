const {batteryBrand}=require('../../models')
const {successResponseData,validationMessageKey, successResponseWithoutData, errorResponseWithoutData, errorResponseData, validationErrorResponseData}=require('../../Helper/Responce')
const {isAuthenticRequest}=require('../../Middleware/apiAuth')

const Joi = require('joi')
const { SUCCESS, FAIL, NO_DATA, CONFLICT } = require('../../Helper/Constant')

module.exports={

    createBatteryBrand : async (req,res)=>{

        body=req.body
        const reqObj = {
            brandName: Joi.string().required(),
            brandLogo: Joi.string().required(),
            brandDesc : Joi.string().optional().allow(''),
            brandIcon: Joi.string().optional().allow(''),
            brandPosition: Joi.number().required(),
            };

        const schema = Joi.object(reqObj);
        const { error } = schema.validate(body);

        if (error) {
            return validationErrorResponseData(
                res,
                (validationMessageKey("Service Validation", error))
            );
        }

        let batteryBrandDetails =  await batteryBrand.findOne({
            where : {brandName : body.brandName 
            }})
            
        let batteryBrandPositionDetails =  await batteryBrand.findOne({
            where : {
                brandPosition:body.brandPosition
        }})

        if(batteryBrandDetails){
            return errorResponseWithoutData(res,res.__('BatteryBrand Already Exists'),FAIL)
        }
        else if(batteryBrandPositionDetails){
            return errorResponseWithoutData(res,res.__('BatteryBrand Position Already Exists'),FAIL)
        }
            
        await batteryBrand.create({
            brandName: body.brandName,
            brandLogo: body.brandLogo,
            brandDesc: body.brandDesc,
            brandIcon: body.brandIcon,
            brandPosition: body.brandPosition,
        })
        .then((battery_data)=>{
            if(!battery_data){
                return successResponseWithoutData(res, res.__('No Data Found'),NO_DATA)
            }
            return successResponseData(res,battery_data,SUCCESS,res.__('Brand Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
        })
    },

    batteryBrandGetService : async (req,res)=>{

        const {brandId,sortBy} = req.query;

            let options = {
                where :{},
                attributes : { exclude :["createdAt","updatedAt"] },
            }
            if(sortBy){
                options.order=[['id','DESC']]
            }
            if(brandId){
                options["where"]['id'] =  brandId 
            }

            let method = batteryBrand.findAll(options);

        method.then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Brand Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
        })
    },


    batteryBrandDeleteController : async (req , res ) => {

        let batteryBrandExistingData=await batteryBrand.findByPk(req.params.id)

        if(!batteryBrandExistingData){
            errorResponseWithoutData(res,res.__('No Such Id Found'),NO_DATA)
        }

        await batteryBrand.destroy({
            where: {
            id: req.params.id
            }
        }).then((data)=>{
            if(!data){
                return errorResponseWithoutData(res, res.__('No Data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('Brand Data Deleted Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
        })
    },

    batteryBrandUpdateController : async (req,res)=>{

        body=req.body
        const reqObj = {
            brandName: Joi.string().required(),
            brandLogo: Joi.string().required(),
            brandDesc : Joi.string().optional().allow(''),
            brandIcon: Joi.string().optional().allow(''),
            brandPosition: Joi.number().required(),
            };
        
            const schema = Joi.object(reqObj);
            const { error } = schema.validate(body);
        
            if (error) {
                return validationErrorResponseData(
                    res,
                    (validationMessageKey("Service Validation", error))
                );
            }
        
            const batteryBrandDetails=await batteryBrand.findOne({where:{id:req.params.id}})
            if(!batteryBrandDetails){
                return errorResponseWithoutData(res,'No Such Id Found',NO_DATA)
            }

            await batteryBrand.update({ 
                brandName: body.brandName,
                brandLogo: body.brandLogo,
                brandDesc: body.brandDesc,
                brandIcon: body.brandIcon,
                brandPosition: body.brandPosition,
            }, {
                where: {
                id:req.params.id
                }
            }).then((data)=>{
                if(!data){
                    return successResponseWithoutData(res, res.__('No Data Found'),NO_DATA)
                }
                return successResponseWithoutData(res,res.__('Brand Data Updated Successfully'),SUCCESS)
            }).catch((err)=>{ 
                return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
            })
    }
}
