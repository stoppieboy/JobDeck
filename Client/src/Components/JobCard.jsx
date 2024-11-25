import PropTypes from 'prop-types'
import axios from 'axios'
// import { redirect } from 'react-router-dom'


const JobCard = ({data}) => {

    async function clickHandler() {
        console.log(data.href)
        try{
            const result = await axios.get(`http://localhost:3000/jd/${data.href}`)
            console.log(result.data)
        }catch(e){
            console.log(e)
            alert('some error occurred')
        }

    }

    return (
        <div className="job-card" onClick={clickHandler}>
            <h2 style={data.applied ? {color: 'green'}: {color: 'red'}}>{data.company}</h2>
            <h5><span>Job Post Date:</span> {data.post_date}</h5>
            <h5><span>Interview Date:</span> {data.interview_date}</h5>
            <h5><span>Last Date to Apply:</span> {data.application_deadline}</h5>
            {data.applied ? (<h5><span>Applied on:</span> {data.applied}</h5>):<h5>Not Applied</h5>}
        </div>
    )
}

JobCard.propTypes = {
    data: PropTypes.object
}

export default JobCard