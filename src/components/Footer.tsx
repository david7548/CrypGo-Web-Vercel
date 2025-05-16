// src/components/Footer.tsx
import Link from "next/link";
import { FaTwitter, FaTelegram, FaDiscord } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-indigo-500 text-white py-4">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm">
        
        {/* Social Icons */}
        <div className="flex gap-4 mb-4 md:mb-0">
          <a href="https://x.com/crypgo_app" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition">
            <FaTwitter size={20} />
          </a>
          <a href="https://t.me/crypgo_app" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition">
            <FaTelegram size={20} />
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition">
            <FaDiscord size={20} />
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex ml-20 gap-6 text-white text-sm">
          <Link href="/" className="hover:underline">
            Terms of Service
          </Link>
          <Link href="/" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/" className="hover:underline">
            Support
          </Link>
          <Link href="/" className="hover:underline">
            Blog
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-white mt-4 md:mt-0 text-sm">
          © {new Date().getFullYear()} CrypGo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}