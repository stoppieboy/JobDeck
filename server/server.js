// Requires
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const path = require('node:path')
const {BASE_URL, PORT} = require('./constants')
const scraper = require('./scraper')

const app = express()

// Middlewares
app.use(express.static(path.join(__dirname+'/public')))
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(helmet());

// Routes
app.get("/sync", async (req, res) => {
    try{
        await scraper.scrape()
        res.sendFile(path.join(__dirname, "job_inbox.json"))
    }catch(e){
        console.log(e)
        res.status(501).json({status: 'failed', e})
    }
    // res.send('Synced !')
})

app.get("/fetchJobs", (req, res) => {
    res.sendFile(path.join(__dirname, "job_inbox.json"))
})

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "index.html"))
})

app.listen(PORT, () => console.log(`Server active on port ${PORT}`))