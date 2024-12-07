const router = require("express").Router();
const { buildByClassificationId, buildDetailByInvId, buildManagementView, buildNewClassificationView, addClassification, buildInventoryView, addInventory, getInventoryJSON, editInventory, updateInventory, buildDeleteView, deleteInventoryFromId } = require("../controllers/inventoryController");
const { handleErrors, validateUser } = require("../utilities");
const { classifcationRules, checkClassificationData, inventoryRules, checkInventoryData, checkUpdateData } = require("../utilities/inventory-validation");

// Deliver a view that contains a list of vehicles dependant on the classification_id
router.get("/type/:classificationId", handleErrors(buildByClassificationId))

// Deliver vehicle detail page from inventory_id
router.get("/detail/:inventoryId", handleErrors(buildDetailByInvId))

// Deliver management view
router.get("/", validateUser, handleErrors(buildManagementView))

// Deliver classification addition form
router.get("/addClassification", validateUser, handleErrors(buildNewClassificationView))

// Add new classification to classifications table
router.post("/addClassification", validateUser, classifcationRules(), checkClassificationData, handleErrors(addClassification))

// Deliver inventory addition form
router.get("/addInventory", validateUser, handleErrors(buildInventoryView))

// Add new vehicle to inventory
router.post("/addInventory", validateUser, inventoryRules(), checkInventoryData, handleErrors(addInventory))

// Get inventory by classification id
router.get("/getInventory/:classification_id", validateUser, handleErrors(getInventoryJSON))

// Route for editing inventory items
router.get("/edit/:inventory_id", validateUser, handleErrors(editInventory))

// Route for updaing inventory items
router.post("/update", validateUser, inventoryRules(), checkUpdateData, handleErrors(updateInventory))

// Route for delivering inventory deletion view
router.get("/delete/:inventory_id", validateUser, handleErrors(buildDeleteView))

// Route for deleting items from the inventory.
router.post("/delete/", validateUser, handleErrors(deleteInventoryFromId))

module.exports = router