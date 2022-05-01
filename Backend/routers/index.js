const actuatorRouter = require('./actuator')
const gardenRouter = require('./garden')
const policyRouter = require('./policy')
const sensorRouter = require('./sensor')

function route(app) {
    app.use('/actuator', actuatorRouter)
    app.use('/gardens', gardenRouter)
    app.use('/policys', policyRouter)
    app.use('/sensors', sensorRouter)
}

module.exports = route