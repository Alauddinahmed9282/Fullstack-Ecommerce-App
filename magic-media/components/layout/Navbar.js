// Navbar Component
import { PlusSquare, User, LogOut, Home } from "lucide-react";
import { useState } from "react";

const Navbar = ({ currentUser, currentPage, setCurrentPage, handleLogout }) => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-indigo-600">SocialHub</h1>

            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage("home")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentPage === "home"
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </button>

              <button
                onClick={() => setCurrentPage("profile")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentPage === "profile"
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </button>

              <button
                onClick={() => setCurrentPage("create")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentPage === "create"
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <PlusSquare className="w-5 h-5" />
                <span>Create</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">
              {currentUser.username}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
