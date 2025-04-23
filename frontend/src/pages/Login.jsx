import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Login = ({setuser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msj, setMsj] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.1.249:3001/login', {
        email,
        password
      });
      console.log('Login correcto', response.data);
      setuser(response.data.user.name);
      const token = {
        email: response.data.user.email,
        name: response.data.user.name,
        id: response.data.user.id
      }
      localStorage.setItem('userActive', JSON.stringify(token));
      navigate('/cartelera');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMsj('Error al iniciar sesion. Verifica tus credenciales.');
      document.querySelectorAll('input').forEach((input) =>{
        input.value = '';
        input.classList.add('border-red-500');
      }) 
    }
  };

  return (
    <section className='bg-gray-300 mt-[80px] relative -top-20'>
      <div className="w-full h-screen " >
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className='text-3xl font-bold'>Iniciar Sesión</h1>
          <form onSubmit={handleLogin} className='flex flex-col items-center mt-4'>
            <input
              type="text"
              placeholder='Email'
              className='border border-gray-500 p-1 text-center mb-4 rounded-2xl'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder='Contraseña'
              className='border border-gray-500 p-1 text-center mb-4 rounded-2xl'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className='text-gray-500 text-sm mb-2'>No estas registrado? <Link to={'register'} className='text-blue-400 text-sm'>Registrate</Link></p>
            
            <button type="submit" className='bg-blue-800 hover:bg-blue-700 cursor-pointer mt-2 text-white p-1 rounded-2xl px-5'>Iniciar Sesión</button>
          </form>
          {msj && <p className='text-red-500 mt-2'>{msj}</p>}
          
        </div>
      </div>
    </section>
  );
};
