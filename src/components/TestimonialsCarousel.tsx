import { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    quote: "This product has completely transformed our workflow. The efficiency gains are remarkable, and the support team has been exceptional throughout our journey.",
    name: "Sarah Johnson",
    designation: "Chief Technology Officer",
    company: "TechVision Inc.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  },
  {
    id: 2,
    quote: "I cannot recommend this service enough. It's intuitive, powerful, and has helped us scale our operations seamlessly. The ROI has been outstanding.",
    name: "Michael Chen",
    designation: "Operations Director",
    company: "Global Solutions Ltd.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
  },
  {
    id: 3,
    quote: "The attention to detail and customer service is unmatched. This solution has exceeded our expectations in every way possible.",
    name: "Emma Williams",
    designation: "Marketing Manager",
    company: "Innovation Hub",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
  }
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isAutoPlaying) {
      intervalId = setInterval(nextSlide, 4000);
    }
    return () => clearInterval(intervalId);
  }, [isAutoPlaying, nextSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  };

  return (
    <div
      className="relative max-w-6xl mx-auto px-4 py-16"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Testimonials carousel"
    >
      <div className="overflow-hidden relative rounded-xl bg-white shadow-lg">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="w-full flex-shrink-0 p-8 md:p-12"
            >
              <div className="max-w-3xl mx-auto">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover shadow-md mb-6"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d";
                    }}
                  />
                  <blockquote className="text-gray-800 text-lg md:text-xl italic mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600">
                      {testimonial.designation} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Previous testimonial"
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Next testimonial"
        >
          <FaChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentIndex ? "bg-blue-600 w-4" : "bg-gray-300 hover:bg-gray-400"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
