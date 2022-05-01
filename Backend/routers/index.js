const hardwareRouter = require('./hardware')
const gardenRouter = require('./garden')
const policyRouter = require('./policy')
const sensorRouter = require('./sensor')

function route(app) {
    app.use('/api/policys', policyRouter)
    app.use('/api/sensors', sensorRouter)
    app.use('/api/hardware', hardwareRouter)
    app.use('/api/gardens', gardenRouter)
}

module.exports = route