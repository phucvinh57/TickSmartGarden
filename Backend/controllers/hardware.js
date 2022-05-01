// Frontend -> backend -> ada
const ClientGroup = require('../repository/mqttClient')
const resource = require('../utils/resources')
const dbQuery = require('../repository/db')
const handler = require('./handler')
const generateID = require('../utils/generateID')

const toggle = function (req, res) {
    const key = req.params.feedKey
    const username = req.params.username
    const action = req.query.action
    console.log(req.params)

    const msg = action === resource.ON_STR ? '1' : '0'
    const client = ClientGroup.getAdaClient(username)
    client.pub(key, msg)
    res.send('Hello')
}

const getAll = async (req, res) => {
    const gardenID = req.query.gardenID
    handler(res, async () => {
        const hardwares = await dbQuery(`
            SELECT ID, name, type, feedKey FROM hardware WHERE gardenID = ?;
        `, [gardenID])
        let data = hardwares.map(hardware => ({
            ...hardware,
            id: hardware.ID,
            feedkey: hardware.feedKey
        }))
        res.json(hardwares)
    })
}

const getById = async (req, res) => {
    const gardenID = req.query.gardenID
    const hardwareID = req.query.hardwareID
    handler(res, async () => {
        const hardware = await dbQuery(`
            SELECT hardware.name AS hardwareName, actuator.operatingTime, schedule.*
            FROM
                actuator JOIN hardware ON actuator.hardwareID = hardware.ID
                JOIN schedule ON schedule.actuator_ID = actuator.hardwareID
            WHERE hardware.gardenID = ? AND hardware.ID = ?
        `, [gardenID, hardwareID])

        const logs = await dbQuery(`
            SELECT * FROM log WHERE hardwareID = ?
        `, [hardwareID])

        if (hardware.length === 0) {
            res.json([])
        } else {
            const obj = {
                name: hardware[0].hardwareName,
                operatingTime: hardware[0].hardwareOpTime,
                scheds: [],
                logs: logs
            }
            hardware.forEach(i => {
                let cycleUnit
                switch (i.unit) {
                    case 'day':
                        cycleUnit = 'ngày'
                        break;
                    case 'hour':
                        cycleUnit = 'giờ'
                        break;
                    case 'week':
                        cycleUnit = 'tuần'
                        break;
                    case 'min':
                        cycleUnit = 'phút'
                        break;
                    default:
                        break;
                }
                obj.scheds.push({
                    name: i.name,
                    timestamp: i.startTime.toLocaleTimeString('it-IT'),
                    cycle: i.cycle,
                    cycleUnit
                })
            })
            res.json(obj)
        }
    })
}

const createSched = (req, res) => {
    const { name, startTime, count, cycle, cycleUnit, operatingTime } = req.body
    handler(res, async () => {
        await dbQuery(
            `INSERT INTO schedule VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [generateID(), name, startTime, cycle, cycleUnit, count, operatingTime]
        )
        res.json({ msg: 'OKE' })
    })
}

const updateSched = (req, res) => {
    const { oldName, hardwareID } = req.query
    const { newName, startTime, count, cycle, cycleUnit, operatingTime } = req.body
    handler(res, async () => {
        await dbQuery(`
            UPDATE schedule SET (name, startTime, count, cycle, unit, operatingTime)
            VALUES (?, ?, ?, ?, ?, ?) WHERE hardwareID = ? AND name = ?
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

const createLog = (req, res) => {
    const { hardwareID, action } = req.body
    handler(res, async () => {
        await dbQuery(`INSERT INTO log VALUES (?, NOW(), ?)`, [hardwareID, action])
        res.json({ msg: 'OKE' })
    })
}

module.exports = {
    toggle,
    getAll,
    getById,
    createLog,
    createSched,
    deleteSched,
    updateSched
}