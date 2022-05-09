const gardenRepo = require('../repository/garden')
const handler = require('./handler')

class GardenCtrler {
    async getList(req, res) {
        const email = req.query.accountEmail
        const gardenList = await gardenRepo.getList(email)
        res.json(gardenList)
    }

    create(req, res) {
        const data = req.body
        console.log(data)
        handler(res, async () => {
            const gardenID = await gardenRepo.create(data)
            res.json({ gardenID })
        })
    }
    remove(req, res) {
        const gardenID = req.params.id
        handler(res, async () => {
            await gardenRepo.delete(gardenID)
            res.json({ msg: 'OKE' })
        })
    }
    
}

module.exports = new GardenCtrler()