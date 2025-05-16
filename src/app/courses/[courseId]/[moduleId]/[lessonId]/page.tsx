"use client";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, auth } from "@/firebase";
import { useParams, useRouter } from "next/navigation";
import LessonSidebar from "@/app/courses/components/LessonSidebar";
import LessonContent from "@/app/courses/components/LessonContent";
import { ClipLoader } from "react-spinners";

interface Lesson {
  title: string;
  content: string;
  videoUrl?: string;
  imageUrl?: string;
  extraContent?: string;
  quiz?: string;
}

interface Module {
  title: string;
  index: number;
  xp: number;
  lessons: {
    id: string;
    title: string;
    completed: boolean;
    index: number;
  }[];
}

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();

  const courseId = params.courseId as string;
  const moduleId = params.moduleId as string;
  const lessonId = params.lessonId as string;

  const [courseTitle, setCourseTitle] = useState<string>("Loading...");
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [modules, setModules] = useState<Record<string, Module>>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Get Current User ID
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        router.push("/signup"); // Redirect if not logged in
      }
    });

    return () => unsubscribe();
  }, [router]);

  // 🔹 Fetch Course Data
  useEffect(() => {
    if (!courseId || !moduleId || !lessonId) {
      setError("Missing course, module, or lesson ID");
      return;
    }

    const fetchCourseData = async () => {
      try {
        const docRef = doc(db, "courses", courseId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const courseData = docSnap.data();

          setCourseTitle(courseData.title || "Untitled Course");

          if (!courseData.modules || !courseData.modules[moduleId]) {
            throw new Error("Module not found");
          }

          const formattedModules: Record<string, Module> = Object.entries(
            courseData.modules as Record<string, any>
          ).reduce<Record<string, Module>>((acc, [modId, module]) => {
            acc[modId] = {
              title: module.title,
              index: module.index,
              xp: module.xp || 0,
              lessons: Object.entries(module.lessons)
                .map(([id, lesson]) => ({
                  id,
                  ...(lesson as { title: string; completed: boolean; index: number }),
                }))
                .sort((a, b) => a.index - b.index), // ✅ Ensure lessons are sorted properly
            };
            return acc;
          }, {});

          setModules(formattedModules);

          const lessonData = formattedModules[moduleId]?.lessons.find(
            (lesson) => lesson.id === lessonId
          );

          if (!lessonData) {
            throw new Error("Lesson not found");
          }

          const fullLessonData: Lesson = {
            title: lessonData.title,
            content: courseData.modules[moduleId].lessons[lessonId].content || "",
            videoUrl: courseData.modules[moduleId].lessons[lessonId].videoUrl || undefined,
            imageUrl: courseData.modules[moduleId].lessons[lessonId].imageUrl || undefined,
            extraContent: courseData.modules[moduleId].lessons[lessonId].extraContent || undefined,
            quiz: courseData.modules[moduleId].lessons[lessonId].quiz || undefined,
          };

          setLesson(fullLessonData);
        } else {
          throw new Error("Course not found");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
        setError("Error fetching course data");
      }
    };

    fetchCourseData();
  }, [courseId, moduleId, lessonId]);

  // 🔹 Determine Lesson Navigation Logic
  const currentModule = modules[moduleId];
  const lessons = currentModule?.lessons || [];
  const currentIndex = lessons.findIndex((lesson) => lesson.id === lessonId);
  const isFirstLesson = currentIndex === 0;

  // 🔹 Find Next Lesson (Including Next Module)
  let nextLessonId: string | null = null;
  let nextModuleId: string | null = null;
  let isLastLesson = false;

  if (currentIndex !== -1 && currentIndex < lessons.length - 1) {
    // ✅ Next lesson exists in the current module
    nextLessonId = lessons[currentIndex + 1].id;
    nextModuleId = moduleId;
  } else {
    // ✅ No more lessons in the current module, move to the next module
    const moduleEntries = Object.entries(modules).sort((a, b) => a[1].index - b[1].index);
    const currentModuleIndex = moduleEntries.findIndex(([id]) => id === moduleId);

    if (currentModuleIndex !== -1 && currentModuleIndex < moduleEntries.length - 1) {
      const [nextModId, nextModule] = moduleEntries[currentModuleIndex + 1];
      if (nextModule.lessons.length > 0) {
        nextLessonId = nextModule.lessons[0].id;
        nextModuleId = nextModId;
      }
    }
  }

  if (!nextLessonId) {
    isLastLesson = true;
  }

// 🔹 Handle Next Lesson Click
const handleNextLesson = async () => {
  if (!userId || !courseId || !moduleId || !lessonId) return;

  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      const userProgress = userData?.progress || {};

      const lessonKey = `${moduleId}_${lessonId}`;

      // ✅ Check if lesson has already been completed
      if (!userProgress[courseId]?.[lessonKey]) {
        // ✅ Mark current lesson as completed
        userProgress[courseId] = { ...(userProgress[courseId] || {}), [lessonKey]: true };

        // ✅ Add XP only if lesson was NOT previously completed
        const updatedXp = (userData?.xp || 0) + (modules[moduleId]?.xp || 0);

        await updateDoc(userRef, {
          progress: userProgress,
          xp: updatedXp,
        });

        console.log(`XP added for lesson ${lessonKey}. New XP: ${updatedXp}`);
      }

      // ✅ Ensure modules are sorted properly
      const sortedModules = Object.entries(modules)
        .sort(([, a], [, b]) => a.index - b.index)
        .map(([id]) => id);

      const currentModuleIndex = sortedModules.indexOf(moduleId);

      if (currentModuleIndex === -1) {
        console.error("Module not found in sorted list");
        return;
      }

      // ✅ Get the sorted lessons inside the current module
      const sortedLessons = modules[moduleId].lessons.sort((a, b) => a.index - b.index);
      const currentLessonIndex = sortedLessons.findIndex((lesson) => lesson.id === lessonId);

      // ✅ Check if this is the LAST lesson in the LAST module
      const isLastModule = currentModuleIndex === sortedModules.length - 1;
      const isLastLesson = currentLessonIndex === sortedLessons.length - 1;

      if (isLastModule && isLastLesson) {
        // 🚀 Redirect to Course Completion Page
        console.log("🎉 Course Completed! Redirecting...");
        router.push(`/courses/${courseId}/completion`);
        return;
      }

      // ✅ Otherwise, navigate to the next lesson or next module
      let nextModuleId = moduleId;
      let nextLessonId = null;

      if (currentLessonIndex < sortedLessons.length - 1) {
        // ✅ Move to the next lesson in the same module
        nextLessonId = sortedLessons[currentLessonIndex + 1].id;
      } else if (currentModuleIndex < sortedModules.length - 1) {
        // ✅ Move to the first lesson in the next module
        nextModuleId = sortedModules[currentModuleIndex + 1];
        nextLessonId = modules[nextModuleId].lessons.sort((a, b) => a.index - b.index)[0].id;
      }

      if (nextModuleId && nextLessonId) {
        router.push(`/courses/${courseId}/${nextModuleId}/${nextLessonId}`);
      }
    }
  } catch (error) {
    console.error("Error updating progress:", error);
  }
};


  // 🔹 Handle Course Completion Click
