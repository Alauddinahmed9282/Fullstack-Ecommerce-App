// Edit Post Page
import { Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { api, IMAGE_URL } from "../../lib/api";

const EditPostPage = ({ postId, currentUser, setCurrentPage, fetchPosts }) => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await api.getPost(postId);
        if (data.status && data.data) {
          const post = data.data;
          setDescription(post.caption || post.description || "");
          setCurrentImageUrl(post.imageUrl);
        } else {
          setMessage("Failed to load post");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setMessage("Error loading post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage("File size must be less than 5MB");
        return;
      }
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setMessage("Please select a valid image file");
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setMessage("");
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const removeCurrentImage = () => {
    setCurrentImageUrl(null);
  };

  const handleUpdatePost = async () => {
    if (!description.trim()) {
      setMessage("Please write something!");
      return;
    }

    setMessage("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("description", description);

      if (image) {
        formData.append("imageUrl", image);
      }

      const data = await api.updatePost(postId, formData);
      if (data.status) {
        setMessage("Post updated successfully!");
        await fetchPosts();
        setTimeout(() => setCurrentPage("home"), 1500);
      } else {
        setMessage(data.message || "Failed to update post");
      }
    } catch (error) {
      setMessage(error.message || "Error updating post");
      console.error("Error:", error);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-500">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Post</h2>

        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {currentUser.username?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {currentUser.username}
              </p>
              <p className="text-sm text-gray-500">Edit your post</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Caption / Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              placeholder="What's on your mind?"
              maxLength={500}
              disabled={uploading}
            />
            <p className="text-xs text-gray-500 mt-1">
              {description.length}/500 characters
            </p>
          </div>

          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full rounded-lg max-h-96 object-cover"
              />
              <button
                onClick={removeImage}
                disabled={uploading}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          )}

          {currentImageUrl && !imagePreview && (
            <div className="relative">
              <img
                src={`${IMAGE_URL}/${currentImageUrl}`}
                alt="Current"
                className="w-full rounded-lg max-h-96 object-cover"
              />
              <button
                onClick={removeCurrentImage}
                disabled={uploading}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Change Image (Optional)
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 cursor-pointer">
                <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition-colors disabled:opacity-50">
                  <span className="text-gray-600">
                    {image ? image.name : "Choose a new image"}
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Supported formats: JPG, PNG, GIF (Max 5MB)
            </p>
          </div>

          {message && (
            <div
              className={`p-3 rounded-lg text-sm ${
                message.includes("success")
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message}
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleUpdatePost}
              disabled={uploading || !description.trim()}
              className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {uploading ? "Updating..." : "Update Post"}
            </button>
            <button
              onClick={() => setCurrentPage("home")}
              disabled={uploading}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPostPage;
