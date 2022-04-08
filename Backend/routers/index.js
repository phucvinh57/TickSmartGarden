const actuatorRouter = require('./actuator')
const gardenRouter = require('./garden')

function route(app) {
    app.use('/actuator', actuatorRouter)
    app.use('/gardens', gardenRouter)
}

module.exports = route