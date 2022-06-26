const {batteryBrand}=require('../../models')
const {successResponseData,validationMessageKey, successResponseWithoutData, errorResponseWithoutData, errorResponseData, validationErrorResponseData}=require('../../Helper/Responce')
const {isAuthenticRequest}=require('../../Middleware/apiAuth')
// const battery_brand=db.Battery_Brand;
// console.log(battery_brand);
const Joi = require('joi')

exports.createBatteryBrand=async (req,res,next)=>{
   body=req.body
   const reqObj = {
    brandName: Joi.string().required(),
    brandLogo: Joi.string().required(),
    brandDesc : Joi.string().optional().allow(''),
    brandIcon: Joi.string().optional().allow(''),
    brandPosition: Joi.string().required(),
    };

    const schema = Joi.object(reqObj);
    const { error } = schema.validate(body);

    if (error) {
        return validationErrorResponseData(
            res,
            (validationMessageKey("Service validation", error))
        );
    }

   isAuthenticRequest(req,res,next);
   await batteryBrand.create({
        brandName: body["brandName"],
        brandLogo: body["brandLogo"],
        brandDesc: body["brandDesc"],
        brandIcon: body["brandIcon"],
        brandPosition: body["brandPosition"],
   })
   .then((i)=>{
    

       successResponseData(res,i,'Data Added Successfully')
   }).catch((err)=>{
        console.log(err);
    })
}

exports.batteryBrandGetService=async (req,res,next)=>{
    isAuthenticRequest(req,res,next);
    await batteryBrand.findAll()
    .then((i)=>{
        successResponseData(res,i,'Data Found Successfully')
    }).catch((err)=>{
         console.log(err);
     })
}

exports.batteryBrandFindOneController = async (req, res,next) => {
    isAuthenticRequest(req,res,next);
    await batteryBrand.findByPk(req.params.id)
    .then((i)=>{
        successResponseData(res,i,'Data Successfully Found')
    }).catch((err)=>{
         console.log(err);
     })
}

exports.batteryBrandDeleteController = async (req , res ,next) => {
    isAuthenticRequest(req,res,next);
    let batteryBrandExistingData=await batteryBrand.findByPk(req.params.id)
    if(!batteryBrandExistingData){
        errorResponseWithoutData(res,'No data found')
    }
    await batteryBrand.destroy({
        where: {
          id: req.params.id
        }
      }).then((i)=>{
        successResponseWithoutData(res,'Data Deleted Successfully',200)
    }).catch((err)=>{
         errorResponseWithoutData(res,'Unable to delete data')
     })
}

exports.batteryBrandUpdateController=async (req,res,next)=>{
    body=req.body
    isAuthenticRequest(req,res,next);
    await batteryBrand.update({ 
        brandName: body["brandName"],
        brandLogo: body["brandLogo"],
        brandDesc: body["brandDesc"],
        brandIcon: body["brandIcon"],
        brandPosition: body["brandPosition"],
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

exports.bulkInsertionBatteryBrandController = (req,res,next) => {
	isAuthenticRequest(req,res,next)
    body=req.body
    body.JSONData.forEach(data => {
        batteryBrand.findAll({
            where: {
              brandName:data.brandName
            }
          }).then(duplicateData => {
            if(!(duplicateData.length > 0)){
                batteryBrand.create(data)
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
