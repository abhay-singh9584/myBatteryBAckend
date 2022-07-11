var express = require('express');
var router = express.Router();
const connect = require('connect')


const {isAuthenticRequest} = require("../Middleware/apiAuth")

const { getBatteryBrands, getAllProducts, getBatteryBrandByName }=require('../Controllers/Api/AppController')

//Get-all-battery-brands
router.get('/get-all-battery-brands',isAuthenticRequest,getBatteryBrands)

//Get-all-products
router.get('/get-all-products',isAuthenticRequest,getAllProducts)

//Battery-Brand-By-Name
router.get('/get-battery-brand/:name',isAuthenticRequest,getBatteryBrandByName)



module.exports= router;
