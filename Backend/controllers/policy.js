const res = require('express/lib/response')
const policyRepo = require('../repository/policy')
const handler = require('./handler')

class PolicyCtrler {
    async update(req, res){
        await policyRepo.updatePolicy(req.body)
        res.status(200).send()
    }

    async getActuatorPolicy(req, res){
        const actuatorID = req.params.actuatorID
        const groupByPolicy = await policyRepo.getActuatorPolicy(actuatorID)
        res.status(200).send(groupByPolicy)
    }

    async addPolicy(req, res){
        await policyRepo.addPolicy(req.body)
        res.status(200).send()
    }

    async deletePolicy(req, res) {
        const {name, hardwareID} = req.query
        await policyRepo.deletePolicy(name, hardwareID)
        res.status(200).send()
    }
}

module.exports = new PolicyCtrler()