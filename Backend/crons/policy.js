const GardenGroup = require('../repository/mqttClient')
const PolicyModel = require('../repository/policy')
const sensorModel = require('../repository/sensor')
const actuatorModel = require('../repository/actuator')

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
        try{
            sensorModel.updateSensor(await sensorModel.getSensorId(username, feedKey), parseFloat(message))
        
            const policyGroup = await policyModel.getPolicy(username, feedKey)
            for(var policyName in policyGroup){
                const policy = policyGroup[policyName]
                if(evalPolicy(policyGroup[policyName]) && !policyModel.isLimit(policyName)){
                    console.log(`Policy ${policyName} is triggered`)
                    policyModel.updateLastTriggered(policyName, new Date())
                    policy[0].action === 'ON' ? actuatorModel.turnOn(policy[0].actuatorID, policy[0].operatingTime)
                        : actuatorModel.turnOff(actuatorID)
                }
            }
        }
        catch(error){
            console.log(error)
        }
    }

    GardenGroup.getAdaClient(username).sub(feedKey, handleMessage)
}

module.exports = startFeedPolicy