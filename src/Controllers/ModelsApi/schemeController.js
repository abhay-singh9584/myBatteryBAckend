const {scheme,group}=require('../../models')
const {successResponseData,validationMessageKey, successResponseWithoutData, errorResponseWithoutData, errorResponseData, validationErrorResponseData}=require('../../Helper/Responce')
const Joi = require('joi')
const { SUCCESS, FAIL, NO_DATA } = require('../../Helper/Constant')

module.exports ={

    createScheme : async (req,res)=>{

        body=req.body
        const reqObj = {
            schemeName: Joi.string().required(),
            schemeType: Joi.string().optional().allow(''),
            schemeDesc : Joi.string().optional().allow(''),
            schemeUrl: Joi.string().required(),
            schemeGroupId: Joi.number().required(),
        };

        const schema = Joi.object(reqObj);
        const { error } = schema.validate(body);

        if (error) {
            return validationErrorResponseData(
                res,
                (validationMessageKey("Service Validation", error))
            );
        }

        let groupDetails = await group.findByPk(body.schemeGroupId);

        if(!groupDetails){
            return errorResponseWithoutData(
                res,res.__('No Group Exists With Given Id'),FAIL)
        }

        let schemeObj = {
            schemeName: body.schemeName,
            schemeType: body.schemeType,
            schemeDesc: body.schemeDesc,
            schemeUrl: body.schemeUrl,
            schemeGroupId: body.schemeGroupId,
        }

        let schemeDetails =  await scheme.findOne({
            where : {schemeName : body.schemeName 
                , schemeGroupId : body.schemeGroupId 
            }})

        if(schemeDetails){
            return errorResponseWithoutData(res,res.__('Scheme Already Exists'),FAIL)
        }

    await scheme.create(schemeObj)
        .then((data)=>{
        if(!data){
            return successResponseWithoutData(res, res.__(res.__('Something Went Wrong')),NO_DATA)
        }
        return successResponseData(res,data,SUCCESS,res.__('scheme Added Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
        })
    },

    schemeGetService : async (req,res)=>{

        const {schemeId ,groupId} = req.query;
        let options = {
            where :{},
            include:[
                {
                    model : group,
                    attributes :["id","groupName"],
                    where :{}
                }
            ],
            attributes : { exclude :["createdAt","updatedAt"] }
        }

        if(groupId){
            options["include"][0]["where"]['id'] =  groupId 
        }

        let method = scheme.findAll(options);

        if(schemeId){
            options['where']['id'] = schemeId;
            method = scheme.findOne(options)   
        }

        method.then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No scheme Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('scheme Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
        })
    },

    schemeDeleteController: async (req , res ) => {
        
        let schemeExistingData=await scheme.findByPk(req.params.id)

        if(!schemeExistingData){
            errorResponseWithoutData(res,res.__('No Such Id Found'),NO_DATA)
        }

        await scheme.destroy({
            where: {
            id: req.params.id
            }
        }).then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No scheme Data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('Data Deleated Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
        })
    },

    schemeUpdateController : async (req,res)=>{

        body=req.body
        const reqObj = {
            schemeName: Joi.string().required(),
            schemeType: Joi.string().optional().allow(''),
            schemeDesc : Joi.string().optional().allow(''),
            schemeUrl: Joi.string().required(),
            schemeGroupId: Joi.number().required(),
            };
        
        const schema = Joi.object(reqObj);
        const { error } = schema.validate(body);
    
        if (error) {
            return validationErrorResponseData(
                res,
                (validationMessageKey("Service Validation", error))
            );
        }
    
        const schemeDetails=await scheme.findOne({where:{id:req.params.id}})
        if(!schemeDetails){
            return errorResponseWithoutData(res,'No Such Id Found',NO_DATA)
        }

        await scheme.update({ 
            schemeName: body.schemeName,
            schemeType: body.schemeType,
            schemeDesc: body.schemeDesc,
            schemePosition: body.schemePosition,
            schemeGroupName: body.schemeLogo,
        }, {
            where: {
            id:req.params.id
            }
        }).then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No scheme Data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('Data Updated Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
        })
        }
}