const {segment}=require('../../models')
const {successResponseData,validationMessageKey, successResponseWithoutData, errorResponseWithoutData, errorResponseData, validationErrorResponseData}=require('../../Helper/Responce')
const {isAuthenticRequest}=require('../../Middleware/apiAuth')
// const battery_brand=db.Battery_Brand;
// console.log(battery_brand);
const Joi = require('joi')
const { SUCCESS, FAIL } = require('../../Helper/Constant')

exports.createSegment=async (req,res,next)=>{
   body=req.body
   const reqObj = {
    segmentName: Joi.string().required(),
    segmentDesc : Joi.string().optional().allow(''),
    segmentIcon: Joi.string().optional().allow(''),
    segmentPosition: Joi.string().required(),
    segmentBrandName: Joi.string().optional(),
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
    await segment.create({
            segmentName: body.segmentName,
            segmentDesc: body.segmentDesc,
            segmentIcon: body.segmentIcon,
            segmentPosition: body.segmentPosition,
            segmentBrandName: body.segmentBrandName,
        })
        .then((data)=>{
        if(!data){
            return successResponseWithoutData(res, res.__('No Segment Data Found'),NO_DATA)
        }
        return successResponseData(res,data,SUCCESS,res.__('Data Added Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
        })
    }).catch((err)=>{ 
        return errorResponseWithoutData(res,'Something went wrong',FAIL)
    })
}

exports.segmentGetService=async (req,res,next)=>{
    await segment.findAll()
    .then((data)=>{
        if(!data){
            return successResponseWithoutData(res, res.__('No Segment Data Found'),NO_DATA)
        }
        return successResponseData(res,data,SUCCESS,res.__('Data Found Successfully'))
    }).catch((err)=>{ 
        return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
     })
}

exports.segmentFindOneController = async (req, res,next) => {
    await segment.findByPk(req.params.id)
    .then((data)=>{
        if(!data){
            return successResponseWithoutData(res, res.__('No Segment Data Found'),NO_DATA)
        }
        return successResponseData(res,data,SUCCESS,res.__('Data Found Successfully'))
    }).catch((err)=>{ 
        return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
     })
}

exports.segmentDeleteController = async (req , res ,next) => {
    let segmentExistingData=await segment.findByPk(req.params.id)
    if(!segmentExistingData){
        errorResponseWithoutData(res,'No Segment Data found')
    }
    await segment.destroy({
        where: {
          iW: reW.params.id
        }
      }).then((data)=>{
        if(!data){
            return successResponseWithoutData(res, res.__('No Segment Data Found'),NO_DATA)
        }
        return successResponseWithoutData(res,res.__('Data Deleated Successfully'),SUCCESS)
    }).catch((err)=>{ 
        return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
     })
}

exports.segmentUpdateController=async (req,res,next)=>{
    body=req.body
    const reqObj = {
        segmentName: Joi.string().required(),
        segmentDesc : Joi.string().optional().allow(''),
        segmentIcon: Joi.string().optional().allow(''),
        segmentPosition: Joi.string().required(),
        segmentBrandName: Joi.string().required(),
        };
    
        const schema = Joi.object(reqObj);
        const { error } = schema.validate(body);
    
        if (error) {
            return validationErrorResponseData(
                res,
                (validationMessageKey("Service validation", error))
            );
        }
    
    await segment.update({ 
        segmentName: body.segmentName,
        segmentDesc: body.segmentDesc,
        segmentIcon: body.segmentIcon,
        segmentPosition: body.segmentPosition,
        segmentBrandName: body.segmentLogo,
     }, {
        where: {
          id:req.params.id
        }
      }).then((data)=>{
        if(!data){
            return successResponseWithoutData(res, res.__('No Segment Data Found'),NO_DATA)
        }
        return successResponseWithoutData(res,res.__('Data Updated Successfully'),SUCCESS)
    }).catch((err)=>{ 
        return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
     })
}

// exports.bulkInsertionsegmentController = (req,res,next) => {
// 	isAuthenticRequest(req,res,next)
//     body=req.body
//     body.JSONData.forEach(data => {
//         segment.findAll({
//             where: {
//               brandName:data.brandName
//             }
//           }).then(duplicateData => {
//             if(!(duplicateData.length > 0)){
//                 segment.create(data)
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
