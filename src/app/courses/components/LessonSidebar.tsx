"use client";

import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase"; // Adjust the path to your Firebase config
import { FaCheckCircle, FaBars, FaTimes } from "react-icons/fa"; // Added menu icons

interface LessonSidebarProps {
  courseId: string;
  courseTitle: string;
  userId: string | null;
  modules: Record<
    string,
    {
      title: string;
      index: number;
      xp: number;
      lessons: {
        id: string;
        title: string;
        index: number;
      }[];
    }
  >;
  activeLessonId?: string;
  activeModuleId?: string;
}

const LessonSidebar: React.FC<LessonSidebarProps> = ({
  courseId,
  courseTitle,
  userId,
  modules,
  activeLessonId,
  activeModuleId,
}) => {
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});
  const [courseProgress, setCourseProgress] = useState<number>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 🔹 Ensure modules and lessons are sorted by their index
  const sortedModules = Object.entries(modules)
    .sort(([, a], [, b]) => a.index - b.index)
    .reduce<Record<string, typeof modules[string]>>((acc, [moduleId, module]) => {
      acc[moduleId] = {
        ...module,
        lessons: module.lessons.sort((a, b) => a.index - b.index),
      };
      return acc;
    }, {});

  useEffect(() => {
    if (!userId) return; // ✅ Prevent Firestore query if userId is null

    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const userProgress = userData?.progress?.[courseId] || {};
          setCompletedLessons(userProgress);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [courseId, userId]);

  // 🔹 Calculate Course Progress
  useEffect(() => {
    const totalLessons = Object.values(sortedModules).reduce(
      (sum, module) => sum + module.lessons.length,
      0
    );

    const completedCount = Object.keys(completedLessons).filter(
      (key) => completedLessons[key]
    ).length;

    const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
    setCourseProgress(progressPercentage);
  }, [completedLessons, sortedModules]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-20 right-4 z-50 p-1.5 bg-indigo-500 text-white rounded-lg"
        aria-label="Toggle course menu"
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-0 z-40
        w-full md:w-64 bg-white shadow-md
        h-[695px] rounded-xl overflow-y-auto p-4
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Course Title */}
        <h2 className="text-lg md:text-xl font-bold mb-4">{courseTitle}</h2>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2 md:h-3 overflow-hidden">
            <div
              className="h-full bg-indigo-500 transition-all duration-300"
              style={{ width: `${courseProgress.toFixed(0)}%` }}
            ></div>
          </div>
          <p className="text-xs md:text-sm text-gray-600 mt-1 text-left">
            {courseProgress.toFixed(0)}% Complete
          </p>
        </div>

        {/* Course Modules and Lessons */}
        {Object.entries(sortedModules).map(([moduleId, module]) => (
          <div key={moduleId} className="mb-4 md:mb-6">
            <h3 className="text-xs md:text-sm font-semibold mb-3 md:mb-4">{module.title}</h3>
            <div className="space-y-1 md:space-y-2">
              {module.lessons.map((lesson) => {
                const lessonKey = `${moduleId}_${lesson.id}`;
                const isActive = activeLessonId === lesson.id && activeModuleId === moduleId;

                return (
                  <div key={lesson.id} className="flex items-center justify-between">
                    <span
                      className={`flex-1 block px-2 md:px-3 py-2 md:py-3 text-xs md:text-sm ${
                        isActive
                          ? "bg-blue-100 bg-opacity-30 text-black border-l-4 border-indigo-500"
                          : "text-gray-800"
                      } flex items-center`}
                    >
                      {completedLessons[lessonKey] && (
                        <FaCheckCircle className="text-green-500 w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                      )}
                      {lesson.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default LessonSidebar;


















