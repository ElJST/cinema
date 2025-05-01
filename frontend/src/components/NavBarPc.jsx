import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';

export const NavBarPc = ({ isOpen, setIsOpen, nameuser, setuser }) => {
    const location = useLocation();
    const currentPath = location.pathname;

    const clearToken = () => {
        localStorage.removeItem('userActive');
        setIsOpen(!isOpen);
        setuser('');
        window.location.reload();
    }

    useEffect(() => {
        const userData = localStorage.getItem('userActive');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setuser(parsedUser.name); 
        } else {
            setuser('');
        }
    }, []);

    return (
        <>
            <span className='font-bold text-xl flex:none h-full ms-4'>
                <p className='text-shadow-sm/50 text-shadow-emerald-50 cursor-pointer h-full flex items-center'>CINEMA</p>
            </span>
            <button className='md:hidden cursor-pointer me-4' onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                    </svg>
                ) : (
                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                            d='M4 6h16M4 12h16M4 18h16' />
                    </svg>
                )}
            </button>
            <section className='md:block hidden flex-3/6'>
                <ul className='flex justify-center items-center space-x-3 h-full'>
                    <Link
                        to='/'
                        className={`transition-all duration-450 cursor-pointer w-auto rounded-2xl px-4 py-1 ${currentPath === '/cartelera' ? 'bg-blue-700 text-white' : 'hover:bg-blue-700'
                        }`}
                    >
                        Cartelera
                    </Link>
                    <Link
                        to='/cine'
                        className={`transition-all duration-450 cursor-pointer w-auto rounded-2xl px-4 py-1 ${currentPath === '/cine' ? 'bg-blue-700 text-white' : 'hover:bg-blue-700'
                        }`}
                    >
                        Cine
                    </Link>
                    <Link
                        to='/contacto'
                        className={`transition-all duration-450 cursor-pointer w-auto rounded-2xl px-4 py-1 ${currentPath === '/contacto' ? 'bg-blue-700 text-white' : 'hover:bg-blue-700'
                        }`}
                    >
                        Contacto
                    </Link>
                </ul>
            </section>
            {
                nameuser ? (
                    <div className='h-full items-center me-4 md:flex hidden '>
                        <button className=' px-4 py-1 cursor-pointer border-1 border-red-800 rounded-2xl ' title='Cerrar sesión' onClick={clearToken}> {nameuser}</button>
                    </div>
                ) : (
                    <span className='h-full items-center me-4 md:flex hidden '>
                        <Link
                            to={'/login'}
                            className='cursor-pointer bg-blue-800 px-4 py-1 rounded-2xl border-1 border-amber-50 hover:bg-blue-700 transition-all duration-250'
                        >
                            Iniciar Sesion
                        </Link>
                    </span>
                )
            }
        </>
    )
}
