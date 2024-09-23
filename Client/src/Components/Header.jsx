// import React from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import ReactLoading from 'react-loading'
import { useEffect, useState } from 'react'

const Header = ({setJobData}) => {
    // const navigate = useNavigation()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchJobsHandler()
    }, [])

    async function syncHandler(){
        console.log('Sync handler')
        setLoading(true)
        try{
            const result = await axios.get("http://localhost:3000/sync")
            // console.log(result.data)
            setJobData(result.data)
        }catch(e){
            alert('Some error occured')
        }
        finally{
            setLoading(false)
        }
    }

    async function fetchJobsHandler(){
        console.log('Fetch handler')
        setLoading(true)
        try{
            const result = await axios.get("http://localhost:3000/fetchJobs")
            setJobData(result.data)
        }catch(e){
            alert('some error occured')
        }finally{
            setLoading(false)
        }
    }

    return (
        <nav>
            <ul>
                <li><NavLink onClick={fetchJobsHandler}>Job Inbox</NavLink></li>
                <li><NavLink>About</NavLink></li>
                <li><NavLink> Wall</NavLink></li>
                <li><NavLink>Applied</NavLink></li>
                <li><NavLink onClick={syncHandler}>Sync</NavLink></li>
                {loading && <li><ReactLoading type='spin' height={18} width={20}/></li>}
            </ul>

            {/* <button>Login</button> */}
        </nav>
    )
}

Header.propTypes = {
    setJobData: PropTypes.func
}

export default Header