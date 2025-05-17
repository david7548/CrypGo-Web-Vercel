"use client";

import React, { useState } from "react";
import { HiOutlineAcademicCap } from "react-icons/hi2";

interface CourseOverviewProps {
  title: string;
  description: string;
  xpReward: number;
  estimatedTime: string;
  difficulty: string;
  progressPercentage: number; // ✅ Added progressPercentage
  buttonText: string; // ✅ Added buttonText
  onContinue: () => void;
  resources?: { title: string; url: string }[]; // Optional resources
}

const CourseOverview: React.FC<CourseOverviewProps> = ({
  title,
  description,
  xpReward,
  estimatedTime,
  difficulty,
  progressPercentage,
  buttonText,
  onContinue,
  resources = [],
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "resources">("overview");

  return (
    <div className="min-h-screen flex flex-col items-center py-6 md:py-12 px-4 md:px-6">
      <div className="max-w-6xl mt-6 md:mt-10 w-full flex flex-col md:flex-row gap-4 md:gap-6 min-h-[500px]">
        {/* Right Content - Now First on Mobile */}
        <div className="w-full md:w-2/3 p-6 md:p-10 border border-gray-200 bg-white rounded-2xl shadow-lg flex flex-col justify-between order-1 md:order-1">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-gray-900">{title}</h1>
  
            {/* Progress Bar */}
            <div className="mb-6 md:mb-10">
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs md:text-sm font-medium text-gray-700">Course Progress</div>
                <div className="text-xs text-gray-500">{progressPercentage}%</div>
              </div>
              <div className="w-full bg-gray-300 h-1.5 md:h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-500 h-1.5 md:h-2 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
  
            {/* Tabs */}
            <div className="flex gap-4 md:gap-6 border-b border-gray-300 mb-4 md:mb-5">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-2 text-xs md:text-sm font-semibold ${activeTab === "overview" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-indigo-500"}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("resources")}
                className={`pb-2 text-xs md:text-sm font-semibold ${activeTab === "resources" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-indigo-500"}`}
              >
                Resources
              </button>
            </div>
  
            {/* Tab Content */}
            <div className="text-xs md:text-sm text-gray-800 w-full md:min-w-[700px]">
              {activeTab === "overview" ? (
                <p className="leading-relaxed">{description}</p>
              ) : (
                <div>
                  {resources.length > 0 ? (
                    <ul className="list-disc pl-4 md:pl-5 space-y-2">
                      {resources.map((resource, index) => (
                        <li key={index}>
                          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                            {resource.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No resources available for this course.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Left Sidebar - Now Second on Mobile */}
        <div className="w-full md:w-1/3 p-6 md:p-10 border border-gray-200 bg-white rounded-2xl shadow-lg flex flex-col justify-between order-2 md:order-2">
          <div>
            <div className="flex items-center border-b gap-2 mb-4 md:mb-6">
              <span className="bg-blue-100 rounded-md p-1.5 md:p-2 mr-2 text-indigo-500 mb-4 md:mb-5">
                <HiOutlineAcademicCap className="h-4 w-4 md:h-5 md:w-5" />
              </span>
              <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-5 ml-2">Course</h2>
            </div>
  
            <div className="text-sm md:text-md text-gray-600 mb-6 mt-6 md:mt-10 space-y-6 md:space-y-12">
              <div>
                Estimated Completion Time:
                <span className="ml-1 text-indigo-600 font-medium">{estimatedTime} Mins</span>
              </div>
              <div>
                XP Rewards:
                <span className="ml-1 text-indigo-600 font-medium">{xpReward} XP</span>
              </div>
              <div>
                Difficulty Level:
                <span className="ml-1 text-indigo-600 font-medium">{difficulty}</span>
              </div>
            </div>
          </div>
  
          <div className="space-y-3 mt-4 md:mt-0">
            <button
              onClick={onContinue}
              className="w-full bg-indigo-500 text-white py-2.5 md:py-3 rounded-lg font-semibold text-sm md:text-md hover:bg-indigo-600 transition"
            >
              {buttonText}
            </button>
  
            <button
              onClick={() => window.location.href = "/pro"}
              className="w-full bg-indigo-100 text-indigo-700 py-2.5 md:py-3 rounded-lg font-semibold text-sm md:text-md hover:bg-indigo-200 transition"
            >
              Get 1.5x XP with Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );  
};

export default CourseOverview;





