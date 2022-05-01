const dbQuery = require('./db')

const INFINITIVE_COUNT = -1
class ScheduleModel{
    async getAllSchedule() {
        const QUERY_STR =
        `SELECT * FROM schedule`
        return await dbQuery(QUERY_STR)
    }

    updateCount(actuatorID, name, count){
        if(count < 0){count = INFINITIVE_COUNT}

        const QUERY_STR = 
        `UPDATE schedule
        SET count = ${count}
        WHERE actuator_ID = '${actuatorID}' and name = '${name}' `

        dbQuery(QUERY_STR)
    }
}

module.exports = new ScheduleModel()