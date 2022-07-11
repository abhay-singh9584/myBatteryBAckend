const {successResponseData,validationMessageKey, successResponseWithoutData, errorResponseWithoutData, errorResponseData, validationErrorResponseData}=require('../../Helper/Responce')
const {isAuthenticRequest}=require('../../Middleware/apiAuth')

const Joi = require('joi')
const { SUCCESS, FAIL, NO_DATA, CONFLICT } = require('../../Helper/Constant')

const {batteryBrand,subcategory,oemBrand} = require('../../models')

module.exports={

    getBatteryBrands : async (req,res)=>{

        // const {byName,relavence} = req.query
        let options = {
            where :{},
            attributes : ["id","brandName","brandLogo"],
        }
        let method = batteryBrand.findAll(options);

        method.then((data)=>{
            if(!data || data.length==0){
                return successResponseWithoutData(res, res.__('No Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Brand Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
        })
    },

    getAllProducts : async (req,res) =>{

        let options = {
            where :{},
            attributes : ["id","subCategoryName","subCategoryIcon"],
        }
        let method = subcategory.findAll(options);

        method.then((data)=>{
            if(!data || data.length==0){
                return successResponseWithoutData(res, res.__('No Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Product Found Successfully'))
        }).catch((err)=>{
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
        })
    },

    getBatteryBrandByName : async (req,res) =>{

        let method=batteryBrand.findAll({
            where: { brandName:req.params.name } ,
        })

        method.then((data)=>{
            if(!data || data.length==0){
                return successResponseWithoutData(res, res.__('No Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Brand Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
        })
    }

}