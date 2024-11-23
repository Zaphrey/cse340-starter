const { throwError } = require("../controllers/errorTestController");
const { handleErrors } = require("../utilities");

const router = require("express").Router();

router.get("/error", handleErrors(throwError))

module.exports = router