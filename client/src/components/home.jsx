import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import NavBar from './navBar'
import AddPost from './addPost'

const Home = () => {
    const location = useLocation()
    const history = useNavigate()   

    useEffect(() => {
        if (location.pathname === "/home" && (!location.state || !location.state.id)) {
            history('/', { state: { messageError: 'User not logged in', fromHome: true } });
        }
    }, [location, history]);
    return (
        <div className="homepage w-full">
            <NavBar info={`Welcome ${location.state && location.state.id}`} />
            <AddPost/>
        </div>
    )
}

export default Home