const db = require('../services/db')

class GardenDal {
    async getAllGardens(){
        const queryStr = 'SELECT * FROM garden INNER JOIN adaclient WHERE garden.adaclient = adaclient.username'
        const [rows, _] = await db.promise().query(queryStr)
        return rows
    }

    async updateActuator() {
        
    }
}

module.exports = new GardenDal()