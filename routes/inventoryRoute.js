const router = require("express").Router();
const { buildByClassificationId, buildDetailByInvId, buildManagementView, buildNewClassificationView, addClassification, buildInventoryView, addInventory, getInventoryJSON, editInventory, updateInventory, buildDeleteView, deleteInventoryFromId } = require("../controllers/inventoryController");
const { handleErrors } = require("../utilities");
const { classifcationRules, checkClassificationData, inventoryRules, checkInventoryData, checkUpdateData } = require("../utilities/inventory-validation");

// Deliver a view that contains a list of vehicles dependant on the classification_id
router.get("/type/:classificationId", handleErrors(buildByClassificationId))

// Deliver vehicle detail page from inventory_id
router.get("/detail/:inventoryId", handleErrors(buildDetailByInvId))

// Deliver management view
router.get("/", handleErrors(buildManagementView))

// Deliver classification addition form
router.get("/addClassification", handleErrors(buildNewClassificationView))

// Add new classification to classifications table
router.post("/addClassification", classifcationRules(), checkClassificationData, handleErrors(addClassification))

// Deliver inventory addition form
router.get("/addInventory", handleErrors(buildInventoryView))

// Add new vehicle to inventory
router.post("/addInventory", inventoryRules(), checkInventoryData, handleErrors(addInventory))

// Get inventory by classification id
router.get("/getInventory/:classification_id", handleErrors(getInventoryJSON))

// Route for editing inventory items
router.get("/edit/:inventory_id", handleErrors(editInventory))

// Route for updaing inventory items
router.post("/update", inventoryRules(), checkUpdateData, handleErrors(updateInventory))

// Route for delivering inventory deletion view
router.get("/delete/:inventory_id", handleErrors(buildDeleteView))

// DELETE route for deleting items from the inventory.
router.post("/delete/", handleErrors(deleteInventoryFromId))

module.exports = router