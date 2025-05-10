import React, { useState, useEffect , useRef } from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

export const SliderImg = () => {

    const images = [
        '/img/slider/Capitan-America.webp',
        '/img/slider/The-monkey.webp',
        '/img/slider/osito.webp',
        '/img/slider/La-ultima-reina.webp',
        '/img/slider/thunderbotls.webp',
        '/img/slider/Confidencial.webp'
    ];

    const [current, setCurrent] = useState(0);
    const sliderRef = useRef(null);
    const touchStartX = useRef(null);
    const navigate = useNavigate();

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

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        if (!touchStartX.current) return;
        const diff = e.changedTouches[0].clientX - touchStartX.current;

        if (diff > 50) prevSlide(); 
        else if (diff < -50) nextSlide();

        touchStartX.current = null;
    };

    return (
        <>
            <motion.section
                className="relative w-full h-64 md:h-[65vh] overflow-hidden"
                initial={{ opacity: 0 , scale: 0.7}}
                animate={{ opacity: 1, scale: 1}}
                transition={{ type:'tween', duration: 0.5 }}
                ref={sliderRef}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        className={`absolute w-full h-full transition-opacity duration-1000 ${current === idx ? 'opacity-100' : 'opacity-0'}`
                        }
                        alt={`Slide ${idx + 1}`}
                        onClick={() => navigate(`/movie/${current + 1}`, { replace: true })}
                    />
                ))}

                <button
                    className='absolute h-full bg-gray-600/15 w-16 hover:bg-transparent hover:scale-125 transition-all md:flex justify-center items-center hidden'
                    onClick={prevSlide}
                >
                    <MdKeyboardArrowLeft size={35} className='opacity-50' />
                </button>
                <button
                    className='absolute h-full right-0 bg-gray-600/15 w-16 hover:bg-transparent hover:scale-125 transition-all md:flex justify-center items-center hidden'
                    onClick={nextSlide}
                >
                    <MdKeyboardArrowRight size={35} className='opacity-50' />
                </button>
            </motion.section>
        </>
    )
}
