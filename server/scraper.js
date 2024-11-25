const {BASE_URL} = require('./constants')
const axios = require('axios').default
const fs = require('node:fs')
const qs = require('node:querystring')
const cheerio = require('cheerio')

async function test(){
    const result = await axios.get(BASE_URL)
    // console.log(result.headers['set-cookie'])
}

async function login(){
    const result = await axios.post(BASE_URL+"/Erp/Auth", qs.stringify({
        "username": process.env.ERP_USERNAME,
        "password": process.env.ERP_PASSWORD
    }), {withCredentials: true})
    // console.log(process.env.USERNAME, process.env.PASSWORD)
    if(result.headers['refresh'].split(";")[1].split('=')[1] === 'https://erp.psit.ac.in/Student/')
        console.log('Login successful.')
    else
        console.log('Login failed.')
    // console.log(result.headers['refresh'].split(";")[1].split('=')[1] === 'https://erp.psit.ac.in/Student/')
    // console.log([200, 201].includes(result.status))
    // console.log(result.headers)
    const cookie = result.headers['set-cookie'][0].split(';')[0]
    // console.log(cookie)
    // job_inbox(cookie)
    return cookie
}

async function job_inbox(){
    console.log('Logging in...')
    const cookie = await login()
    console.log('Fetching Job Data...')
    const result = await axios.get(BASE_URL+"/CR/Student_job_inbox", {
        headers: {
            Cookie: cookie
        },
        // proxy: {
            //     host: '127.0.0.1',
            //     port: 8080,
            //     protocol: 'http'
            // },
    })
    const data = result.data
    if(data) console.log('Job Data fetched successfully')
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

    const fields = ["company", "post_date", "interview_date", "application_deadline"]
    const job_posts = [...$(".result-list")].slice(1).map((e) => {
        var res_obj = {}
        var index = 0
        for(i of $(e).find(".result-info tr")){
            var columns = $(i).find("td")
            res_obj[fields[index++]] = $(columns[2]).text()
        }

        for(i of $(e).find(".result-price a")){
            res_obj['href'] = $(i).attr('href').slice(41)
        }

        for(i of $(e).find(".result-price img")){
            res_obj['applied'] = $(i).attr('title').slice(11)
        }

        return res_obj
    })
    // const fields = ["company", "post_date", "interview_date", "application_deadline"]
    // const job_posts = [...$(".result-info")].map((e) => {
    //     var res_obj = {}
    //     var index = 0
    //     for(i of $(e).find("tr")){
    //         var columns = $(i).find("td")
    //         res_obj[fields[index++]] = $(columns[2]).text()
    //     }
    //     return res_obj
    // })

    // console.log(job_posts)
    // console.log("job result:", data)
    // console.log("successful:",[200, 201].includes(result.status))
    fs.writeFileSync("job_inbox.json", JSON.stringify(job_posts))
    // fs.writeFileSync("job_inbox_test.json", JSON.stringify(job_posts))
    // console.log(result)
    console.log('data persisted.')
}

async function scrapeJob(){
    try{
        const id = '/1/7480/628949734'
        console.log('Logging in...')
        const cookie = await login()
        console.log('Fetching Job Data...')
        const result = await axios.get(`${BASE_URL}/CR/job_description${id}`, {
            headers: {
                Cookie: cookie
            }
        });
        // console.log(result)
        const $ = cheerio.load(result.data)

        $(".result-info").first()

        const jd = [...$(".result-info").slice(1)].map(e => {
            var res_obj = {}
            console.log($(e).find('tr').find('td').text())
        })
        return result;
    }catch(e){
        console.log(e)
        // return result;
        // console.log(e)
    }
}

// test()
// login()
// job_inbox()
// scrapeJob()

module.exports = {
    scrape: job_inbox,
    scrapeJob
}