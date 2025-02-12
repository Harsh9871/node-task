import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Login from './components/Login';
import Admin from './components/Admin';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import Signup from './components/Signup';
import PageNotFound from './components/404';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/> } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/new" element={<TaskForm />} />
        <Route path="/tasks/:id/edit" element={<TaskForm />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/new" element={<UserForm />} />
        <Route path="/users/:id/edit" element={<UserForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;