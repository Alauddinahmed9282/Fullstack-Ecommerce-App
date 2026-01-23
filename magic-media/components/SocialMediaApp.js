import React, { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  UserPlus,
  UserMinus,
  Trash2,
  Send,
  LogOut,
  Home,
  User,
  PlusSquare,
} from "lucide-react";
import { api, IMAGE_URL } from "../lib/api";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import Navbar from "../components/layout/Navbar";
import HomePage from "../components/posts/HomePage";
import ProfilePage from "../components/profile/ProfilePage";
import CreatePostPage from "../components/posts/CreatePostPage";
import EditPostPage from "../components/posts/EditPostPage";

const SocialMediaApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("currentUser");
        setCurrentPage("login");
      }
    } else {
      setCurrentPage("login");
    }
  }, []);

  // Save currentUser to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && currentPage === "home") {
      fetchPosts();
      fetchUsers();
    }
  }, [currentUser, currentPage]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await api.getAllPosts();
      if (data.status && data.data) {
        setPosts(data.data);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await api.getAllUsers();
      if (data.status && data.data) {
        setUsers(data.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setCurrentPage("login");
    setPosts([]);
    setUsers([]);
  };

  if (!currentUser) {
    return currentPage === "login" ? (
      <LoginPage
        setCurrentUser={setCurrentUser}
        setCurrentPage={setCurrentPage}
      />
    ) : (
      <RegisterPage setCurrentPage={setCurrentPage} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        currentUser={currentUser}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        handleLogout={handleLogout}
      />

      <div className="max-w-6xl mx-auto px-4 py-6">
        {currentPage === "home" && (
          <HomePage
            posts={posts}
            setPosts={setPosts}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            users={users}
            setSelectedUser={setSelectedUser}
            setCurrentPage={setCurrentPage}
            setEditingPostId={setEditingPostId}
            loading={loading}
          />
        )}
        {currentPage === "profile" && (
          <ProfilePage
            user={selectedUser || currentUser}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === "create" && (
          <CreatePostPage
            currentUser={currentUser}
            setCurrentPage={setCurrentPage}
            fetchPosts={fetchPosts}
          />
        )}
        {currentPage === "edit" && editingPostId && (
          <EditPostPage
            postId={editingPostId}
            currentUser={currentUser}
            setCurrentPage={setCurrentPage}
            fetchPosts={fetchPosts}
          />
        )}
      </div>
    </div>
  );
};

export default SocialMediaApp;
