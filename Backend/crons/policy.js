const GardenGroup = require('../repository/mqttClient')
const policyRepo = require('../repository/policy')
const sensorRepo = require('../repository/sensor')
const actuatorRepo = require('../repository/actuator')
const gardenRepo = require('../repository/garden')

const startFeedPolicy = (username, feedKey) => {
    const evalPolicy = (policy) => {
        const logic = policy[0].logic
        return policy.reduce((prev, cur) => {
            if(sensorRepo.getValue(cur.sensorID)){
                const evalExpr = eval(`${sensorRepo.getValue(cur.sensorID)} ${cur.operator} ${cur.rhsValue}`)
                return logic === 'AND' ? prev && evalExpr : prev || cur
            }
            else {
                throw `Sensor ${cur.sensorID} value is not available yet`
            }
        }, logic === 'AND' ? true : false)
        
    }

    const handleMessage = async (topic, message) => {
        try{
            sensorRepo.updateSensor(await sensorRepo.getSensorId(username, feedKey), parseFloat(message))
        
            const policyGroup = await policyRepo.getPolicy(username, feedKey)
            for(var policyName in policyGroup){
                const policy = policyGroup[policyName]
                if(evalPolicy(policyGroup[policyName]) && !policyRepo.isLimit(policyName)){
                    console.log(`Policy ${policyName} is triggered`)
                    policyRepo.updateLastTriggered(policyName, new Date())
                    policy[0].action === 'ON' ? actuatorRepo.turnOn(policy[0].actuatorID, policy[0].operatingTime)
                        : actuatorRepo.turnOff(actuatorID)
                }
            }
        }
        catch(error){
            console.log(error)
        }
    }

    GardenGroup.getAdaClient(username).sub(feedKey, handleMessage)
}

const startPolicy = async () => {
    const gardens = await gardenRepo.getAllGardens()
    for(var i = 0; i < gardens.length; i++){
        const feeds = (await gardenRepo.getFeeds(gardens[i].ID))
                        .filter(feed => feed.type === 'sensor')
        feeds.map(feed => {
            const {feedKey, username} = feed
            startFeedPolicy(username, feedKey)
        })
    }
}

module.exports = startPolicy