import { useState, useEffect, useCallback } from "react";
import { FaTimes, FaUserPlus, FaCheck, FaUserFriends } from "react-icons/fa";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: {
    username: string;
    xp: number;
    level: number;
    status: string;
    profilePicture: string;
    isFriend: boolean;
    mutualFriends: number;
  };
}

const UserProfileModal = ({ isOpen, onClose, userData = {
  username: "Sarah Anderson",
  xp: 7500,
  level: 42,
  status: "online",
  profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  isFriend: false,
  mutualFriends: 6
}}: UserProfileModalProps) => {
  const [friendStatus, setFriendStatus] = useState("add");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleAddFriend = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFriendStatus("pending");
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const getXPColor = (xp: number) => {
    if (xp >= 7000) return "bg-green-500";
    if (xp >= 4000) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
         onClick={onClose}
         aria-modal="true"
         role="dialog">
      <div 
        className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl transform transition-all duration-300 ease-in-out"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close modal"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={userData.profilePicture}
              alt={userData.username}
              className="w-32 h-32 rounded-full object-cover border-4 border-gradient-to-r from-blue-500 to-purple-500"
              onError={(e) => {
              }}
              loading="lazy"
            />
            <span className={`absolute bottom-2 right-2 w-4 h-4 rounded-full ${userData.status === "online" ? "bg-green-500" : "bg-gray-400"} border-2 border-white`}></span>
          </div>

          <h2 className="mt-4 text-2xl font-bold text-gray-800 truncate max-w-[200px]">{userData.username}</h2>
          
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div 
              className={`h-2.5 rounded-full ${getXPColor(userData.xp)}`}
              style={{ width: `${(userData.xp / 10000) * 100}%` }}
              role="progressbar"
              aria-valuenow={userData.xp}
              aria-valuemin={0}
              aria-valuemax={10000}
            ></div>
          </div>
          
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm text-gray-600">Level {userData.level}</span>
            <span className="text-sm text-gray-600">• {userData.xp} XP</span>
          </div>

          <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
            <FaUserFriends className="w-4 h-4" />
            <span>{userData.mutualFriends} mutual friends</span>
          </div>

          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

          <button
            onClick={handleAddFriend}
            disabled={friendStatus === "pending" || isLoading || userData.isFriend}
            className={`mt-6 w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2
              ${userData.isFriend
                ? "bg-gray-100 text-gray-600 cursor-not-allowed"
                : friendStatus === "pending"
                ? "bg-blue-100 text-blue-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"}
            `}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : userData.isFriend ? (
              <>
                <FaCheck className="w-5 h-5" />
                Already Friends
              </>
            ) : friendStatus === "pending" ? (
              <>Request Sent</>
            ) : (
              <>
                <FaUserPlus className="w-5 h-5" />
                Add Friend
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;