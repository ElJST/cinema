import React, { useState, useEffect } from 'react';

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
    }, []);

    return (
        <section className="relative w-full h-64 md:h-[65vh] overflow-hidden ">
            {images.map((img, idx) => (
                <img
                    key={idx}
                    src={img}
                    className={`absolute w-full h-full transition-opacity duration-1000 ${current === idx ? 'opacity-100' : 'opacity-0'
                        }`}
                    alt={`Slide ${idx + 1}`}
                />
            ))}

        </section>
    )
}
