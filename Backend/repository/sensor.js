const dbQuery = require('./db')

class Sensor{
    constructor(){
        this.latest_value = []
    }

    async getSensorId(username, feedKey){

        const QUERY_STR = 
            `SELECT h.id
            FROM hardware as h join garden as g on h.gardenId = g.id
            WHERE h.feedkey = '${feedKey}' and g.adaclient = '${username}' `
        const rows = await dbQuery(QUERY_STR)
        return rows[0].id
    }

    // async getAllSensorFeed(){
    //     try{}
    // }

    updateSensor(sensorId, value){
        this.latest_value[sensorId] = value
    }

    getValue(sensorId){
        return this.latest_value[sensorId]
    }
}

module.exports = new Sensor()