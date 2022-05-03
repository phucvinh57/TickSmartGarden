const dbQuery = require('./db')
const mqttClient = require('./mqttClient')

const TIMING_UNIT = 60 * 1000

const TIMING_LIMIT = 5 * 60 * 1000
class Actuator {
    constructor() {
        this.keys = []
        this.policyActuator = {}
    }

    isPolicyHold(actuatorID){
        return this.policyActuator[actuatorID] ? this.policyActuator[actuatorID] : false
    }

    async getOperatingTime(actuatorID){
        const QUERY_STR = 
        `SELECT operatingTime
        FROM actuator
        WHERE hardwareID = '${actuatorID}'`
        const operatingTime = await dbQuery(QUERY_STR)
        return operatingTime[0].operatingTime
    }
    async turnOff(actuatorID, byPolicy = false) {
        try {
            const { feedkey, username } = await this.getFeedKey(actuatorID)
            mqttClient.getAdaClient(username).pub(feedkey, '0')
            if (byPolicy){
                this.policyActuator[actuatorID] = true
                setTimeout(() => this.policyActuator[actuatorID] = false, TIMING_LIMIT)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    async turnOn(actuatorID, operatingTime, byPolicy = false) {
        try {
            const { feedkey, username } = await this.getFeedKey(actuatorID)
            console.log(`Actuator turned on ${feedkey} ${username}`)
            if(byPolicy){
                this.policyActuator.actuatorID = true
                setTimeout(() => this.policyActuator.actuatorID = false, TIMING_LIMIT)
            }
            mqttClient.getAdaClient(username).pub(feedkey, '1')
            setTimeout(() => {this.turnOff(actuatorID)}, operatingTime * TIMING_UNIT )
            
        }
        catch (error) {
            console.log(error)
        }
    }

    async getFeedKey(actuatorID) {
        // If cache is hit
        if (this.keys[actuatorID]) { return this.keys[actuatorID] }

        try {
            const QUERY_STR =
                `SELECT h.feedkey, g.adaclient as username
                FROM hardware as h join garden as g on h.gardenID = g.ID
                WHERE h.ID = '${actuatorID}' `
            const rows = await dbQuery(QUERY_STR)
            this.keys[actuatorID] = rows[0] // store to cache
            return rows[0]
        }
        catch (error) {
            console.log(error)
        }
    }
}

module.exports = new Actuator()