const {batteryBrand}=require('../../models')
const {successResponseData,validationMessageKey, successResponseWithoutData, errorResponseWithoutData, errorResponseData, validationErrorResponseData}=require('../../Helper/Responce')
const {isAuthenticRequest}=require('../../Middleware/apiAuth')
// const battery_brand=db.Battery_Brand;
// console.log(battery_brand);
const Joi = require('joi')
const { SUCCESS, FAIL, NO_DATA, CONFLICT } = require('../../Helper/Constant')

exports.createBatteryBrand=async (req,res,next)=>{
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
            (validationMessageKey("Service validation", error))
        );
    }
    await batteryBrand.findOne({
            where:{
            brandName: body.brandName,
            brandLogo: body.brandLogo,
            brandDesc: body.brandDesc,
            brandIcon: body.brandIcon,
            brandPosition: body.brandPosition,
        }
    }).then(async (data)=>{
        if(data){
            return errorResponseWithoutData(res, res.__('Duplicate data cannot be added'),CONFLICT)
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
                return successResponseWithoutData(res, res.__('No data Found'),NO_DATA)
            }
            return successResponseData(res,battery_data,SUCCESS,res.__('Battery Brand Data Found Successfully'))
            }).catch((err)=>{ 
                return errorResponseWithoutData(res,'Something went wrong',FAIL)
            })

    }).catch((err)=>{ 
        return errorResponseWithoutData(res,'Something went wrong',FAIL)
    })
}

exports.batteryBrandGetService=async (req,res,next)=>{
    await batteryBrand.findAll()
    .then((data)=>{
        if(!data){
            return successResponseWithoutData(res, res.__('No data Found'),NO_DATA)
        }
        // console.log(data);
        return successResponseData(res,data,SUCCESS,res.__('Battery Brand Data Found Successfully'))
    }).catch((err)=>{ 
        return errorResponseWithoutData(res,'Something went wrong',FAIL)
     })
}

exports.batteryBrandFindOneController = async (req, res,next) => {
    await batteryBrand.findByPk(req.params.id)
    .then((data)=>{
        if(!data){
            return successResponseWithoutData(res, res.__('No data Found'),NO_DATA)
        }
        return successResponseData(res,data,SUCCESS,res.__('Data Found Successfully'))
    }).catch((err)=>{ 
        return errorResponseWithoutData(res,'Something went wrong',FAIL)
     })
}

exports.batteryBrandDeleteController = async (req , res ,next) => {
    let batteryBrandExistingData=await batteryBrand.findByPk(req.params.id)
    if(!batteryBrandExistingData){
        errorResponseWithoutData(res,'No data found')
    }
    await batteryBrand.destroy({
        where: {
          id: req.params.id
        }
      }).then((data)=>{
        if(!data){
            return errorResponseWithoutData(res, res.__('No data Found'),NO_DATA)
        }
        return successResponseWithoutData(res,res.__('Battery Brand Data Deleted Successfully'),SUCCESS)
    }).catch((err)=>{ 
        return errorResponseWithoutData(res,'Something went wrong',FAIL)
     })
}

exports.batteryBrandUpdateController=async (req,res,next)=>{
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
                (validationMessageKey("Service validation", error))
            );
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
            return successResponseWithoutData(res, res.__('No data Found'),NO_DATA)
        }
        return successResponseWithoutData(res,res.__('Battery Brand Data Updated Successfully'),SUCCESS)
    }).catch((err)=>{ 
        return errorResponseWithoutData(res,'Something went wrong',FAIL)
     })
}

// exports.bulkInsertionBatteryBrandController = (req,res,next) => {
// 	isAuthenticRequest(req,res,next)
//     body=req.body
//     body.JSONData.forEach(data => {
//         batteryBrand.findAll({
//             where: {
//               brandName:data.brandName
//             }
//           }).then(duplicateData => {
//             if(!(duplicateData.length > 0)){
//                 batteryBrand.create(data)
//                     .then((data) => successResponseData(res,data,200,'Successfull Bulk Inserstion'))
//                     .catch((err) =>  errorResponseWithoutData(res,'Bul insertion failed'))
//             } 
//             else{					
//                 errorResponseWithoutData(res,'Unique data inserted,failed for duplicate data')					
//             }
            
//         }) 
//         .catch(err => errorResponseWithoutData(res,'Failed to insert data'));
//     })
// }
