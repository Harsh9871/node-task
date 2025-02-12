import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchUserRole();
    fetchTasks();
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

  const fetchUserRole = async () => {
    const response = await fetch("http://localhost:5000/auth/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    const data = await response.json();
    setUserRole(data.role);
    setUserId(data.id);
  };

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:5000/tasks", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await response.json();
    setTasks(data);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    const task = { title, description, status, dueDate };

    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(task),
    });

    if (response.ok) {
      setTitle("");
      setDescription("");
      setStatus("Pending");
      setDueDate("");
      fetchTasks();
    }
  };

  const handleUpdateTask = async (taskId) => {
    const task = { title, description, status, dueDate };

    const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(task),
    });

    if (response.ok) {
      setEditingTaskId(null);
      fetchTasks();
    }
  };

  const handleDeleteTask = async (taskId) => {
    const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    if (response.ok) {
      fetchTasks();
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

      <h1 className="text-3xl font-semibold text-center mb-6">Task Management</h1>

      {/* Add Task Form */}
      <div className={`p-6 rounded-lg shadow-lg mb-6 ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}>
        <h2 className="text-2xl font-semibold mb-4">{editingTaskId ? "Edit Task" : "Add Task"}</h2>
        <form onSubmit={editingTaskId ? () => handleUpdateTask(editingTaskId) : handleAddTask} className="space-y-4">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"}`}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"}`}
            required
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"}`}
            required
          />
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold">
            {editingTaskId ? "Update Task" : "Create Task"}
          </button>
        </form>
      </div>

      {/* Task List */}
      <div className={`p-6 rounded-lg shadow-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}>
        <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task._id} className={`p-4 border-l-4 rounded-lg shadow-md flex justify-between items-center ${darkMode ? "bg-gray-700 border-blue-400" : "bg-gray-50 border-blue-500"}`}>
              <div>
                <h3 className="text-xl font-bold">{task.title}</h3>
                <p>{task.description}</p>
                <p className="text-sm">Status: <span className="font-medium">{task.status}</span></p>
                <p className="text-sm">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
              </div>

              {(userRole === "Admin" || task.creator === userId) && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingTaskId(task._id);
                      setTitle(task.title);
                      setDescription(task.description);
                      setStatus(task.status);
                      setDueDate(task.dueDate.split("T")[0]);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
