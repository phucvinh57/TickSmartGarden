const gardenModel = require('../repository/garden')
const handler = require('./handler')

class GardenCtrler {
    async getList(req, res) {
        const email = req.accountEmail
        const gardenList = await gardenModel.getList(email)
        res.json(gardenList)
    }
    create(req, res) {
        const data = req.body
        console.log(data)
        handler(res, async () => {
            const gardenID = await gardenModel.create(data)
            res.json({ gardenID })
        })
    }
    remove(req, res) {
        const gardenID = req.params.id
        handler(res, async () => {
            await gardenModel.delete(gardenID)
            res.json({ msg: 'OKE' })
        })
    }
    getList(req, res) {
        const useremail = req.query.useremail
        handler(res, async () => {
            const gardenList = await gardenModel.getList(useremail)
            res.json(gardenList)
        })
    }
}

module.exports = new GardenCtrler()