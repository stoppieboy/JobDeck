const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const path = require('node:path')
// const PORT = process.env.PORT || 3000;
// const BASE_URL = process.env.BASE_URL || "https://erp.psit.ac.in";
const {BASE_URL, PORT} = require('./constants')
const scraper = require('./scraper')


const app = express()

app.use(express.static(path.join(__dirname+'/public')))

app.use(morgan('dev'))
app.use(cors())
app.use(helmet());

app.get("/sync", async (req, res) => {
    await scraper.scrape()
    // res.send('Synced !')
    res.sendFile(path.join(__dirname, "job_inbox.json"))
})

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "index.html"))
})

app.listen(PORT, () => console.log(`Server active on port ${PORT}`))