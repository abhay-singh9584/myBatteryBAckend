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
 router.post("/batteryBrandCreate",isAuthenticRequest, createBatteryBrand);


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
 router.get("/getBatteryBrand",isAuthenticRequest, batteryBrandGetService);
 
 /**
  * @route GET /getBatteryBrand/:id
  * @desc finds all battery brands with given id
  * @access Private
  */
  // router.get("/getBatteryBrand/:id",isAuthenticRequest, batteryBrandFindOneController);
 
 /**
  * @route DELETE /batteryBrand/delete/:id
  * @desc deletes the batteryBrand with given id
  * @access Private
  */
 router.delete("/batteryBrand/delete/:id",isAuthenticRequest, batteryBrandDeleteController);
 
 
 /**
  * @route PUT /batteryBrand/edit/:id
  * @desc Updates the batteryBrand with given id
  * @access Private
  */
 router.put("/batteryBrand/update/:id",isAuthenticRequest,batteryBrandUpdateController);
 

//Category

/**
 * @route POST /categoryBrandCreate
 * @desc creates the category
 * @access Private
 */
 router.post("/categoryCreate",isAuthenticRequest,categoryCreateController);


 /**
  * @route POST /bulkInsertCategory
  * @desc creates the category in bulk
  * @access Private
  */
  // router.post("/bulkInsertCategory",isAuthenticRequest, bulkInsertionCategoryController);
 
 
 /**
  * @route GET /getCategory
  * @desc finds all categories
  * @access Private
  */
 router.get("/getCategory",isAuthenticRequest,categoryGetService);
 
 /**
  * @route GET /getCategory/:id
  * @desc finds all categories with given id
  * @access Private
  */
  // router.get("/getCategory/:id",isAuthenticRequest,categoryFindOneController);
 
 
 /**
  * @route DELETE /category/delete/:id
  * @desc deletes the category with given id
  * @access Private
  */
 router.delete("/category/delete/:id",isAuthenticRequest, categoryDeleteController);
 
 
 /**
  * @route PUT /category/update/:id
  * @desc Updates the category with given id
  * @access Private
  */
 router.put("/category/update/:id",isAuthenticRequest, categoryUpdateController);
 

//  group-----------------
  
 const{
  groupCreateController,
  groupGetService,
  groupDeleteController,
  groupUpdateController,
} = require("../Battery/Controllers/groupController");


/**
* @route POST /createGroup
* @desc Creates BatteyModel
* @access Private
*/
router.post("/createGroup",isAuthenticRequest, groupCreateController);


/**
* @route GET /getGroup
* @desc finds all BatteyModel
* @access Private
*/
router.get("/getGroup",isAuthenticRequest,groupGetService);


/**
* @route GET /getGroup/:id
* @desc finds all BatteyModel with given id
* @access Private
*/
//  router.get("/getGroup/:id",isAuthenticRequest,groupFindOneController);


/**
* @route DELETE /group/delete/:id
* @desc Deletes the given id
* @access Private
*/
router.delete("/group/delete/:id",isAuthenticRequest, groupDeleteController);


/**
* @route PUT /group/update/:id
* @desc Updates the given id
* @access Private
*/
router.put("/group/update/:id",isAuthenticRequest,groupUpdateController);

// subcategory ----

const {
	subCategoryCreateController,
	subCategoryGetService,
	subCategoryDeleteController,
    subCategoryUpdateController,
    subCategoryFindOneController,
} = require("../Battery/Controllers/subCategoryController");

/**
 * @route POST /createSubCategory
 * @desc creates the category
 * @access Private
 */
router.post("/createSubCategory",isAuthenticRequest, subCategoryCreateController);

/**
 * @route POST /bulkInsertionSubCategory
 * @desc creates the category in bulk
 * @access Private
 */
//  router.post("/bulkInsertionSubCategory",isAuthenticRequest, subCategoryBulkInsertionController);


/**
 * @route GET /getSubCategory
 * @desc finds all subCategories
 * @access Private
 */
router.get("/getSubCategory",isAuthenticRequest, subCategoryGetService);

/**
 * @route GET /getSubCategory/:id
 * @desc finds subCategories with given id
 * @access Private
 */
//  router.get("/getSubCategory/:id",isAuthenticRequest, subCategoryFindOneController);


/**
 * @route DELETE /subCategory/delete/:id
 * @desc Deletes the given id
 * @access Private
 */
