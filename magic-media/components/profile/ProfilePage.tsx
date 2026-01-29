import { useEffect, useState, useCallback } from "react";
import { ArrowLeft, UserMinus, UserPlus } from "lucide-react";
import { api } from "../../lib/api";
import PostCard from "../posts/PostCard";

// Profile Page
const ProfilePage = ({
  user,
  currentUser,
  setCurrentUser,
  setCurrentPage,
  setEditingPostId,
}) => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [displayUser, setDisplayUser] = useState(user);

  const fetchUserPosts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getPostsByUser(user._id);
      if (data.status && data.data) {
        setUserPosts(data.data);
      } else {
        setUserPosts([]);
      }
    } catch (error) {
      console.error("Error fetching user posts:", error);
      setUserPosts([]);
    } finally {
      setLoading(false);
    }
  }, [user._id]);

  useEffect(() => {
    fetchUserPosts();
    setDisplayUser(user);
  }, [user, fetchUserPosts]);

  const handleFollow = async () => {
    setFollowLoading(true);
    try {
      const isFollowing = currentUser.following?.includes(user._id);
      const data = isFollowing
        ? await api.unfollowUser(user._id, currentUser._id)
        : await api.followUser(user._id, currentUser._id);

      if (data.status) {
        // Update currentUser state
        const updatedFollowing = isFollowing
          ? currentUser.following.filter((id) => id !== user._id)
          : [...(currentUser.following || []), user._id];

        setCurrentUser((prev) => ({
          ...prev,
          following: updatedFollowing,
        }));

        // Update display user followers count
        const updatedFollowers = isFollowing
          ? (displayUser.follower || []).filter((id) => id !== currentUser._id)
          : [...(displayUser.follower || []), currentUser._id];

        setDisplayUser((prev) => ({
          ...prev,
          follower: updatedFollowers,
        }));
      }
    } catch (error) {
      console.error("Error following user:", error);
    } finally {
      setFollowLoading(false);
    }
  };

  const isOwnProfile = user._id === currentUser._id;
  const isFollowing = currentUser.following?.includes(user._id);

  return (
    <div className="space-y-6">
      <button
        onClick={() => setCurrentPage("home")}
        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold flex-shrink-0">
            {user.username?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">
              {user.username}
            </h2>
            <p className="text-gray-600">{user.emailId}</p>
            <p className="text-gray-500 text-sm mt-1">{user.mobile}</p>
            {user.address && (
              <p className="text-gray-500 text-sm">{user.address}</p>
            )}
          </div>
          {!isOwnProfile && (
            <button
              onClick={handleFollow}
              disabled={followLoading}
              className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                isFollowing
                  ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              } disabled:opacity-50`}
            >
              {isFollowing ? (
                <>
                  <UserMinus className="w-4 h-4" />
                  Unfollow
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Follow
                </>
              )}
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {userPosts.length}
            </p>
            <p className="text-sm text-gray-600">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {displayUser.follower?.length || 0}
            </p>
            <p className="text-sm text-gray-600">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {displayUser.following?.length || 0}
            </p>
            <p className="text-sm text-gray-600">Following</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {isOwnProfile ? "Your Posts" : `${user.username}'s Posts`}
        </h3>
        {loading ? (
          <div className="flex justify-center py-8">
            <p className="text-gray-500">Loading posts...</p>
          </div>
        ) : userPosts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-500">
              {isOwnProfile
                ? "You haven't posted anything yet!"
                : "This user hasn't posted anything yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {userPosts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                currentUser={currentUser}
                setPosts={setUserPosts}
                posts={userPosts}
                setCurrentPage={setCurrentPage}
                setEditingPostId={setEditingPostId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
