const { productPricing } = require("../../models");
const {
  successResponseData,
  validationMessageKey,
  successResponseWithoutData,
  errorResponseWithoutData,
  errorResponseData,
  validationErrorResponseData,
} = require("../../Helper/Responce");
const { isAuthenticRequest } = require("../../Middleware/apiAuth");

const Joi = require("joi");
const { SUCCESS, FAIL, NO_DATA, CONFLICT } = require("../../Helper/Constant");

module.exports = {
  createProductPricing: async (req, res) => {
    body = req.body;
    const reqObj = {
      mrpIcon: Joi.string().optional().allow(""),
      mrpUnit: Joi.string().optional().allow(""),
      mrpValue: Joi.number().optional().allow(""),
      mopIcon: Joi.string().optional().allow(""),
      mopUnit: Joi.string().optional().allow(""),
      mopValue: Joi.number().optional().allow(""),
      dpIcon: Joi.string().optional().allow(""),
      dpUnit: Joi.string().optional().allow(""),
      dpValue: Joi.number().optional().allow(""),
      nlcIcon: Joi.string().optional().allow(""),
      nlcUnit: Joi.string().optional().allow(""),
      nlcValue: Joi.number().optional().allow(""),
    };

    const productPricingObj={
      mrpIcon: body.mrpIcon,
      mrpUnit: body.mrpUnit,
      mrpValue: body.mrpValue,
      mopIcon: body.mopIcon,
      mopUnit: body.mopUnit,
      mopValue: body.mopValue,
      dpIcon: body.dpIcon,
      dpUnit: body.dpUnit,
      dpValue: body.dpValue,
      nlcIcon: body.nlcIcon,
      nlcUnit: body.nlcUnit,
      nlcValue: body.nlcValue,
    }

    const schema = Joi.object(reqObj);
    const { error } = schema.validate(body);

    if (error) {
      return validationErrorResponseData(
        res,
        validationMessageKey("Service Validation", error)
      );
    }

    const productPricingDetail=await productPricing.findOne({where:productPricingObj})

    if(productPricingDetail){
      return errorResponseWithoutData(
        res,
        res.__("Data Already Exists"),
        FAIL
      );
    }

    await productPricing
      .create(productPricingObj)
      .then((product_pricing) => {
        if (!product_pricing && product_pricing.length == 0) {
          return errorResponseWithoutData(
            res,
            res.__("No Data Found"),
            NO_DATA
          );
        }
        return successResponseData(
          res,
          product_pricing,
          SUCCESS,
          res.__("Product Pricing Data Created Successfully")
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

  productPricingGetService: async (req, res) => {

    const { productId, sortBy } = req.query;

    let options = {
      where: {},
      attributes: { exclude: ["createdAt", "updatedAt"] },
    };
    if (sortBy) {
      options.order = [["id", "DESC"]];
    }
    if (productId) {
      options["where"]["id"] = productId;
    }

    let method = productPricing.findAll(options);

    method
      .then((data) => {
        if (!data.length>0) {
          return errorResponseWithoutData(
            res,
            res.__("No Data Found"),
            NO_DATA
          );
        }
        return successResponseData(
          res,
          data,
          SUCCESS,
          res.__("mrp Data Found Successfully")
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

  productPricingDeleteController: async (req, res) => {

    let productPricingExistingData = await productPricing.findByPk(
      req.params.id
    );

    if (!productPricingExistingData) {
      errorResponseWithoutData(res, res.__("No Such Id Found"), NO_DATA);
    }

    await productPricing
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then((product_pricing) => {
        if (!product_pricing && product_pricing.length == 0) {
          return errorResponseWithoutData(
            res,
            res.__("No Data Found"),
            NO_DATA
          );
        }
        return successResponseWithoutData(
          res,
          res.__("mrp Data Deleted Successfully"),
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

  productPricingUpdateController: async (req, res) => {
    body = req.body;
    const reqObj = {
      mrpIcon: Joi.string().optional().allow(""),
      mrpUnit: Joi.string().optional().allow(""),
      mrpValue: Joi.number().optional().allow(""),
      mopIcon: Joi.string().optional().allow(""),
      mopUnit: Joi.string().optional().allow(""),
      mopValue: Joi.number().optional().allow(""),
      dpIcon: Joi.string().optional().allow(""),
      dpUnit: Joi.string().optional().allow(""),
      dpValue: Joi.number().optional().allow(""),
      nlcIcon: Joi.string().optional().allow(""),
      nlcUnit: Joi.string().optional().allow(""),
      nlcValue: Joi.number().optional().allow(""),
    };

    const schema = Joi.object(reqObj);
    const { error } = schema.validate(body);

    if (error) {
      return validationErrorResponseData(
        res,
        validationMessageKey("Service Validation", error)
      );
    }

    const productPricingDetails = await productPricing.findOne({
      where: { id: req.params.id },
    });
    if (!productPricingDetails) {
      return errorResponseWithoutData(res, "No Such Id Found", NO_DATA);
    }

    await productPricing
      .update(
        {
          mrpIcon: body.mrpIcon,
          mrpUnit: body.mrpUnit,
          mrpValue: body.mrpValue,
          mopIcon: body.mopIcon,
          mopUnit: body.mopUnit,
          mopValue: body.mopValue,
          dpIcon: body.dpIcon,
          dpUnit: body.dpUnit,
          dpValue: body.dpValue,
          nlcIcon: body.nlcIcon,
          nlcUnit: body.nlcUnit,
          nlcValue: body.nlcValue,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
      .then((product_pricing) => {
        if (!product_pricing && product_pricing.length == 0) {
          return errorResponseWithoutData(
            res,
            res.__("No Data Found"),
            NO_DATA
          );
        }
        return successResponseWithoutData(
          res,
          res.__("mrp Data Updated Successfully"),
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
