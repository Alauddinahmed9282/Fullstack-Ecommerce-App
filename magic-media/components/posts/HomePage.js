// Home Page with Posts Feed
import { UserMinus, UserPlus } from "lucide-react";
import { useState } from "react";
import PostCard from "./PostCard";
import SuggestedUsers from "../users/SuggestedUsers";

const HomePage = ({
  posts,
  setPosts,
  currentUser,
  users,
  setSelectedUser,
  setCurrentPage,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {posts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-500">No posts yet. Be the first to post!</p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              currentUser={currentUser}
              setPosts={setPosts}
              posts={posts}
            />
          ))
        )}
      </div>

      <div className="space-y-6">
        <SuggestedUsers
          users={users}
          currentUser={currentUser}
          setSelectedUser={setSelectedUser}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default HomePage;
