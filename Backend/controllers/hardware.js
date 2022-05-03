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
        const hardware = await dbQuery(`
            SELECT hardware.name AS hardwareName, actuator.operatingTime
            FROM actuator JOIN hardware ON actuator.hardwareID = hardware.ID
            WHERE hardware.gardenID = ? AND hardware.ID = ?
        `, [gardenID, hardwareID])

        res.status(200).send(hardware)

    })
}

const updateHardware = async (req, res) => {
    const {hardwareID, name, operatingTime} = req.body
    const QUERY_STR = 
    `UPDATE hardware
    SET name = '${name}'
    WHERE ID = '${hardwareID}';
    UPDATE actuator
    SET operatingTime = ${operatingTime}
    WHERE hardwareID = '${hardwareID}'`
    await dbQuery(QUERY_STR)
    res.status(200).send()
}


module.exports = {
    toggle,
    getAll,
    getById,
    updateHardware
}