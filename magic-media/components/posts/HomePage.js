// Home Page with Posts Feed
import { useState } from "react";

const HomePage = ({
  posts,
  setPosts,
  currentUser,
  setCurrentUser,
  users,
  setSelectedUser,
  setCurrentPage,
  setEditingPostId,
  loading,
}) => {
  const PostCard = require("./PostCard").default;
  const SuggestedUsers = require("../users/SuggestedUsers").default;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {loading ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-500">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-500">
              No posts yet. Be the first to post or follow users to see their
              posts!
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              currentUser={currentUser}
              setPosts={setPosts}
              posts={posts}
              setCurrentPage={setCurrentPage}
              setEditingPostId={setEditingPostId}
            />
          ))
        )}
      </div>

      <div className="space-y-6">
        <SuggestedUsers
          users={users}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setSelectedUser={setSelectedUser}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default HomePage;
