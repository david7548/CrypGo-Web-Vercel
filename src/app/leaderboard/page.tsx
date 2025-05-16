import Leaderboard from '@/components/Leaderboard';
import { FaTrophy, FaBolt } from 'react-icons/fa';
import Link from 'next/link';

export default function LeaderboardPage() {
  return (
    <div className="flex justify-center items-start py-14 px-6" style={{ backgroundImage: 'url(/img/Frame5.png)', backgroundSize: 'cover' }}>
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-6">
        
        {/* 🏆 Leaderboard Section (Left Side) */}
        <div className="w-full md:w-2/3">
          <Leaderboard />
        </div>

        {/* 🎁 Prizes & Pro CTA Section (Right Side) */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          
          {/* 🏆 Prizes Section */}
          <div className="bg-white shadow-lg rounded-lg p-4 border border-opacity-30">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <FaTrophy className="text-yellow-500 mr-2" /> Prizes
            </h2>
            <div className="space-y-3">
              {/* 1st Place Prize */}
              <div className="bg-gray-50 border border-opacity-30 p-3 rounded-lg">
                <h3 className="font-bold text-md text-yellow-800">🥇 1st Place</h3>
                <p className="text-sm">🏆 0.1 ETH</p>
                <p className="text-sm">📚 Free CrypGo Pro For A Month</p>
                <p className="text-sm">👨‍🏫 1:1 Mentorship</p>
              </div>

              {/* 2nd Place Prize */}
              <div className="bg-gray-50 border border-opacity-30 p-3 rounded-lg">
                <h3 className="font-bold text-md text-gray-800">🥈 2nd Place</h3>
                <p className="text-sm">🎓 0.05 ETH</p>
                <p className="text-sm">📖 Two CrypGo Pro Courses</p>
              </div>

              {/* 3rd-5th Place Prize */}
              <div className="bg-gray-50 border border-opacity-30 p-3 rounded-lg shadow">
                <h3 className="font-bold text-md text-orange-800">🥉 3rd Place</h3>
                <p className="text-sm">📜 0.01 ETH</p>
                <p className="text-sm">💰 One CrypGo Pro Course</p>
              </div>
            </div>
          </div>

          {/* 🚀 Pro Membership CTA */}
          <div className="bg-indigo-500 text-white rounded-lg p-4 shadow-lg text-center border border-opacity-30">
            <h3 className="text-lg font-bold mb-2">Pro Membership</h3>
            <p className="text-sm mb-3">Get <strong>1.5x XP</strong> on all activities!</p>
            <ul className="space-y-1 text-white text-sm">
              <li className="flex items-center justify-center">
                <FaBolt className="mr-2" /> Faster Progress
              </li>
              <li className="flex items-center justify-center">
                <FaBolt className="mr-2" /> Exclusive Content
              </li>
              <li className="flex items-center justify-center">
                <FaBolt className="mr-2" /> Priority Support
              </li>
            </ul>
            <Link href="/pro" className="mt-3 inline-block bg-white text-indigo-600 px-5 py-2 rounded-lg font-bold shadow-md hover:bg-gray-200 transition">
              Become Pro
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}






  