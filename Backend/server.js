require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT | 8080
const route = require('./routers')
// const db = require('./models/db')
// const GardenGroup = require('./repos/mqttClient')

// options = {
//     clean: true,
//     username: 'cudothanhnhan',
//     password: 'aio_aCRK25GReOT6e519YKkjntognKix'
// }

// var client = null

// const startServer = async () => {
//     try{
//         db.connect();
//         const gardens = await gardenDal.getAllGardens()
//         var count  = gardens.length
//         const trackGarden = (idx) => {
//             const options = {
//                 username: gardens[idx].username,
//                 password: gardens[idx].userkey
//             }

//             GardenGroup.addClient(options, () => {
//                 // client = GardenGroup.getAdaClient('cudothanhnhan')
//                 // client.sub('tl-garden', (topic, message) => {
//                 //     console.log('Yayyy')
//                 // }, false)
//                 // app.listen(8080, () => {console.log('Server is listening')})
//                 count -= 1
//                 count !== 0 && trackGarden(idx + 1)
//             })
//         }

//         trackGarden(0)

//     }
//     catch(error) {
//         console.log(error)
//     }
// }

// startServer()

// app.get('/on', function (req, res) {
//     console.log('Turn on')
//     client.publishFeed('tl-garden.lamp-0', '1', function (err) {console.log(err)})
//     res.send('Turn on')
// })
// app.get('/off', function (req, res) {
//     console.log('Turn off')
//     client.publishFeed('tl-garden.lamp-0', '0', function (err) {console.log(err)})
//     res.send('Turn off')
// })

route(app)

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT)
})
