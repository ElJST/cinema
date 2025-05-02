import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TbArmchair2 } from "react-icons/tb";
import { TbArmchairOff } from "react-icons/tb";
import axios from 'axios';

export const MovieDetails = () => {
    const [movie, setMovie] = useState({});
    const [seats, setSeats] = useState([]);
    const [seatsSelect, setSeatsSelect] = useState([]);
    const location = useLocation();
    const movieId = location.pathname.split('/').pop();

    useEffect(() => {
        axios.get(`http://192.168.1.249:3001/movies/${movieId}`)
            .then(res => setMovie(res.data))
            .catch(err => console.error('Error al cargar la película:', err));

        axios.get(`http://192.168.1.249:3001/seats/${movieId}`)
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
            const response = await axios.put(`http://192.168.1.249:3001/seats/${seatsSelect[i]}`, {
                idUser: user
            });
            console.log('Seat actualizado:', response.data);
          }
      
          const res = await axios.get(`http://192.168.1.249:3001/seats/${movieId}`);
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
            <section className='mt-20 flex justify-center items-center h-screen'>
                <p className='text-xl'>Cargando película...</p>
            </section>
        );
    };

    return (
        <section className='relative -top-20 flex flex-col bg-gray-300 mt-[80px] min-h-screen'>
            <section className=' w-full mt-[80px]'>
                <img src={movie.routeImgSlider} alt={movie.name} className='shadow-2xl h-60 w-full md:h-[65vh]' />
            </section>

            <section className='mb-[80px] p-4 flex flex-col md:flex-row justify-center items-center text-center'>
                <div className="flex-2/4 mb-3.5 md:mb-0 pe-3">
                    <h2 className='font-bold text-2xl mb-2 underline'>{movie.name}</h2>
                    <p className='text-sm max-w-xl'>{movie.description}</p>
                    <p className='text-sm'>Duración: {movie.duration} minutos.</p>
                </div>
                <div className="flex-2/4 p-4 flex items-center justify-center h-[320px] w-full shadow-2xl bg-gray-400 mb-[80px] md:mb-0 rounded-2xl">
                    {localStorage.getItem('userActive') ? (
                        <div className="flex flex-col justify-between h-full items-center w-full md:p-2">
                            <h3 className='font-bold'>Selecciona tu asiento:</h3>
                            <section className='flex flex-wrap items-center justify-center gap-2 w-[50%] h-full'>
                                {
                                    seats.map((seat) => (
                                        <span
                                            key={seat.id}
                                            id={seat.id}
                                            className='w-6 h-6 rounded-2xl flex items-center justify-center '
                                        >
                                            {
                                                (seat.state === 'disponible') ? (
                                                    <TbArmchair2
                                                        key={seat.id}
                                                        className='cursor-pointer w-5 h-5 md:w-5 md:h-5 rounded-2xl'
                                                        title={seat.state}
                                                        onClick={e => handleSeat(seat.id)}
                                                    />
                                                ) : (
                                                    <TbArmchairOff
                                                        key={seat.id}
                                                        className='cursor-not-allowed bg-gray-600 w-5 h-5 md:w-5 md:h-5 rounded-2xl '
                                                        title={seat.state}
                                                    />
                                                )
                                            }
                                        </span>
                                    ))
                                }

                            </section>

                            {(seatsSelect != 0) ? (
                                <button className='bg-blue-600 text-white px-2 py-1 rounded-2xl mt-2 mb-2 border border-amber-50 cursor-pointer hover:bg-blue-700'
                                onClick={reserveSeat}
                                >Reserva</button>
                            ) : (
                                <div className="hidden"></div>
                            )}

                            <section className='w-full h-20 bg-gray-900 rounded-2xl flex items-center justify-around text-sm'>
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

                        </div>

                    ) : (
                        <Link
                            to='/login'
                            className='mt-6 border border-white text-white bg-blue-700 py-1 px-4 rounded-2xl hover:bg-blue-500 cursor-pointer'
                        >
                            Iniciar sesión para reservar
                        </Link>
                    )}
                </div>
            </section>
        </section>
    );
};
