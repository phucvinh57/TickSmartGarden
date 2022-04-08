const GardenGroup = require('../repos/mqttClient')
const PolicyModel = require('../models/policy')
const sensorModel = require('../models/sensor')
const actuatorModel = require('../models/actuator')

const startFeedPolicy = (username, feedKey) => {
    const evalPolicy = (policy) => {
        const logic = policy[0].logic
        return policy.reduce((prev, cur) => {
            if(sensorModel.getValue(cur.sensorID)){
                const evalExpr = eval(`${sensorModel.getValue(cur.sensorID)} ${cur.operator} ${cur.rhsValue}`)
                return logic === 'AND' ? prev && evalExpr : prev || cur
            }
            else{
                throw `Sensor ${policy.sensorID} value is not available yet`
            }
        }, logic === 'AND' ? true : false)
        
    }

    const handleMessage = async (topic, message) => {
        sensorModel.updateSensor(await sensorModel.getSensorId(username, feedKey), parseFloat(message))
    
        const policyGroup = await PolicyModel.getPolicy(username, feedKey)
        for(var policyName in policyGroup){
            const policy = policyGroup[policyName]
            try {
                if(evalPolicy(policyGroup[policyName])){
                    console.log(`Policy ${policyName} is triggered`)
                    policy[0].action === 'ON' ? actuatorModel.turnOn(policy[0].actuatorID, policy[0].operatingTime)
                        : actuatorModel.turnOff(actuatorID)
                }
            }
            catch(error){
                console.log(error)
            }
        }
    }

    GardenGroup.getAdaClient(username).sub(feedKey, handleMessage)
}

module.exports = startFeedPolicy