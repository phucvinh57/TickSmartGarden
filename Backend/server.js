require('dotenv').config()
const express = require('express')
const app = express()
const route = require('./routers')
const gardenModel = require('./repository/garden')
const startFeedPolicy = require('./crons/policy')
const scheduleCron = require('./crons/scheduler')
const scheduleModel = require('./repository/schedule')

const PORT = process.env.PORT | 8080

const GardenGroup = require('./repository/mqttClient')

// options = {
//     clean: true,
//     username: 'cudothanhnhan',
//     password: 'aio_aCRK25GReOT6e519YKkjntognKix'
// }

// var client = null

function fireSchedule() {
    console.log('From server')
}

async function initSchedule(){
    const s = (await scheduleModel.getAllSchedule())[0]
    console.log(s.startTime instanceof Date)
    console.log(s.startTime)
    try{
        scheduleCron(s)
    }
    catch(error){
        console.log(error)
    }
}

const startServer = async () => {
    try{
        const gardens = await gardenModel.getAllGardens()
        var count  = gardens.length
        const trackGarden = (idx) => {
            const options = {
                username: gardens[idx].username,
                password: gardens[idx].userkey
            }
            
            GardenGroup.addClient(options, () => {
                count -= 1
                count !== 0 && trackGarden(idx + 1)
                    
            })
        }
        
        trackGarden(0)

    }
    catch(error) {
        console.log(error)
    }
}

startServer()

route(app)

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT)
})
