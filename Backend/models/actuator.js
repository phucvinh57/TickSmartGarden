const dbQuery = require('./db')
const mqttClient = require('../repos/mqttClient')

const TIMING_UNIT = 30 * 1000
class Actuator{
    constructor(){
        this.keys = []
    }
    
    async turnOff(actuatorID){
        try{
            const {feedkey, username} = await this.getFeedKey(actuatorID)
            mqttClient.getAdaClient(username).pub(feedkey, '0')
        }
        catch(error){
            console.log(error)
        }
    }

    async turnOn(actuatorID, operatingTime){
        try {
            const {feedkey, username} = await this.getFeedKey(actuatorID)
            console.log(`Actuator turned on ${feedkey} ${username}`)
            mqttClient.getAdaClient(username).pub(feedkey, '1')
            setTimeout(() => this.turnOff(actuatorID), operatingTime * TIMING_UNIT)
        }
        catch(error){
            console.log(error)
        }
    }
    
    async getFeedKey(actuatorID){
        // If cache is hit
        if(this.keys[actuatorID]){return this.keys[actuatorID]}

        try{

            const QUERY_STR = 
                `SELECT h.feedkey, g.adaclient as username
                FROM hardware as h join garden as g on h.gardenID = g.ID
                WHERE h.ID = '${actuatorID}' `
            const rows = await dbQuery(QUERY_STR)
            this.keys[actuatorID] = rows[0] // store to cache
            return rows[0]
        }
        catch(error){
            console.log(error)
        }
    }

}

module.exports = new Actuator()