const { productType } = require("../../models");
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
  createProductType: async (req, res) => {
    body = req.body;
    const reqObj = {
      typeName: Joi.string().required(),
      typeDesc: Joi.string().optional().allow(""),
      typeIcon: Joi.string().optional().allow(""),
      typePosition: Joi.number().required(),
    };

    const schema = Joi.object(reqObj);
    const { error } = schema.validate(body);

    if (error) {
      return validationErrorResponseData(
        res,
        validationMessageKey("Service Validation", error)
      );
    }

    let productTypeDetails = await productType.findOne({
      where: { typeName: body.typeName },
    });

    let productTypePositionDetails = await productType.findOne({
      where: {
        typePosition: body.typePosition,
      },
    });

    if (productTypeDetails) {
      return errorResponseWithoutData(
        res,
        res.__("productType Already Exists"),
        FAIL
      );
    } else if (productTypePositionDetails) {
      return errorResponseWithoutData(
        res,
        res.__("productType Position Already Exists"),
        FAIL
      );
    }

    await productType
      .create({
        typeName: body.typeName,
        typeDesc: body.typeDesc,
        typeIcon: body.typeIcon,
        typePosition: body.typePosition,
      })
      .then((Product_data) => {
        if (!Product_data && Product_data.length==0) {
          return successResponseWithoutData(
            res,
            res.__("No Data Found"),
            NO_DATA
          );
        }
        return successResponseData(
          res,
          Product_data,
          SUCCESS,
          res.__("type Data Found Successfully")
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

  productTypeGetService: async (req, res) => {
    const { typeId, sortBy } = req.query;

    let options = {
      where: {},
      attributes: { exclude: ["createdAt", "updatedAt"] },
    };
    if (sortBy) {
      options.order = [["id", "DESC"]];
    }
    if (typeId) {
      options["where"]["id"] = typeId;
    }

    let method = productType.findAll(options);

    method
      .then((data) => {
        if (!data.length>0) {
          return successResponseWithoutData(
            res,
            res.__("No Data Found"),
            NO_DATA
          );
        }
        return successResponseData(
          res,
          data,
          SUCCESS,
          res.__("type Data Found Successfully")
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

  productTypeDeleteController: async (req, res) => {
    let productTypeExistingData = await productType.findByPk(req.params.id);

    if (!productTypeExistingData) {
      errorResponseWithoutData(res, res.__("No Such Id Found"), NO_DATA);
    }

    await productType
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then((Product_data) => {
        if (!Product_data && Product_data.length == 0) {
          return errorResponseWithoutData(
            res,
            res.__("No Data Found"),
            NO_DATA
          );
        }
        return successResponseWithoutData(
          res,
          res.__("type Data Deleted Successfully"),
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

  productTypeUpdateController: async (req, res) => {
    body = req.body;
    const reqObj = {
      typeName: Joi.string().required(),
      typeDesc: Joi.string().optional().allow(""),
      typeIcon: Joi.string().optional().allow(""),
      typePosition: Joi.number().required(),
    };

    const schema = Joi.object(reqObj);
    const { error } = schema.validate(body);

    if (error) {
      return validationErrorResponseData(
        res,
        validationMessageKey("Service Validation", error)
      );
    }

    const productTypeDetails = await productType.findOne({
      where: { id: req.params.id },
    });
    if (!productTypeDetails) {
      return errorResponseWithoutData(res, "No Such Id Found", NO_DATA);
    }

    await productType
      .update(
        {
          typeName: body.typeName,
          typeDesc: body.typeDesc,
          typeIcon: body.typeIcon,
          typePosition: body.typePosition,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
      .then((Product_data) => {
        if (!Product_data && Product_data.length == 0) {
          return successResponseWithoutData(
            res,
            res.__("No Data Found"),
            NO_DATA
          );
        }
        return successResponseWithoutData(
          res,
          res.__("type Data Updated Successfully"),
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