const {oemBrand}=require('../../models/index')
const Joi=require('joi');
const { validationErrorResponseData, validationMessageKey, successResponseWithoutData, successResponseData, errorResponseWithoutData } = require('../../Helper/Responce');
const { NO_DATA, SUCCESS, FAIL } = require('../../Helper/Constant');

module.exports = {

    oemBrandCreateController : async (req,res,next)=>{
        
        body=req.body
        const reqObj = {
            OEMBrand: Joi.string().required().allow(''),
            OEMBrandImage : Joi.string().optional().allow(''),
            OEMB: Joi.string().optional().allow(''),
            };
        
        const schema = Joi.object(reqObj);
        const { error } = schema.validate(body);
    
        if (error) {
            return validationErrorResponseData(
                res,
                (validationMessageKey("Service Validation", error))
            );
        }
    
        // let oemBrandDetails =  await oemBrand.findOne({
        //     where : {OEMBrand : body.OEMBrand 
        //     }})

        // if(oemBrandDetails){
        //     return errorResponseWithoutData(res,res.__('oemBrand Already Exists'),FAIL)
        // }

        await oemBrand.create({
            OEMBrand: body.OEMBrand,
            OEMBrandImage: body.OEMBrandImage,
            OEMB: body.OEMB,
        })
        .then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No OEM Brand Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('OEM Brand Data Added Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
        })
     },

     oemBrandGetService : async (req,res,next)=>{

        const {OEMBrandId} = req.query;
        let options = {
            where :{},
            
            attributes : { exclude :["createdAt","updatedAt"] }
        }
        
        if(OEMBrandId){
            options["where"]['id'] =  OEMBrandId 
        }

        let method = oemBrand.findAll(options);

        method.then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No OEM Brand Data Found'),NO_DATA)
            }
            return successResponseData(res,data,SUCCESS,res.__('OEM Brand Data Found Successfully'))
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
         })
    },

     

    oemBrandDeleteController : async (req , res ,next) => {

        let oemBrandExistingData=await oemBrand.findByPk(req.params.id)

        if(!oemBrandExistingData){
            errorResponseWithoutData(res,res.__('No Such Id Found'),NO_DATA)
        }

        await oemBrand.destroy({
            where: {
              id: req.params.id
            }
          }).then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No OEM Brand Data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('OEM Brand Data Deleted Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
         })
    },

    oemBrandUpdateController : async (req,res,next)=>{

        body=req.body
        const reqObj = {
            OEMBrand: Joi.string().required(),
            OEMBrandImage : Joi.string().optional().allow(''),
            OEMB: Joi.string().optional().allow(''),
            };
        
        const schema = Joi.object(reqObj);
        const { error } = schema.validate(body);
    
        if (error) {
            return validationErrorResponseData(
                res,
                (validationMessageKey("Service Validation", error))
            );
        }

        const oemBrandDetails=await oemBrand.findOne({where:{id:req.params.id}})
        if(!oemBrandDetails){
            return errorResponseWithoutData(res,'No Such Id Found',NO_DATA)
        }

        await oemBrand.update({ 
            OEMBrand: body.OEMBrand,
            OEMBrandImage: body.OEMBrandImage,
            OEMB: body.OEMB,
         }, {
            where: {
              id:req.params.id
            }
          }).then((data)=>{
            if(!data){
                return successResponseWithoutData(res, res.__('No OEM Brand Data Found'),NO_DATA)
            }
            return successResponseWithoutData(res,res.__('OEM Brand Data Updated Successfully'),SUCCESS)
        }).catch((err)=>{ 
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
         })
    },
}
