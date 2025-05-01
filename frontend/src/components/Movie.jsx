import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Movie = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get('http://192.168.1.249:3001/movies')
            .then(res => setMovies(res.data))
            .catch(err => console.error('Error al cargar películas:', err));
    }, []);

    return (
        <section className='flex flex-wrap items-center justify-center bg-gray-300 gap-6 p-4'>
            {movies.map((movie) => (
                <div key={movie.id} className='flex flex-col items-center justify-center w-72 mb-[80px]'>
                    <h1 className='text-xl font-bold mb-2 text-center'>{movie.name}</h1>
                    <div className='relative group w-full h-[500px]'>
                        <img
                            src={movie.routeImg}
                            alt={movie.name}
                            className='rounded-lg shadow-lg w-full h-full object-cover'
                        />
                        <div className='absolute inset-0 bg-black rounded-lg bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white text-sm p-4'>
                            <p className='mb-4 text-center'>{movie.description}</p>
                            <Link
                                to={`/movie/${movie.id}`} 
                                className='bg-blue-800 hover:bg-blue-700 cursor-pointer mt-2 text-white p-1 rounded-2xl px-5'>
                                Ver Detalles
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};
