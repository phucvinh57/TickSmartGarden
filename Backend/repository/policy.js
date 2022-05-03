const dbQuery = require('./db')
const sensorRepo = require('./sensor')

const TIMING_LIMIT = 2 * 60 * 1000
class PolicyModel{

    constructor(){
        this.last_triggered = {}
    }

    isLimit(policyName) {
        return false
        return this.last_triggered[policyName] ? 
            new Date() - this.last_triggered[policyName] < TIMING_LIMIT
            : false
    }

    updateLastTriggered(policyName, dateTime){
        this.last_triggered[policyName] = dateTime
    }
    async getActuatorPolicy(actuatorID) {
        const EXPR_QUERY = 
        `SELECT *
        FROM policy as p, expression as e
        WHERE p.actuatorID = '${actuatorID}' and p.name = e.policyName`

        const POLICY_QUERY = 
        `SELECT *
        FROM policy as p, applies as a
        WHERE p.actuatorID = '${actuatorID}' and p.name = a.policyName`

        
        const policies = await dbQuery(POLICY_QUERY)
        // console.log(policies)
        var group = {}
        for(var i = 0; i < policies.length; i++){
            const policy = policies[i]
            const groupKey = policy.name
            group[groupKey] = group[groupKey] ? group[groupKey] : {};
            group[groupKey].action = policy.action
            group[groupKey].logic = policy.logic
            group[groupKey].operatingTime = policy.operatingTime
            group[groupKey].expressions = []
        }

        const policy_expr = await dbQuery(EXPR_QUERY)
        const groupByPolicy = policy_expr.reduce((group, element) => {
            const groupKey = element.name 
            group[groupKey] = group[groupKey] ? group[groupKey] : {};
            const expr = {sensorID: element.sensorID, operator: element.operator, rhsValue: element.rhsValue}

            group[groupKey].expressions = [...group[groupKey].expressions, expr];

            return group;
            }, group);

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

    getUpdateExprQuery(name, actuatorID, expressions){
        const EXPR_VALUES = expressions
        .map(expr => `('${expr.sensorID}', '${name}', '${actuatorID}', 
        '${expr.operator}', ${expr.rhsValue})`)
        .filter(function(item, pos, self) {
            return self.findIndex(v2=>(JSON.stringify(v2) === JSON.stringify(item))) == pos;
        })

        const APPLY_VALUES = expressions
        .map(expr => `('${expr.sensorID}', '${name}', '${actuatorID}')`)
        .filter(function(item, pos, self) {
            return self.findIndex(v2=>(JSON.stringify(v2) === JSON.stringify(item))) == pos;
        })
        
        const DELETE_APPLY_QUERY = 
        `DELETE FROM applies
        WHERE policyName = '${name}' and actuatorID = '${actuatorID}'`
        
        
        if(expressions.length > 0){
            const INSERT_APPLY_QUERY = 
            `INSERT INTO applies
            VALUES ${APPLY_VALUES.join(',')}`

            const INSERT_EXPR_QUERY =
            `INSERT INTO expression
            VALUES ${EXPR_VALUES.join(',')}`
            
            return [DELETE_APPLY_QUERY, INSERT_APPLY_QUERY, INSERT_EXPR_QUERY].join(';')
        }
        else {
            return DELETE_APPLY_QUERY
        }
    }

    async addPolicy(policy){
        console.log(policy)
        const NAME = policy.name
        const ACTUATOR_ID = policy.actuatorID
        
        const INSERT_POLICY_QUERY = 
        `INSERT INTO policy
        VALUES('${NAME}', '${ACTUATOR_ID}', '${policy.action}', '${policy.logic}', '${policy.operatingTime}')`
        const TRANSACTION = [INSERT_POLICY_QUERY, this.getUpdateExprQuery(NAME, ACTUATOR_ID, policy.expressions)].join(';')
        await dbQuery(TRANSACTION);
    }

    async updatePolicy(policy){

        const NAME = policy.name
        const OLD_NAME = policy.oldName ? policy.oldName : NAME
        const ACTUATOR_ID = policy.actuatorID
        
        const UPDATE_POLICY_QUERY = 
        `UPDATE policy
        SET name = '${NAME}', action = '${policy.action}', logic = '${policy.logic}', operatingTime = '${policy.operatingTime}'
        WHERE name = '${OLD_NAME}' and actuatorID = '${ACTUATOR_ID}'`

        
        const TRANSACTION = [UPDATE_POLICY_QUERY, this.getUpdateExprQuery(NAME, ACTUATOR_ID, policy.expressions)].join(';')

        await dbQuery(TRANSACTION);

    }
}

module.exports = new PolicyModel()