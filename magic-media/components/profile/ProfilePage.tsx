import { useEffect, useState } from "react";
import { UserMinus, UserPlus } from "lucide-react";
import { API_URL } from "../../lib/api";
import PostCard from "../posts/PostCard";

// Profile Page
const ProfilePage = ({ user, currentUser }) => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    fetchUserPosts();
  }, [user]);

  const fetchUserPosts = async () => {
    try {
      const response = await fetch(
        `${API_URL}/posts/getPostByUser/${user._id}`
      );
      const data = await response.json();
      if (data.status) {
        setUserPosts(data.data);
      }
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
            {user.username?.[0]?.toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {user.username}
            </h2>
            <p className="text-gray-600">{user.emailId}</p>
            <p className="text-gray-500 text-sm mt-1">{user.mobile}</p>
          </div>
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
              {user.follower?.length || 0}
            </p>
            <p className="text-sm text-gray-600">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {user.following?.length || 0}
            </p>
            <p className="text-sm text-gray-600">Following</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {userPosts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            currentUser={currentUser}
            setPosts={setUserPosts}
            posts={userPosts}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
