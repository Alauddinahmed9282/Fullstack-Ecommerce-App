// Post Card Component
import { API_URL } from "@/lib/api";
import { Trash2, MessageCircle, Send, Heart } from "lucide-react";
import { useState, useEffect } from "react";

const PostCard = ({ post, currentUser, setPosts, posts }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const isLiked = post.likes?.includes(currentUser._id);

  const fetchComments = async () => {
    try {
      const response = await fetch(`${API_URL}/posts/comment/get/${post._id}`);
      const data = await response.json();
      if (data.status) {
        setComments(data.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`${API_URL}/posts/like/${post._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser._id }),
      });

      if (response.ok) {
        setPosts(
          posts.map((p) => {
            if (p._id === post._id) {
              const newLikes = isLiked
                ? p.likes.filter((id) => id !== currentUser._id)
                : [...(p.likes || []), currentUser._id];
              return { ...p, likes: newLikes };
            }
            return p;
          })
        );
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await fetch(`${API_URL}/posts/comment/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment: newComment,
          userId: currentUser._id,
          username: currentUser.username,
          postId: post._id,
        }),
      });

      if (response.ok) {
        setNewComment("");
        fetchComments();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `${API_URL}/posts/comment/delete/${commentId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchComments();
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments]);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
            {post.username?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              {post.username || "Unknown User"}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <p className="text-gray-800 mb-4">{post.description}</p>

        {post.imageUrl && (
          <img
            src={`http://localhost:8200/uploads/${post.imageUrl}`}
            alt="Post"
            className="w-full rounded-lg mb-4"
          />
        )}

        <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
            />
            <span className="text-sm font-medium">
              {post.likes?.length || 0}
            </span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-gray-600 hover:text-indigo-500 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Comment</span>
          </button>
        </div>
      </div>

      {showComments && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="flex items-start gap-3 bg-white p-3 rounded-lg"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                  {comment.username?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900">
                    {comment.username}
                  </p>
                  <p className="text-sm text-gray-700">{comment.comment}</p>
                </div>
                {comment.userId === currentUser._id && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
              placeholder="Add a comment..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              onClick={handleAddComment}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
