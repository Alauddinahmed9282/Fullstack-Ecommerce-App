// Post Card Component
import { api, IMAGE_URL } from "@/lib/api";
import { Trash2, MessageCircle, Send, Heart, Edit2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const PostCard = ({
  post,
  currentUser,
  setPosts,
  posts,
  setCurrentPage,
  setEditingPostId,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const isLiked = post.likes?.includes(currentUser._id);

  const fetchComments = useCallback(async () => {
    try {
      const data = await api.getComments(post._id);
      if (data.status && data.data) {
        setComments(data.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [post._id]);

  const handleLike = async () => {
    try {
      const data = await api.likePost(post._id, currentUser._id);
      if (data.status) {
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

    setLoading(true);
    try {
      const data = await api.addComment({
        comment: newComment,
        userId: currentUser._id,
        username: currentUser.username,
        postId: post._id,
      });

      if (data.status) {
        // Optimistically add comment to state immediately
        const newCommentObject = {
          _id: data.data?._id || Date.now().toString(),
          comment: newComment,
          username: currentUser.username,
          userId: currentUser._id,
          createdAt: new Date().toISOString(),
        };
        setComments([...comments, newCommentObject]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const data = await api.deleteComment(commentId);
      if (data.status) {
        fetchComments();
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const data = await api.deletePost(post._id);
        if (data.status) {
          setPosts(posts.filter((p) => p._id !== post._id));
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleEditPost = () => {
    setEditingPostId(post._id);
    setCurrentPage("edit");
  };

  const handleImageError = (e) => {
    console.error("Failed to load image:", `${IMAGE_URL}/${post.imageUrl}`);
    setImageError(true);
    e.target.style.display = "none";
  };

  // Helper function to check if imageUrl is valid
  const isValidImageUrl = () => {
    if (!post.imageUrl) return false;
    // Check if imageUrl is not the literal string "imageUrl" and contains a valid filename pattern
    if (post.imageUrl === "imageUrl") return false;
    // Check if it looks like a filename (has extension or timestamp pattern)
    return (
      /\.(jpg|jpeg|png|gif|webp)$/i.test(post.imageUrl) ||
      /^\d+_/.test(post.imageUrl)
    );
  };

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments, fetchComments]);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
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
          {post.userId === currentUser._id && (
            <div className="flex gap-2">
              <button
                onClick={handleEditPost}
                className="text-blue-500 hover:text-blue-600 p-2"
                title="Edit post"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleDeletePost}
                className="text-red-500 hover:text-red-600 p-2"
                title="Delete post"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <p className="text-gray-800 mb-4">{post.caption || post.description}</p>

        {isValidImageUrl() && !imageError && (
          <img
            src={`${IMAGE_URL}/${post.imageUrl}`}
            alt="Post"
            className="w-full rounded-lg mb-4 max-h-96 object-cover"
            onError={handleImageError}
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
            <span className="text-sm font-medium">
              {comments.length > 0 ? comments.length : "Comment"}
            </span>
          </button>
        </div>
      </div>

      {showComments && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {comments.length === 0 ? (
              <p className="text-center text-gray-500 text-sm">
                No comments yet
              </p>
            ) : (
              comments.map((comment) => (
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
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
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
              ))
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
              placeholder="Add a comment..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={loading}
            />
            <button
              onClick={handleAddComment}
              disabled={loading || !newComment.trim()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
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
