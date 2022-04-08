const gardenModel = require('../models/garden')
const handler = require('./handler')

class GardenCtrler {
    getList(req, res) {
        const email = req.accountemail
        handler(res, async () => {
            const gardenList = await gardenModel.getList(email)
            res.json(gardenList)
        })
    }
    create(req, res) {
        const { name, imgurl, description, group_key } = req.body
        handler(res, async () => {
            await gardenModel.create({ name, imgurl, description, group_key })
            res.json({ msg: 'OKE' })
        })
    }
    remove(req, res) {
        const gardenID = req.params.id
        handler(res, async () => {
            await gardenModel.delete(gardenID)
            res.json({ msg: 'OKE' })
        })
    }
    modify(req, res) {
        
    }
}

module.exports = new GardenCtrler()