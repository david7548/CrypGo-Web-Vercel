import React from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaVideo, FaTrophy, FaGift } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { IoTrophyOutline } from "react-icons/io5";
import { IoCashOutline } from "react-icons/io5";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Course Discovery",
      icon: <IoBookOutline className="text-2xl text-indigo-500 group-hover:text-blue-600" />,
      description: "Complete engaging and interactive courses."
    },
    {
      id: 2,
      title: "Course Taking Process",
      icon: <HiOutlineVideoCamera className="text-2xl text-indigo-500 group-hover:text-blue-600" />,
      description: "Start at beginner level courses and continue till master."
    },
    {
      id: 3,
      title: "XP Earning Mechanism",
      icon: <IoTrophyOutline className="text-2xl text-indigo-500 group-hover:text-blue-600" />,
      description: "Earn XP for completing courses, Pro members get 1.5x boost."
    },
    {
      id: 4,
      title: "Prize Redemption",
      icon: <IoCashOutline className="text-2xl text-indigo-500 group-hover:text-blue-600" />,
      description: "Earn cryptocurrency by climbing to the top of the leaderboard."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="bg-white mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-gray-50">
      <div className="text-center mb-10 mt-10">
        <h2 className="text-4xl font-bold text-black mb-2">How It Works</h2>
        <p className="text-gray-600">Your learning journey made simple and rewarding</p>
      </div>

      <motion.div
        className="grid gap-8 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {steps.map((step) => (
          <motion.div
            key={step.id}
            className="group relative p-2 transition-all duration-300 cursor-pointer"
            variants={cardVariants}
          >
          <div className="bg-white rounded-xl shadow-md mb-16 p-7 w-full max-w-lg hover:shadow-xl hover:outline hover:outline-blue-500 hover:translate-y-[-4px] transition-transform duration-300">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-md">
                {step.icon}
              </div>
              <div>
                <h3 className="text-md font-semibold text-gray-900">
                  {step.title}
                </h3>
              </div>
            </div>
            <p className="mt-4 mb-4 text-gray-600 leading-relaxed">
              {step.description}
            </p>
          </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HowItWorks;
