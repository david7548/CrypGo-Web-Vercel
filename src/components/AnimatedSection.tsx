import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  initial?: any; // Initial animation state
  animate?: any; // Animation state when visible
  transition?: any; // Transition settings
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  initial = { opacity: 0, y: 50 }, // Default initial state
  animate = { opacity: 1, y: 0 }, // Default animate state
  transition = { duration: 0.5 }, // Default transition settings
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref}>
      <motion.div
        initial={initial} // Use passed initial state
        animate={isVisible ? animate : initial} // Animate when visible
        transition={transition} // Use passed transition settings
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AnimatedSection;
