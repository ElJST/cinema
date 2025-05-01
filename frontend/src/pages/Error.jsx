import React from 'react'
import { Link } from 'react-router-dom'

export const Error = () => {
    return (
        <>
            <section className='flex flex-col md:flex-row items-center justify-center gap-6  relative -top-20 '>
                <aside className='h-screen md:w-[50%] w-full mt-[80px] '>
                    <div className='flex flex-col items-center justify-center h-full text-center' >
                        <h1 className='text-3xl font-bold'>Error 404</h1>
                        <p className='mt-4'>La página que estás buscando no existe.</p>
                        <p className='mt-2'>Por favor, verifica la URL o vuelve a la página de inicio.</p>
                        <Link to={'/cartelera'} 
                        className='mt-2 border-1 border-red-500 text-red-500 py-1 px-2 rounded-2xl hover:text-blue-700 hover:bg-white hover:border-blue-700'>Volver a la Cartelera</Link>
                    </div>
                </aside>
                <main className='bg-gray-300 h-screen md:w-[50%] w-full flex items-center'>
                    <div className="h-[160px] w-full bg-gray-900 text-center flex items-center justify-center">
                        <h1 className='text-white font-bold text-5xl text-shadow-sm/50 text-shadow-emerald-50'>CINEMA</h1>
                    </div>
                </main>
            </section>
        </>
    )
}
