const router = require("express").Router();
const { buildByClassificationId, buildDetailByInvId, buildManagementView, buildNewClassificationView, addClassification, buildInventoryView, addInventory } = require("../controllers/inventoryController");
const { handleErrors } = require("../utilities");
const { classifcationRules, checkClassificationData, inventoryRules, checkInventoryData } = require("../utilities/inventory-validation");

router.get("/type/:classificationId", handleErrors(buildByClassificationId))
router.get("/detail/:inventoryId", handleErrors(buildDetailByInvId))
router.get("/", handleErrors(buildManagementView))
router.get("/add-classification", handleErrors(buildNewClassificationView))
router.post("/add-classification", classifcationRules(), checkClassificationData, handleErrors(addClassification))
router.get("/add-inventory", handleErrors(buildInventoryView))
router.post("/add-inventory", inventoryRules(), checkInventoryData, handleErrors(addInventory))

module.exports = router