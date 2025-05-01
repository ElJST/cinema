import React, { useEffect, useState } from 'react';
import { SliderImg } from '../components/SliderImg';
import { ShowMovies } from '../components/ShowMovies';
import { ShowMoviesMobile } from '../components/ShowMoviesMobile';

export const Cartelera = () => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('userActive');
        return storedUser ? JSON.parse(storedUser).name : '';
    });

    useEffect(() => {
        const handleUserUpdate = () => {
            const storedUser = localStorage.getItem('userActive');
            setUser(storedUser ? JSON.parse(storedUser).name : '');
        };

        window.addEventListener('userActiveUpdated', handleUserUpdate);

        return () => {
            window.removeEventListener('userActiveUpdated', handleUserUpdate);
        };
    }, []);

    return (
        <>
            <SliderImg />
            <section className='h-[55px] w-full border-t border-white/70 '>
                {user ? (
                    <section className='h-full w-full flex justify-center items-center text-inherit bg-inherit text-lg'>
                        <p className='underline underline-offset-[4px] font-semibold'>Bienvenid@ {user}.</p>
                    </section>
                ) : (
                    <div className="hidden"></div>
                )}
            </section>
            <section className='md:hidden'>
                <ShowMoviesMobile />
            </section>
            <section className='hidden md:block'>
                <ShowMovies />
            </section>
        </>
    );
};
