const pool = require("../database/")
let favorite = {}

/* **********************
 *   Adding a favorite listing to the users account
 * ********************* */
favorite.addFavoriteToAccount = async (account_id, inv_id) => {
    try {
        const sql = "INSERT INTO favorite (account_id, inv_id) VALUES ($1, $2) ON CONFLICT (account_id, inv_id) DO NOTHING"
        const result = await pool.query(sql, [
            account_id, 
            inv_id
        ])

        return result.rows
    } catch (error) {
        console.error(error)
    }
}

/* **********************
 *   Deleting a favorite listing from the users account
 * ********************* */
favorite.deleteFavoriteFromAccount = async (account_id, inv_id) => {
    try {
        const sql = "DELETE FROM favorite WHERE account_id = $1 AND inv_id = $2"
        const result = await pool.query(sql, [
            account_id, 
            inv_id
        ])

        return result.rows
    } catch (error) {
        console.error(error)
    }
}

/* **********************
 *   Check if a user has a specific listing
 * ********************* */
favorite.checkUserForFavorite = async (account_id, inv_id) => {
    try {
        const sql = "SELECT * FROM favorite WHERE account_id = $1 and inv_id = $2"
        const result = await pool.query(sql, [
            account_id, 
            inv_id
        ])
        
        return result.rows
    } catch (error) {
        console.error(error)
    }
}

/* **********************
 *   Get all favorites from user
 * ********************* */
favorite.getAllUserFavorites = async (account_id) => {
    try {
        console.log(account_id)
        const sql = "SELECT * FROM account as a INNER JOIN favorite as f ON a.account_id = f.account_id INNER JOIN inventory as i ON f.inv_id = i.inv_id WHERE a.account_id = $1"
        const result = await pool.query(sql, [
            account_id
        ])

        return result.rows
    } catch (error) {
        console.error(error)
    }
}

module.exports = favorite