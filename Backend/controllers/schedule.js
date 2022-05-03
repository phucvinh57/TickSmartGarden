const {updateSchedule} = require('../crons/scheduler')
const generateID = require('../utils/generateID')
const dbQuery = require('../repository/db')

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
    const { oldName, hardwareID } = req.query
    const { newName, startTime, count, cycle, cycleUnit, operatingTime } = req.body
    handler(res, async () => {
        await dbQuery(`
            UPDATE schedule SET 
                name = ?,
                startTime = ?,
                count = ?,
                cycle = ?,
                unit = ?,
                operatingTime = ?
            WHERE hardwareID = ? AND name = ?;
        `, [newName, startTime, cycle, cycleUnit, count, operatingTime, hardwareID, oldName])
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
    const {hardwareID} = req.query
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