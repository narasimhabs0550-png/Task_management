

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
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm border-b">
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold text-gray-800">{pageName}</span>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative">
          <span className="material-icons text-gray-500 text-2xl">notifications</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">1</span>
        </button>
        <span className="font-semibold text-gray-700">{user?.name || 'User'}</span>
        <button onClick={handleLogoutClick} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition font-semibold">Logout</button>
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
