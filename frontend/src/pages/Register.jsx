import React, { useState } from 'react';
import axios from 'axios';

export const Register = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        card: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/^\d{16}$/.test(form.card)) {
            alert('La tarjeta debe tener exactamente 16 dígitos numéricos');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            alert('Introduce un email válido');
            return;
        }

        try {
            const response = await axios.post('http://192.168.1.249:3001/register', form);

            if (response.data.success) {
                alert('Registro exitoso');
                setForm({
                    name: '',
                    email: '',
                    password: '',
                    card: ''
                });
            } else {
                alert(response.data.error || 'Error en el registro');
            }
        } catch (err) {
            console.error(err);
            alert('Error de conexión o registro duplicado');
        }
    };

    return (
        <section className='mt-[80px] relative -top-20 bg-gray-300'>
            <div className="w-full h-screen">
                <div className="flex flex-col items-center justify-center h-full">
                    <h1 className='text-3xl font-bold'>Iniciar Registro</h1>
                    <form className='flex flex-col items-center mt-4' onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder='Nombre de usuario'
                            className='border border-gray-500 p-1 text-center mb-4 rounded-2xl'
                            value={form.name}
                            onChange={handleChange}
                            autoComplete='off'
                            maxLength={14}
                            required
                        />
                        <input
                            type="text"
                            name="card"
                            placeholder='Tarjeta de crédito'
                            className='border border-gray-500 p-1 text-center mb-4 rounded-2xl'
                            value={form.card}
                            onChange={handleChange}
                            maxLength={16}
                            autoComplete='off'
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder='Email'
                            className='border border-gray-500 p-1 text-center mb-4 rounded-2xl'
                            value={form.email}
                            onChange={handleChange}
                            autoComplete='off'
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder='Contraseña'
                            className='border border-gray-500 p-1 text-center mb-4 rounded-2xl'
                            value={form.password}
                            onChange={handleChange}
                            autoComplete='off'
                            required
                        />

                        <button type="submit" className='bg-blue-800 hover:bg-blue-700 cursor-pointer mt-2 text-white p-1 rounded-2xl px-5'>
                            Registrarse
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};
