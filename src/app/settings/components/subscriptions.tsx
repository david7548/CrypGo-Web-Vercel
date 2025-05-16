"use client";

import React, { useState } from "react";

const Subscriptions = () => {
  const [autoRenew, setAutoRenew] = useState(true);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full mx-auto">
      {/* Plan Selection */}
      <div className="mb-4">
        <h1 className="text-xl font-bold mb-3">Subscription Plan</h1>
        <div className="flex items-center space-x-3">
          <div className="p-3 border-2 border-blue-500 rounded-lg flex-1 text-center">
            <h2 className="text-sm font-bold">Starter</h2>
            <button className="mt-1 text-xs text-blue-500 underline">Cancel</button>
          </div>
          <div className="p-3 border border-gray-300 rounded-lg flex-1 text-center">
            <h2 className="text-sm font-bold">Pro</h2>
          </div>
        </div>
      </div>

      {/* Auto Renew */}
      <div className="flex items-center justify-between mb-4 bg-gray-100 p-3 rounded-lg">
        <p className="text-sm text-gray-800">Auto Renew</p>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={autoRenew}
            onChange={() => setAutoRenew(!autoRenew)}
          />
          <div className={`w-10 h-5 rounded-full transition-all duration-300 ${autoRenew ? "bg-blue-500" : "bg-gray-300"}`}>
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-all duration-300 ${autoRenew ? "translate-x-5" : "translate-x-1"}`}
            ></div>
          </div>
        </label>
      </div>

      {/* Payment Method */}
      <div className="mb-4">
        <h1 className="text-xl font-bold mb-2">Payment Method</h1>
        <div className="flex space-x-3">
          {["Visa", "MasterCard", "PayPal"].map((method, idx) => (
            <div key={idx} className="w-20 h-12 flex items-center justify-center bg-gray-200 rounded-md">
              <p className="text-xs font-semibold text-gray-700">{method}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div>
        <h1 className="text-xl font-bold mb-2">Billing History</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700 border border-gray-300 rounded-lg">
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <th className="py-2 px-3">Date</th>
                <th className="py-2 px-3">Plan</th>
                <th className="py-2 px-3">Amount</th>
                <th className="py-2 px-3">Expiration</th>
              </tr>
            </thead>
            <tbody>
              {Array(3)
                .fill(0)
                .map((_, idx) => (
                  <tr key={idx} className="border-t border-gray-300">
                    <td className="py-1 px-3">12/01/2025</td>
                    <td className="py-1 px-3">Pro Plan (Monthly)</td>
                    <td className="py-1 px-3">$4.99</td>
                    <td className="py-1 px-3 text-blue-500">Renew by July 2nd</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;

