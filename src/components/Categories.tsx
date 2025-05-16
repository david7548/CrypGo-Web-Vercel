import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FaBook } from 'react-icons/fa';
import { HiOutlineAcademicCap } from "react-icons/hi2";

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
    <div className="container mx-auto mt-10 mb-10 py-10 px-6">
      <div className="flex flex-col lg:flex-row justify-between items-start mb-6">
        <div className="mb-4 lg:mb-0">
          <h2 className="text-3xl font-bold mb-2 text-left">Our Course Categories</h2>
          <p className="text-gray-500 max-w-3xl text-left">
            Let's join our famous class, the knowledge provided will definitely be useful for you.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-3 rounded-full bg-gray-200 hover:text-white hover:bg-indigo-500"
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-3 rounded-full bg-gray-200 hover:text-white hover:bg-indigo-500"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-6 pb-4"
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
                <Image
                  src={cat.image}
                  alt={cat.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
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
