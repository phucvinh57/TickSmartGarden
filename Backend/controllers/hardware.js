// Frontend -> backend -> ada
const ClientGroup = require('../repository/mqttClient')
const resource = require('../utils/resources')
const dbQuery = require('../repository/db')
const handler = require('./handler')

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
        const a = {
            sched: [{
                name: '',
                timestamp: '',
                cycle: 5,
                cycleUnit: '',
            }],
            policies: [{
                name: '',
                turnOn: Boolean
            }],
        }
        const hardware = await dbQuery(`
            SELECT hardware.name AS hardwareName, actuator.operatingTime, schedule.*
            FROM
                actuator JOIN hardware ON actuator.hardwareID = hardware.ID
                JOIN schedule ON schedule.actuator_ID = actuator.hardwareID
            WHERE hardware.gardenID = ? AND hardware.ID = ?
        `, [gardenID, hardwareID])

        const logs = await dbQuery(`
            SELECT * FROM log WHERE hardware.ID = ?
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
                obj.scheds.push({
                    name: i.name,
                    timestamp: i.startTime.slice(11), // get time only
                    cycle: i.cycle,
                    cycleUnit: i.unit
                })
            })
            res.json(obj)
        }
    })
}

const createSched = async(req, res) => {

}

module.exports = {
    toggle,
    getAll,
    getById
}