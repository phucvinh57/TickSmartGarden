require('dotenv').config()
const express = require('express')
const app = express()
var cors = require('cors')

app.use(cors())
app.use(express.json())

const route = require('./routers')
const gardenRepo = require('./repository/garden')
const startPolicy = require('./crons/policy')
const {startScheduling} = require('./crons/scheduler')
const scheduleRepo = require('./repository/schedule')
const GardenGroup = require('./repository/mqttClient')

const PORT = process.env.PORT | 8080

const initMqttConnection = async (callback) => {
    try{
        const gardens = await gardenRepo.getAllGardens()
        var count  = gardens.length
        
        const trackGarden = (idx) => {
            const options = {
                username: gardens[idx].username,
                password: gardens[idx].userkey
            }
            
            GardenGroup.addClient(options, () => {
                callback()
                // count -= 1
                // count !== 0 ? trackGarden(idx + 1)
                //     : callback()
            })
        }
        
        trackGarden(0)

    }
    catch(error) {
        console.log(error)
    }
}

initMqttConnection(() => {
    console.log('Mqqt clients has been connected successfully')
    startPolicy()
    startScheduling()
})

route(app)

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT)
})
