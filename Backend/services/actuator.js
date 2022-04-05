const ClientGroup = require('../repos/mqttClient')
const resource = require('../resources')

const toggle = function(req, res) {
    const key = req.params.feedKey
    const username = req.params.username
    const action = req.query.action
    console.log(req.params)

    const msg = action === resource.ON_STR ? '1' : '0'

    const client = ClientGroup.getAdaClient(username)

    client.pub(key, msg)

    res.send('Hello')
}

module.exports = {toggle}