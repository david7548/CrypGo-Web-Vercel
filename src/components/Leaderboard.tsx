"use client";
import React, { useState, useEffect } from "react";
import { FaCrown, FaMedal, FaInfoCircle } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";

// Define user type
interface User {
  id: string;
  displayName: string;
  profilePic: string; // ✅ Now using profilePic from Firestore
  xp: number;
}

// Function to get XP-based rank
const getRank = (xp: number) => {
  if (xp < 400) return "Beginner";
  if (xp < 500) return "Intermediate";
  if (xp < 1000) return "Advanced";
  if (xp < 20000) return "Master";
  if (xp < 35000) return "Professional";
  return "Elite";
};

const LeaderboardComponent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showProMessage, setShowProMessage] = useState(false);
  const router = useRouter();

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          displayName: doc.data().displayName || "Anonymous",
          profilePic: doc.data().profilePic || "/img/default-avatar.png", // ✅ Fetch profilePic from Firestore
          xp: doc.data().xp || 0,
        }));

        // Sort users by XP (Descending)
        usersList.sort((a, b) => b.xp - a.xp);
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle user click
  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 border border-opacity-30 rounded-xl shadow-lg bg-white">
      {/* 🔹 Leaderboard Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Leaderboard</h1>

        {/* 🔹 "How It Works?" Text */}
        <div 
          className="flex items-center text-blue-500 cursor-pointer hover:underline"
          onClick={() => setIsModalOpen(true)}
        >
          <FaInfoCircle className="mr-2" /> How it works
        </div>
      </div>

      {/* 🔹 Scrollable Leaderboard List */}
      <div className="max-h-[510px] overflow-y-auto space-y-4 pr-2">
        {users.map((user, index) => (
          <div
            key={user.id}
            className={`p-2 mt-1 rounded-lg hover:transform hover:translate-y-[-4px] transition-transform duration-300 flex justify-between items-center bg-gray-50 shadow-md transition-all ${
              index === 0 ? "border-2 border-indigo-400 bg-indigo-50" : ""
            }`}
            onClick={() => handleUserClick(user)} // Add click handler
          >
            <div className="flex items-center space-x-4">
              {/* Rank Number */}
              <span className="text-lg font-bold text-gray-700 w-6 text-center">#{index + 1}</span>

              {/* Rank Icon for Top 3 */}
              {index === 0 && <FaCrown className="text-yellow-400 text-2xl" />}
              {index === 1 && <FaMedal className="text-gray-400 text-2xl" />}
              {index === 2 && <FaMedal className="text-brown-400 text-2xl" />}

              {/* Profile Picture ✅ Now using `profilePic` */}
              <img
                src={user.profilePic}
                alt={user.displayName}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
              />
              <div>
                <h3 className="text-md font-semibold text-gray-800">{user.displayName}</h3>
                <p className="text-sm text-gray-500">{getRank(user.xp)}</p>
              </div>
            </div>

            {/* XP Count (Green Arrow Removed) */}
            <p className="text-gray-700 font-bold">{user.xp.toLocaleString()} XP</p>
          </div>
        ))}
      </div>

      {/* 🔹 "How It Works?" Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <p className="text-gray-700 text-sm mb-4">
              The CrypGo leaderboard ranks users based on their experience(XP).
            </p>
            <p className="text-gray-700 text-sm mb-4">
            Earn XP by completing courses, trading and watching ads.
            </p>
            <p className="text-gray-700 text-sm mb-4">
            Top 3 people on the leaderboard win a prize at the end of every month!
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition w-full"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

     {/* 🔹 User Profile Modal */}
{selectedUser && (
  <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
    <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-[350px] sm:w-[400px]">
    
      {/* Close Button */}
      <button
        onClick={() => setSelectedUser(null)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Profile Pic with Gradient Border */}
      <div className="flex justify-center mb-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-[3px] rounded-full">
          <img
            src={selectedUser.profilePic}
            alt={selectedUser.displayName}
            className="w-20 h-20 rounded-full object-cover"
            onError={(e) => {
            }}
          />
        </div>
      </div>

      {/* Display Name */}
      <h2 className="text-2xl font-semibold text-gray-800 text-center">{selectedUser.displayName}</h2>

      {/* XP Progress Bar */}
      <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${
            selectedUser.xp >= 7000
              ? "bg-green-500"
              : selectedUser.xp >= 4000
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
          style={{ width: `${(selectedUser.xp / 10000) * 100}%` }}
        ></div>
      </div>

      {/* XP and Level */}
      <p className="text-center text-sm text-gray-600 mt-2">
      </p>


      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mt-6">
        <button 
          onClick={() => setShowProMessage(true)}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition w-full font-medium"
        >
          💬 Send Message
        </button>
        <button 
          onClick={() => setShowProMessage(true)}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition w-full font-medium"
        >
          🤝 Add Friend
        </button>
      </div>
    </div>
  </div>
)}

      {/* Pro Feature Message Modal */}
      {showProMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[350px]">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Coming Soon!</h3>
            <p className="text-gray-700 mb-4">
              This feature will be available to pro members soon. Stay tuned for updates!
            </p>
            <button
              onClick={() => setShowProMessage(false)}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardComponent;






