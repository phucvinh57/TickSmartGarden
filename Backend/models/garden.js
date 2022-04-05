const dbQuery = require('./db')

class GardenModel{
    async getAllGardens() {
        try{
            const QUERY_STR = 'SELECT * FROM garden INNER JOIN adaclient WHERE garden.adaclient = adaclient.username'
            return await dbQuery(QUERY_STR)
        }
        catch(error){
            console.log(error)
        }
    }
}

module.exports = new GardenModel()