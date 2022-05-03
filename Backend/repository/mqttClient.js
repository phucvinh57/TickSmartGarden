const mqtt = require('mqtt')
const resource = require('../utils/resources')

class AdaClient {
    constructor(username, client) {
        this.username = username
        this.client = client
    }

    pub(key, message, isFeed = true) {
        try {
            const topic = [this.username, isFeed ? 'feeds' : 'groups', key].join('/')
            this.client.publish(topic, message)
        }
        catch (error) {
            console.log(error)
        }
    }

    sub(key, onMessage, isFeed = true) {
        const topic = [this.username, isFeed ? 'feeds' : 'groups', key].join('/')
        this.client.subscribe(topic, err => {
            err && console.log(err)
            !err && this.client.on('message', (incomeTopic, message) => {
                if (topic === incomeTopic) {
                    console.log(`Message on topic ${incomeTopic}. Message: ${message}`)
                    onMessage(incomeTopic, message)
                }
            })
        })
    }
}

class ClientGroup {
    constructor() {
        this.clients = []
    }

    addClient(options, callback = null) {
        try {
            //Check if added yet
            if (this.clients.findIndex(client => client.username === options.username) === -1) {
                console.log('Add client')
                const client = mqtt.connect(resource.MQTT_URL, options)
                client.on('connect', () => {
                    console.log(`Connected to adaclient ${options.username}`)
                    this.clients.push(new AdaClient(options.username, client))
                    callback && callback()
                })
            }
            else {
                callback && callback()
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    getAdaClient(username) {
        return this.clients.filter(client => client.username === username)[0]
    }

}

module.exports = new ClientGroup()