"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Carousel from "../components/Carousel";
import { FaBook } from "react-icons/fa";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import Pricing from "../components/Pricing";
import { FiClock, FiBook, FiDollarSign } from "react-icons/fi";
import HowItWorks from "@/components/HowItWorks";
import PopularCourses from "@/components/PopularCourses"
import AnimatedSection from '../components/AnimatedSection';
import Categories from '../components/Categories';
import Landing from '@/components/Landing'
import LevelUp from "@/components/LevelUp";

export default function Home() {

  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-glide');
          observer.unobserve(entry.target); // Stop observing after animation
        }
      });
    }, options);

    boxRefs.current.forEach((box) => {
      if (box) {
        observer.observe(box);
      }
    });

    return () => {
      boxRefs.current.forEach((box) => {
        if (box) {
          observer.unobserve(box);
        }
      });
    };
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen m-0 p-0">
      {/* <Carousel slides={slides} /> */}

      <div className="w-full">
        <Landing />
      </div>

      <div>
        < HowItWorks ></HowItWorks>
      </div>

      
      <AnimatedSection
        initial={{ opacity: 0, x: 70 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >


      <div>
        <Categories></Categories>
      </div>


      </AnimatedSection>
      

      <AnimatedSection
        initial={{ opacity: 0, x: -150 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >

      <div className="w-full">
        <PopularCourses />
      </div>

      </AnimatedSection>


      <AnimatedSection
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >

      {/* Free vs. Premium Section */}
      <div >
        < Pricing ></Pricing>
      </div>


      </AnimatedSection>

      {/* <TestimonialsCarousel /> */}

      {/* <LevelUp/> */}
    </main>
  );
}
