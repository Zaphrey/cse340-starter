const favorite = require("../models/favorite-model")
const Util = require("../utilities")
let funcs = {}

funcs.addFavoriteToUser = async (req, res) => {
    const account_id = res.locals.accountData.account_id
    const inv_id = req.body.inv_id
    const result = await favorite.addFavoriteToAccount(account_id, inv_id)

    if (result) {
        res.status(204).json(result)
    } else {
        res.status(400).send()
    }
}

funcs.removeFavoriteFromUser = async (req, res) => {
    const account_id = res.locals.accountData.account_id
    const inv_id = req.body.inv_id
    const result = await favorite.deleteFavoriteFromAccount(account_id, inv_id)

    if (result) {
        res.status(204).json(result)
    } else {
        res.status(400).send()
    }
}

funcs.userHasFavorite = async (req, res) => {
    const account_id = res.locals.accountData.account_id
    const inv_id = req.body.inv_id
    const result = await favorite.checkUserForFavorite(account_id, inv_id)

    if (result) {
        console.log(result)
        res.status(200).json(result)
    } else {
        res.status(400).send()
    }
}

funcs.getUserFavorites = async (req, res) => {
    const account_id = res.locals.accountData.account_id
    console.log(res.locals)
    const result = await favorite.getAllUserFavorites(account_id)

    if (result) {
        
        res.status(204).json(result)
    } else {
        res.status(400).send()
    }
}

funcs.deliverFavoritesView = async (req, res) => {
    const { account_id } = res.locals.accountData
    const nav = await Util.getNav(req, res)
    const result = await favorite.getAllUserFavorites(account_id)
    const grid = await Util.buildFavoritesGrid(result)

    res.render("favorite/favorite", {
        title: "Favorites",
        nav,
        grid,
        errors: null
    })
}

funcs.updateFavorites = async (req, res) => {
    const { inv_id } = req.params
    const account_id = res.locals.accountData.account_id

    const rows = await favorite.checkUserForFavorite(account_id, inv_id)
    console.log(rows)
    if (rows.length > 0) {
        const success = await favorite.deleteFavoriteFromAccount(account_id, inv_id)

        if (success) {
            res.status(200).json({ code: 204 })

        }
    } else {
        const success = await favorite.addFavoriteToAccount(account_id, inv_id)
        if (success) {
            res.status(200).json({ code: 201 })
        }
    }
}

funcs.getFavoriteStatus = async (req, res) => {
    const { inv_id } = req.params
    const account_id = res.locals.accountData.account_id
    const rows = await favorite.checkUserForFavorite(account_id, inv_id)
    
    return res.status(200).json({ isFavorited: rows.length > 0 ? 1 : 0 })
}

module.exports = funcs