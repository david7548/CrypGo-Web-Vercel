"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaBook, FaClock, FaTrophy, FaChevronLeft, FaChevronRight, FaPlay, FaDownload, FaCheckCircle } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";
import { CourseModule } from '@/app/courses/types'; // Assuming you have a types file for your types

export default function CourseDashboard() {
  const params = useParams();
  const router = useRouter();
  const [currentModule, setCurrentModule] = useState(0);

  const courseData = {
    title: "Advanced Web Development Mastery",
    description: "Master modern web development techniques and best practices",
    totalModules: 12,
    completedModules: 4,
    difficulty: "Intermediate",
    estimatedTime: "24 hours",
    modules: [
      {
        id: 1,
        title: "Introduction to Modern Web Development",
        type: "video" as const,
        completed: true,
        duration: "45 mins",
        content: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        progress: 100
      },
      {
        id: 2,
        title: "Frontend Frameworks Deep Dive",
        type: "text" as const,
        completed: true,
        duration: "60 mins",
        content: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
        progress: 100
      },
      {
        id: 3,
        title: "Building Scalable Applications",
        type: "quiz" as const,
        completed: true,
        duration: "30 mins",
        content: "https://images.unsplash.com/photo-1581472723648-909f4851d4ae",
        progress: 100
      },
      {
        id: 4,
        title: "Performance Optimization",
        type: "video" as const,
        completed: true,
        duration: "55 mins",
        content: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
        progress: 80
      },
      {
        id: 5,
        title: "Advanced State Management",
        type: "text" as const,
        completed: false,
        duration: "65 mins",
        content: "https://images.unsplash.com/photo-1504639725590-34d0984388bd",
        progress: 0
      }
    ]
  };

  const overallProgress = (courseData.completedModules / courseData.totalModules) * 100;

  const handleModuleChange = (index: number) => {
    setCurrentModule(index);
  };

  const ContentViewer = ({ module }: { module: CourseModule }) => {
    switch(module.type) {
      case "video":
        return (
          <div className="relative h-96 bg-gray-800 rounded-lg overflow-hidden">
            <img 
              src={module.content}
              alt={module.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="p-4 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                <FaPlay className="text-white text-xl" />
              </button>
            </div>
          </div>
        );
      case "text":
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">{module.title}</h3>
            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button className="mt-4 flex items-center text-blue-600 hover:text-blue-700">
              <FaDownload className="mr-2" /> Download Resources
            </button>
          </div>
        );
      case "quiz":
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Module Quiz</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <p className="flex items-center">
                  <BsQuestionCircle className="mr-2" /> Question 1: What is the main principle of responsive design?
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <p className="flex items-center">
                  <BsQuestionCircle className="mr-2" /> Question 2: Explain the concept of progressive enhancement.
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleEnroll = () => {
    // Logic for enrolling in the course (e.g., API call)
    
    // After successful enrollment, navigate to the course page
    router.push(`/courses/${params.courseId}`); // Replace courseId with the actual course ID
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-80 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">{courseData.title}</h2>
          <div className="mb-6">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-blue-600 rounded-full" 
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-600">{Math.round(overallProgress)}% Complete</p>
          </div>
          <div className="space-y-4">
            {courseData.modules.map((module, index) => (
              <div 
                key={module.id}
                className={`p-4 rounded-lg cursor-pointer transition-all ${currentModule === index ? "bg-blue-50 border-blue-500 border" : "hover:bg-gray-50"}`}
                onClick={() => handleModuleChange(index)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{module.title}</h3>
                  {module.completed && <FaCheckCircle className="text-green-500" />}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <FaClock className="mr-2" /> {module.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 p-8">
        <div className="mb-8">
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <FaBook className="text-blue-600 text-xl mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Total Modules</p>
                  <p className="text-xl font-bold">{courseData.totalModules}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <FaCheckCircle className="text-green-500 text-xl mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="text-xl font-bold">{courseData.completedModules}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <FaClock className="text-orange-500 text-xl mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Estimated Time</p>
                  <p className="text-xl font-bold">{courseData.estimatedTime}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <FaTrophy className="text-yellow-500 text-xl mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Difficulty</p>
                  <p className="text-xl font-bold">{courseData.difficulty}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <ContentViewer module={courseData.modules[currentModule]} />
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t flex justify-between items-center">
            <button 
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
              disabled={currentModule === 0}
              onClick={() => handleModuleChange(currentModule - 1)}
            >
              <FaChevronLeft className="mr-2" /> Previous Module
            </button>
            <button 
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
              disabled={currentModule === courseData.modules.length - 1}
              onClick={() => handleModuleChange(currentModule + 1)}
            >
              Next Module <FaChevronRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
