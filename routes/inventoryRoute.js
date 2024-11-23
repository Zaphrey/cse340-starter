const router = require("express").Router();
const { buildByClassificationId } = require("../controllers/inventoryController")

router.get("/type/:classificationId", buildByClassificationId)

module.exports = router