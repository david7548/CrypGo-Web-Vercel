"use client"
import React, { useState, useEffect } from "react";
import { FaTrophy, FaChartLine, FaUserGraduate } from "react-icons/fa";

const CourseProgressHero = () => {
  const [progress, setProgress] = useState(0);
  const [completedCourses, setCompletedCourses] = useState(0);

  // Mock data
  const totalCourses = 30;
  const userRank = 125;
  const totalUsers = 1000;
  const targetCourses = 12;

  useEffect(() => {
    // Animate progress
    const timer = setTimeout(() => {
      setProgress(40);
      setCompletedCourses(12);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getMotivationalMessage = (progress: number) => {
    if (progress >= 75) return "Exceptional progress! You're a star learner!";
    if (progress >= 50) return "You're doing great! Keep up the momentum!";
    if (progress >= 25) return "Good progress! You're on the right track!";
    return "Every step counts! Let's start this learning journey!";
  };

  const getTrophyColor = (progress: number) => {
    if (progress >= 75) return "text-yellow-400";
    if (progress >= 50) return "text-blue-500";
    if (progress >= 25) return "text-purple-500";
    return "text-gray-400";
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 py-4 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-4">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            {/* Progress Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <FaTrophy
                    className={`w-5 h-5 ${getTrophyColor(progress)} animate-bounce`}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h1 className="text-sm font-bold text-gray-900">Your Learning Journey</h1>
                  <p className="text-gray-500 text-xs mt-1">{getMotivationalMessage(progress)}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Course Progress
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {progress}%
                  </span>
                </div>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center">
                    <FaUserGraduate className="w-3 h-3 text-blue-500" />
                    <span className="ml-2 text-sm text-gray-500">Completed</span>
                  </div>
                  <p className="mt-1 text-md font-bold text-gray-900">{completedCourses}</p>
                  <p className="text-sm text-gray-500">of {totalCourses} courses</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center">
                    <FaChartLine className="w-3 h-3 text-purple-500" />
                    <span className="ml-2 text-sm text-gray-500">Your Rank</span>
                  </div>
                  <p className="mt-1 text-md font-bold text-gray-900">#{userRank}</p>
                  <p className="text-sm text-gray-500">of {totalUsers} learners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgressHero;