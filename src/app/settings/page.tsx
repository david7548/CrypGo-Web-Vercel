"use client";

import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase"; // Adjust the path to your Firebase config
import Account from "../settings/components/account";

const SettingsPage = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth); // Logs out the user
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Error logging out: ");
    }
  };

  return (
    <div className="flex h-[88vh]">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-6 border-r border-gray-300 border-opacity-30 flex flex-col justify-between">
        <ul className="space-y-4 text-gray-700">
          {/* ✅ Only Profile & Account is clickable */}
          <li className=" ml-5 font-bold flex items-center">
            <FaUserAlt className="mr-2" /> Profile & Account
          </li>

          {/* ❌ Disable other sections (grayed out and non-clickable) */}
          <li className="text-gray-400 cursor-not-allowed flex ml-4 items-center">
            <MdPayment className="h-6 w-6 mr-2" /> Subscriptions & Billing
          </li>
          <li className="text-gray-400 cursor-not-allowed flex ml-4 items-center">
          <IoNotifications className="mr-2 h-6 w-6" /> Notification Preferences
          </li>
          <li className="text-gray-400 cursor-not-allowed flex ml-4 items-center">
          <AiFillSafetyCertificate className="mr-2 h-6 w-6" /> Privacy & Security
          </li>
        </ul>

        {/* Log Out Button */}
        <button
          onClick={handleLogout}
          className="mt-4 p-3 mb-15 p-1 rounded-xl text-sm bg-indigo-500 border-4 border-indigo-100 text-white rounded hover:bg-indigo-700"
        >
          Log Out
        </button>
      </aside>

      {/* Main Content */}
      <div className="w-3/4 p-8" style={{ backgroundImage: "url('/img/Frame1.png')" }}>
        <Account />
      </div>
    </div>
  );
};

export default SettingsPage;

