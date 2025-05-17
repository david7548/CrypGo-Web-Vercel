"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [profilePic, setProfilePic] = useState("/img/default-avatar.png");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // 🔹 Get current route

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setProfilePic(userData.profilePic || "/img/default-avatar.png");
        }
      } else {
        setProfilePic("/img/default-avatar.png");
      }
    });

    return () => unsubscribe();
  }, []);

  const navLinkClass = (href: string) =>
    `hover:font-bold transition ${
      pathname === href ? "font-bold text-gray-700" : "text-gray-700"
    }`;

  return (
    <nav className="bg-white text-gray-700 py-2 shadow-sm border-b border-gray-100 border-opacity-30 sticky top-0 z-20">
      <div className="w-full px-8 flex items-center">
        <h1 className="text-lg text-white font-medium flex items-center mr-auto">
          <Link href="/" className="flex items-center">
            <img
              src="/img/AppIcon-1024x1024.png"
              alt="Logo"
              className="mr-2 w-8 h-8 rounded-full"
            />
          </Link>
          <Link href="/">
            <span className="text-black">Cryp</span>
            <span className="text-indigo-500">Go</span>
          </Link>
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex text-gray-900 space-x-10 text-xs items-center justify-center flex-grow">
          <Link href="/courses" className={navLinkClass("/courses")}>
            Courses
          </Link>
          <Link href="/trading" className={navLinkClass("/trading")}>
            Trading
          </Link>
          <Link href="/xp-dashboard" className={navLinkClass("/xp-dashboard")}>
            XP Dashboard
          </Link>
          <Link href="/leaderboard" className={navLinkClass("/leaderboard")}>
            Leaderboard
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <Link href="/settings" className="ml-2">
          <img
            src={profilePic}
            alt="User Avatar"
            className="bg-white w-8 h-8 rounded-full cursor-pointer"
          />
        </Link>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-white border-t border-gray-100`}
      >
        <div className="px-4 py-2 space-y-3">
          <Link
            href="/courses"
            className={`block py-2 ${navLinkClass("/courses")}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Courses
          </Link>
          <Link
            href="/trading"
            className={`block py-2 ${navLinkClass("/trading")}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Trading
          </Link>
          <Link
            href="/xp-dashboard"
            className={`block py-2 ${navLinkClass("/xp-dashboard")}`}
            onClick={() => setIsMenuOpen(false)}
          >
            XP Dashboard
          </Link>
          <Link
            href="/leaderboard"
            className={`block py-2 ${navLinkClass("/leaderboard")}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Leaderboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
