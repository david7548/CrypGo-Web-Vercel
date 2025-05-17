// src/components/Footer.tsx
import Link from "next/link";
import { FaTwitter, FaTelegram, FaDiscord } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-indigo-500 text-white py-6 md:py-4">
      <div className="container mx-auto px-4 md:px-6">
        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center space-y-6">
          {/* Social Icons */}
          <div className="flex gap-6">
            <a href="https://x.com/crypgo_app" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition">
              <FaTwitter size={24} />
            </a>
            <a href="https://t.me/crypgo_app" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition">
              <FaTelegram size={24} />
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition">
              <FaDiscord size={24} />
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center space-y-3">
            <Link href="/" className="hover:underline text-base">
              Terms of Service
            </Link>
            <Link href="/" className="hover:underline text-base">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:underline text-base">
              Support
            </Link>
            <Link href="/" className="hover:underline text-base">
              Blog
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-white text-sm text-center">
            © {new Date().getFullYear()} CrypGo. All rights reserved.
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between text-sm">
          {/* Social Icons */}
          <div className="flex gap-4">
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
          <div className="flex gap-6 ml-20 text-white">
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
          <p className="text-white">
            © {new Date().getFullYear()} CrypGo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}