import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const [showConfirm, setShowConfirm] = useState(true);
  const navigate = useNavigate();

  const confirmLogout = () => {
    localStorage.removeItem('token');
    setShowConfirm(false);
    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 350);
  };

  return (
    <div className="p-8 w-full flex flex-col items-center justify-center">
      <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-red-700">Logout</h2>
        <p className="mb-6 text-gray-600">Are you sure you want to logout?</p>
        {showConfirm && (
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
        )}
        {!showConfirm && (
          <div className="text-green-600 font-semibold mt-4">Logged out! Redirecting...</div>
        )}
      </div>
    </div>
  );
}
