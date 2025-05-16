"use client";

import React from "react";
import { FaChartLine, FaBitcoin, FaShoppingCart, FaWallet } from "react-icons/fa";

const PaperTrading = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-6">
      <div className="w-full max-w-6xl">

        {/* Header */}
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          🏦 Crypto Paper Trading
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Practice buying and selling cryptocurrencies in a risk-free environment. Earn XP as you trade and climb the ranks!
        </p>

        {/* Trading Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Virtual Balance */}
          <div className="bg-white shadow-md p-6 rounded-lg flex items-center">
            <FaWallet className="text-blue-500 text-3xl mr-4" />
            <div>
              <p className="text-gray-600 text-sm">Total Balance</p>
              <h2 className="text-xl font-bold text-gray-900">$100,000</h2>
            </div>
          </div>

          {/* Holdings */}
          <div className="bg-white shadow-md p-6 rounded-lg flex items-center">
            <FaBitcoin className="text-yellow-500 text-3xl mr-4" />
            <div>
              <p className="text-gray-600 text-sm">Current Holdings</p>
              <h2 className="text-xl font-bold text-gray-900">BTC: 0.50</h2>
            </div>
          </div>

          {/* Trading XP */}
          <div className="bg-white shadow-md p-6 rounded-lg flex items-center">
            <FaChartLine className="text-green-500 text-3xl mr-4" />
            <div>
              <p className="text-gray-600 text-sm">XP Earned</p>
              <h2 className="text-xl font-bold text-gray-900">+500 XP</h2>
            </div>
          </div>
        </div>

        {/* Buy/Sell Panel */}
        <div className="mt-8 bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Buy / Sell Crypto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm mb-1">Select Crypto</label>
              <select className="p-3 border rounded-lg">
                <option>Bitcoin (BTC)</option>
                <option>Ethereum (ETH)</option>
                <option>Solana (SOL)</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm mb-1">Enter Amount</label>
              <input type="number" className="p-3 border rounded-lg" placeholder="0.00" />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition">
              Buy
            </button>
            <button className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition">
              Sell
            </button>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="mt-8 bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">My Holdings</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left text-gray-600">Asset</th>
                <th className="p-3 text-left text-gray-600">Quantity</th>
                <th className="p-3 text-left text-gray-600">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3">Bitcoin (BTC)</td>
                <td className="p-3">0.50</td>
                <td className="p-3">$25,000</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Ethereum (ETH)</td>
                <td className="p-3">2.00</td>
                <td className="p-3">$6,000</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default PaperTrading;
