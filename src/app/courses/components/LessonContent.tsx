"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { GrFormNextLink } from "react-icons/gr";
import { GrFormPreviousLink } from "react-icons/gr";
import { db } from "@/firebase";
import { FaBook, FaCheckCircle, FaClock, FaTrophy } from "react-icons/fa";

interface LessonContentProps {
  title: string;
  content?: string;
  videoUrl?: string;
  imageUrl?: string;
  extraContent?: string;
  quiz?: {
    question: string;
    options: string[];
    answer: string;
  };
  onNextLesson: () => void;
  onPreviousLesson: () => void;
  isLastLesson: boolean;
  isFirstLesson: boolean;
  courseId: string;
  userId: string;
  modules: Record<
    string,
    {
      lessons: {
        id: string;
      }[];
    }
  >;
  onFinishCourse: () => void;
}

const LessonContent: React.FC<LessonContentProps> = ({
  title,
  content,
  videoUrl,
  imageUrl,
  extraContent,
  quiz,
  onNextLesson,
  onPreviousLesson,
  isLastLesson,
  isFirstLesson,
  courseId,
  userId,
  modules,
  onFinishCourse,
}) => {
  const router = useRouter();
  const [totalLessons, setTotalLessons] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState("");
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    // ✅ Count total lessons
    const countLessons = Object.values(modules).reduce(
      (total, module) => total + module.lessons.length,
      0
    );
    setTotalLessons(countLessons);

    if (!userId) return; // ✅ Ensure userId is defined before fetching data

    // ✅ Fetch completed lessons from Firestore
    const fetchUserProgress = async () => {
      try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const userProgress = userData?.progress?.[courseId] || {};

          const completedCount = Object.keys(userProgress).filter(
            (lessonKey) => userProgress[lessonKey]
          ).length;

          setCompletedLessons(completedCount);
        }
      } catch (error) {
        console.error("Error fetching user progress:", error);
      }
    };

    fetchUserProgress();

    // ✅ Fetch course estimated time and difficulty
    const fetchCourseDetails = async () => {
      try {
        const courseRef = doc(db, "courses", courseId);
        const courseSnap = await getDoc(courseRef);

        if (courseSnap.exists()) {
          const courseData = courseSnap.data();
          setEstimatedTime(courseData.time || "Unknown");
          setDifficulty(courseData.difficulty || "Unknown");
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [courseId, userId, modules]);


  

  // 🔹 Find Previous Lesson (Including Previous Module)
  const moduleKeys = Object.keys(modules).sort(); // Ensure modules are sorted
  const currentModuleIndex = moduleKeys.findIndex((modId) =>
    modules[modId].lessons.some((lesson) => lesson.id === title)
  );

  let previousLessonId: string | null = null;
  let previousModuleId: string | null = null;

  if (currentModuleIndex !== -1) {
    const currentModule = modules[moduleKeys[currentModuleIndex]];
    const lessonIndex = currentModule.lessons.findIndex((l) => l.id === title);

    if (lessonIndex > 0) {
      // ✅ If not first lesson in module, go to previous lesson in same module
      previousLessonId = currentModule.lessons[lessonIndex - 1].id;
      previousModuleId = moduleKeys[currentModuleIndex];
    } else if (currentModuleIndex > 0) {
      // ✅ If first lesson in module, go to last lesson of the previous module
      previousModuleId = moduleKeys[currentModuleIndex - 1];
      previousLessonId = modules[previousModuleId].lessons.at(-1)?.id || null;
    }
  }

  // 🔹 Handle Previous Lesson Click
  const handlePreviousLesson = () => {
    if (!previousLessonId || !previousModuleId) return;
    router.push(`/courses/${courseId}/${previousModuleId}/${previousLessonId}`);
  };


  return (
    <div className="max-w-6xl mx-auto overflow-hidden" 
      style={{ height: "90vh", display: "flex", flexDirection: "column" }}
    >

      {/* Summary Blocks */}
      <div className="grid grid-cols-4 gap-6 p-6">
        {/* Total Lessons */}
        <div className="bg-white border border-indigo-500 shadow rounded-lg p-4 flex items-center gap-4">
          <FaBook className="text-blue-500 w-6 h-6" />
          <div>
            <p className="text-xl font-bold text-indigo-500">{totalLessons}</p>
            <p className="text-sm text-gray-600">Total Lessons</p>
          </div>
        </div>

        {/* Completed Lessons */}
        <div className="bg-white border border-indigo-500 shadow rounded-lg p-4 flex items-center gap-4">
          <FaCheckCircle className="text-indigo-500 w-6 h-6" />
          <div>
          <p className="text-xl font-bold text-indigo-500">{completedLessons}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
        </div>

        {/* Estimated Time */}
        <div className="bg-white border border-indigo-500 shadow rounded-lg p-4 flex items-center gap-4">
          <FaClock className="text-indigo-500 w-6 h-6" />
          <div>
          <p className="text-xl font-bold text-indigo-500">{estimatedTime} mins</p>
            <p className="text-sm text-gray-600">Estimated Time</p>
          </div>
        </div>

        {/* Difficulty */}
        <div className="bg-white border border-indigo-500 shadow rounded-lg p-4 flex items-center gap-4">
          <FaTrophy className="text-indigo-500 w-6 h-6" />
          <div>
          <p className="text-xl font-bold text-indigo-500">{difficulty}</p>
            <p className="text-sm text-gray-600">Difficulty</p>
          </div>
        </div>
      </div>

      {/* 🔹 Scrollable Content Wrapper */}
      <div className="overflow-y-auto border rounded-t-xl">


      {/* <div className="flex items-center justify-between w-full pb-2 mb-6"> title here if we want it back
       {/* <h2 className="text-gray-900 text-2xl font-semibold">{title.replace(/\\n/g, "\n")}</h2>
      {/* </div> /*}


      {/* 🔹 Content Section (with Light Grey Background) */}
      <div className="bg-white p-3 text-gray-800 leading-relaxed text-lg whitespace-pre-line ">
        {content?.replace(/\\n/g, "\n")}
      </div>

      {/* 🔹 Video Section */}
      {videoUrl && (
        <div className="flex bg-white justify-center">
          <div className="w-full md:w-3/4 lg:w-2/3 aspect-video rounded-lg overflow-hidden shadow-lg">
            <video className="w-full h-full" controls>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}


      {/* 🔹 Image Section */}
      {imageUrl && (
        <div className="bg-white flex justify-center">
          <img
            src={imageUrl}
            alt="Lesson Image"
            className="rounded-lg shadow-md w-full object-cover"
          />
        </div>
      )}

      {/* 🔹 Extra Content */}
      {extraContent && (
        <div className="bg-white p-6 text-gray-800 leading-relaxed text-lg whitespace-pre-line ">
          {extraContent.replace(/\\n/g, "\n")}
        </div>
      )}
        {/* 🔹 Quiz Section */}
        {quiz && (
          <div className="mb-12 p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">{quiz.question}</h2>
            <ul className="mt-2">
              {quiz.options.map((option, index) => (
                <li key={index} className="mt-1">
                  <label className="inline-flex items-center">
                    <input type="radio" name="quiz" className="form-radio text-blue-500" />
                    <span className="ml-2">{option}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 🔹 Modernized Navigation Footer */}
      <div className="mb-4 p-4 flex justify-between items-center bg-white shadow-lg rounded-b-xl border border-opacity-10">
        {/* Previous Lesson */}
        {!isFirstLesson ? (
          <button
            onClick={onPreviousLesson}
            className="text-blue-500 text-md hover:underline transition duration-200 flex items-center"
          >
            <GrFormPreviousLink className="w-4 h-4 mr-2 text-white bg-indigo-500 rounded-xl" />
            Previous Lesson
          </button>
        ) : (
          <span className="text-gray-500 text-md flex items-center">
            <GrFormPreviousLink className="w-4 h-4 mr-2 text-white bg-gray-500 rounded-xl" />
            Previous Lesson
          </span>
        )}

        {/* Next Lesson OR Finish Course */}
        {!isLastLesson ? (
          <button
            onClick={onNextLesson}
            className="text-green-500 text-md hover:underline transition duration-200 flex items-center"
          >
            Next Lesson
            <GrFormNextLink className="ml-2 w-4 h-4 text-white bg-green-500 rounded-xl" />
          </button>
        ) : (
          <button
            onClick={onFinishCourse} 
            className="text-green-500 text-md font-semibold hover:underline transition duration-200"
          >
            Finish Course 🎉
          </button>
        )}
      </div>
    </div>
  );
};

export default LessonContent;














