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
                name, description, imgurl, group_key as groupKey, 
                adaclient.username as adaUsername, adaclient.userkey as adaUserkey
                FROM garden JOIN adaclient ON garden.adaclient = adaclient.username
                WHERE garden.accountemail = ?
            `
            const gardenList = await dbQuery(queryStr, [accountEmail])
            return gardenList
        }
        catch (err) {
            throw err
        }
    }

    async create(data) {
        try {
            const gardenID = generateID()
            const gardenQueryStr = `INSERT INTO garden VALUES (?, ?, ?, ?, ?, ?, ?)`
            const adaQueryStr = `INSERT INTO adaclient VALUES (?, ?)`

            const gardenData = [gardenID, data.name, data.adaUserName, data.useremail, data.groupKey, data.description, data.imgurl]
            const adaData = [data.adaUserName, data.adaUserKey]

            await dbQuery(adaQueryStr, adaData)
            await dbQuery(gardenQueryStr, gardenData)
            
            return gardenID
        }
        catch (err) {
            throw err
        }
    }

    async delete(gardenID) {
        try {
            const queryStr = `DELETE FROM garden where ID = ?`
            await dbQuery(queryStr, [gardenID])
        } catch (err) {
            throw err
        }
    }

    async getFeeds(gardenID) {
        const QUERY_STR =
        `SELECT h.feedKey, g.adaclient as username, h.type
        FROM garden as g join hardware as h on h.gardenID = g.ID
        WHERE g.ID = '${gardenID}' `

        return await dbQuery(QUERY_STR)
    }
}

module.exports = new GardenModel()