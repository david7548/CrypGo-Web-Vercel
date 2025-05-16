import React, { useState } from "react";
import { FaTrophy, FaMedal, FaStar, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

const mockUserData = {
  currentLevel: 15,
  totalXP: 2750,
  nextLevelXP: 3000,
  achievements: [
    { id: 1, title: "First Step", description: "Complete your first task", icon: FaTrophy, unlocked: true, category: "Recent" },
    { id: 2, title: "Rising Star", description: "Reach level 10", icon: FaStar, unlocked: true, category: "All-Time" },
    { id: 3, title: "Champion", description: "Win 5 competitions", icon: FaMedal, unlocked: false, category: "Special" },
    { id: 4, title: "Expert", description: "Master all skills", icon: FaTrophy, unlocked: false, category: "Special" },
  ],
};

const XPDashboard = () => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const progressPercentage = (mockUserData.totalXP / mockUserData.nextLevelXP) * 100;

  const getLevelColor = (level) => {
    if (level >= 20) return "text-yellow-500";
    if (level >= 10) return "text-gray-400";
    return "text-amber-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Level Section */}
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center">
              <div className={`w-32 h-32 rounded-full border-8 ${getLevelColor(mockUserData.currentLevel)} flex items-center justify-center`}>
                <span className="text-4xl font-bold">{mockUserData.currentLevel}</span>
              </div>
              <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold">
                Level
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{mockUserData.totalXP} XP</span>
              <span>{mockUserData.nextLevelXP} XP</span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-blue-500 rounded-full"
              />
            </div>
            <div className="text-center text-sm text-gray-600">
              {Math.round(progressPercentage)}% to next level
            </div>
          </div>

          {/* Achievements Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Achievements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockUserData.achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg ${achievement.unlocked ? "bg-white" : "bg-gray-100"} 
                    border-2 ${achievement.unlocked ? "border-blue-500" : "border-gray-300"} 
                    cursor-pointer relative group`}
                  onClick={() => setSelectedAchievement(achievement)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`text-2xl ${achievement.unlocked ? "text-blue-500" : "text-gray-400"}`}>
                      {achievement.unlocked ? React.createElement(achievement.icon) : <FaLock />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                      <p className="text-sm text-gray-500">{achievement.description}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 
                    transition-opacity duration-200 flex items-center justify-center">
                    <span className="text-white text-sm">Click for details</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievement Modal */}
          {selectedAchievement && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
                 onClick={() => setSelectedAchievement(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-xl p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{selectedAchievement.title}</h3>
                  <button
                    onClick={() => setSelectedAchievement(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                <p className="text-gray-600 mb-4">{selectedAchievement.description}</p>
                <div className={`text-4xl ${selectedAchievement.unlocked ? "text-blue-500" : "text-gray-400"} text-center`}>
                  {selectedAchievement.icon ? React.createElement(selectedAchievement.icon) : <FaLock />}
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default XPDashboard;
