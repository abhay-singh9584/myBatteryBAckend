const { User} = require("../../models");
const Helper = require("../../Helper/Responce");
const Response = require("../../Helper/Responce");
const bcrypt = require("bcrypt");
const { ACTIVE, SUCCESS, DELETE, UNAUTHORIZED } = require("../../Helper/Constant");
const jwToken = require("../../services/jwtToken.js");
const { Op } = require("sequelize");
const Joi = require("joi");
const moment = require("moment");
const path = require("path");

module.exports = {
	signup: async (req, res) => {
		const reqParam = req.body;
		const reqObj = {
			name: Joi.string().trim().max(50).required(),
			email: Joi.string().email().required(),
			contact: Joi.string().regex(/^[0-9]{10}$/).required(),
		};
		const schema = Joi.object(reqObj);
		const { error } = await schema.validate(reqParam);
		if (error) {
			return Response.validationErrorResponseData(
				res,
				res.__(Helper.validationMessageKey("Sign up validation", error))
			);
		} else {
			if (reqParam.email && reqParam.email !== "") {
				const userEmailExist = await User.findOne({
					where: {
						email: reqParam.email,
						// status: {
						// 	[Op.not]: DELETE,
						// },
					},
				}).then(userEmailData => userEmailData);

				if (userEmailExist) {
					return Response.errorResponseWithoutData(
						res,
						res.locals.__(
							"Email address is already registered with us"
						)
					);
				}

				// const DeletduserEmailExist = await User.findOne({
				// 	where: {
				// 		email: reqParam.email,
				// 		status: {
				// 			[Op.eq]: DELETE,
				// 		},
				// 	},
				// }).then(userEmailData => userEmailData);

				// if (DeletduserEmailExist) {
				// 	return Response.errorResponseWithoutData(
				// 		res,
				// 		res.locals.__(
				// 			"Email address is already registered with us, with deleted status"
				// 		)
				// 	);
				// }
			}

			// const passwordHash = bcrypt.hashSync(reqParam.password, 10);
			let userObj = {
				name: reqParam.name,
				email: reqParam.email,
				contact: reqParam.contact,
				// status: ACTIVE,
			};

			await User.create(userObj)
				.then(async result => {
					if (!result) {
						return Response.errorResponseData(
							res,
							res.__("Something went wrong")
						);
					}

					const token = jwToken.issueUser({
						id: result.id,
						email: result.email,
					});

					result.reset_token = token;
					result.save();

					return Response.successResponseData(
						res,
						result,
						res.__("User added successfully")
					);
				})
				.catch(e => {
					console.log(e);
					return Response.errorResponseData(
						res,
						res.__("Something went wrong")
					);
				});
		}
	},

	login: async (req, res) => {
		const reqParam = req.body;
		const reqObj = {
			contact: Joi.string().email().required(),
			// password: Joi.string().required(),
		};
		const schema = Joi.object(reqObj);
		const { error } = await schema.validate(reqParam);
		if (error) {
			console.log(error);
			return Response.validationErrorResponseData(
				res,
				res.__(Helper.validationMessageKey("Login validation", error))
			);
		} else {
			let user = await User.findOne({
				where: {
					contact: reqParam.contact,
					// status: {
                    //     [Op.eq]: ACTIVE ,
                    // },
				},
			}).then(customerData => customerData);

			if (!user) {
				return Response.errorResponseWithoutData(
					res,
					res.locals.__("Contact doesn't Exist")
				);
			}

			// bcrypt.compare(
			// 	reqParam.password,
			// 	user.password,
			// 	async (err, result) => {
			// 		if (err) {
			// 			return Response.errorResponseWithoutData(
			// 				res,
			// 				res.locals.__("Wrong password entered")
			// 			);
			// 		}

			// 		const token = jwToken.issueUser({
			// 			id: user.id,
			// 			email: user.email,
			// 		});

			// 		user.reset_token = token;
			// 		user.save().then(
			// 			async updateData => {
			// 				if (updateData) {
			// 					updateData = {
			// 						id: updateData.id,
			// 						name: updateData.name,
			// 						email: updateData.email,
			// 						status: updateData.status,
			// 						reset_token: updateData.reset_token,
			// 					};

			// 					console.log();
			// 					return Response.successResponseData(
			// 						res,
			// 						updateData,
			// 						res.locals.__("Logged in successfully")
			// 					);
			// 				} else {
			// 					return Response.errorResponseData(
			// 						res,
			// 						res.__("Something went wrong")
			// 					);
			// 				}
			// 			},
			// 			e => {
			// 				console.log(e);
			// 				Response.errorResponseData(
			// 					res,
			// 					res.__("Internal error")
			// 				);
			// 			}
			// 		);
			// 		return null;
			// 	}
			// );
		}
	},

	socialLogin:async(req,res) =>{
		
        const reqParam = req.body
        const reqObj = {
            social_login_type: Joi.number().required(),
            name: Joi.string().optional(),
            email: Joi.string().email().optional(),
            social_login_id: Joi.string().required(),
        }

        const schema = Joi.object(reqObj)
        const { error } = await schema.validate(reqParam)
        if (error) {
            return Response.validationErrorResponseData(
                res,
                res.__(Helper.validationMessageKey('Login validation', error))
            )
        } else {
            console.log(reqParam.social_login_id)
            User.findOne({
                where: {
                    social_login_id: reqParam.social_login_id,
                    status: {
                        [Op.eq]: ACTIVE,
                    },
                },
            }).then(async(user) => {
                if (user) {
                    console.log(user)
                    const token = jwToken.issueUser({
                        id: user.id,
                        email: user.email,
                    })
                    user.reset_token = token
                    if (user.social_login_id === reqParam.social_login_id){
                        if (user.status === ACTIVE) {

							user.save()
                            .then(async(updateData) => {
                                if (updateData) {

									console.log(" :: updateData : :", updateData);

									updateData = {
										id: updateData.id,
										name: updateData.name,
										email: updateData.email,
										status: updateData.status,
										reset_token: updateData.reset_token,
									};

                                    return Response.successResponseData(
                                        res,
                                        updateData,
                                        res.locals.__('Logged in successfully'),
                                    )
                                } else {
                                    return Response.errorResponseData(
                                        res,
                                        res.__('Something went wrong')
                                    )
                                }
                            }, (e) => {
                                Response.errorResponseData(
                                    res,
                                    res.__('Internal error'),
                                    INTERNAL_SERVER
                                )
                            })
                        } else {
                            Response.errorResponseWithoutData(
                                res,
                                res.locals.__('Account is inactive'),
								UNAUTHORIZED
                            )
                        }
                    } else {
                        const updateObj = {
                            social_login_id: reqParam.social_login_id,
                            social_login_type: reqParam.social_login_type,
                            reset_token: token,
                        }
                        User.update(updateObj, {
                            where: { social_login_id: reqParam.social_login_id },
                        }).then(async(updateData) => {
                            if (updateData) {
                                var data = {
                                    id: user.id,
                                    email: user.email,
                                    token: token
                                }
                                return Response.successResponseData(
                                    res,
                                    data,
                                    SUCCESS,
                                    res.locals.__('Login success')
                                )

                            } else {
                                return Response.errorResponseData(
                                    res,
                                    res.__('Something went wrong')
                                )
                            }
                        }, (e) => {
                            Response.errorResponseData(
                                res,
                                res.__('Internal error'),
                                INTERNAL_SERVER
                            )
                        })
                    }
                } else {
                    console.log(user)
                        //start else
					
					if(!reqParam.email || !reqParam.name){
						return Response.errorResponseData(
                            res,
                            res.__('Email Or Name missing'),
                        )
					}	

                    let emailExistData = await User.findOne({
                        where :{
                            email : reqParam.email
                        }
                    })
                    if(emailExistData){
                        return Response.errorResponseData(
                            res,
                            res.__('Email already Exist'),
                        )
                    }
                        

                    const reqObj = {
                        email: reqParam.email,
                        name: reqParam.name,
                        status: ACTIVE,
                        social_login_id: reqParam.social_login_id,
                        social_login_type: reqParam.social_login_type,
                    }
                    await User.create(reqObj)
                        .then(async(result) => {
                            if (result) {
                                const token = jwToken.issueUser({
                                    id: result.id,
                                    email: result.email,
                                })
                                result.reset_token = token
								result.save()
                               .then(async(updateData) => {
                                    if (updateData) {

										updateData = {
											id: updateData.id,
											name: updateData.name,
											email: updateData.email,
											status: updateData.status,
											reset_token: updateData.reset_token,
										};

                                        return Response.successResponseData(
                                            res,
											updateData,
                                            res.locals.__('User Added Successfully'),
                                        )

                                    } else {
                                        return Response.errorResponseData(
                                            res,
                                            res.__('Something went wrong')
                                        )
                                    }
                                }, (e) => {
                                    Response.errorResponseData(
                                        res,
                                        res.__('Something went wrong'),
                                    )
                                })
                            }
                        })
                        .catch((e) => {
                            console.log("enter", e)
                            return Response.errorResponseData(
                                res,
                                res.__('Something went wrong')
                            )
                        })

                    //end else
                }
            }, (e) => {
                console.log("enter2", e)
                Response.errorResponseData(
                    res,
                    res.__('Something went wrong'),
                )
            })
        }
    },
	
	userProfile : async(req,res) =>{
		const {authUserId} = req;
		let arr = [
			{
				model : City,
			},
			{
				model : ProfileTags,
				attributes :['id','name'],
				through: {attributes: []}
			}
		]

		await User.findByPk(authUserId,{include : arr})
			.then(userDetails =>{
				if(!userDetails){
					return Response.successResponseWithoutData(
						res,
						res.__('No user found')
					)
				}
		
				return Response.successResponseData(
					res,
					userDetails,
					res.__('User details found successfully')
				)
			})
			.catch(err => {
				console.log("err :: ", err);
				return Response.errorResponseData(
					res,
					res.__('Something went wrong')
				)
			})
	},

	editUserProfile : async(req,res) =>{
		const reqParam = req.fields;
		const {authUserId} = req;
		const files =  req.files ;

		const reqObj = {
			name: Joi.string().trim().max(50).optional(),
			display_name :  Joi.string().trim().max(50).optional(),
			country_id : Joi.number().optional(),
			city_id : Joi.number().optional(),
			state_id :  Joi.number().optional(),
			dob : Joi.date().optional(),
			profile_tags :  Joi.string().trim().optional(),
			bio:  Joi.string().optional()
		};
		const schema = Joi.object(reqObj);
		const { error } = await schema.validate(reqParam);
		if (error) {
			return Response.validationErrorResponseData(
				res,
				res.__(Helper.validationMessageKey("Edit profile validation", error))
			);
		}

		User.findByPk(authUserId)
			.then( async data =>{

				if(!data){
					return Response.successResponseWithoutData(
						res,
						res.__('No user found')
					)
				}

				let imageName;
				if(files.image && files.image.size > 0){

					if(data.image){
						return Response.errorResponseData(
							res,
							res.__('You already have an image, first delete it !')
						)
					}

					const extension = files.image.type;
					const imageExtArr = ['image/jpg', 'application/octet-stream', 'image/jpeg', 'image/png'];
					if (files.image && (!imageExtArr.includes(extension))) {
						return Response.errorResponseData(res, res.__('Image invalid'));
					}
					imageName = `${files.image.name.split(".")[0]}${moment().unix()}${path.extname(files.image.name)}` ;
					Helper.ImageUpload(files.image.path,res,imageName)
				}

				if(reqParam.profile_tags){
					let profileTagsArray = reqParam.profile_tags.split(",");
					await UserProfileTags.destroy({where : {user_id : authUserId}});
					let obj = [];
					await profileTagsArray.forEach( data => {
						obj.push(
							{
								user_id : authUserId,
								tag_id : data
							}
						)
					});
					UserProfileTags.bulkCreate(obj);
				}

				data.name = reqParam.name ? data.name = reqParam.name : data.name = data.name;
				data.display_name = reqParam.display_name ? data.display_name = reqParam.display_name :  data.display_name = data.display_name;
				data.country_id = reqParam.country_id ? data.country_id = reqParam.country_id : data.country_id = data.country_id ;
				data.city_id = reqParam.city_id ? data.city_id = reqParam.city_id : data.city_id = data.city_id ;
				data.state_id = reqParam.state_id ? data.state_id = reqParam.state_id : data.state_id = data.state_id;
				data.dob = reqParam.dob ? data.dob = reqParam.dob : data.dob = data.dob;
				data.bio = reqParam.bio ? data.bio = reqParam.bio : data.bio = data.bio;
				data.image = imageName ? data.image = imageName : data.image = data.image;

				data.save()
				.then(updated =>{
					return Response.successResponseData(
						res,
						updated,
						res.__('User details Updated successfully')
					)
				})
				.catch(err => {
					console.log("err :: ", err);
					return Response.errorResponseData(
						res,
						res.__('Something went wrong')
					)
				})


			})
			.catch(err => {
				console.log("err :: ", err);
				return Response.errorResponseData(
					res,
					res.__('Something went wrong')
				)
			})
	},

	deleteExistingImage : async(req,res) =>{
		const {authUserId} = req;

		User.findByPk(authUserId)
			.then(details =>{
				if(!details.image){
					return Response.errorResponseData(
						res,
						res.__('No image found')
					)
				}
				Helper.RemoveImage(res,details.image)
				details.image = null;
				details.save();
				return Response.successResponseWithoutData(
					res,
					res.__('Image deleted Successfully')
				)

			}).catch(err => {
				console.log("err :: ", err);
				return Response.errorResponseData(
					res,
					res.__('Something went wrong')
				)
			})
	},
};