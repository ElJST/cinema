import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";

export const SliderImg = () => {

    const images = [
        '/img/slider/Capitan-America.webp',
        '/img/slider/La-ultima-reina.webp',
        '/img/slider/osito.webp',
        '/img/slider/The-monkey.webp',
        '/img/slider/thunderbotls.webp',
        '/img/slider/Confidencial.webp'
    ];

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [current]);

    const prevSlide = () => {
        setCurrent((current - 1 + images.length) % images.length);
      };
    
      const nextSlide = () => {
        setCurrent((current + 1) % images.length);
      };

    return (
        <>
            <section className="relative w-full h-64 md:h-[65vh] overflow-hidden ">
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        className={`absolute w-full h-full transition-opacity duration-1000 ${current === idx ? 'opacity-100' : 'opacity-0'}`
                        }
                        alt={`Slide ${idx + 1}`}
                    />
                ))}

                <button 
                className='absolute h-full bg-gray-600/15 w-16 hover:bg-transparent hover:scale-125 transition-all flex justify-center items-center' 
                onClick={prevSlide}
                >
                    <MdKeyboardArrowLeft size={35} className='opacity-50'/>
                </button>
                <button 
                className='absolute h-full right-0 bg-gray-600/15 w-16 hover:bg-transparent hover:scale-125 transition-all flex justify-center items-center'
                onClick={nextSlide}
                >
                    <MdKeyboardArrowRight size={35} className='opacity-50'/>
                </button>
            </section>
        </>
    )
}