const handleFinishCourse = async () => {
  if (!userId || !courseId || !moduleId || !lessonId) return;

  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      const userProgress = userData?.progress || {};

      const lessonKey = `${moduleId}_${lessonId}`;

      // ✅ Check if last lesson is already marked as completed
      if (!userProgress[courseId]?.[lessonKey]) {
        // ✅ Mark last lesson as completed
        userProgress[courseId] = { ...(userProgress[courseId] || {}), [lessonKey]: true };

        // ✅ Add XP only if lesson was NOT previously completed
        const updatedXp = (userData?.xp || 0) + (modules[moduleId]?.xp || 0);

        await updateDoc(userRef, {
          progress: userProgress,
          xp: updatedXp,
        });

        console.log(`🎉 Last lesson ${lessonKey} marked as completed. XP updated: ${updatedXp}`);
      }

      // 🚀 Redirect to Course Completion Page
      router.push(`/courses/${courseId}/completion`);
    }
  } catch (error) {
    console.error("❌ Error updating last lesson completion:", error);
  }
};


  // 🔹 Handle Previous Lesson Click
  const handlePreviousLesson = () => {
    if (!courseId || !moduleId || !lessonId || currentIndex <= 0) return;
    router.push(`/courses/${courseId}/${moduleId}/${lessons[currentIndex - 1].id}`);
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="flex" style={{ backgroundImage: "url('/img/frame1.png')" }}>
      <LessonSidebar
        courseId={courseId}
        courseTitle={courseTitle}
        modules={modules}
        userId={userId as string}
        activeModuleId={moduleId}
        activeLessonId={lessonId}
      />

      <div className="flex-1">
        <LessonContent
          title={lesson?.title || ""}
          content={lesson?.content || ""}
          videoUrl={lesson?.videoUrl}
          imageUrl={lesson?.imageUrl}
          extraContent={lesson?.extraContent}
          onNextLesson={handleNextLesson}
          onPreviousLesson={handlePreviousLesson}
          isFirstLesson={isFirstLesson}
          isLastLesson={isLastLesson}
          courseId={courseId}
          userId={userId as string} // ✅ Ensure userId is passed correctly
          modules={modules} // ✅ Ensure modules are passed correctly
          onFinishCourse={handleFinishCourse}
        />
      </div>
    </div>
  );
}
















