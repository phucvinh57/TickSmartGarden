const dbQuery = require('./db')

class ScheduleModel{
    async getAllSchedule() {
        const QUERY_STR =
        `SELECT * FROM schedule`
        return await dbQuery(QUERY_STR)
    }

    updateCount(actuatorID, name, count){
        const QUERY_STR = 
        `UPDATE schedule
        SET count = ${count}
        WHERE actuator_ID = '${actuatorID}' and name = '${name}' `

        dbQuery(QUERY_STR)
    }
}

module.exports = new ScheduleModel()