import React from 'react'
import { SliderImg } from '../components/SliderImg';
import { Movie } from '../components/Movie';

export const Cartelera = ({nameuser}) => {

  return (
    <section className='mt-[80px] '>
      <SliderImg />

      {
        nameuser ? (
          <div className='flex justify-center items-center h-[65px] bg-gray-900 text-white border-t-1 border-amber-50 md:hidden'>
            <h1 className='font-bold '>Bienvenid@, {nameuser}</h1>
          </div>
        ) : (
          <div className='flex justify-center items-center h-[65px] bg-gray-900 text-white border-t-1 border-amber-50 md:hidden'>
            <h1 className='font-bold '>Inicia Sesión o Registrate</h1>
          </div>
        )
      }

      <Movie />
      
    </section>
  )
}
