import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FaBook } from 'react-icons/fa';
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const categories = [
  {
    title: "Crypto Basics & Foundation",
    description: "Learn crypto fundamentals, blockchain basics, and essential trading concepts.",
    image: "/img/coinnode.jpeg",
    href: "/courses",
  },
  {
    title: "Trading and Investment",
    description: "Master trading strategies, investment tactics, and market analysis skills.",
    image: "/img/coursesnode.jpeg",
    href: "/courses",
  },
  {
    title: "DeFi and web3",
    description: "Learn DeFi, Web3, smart contracts, blockchain, and decentralized applications.",
    image: "/img/students.jpeg",
    href: "/courses",
  },
  {
    title: "Security & Best Practices",
    description: "Master crypto security fundamentals and risk management techniques.",
    image: "/img/metaverse.jpg",
    href: "/courses",
  },
];

export default function Categories() {
  const scrollRef = useRef(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const element = scrollRef.current as HTMLDivElement;
      const { scrollLeft, clientWidth } = element;
      const scrollAmount = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      element.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto mt-6 md:mt-10 mb-6 md:mb-10 py-6 md:py-10 px-4 md:px-6">
      <div className="flex flex-col lg:flex-row justify-between items-start mb-4 md:mb-6">
        <div className="mb-4 lg:mb-0">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center lg:text-left">Our Course Categories</h2>
          <p className="text-gray-500 max-w-3xl text-center lg:text-left text-sm md:text-base">
          Dive into curated learning tracks covering the fundamentals of crypto to the future of blockchain.
          </p>
        </div>
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 md:p-3 rounded-full bg-gray-200 hover:text-white hover:bg-indigo-500 transition-colors"
            aria-label="Scroll left"
          >
            <FaChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 md:p-3 rounded-full bg-gray-200 hover:text-white hover:bg-indigo-500 transition-colors"
            aria-label="Scroll right"
          >
            <FaChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>

      <div className="md:hidden space-y-4">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="w-full rounded-xl bg-white shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <Link href={cat.href}>
              <div className="cursor-pointer">
                <div className="relative w-full h-48">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{cat.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{cat.description}</p>
                  <div className="flex items-center justify-between text-indigo-500 text-sm font-medium">
                    <span className="flex items-center gap-1">
                      <span className="bg-blue-100 rounded-md p-1 mr-2 text-indigo-500">
                        <HiOutlineAcademicCap className="h-5 w-5" />
                      </span>
                      2 courses
                    </span>
                    <span>Learn More →</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div
        ref={scrollRef}
        className="hidden md:flex overflow-x-auto space-x-6 pb-4 scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="min-w-[280px] max-w-[320px] rounded-xl bg-white shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex-shrink-0"
          >
            <Link href={cat.href}>
              <div className="cursor-pointer">
                <div className="relative w-full h-48">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-1">{cat.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{cat.description}</p>
                  <div className="flex items-center justify-between text-indigo-500 text-sm font-medium">
                    <span className="flex items-center gap-1">
                      <span className="bg-blue-100 rounded-md p-1 mr-2 text-indigo-500">
                        <HiOutlineAcademicCap className="h-5 w-5" />
                      </span>
                      2 courses
                    </span>
                    <span>Learn More →</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
