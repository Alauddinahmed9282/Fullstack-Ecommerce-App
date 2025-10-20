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
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import Navbar from "../components/layout/Navbar";
import HomePage from "../components/posts/HomePage";
import ProfilePage from "../components/profile/ProfilePage";
import CreatePostPage from "../components/posts/CreatePostPage";

const API_URL = "http://localhost:8200/backend/api";

const SocialMediaApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("login");
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setCurrentPage("home");
    }
  }, []);

  useEffect(() => {
    if (currentUser && currentPage === "home") {
      fetchPosts();
      fetchUsers();
    }
  }, [currentUser, currentPage]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/posts/getAllPost`);
      const data = await response.json();
      if (data.status) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users/getUsers`);
      const data = await response.json();
      if (data.status) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setCurrentPage("login");
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
            users={users}
            setSelectedUser={setSelectedUser}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === "profile" && (
          <ProfilePage
            user={selectedUser || currentUser}
            currentUser={currentUser}
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
      </div>
    </div>
  );
};

export default SocialMediaApp;
