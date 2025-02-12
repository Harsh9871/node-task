import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-all ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } p-6`}
    >
      {/* Dark Mode Toggle */}
      <div className="absolute top-6 right-6">
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
        >
          {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </button>
      </div>

      <div
        className={`p-8 rounded-lg shadow-lg max-w-md w-full text-center transition-all ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>
        <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Manage users and tasks efficiently
        </p>
        <div className="space-y-4">
          <Link
            to="/users"
            className="block w-full bg-blue-500 hover:bg-blue-600 transition text-white py-3 px-6 rounded-lg shadow-lg text-lg font-medium"
          >
            👤 Manage Users
          </Link>
          <Link
            to="/tasks"
            className="block w-full bg-green-500 hover:bg-green-600 transition text-white py-3 px-6 rounded-lg shadow-lg text-lg font-medium"
          >
            ✅ Manage Tasks
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;
