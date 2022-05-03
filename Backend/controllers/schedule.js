const { updateSchedule } = require('../crons/scheduler')
const generateID = require('../utils/generateID')
const dbQuery = require('../repository/db')
const handler = require('./handler')

const createSched = (req, res) => {
    const { name, startTime, count, cycle, cycleUnit, operatingTime } = req.body
    handler(res, async () => {
        await dbQuery(
            `INSERT INTO schedule VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [generateID(), name, startTime, cycle, cycleUnit, count, operatingTime]
        )
        res.json({ msg: 'OKE' })
    })
    updateSchedule(name, startTime, count, cycle, cycleUnit, hardwareID, operatingTime)
}

const updateSched = (req, res) => {
    console.log('Update schedule')

    const { oldName, hardwareID, name, startTime, count, cycle, unit, operatingTime } = req.body
    // console.log(hardwareID, oldName)
    // console.log(req.body)
    var time = new Date(startTime)
    time.setTime(time.getTime() + 7 * 60 * 60 * 1000)
    handler(res, async () => {
        // await dbQuery(`
        //     UPDATE schedule SET 
        //         name = ?,
        //         startTime = ?,
        //         count = ?,
        //         cycle = ?,
        //         unit = ?,
        //         operatingTime = ?
        //     WHERE actuator_ID = ? AND name = ?;
        // `, [
        //     name, time.toISOString().slice(0, 19).replace('T', ' '),
        //     count, cycle, count, unit, operatingTime, hardwareID, oldName
        // ])
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
        res.json({ msg: 'OKE' })
    })
}

const deleteSched = (req, res) => {
    const { schedName, hardwareID } = req.query
    handler(res, async () => {
        await dbQuery(`
            DELETE FROM schedule WHERE name = ? AND hardwareID = ?
        `, [schedName, hardwareID])
        res.json({ msg: 'OKE' })
    })
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