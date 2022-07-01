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
    segmentBrandId: Joi.string().optional(),
    };

    const schema = Joi.object(reqObj);
    const { error } = schema.validate(body);

    if (error) {
        return validationErrorResponseData(
            res,
            (validationMessageKey("Service validation", error))
        );
    }
   await segment.create({
        segmentName: body.segmentName,
        segmentDesc: body.segmentDesc,
        segmentIcon: body.segmentIcon,
        segmentPosition: body.segmentPosition,
        segmentBrandId: body.segmentBrandId,
    })
    .then((data)=>{
    if(!data){
        return successResponseWithoutData(res, res.__('No data Found'),NO_DATA)
    }
    return successResponseData(res,data,SUCCESS,res.__('Data Added Successfully'))
    }).catch((err)=>{ 
        return errorResponseWithoutData(res,'Something went wrong',FAIL)
    })
}

exports.segmentGetService=async (req,res,next)=>{
    await segment.findAll()
    .then((data)=>{
        if(!data){
            return successResponseWithoutData(res, res.__('No data Found'),NO_DATA)
        }
        return successResponseData(res,data,SUCCESS,res.__('Data Found Successfully'))
    }).catch((err)=>{ 
        return errorResponseWithoutData(res,'Something went wrong',FAIL)
     })
}

exports.segmentFindOneController = async (req, res,next) => {
    await segment.findByPk(req.params.id)
    .then((data)=>{
        if(!data){
            return successResponseWithoutData(res, res.__('No data Found'),NO_DATA)
        }
        return successResponseData(res,data,SUCCESS,res.__('Data Found Successfully'))
    }).catch((err)=>{ 
        return errorResponseWithoutData(res,'Something went wrong',FAIL)
     })
}

exports.segmentDeleteController = async (req , res ,next) => {
    let segmentExistingData=await segment.findByPk(req.params.id)
    if(!segmentExistingData){
        errorResponseWithoutData(res,'No data found')
    }
    await segment.destroy({
        where: {
          id: req.params.id
        }
      }).then((data)=>{
        if(!data){
            return successResponseWithoutData(res, res.__('No data Found'),NO_DATA)
        }
        return successResponseWithoutData(res,res.__('Data Deleated Successfully'),SUCCESS)
    }).catch((err)=>{ 
        return errorResponseWithoutData(res,'Something went wrong',FAIL)
     })
}

exports.segmentUpdateController=async (req,res,next)=>{
    body=req.body
    const reqObj = {
        segmentName: Joi.string().required(),
        segmentDesc : Joi.string().optional().allow(''),
        segmentIcon: Joi.string().optional().allow(''),
        segmentPosition: Joi.string().required(),
        segmentBrandId: Joi.string().required(),
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
        segmentBrandId: body.segmentLogo,
     }, {
        where: {
          id:req.params.id
        }
      }).then((data)=>{
        if(!data){
            return successResponseWithoutData(res, res.__('No data Found'),NO_DATA)
        }
        return successResponseWithoutData(res,res.__('Data Updated Successfully'),SUCCESS)
    }).catch((err)=>{ 
        return errorResponseWithoutData(res,'Something went wrong',FAIL)
     })
}

// exports.bulkInsertionsegmentController = (req,res,next) => {
// 	isAuthenticRequest(req,res,next)
//     body=req.body
//     body.JSONData.forEach(data => {
//         segment.findAll({
//             where: {
//               brandId:data.brandId
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
