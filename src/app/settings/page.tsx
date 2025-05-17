"use client";

import React, { useState } from "react";
import { FaUserAlt, FaBars, FaTimes } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase"; // Adjust the path to your Firebase config
import Account from "../settings/components/account";

const SettingsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Logs out the user
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Error logging out: ");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[88vh] relative">
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-20 right-4 z-50 p-1.5 bg-indigo-500 text-white rounded-lg"
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-0 z-40
        w-full md:w-1/4 bg-white p-4 md:p-6
        border-r border-gray-300 border-opacity-30
        flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <ul className="space-y-4 text-gray-700">
          {/* ✅ Only Profile & Account is clickable */}
          <li className="ml-2 md:ml-5 font-bold flex items-center text-base md:text-lg">
            <FaUserAlt className="mr-2 text-lg md:text-xl" /> Profile & Account
          </li>

          {/* ❌ Disable other sections (grayed out and non-clickable) */}
          <li className="text-gray-400 cursor-not-allowed flex ml-2 md:ml-4 items-center text-sm md:text-base">
            <MdPayment className="h-5 w-5 md:h-6 md:w-6 mr-2" /> Subscriptions & Billing
          </li>
          <li className="text-gray-400 cursor-not-allowed flex ml-2 md:ml-4 items-center text-sm md:text-base">
            <IoNotifications className="mr-2 h-5 w-5 md:h-6 md:w-6" /> Notification Preferences
          </li>
          <li className="text-gray-400 cursor-not-allowed flex ml-2 md:ml-4 items-center text-sm md:text-base">
            <AiFillSafetyCertificate className="mr-2 h-5 w-5 md:h-6 md:w-6" /> Privacy & Security
          </li>
        </ul>

        {/* Log Out Button */}
        <button
          onClick={handleLogout}
          className="mt-4 p-2 md:p-3 mb-4 md:mb-15 rounded-xl text-sm md:text-base bg-indigo-500 border-2 md:border-4 border-indigo-100 text-white hover:bg-indigo-700 transition-colors"
        >
          Log Out
        </button>
      </aside>

      {/* Main Content */}
      <div className="w-full md:w-3/4 p-4 md:p-8 flex-1 overflow-y-auto" style={{ backgroundImage: "url('/img/Frame1.png')" }}>
        <Account />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default SettingsPage;

