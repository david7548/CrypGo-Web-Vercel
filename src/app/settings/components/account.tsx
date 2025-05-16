"use client";

import React, { useEffect, useState } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth, db, storage } from "@/firebase"; // Ensure correct Firebase imports
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FaPencilAlt } from "react-icons/fa";

const Account = () => {
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [xp, setXp] = useState(0);
  const [profilePic, setProfilePic] = useState("");
  const [editingUsername, setEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUsername(user.displayName || "Guest");
        setUserEmail(user.email || "Not available");

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setXp(userData?.xp || 0);
          setProfilePic(userData.profilePic || user.photoURL || "/img/default-avatar.png"); // Fetch from Firestore first
        }
      } else {
        setUsername("Guest");
        setUserEmail("Not available");
        setProfilePic("/img/default-avatar.png");
        setXp(0);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUsernameChange = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, { displayName: newUsername });

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { displayName: newUsername });

        setUsername(newUsername);
        setEditingUsername(false);
      }
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  const handleProfilePicChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to update your profile picture.");
      return;
    }
  
    const storageRef = ref(storage, `profilePictures/${user.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Error uploading file:", error);
        alert(`Upload failed: ${error.message}`);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", downloadURL);
  
          await updateProfile(user, { photoURL: downloadURL });
  
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, { profilePic: downloadURL }); // ✅ Update correct field in Firestore
  
          setProfilePic(downloadURL);
        } catch (error) {
          console.error("Error getting download URL:", error);
          alert("Failed to retrieve profile picture URL.");
        }
      }
    );
  };
  
  

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-7xl mx-auto">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative w-20 h-20">
          <img
            src={profilePic || "/default-avatar.png"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover bg-gray-200"
          />
          <label
            htmlFor="profilePicUpload"
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer"
          >
            <FaPencilAlt className="h-3 w-3 text-white" />
          </label>
          <input
            id="profilePicUpload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleProfilePicChange}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{username}</h1>
          <p className="text-gray-600">XP: {xp}</p>
        </div>
      </div>

      {/* XP Progress */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-600">XP Progress</p>
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-500 h-full"
            style={{ width: `${Math.min((xp / 1000) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Profile Fields */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border rounded-lg px-4 py-2">
          <div>
            <p className="text-sm font-medium text-gray-600">Username</p>
            {editingUsername ? (
              <input
                type="text"
                className="w-full mt-1 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg p-2 focus:outline-none"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            ) : (
              <input
                type="text"
                className="w-full mt-1 text-gray-800 bg-transparent border-none focus:outline-none"
                value={username}
                disabled
              />
            )}
          </div>
          {editingUsername ? (
            <button
              className="p-2 text-white bg-blue-500 rounded-full"
              onClick={handleUsernameChange}
            >
              Save
            </button>
          ) : (
            <button
              className="p-2 text-white bg-blue-500 rounded-full"
              onClick={() => setEditingUsername(true)}
            >
              Edit
            </button>
          )}
        </div>

        <div className="flex items-center justify-between border rounded-lg px-4 py-2">
          <div>
            <p className="text-sm font-medium text-gray-600">Email</p>
            <input
              type="text"
              className="w-full mt-1 text-gray-800 bg-transparent border-none focus:outline-none"
              value={userEmail}
              disabled
            />
          </div>
        </div>

        <div className="flex items-center justify-between border rounded-lg px-4 py-2">
          <div>
            <p className="text-sm font-medium text-gray-600">Password</p>
            <input
              type="password"
              className="w-full mt-1 text-gray-800 bg-transparent border-none focus:outline-none"
              value="••••••••"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;







