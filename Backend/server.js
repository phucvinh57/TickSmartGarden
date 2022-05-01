require('dotenv').config()
const express = require('express')
const app = express()
const route = require('./routers')
const cors = require('cors')

const PORT = process.env.PORT | 8080


app.use(cors({ origin: true }))
app.use(express.json())


app.get('/', (req, res) => {
    res.json({ MSG: "OKE" })
})

route(app)

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT)
})
