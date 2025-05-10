import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Spinner } from "@heroui/react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const ShowMoviesMobile = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        axios.get('http://192.168.1.238:3001/movies')
            .then(res => setMovies(res.data))
            .catch(err => console.error('Error al cargar películas:', err));
    }, []);

    const closeModal = () => setSelectedMovie(null);

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
        <>
            {movies.map((movie) => (
                <motion.div 
                key={movie.id} 
                className='w-full px-10 mb-12'
                initial={{ opacity:0 , translateY:20 }}
                animate={{ opacity:1 , translateY:1 }}
                transition={{ duration:1 }}
                >
                    <h1 className='text-xl font-bold mb-2 text-center'>{movie.name}</h1>
                    <div className='relative group w-full h-auto flex justify-center '>
                        <button onClick={() => setSelectedMovie(movie)}>
                            <img
                                src={movie.routeImg}
                                alt={movie.name}
                                className='rounded-lg shadow-lg w-full h-[520px]'
                            />
                        </button>
                    </div>
                </motion.div>
            ))}

            {selectedMovie && (
                <Modal isOpen={true} onOpenChange={closeModal}  placement={'center'}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">{selectedMovie.name}</ModalHeader>
                                <ModalBody>
                                    <p className='mb-4 text-center'>{selectedMovie.description}</p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button 
                                    color="danger" 
                                    variant="light" 
                                    onPress={onClose}
                                    radius='full'
                                    >
                                        Cerrar
                                    </Button>
                                    <Link 
                                    to={`/movie/${selectedMovie.id}`} 
                                    className='bg-blue-600 hover:bg-blue-500 cursor-pointer mt-2 text-white p-1 rounded-2xl px-5 -translate-y-1'
                                    >
                                        Ver Detalles
                                    </Link>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            )}
        </>
    );
}
