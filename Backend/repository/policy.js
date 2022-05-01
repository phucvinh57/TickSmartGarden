const dbQuery = require('./db')
const sensorRepo = require('./sensor')

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
    async getActuatorPolicy(actuatorID) {
        const QUERY_STR = 
        `SELECT *
        FROM policy as p, expression as e
        WHERE p.actuatorID = '${actuatorID}' and p.name = e.policyName`

        const policy_expr = await dbQuery(QUERY_STR)


        const groupByPolicy = policy_expr.reduce((group, element) => {
            const groupKey = element.name
            group[groupKey] = group[groupKey] ? group[groupKey] : {};
            const expr = {sensorID: element.sensorID, operator: element.operator, rhsValue: element.rhsValue}
            group[groupKey].expressions = group[groupKey].expressions ? [...group[groupKey].expressions, expr] : [];
            group[groupKey].action = element.action
            group[groupKey].logic = element.logic
            group[groupKey].operatingTime = element.operatingTime
            return group;
            }, {});
        
        var arr = []
        for(var policy in groupByPolicy){
            arr.push({name: policy, ...groupByPolicy[policy]})
        }
        return arr
    }

    async getPolicy(username, feedKey){

        const SENSOR_ID = await sensorRepo.getSensorId(username, feedKey)

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
            group[groupKey] = group[groupKey] ? group[groupKey] : [];
            group[groupKey].push(expression);
            return group;
            }, {});

        // console.log(groupByPolicy);

        return groupByPolicy

    }

    async updateExpression(policyName, actuatorID, expressions){
        const EXPR_VALUES = expressions
        .map(expr => `('${expr.sensorID}', '${policyName}', '${actuatorID}', 
        '${expr.operator}', ${expr.rhsValue})`)

        const APPLY_VALUES = expressions
        .map(expr => `('${expr.sensorID}', '${policyName}', '${actuatorID}')`)
        
        if(EXPR_VALUES.length > 0){
            const DELETE_APPLY_QUERY = 
            `DELETE FROM applies
            WHERE policyName = '${policyName}' and actuatorID = '${actuatorID}'`
            
            const INSERT_APPLY_QUERY = 
            `INSERT INTO applies
            VALUES ${APPLY_VALUES.join(',')}`

            const INSERT_EXPR_QUERY =
            `INSERT INTO expression
            VALUES ${EXPR_VALUES.join(',')}`
            
            // console.log(INSERT_EXPR_QUERY)
            await dbQuery(DELETE_APPLY_QUERY)
            await dbQuery(INSERT_APPLY_QUERY)
            await dbQuery(INSERT_EXPR_QUERY)

        }
    }

    async addPolicy(policy){
        const NAME = policy.name
        const ACTUATOR_ID = policy.actuatorID
        
        const INSERT_POLICY_QUERY = 
        `INSERT INTO policy
        VALUES('${NAME}', '${ACTUATOR_ID}', '${policy.action}', '${policy.logic}', '${policy.operatingTime}')`
        await dbQuery(INSERT_POLICY_QUERY);
        await this.updateExpression(NAME, ACTUATOR_ID, policy.expressions)
    }

    async updatePolicy(policy){
        const NAME = policy.name
        const ACTUATOR_ID = policy.actuatorID
        
        const UPDATE_POLICY_QUERY = 
        `UPDATE policy
        SET action = '${policy.action}', logic = '${policy.logic}', operatingTime = '${policy.operatingTime}'
        WHERE name = '${NAME}' and actuatorID = '${ACTUATOR_ID}'`

        await dbQuery(UPDATE_POLICY_QUERY);
        await this.updateExpression(NAME, ACTUATOR_ID, policy.expressions)
    }
}

module.exports = new PolicyModel()