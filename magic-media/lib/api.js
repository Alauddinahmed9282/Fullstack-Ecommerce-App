// API Configuration
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8200/backend/api";

export const IMAGE_URL =
  process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:8200/uploads";

// API Helper Functions
export const api = {
  // Auth
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (!response.ok && !data.status) {
        throw new Error(data.message || "Login failed");
      }
      return data;
    } catch (error) {
      return {
        status: false,
        message: error.message || "Login failed",
      };
    }
  },

  register: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok && !data.status) {
        throw new Error(data.message || "Registration failed");
      }
      return data;
    } catch (error) {
      return {
        status: false,
        message: error.message || "Registration failed",
      };
    }
  },

  // Posts
  getAllPosts: async () => {
    try {
      const response = await fetch(`${API_URL}/posts/getAllPost`);
      const data = await response.json();
      if (!response.ok && !data.status) {
        throw new Error(data.message || "Failed to fetch posts");
      }
      return data;
    } catch (error) {
      return {
        status: false,
        message: error.message || "Failed to fetch posts",
        data: [],
      };
    }
  },

  createPost: async (postData) => {
    try {
      const response = await fetch(`${API_URL}/posts/add`, {
        method: "POST",
        body: postData, // FormData, don't set Content-Type
      });
      const data = await response.json();
      if (!response.ok && !data.status) {
        throw new Error(data.message || "Failed to create post");
      }
      return data;
    } catch (error) {
      return {
        status: false,
        message: error.message || "Failed to create post",
      };
    }
  },

  getPostsByUser: async (userId) => {
    try {
      const response = await fetch(`${API_URL}/posts/getPostByUser/${userId}`);
      const data = await response.json();
      if (!response.ok && !data.status) {
        throw new Error(data.message || "Failed to fetch user posts");
      }
      return data;
    } catch (error) {
      return {
        status: false,
        message: error.message || "Failed to fetch user posts",
        data: [],
      };
    }
  },

  getPost: async (postId) => {
    try {
      const response = await fetch(`${API_URL}/posts/getPost/${postId}`);
      const data = await response.json();
      if (!response.ok && !data.status) {
        throw new Error(data.message || "Failed to fetch post");
      }
      return data;
    } catch (error) {
      return {
        status: false,
        message: error.message || "Failed to fetch post",
      };
    }
  },

  likePost: async (postId, userId) => {
    try {
      const response = await fetch(`${API_URL}/posts/like/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      if (!response.ok && !data.status) {
        throw new Error(data.message || "Failed to like post");
      }
      return data;
    } catch (error) {
      return {
        status: false,
        message: error.message || "Failed to like post",
      };
    }
  },

  deletePost: async (postId) => {
    try {
      const response = await fetch(`${API_URL}/posts/delete/${postId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok && !data.status) {
        throw new Error(data.message || "Failed to delete post");
      }
      return data;
    } catch (error) {
      return {
        status: false,
        message: error.message || "Failed to delete post",
      };
    }
  },

  updatePost: async (postId, postData) => {
    try {
      const response = await fetch(`${API_URL}/posts/update/${postId}`, {
        method: "PUT",
        body:
          postData instanceof FormData ? postData : JSON.stringify(postData),
        headers:
          postData instanceof FormData
            ? {}
            : { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok && !data.status) {
        throw new Error(data.message || "Failed to update post");
      }
      return data;
    } catch (error) {
      return {
        status: false,
        message: error.message || "Failed to update post",
      };
    }
  },

  // Users
  getAllUsers: async () => {
    try {
      const response = await fetch(`${API_URL}/users/getUsers`);
      const data = await response.json();
      if (!response.ok && !data.status) {
        throw new Error(data.message || "Failed to fetch users");
      }
      return data;
    } catch (error) {
      return {
        status: false,
        message: error.message || "Failed to fetch users",
        data: [],
      };
    }
  },

  getUser: async (userId) => {
    try {
      const response = await fetch(`${API_URL}/users/getUser/${userId}`);
      const data = await response.json();
      if (!response.ok && !data.status) {
        throw new Error(data.message || "Failed to fetch user");
      }
      return data;
    } catch (error) {
      return {
        status: false,
        message: error.message || "Failed to fetch user",
      };
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const response = await fetch(`${API_URL}/users/update/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok && !data.status) {
        throw new Error(data.message || "Failed to update user");
      }
      return data;
    } catch (error) {
      return {
        status: false,
        message: error.message || "Failed to update user",
      };
    }
  },

  followUser: async (userId, currentUserId) => {
    try {
      const response = await fetch(`${API_URL}/users/follow/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUserId }),
      });
      const data = await response.json();
      if (!response.ok && !data.status) {
        throw new Error(data.message || "Failed to follow user");
      }
      return data;
    } catch (error) {
      return {
        status: false,
        message: error.message || "Failed to follow user",
      };
    }
  },

  unfollowUser: async (userId, currentUserId) => {
    try {
      const response = await fetch(`${API_URL}/users/unfollow/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUserId }),
      });
      const data = await response.json();
      if (!response.ok && !data.status) {
        throw new Error(data.message || "Failed to unfollow user");
      }
      return data;
    } catch (error) {
      return {
        status: false,
        message: error.message || "Failed to unfollow user",
      };
    }
  },

  // Comments
  getComments: async (postId) => {
    try {
      const response = await fetch(`${API_URL}/posts/comment/get/${postId}`);
      const data = await response.json();
      if (!response.ok && !data.status) {
        throw new Error(data.message || "Failed to fetch comments");
      }
      return data;
    } catch (error) {
      return {
        status: false,
        message: error.message || "Failed to fetch comments",
        data: [],
      };
    }
  },

  addComment: async (commentData) => {
    try {
      const response = await fetch(`${API_URL}/posts/comment/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
      });
      const data = await response.json();
      if (!response.ok && !data.status) {
        throw new Error(data.message || "Failed to add comment");
      }
      return data;
    } catch (error) {
      return {
        status: false,
        message: error.message || "Failed to add comment",
      };
    }
  },

  deleteComment: async (commentId) => {
    try {
      const response = await fetch(
        `${API_URL}/posts/comment/delete/${commentId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (!response.ok && !data.status) {
        throw new Error(data.message || "Failed to delete comment");
      }
      return data;
    } catch (error) {
      return {
        status: false,
        message: error.message || "Failed to delete comment",
      };
    }
  },

  updateComment: async (commentId, commentData) => {
    try {
      const response = await fetch(
        `${API_URL}/posts/comment/update/${commentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(commentData),
        }
      );
      const data = await response.json();
      if (!response.ok && !data.status) {
        throw new Error(data.message || "Failed to update comment");
      }
      return data;
    } catch (error) {
      return {
        status: false,
        message: error.message || "Failed to update comment",
      };
    }
  },
};
