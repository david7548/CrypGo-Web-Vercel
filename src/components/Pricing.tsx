import React from "react";
import Link from "next/link";
import { FaCheck, FaTimes, FaLock } from "react-icons/fa";

const ComparisonTable = () => {
  const features = [
    { name: "Beginner Courses Access", free: true, pro: true },
    { name: "Advanced Courses Access", free: false, pro: true },
    { name: "XP Boosts", free: false, pro: true },
    { name: "Leaderboard Eligibility", free: true, pro: true },
    { name: "Trading", free: false, pro: true },
    { name: "NFT Rewards", free: false, pro: true },
  ];

  return (
    <div className="w-full max-w-none px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
        <p className="text-lg text-gray-600">Unlock premium features and accelerate your learning journey</p>
      </div>

      {/* Add overflow-x-auto to prevent horizontal overflow */}
      <div className="overflow-x-auto border border-indigo-500 border-opacity-50">
        <div className="w-full shadow-xl rounded-lg overflow-hidden">
          {/* Table with responsive width */}
          <table className="w-[1200px]">
            <thead>
              <tr>
                <th className="px-6 py-4 bg-gray-50 text-left text-sm font-semibold text-gray-900">Features</th>
                <th className="px-6 py-4 bg-gray-50 text-center text-sm font-semibold text-gray-900">Free</th>
                <th className="px-6 py-4 bg-indigo-500 text-center text-sm font-semibold text-white">Pro ($4.99/mo)</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={feature.name}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition-colors duration-200`}
                >
                  <td className="px-6 py-4 text-sm text-gray-900">{feature.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      {feature.free ? (
                        <FaCheck className="text-green-500 text-xl" />
                      ) : (
                        <FaTimes className="text-red-500 text-xl" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      {feature.pro ? (
                        <FaCheck className="text-green-500 text-xl" />
                      ) : (
                        <FaTimes className="text-red-500 text-xl" />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="px-6 py-8 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-center">
              <Link href="/pro">
                <button
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-transform duration-200 hover:scale-105"
                >
                  <FaLock className="mr-2" />
                  Unlock Premium
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>* Some features might require additional configuration</p>
      </div>
    </div>
  );
};

export default ComparisonTable;


