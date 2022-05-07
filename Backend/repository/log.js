const dbQuery = require('./db')

class Log {

    async get(actuatorID) {
        const QUERY_STR = 
        `SELECT timestamp as time, activity
        FROM log
        WHERE hardwareID = '${actuatorID}'
        ORDER BY timestamp DESC`

        const logs = await dbQuery(QUERY_STR)
        return logs
    }

    async createLog(hardwareID, action){
        await dbQuery(`INSERT INTO log VALUES (?, NOW(), ?)`, [hardwareID, action])
    }
}

module.exports = new Log()