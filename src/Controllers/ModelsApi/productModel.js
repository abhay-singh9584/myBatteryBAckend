const { productModel, group,batteryBrand } = require("../../models");
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
      groupId: Joi.number().required(),
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
      groupId: body.groupId,
      brandId: body.brandId
    };

    let productModelDetails = await productModel.findOne({
      where: { modelName: body.modelName, groupId: body.groupId},
    });

    if (productModelDetails) {
      return errorResponseWithoutData(
        res,
        res.__("productModel Already Exists"),
        FAIL
      );
    }

    await productModel
      .create(productModelObj)
      .then((data) => {
        if (!data) {
          return successResponseWithoutData(
            res,
            res.__(res.__("Something Went Wrong")),
            NO_DATA
          );
        }
        return successResponseData(
          res,
          data,
          SUCCESS,
          res.__("productModel Added Successfully")
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
          return successResponseWithoutData(
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
          return successResponseWithoutData(
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
        groupId: Joi.number().required(),
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
            groupId: body.modelGroupId,
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
          return successResponseWithoutData(
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
