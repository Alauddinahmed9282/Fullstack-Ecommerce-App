// Register Page
import { UserMinus, UserPlus } from "lucide-react";
import { useState } from "react";
import { API_URL } from "../../lib/api";

const RegisterPage = ({ setCurrentPage }) => {
  const [username, setUsername] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, emailId, mobile, password, gender }),
      });

      if (response.ok) {
        setMessage("Registration successful! Please login.");
        setTimeout(() => setCurrentPage("login"), 2000);
      }
    } catch (error) {
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Create Account
        </h2>
        <p className="text-gray-600 mb-8">Join SocialHub today</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {message && (
            <div
              className={`text-sm ${message.includes("successful") ? "text-green-500" : "text-red-500"}`}
            >
              {message}
            </div>
          )}

          <button
            onClick={handleRegister}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Register
          </button>
        </div>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => setCurrentPage("login")}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
