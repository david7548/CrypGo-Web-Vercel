import Image from 'next/image';
import Link from 'next/link';

export default function Landing() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16" style={{ backgroundImage: 'url(/img/Frame2.png)', backgroundSize: 'cover', minHeight: '700px' }}>
      
      {/* Background Gradient Circles
      
      
      {/* Left Content */}
      <div className="md:w-1/2 text-center md:text-left ml-12">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-glide">
          <span className="text-indigo-500">Cryptocurrency</span><br />
          <span className="mt-6 text-black">Learning Made</span><br />
          <span className="mt-6 text-black">Super Easy!</span>
        </h1>
        <p className="text-gray-600 mt-4 text-lg max-w-md animate-glide">
          Join thousands of students learning blockchain, trading, and crypto fundamentals. Gain the knowledge to navigate the crypto world with confidence!
        </p>
        <Link href="/courses">
          <button className="mt-6 bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all">
            Start For Free learning
          </button>
        </Link>
      </div>

      {/* Right Content with Image and Cards */}
      <div className="relative md:w-1/2 mt-10 md:mt-0 flex justify-center items-center animate-fade-scale-in">
        {/* Main Image */}
        <div className="w-[200px] h-[200px] md:w-[500px] md:h-[500px] relative z-0 rounded-full overflow-hidden shadow-lg border-2 border-indigo-500">
          <Image src="/img/marketpic.jpeg" alt="Crypto Chart" layout="fill" objectFit="cover" />
        </div>

        {/* Floating Cards */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-md px-4 py-2 flex items-center gap-2 z-10 border border-indigo-500">
          <div className="text-indigo-500 text-lg font-semibold">12+</div>
          <div className="text-gray-600 text-sm">Video Courses</div>
        </div>

        <div className="absolute top-20 left-24 bg-white rounded-xl shadow-md px-4 py-2 text-center z-10 border border-indigo-500 p-1">
          <div className="text-indigo-500 text-lg font-semibold">15+</div>
          <div className="text-gray-600 text-sm">Online Courses</div>
        </div>

        <div className="absolute bottom-4 right-40 bg-white rounded-xl shadow-md px-4 py-2 text-center z-10 border border-indigo-500 p-1">
          <div className="text-indigo-500 text-lg font-semibold">50+</div>
          <div className="text-gray-600 text-sm">Tutors</div>
        </div>
      </div>
    </section>
  );
}
