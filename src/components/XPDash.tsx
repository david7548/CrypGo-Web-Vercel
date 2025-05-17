"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { doc, getDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";

const XPDash = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({
    username: "Guest",
    xp: 0,
    level: "Beginner",
    streak: 0,
    profilePic: "/img/default-avatar.png",
  });

    // State to store daily challenges and last reset date
  const [dailyChallenges, setDailyChallenges] = useState<{ 
    title: string; 
    description: string; 
    xp: number; 
    completed: boolean;
  }[]>([]);

  const [lastChallengeReset, setLastChallengeReset] = useState<Date | null>(null);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [userAchievements, setUserAchievements] = useState<{ title: string; unlocked: boolean }[]>([]);



  // Predefined daily challenges
  const predefinedChallenges = [
    { title: "Complete 5 Lessons", description: "Finish 5 lessons today", xp: 100 },
    { title: "Earn 100 XP Today", description: "Gain at least 100 XP today", xp: 150 },
    { title: "Start a New Course", description: "Begin a new course today", xp: 200 },
  ];


  // 🎯 List of ALL possible achievements
  const allAchievements = [
    { title: "First 1K XP", condition: (xp: number) => xp >= 100 },
    { title: "Crypto Master", condition: (xp: number) => xp >= 5000 },
    { title: "Trading Expert", condition: (xp: number) => xp >= 30000 },
    { title: "1 Week Streak", condition: (_: number, streak: number) => streak >= 7 },
  ];

