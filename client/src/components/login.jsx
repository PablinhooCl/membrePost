import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
    const history = useNavigate();
    
    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }      
    const handleSubmit = async (e) =>  {
        e.preventDefault()
        console.log(formData)
        try {
            const response = await axios.post('http://localhost:5000/login', {
              formData,
            }, {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            })
            if (response.status === 200) {
                console.log('Inicio de sesión exitoso');
                history('/home', { state: { id: formData.username } })
            } else {
                console.error('Inicio de sesión fallido:', response.statusText);
            }
        }catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    }
    
    return (
        <div className=' flex justify-center items-center m-auto z-10 border-2 rounded-md px-14 border-indigo-500/100 '  style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <form onSubmit={handleSubmit} className='flex flex-col'>
            <input  className='my-5 border-1 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none'
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Nombre de usuario"
            />
            <input  className='my-5 border-1 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none'
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
            />
            <button className='w-auto my-5 justify-self-center m-auto inline-flex h-12 animate-background-shine items-center justify-center rounded-md border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50'
            type="submit">Login</button>
            </form>
        </div>
    )
    
}

export default Login;
