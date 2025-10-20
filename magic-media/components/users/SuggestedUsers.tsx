import { UserMinus, UserPlus } from "lucide-react";
import { useState } from "react";
import { API_URL } from "../../lib/api";

const SuggestedUsers = ({
  users,
  currentUser,
  setSelectedUser,
  setCurrentPage,
}) => {
  const [userStates, setUserStates] = useState({});

  const handleFollow = async (userId) => {
    try {
      const isFollowing = currentUser.following?.includes(userId);
      const endpoint = isFollowing ? "unfollow" : "follow";

      const response = await fetch(`${API_URL}/users/${endpoint}/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser._id }),
      });

      if (response.ok) {
        setUserStates((prev) => ({
          ...prev,
          [userId]: !isFollowing,
        }));
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const viewProfile = (user) => {
    setSelectedUser(user);
    setCurrentPage("profile");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
      <h3 className="font-semibold text-gray-900 mb-4">Suggested Users</h3>
      <div className="space-y-4">
        {users
          .filter((u) => u._id !== currentUser._id)
          .slice(0, 5)
          .map((user) => {
            const isFollowing =
              userStates[user._id] ?? currentUser.following?.includes(user._id);

            return (
              <div key={user._id} className="flex items-center justify-between">
                <button
                  onClick={() => viewProfile(user)}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.username?.[0]?.toUpperCase()}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900 text-sm">
                      {user.username}
                    </p>
                    <p className="text-xs text-gray-500">{user.emailId}</p>
                  </div>
                </button>
                <button
                  onClick={() => handleFollow(user._id)}
                  className={`p-2 rounded-lg transition-colors ${
                    isFollowing
                      ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                  }`}
                >
                  {isFollowing ? (
                    <UserMinus className="w-4 h-4" />
                  ) : (
                    <UserPlus className="w-4 h-4" />
                  )}
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SuggestedUsers;