// 🔢 XP Leveling System with Named Levels
const calculateLevel = (xp: number): string => {
  if (xp < 1000) return "Beginner";
  if (xp < 5000) return "Intermediate";
  if (xp < 10000) return "Advanced";
  if (xp < 20000) return "Master";
  if (xp < 35000) return "Professional";
  return "Elite"; // Max Level for high XP users
};


  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;
  
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
  
        if (userSnap.exists()) {
          const userData = userSnap.data();
          const xp = userData.xp || 0;
          const level: string = calculateLevel(xp);
          let streak = userData.streak || 0;
          const profilePic = userData.profilePic || "/img/default-avatar.png"; // ✅ Fetch Profile Pic
  
          // ✅ Ensure lastLogin is a Date object
          let lastLogin = userData.lastLogin ? new Date(userData.lastLogin.seconds * 1000) : null;
  
          // ✅ Get the current date (normalized to midnight)
          const today = new Date();
          today.setHours(0, 0, 0, 0);
  
          if (lastLogin) {
            const lastLoginDate = new Date(lastLogin);
            lastLoginDate.setHours(0, 0, 0, 0); // Normalize to midnight
  
            const diffDays = Math.floor((today.getTime() - lastLoginDate.getTime()) / (1000 * 60 * 60 * 24));
  
            if (diffDays === 1) {
              streak += 1; // ✅ Increment streak if they logged in on the next day
            } else if (diffDays > 1) {
              streak = 0; // ❌ Reset streak if they skipped a day
            }
          } else {
            streak = 1; // 🆕 If no last login exists, start a new streak
          }
  
                      // ✅ Fetch daily challenges from Firestore
                      // ✅ Fetch daily challenges from Firestore
            // ✅ Fetch daily challenges from Firestore
            let storedChallenges = userData.dailyChallenges || {};
            let lastReset = userData.lastChallengeReset ? new Date(userData.lastChallengeReset.seconds * 1000) : null;


            // ✅ If last reset was not today, reset challenges
            if (!lastReset || today.getTime() !== lastReset.getTime()) {
              storedChallenges = {
                "Login Streak Day 1": { completed: false, xp: 50 }, // ✅ Challenge: Log in for 1 day in a row
              };

              await updateDoc(userRef, {
                dailyChallenges: storedChallenges,
                lastChallengeReset: today,
              });
            }

            // ✅ Check if user meets the streak challenge requirement
            const updatedChallenges = Object.keys(storedChallenges).reduce<Record<string, { completed: boolean; xp: number }>>(
              (acc, key) => {
                const challenge = storedChallenges[key];

                if (key === "Login Streak Day 1" && streak >= 1 && !challenge.completed) {
                  acc[key] = { ...challenge, completed: true }; // ✅ Mark as completed
                } else {
                  acc[key] = challenge; // Keep the existing value
                }

                return acc;
              },
              {} as Record<string, { completed: boolean; xp: number }> // ✅ Explicitly define type
            );

            // ✅ Update Firestore if the streak challenge was completed
            const completedChallenges = Object.entries(updatedChallenges).filter(([_, data]) => data.completed);

            if (completedChallenges.length > 0) {
              await updateDoc(userRef, {
                dailyChallenges: updatedChallenges, // ✅ Save updates to Firestore
              });
            }

            // ✅ Update state to reflect changes in UI
            setDailyChallenges(Object.entries(updatedChallenges).map(([title, data]) => ({
              title,
              description: "Log in for 1 day in a row", // ✅ Static description
              xp: data.xp,
              completed: data.completed,
            })));


  
          // ✅ Update Firestore with new streak & last login date
          await updateDoc(userRef, {
            streak,
            lastLogin: today, // Save today's date
          });
  
          setUserData({
            username: userData.displayName || "Anonymous",
            xp,
            level,
            streak,
            profilePic,
          });
  
          // ✅ Fetch all users and determine rank
          const usersRef = collection(db, "users");
          const usersSnap = await getDocs(usersRef);
          const sortedUsers = usersSnap.docs
            .map((doc) => ({ id: doc.id, xp: doc.data().xp || 0 }))
            .sort((a, b) => b.xp - a.xp);
  
          const rank = sortedUsers.findIndex((u) => u.id === auth.currentUser?.uid) + 1;
          setUserRank(rank);
  
          // ✅ Get stored achievements
          const unlockedAchievements: string[] = userData.achievements || [];
  
          // ✅ Check which achievements should be unlocked
          const updatedAchievements = allAchievements.map((ach) => ({
            title: ach.title,
            unlocked: unlockedAchievements.includes(ach.title) || ach.condition(xp, streak),
          }));
  
          // ✅ Store newly unlocked achievements
          const newUnlocked = updatedAchievements
            .filter((ach) => ach.unlocked && !unlockedAchievements.includes(ach.title))
            .map((ach) => ach.title);
  
          if (newUnlocked.length > 0) {
            await updateDoc(userRef, { achievements: [...unlockedAchievements, ...newUnlocked] });
          }
  
          setUserAchievements(updatedAchievements);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, []); // ✅ No JSX inside useEffect!
  
    const levelNames = ["Beginner", "Intermediate", "Advanced", "Master", "Professional"];
  


    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setIsAuthenticated(!!user);
      });

      return () => unsubscribe();
    }, []);

    if (!isAuthenticated) {
      return (
        <div className="min-h-screen p-4 md:p-6 bg-cover bg-center relative" style={{ backgroundImage: "url('/img/Frame1.png')" }}>
          <div className="max-w-4xl mx-auto bg-white border py-3 px-4 md:px-6 rounded-2xl shadow-lg">
            {/* Profile Card */}
            <div className="p-4 md:p-6 mb-6 md:mb-10 text-center">
              <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
                <div className="flex items-center">
                  <span className="text-orange-500 text-2xl md:text-3xl">🏆</span>
                  <div className="flex flex-col m-2">
                    <span className="text-lg md:text-xl">#{userRank || "--"}</span>
                    <div className="text-xs md:text-sm text-gray-500">Rank</div>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center md:mr-12">
                  <img
                    src={userData.profilePic || "/img/default-avatar.png"}
                    alt="User Avatar"
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-gray-300 object-cover mb-1"
                  />
                  <h2 className="text-base md:text-lg font-bold mt-2 text-gray-800">{userData.username}</h2>
                </div>
                <div className="text-sm md:text-md text-black">
                  {userData.xp} Xp
                  <div className="text-xs md:text-sm text-gray-500 mt-1">{userData.level}</div>
                </div>
              </div>
    
              {/* XP Bar */}
              <div className="mt-4">
                <div className="text-xs md:text-sm text-gray-600 font-medium mb-1 text-left">Progress to {levelNames[levelNames.indexOf(userData.level) + 1] || "Max Level"} Level</div>
                <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden">
                  <motion.div
                    style={{ width: `${((userData.xp % 1000) / 1000) * 100}%` }}
                    className="bg-blue-500 h-2 transition-all duration-500"
                  ></motion.div>
                </div>
                <div className="text-xs text-right text-gray-500 mt-1">
                  {Math.floor(((userData.xp % 1000) / 1000) * 100)}% Completed
                </div>
              </div>
    
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-2 md:gap-4 mt-4 md:mt-6">
                <div className="bg-gray-50 shadow-md rounded-xl p-3 md:p-4">
                  <p className="text-lg md:text-xl font-bold text-indigo-500">{userData.xp}</p>
                  <p className="text-xs text-gray-500 mt-1">Total Xp</p>
                </div>
                <div className="bg-gray-50 shadow-md rounded-xl p-3 md:p-4">
                  <p className="text-lg md:text-xl font-bold text-indigo-500">{userData.level}</p>
                  <p className="text-xs text-gray-500 mt-1">Current Level</p>
                </div>
                <div className="bg-gray-50 shadow-md rounded-xl p-3 md:p-4">
                  <p className="text-lg md:text-xl font-bold text-indigo-500">{userData.streak.toString().padStart(2, '0')}</p>
                  <p className="text-xs text-gray-500 mt-1">Day Streak</p>
                </div>
              </div>
            </div>
    
            {/* Daily Challenges */}
            <div className="bg-gray-50 shadow-md rounded-xl p-4 md:p-6 mb-6 md:mb-10">
              <h2 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4">Daily Challenges</h2>
              {dailyChallenges.map((challenge, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row justify-between items-start md:items-center p-3 md:p-4 rounded-xl border mb-2 ${
                    challenge.completed ? "border-indigo-500 bg-indigo-100" : "border-indigo-100 bg-purple-50"
                  }`}
                >
                  <div className="mb-2 md:mb-0">
                    <h3 className={`text-sm md:text-base font-semibold ${challenge.completed ? "text-indigo-500" : "text-indigo-700"}`}>
                      {challenge.title}
                    </h3>
                    <p className="text-xs text-gray-700">{challenge.description}</p>
                  </div>
                  <span className="bg-indigo-500 text-white text-xs md:text-sm font-semibold px-3 md:px-4 py-1 rounded-md">
                    +{challenge.xp} XP
                  </span>
                </div>
              ))}
            </div>
    
            {/* Achievements */}
            <div className="bg-gray-50 shadow-md rounded-xl p-4 md:p-6">
              <h2 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4">Achievements</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {userAchievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`rounded-lg px-3 md:px-4 py-4 md:py-6 text-center border ${
                      achievement.unlocked ? "border-indigo-300 bg-indigo-100" : "border-indigo-200 bg-indigo-100 opacity-30"
                    } flex items-center justify-center relative`}>
                    {!achievement.unlocked && (
                      <FaLock className="text-black text-xs absolute top mb-8 md:mb-10 transform -translate-y-1/2 right-2" />
                    )}
                    <h3 className={`text-sm md:text-base font-bold ${achievement.unlocked ? "text-indigo-700" : "text-indigo-500"}`}>
                      {achievement.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl text-center w-full max-w-md">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">Sign In Required</h2>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">Please sign in or create an account to view your XP Dashboard.</p>
              <button
                onClick={() => router.push('/signup')}
                className="w-full md:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Sign Up / Sign In
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen p-4 md:p-6 bg-cover bg-center" style={{ backgroundImage: "url('/img/Frame1.png')" }}>
        <div className="max-w-4xl mx-auto bg-white border py-3 px-4 md:px-6 rounded-2xl shadow-lg">
          {/* Profile Card */}
          <div className="p-4 md:p-6 mb-6 md:mb-10 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
              <div className="flex items-center">
                <span className="text-orange-500 text-2xl md:text-3xl">🏆</span>
                <div className="flex flex-col m-2">
                  <span className="text-lg md:text-xl">#{userRank || "--"}</span>
                  <div className="text-xs md:text-sm text-gray-500">Rank</div>
                </div>
              </div>
              <div className="flex flex-col items-center text-center md:mr-12">
                <img
                  src={userData.profilePic || "/img/default-avatar.png"}
                  alt="User Avatar"
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-gray-300 object-cover mb-1"
                />
                <h2 className="text-base md:text-lg font-bold mt-2 text-gray-800">{userData.username}</h2>
              </div>
              <div className="text-sm md:text-md text-black">
                {userData.xp} Xp
                <div className="text-xs md:text-sm text-gray-500 mt-1">{userData.level}</div>
              </div>
            </div>
    
            {/* XP Bar */}
            <div className="mt-4">
              <div className="text-xs md:text-sm text-gray-600 font-medium mb-1 text-left">Progress to {levelNames[levelNames.indexOf(userData.level) + 1] || "Max Level"} Level</div>
              <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden">
                <motion.div
                  style={{ width: `${((userData.xp % 1000) / 1000) * 100}%` }}
                  className="bg-blue-500 h-2 transition-all duration-500"
                ></motion.div>
              </div>
              <div className="text-xs text-right text-gray-500 mt-1">
                {Math.floor(((userData.xp % 1000) / 1000) * 100)}% Completed
              </div>
            </div>
    
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 mt-4 md:mt-6">
              <div className="bg-gray-50 shadow-md rounded-xl p-3 md:p-4">
                <p className="text-lg md:text-xl font-bold text-indigo-500">{userData.xp}</p>
                <p className="text-xs text-gray-500 mt-1">Total Xp</p>
              </div>
              <div className="bg-gray-50 shadow-md rounded-xl p-3 md:p-4">
                <p className="text-lg md:text-xl font-bold text-indigo-500">{userData.level}</p>
                <p className="text-xs text-gray-500 mt-1">Current Level</p>
              </div>
              <div className="bg-gray-50 shadow-md rounded-xl p-3 md:p-4">
                <p className="text-lg md:text-xl font-bold text-indigo-500">{userData.streak.toString().padStart(2, '0')}</p>
                <p className="text-xs text-gray-500 mt-1">Day Streak</p>
              </div>
            </div>
          </div>
    
          {/* Daily Challenges */}
          <div className="bg-gray-50 shadow-md rounded-xl p-4 md:p-6 mb-6 md:mb-10">
            <h2 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4">Daily Challenges</h2>
            {dailyChallenges.map((challenge, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row justify-between items-start md:items-center p-3 md:p-4 rounded-xl border mb-2 ${
                  challenge.completed ? "border-indigo-500 bg-indigo-100" : "border-indigo-100 bg-purple-50"
                }`}
              >
                <div className="mb-2 md:mb-0">
                  <h3 className={`text-sm md:text-base font-semibold ${challenge.completed ? "text-indigo-500" : "text-indigo-700"}`}>
                    {challenge.title}
                  </h3>
                  <p className="text-xs text-gray-700">{challenge.description}</p>
                </div>
                <span className="bg-indigo-500 text-white text-xs md:text-sm font-semibold px-3 md:px-4 py-1 rounded-md">
                  +{challenge.xp} XP
                </span>
              </div>
            ))}
          </div>
    
          {/* Achievements */}
          <div className="bg-gray-50 shadow-md rounded-xl p-4 md:p-6">
            <h2 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4">Achievements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {userAchievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`rounded-lg px-3 md:px-4 py-4 md:py-6 text-center border ${
                    achievement.unlocked ? "border-indigo-300 bg-indigo-100" : "border-indigo-200 bg-indigo-100 opacity-30"
                  } flex items-center justify-center relative`}>
                  {!achievement.unlocked && (
                    <FaLock className="text-black text-xs absolute top mb-8 md:mb-10 transform -translate-y-1/2 right-2" />
                  )}
                  <h3 className={`text-sm md:text-base font-bold ${achievement.unlocked ? "text-indigo-700" : "text-indigo-500"}`}>
                    {achievement.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }    

export default XPDash;
