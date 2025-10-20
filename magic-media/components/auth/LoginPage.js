// Login Page
import { UserMinus, UserPlus } from "lucide-react";
import { useState } from "react";
import { API_URL } from "../../lib/api";

const LoginPage = ({ setCurrentUser, setCurrentPage }) => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailId, password }),
      });

      const data = await response.json();

      if (data.status) {
        localStorage.setItem("currentUser", JSON.stringify(data.data));
        setCurrentUser(data.data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600 mb-8">Login to continue to SocialHub</p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            onClick={handleLogin}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Login
          </button>
        </div>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => setCurrentPage("register")}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
