const router = require("express").Router();
const { buildByClassificationId, buildDetailByInvId, buildManagementView, buildNewClassificationView, addClassification, buildInventoryView, addInventory } = require("../controllers/inventoryController");
const { handleErrors } = require("../utilities");
const { classifcationRules, checkClassificationData, inventoryRules, checkInventoryData } = require("../utilities/inventory-validation");

router.get("/type/:classificationId", handleErrors(buildByClassificationId))
router.get("/detail/:inventoryId", handleErrors(buildDetailByInvId))
router.get("/management", handleErrors(buildManagementView))
router.get("/management/add-classification", handleErrors(buildNewClassificationView))
router.post("/management/add-classification", classifcationRules(), checkClassificationData, handleErrors(addClassification))
router.get("/management/add-inventory", handleErrors(buildInventoryView))
router.post("/management/add-inventory", inventoryRules(), checkInventoryData, handleErrors(addInventory))

module.exports = router