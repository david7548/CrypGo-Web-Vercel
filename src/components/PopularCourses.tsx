import React from 'react';
import Link from 'next/link';
import { FiClock, FiStar } from "react-icons/fi";
import { GoClock } from "react-icons/go";
import { IoIosStarOutline } from "react-icons/io";

const PopularCourses = () => {
  return (
    <div className="w-full py-16 px-6 bg-white">
      <div className="mb-10 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-black mb-2">Our Most Popular Courses</h2>
        <p className="text-center text-gray-500 text-base">
        These are the crowd favorites. Clear, engaging, and packed with practical knowledge to boost your crypto journey.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-20">
        {[
          {
            image: "/img/coursesnode.jpeg",
            title: "Crypto 101: The Basics of Digital Currency",
            description: "Understand the fundamentals of cryptocurrency, how it works, and why it's different from traditional currency.",
            duration: "30 Mins",
            xp: "150 XP",
            level: "Beginner"
          },
          {
            image: "/img/students.jpeg",
            title: "Trading 101: Crypto Trading & Technical Analysis",
            description: "Learn the basics of crypto trading, from understanding candlestick charts to spotting trends and managing risk.",
            duration: "30 Mins",
            xp: "150 XP",
            level: "Beginner"
          },
          {
            image: "/img/job.jpg",
            title: "Breaking Into Web3: How to Land a Job in Crypto",
            description: "Turn your interest in crypto into a career. This course covers real-world roles in Web3 and how to get them.",
            duration: "30 Mins",
            xp: "150 XP",
            level: "Beginner"
          }
        ].map((course, index) => (
          <div
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col border border-gray-200"
          >
            <Link href="/courses" className="relative block">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-105 border-b"
                loading="lazy"
              />
              <span className="absolute top-3 right-3 bg-indigo-100 text-indigo-600 px-5 py-1 rounded-xl text-xs">
                {course.level}
              </span>
            </Link>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-md font-semibold text-gray-900 mb-1 leading-snug">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 flex-1 leading-relaxed">
                {course.description}
              </p>
              <div className="flex items-center justify-start gap-6 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-2">
                  <span className="bg-blue-100 rounded-xl p-1">
                  <GoClock className="text-indigo-500 text-2xl" />
                  </span>
                  {course.duration}
                </span>
                <span className="flex items-center gap-2">
                  <span className="bg-blue-100 rounded-xl p-1">
                  <IoIosStarOutline className="text-indigo-500 text-2xl" />
                  </span>
                  {course.xp}
                </span>
              </div>
              <Link href="/courses">
                <button className="bg-indigo-500 text-white w-full py-2 rounded-lg font-medium text-sm hover:bg-indigo-600 transition-colors duration-300">
                  Enroll Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCourses;
