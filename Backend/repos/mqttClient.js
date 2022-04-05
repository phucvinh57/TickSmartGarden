const mqtt = require('mqtt')
const resource = require('../resources')

class AdaClient {
    constructor(username, client){
        this.username= username
        this.client = client
    }

    pub(key, message, isFeed = true) {
        const topic = [this.username, isFeed ? 'feeds' : 'groups', key].join('/')
        this.client.publish(topic, message)
    }

    sub(key, onMessage, isFeed = true) {
        const topic = [this.username, isFeed ? 'feeds' : 'groups', key].join('/')
        this.client.subscribe(topic, err => {
            err && console.log(err)
            !err && this.client.on('message', (incomeTopic, message) => {
                console.log(`Message on topic ${incomeTopic}. Message: ${message}`)
                if (topic === incomeTopic) {
                    onMessage(incomeTopic, message)
                }
            })
        })
    }
}

class ClientGroup{
    constructor(){
        this.clients = []
    }

    addClient(options, callback = null){
        //Check if added yet
        if(this.clients.findIndex(client => client.username === options.username) === -1){
            const client  = mqtt.connect(resource.MQTT_URL, options)
            client.on('connect', () => {
                console.log('Connected')
                this.clients.push(new AdaClient(options.username, client))
                callback && callback()
            })
        }
    }

    getAdaClient(username){
        return this.clients.filter(client => client.username === username)[0]
    }

}

module.exports = new ClientGroup()