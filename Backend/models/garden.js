const dbQuery = require('./db')

class GardenModel{
    async getAllGardens() {
        const QUERY_STR = 'SELECT * FROM garden INNER JOIN adaclient WHERE garden.adaclient = adaclient.username'
        return await dbQuery(QUERY_STR)
    }
}

module.exports = new GardenModel()