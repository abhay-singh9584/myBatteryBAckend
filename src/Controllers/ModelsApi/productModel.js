const { productModel,modelgroup, group,batteryBrand } = require("../../models");
const {
  successResponseData,
  validationMessageKey,
  successResponseWithoutData,
  errorResponseWithoutData,
  errorResponseData,
  validationErrorResponseData,
} = require("../../Helper/Responce");
const Joi = require("joi");
const { SUCCESS, FAIL, NO_DATA } = require("../../Helper/Constant");


module.exports = {
  createProductModel: async (req, res) => {
    body = req.body;
    const reqObj = {
      modelName: Joi.string().required(),
      modelType: Joi.string().optional().allow(""),
      modelDesc: Joi.string().optional().allow(""),
      modelUrl: Joi.string().required(),
      brandId: Joi.string().required(),
      groupId: Joi.array().required(),
    };

    const schema = Joi.object(reqObj);
    const { error } = schema.validate(body);

    if (error) {
      return validationErrorResponseData(
        res,
        validationMessageKey("Service Validation", error)
      );
    }

    let productModelObj = {
      modelName: body.modelName,
      modelType: body.modelType,
      modelDesc: body.modelDesc,
      modelUrl: body.modelUrl,
      brandId: body.brandId
    };

    const groupIdArray=body.groupId

    // let productModelDetails = await productModel.findOne({
    //   where: { productModelObj},
    // });

    let brandDetails = await batteryBrand.findByPk(body.brandId);
    // let groupDetails = await group.findByPk(body.groupId);

    if(brandDetails){
      return errorResponseWithoutData(
        res,
        res.__("No Battery Brand Exists with given id"),
        FAIL
      );
    }

    // if(groupDetails){
    // return errorResponseWithoutData(
    //   res,
    //     res.__("No Group Exists with given id"),
    //     FAIL
    //   );
    // }

    // if (productModelDetails.length>0) {
    //   return errorResponseWithoutData(
    //     res,
    //     res.__("productModel Already Exists"),
    //     FAIL
    //   );
    // }

    await productModel
      .create(productModelObj)
      .then((data) => {
        if (!data) {
          return errorResponseWithoutData(res,res.__(res.__("Something Went Wrong")),NO_DATA);
        }

        const modelGroupObj=[]

        groupIdArray.forEach(async (groupData,i)=>{

            const obj={
                groupId:groupData,
                modelId:data.id,
            }
            modelGroupObj.push(obj)

        })
        modelgroup.bulkCreate(modelGroupObj)
        .then((groupModel)=>{
            if(!groupModel.length>0){
                return errorResponseWithoutData(res, res.__('No Model Data Found'),NO_DATA)
            }
            return successResponseData(res,groupModel,SUCCESS,res.__('Model Found Successfully'))
        }).catch((err)=>{ 
          console.log(err);
          return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
      })
        }).catch((err)=>{ 
            console.log(err);
            return errorResponseWithoutData(res,res.__('Something Went Wrong'),FAIL)
        })
        
  },

  productModelGetService: async (req, res) => {

    const { productModelId, groupId } = req.query;
    let options = {
      where: {},
      include: [   
        {
            model: batteryBrand,
            attributes: ["id","brandName"],
            where:{}
        },{
            model: group,
            attributes: ["id","groupName"],
            where: {},
          },
      ],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    };

    if (groupId) {
      options["include"][0]["where"]["id"] = groupId;
    }

    let method = productModel.findAll(options);

    if (productModelId) {
      options["where"]["id"] = productModelId;
      method = productModel.findOne(options);
    }

    method
      .then((data) => {
        if (!data.length>0) {
          return errorResponseWithoutData(
            res,
            res.__("No productModel Data Found"),
            NO_DATA
          );
        }
        return successResponseData(
          res,
          data,
          SUCCESS,
          res.__("productModel Found Successfully")
        );
      })
      .catch((err) => {
          console.log(err)
        return errorResponseWithoutData(
          res,
          res.__("Something Went Wrong"),
          FAIL
        );
      });
  },

  productModelDeleteController: async (req, res) => {
    let productModelExistingData = await productModel.findByPk(req.params.id);

    if (!productModelExistingData) {
      errorResponseWithoutData(res, res.__("No Such Id Found"), NO_DATA);
    }

    await productModel
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then((data) => {
        if (!data) {
          return errorResponseWithoutData(
            res,
            res.__("No productModel Data Found"),
            NO_DATA
          );
        }
        return successResponseWithoutData(
          res,
          res.__("Data Deleated Successfully"),
          SUCCESS
        );
      })
      .catch((err) => {
        return errorResponseWithoutData(
          res,
          res.__("Something Went Wrong"),
          FAIL
        );
      });
  },

  productModelUpdateController: async (req, res) => {
    body = req.body;
    const reqObj = {
        modelName: Joi.string().required(),
        modelType: Joi.string().optional().allow(""),
        modelDesc: Joi.string().optional().allow(""),
        modelUrl: Joi.string().required(),
        brandId: Joi.string().required(),
        groupId: Joi.array().required(),
    };

    const schema = Joi.object(reqObj);
    const { error } = schema.validate(body);

    if (error) {
      return validationErrorResponseData(
        res,
        validationMessageKey("Service Validation", error)
      );
    }

    const productModelDetails = await productModel.findOne({
      where: { id: req.params.id },
    });
    if (!productModelDetails) {
      return errorResponseWithoutData(res, "No Such Id Found", NO_DATA);
    }

    await productModel
      .update(
        {
            modelName: body.modelName,
            modelType: body.modelType,
            modelDesc: body.modelDesc,
            modelUrl: body.modelUrl,
            brandId: body.brandId
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
      .then((data) => {
        if (!data) {
          return errorResponseWithoutData(
            res,
            res.__("No productModel Data Found"),
            NO_DATA
          );
        }
        return successResponseWithoutData(
          res,
          res.__("Data Updated Successfully"),
          SUCCESS
        );
      })
      .catch((err) => {
        return errorResponseWithoutData(
          res,
          res.__("Something Went Wrong"),
          FAIL
        );
      });
  },
};
