"use client";

import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase"; // Adjust the path to your Firebase config
import { FaCheckCircle } from "react-icons/fa"; // ✅ Import checkmark icon

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
    <div className="w-64 bg-white shadow-md h-[695px] rounded-xl overflow-y-auto p-4">
      {/* Course Title */}
      <h2 className="text-l font-bold mb-4">{courseTitle}</h2>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${courseProgress.toFixed(0)}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1 text-left">
          {courseProgress.toFixed(0)}% Complete
        </p>
      </div>

      {/* Course Modules and Lessons */}
      {Object.entries(sortedModules).map(([moduleId, module]) => (
        <div key={moduleId} className="mb-6">
          <h3 className="text-sm font-semibold mb-4">{module.title}</h3>
          <div className="space-y-2">
            {module.lessons.map((lesson) => {
              const lessonKey = `${moduleId}_${lesson.id}`;
              const isActive = activeLessonId === lesson.id && activeModuleId === moduleId;

              return (
                <div key={lesson.id} className="flex items-center justify-between">
                  {/* ✅ Disabled Direct Navigation (Removed Link) */}
                  <span
                    className={`flex-1 block px-3 py-3 text-sm ${
                      isActive
                        ? "bg-blue-100 bg-opacity-30 text-black border-l-4 border-indigo-500"
                        : "text-gray-800"
                    } flex items-center`}
                  >
                    {/* ✅ Checkmark Icon */}
                    {completedLessons[lessonKey] && (
                      <FaCheckCircle className="text-green-500 w-4 h-4 mr-2 flex-shrink-0" />
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
  );
};

export default LessonSidebar;


















