const {successResponseData,validationMessageKey, successResponseWithoutData, errorResponseWithoutData, errorResponseData, validationErrorResponseData}=require('../../Helper/Responce')

const Joi = require('joi')
const { SUCCESS, FAIL, NO_DATA, CONFLICT } = require('../../Helper/Constant')

const {batteryBrand,segment,oemBrand,oemModel, Sequelize} = require('../../models')

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
            // include:[
            //     {
            //         model : oemBrand,
            //         attributes :["id","OEMBrand","OEMBrandImage"],
            //         where :{}
            //     }],
            attributes : ["segmentName","segmentIcon"],
            group : ['segmentName']
            
        }
        let method = segment.findAll(options);

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
    },

    getProductBrand : async (req,res)=>{

        // console.log(req.params.name)
        const {byAlpha} = req.query

        const productObj={
            where: { 'segmentName':req.params.name } ,
            include:[
                {
                    model : oemBrand,
                    attributes:["OEMBrand","OEMBrandImage"],
                    where :{}
                }],
            attributes :["oemBrand.OEMBrand","oemBrand.OEMBrandImage"],
            group : ["oemBrand.OEMBrand"]
        }

        if(byAlpha=='1'){
            productObj.order = [[{model: oemBrand}, 'OEMBrand', 'ASC']]
        }
        else if(byAlpha=='2'){
            productObj.order = [[{model: oemBrand}, 'OEMBrand', 'DESC']]
        }

        let method=segment.findAll(productObj)


        method.then((data)=>{
            if(!data || data.length==0){
                return successResponseWithoutData(res, res.__('No Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Brand Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
        })
    },

    getBrandModels : async (req,res) =>{
        
        const productObj={
            include:[
                {
                    model : oemBrand,
                    where :{ 'OEMBrand': req.params.name },
                    attributes:["OEMBrand","OEMBrandImage"],
                }],
            attributes :["OEMModelName","FuelType"],
        }

        let method=oemModel.findAll(productObj)


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