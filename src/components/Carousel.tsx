"use client"; // Ensure this is a client component

import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import arrow icons
import SignUpButton from "./SignUpButton";

interface Slide {
  image: string;
  title: string;
  text: string;
  subtitle: string;
  cta: string;
}

const Carousel = ({ slides }: { slides: Slide[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false); // State for animation

  useEffect(() => {
    setAnimate(true); // Trigger animation on mount
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-screen h-[90vh] overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out"
           style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="w-screen h-full flex-shrink-0 relative">
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className={`absolute top-20 left-20 z-10 px-6 mt-12 ${animate ? 'animate-glide-in' : ''} max-w-lg`}>
              <h5 className="text-lg text-primary text-white uppercase mb-3">
                {slide.subtitle}</h5>
              <h1 className="text-6xl font-bold leading-tight mb-4 text-white">
                {slide.title}
              </h1>
              <p className="text-lg mb-6 text-white">
                {slide.text}
              </p>
              <SignUpButton text={slide.cta} /> 
            </div>
          </div>
        ))}
      </div>
      {/* Arrow buttons positioned on the left side */}
      <div className="absolute right-12 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
        <button onClick={handlePrev} className="bg-teal-500 text-white p-2 rounded-full hover:bg-blue-700 transition">
          <FaChevronLeft size={24} />
        </button>
        <button onClick={handleNext} className="bg-teal-500 text-white p-2 rounded-full hover:bg-blue-700 transition">
          <FaChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
