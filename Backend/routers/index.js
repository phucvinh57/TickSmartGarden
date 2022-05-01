const hardwareRouter = require('./hardware')
const gardenRouter = require('./garden')

function route(app) {
    app.use('/api/hardware', hardwareRouter)
    app.use('/api/gardens', gardenRouter)
}

module.exports = route