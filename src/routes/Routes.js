var express = require('express');
var router = express.Router();
const connect = require('connect')

const {createBatteryBrand,batteryBrandGetService, batteryBrandFindOneController, batteryBrandDeleteController, batteryBrandUpdateController, bulkInsertionBatteryBrandController}=require('../Battery/Controllers/batteryBrand');
const { categoryCreateController, categoryFindOneController, categoryDeleteController, categoryUpdateController, categoryGetService, bulkInsertionCategoryController } = require('../Battery/Controllers/categoryController');

const {isAuthenticRequest} = require("../Middleware/apiAuth")


const authMiddleware = (() => {
  const chain = connect();
  [isAuthenticRequest].forEach((middleware) => {
      chain.use(middleware)
  })
  return chain
})()


router.get('/', (req, res) => {
    res.send('Hello World!');
});

/**
 * @route POST /batteryBrandCreate
 * @desc creates the battery brands
 * @access Private
 */
 router.post("/batteryBrandCreate", createBatteryBrand);


 /**
  * @route POST /bulkInsertBatteryBrand
  * @desc creates the battery brands in bulk
  * @access Private
  */
//   router.post("/bulkInsertBatteryBrand", bulkInsertionBatteryBrandController);
 
 
 /**
  * @route GET /getBatteryBrand
  * @desc finds all battery brands
  * @access Private
  */
 router.get("/getBatteryBrand", batteryBrandGetService);
 
 /**
  * @route GET /getBatteryBrand/:id
  * @desc finds all battery brands with given id
  * @access Private
  */
  router.get("/getBatteryBrand/:id", batteryBrandFindOneController);
 
 /**
  * @route DELETE /batteryBrand/delete/:id
  * @desc deletes the batteryBrand with given id
  * @access Private
  */
 router.delete("/batteryBrand/delete/:id", batteryBrandDeleteController);
 
 
 /**
  * @route PUT /batteryBrand/edit/:id
  * @desc Updates the batteryBrand with given id
  * @access Private
  */
 router.put("/batteryBrand/update/:id",batteryBrandUpdateController);
 

//Category

/**
 * @route POST /categoryBrandCreate
 * @desc creates the category
 * @access Private
 */
 router.post("/categoryCreate",isAuthenticRequest, categoryCreateController);


 /**
  * @route POST /bulkInsertCategory
  * @desc creates the category in bulk
  * @access Private
  */
  router.post("/bulkInsertCategory", bulkInsertionCategoryController);
 
 
 /**
  * @route GET /getCategory
  * @desc finds all categories
  * @access Private
  */
 router.get("/getCategory",categoryGetService);
 
 /**
  * @route GET /getCategory/:id
  * @desc finds all categories with given id
  * @access Private
  */
  router.get("/getCategory/:id",categoryFindOneController);
 
 
 /**
  * @route DELETE /category/delete/:id
  * @desc deletes the category with given id
  * @access Private
  */
 router.delete("/category/delete/:id", categoryDeleteController);
 
 
 /**
  * @route PUT /category/update/:id
  * @desc Updates the category with given id
  * @access Private
  */
 router.put("/category/update/:id", categoryUpdateController);
 
 
module.exports= router;