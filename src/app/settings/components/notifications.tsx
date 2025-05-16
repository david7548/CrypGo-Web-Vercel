"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";

const Notifications = () => {
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const [pushNotifications, setPushNotifications] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserSettings = async () => {
      const user = auth.currentUser;
      if (user) {
        setUserId(user.uid);
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setEmailNotifications(userData?.emailNotifications ?? true);
          setPushNotifications(userData?.pushNotifications ?? true);
        }
      }
    };

    fetchUserSettings();
  }, []);

  const handleToggle = async (type: "emailNotifications" | "pushNotifications") => {
    if (!userId) return;

    const newValue = type === "emailNotifications" ? !emailNotifications : !pushNotifications;

    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { [type]: newValue });

      if (type === "emailNotifications") {
        setEmailNotifications(newValue);
      } else {
        setPushNotifications(newValue);
      }
    } catch (error) {
      console.error("Error updating notification settings:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6">Notification Settings</h1>

      {/* Email Notifications */}
      <div className="flex items-center justify-between mb-6 w-full">
        <div>
          <h2 className="text-lg font-semibold">Email Notifications</h2>
          <p className="text-gray-600 text-sm">Receive important updates via email.</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={emailNotifications}
            onChange={() => handleToggle("emailNotifications")}
          />
          <div className={`w-12 h-6 rounded-full transition-all duration-300 ${emailNotifications ? "bg-blue-500" : "bg-gray-300"}`}>
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${emailNotifications ? "translate-x-6" : "translate-x-1"}`}
            ></div>
          </div>
        </label>
      </div>

      {/* Push Notifications */}
      <div className="flex items-center justify-between w-full">
        <div>
          <h2 className="text-lg font-semibold">Push Notifications</h2>
          <p className="text-gray-600 text-sm">Get alerts directly on your device.</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={pushNotifications}
            onChange={() => handleToggle("pushNotifications")}
          />
          <div className={`w-12 h-6 rounded-full transition-all duration-300 ${pushNotifications ? "bg-blue-500" : "bg-gray-300"}`}>
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${pushNotifications ? "translate-x-6" : "translate-x-1"}`}
            ></div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Notifications;



