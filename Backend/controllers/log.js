const logRepo = require('../repository/log')

class LogCtrler {
    async get(req, res){
        const actuatorID = req.query.actuatorID
        const logs = await logRepo.get(actuatorID)
        res.status(200).send(logs)
    }

    async createLog(req, res) {
        const { hardwareID, action } = req.body
        await logRepo.createLog(hardwareID, action)
        res.json({ msg: 'OKE' })
    }
}

module.exports = new LogCtrler()