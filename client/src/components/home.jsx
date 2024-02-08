import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Home = () => {
    const location = useLocation()

    return(
        <div className="homepage">

            <h1>Welcome { location.state.id }</h1>


        </div>
    )
}

export default Home