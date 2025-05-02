import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Auth = () => {
  const [password, setPassword] = useState('');
  const { setIsAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'Justin1234') {
      setIsAuth(true);
      navigate('/admin');
    } else {
      document.querySelector('input[type="password"]').value = '';
      document.querySelector('input[type="password"]').placeholder = 'Contraseña incorrecta';
    }
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1 className='text-3xl font-bold'>Bienvenido Admin</h1>
      <form className='flex flex-col mt-4 w-96' onSubmit={handleLogin}>
        <input
          type='password'
          placeholder='Contraseña'
          className='border border-gray-300 p-2 rounded-2xl mb-4 text-center'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type='submit'
          className='cursor-pointer border border-gray-300 bg-blue-700 text-white p-2 rounded-2xl hover:bg-blue-500'
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};
