"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "@/firebase";

export default function CompletionPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  const [userId, setUserId] = useState<string | null>(null);
  const [bonusXpEarned, setBonusXpEarned] = useState(false);

  // ✅ Get user ID
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  // ✅ Handle XP Bonus for Watching Ad
  const handleWatchAd = async () => {
    if (!userId || bonusXpEarned) return;

    // ✅ Simulate an ad being watched (replace this with real ad logic)
    alert("Ad watched successfully! You earned 100 extra XP!");

    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const updatedXp = (userData?.xp || 0) + 100;

        await updateDoc(userRef, { xp: updatedXp });
        setBonusXpEarned(true);
      }
    } catch (error) {
      console.error("Error adding XP:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-black p-6" style={{ backgroundImage: "url('/img/Frame1.png')" }}> 
      <h1 className="text-4xl font-bold mb-4">🎉 Congratulations! 🎉</h1>
      <p className="text-lg text-center max-w-xl">
        You've successfully completed the course! Great work! 🚀
      </p>

      {/* ✅ Offer Extra XP */}
      {!bonusXpEarned ? (
        <button
          disabled
          className="mt-6 px-6 py-2 bg-gray-300 text-gray-500 font-semibold rounded-lg shadow-md cursor-not-allowed opacity-75"
        >
          🎥 Watch an Ad & Earn 100 XP! (Coming Soon)
        </button>
      ) : (
        <p className="mt-6 text-lg">✅ You earned 100 bonus XP!</p>
      )}

      {/* ✅ Button to Exit */}
      <button
        className="mt-6 px-6 py-2 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
        onClick={() => router.push("/courses")}
      >
        Return to Courses
      </button>
    </div>
  );
}
