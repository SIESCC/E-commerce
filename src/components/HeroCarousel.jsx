
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { carouselService } from '../services/api';

const HeroCarousel = () => {
    const [slides, setSlides] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchSlides = async () => {
            const data = await carouselService.getAll();
            setSlides(data);
        };
        fetchSlides();
    }, []);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    useEffect(() => {
        if (slides.length > 0) {
            const slideInterval = setInterval(() => {
                nextSlide();
            }, 5000);
            return () => clearInterval(slideInterval);
        }
    }, [currentIndex, slides]);

    if (slides.length === 0) return null;

    return (
        <div className="max-w-[1400px] mx-auto pt-24 px-4 pb-8">
            <div className="relative h-[500px] w-full bg-gray-900 rounded-2xl overflow-hidden group shadow-2xl">

                {/* Background Image */}
                <div
                    style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
                    className="w-full h-full bg-center bg-cover duration-500 ease-in-out transition-all"
                >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="absolute top-[50%] -translate-y-[50%] left-8 md:left-16 max-w-xl text-left">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase drop-shadow-lg leading-tight">
                        {slides[currentIndex].title}
                    </h2>
                    <p className="text-gray-200 text-lg md:text-xl font-medium mb-8 drop-shadow-md">
                        {slides[currentIndex].description}
                    </p>
                    <button className="bg-white text-black hover:bg-gold-500 hover:text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Shop Collection
                    </button>
                </div>

                {/* Left Arrow */}
                <div className="hidden group-hover:block absolute top-[50%] -translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition-all">
                    <ArrowLeft onClick={prevSlide} size={30} />
                </div>

                {/* Right Arrow */}
                <div className="hidden group-hover:block absolute top-[50%] -translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition-all">
                    <ArrowRight onClick={nextSlide} size={30} />
                </div>

                {/* Dots */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center py-2 space-x-2">
                    {slides.map((slide, slideIndex) => (
                        <div
                            key={slide.id}
                            onClick={() => setCurrentIndex(slideIndex)}
                            className={`text-2xl cursor-pointer duration-300 transition-all rounded-full ${currentIndex === slideIndex
                                    ? 'bg-gold-500 w-8 h-2'
                                    : 'bg-white/50 w-2 h-2 hover:bg-white'
                                }`}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroCarousel;
