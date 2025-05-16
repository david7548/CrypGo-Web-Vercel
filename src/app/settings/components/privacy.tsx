"use client";

import React, { useState } from "react";

const Privacy = () => {
  const [dataSharing, setDataSharing] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [personalizedAds, setPersonalizedAds] = useState(true);
  const [thirdPartyAccess, setThirdPartyAccess] = useState(false);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full mx-auto">
      {/* 🔹 Privacy Settings */}
      <div className="mb-4">
        <h1 className="text-xl font-bold mb-2">Privacy Settings</h1>
        {[
          { label: "Data Sharing", state: dataSharing, setState: setDataSharing },
          { label: "Analytics & Performance", state: analytics, setState: setAnalytics },
          { label: "Personalized Ads", state: personalizedAds, setState: setPersonalizedAds },
          { label: "Third-Party Access", state: thirdPartyAccess, setState: setThirdPartyAccess },
        ].map(({ label, state, setState }, idx) => (
          <div key={idx} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg mb-2">
            <p className="text-gray-800 text-sm">{label}</p>
            {/* ✅ Compact Toggle */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only" checked={state} onChange={() => setState(!state)} />
              <div className={`w-9 h-4 rounded-full transition-all duration-300 ${state ? "bg-blue-500" : "bg-gray-300"}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-all duration-300 ${state ? "translate-x-5" : "translate-x-0"}`}></div>
              </div>
            </label>
          </div>
        ))}
      </div>

      {/* 🔹 Account Management */}
      <div>
        <h1 className="text-xl font-bold mb-2">Account Management</h1>
        {[
          { label: "Third-Party Apps", action: <a href="#" className="text-blue-500 underline text-sm">Manage</a> },
          { label: "Download Your Data", action: <a href="#" className="text-blue-500 underline text-sm">Request</a> },
          { label: "Delete Account", action: <button className="bg-red-500 text-white px-3 py-1 text-sm rounded-lg hover:bg-red-600 transition">Delete</button>, highlight: true },
        ].map(({ label, action, highlight }, idx) => (
          <div key={idx} className={`flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg mb-2 ${highlight ? "border border-red-500" : ""}`}>
            <p className={`text-gray-800 text-sm ${highlight ? "text-red-500 font-medium" : ""}`}>{label}</p>
            {action}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Privacy;


