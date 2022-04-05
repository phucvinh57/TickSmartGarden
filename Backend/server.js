const express = require('express')
const app = express()
const router = require('./routers')
const gardenDal = require('./dal/garden.dal')
const db = require('./services/db')

const GardenGroup = require('./repos/mqttClient')

// options = {
//     clean: true,
//     username: 'cudothanhnhan',
//     password: 'aio_aCRK25GReOT6e519YKkjntognKix'
// }

var client = null

const startServer = async () => {
    try{
        db.connect();
        const gardens = await gardenDal.getAllGardens()
        var count  = gardens.length
        const trackGarden = (idx) => {
            const options = {
                username: gardens[idx].username,
                password: gardens[idx].userkey
            }
            
            GardenGroup.addClient(options, () => {
                // client = GardenGroup.getAdaClient('cudothanhnhan')
                // client.sub('tl-garden', (topic, message) => {
                //     console.log('Yayyy')
                // }, false)
                // app.listen(8080, () => {console.log('Server is listening')})
                count -= 1
                count === 0 ? app.listen(8080, () => {console.log('Server is listening')})
                            : trackGarden(idx + 1)
                    
            })
        }
        
        trackGarden(0)

    }
    catch(error) {
        console.log(error)
    }
}
app.use('/actuator', router.actuatorRoute)

app.get('/on', function (req, res) {
    console.log('Turn on')
    client.publishFeed('tl-garden.lamp-0', '1', function (err) {console.log(err)})
    res.send('Turn on')
})
app.get('/off', function (req, res) {
    console.log('Turn off')
    client.publishFeed('tl-garden.lamp-0', '0', function (err) {console.log(err)})
    res.send('Turn off')
})

startServer()

