const router = require("express").Router();
const { buildByClassificationId, buildDetailByInvId } = require("../controllers/inventoryController");
const { handleErrors } = require("../utilities");

router.get("/type/:classificationId", handleErrors(buildByClassificationId))
router.get("/detail/:inventoryId", handleErrors(buildDetailByInvId))

module.exports = router