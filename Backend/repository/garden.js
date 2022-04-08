const dbQuery = require('./db')
const generateID = require('../utils/generateID')

class GardenModel {
    async getAllGardens() {
        const QUERY_STR = 'SELECT * FROM garden INNER JOIN adaclient WHERE garden.adaclient = adaclient.username'
        return await dbQuery(QUERY_STR)
    }
    
    async getList(accountEmail) {
        try {
            const queryStr = `SELECT 
                name, description, imgurl, group_key, 
                adaclient.username as adaUsername, adaclient.userkey as adaKey
            FROM garden JOIN adaclient ON garden.adaclient = adaclient.username
            WHERE garden.accountemail = ?`
            const gardenList = await dbQuery(queryStr, [accountEmail])
            return gardenList
        }
        catch (err) {
            throw err
        }
    }
    async create(data) {
        try {
            const queryStr = `INSERT INTO garden VALUES (? , ?)`
            const gardenList = await dbQuery(queryStr, [generateID(), ...Object.values(data)])
            return gardenList
        }
        catch (err) {
            throw err
        }
    }
    async delete(gardenID) {
        try {
            const queryStr = `DELETE FROM garden where ID = ?`
            await dbQuery(queryStr, [gardenID])
        } catch(err) {
            throw err
        }
    }
}

module.exports = new GardenModel()