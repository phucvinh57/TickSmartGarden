// Frontend -> backend -> ada
const sensorRepo = require('../repository/sensor')

const getAllSensor = async (req, res) => {
    console.log('heloo')
    const gardenID = req.params.gardenID
    const sensors = await sensorRepo.getAllSensor(gardenID)
    res.status(200).send(sensors)
}

module.exports = { getAllSensor }