

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const PAGE_NAMES = {
  '/dashboard': 'Dashboard',
  '/dashboard/tasks': 'Tasks',
  '/dashboard/profile': 'Profile',
};

export default function Topbar({ user, onLogout }) {
  const location = useLocation();
  const pageName = PAGE_NAMES[location.pathname] || '';
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogoutClick = () => setShowConfirm(true);
  const handleCancel = () => setShowConfirm(false);
  const handleConfirm = () => {
    setShowConfirm(false);
    onLogout();
  };

  return (
    <header className="flex items-center justify-between px-8 py-3 bg-gray-800 shadow-md border-b border-gray-700">
      <div className="flex items-center gap-4">
        <span className="text-2xl font-extrabold text-white tracking-wide drop-shadow">{pageName}</span>
      </div>
      <div className="flex items-center gap-6">
        <span className="flex items-center gap-2 font-semibold text-white bg-gray-700 px-3 py-1 rounded-full shadow">
          <span className="inline-block w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-base">
            {user?.name ? user.name[0].toUpperCase() : 'U'}
          </span>
          {user?.name || 'User'}
        </span>
        <button onClick={handleLogoutClick} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition font-semibold shadow">Logout</button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xs text-center">
            <h3 className="text-lg font-bold mb-4 text-red-700">Confirm Logout</h3>
            <p className="mb-6 text-gray-600">Are you sure you want to logout?</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleConfirm}
                className="px-6 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
