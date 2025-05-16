import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const CtaSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleGetStarted = () => {
    console.log("Navigate to sign-up page");
  };

  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 py-16 md:py-24"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px]"/>
      <div 
        className={`container mx-auto px-6 transition-transform duration-500 ${isHovered ? "scale-[1.02]" : "scale-100"}`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-8 md:mb-0 md:max-w-2xl">
            <h2 className="mb-4 text-4xl md:text-5xl font-bold tracking-tight text-white">
              Ready to Level Up?
            </h2>
            <p className="text-lg md:text-xl text-gray-200">
              Take the next step in your journey and unlock your potential. Join thousands of successful individuals who have already transformed their lives.
            </p>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={handleGetStarted}
              aria-label="Get Started Now"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-white px-8 py-4 text-lg font-bold text-purple-700 transition-all duration-300 ease-out hover:bg-purple-50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
            >
              <span className="mr-2">Get Started Now</span>
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000" />
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
    </section>
  );
};

export default CtaSection;