const { updateScheduler, deleteScheduler } = require('../crons/scheduler')
const generateID = require('../utils/generateID')
const dbQuery = require('../repository/db')
const handler = require('./handler')

const createSched = (req, res) => {
    const { name, startTime, count, cycle, unit, operatingTime, hardwareID } = req.body
    handler(res, async () => {
        var time = new Date(startTime)
        time.setTime(time.getTime() + 7 * 60 * 60 * 1000)
        time = time.toISOString().slice(0, 19).replace('T', ' ')

        const QUERY_STR =
        `INSERT INTO schedule VALUES ('${hardwareID}', '${name}', '${time}', ${cycle}, '${unit}', ${count}, ${operatingTime})`
        
        await dbQuery(QUERY_STR)
        res.json({ msg: 'OKE' })
    })
    updateScheduler(name, new Date(startTime), count, cycle, unit, hardwareID, operatingTime)
}

const updateSched = (req, res) => {

    const { oldName, hardwareID, name, startTime, count, cycle, unit, operatingTime } = req.body
    // console.log(hardwareID, oldName)
    // console.log(req.body)
    var time = new Date(startTime)
    time.setTime(time.getTime() + 7 * 60 * 60 * 1000)
    handler(res, async () => {

        const QUERY_STR = `
            UPDATE schedule SET 
                name = '${name}',
                startTime = '${time.toISOString().slice(0, 19).replace('T', ' ')}',
                count = ${count},
                cycle = ${cycle},
                unit = '${unit}',
                operatingTime = ${operatingTime} 
            WHERE actuator_ID = '${hardwareID}' AND name = '${oldName}'
        `
        await dbQuery(QUERY_STR)
        updateScheduler(name, new Date(startTime), count, cycle, unit, hardwareID, operatingTime)
        res.json({ msg: 'OKE' })
    })
}

const deleteSched = (req, res) => {
    const { name, hardwareID } = req.query
    handler(res, async () => {
        const QUERY_STR =
        `DELETE FROM schedule
        WHERE name = '${name}' and actuator_ID = '${hardwareID}'`
        await dbQuery(QUERY_STR)
        console.log(QUERY_STR)
        res.json({ msg: 'OKE' })
    })
    deleteScheduler(name, hardwareID)
}

const getSched = async (req, res) => {
    const { hardwareID } = req.query
    const QUERY_STR =
        `SELECT *
    FROM actuator JOIN schedule ON schedule.actuator_ID = actuator.hardwareID
    WHERE actuator.hardwareID = '${hardwareID}'`

    res.status(200).send(await dbQuery(QUERY_STR))
}

module.exports = {
    createSched,
    updateSched,
    deleteSched,
    getSched
}