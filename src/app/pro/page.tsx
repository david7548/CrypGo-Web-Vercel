"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";

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
          Whether your crypto learning journey is just beginning or you're leveling up fast, CrypGo Pro is here to scale with you.
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
                <li>✅ Basic Lessons</li>
                <li>✅ 1 Quiz Set per Week</li>
                <li>✅ XP Progression</li>
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
                <li>✅ All Pro Features</li>
                <li>✅ Certificate of Completion</li>
                <li>✅ Private AMA Sessions</li>
                <li>✅ Custom Avatar & Theme</li>
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
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-xl w-full max-w-lg">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">Thank You!</h2>
            <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
              Thank you for your interest in becoming a pro member! 
            </p>
            <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
              We are still in beta and will be rolling this feature out soon.
            </p>
            <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
              Want a <strong>free month</strong> of Crypgo Pro when we release?
            </p>
            <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
              Enter your email below:
            </p>
            <form 
              action="https://formspree.io/f/mpwdbqzl" 
              method="POST"
              onSubmit={(e) => {
                setTimeout(() => {
                  setShowModal(false);
                  setEmail("");
                }, 100);
              }}
            >
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 border rounded-lg mb-4"
                required
              />
              <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full md:w-auto px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="w-full md:w-auto px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


