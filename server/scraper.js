const {BASE_URL} = require('./constants')
const axios = require('axios').default
const fs = require('node:fs')
const qs = require('node:querystring')
const cheerio = require('cheerio')

// console.log(BASE_URL)
// axios.defaults.withCredentials = true

async function test(){
    const result = await axios.get(BASE_URL)
    // console.log(result.headers['set-cookie'])
}

async function login(){
    const result = await axios.post(BASE_URL+"/Erp/Auth", qs.stringify({
        "username": "2101640100252",
        "password": "letsstart30"
    }), {withCredentials: true})
    console.log(result.headers['refresh'].split(";")[1])
    console.log([200, 201].includes(result.status))
    console.log(result.headers)
    const cookie = result.headers['set-cookie'][0].split(';')[0]
    console.log(cookie)
    // job_inbox(cookie)
    return cookie
}

async function job_inbox(){
    const cookie = await login()
    const result = await axios.get(BASE_URL+"/CR/Student_job_inbox", {
        headers: {
            Cookie: cookie
        },
        // proxy: {
            //     host: '127.0.0.1',
            //     port: 8080,
            //     protocol: 'http'
            // },
            // withCredentials: true
    })
    const data = result.data
    const $ = cheerio.load(data)

    // const job_posts = [...$(".result-info")].map(e =>
    //     [...$(e).find("tr")].map(e =>
    //         [...$(e).find('td')]
    //         // $(e).find('td')[0]
    //         .filter(e=>$(e).text() !== ':')
    //         .map(e => 
    //             $(e).text()
    //         )
    //     )
    // )

    const job_posts = [...$(".result-info")].map((e) => {
        var res_obj = {}
        for(i of $(e).find("tr")){
            var columns = $(i).find("td")
            res_obj[$(columns[0]).text()] = $(columns[2]).text()
        }
        return res_obj
    })

    // console.log(job_posts)
    // console.log("job result:", data)
    // console.log("successful:",[200, 201].includes(result.status))
    fs.writeFileSync("job_inbox.json", JSON.stringify(job_posts))
    // fs.writeFileSync("job_inbox_test.json", JSON.stringify(job_posts))
    // console.log(result)
}

// test()
// login()
// job_inbox()

module.exports = {
    scrape: job_inbox
}