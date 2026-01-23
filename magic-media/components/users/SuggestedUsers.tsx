import { UserMinus, UserPlus } from "lucide-react";
import { useState } from "react";
import { api } from "../../lib/api";

const SuggestedUsers = ({
  users,
  currentUser,
  setCurrentUser,
  setSelectedUser,
  setCurrentPage,
}) => {
  const [loading, setLoading] = useState({});

  const handleFollow = async (userId) => {
    setLoading((prev) => ({ ...prev, [userId]: true }));
    try {
      const isFollowing = currentUser.following?.includes(userId);
      const data = isFollowing
        ? await api.unfollowUser(userId, currentUser._id)
        : await api.followUser(userId, currentUser._id);

      if (data.status) {
        // Update currentUser state
        const updatedFollowing = isFollowing
          ? currentUser.following.filter((id) => id !== userId)
          : [...(currentUser.following || []), userId];

        setCurrentUser((prev) => ({
          ...prev,
          following: updatedFollowing,
        }));
      }
    } catch (error) {
      console.error("Error following user:", error);
    } finally {
      setLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const viewProfile = (user) => {
    setSelectedUser(user);
    setCurrentPage("profile");
  };

  const filteredUsers = users
    .filter((u) => u._id !== currentUser._id)
    .slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
      <h3 className="font-semibold text-gray-900 mb-4">Suggested Users</h3>
      <div className="space-y-4">
        {filteredUsers.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">
            No users to suggest
          </p>
        ) : (
          filteredUsers.map((user) => {
            const isFollowing = currentUser.following?.includes(user._id);

            return (
              <div key={user._id} className="flex items-center justify-between">
                <button
                  onClick={() => viewProfile(user)}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-1 text-left"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {user.username?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {user.username}
                    </p>
                    <p className="text-xs text-gray-500">{user.emailId}</p>
                  </div>
                </button>
                <button
                  onClick={() => handleFollow(user._id)}
                  disabled={loading[user._id]}
                  className={`p-2 rounded-lg transition-colors ${
                    isFollowing
                      ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                  } disabled:opacity-50`}
                >
                  {isFollowing ? (
                    <UserMinus className="w-4 h-4" />
                  ) : (
                    <UserPlus className="w-4 h-4" />
                  )}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SuggestedUsers;
