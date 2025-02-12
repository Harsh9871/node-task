import React, { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const loggedInUserId = localStorage.getItem("userId"); // Get current user ID

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 403) {
      setError("You don’t have permission to manage users");
      return;
    }

    const data = await response.json();
    const filteredUsers = data.filter((user) => user._id !== loggedInUserId); // Exclude logged-in user
    setUsers(filteredUsers);
  };

  const confirmRoleChange = (userId, currentRole) => {
    const newRole = currentRole === "User" ? "Admin" : "User";
    const isConfirmed = window.confirm(
      `Are you sure you want to change the role to ${newRole}?`
    );

    if (isConfirmed) {
      changeUserRole(userId, newRole);
    }
  };

  const changeUserRole = async (userId, newRole) => {
    const response = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ role: newRole }),
    });

    if (response.ok) {
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: newRole } : user
      ));
    }
  };

  return (
    <div className={`min-h-screen p-6 transition-all ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Dark Mode Toggle */}
      <div className="flex justify-end">
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
        >
          {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </button>
      </div>

      <h1 className="text-3xl font-semibold text-center mb-6">User Management</h1>

      <div className={`p-6 rounded-lg shadow-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}>
        {error ? (
          <p className="text-center text-red-500 text-lg font-semibold">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className={`min-w-full shadow-md rounded-lg ${darkMode ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"}`}>
              <thead>
                <tr className={`${darkMode ? "bg-gray-600 text-white" : "bg-blue-500 text-white"}`}>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Role</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr
                      key={user._id}
                      className={`border-b transition ${
                        darkMode
                          ? index % 2 === 0
                            ? "bg-gray-800"
                            : "bg-gray-700"
                          : index % 2 === 0
                          ? "bg-white"
                          : "bg-gray-100"
                      } hover:bg-gray-600`}
                    >
                      <td className="py-3 px-6">{user.name}</td>
                      <td className="py-3 px-6">{user.email}</td>
                      <td className="py-3 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm ${
                            user.role === "Admin"
                              ? "bg-red-500"
                              : "bg-blue-500"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-6">
                        <button
                          onClick={() => confirmRoleChange(user._id, user.role)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium"
                        >
                          Change Role
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
