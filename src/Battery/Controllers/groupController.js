const { SUCCESS, FAIL, NO_DATA } = require('../../Helper/Constant');
const { successResponseData, successResponseWithoutData, errorResponseWithoutData, validationMessageKey, validationErrorResponseData } = require('../../Helper/Responce');
const {group}=require('../../models/index')
const Joi=require('joi')
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
                (validationMessageKey("Service Validation", error))
            );
        }

        let groupDetails =  await group.findOne({
            where : {groupName : body.groupName 
        }})

        if(groupDetails){
            return errorResponseWithoutData(res,res.__('Group Already Exists'),FAIL)
        }
        
        await group.create({
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
            return errorResponseWithoutData(resres.__,'Something Went Wrong',FAIL)
        })
     },

     groupGetService : async (req,res,next)=>{

        const {groupId} = req.query;
        let options = {
            where :{},
            
            attributes : { exclude :["createdAt","updatedAt"] }
        }

        if(groupId){
            options["where"]['id'] =  groupId 
        }

        let method = group.findAll(options);

        method.then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No Group Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('Group Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
         })
    },

    groupDeleteController : async (req , res ,next) => {

        let groupExistingData=await group.findByPk(req.params.id)

        if(!groupExistingData){
            errorResponseWithoutData(res,res.__('No Such Id Found'),NO_DATA)
        }

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
            return errorResponseWithoutData(resres.__,'Something Went Wrong',FAIL)
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
                (validationMessageKey("Service Validation", error))
            );
        }

        const groupDetails=await group.findOne({where:{id:req.params.id}})
        if(!groupDetails){
            return errorResponseWithoutData(res,'No Such Id Found',NO_DATA)
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
            return errorResponseWithoutData(resres.__,'Something Went Wrong',FAIL)
         })
    },
}