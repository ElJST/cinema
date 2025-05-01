import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';

export const NavBarMovile = ({ isOpen, setIsOpen, nameuser, setuser }) => {

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
            {/** Menu para moviles */}
            <section
                className={`md:hidden bg-gray-900 text-white transform transition-all duration-300 ease-in-out fixed w-full overflow-hidden z-30 ${isOpen ? 'max-h-[500px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'
                    }`}
            >
                <ul className='space-y-2 flex flex-col text-center mx-30'>
                    <Link
                        to='/cartelera'
                        className={`transition-all duration-350 cursor-pointer w-auto rounded-2xl px-4 py-1 mt-3.5 ${currentPath === '/cartelera' ? 'bg-blue-700 text-white' : 'hover:bg-blue-700'
                            }`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        Cartelera
                    </Link>
                    <Link
                        to='/cine'
                        className={`transition-all duration-350 cursor-pointer w-auto rounded-2xl px-4 py-1 ${currentPath === '/cine' ? 'bg-blue-700 text-white' : 'hover:bg-blue-700'
                            }`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        Cine
                    </Link>
                    <Link
                        to='/contacto'
                        className={`transition-all duration-350 cursor-pointer w-auto rounded-2xl px-4 py-1 ${currentPath === '/contacto' ? 'bg-blue-700 text-white' : 'hover:bg-blue-700'
                            }`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        Contacto
                    </Link>

                    {
                        nameuser ? (
                            <div className='mb-3.5 border-1 border-red-800 rounded-2xl '>
                                <button className='px-4 py-1 rounded-2xl w-full cursor-pointer ' onClick={clearToken}>Cerrar sesión</button>
                            </div>
                        ) : (
                            <Link
                                to={'/login'}
                                className='mb-3.5 hover:animate-pulse border-1 border-amber-50 rounded-2xl '>
                                <button className='cursor-pointer bg-blue-800  px-4 py-1 rounded-2xl w-full '
                                    onClick={() => setIsOpen(!isOpen)}>
                                    Iniciar Sesion
                                </button>
                            </Link>
                        )
                    }
                </ul>
            </section>
        </>
    )
}
