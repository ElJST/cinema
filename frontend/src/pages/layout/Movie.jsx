import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TbArmchair2 } from "react-icons/tb";
import { TbArmchairOff } from "react-icons/tb";
import axios from 'axios';
import { MyButton } from '../../components/MyButton';
import { Tooltip } from "@heroui/react";
import { CommentsMovie } from '../../components/CommentsMovie';
import { addToast, Spinner } from "@heroui/react";

export const Movie = () => {

    const [movie, setMovie] = useState({});
    const [seats, setSeats] = useState([]);
    const [seatsSelect, setSeatsSelect] = useState([]);
    const location = useLocation();
    const movieId = location.pathname.split('/').pop();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        axios.get(`http://192.168.1.238:3001/movies/${movieId}`)
            .then(res => setMovie(res.data))
            .catch(err => console.error('Error al cargar la película:', err));

        axios.get(`http://192.168.1.238:3001/seats/${movieId}`)
            .then(res => setSeats(res.data))
            .catch(err => console.error('Error al cargar los asientos:', err));
    }, [movieId]);

    const handleSeat = (idSeat) => {
        let newSeats;
        if (seatsSelect.includes(idSeat)) {
            newSeats = seatsSelect.filter(seat => seat !== idSeat);
            document.getElementById(idSeat).classList.remove('bg-blue-500');
        } else {
            newSeats = [...seatsSelect, idSeat];
            document.getElementById(idSeat).classList.add('bg-blue-500');
        }
        setSeatsSelect(newSeats);
    };

    const reserveSeat = async () => {
        const user = JSON.parse(localStorage.getItem('userActive')).id;

        try {
            for (let i = 0; i < seatsSelect.length; i++) {
                const response = await axios.put(`http://192.168.1.238:3001/seats/${seatsSelect[i]}`, {
                    idUser: user
                });
                console.log('Seat actualizado:', response.data);
                addToast({
                    title: 'Reservando...',
                    description: `Asiento A${seatsSelect[i]} reservado con exito`,
                    color: 'success',
                    timeout: 2500,
                    shouldShowTimeoutProgress: false,
                })
            }

            const res = await axios.get(`http://192.168.1.238:3001/seats/${movieId}`);
            setSeats(res.data);

            seatsSelect.forEach((seat) => (
                document.getElementById(seat).classList.remove('bg-blue-500')
            ));

            setSeatsSelect([]);

        } catch (err) {
            console.error('Error al reservar asientos:', err);
        }
    };


    if (!movie.name) {
        return (
            <section className='h-[70vh] w-full flex items-center justify-center'>
                <Spinner
                    color="primary"
                    variant='gradient'
                    label="Cargando información..."
                    classNames={{
                        label: 'dark:text-white'
                    }}
                />
            </section>
        )
    }

    return (
        <div className="w-full pt-6 lg:pb-40">
            <div className="container mx-auto flex flex-col gap-6">
                <div className="flex w-full">
                    <h4 className="text-3xl md:text-5xl  max-w-xl px-6 md:px-0">
                        {movie.name}
                    </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-4 md:col-span-2 ">
                        <div className="h-auto w-full shadow-xl shadow-white/15 md:shadow-none">
                            <img
                                src={movie.routeImgSlider}
                                alt={movie.name}
                                className='w-full'
                            />
                        </div>
                        <div className="flex flex-col gap-2 px-6 md:px-0">
                            <h3 className="max-w-3xl text-2xl ">
                                Descripción
                            </h3>
                            <p className="max-w-3xl text-base">
                                {movie.description}
                            </p>
                            <h3 className="max-w-3xl text-2xl ">
                                Duración
                            </h3>
                            <p className="max-w-3xl text-base">
                                {movie.duration} min.
                            </p>
                        </div>
                        <div className="h-auto w-full bg-gray-200 rounded-2xl p-6 dark:text-black flex flex-col justify-center items-center">
                            {
                                localStorage.getItem('userActive') ? (
                                    <>
                                        <h3 className="w-full text-2xl text-center font-semibold">
                                            Reserva de Asientos
                                        </h3>
                                        <section className="md:max-w-[35%] flex justify-center items-center flex-wrap gap-4 mt-4">
                                            {
                                                seats.map((seat) => (
                                                    <Tooltip content={'A' + seat.id} key={seat.id}>
                                                        <span
                                                            key={seat.id}
                                                            id={seat.id}
                                                            className='w-8 h-8  rounded-2xl flex items-center justify-center '
                                                        >
                                                            {
                                                                (seat.state === 'disponible') ? (
                                                                    <TbArmchair2
                                                                        key={seat.id}
                                                                        className='cursor-pointer w-auto
                                                        h-full p-1 rounded-2xl'
                                                                        title={seat.state}
                                                                        onClick={e => handleSeat(seat.id)}
                                                                    />
                                                                ) : (
                                                                    <TbArmchairOff
                                                                        key={seat.id}
                                                                        className='cursor-not-allowed
                                                        w-auto
                                                        h-full p-1 bg-gray-600 rounded-2xl '
                                                                        title={seat.state}
                                                                    />
                                                                )
                                                            }
                                                        </span>
                                                    </Tooltip>
                                                ))
                                            }
                                        </section>
                                        <div className="h-14 flex justify-center items-center">
                                            {(seatsSelect != 0) ? (
                                                <MyButton className='  bg-blue-600 text-white px-2 py-1 rounded-2xl mt-2 mb-2 border border-amber-50 cursor-pointer hover:bg-blue-700'
                                                    text={'Reservar Asientos'}
                                                    color='primary'
                                                    onPress={reserveSeat}
                                                >Reserva</MyButton>
                                            ) : (
                                                <div className="flex justify-center items-center h-full">
                                                    <p className='underline'>Seleciona algun asiento disponible.</p>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        to='/login'
                                        className='mt-6 border border-white text-white bg-blue-700 py-1 px-4 rounded-2xl hover:bg-blue-500 cursor-pointer'
                                    >
                                        Iniciar sesión para reservar
                                    </Link>
                                )
                            }

                        </div>
                        {
                            localStorage.getItem('userActive') ? (
                                <section className='w-full h-14 md:h-12 bg-gray-900 rounded-2xl flex items-center justify-around text-sm'>
                                    <div className='flex items-center gap-1 text-white'>
                                        Seleccionada:
                                        <span className="w-3 h-3 rounded border border-amber-50 bg-blue-500 md:translate-y-0.5"></span>
                                    </div>
                                    <div className='flex items-center gap-1 text-white'>
                                        Disponible:
                                        <span className="w-3 h-3 rounded border border-amber-50 bg-gray-400 md:translate-y-0.5"></span>
                                    </div>
                                    <div className='flex items-center gap-1 text-white'>
                                        Ocupada:
                                        <span className="w-3 h-3 rounded border border-amber-50 bg-gray-600 md:translate-y-0.5"></span>
                                    </div>
                                </section>
                            ) : (
                                <div className="hidden"></div>
                            )
                        }
                    </div>
                </div>
            </div>
            <CommentsMovie />
        </div>
    )
}