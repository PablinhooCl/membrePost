import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '../styles.css'

import Welcome from './components/welcome'
import Home from './components/home'

function App() {

  return (
    <>
     <div className="flex z-0 h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
      <Router>
        <Routes>
          <Route path='/' element={<Welcome/>} />
          <Route path='/home' element= {<Home/>} />
          <Route />
        </Routes>
      </Router>
    </div>
    </>
  )
}

export default App
