var express = require('express');
var router = express.Router();
const connect = require('connect')


const {isAuthenticRequest} = require("../Middleware/apiAuth")

// const authMiddleware = (() => {
//   const chain = connect();
//   [isAuthenticRequest].forEach((middleware) => {
//       chain.use(middleware)
//   })
//   return chain
// })()



//User
const {signup}=require('../Controllers/Api/Authenticate')

router.post("/signup",isAuthenticRequest, signup);



module.exports= router;
