const { SUCCESS, FAIL, NO_DATA } = require('../../Helper/Constant');
const { successResponseData, successResponseWithoutData, errorResponseWithoutData, validationMessageKey, validationErrorResponseData } = require('../../Helper/Responce');
const {groups}=require('../../models/index')

module.exports = {

    groupCreateController : async (req,res,next)=>{
        
        body=req.body
        const reqObj = {
            groupName: Joi.string().required(),
            groupDesc : Joi.string().optional().allow(''),
            groupIcon: Joi.string().optional().allow(''),
            groupBasedOn: Joi.string().required(),
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
            await groups.create({
                groupName: body.groupName,
                groupDesc: body.groupDesc,
                groupIcon: body.groupIcon,
                groupBasedOn: body.groupBasedOn,
            })
            .then((data)=>{
                if(!data){
                    return successResponseWithoutData(res, res.__('No Group Data Found'),NO_DATA)
                }
                return successResponseData(res,data,SUCCESS,res.__('Group Data Added Successfully'))
            }).catch((err)=>{ 
                return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
            })
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something went wrong',FAIL)
        })
     },

     groupGetService : async (req,res,next)=>{
        await group.findAll()
        .then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No Group Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Group Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
         })
    },

     groupFindOneController : async (req, res,next) => {
        await group.findByPk(req.params.id)
        .then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No Group Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Group Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
         })
    },

    groupDeleteController : async (req , res ,next) => {
        await group.destroy({
            where: {
              id: req.params.id
            }
          }).then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No Group Data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('Group Data Deleted Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
         })
    },

    groupUpdateController : async (req,res,next)=>{
        body=req.body

        const reqObj = {
            groupName: Joi.string().required(),
            groupDesc : Joi.string().optional().allow(''),
            groupIcon: Joi.string().optional().allow(''),
            groupBasedOn: Joi.string().required(),
            };
        
            const schema = Joi.object(reqObj);
            const { error } = schema.validate(body);
        
            if (error) {
                return validationErrorResponseData(
                    res,
                    (validationMessageKey("Service validation", error))
                );
            }

        await group.update({ 
            groupName: body.groupName,
            groupDesc: body.groupDesc,
            groupIcon: body.groupIcon,
            groupPosition: body.groupPosition,
         }, {
            where: {
              id:req.params.id
            }
          }).then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No Group Data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('Group Data Updated Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,'Something Went Wrong',FAIL)
         })
    },
}