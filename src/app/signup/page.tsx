"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase"; // ✅ Ensure correct Firebase imports

const AuthPage = () => {
  const [username, setUsername] = useState(""); // ✅ Added username field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between sign-up and sign-in
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (isSignUp) {
        // ✅ Handle sign-up and set displayName
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: username }); // ✅ Store username as displayName

        // ✅ Add user to Firestore with initial progress tracking
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
          displayName: username,
          email: user.email,
          profilePic: "", // Can be updated later
          progress: {}, // Empty progress object to track course completion
          xp: 0, // Initial XP
        });

        setSuccess("Signup successful!");
        router.push("/courses"); // Redirect after successful sign-up
      } else {
        // ✅ Handle sign-in
        await signInWithEmailAndPassword(auth, email, password);
        setSuccess("Login successful!");
        router.push("/courses"); // Redirect after successful sign-in
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen" style={{ backgroundImage: "url('/img/Frame5.png')" }}>
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleAuth}
      >
        <h2 className="text-2xl font-bold mb-4">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        {isSignUp && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>

        {/* Toggle between Sign-Up and Sign-In */}
        <p className="text-sm text-gray-700 mt-4 text-center">
          {isSignUp
            ? "Already have an account?"
            : "Don't have an account yet?"}{" "}
          <button
            type="button"
            className="text-indigo-500 underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthPage;


