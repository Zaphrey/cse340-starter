const app = require('express')
const router = app.Router()
const utilities = require("../utilities/index")
const account = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')

router.get(
  '/login', regValidate.loginRules(), 
  regValidate.checkLoginData, 
  utilities.handleErrors(account.buildLogin)
)
router.get(
  '/register', 
  utilities.handleErrors(account.buildRegister)
)
router.post(
  '/register', 
  regValidate.registationRules(), 
  regValidate.checkRegData, 
  utilities.handleErrors(account.registerAccount)
)

// Process the login request
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(account.accountLogin)
)

router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(account.buildManagement)
)

module.exports = router