"use client";

import React from "react";
import { FaLock } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import Link from "next/link";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const chartData = {
  labels: ["10 AM", "12 PM", "2 PM", "4 PM", "6 PM", "8 PM"],
  datasets: [
    {
      label: "ETH/USDT",
      data: [1800, 1825, 1790, 1850, 1900, 1880],
      borderColor: "#4f46e5",
      backgroundColor: "rgba(37, 99, 235, 0.2)",
      tension: 0.4,
    },
  ],
};

const TradingPage = () => {
  return (
    <div className="bg-white relative min-h-screen flex items-center justify-center p-2 md:p-6">
      {/* ✅ Grey Gradient Overlay with Lock Icon */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800/70 to-gray-900/90 flex flex-col items-center justify-center text-white text-center rounded-lg z-10 p-4">
        <FaLock className="text-4xl md:text-5xl mb-3 md:mb-4" />
        <h2 className="text-xl md:text-2xl mb-3 md:mb-4 font-bold">Coming Soon to Premium Members</h2>
        <Link href="/pro">
          <button
            className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 border border-transparent text-sm md:text-base font-medium rounded-md text-white bg-indigo-500 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-transform duration-200 hover:scale-105"
          >
            <FaLock className="mr-2" />
            Unlock Premium
          </button>
        </Link>
      </div>

      {/* Main Trading UI (Blurred Underneath) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 w-full max-w-6xl opacity-40">
        {/* Left Trading Panel (Buy/Sell) */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg flex flex-col space-y-3 md:space-y-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-800">Swap to:</h2>
          <select className="border border-gray-300 p-2 rounded-lg w-full text-sm md:text-base">
            <option>ETH</option>
            <option>Fiat</option>
          </select>
          <input 
            type="number" 
            placeholder="Enter amount" 
            className="border p-2 rounded-lg w-full text-sm md:text-base" 
          />
          <button className="bg-indigo-500 text-white p-2 rounded-lg text-sm md:text-base">Swap</button>
        </div>

        {/* Middle: Trading Chart */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg col-span-1 md:col-span-2">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">ETH/USDT Chart</h2>
          <div className="w-full h-[200px] md:h-[300px]">
            <Line 
              data={chartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Bottom: Trade History */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg col-span-1 md:col-span-3 overflow-x-auto">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">Your Trade History</h2>
          <div className="min-w-full">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-xs md:text-sm text-gray-600">Token</th>
                  <th className="p-2 text-xs md:text-sm text-gray-600">Amount</th>
                  <th className="p-2 text-xs md:text-sm text-gray-600">Price</th>
                  <th className="p-2 text-xs md:text-sm text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2 text-xs md:text-sm">ETH</td>
                  <td className="p-2 text-xs md:text-sm">1.5</td>
                  <td className="p-2 text-xs md:text-sm">$1,859.82</td>
                  <td className="p-2 text-xs md:text-sm">03/12/2025</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2 text-xs md:text-sm">ETH</td>
                  <td className="p-2 text-xs md:text-sm">2.5</td>
                  <td className="p-2 text-xs md:text-sm">$2,423.23</td>
                  <td className="p-2 text-xs md:text-sm">03/13/2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingPage;