router.delete("/subCategory/delete/:id",isAuthenticRequest, subCategoryDeleteController);


/**
 * @route PUT /subCategory/update/:id
 * @desc Updates the given id
 * @access Private
 */
router.put("/subCategory/update/:id",isAuthenticRequest, subCategoryUpdateController);


	

const {oemBrandCreateController,
	oemBrandDeleteController,
    oemBrandUpdateController,
    oemBrandFindOneController, oemBrandGetService } = require('../Battery/Controllers/oemBrandController');


/**
 * @route POST /createOemBrand
 * @desc Creates Oem brand
 * @access Private
 */
 router.post("/createOemBrand",isAuthenticRequest, oemBrandCreateController);

 /**
 * @route POST /bulkInsertOemBrand
 * @desc Creates Oem brand in bulk
 * @access Private
 */
  // router.post("/bulkInsertOemBrand",isAuthenticRequest, oemBrandBuilkInsertionController);


 /**
  * @route GET /getoemBrand
  * @desc finds all oemBrand
  * @access Private
  */
 router.get("/getOemBrand",isAuthenticRequest, oemBrandGetService);
 
  /**
  * @route GET /getoemBrand/:id
  * @desc finds all oemBrand with given id
  * @access Private
  */
  //  router.get("/getOemBrand/:id",isAuthenticRequest, oemBrandFindOneController);
 

 /**
  * @route DELETE /oemBrand/delete/:id
  * @desc Deletes the given id
  * @access Private
  */
 router.delete("/oemBrand/delete/:id",isAuthenticRequest, oemBrandDeleteController);
 
/**
 * @route PUT /oemBrand/update/:id
 * @desc Updates the given id
 * @access Private
 */
 router.put("/oemBrand/update/:id",isAuthenticRequest, oemBrandUpdateController);

//  segment ----
const {segmentDeleteController,createSegment,segmentGetService,segmentFindOneController,segmentUpdateController}=require('../Battery/Controllers/segmentController')

/**
* @route POST /createSegment
* @desc Creates segment
* @access Private
*/
router.post("/createSegment",isAuthenticRequest,createSegment );


/**
* @route POST /bulkInsertionSegment
* @desc Creates segment in bulk
* @access Private
*/
// router.post("/bulkInsertionSegment",isAuthenticRequest, bulkInsertionSegmentController);


/**
* @route GET /getSegment
* @desc finds all segments
* @access Private
*/
router.get("/getSegment",isAuthenticRequest, segmentGetService);

/**
* @route GET /getSegment/:id
* @desc finds segments with given id 
* @access Private
*/
//  router.get("/getSegment/:id",isAuthenticRequest, segmentFindOneController);


/**
* @route DELETE /segment/delete/:id
* @desc Deletes the given id
* @access Private
*/
router.delete("/segment/delete/:id",isAuthenticRequest, segmentDeleteController);


/**
* @route PUT /segment/update/:id
* @desc Updates the given id
* @access Private
*/
router.put("/segment/update/:id",isAuthenticRequest, segmentUpdateController);

// OEM Model-----
const {
	oemModelCreateController,
	oemModelGetService,
	oemModelDeleteController,
  oemModelUpdateController,
    // oemModelFindOneController,
    // oemModelBulkInsertController
} = require("../Battery/Controllers/oemModelController");

/**
 * @route POST /createOemModel
 * @desc Creates Oem Model
 * @access Private
 */
router.post("/createOemModel", oemModelCreateController);


/**
 * @route POST /bulkInsertOemModel
 * @desc Creates Oem Model in bulk
 * @access Private
 */
//  router.post("/bulkInsertOemModel", oemModelBulkInsertController);


/**
 * @route GET /getOemModel
 * @desc finds all getOemModel
 * @access Private
 */
router.get("/getOemModel", oemModelGetService);

/**
 * @route GET /getOemModel/:id
 * @desc finds all getOemModel with given id
 * @access Private
 */
//  router.get("/getOemModel/:id", oemModelFindOneController);


/**
 * @route DELETE /oemModel/delete/:id
 * @desc Deletes the given id
 * @access Private
 */
router.delete("/oemModel/delete/:id", oemModelDeleteController);

/**
 * @route PUT /oemModel/update/:id
 * @desc Updates the given id
 * @access Private
 */
 router.put("/oemModel/update/:id", oemModelUpdateController);


module.exports= router;