"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";

const Checkmark = () => (
  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 mr-2">
    <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
  </span>
);

export default function ProPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isYearly, setIsYearly] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      }
    });
  }, []);

  const handleSubmitEmail = (e: React.FormEvent) => {
    console.log("Email submitted:", email);
    setShowModal(false);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-4 md:py-6 px-4" style={{ backgroundImage: "url('/img/Frame6.png')" }}>
      <div className='border-2 flex flex-col items-center p-4 md:p-10 shadow rounded-lg bg-white w-full max-w-4xl mx-4'>
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-4 text-center">Plans & Pricing</h1>
        <p className="text-black text-center max-w-4xl mb-6 md:mb-10 text-sm md:text-base">
          Whether your crypto learning journey is just beginning or you're leveling up fast, CrypGo is here to scale with you.
        </p>

        {/* Toggle Buttons */}
        <div className="flex mb-6 md:mb-10 bg-white shadow rounded-full w-full max-w-xs">
          <button 
            className={`flex-1 px-4 py-2 md:py-1 rounded-full text-sm font-semibold ${isYearly ? 'text-gray-600 hover:text-black' : 'text-white bg-indigo-500'}`} 
            onClick={() => setIsYearly(false)}
          >
            Monthly
          </button>
          <button 
            className={`flex-1 px-4 py-2 md:py-1 rounded-full text-sm font-semibold ${isYearly ? 'text-white bg-indigo-500' : 'text-gray-600 hover:text-black'}`} 
            onClick={() => setIsYearly(true)}
          >
            Yearly
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl border shadow-lg p-4 md:p-6 flex flex-col justify-between hover:transform hover:translate-y-[-4px] transition-transform duration-300">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">Free</h2>
              <p className="text-gray-500 mb-3 md:mb-4">/forever</p>
              <p className="mb-4 md:mb-6 text-sm text-gray-600">Start your journey with the basics of crypto education.</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center"><Checkmark /> Basic Lessons</li>
                <li className="flex items-center"><Checkmark /> Leaderboard Eligibility</li>
                <li className="flex items-center"><Checkmark /> XP Progression</li>
              </ul>
            </div>
            <button className="mt-4 md:mt-6 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition w-full">Choose Plan</button>
          </div>

          {/* Enterprise / Ultimate Plan */}
          <div className="bg-indigo-500 text-white rounded-2xl shadow-xl p-4 md:p-6 flex flex-col justify-between relative hover:transform hover:translate-y-[-4px] transition-transform duration-300">
            <div>
              <span className="absolute top-4 right-4 border bg-white text-indigo-600 text-xs font-bold px-2 py-1 rounded-full">Most Popular</span>
              <div className="flex items-center">
                <h2 className="text-xl md:text-2xl font-bold line-through text-gray-400">{isYearly ? '$49.99' : '$4.99'}</h2>
                <p className="text-xl md:text-2xl font-bold text-white ml-2">{isYearly ? '$29.99/year' : '$2.99/month'}</p>
              </div>
              <p className="text-sm md:text-md font-bold text-white">Early Access Offer!</p>
              <p className="mb-3 md:mb-4 text-sm font-bold text-white">Lock in this price before we launch public pricing!</p>
              <p className="mb-4 md:mb-6 text-sm">Go all-in with everything CrypGo has to offer, perfect for serious learners.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><Checkmark /> All Pro Courses</li>
                <li className="flex items-center"><Checkmark /> 1.5x XP Boosts On All Courses</li>
                <li className="flex items-center"><Checkmark /> Trading Simulator</li>
                <li className="flex items-center"><Checkmark /> Social Hub Access</li>
              </ul>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="mt-4 md:mt-6 bg-white text-indigo-600 font-bold py-2 rounded-lg hover:bg-indigo-100 transition w-full"
            >
              Choose Plan
            </button>
          </div>
        </div>

        <button
          onClick={() => router.push("/")}
          className="mt-6 md:mt-8 text-indigo-500 underline hover:text-indigo-600"
        >
          Back to Home
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Thank You!</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                Thank you for your interest in becoming a pro member! 
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                We are still in beta and will be rolling this feature out soon.
              </p>
              <div className="bg-indigo-50 p-3 sm:p-4 rounded-xl border border-indigo-100">
                <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium">
                  Want a <span className="text-indigo-600 font-bold">free month</span> of Crypgo Pro when we release?
                </p>
              </div>
            </div>

            <form 
              action="https://formspree.io/f/mpwdbqzl" 
              method="POST"
              onSubmit={(e) => {
                setTimeout(() => {
                  setShowModal(false);
                  setEmail("");
                }, 100);
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Enter your email below:
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-sm sm:text-base"
                  required
                />
              </div>
              
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Maybe Later
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all text-sm sm:text-base"
                >
                  Get Free Month
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


