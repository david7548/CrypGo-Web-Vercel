"use client"; //ignore 
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { doc, getDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";

const XPDash = () => {
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
  


  return (
    <div className="min-h-screen p-6 bg-cover bg-center" style={{ backgroundImage: "url('/img/Frame1.png')" }}>
      <div className="max-w-6xl mx-auto">
        
        {/* Profile Section with XP Bar & Rank */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
                <img
                src={userData.profilePic || "/img/default-avatar.png"}
                alt="User Avatar"
                className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover"
                />

              <div>
                <h2 className="text-2xl font-bold text-gray-800">{userData.username}</h2>
                <p className="text-gray-500">Rank #{userRank !== null ? userRank : "Loading..."}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{userData.xp} XP</div>
              <div className="text-gray-500">{userData.level}</div>
            </div>
          </div>
          <div className="mt-4">
          <div className="text-sm font-semibold text-gray-600 mb-1 text-left">
          Progress to  {levelNames[levelNames.indexOf(userData.level) + 1] || "Max Level"} Level
        </div>

            <div className="w-full bg-gray-300 h-3 rounded-lg overflow-hidden">
              <motion.div
                style={{ width: ${((userData.xp % 1000) / 1000) * 100}% }}
                className="bg-blue-500 h-3 transition-all duration-500"
              ></motion.div>
            </div>
          </div>
        </div>

        {/* ✅ XP Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <motion.div className="p-4 rounded-xl bg-white shadow text-left">
            <p className="text-sm text-gray-500">Total XP</p>
            <h2 className="text-xl font-bold text-gray-900">{userData.xp}</h2>
          </motion.div>

          <motion.div className="p-4 rounded-xl bg-white shadow text-left">
            <p className="text-sm text-gray-500">Current Level</p>
            <h2 className="text-xl font-bold text-gray-900">{userData.level}</h2>
          </motion.div>

          <motion.div className="p-4 rounded-xl bg-white shadow text-left">
            <p className="text-sm text-gray-500">Day Streak</p>
            <h2 className="text-xl font-bold text-gray-900">{userData.streak}</h2>
          </motion.div>
        </div>

        {/* ✅ Achievements & Daily Challenges Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Daily Challenges */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Daily Challenges</h2>
            <div className="space-y-3">
            {dailyChallenges.map((challenge, index) => (
                <div key={index} className={flex justify-between items-center p-3 rounded-lg border ${challenge.completed ? "border-green-400 bg-green-100" : "border-gray-200 bg-gray-100"}}>
                  <div>
                    <h3 className={font-bold ${challenge.completed ? "text-green-700" : "text-gray-800"}}>{challenge.title}</h3>
                    <p className="text-gray-500 text-sm">{challenge.description}</p>
                  </div>
                  <span className={px-3 py-1 rounded-lg text-sm ${challenge.completed ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"}}>+{challenge.xp} XP</span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Achievements</h2>
            <div className="grid grid-cols-2 gap-4">
              {userAchievements.map((achievement, index) => (
                <div
                  key={index}
                  className={p-4 rounded-lg border ${
                    achievement.unlocked
                      ? "border-purple-200 bg-purple-100"
                      : "border-gray-200 bg-gray-100 opacity-50"
                  }}
                >
                  <h3 className={font-bold ${achievement.unlocked ? "text-purple-700" : "text-gray-500"}}>
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-600">{achievement.unlocked ? "Unlocked" : "Locked"}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default XPDash;