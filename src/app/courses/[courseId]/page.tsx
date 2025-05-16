"use client";

import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, auth } from "@/firebase";
import { useParams, useRouter } from "next/navigation";
import CourseOverview from "@/app/courses/components/CourseOverview";
import { ClipLoader } from "react-spinners";

interface Course {
  title: string;
  description: string;
  xp: number;
  time: string;
  difficulty: string;
  modules: Record<
    string,
    {
      title: string;
      xp: number;
      lessons: Record<
        string,
        {
          title: string;
          content: string;
          video_url?: string;
        }
      >;
    }
  >;
}

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [buttonText, setButtonText] = useState<string>("Start Course");
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // Fetch user ID if logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null); // Guest user
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch course data from Firestore
  useEffect(() => {
    if (!courseId) {
      setError("Error: Missing courseId");
      return;
    }

    const fetchCourse = async () => {
      try {
        const docRef = doc(db, "courses", courseId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCourse(docSnap.data() as Course);
        } else {
          setError("Course not found");
        }
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Error fetching course");
      }
    };

    fetchCourse();
  }, [courseId]);

  // Fetch user progress from Firestore and calculate progress
  useEffect(() => {
    const fetchUserProgress = async () => {
      if (!userId || !course) return;

      try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const userProgress = userData.progress?.[courseId] || {};

          const totalLessons = Object.values(course.modules).reduce(
            (total, module) => total + Object.keys(module.lessons).length,
            0
          );
          const completedLessons = Object.keys(userProgress).filter(
            (key) => userProgress[key] === true
          ).length;

          const calculatedProgress = Math.round((completedLessons / totalLessons) * 100);
          setProgressPercentage(calculatedProgress);

          // Determine button text based on progress
          if (calculatedProgress === 100) {
            setButtonText("Review Course");
          } else if (calculatedProgress > 0) {
            setButtonText("Continue Course");
          } else {
            setButtonText("Start Course");
          }
        }
      } catch (err) {
        console.error("Error fetching user progress:", err);
      }
    };

    fetchUserProgress();
  }, [userId, course]);

  // Handle button action
  const handleContinue = async () => {
    if (!course) return;
  
    if (!userId) {
      setRedirecting(true); // Start countdown if user is not logged in
      return;
    }
  
    try {
      // ✅ Get the first module (Module 1)
      const firstModuleId = Object.keys(course.modules).sort()[0];
  
      if (!firstModuleId) {
        console.error("No modules found in course.");
        return;
      }
  
      // ✅ Get the first lesson from Module 1
      const firstLessonId = Object.keys(course.modules[firstModuleId].lessons).sort()[0];
  
      if (!firstLessonId) {
        console.error("No lessons found in first module.");
        return;
      }
  
      // ✅ Navigate to Module 1, Lesson 1
      router.push(`/courses/${courseId}/${firstModuleId}/${firstLessonId}`);
    } catch (error) {
      console.error("Error navigating to first lesson:", error);
    }
  };  

  // Countdown before redirecting to signup page
  useEffect(() => {
    if (redirecting && countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (countdown === 0) {
      router.push("/signup"); // Redirect after countdown reaches 0
    }
  }, [redirecting, countdown, router]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: 'url(/img/Frame1.png)', backgroundSize: 'cover' }}>
        <div className="flex flex-col items-center">
          <ClipLoader color="#6366f1" size={50} />
          <p className="text-lg font-semibold text-white mt-4">Loading course...</p>
          <p className="text-sm text-white">Please wait while we load the course details.</p>
        </div>
      </div>
    );
  }

  // Show countdown UI if user is being redirected
  if (redirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: 'url(/img/Frame1.png)', backgroundSize: 'cover' }}>
        <div className="flex flex-col items-center justify-center">
          <ClipLoader color="#6366f1" size={50} />
          <p className="text-md mt-4">You must sign up to start or continue this course.</p>
          <p className="text-sm mt-2">Redirecting to sign-up in {countdown} seconds...</p>

          {/* Button to Sign Up Immediately */}
          <button
            className="mt-4 px-6 py-2 bg-white text-indigo-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
            onClick={() => router.push("/signup")}
          >
            Sign Up Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: 'url(/img/Frame1.png)', backgroundSize: 'cover' }}>
      <CourseOverview
        title={course.title}
        description={course.description}
        xpReward={course.xp}
        estimatedTime={course.time}
        difficulty={course.difficulty}
        progressPercentage={progressPercentage} // Pass progress bar value
        buttonText={buttonText} // Pass dynamic button text
        onContinue={handleContinue}
      />
    </div>
  );
}







  
  
