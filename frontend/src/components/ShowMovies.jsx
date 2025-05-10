import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from "@heroui/react";
import { motion } from "framer-motion";

export const ShowMovies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get('http://192.168.1.238:3001/movies')
            .then(res => setMovies(res.data))
            .catch(err => console.error('Error al cargar películas:', err));
    }, []);

    if (movies.length === 0) {
        return (
            <section className='h-36 w-full flex items-center justify-center'>
                <Spinner 
                color="primary"
                variant='gradient'
                label="Cargando peliculas..." 
                classNames={{
                    label: 'dark:text-white'
                }}
                />
            </section>
        )
    }

    return (
        <section className='flex flex-wrap items-center justify-center  gap-6 p-4'>
            {movies.map((movie, i) => (
                <motion.div 
                key={movie.id} 
                className='flex flex-col items-center justify-center w-72 mb-[80px]'
                initial={{ opacity: 0, translateX: -100, z: -1 }}
                animate={{ opacity: 1, translateX: 1, z: 5}}
                transition={{ delay: i * 0.3 }}
                >
                    <h1 className='text-xl font-bold mb-2 text-center'>{movie.name}</h1>
                    <div className='relative group w-full h-[500px] hover:scale-105 transition-all '>
                        <img
                            src={movie.routeImg}
                            alt={movie.name}
                            className='rounded-lg shadow-lg w-full h-full object-cover'
                        />
                        <div className='absolute inset-0 bg-black rounded-lg bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white text-sm p-4 shadow-2xl dark:shadow-blue-700/30 ligth:shadow-black/30'>
                            <p className='mb-4 text-center'>{movie.description}</p>
                            <Link
                                to={`/movie/${movie.id}`}
                                className='bg-blue-800 hover:bg-blue-700 cursor-pointer mt-2 text-white p-1 rounded-2xl px-5'>
                                Ver Detalles
                            </Link>
                        </div>
                    </div>
                </motion.div>
            ))}
        </section>
    )
}
