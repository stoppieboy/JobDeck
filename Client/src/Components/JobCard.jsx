import PropTypes from 'prop-types'


const JobCard = ({data}) => {
    return (
        <div className="job-card">
            <h2>{data.company}</h2>
            <h5><span>Job Post Date:</span> {data.post_date}</h5>
            <h5><span>Interview Date:</span> {data.interview_date}</h5>
            <h5><span>Last Date to Apply:</span> {data.application_deadline}</h5>
        </div>
    )
}

JobCard.propTypes = {
    data: PropTypes.object
}

export default JobCard