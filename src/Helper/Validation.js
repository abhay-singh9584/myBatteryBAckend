/***
     * @description This function use for create validation unique key
     * @param apiTag
     * @param error
     * @returns {*}
     */
validationMessageKey= (apiTag, error) => {
    let key = module.exports.toUpperCase(error.details[0].context.key);
    let type = error.details[0].type.split(".");
    type = module.exports.toUpperCase(type[1]);
    key = apiTag + " " + key + " " + type;
    return key;
}

const reqObj = {
    service_name: Joi.string().required(),
    service_charge: Joi.number().required(),
    service_status : Joi.string().required().valid(YES,NO),
    service_categories: Joi.string().required(),
    days_available: Joi.string().required(),
};

const schema = Joi.object(reqObj);
const { error } = schema.validate(requestParam);

if (error) {
    return Response.validationErrorResponseData(
        res,
        res.__(Helper.validationMessageKey("Service validation", error))
    );
}