// Create Post Page
import { PlusSquare, Trash2 } from "lucide-react";
import { useState } from "react";
import { API_URL } from "../../lib/api";

const CreatePostPage = ({ currentUser, setCurrentPage, fetchPosts }) => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleCreatePost = async () => {
    if (!description.trim()) {
      setMessage("Please write something!");
      return;
    }

    setMessage("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("userId", currentUser._id);
      formData.append("username", currentUser.username);

      if (image) {
        formData.append("imageUrl", image);
      }

      const response = await fetch(`${API_URL}/posts/add`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.status) {
        setMessage("Post created successfully!");
        setDescription("");
        setImage(null);
        setImagePreview(null);
        fetchPosts();
        setTimeout(() => setCurrentPage("home"), 1500);
      } else {
        setMessage("Failed to create post");
      }
    } catch (error) {
      setMessage("Error creating post");
      console.error("Error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Create New Post
        </h2>

        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {currentUser.username?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {currentUser.username}
              </p>
              <p className="text-sm text-gray-500">Create a post</p>
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
            />
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
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Image (Optional)
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 cursor-pointer">
                <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition-colors">
                  <PlusSquare className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">
                    {image ? image.name : "Choose an image"}
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
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
              onClick={handleCreatePost}
              disabled={uploading || !description.trim()}
              className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {uploading ? "Posting..." : "Post"}
            </button>
            <button
              onClick={() => setCurrentPage("home")}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
