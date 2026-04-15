import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const menu = [
  { name: 'Dashboard', path: '/dashboard', icon: <span>🏠</span> },
  { name: 'Tasks', path: '/dashboard/tasks', icon: <span>📝</span> },
  { name: 'Profile', path: '/dashboard/profile', icon: <span>👤</span> },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('token');
    setShowConfirm(false);
    setTimeout(() => {
      navigate('/');
      window.location.reload(); // Ensures user state is cleared everywhere
    }, 350);
  };

  return (
    <aside className={`h-screen bg-gray-800 text-white flex flex-col transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4">
        <span className="text-2xl font-bold">{!collapsed && 'Task Manager'}</span>
        <button onClick={() => setCollapsed(c => !c)} className="focus:outline-none">
          <span>{collapsed ? '➡️' : '⬅️'}</span>
        </button>
      </div>
      <nav className="flex flex-col gap-2 mt-4">
        {menu.map(item => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-gray-700 ${isActive ? 'bg-gray-700 font-bold' : ''}`
            }
            end={item.path === '/dashboard'}
          >
            <span className="text-xl">{item.icon}</span>
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-red-600 text-red-400 hover:text-white font-semibold mt-2"
        >
          <span className="text-xl">🚪</span>
          {!collapsed && <span>Logout</span>}
        </button>
      </nav>
      {/* Confirmation Popup */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xs text-center">
            <h3 className="text-lg font-bold mb-4 text-red-700">Confirm Logout</h3>
            <p className="mb-6 text-gray-600">Are you sure you want to logout?</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={confirmLogout}
                className="px-6 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-6 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
