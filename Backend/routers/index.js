const hardwareRouter = require('./hardware')
const gardenRouter = require('./garden')
const policyRouter = require('./policy')
const sensorRouter = require('./sensor')
const logRouter = require('./log')
const scheduleRouter = require('./schedule')

function route(app) {
    app.use('/api/policys', policyRouter)
    app.use('/api/sensors', sensorRouter)
    app.use('/api/hardware', hardwareRouter)
    app.use('/api/gardens', gardenRouter)
    app.use('/api/log', logRouter)
    app.use('/api/schedule', scheduleRouter)
}

module.exports = route