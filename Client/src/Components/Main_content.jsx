import JobCard from './JobCard'
import PropTypes from 'prop-types'

const Main_content = ({jobData}) => {

    // async function fetchData(){
    //     console.log('called')
    //     const result = await axios.get("http://localhost:3000/sync")
    //     console.log(result.data[0]['Company Name'])
    //     // const temp = await JSON.parse(result.data)
    //     setJobData(result.data)
    //     console.log(jobData)
    //     setOkay("okay")
    //     console.log(okay)
    //     // console.log(jobData)
    // }

    // async function fetchData(){
    //     const result = await axios.get("http://localhost:3000/sync")
    //     setJobData(result.data)
    // }

    return (
        <main className='job-grid'>
            {/* {jobData && jobData.map((e,i)=><div key={i}>{e[0]}</div>)} */}
            {jobData && jobData.map((e, i) => <JobCard key={i} data={e}/>)}
        </main>
    )
}

Main_content.propTypes = {
    jobData: PropTypes.array
}

export default Main_content