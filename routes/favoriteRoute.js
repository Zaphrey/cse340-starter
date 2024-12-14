const router = require("express").Router()
const utils = require("../utilities/index")
const favoriteController = require("../controllers/favoriteController")

// Route for getting the favorites view
router.get(
    "/", 
    utils.checkLogin, 
    utils.handleErrors(favoriteController.deliverFavoritesView)
)

// Route for removing favorite item from user
router.delete(
    "/",
    utils.checkLogin,
    utils.handleErrors(favoriteController.removeFavoriteFromUser)
)


// Route for updaing users favorite item
router.put(
    "/update/:inv_id",
    utils.checkLogin,
    utils.handleErrors(favoriteController.updateFavorites)
)

// Route for getting the favorited status from an inventory id
router.get(
    "/status/:inv_id",
    utils.checkLogin,
    utils.handleErrors(favoriteController.getFavoriteStatus)
)

module.exports = router