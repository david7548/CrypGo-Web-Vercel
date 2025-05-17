import Image from 'next/image';
import Link from 'next/link';

export default function Landing() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-4 md:px-16 py-8 md:py-0" style={{ backgroundImage: 'url(/img/Frame2.png)', backgroundSize: 'cover', minHeight: '700px' }}>
      {/* Left Content */}
      <div className="w-full md:w-1/2 text-center md:text-left md:ml-12 mb-8 md:mb-0">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight animate-glide">
          <span className="text-indigo-500">Cryptocurrency</span><br />
          <span className="mt-4 md:mt-6 text-black">Learning Made</span><br />
          <span className="mt-4 md:mt-6 text-black">Super Easy!</span>
        </h1>
        <p className="text-gray-600 mt-4 text-base md:text-lg max-w-md mx-auto md:mx-0 animate-glide">
          Join thousands of students learning blockchain, trading, and crypto fundamentals. Gain the knowledge to navigate the crypto world with confidence!
        </p>
        <Link href="/courses">
          <button className="mt-6 bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all w-full md:w-auto">
            Start For Free learning
          </button>
        </Link>
      </div>

      {/* Right Content with Image and Cards */}
      <div className="relative w-full md:w-1/2 mt-4 md:mt-0 flex justify-center items-center animate-fade-scale-in">
        {/* Main Image */}
        <div className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[500px] md:h-[500px] relative z-0 rounded-full overflow-hidden shadow-lg border-2 border-indigo-500">
          <Image src="/img/marketpic.jpeg" alt="Crypto Chart" layout="fill" objectFit="cover" />
        </div>

        {/* Floating Cards - Mobile Adjusted Positions */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-md px-3 py-2 flex items-center gap-2 z-10 border border-indigo-500 scale-75 md:scale-100">
          <div className="text-indigo-500 text-base md:text-lg font-semibold">12+</div>
          <div className="text-gray-600 text-xs md:text-sm">Video Courses</div>
        </div>

        <div className="absolute top-16 md:top-20 left-8 md:left-24 bg-white rounded-xl shadow-md px-3 py-2 text-center z-10 border border-indigo-500 scale-75 md:scale-100">
          <div className="text-indigo-500 text-base md:text-lg font-semibold">15+</div>
          <div className="text-gray-600 text-xs md:text-sm">Online Courses</div>
        </div>

        <div className="absolute bottom-0 md:bottom-4 right-8 md:right-40 bg-white rounded-xl shadow-md px-3 py-2 text-center z-10 border border-indigo-500 scale-75 md:scale-100">
          <div className="text-indigo-500 text-base md:text-lg font-semibold">50+</div>
          <div className="text-gray-600 text-xs md:text-sm">Tutors</div>
        </div>
      </div>
    </section>
  );
}
