const dbQuery = require('./db')
const sensorModel = require('./sensor')

const TIMING_LIMIT = 2 * 60 * 1000
class PolicyModel{

    constructor(){
        this.last_triggered = {}
    }

    isLimit(policyName) {
        return this.last_triggered[policyName] ? 
            new Date() - this.last_triggered[policyName] < TIMING_LIMIT
            : false
    }

    updateLastTriggered(policyName, dateTime){
        this.last_triggered[policyName] = dateTime
    }

    async getPolicy(username, feedKey){

            // const QUERY_SENSOR_ID = 
            //     `SELECT h.id
            //     FROM hardware as h join garden as g on h.gardenId = g.id
            //     WHERE h.feedkey = '${feedKey}' and g.adaclient = '${username}' `
            // const SENSOR_ID = await dbQuery(QUERY_SENSOR_ID)[0]
        const SENSOR_ID = await sensorModel.getSensorId(username, feedKey)

        const QUERY_POLICY_NAME = 
            `SELECT e.policyName
            FROM expression as e
            WHERE e.sensorID = '${SENSOR_ID}' `
        
        const QUERY_EXPRESSION = 
            `SELECT *
            FROM expression as e join policy as p on p.name = e.policyName and p.actuatorID = e.actuatorID
            WHERE p.name IN (${QUERY_POLICY_NAME})`
        
        const expressions = await dbQuery(QUERY_EXPRESSION)
        const groupByPolicy = expressions.reduce((group, expression) => {
            const groupKey = [expression.policyName, expression.actuatorID].join('/')
            group[groupKey] = group[groupKey] ?? [];
            group[groupKey].push(expression);
            return group;
            }, {});

        // console.log(groupByPolicy);

        return groupByPolicy

    }
}

module.exports = new PolicyModel()