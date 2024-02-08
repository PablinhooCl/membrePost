import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import SignUp from './signUp'
import Login from './login'

const Welcome = () => {
    const location = useLocation()

    const [toggle, setToggle] = useState('login');

    function toggleTab(tab) {
        setToggle(tab);
    }

    return(
        <div className='m-auto'>
            <div className="tabs">
                <button className='inline-flex h-12 animate-background-shine items-center justify-center rounded-md border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50'
                onClick={() => toggleTab('login')}
                >
                    Login
                </button>

                <button className='inline-flex h-12 animate-background-shine items-center justify-center rounded-md border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50'
                onClick={() => toggleTab('signUp')}
                >
                    Sign Up
                </button>
            </div>
            {toggle === 'login' ? <Login /> : <SignUp />}
        </div>
    )
}

export default Welcome
