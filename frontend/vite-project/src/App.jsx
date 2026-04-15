
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import './App.css';

import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import Login from './Login';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ResetPassword from './pages/ResetPassword';

function LoginWrapper({ onLogin }) {
  const navigate = useNavigate();
  // We'll pass a callback to Login to handle navigation after login
  const handleLogin = (user) => {
    onLogin(user);
    navigate('/dashboard');
  };
  return <Login onLogin={handleLogin} />;
}

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginWrapper onLogin={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={user ? <DashboardLayout user={user} setUser={setUser} /> : <LoginWrapper onLogin={setUser} /> }>
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/dashboard/tasks" element={<Tasks />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/logout" element={<Logout />} />
        </Route>
      </Routes>
    </Router>
  );

// DashboardLayout wraps sidebar/topbar around dashboard pages
function DashboardLayout({ user, setUser }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar user={user} onLogout={handleLogout} />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
}

export default App;
