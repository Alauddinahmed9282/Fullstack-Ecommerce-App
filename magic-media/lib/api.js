// API Configuration
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8200/backend/api";

// API Helper Functions
export const api = {
  // Auth
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  // Posts
  getAllPosts: async () => {
    const response = await fetch(`${API_URL}/posts/getAllPost`);
    return response.json();
  },

  createPost: async (postData) => {
    const response = await fetch(`${API_URL}/posts/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
    return response.json();
  },

  likePost: async (postId, userId) => {
    const response = await fetch(`${API_URL}/posts/like/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    return response.json();
  },

  // Users
  getAllUsers: async () => {
    const response = await fetch(`${API_URL}/users/getUsers`);
    return response.json();
  },

  followUser: async (userId, currentUserId) => {
    const response = await fetch(`${API_URL}/users/follow/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUserId }),
    });
    return response.json();
  },

  unfollowUser: async (userId, currentUserId) => {
    const response = await fetch(`${API_URL}/users/unfollow/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUserId }),
    });
    return response.json();
  },

  // Comments
  getComments: async (postId) => {
    const response = await fetch(`${API_URL}/posts/comment/get/${postId}`);
    return response.json();
  },

  addComment: async (commentData) => {
    const response = await fetch(`${API_URL}/posts/comment/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    });
    return response.json();
  },

  deleteComment: async (commentId) => {
    const response = await fetch(
      `${API_URL}/posts/comment/delete/${commentId}`,
      {
        method: "DELETE",
      }
    );
    return response.json();
  },
};
