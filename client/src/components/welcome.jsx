import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import SignUp from './signUp'
import Login from './login'

const Welcome = () => {
    const location = useLocation()

    const [toggle, setToggle] = useState('login');
    const [isFromHome, setIsFromHome] = useState(false)

    function toggleTab(tab) {
        setToggle(tab);
    }

    useEffect(() => {
        if (location.state && location.state.fromHome) {
          setIsFromHome(true);
        }
      }, [location.state]);


    return(
        <div className='m-auto'>
            <div className="tabs">
                <button className='inline-flex z-auto h-12 animate-background-shine items-center justify-center rounded-none border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50'
                onClick={() => toggleTab('login')}
                >
                    Login
                </button>

                <button className=' translate-x-1 inline-flex z-0 h-12 animate-background-shine items-center justify-center rounded-none border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50'
                onClick={() => toggleTab('signUp')}
                >
                    Sign Up
                </button>
            </div>
            {toggle === 'login' ? <Login /> : <SignUp />}
            {isFromHome && (
                <p className='font-semibold	text-red-600'
                > { location.state && location.state.messageError }
                </p>
            )}
        </div>
    )
}

export default Welcome
