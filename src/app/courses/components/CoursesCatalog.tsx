"use client";
import React, { useState, useEffect } from "react";
import { FiClock, FiBook, FiLock, FiStar } from "react-icons/fi";
import { auth, db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

// Define the Course type
interface Course {
  id: string;
  title: string;
  duration: string;
  difficulty: string;
  isProOnly: boolean;
  xpRequired: number; // ✅ XP required to unlock
  image: string;
  category: string;
  description: string;
}

// Define the props for CourseCard
interface CourseCardProps {
  course: Course;
  userXP: number;
  isProUser: boolean;
}

const CoursesCatalog = () => {
  const [userXP, setUserXP] = useState(0);
  const [isProUser, setIsProUser] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const courses: Course[] = [
    {
      id: "crypto_basics",
      title: "Crypto 101: The Basics of Digital Currency",
      duration: "20 mins",
      difficulty: "Beginner",
      isProOnly: false,
      xpRequired: 0, // Free course
      image: "/img/coursesnode.jpeg",
      category: "100",
      description: "Understand the fundamentals of cryptocurrency, how it works, and why it's different from traditional currency."
    },
    {
      id: "blockchain_explained",
      title: "Blockchain Explained: The Technology Behind Crypto",
      duration: "15 mins",
      difficulty: "Beginner",
      isProOnly: false,
      xpRequired: 100, // requires 100xp making first course a must
      image: "/img/coinnode.jpeg",
      category: "150",
      description: "Learn how blockchain works, why it's secure, and how it powers cryptocurrencies like Bitcoin and Ethereum."
    },
    {
      id: "trading-101",
      title: "Trading 101: Crypto Trading & Technical Analysis",
      duration: "30 mins",
      difficulty: "Beginner",
      isProOnly: false,
      xpRequired: 500, // Requires 1000 XP
      image: "/img/students.jpeg",
      category: "150",
      description: "Learn the basics of crypto trading, from understanding candlestick charts to spotting trends and managing risk."
    },
    {
      id: "asset-security",
      title: "Asset Security: Buying & Storing Crypto Safely",
      duration: "30 mins",
      difficulty: "Beginner",
      isProOnly: false,
      xpRequired: 500, // Free course
      image: "/img/coursebackrnd23.jpg",
      category: "200",
      description: "Discover how to buy cryptocurrency, choose the right exchanges, and safely store your assets using wallets."
    },
    {
      id: "DeFi",
      title: "Smart Contracts & DeFi: The Future of Finance",
      duration: "30 mins",
      difficulty: "Beginner",
      isProOnly: false,
      xpRequired: 1000, // Free course
      image: "/img/future.jpg",
      category: "200",
      description: "Explore the power of smart contracts, how they automate transactions, and the rise of decentralized finance (DeFi)."
    },
    {
      id: "NFTs",
      title: "NFTs & The Metaverse: Digital Ownership Explained",
      duration: "1.5 hrs",
      difficulty: "Beginner",
      isProOnly: false,
      xpRequired: 2000, // Requires 500 XP
      image: "/img/metaverse.jpg",
      category: "250",
      description: "Understand how NFTs work, their impact on digital ownership, and how they integrate into the growing Metaverse."
    },
    {
      id: "web3-jobs",
      title: "Breaking Into Web3: How to Land a Job in Crypto",
      duration: "1.5 hrs",
      difficulty: "Advanced",
      isProOnly: true, // Pro-only course
      xpRequired: 5000, // Requires 5000 XP
      image: "/img/job.jpg",
      category: "500",
      description: "Turn your interest in crypto into a career. This course covers real-world roles in Web3 and how to get them."
    },
    {
      id: "trading-201",
      title: "Trading 201: Advanced Trading Strategies & Risk Management",
      duration: "2 hrs", 
      difficulty: "Advanced",
      isProOnly: true, // Pro-only course
      xpRequired: 2000, // Requires 2000 XP
      image: "/img/tradingcourse2.jpg",
      category: "1000",
      description: "Deep dive into advanced trading techniques, including leverage, options, and managing risk like a pro trader."
    },
  ];

  // Fetch user's XP & Pro status
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUserXP(userData.xp || 0);
          setIsProUser(userData.isPro || false); // ✅ Fetch Pro status
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const categories = ["all", ...new Set(courses.map((course) => course.category))];

  const filteredAndSortedCourses = React.useMemo(() => {
    let filtered = courses;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    switch (sortBy) {
      case "free":
        return filtered.filter((course) => !course.isProOnly && course.xpRequired <= userXP); // ✅ Show free & unlocked courses
      case "pro":
        return filtered.filter((course) => course.isProOnly); // ✅ Show Pro courses
      case "xp":
        return filtered.filter((course) => course.xpRequired > 0); // ✅ Show XP-locked courses
      default:
        return filtered;
    }
  }, [sortBy, selectedCategory, userXP]);

  const CourseCard: React.FC<CourseCardProps> = ({ course, userXP, isProUser }) => {
    const isLocked = course.isProOnly ? !isProUser : userXP < course.xpRequired;

    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col relative group">
        {/* Course Image */}
        <div className="relative overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-48 object-cover rounded-t-lg transform transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          {/* Show Lock Icon if Course is Locked */}
          {isLocked && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <FiLock className="text-white text-3xl" />
            </div>
          )}
        </div>

        {/* Course Details */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-md font-bold mb-2 text-gray-800">{course.title}</h3>
          <p className="text-gray-600 mb-2 text-sm flex-1">{course.description}</p>
          <div className="text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="bg-blue-100 rounded-md p-1 mr-2">
                  <FiClock className="text-indigo-500 h-4 w-4" />
                </span>
                {course.duration}
              </span>
              <span className="flex items-center gap-1 ml-2">
                <span className="bg-blue-100 rounded-md p-1 mr-2">
                  <FiStar className="text-indigo-500 h-4 w-4" />
                </span>
                {course.category} XP
              </span>
            </div>
          </div>

          {/* Enroll Button (Disabled for Locked Courses) */}
          <div className="flex justify-between items-center mt-auto">
            <a
              href={isLocked ? "#" : `/courses/${course.id}`}
              className={`w-full flex justify-center items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                isLocked
                  ? "bg-gray-400 text-center text-sm text-gray-800 cursor-not-allowed"
                  : "bg-indigo-500 text-center text-sm text-white hover:bg-blue-700"
              }`}
            >
              {isLocked ? (
                <span className="text-white text-sm flex items-center">{course.isProOnly ? <><FiLock className="text-white mr-1" /> Pro Only</> : <><FiLock className="text-white mr-1" /> {course.xpRequired} XP Required</>}</span>
              ) : "Enroll Now"}
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedCourses.map((course) => (
            <CourseCard key={course.id} course={course} userXP={userXP} isProUser={isProUser} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesCatalog;

