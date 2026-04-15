import React, { useState } from "react";

export default function Profile() {
  // Example user data (replace with real data from context or API)
  const [user, setUser] = useState({
    name: "Kritya M",
    email: "kritya@example.com",
    joined: "2024-04-14",
    avatar: "https://ui-avatars.com/api/?name=Kritya+M&background=0D8ABC&color=fff"
  });

  // Personal info state
  const [name, setName] = useState(user.name);
  const [email] = useState(user.email);
  const [saving, setSaving] = useState(false);
  const [infoMsg, setInfoMsg] = useState("");
  const [infoError, setInfoError] = useState("");

  // Password state
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [pwdSaving, setPwdSaving] = useState(false);

  // Handlers
  const handleInfoSubmit = (e) => {
    e.preventDefault();
    setInfoMsg("");
    setInfoError("");
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      if (name.trim().length < 2) {
        setInfoError("Name must be at least 2 characters.");
      } else {
        setUser((u) => ({ ...u, name }));
        setInfoMsg("Profile updated successfully.");
      }
      setSaving(false);
    }, 1000);
  };

  const handlePwdSubmit = (e) => {
    e.preventDefault();
    setPwdMsg("");
    setPwdError("");
    setPwdSaving(true);
    // Simulate API call
    setTimeout(() => {
      if (!currentPwd || !newPwd || !confirmPwd) {
        setPwdError("All fields are required.");
      } else if (newPwd.length < 6) {
        setPwdError("New password must be at least 6 characters.");
      } else if (newPwd !== confirmPwd) {
        setPwdError("Passwords do not match.");
      } else {
        setPwdMsg("Password updated successfully.");
        setCurrentPwd("");
        setNewPwd("");
        setConfirmPwd("");
      }
      setPwdSaving(false);
    }, 1200);
  };

  return (
    <div className="flex-1 min-h-90vh] flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-2">
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col gap-4">
          {/* Profile Row */}
          <div className="flex items-center gap-4 border-b pb-4">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-16 h-16 rounded-full border-2 border-yellow-100 object-cover"
            />
            <div>
              <div className="text-lg font-semibold">{user.name}</div>
              <div className="text-gray-500 text-sm">{user.email}</div>
              <div className="text-xs text-gray-400">Joined {user.joined}</div>
            </div>
          </div>
          {/* Personal Info */}
          <form className="w-full" onSubmit={handleInfoSubmit} autoComplete="off">
            <div className="font-semibold mb-2 text-gray-700">Personal Info</div>
            <div className="mb-2">
              <label className="block text-xs mb-1">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={saving}
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 rounded border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed text-sm"
                value={email}
                disabled
              />
            </div>
            {infoMsg && <div className="text-green-600 text-xs mb-2">{infoMsg}</div>}
            {infoError && <div className="text-red-500 text-xs mb-2">{infoError}</div>}
            <button
              type="submit"
              className="w-full py-2 rounded bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition disabled:opacity-60 text-sm"
              disabled={saving}
            >
              {saving ? "Saving..." : "Update Info"}
            </button>
          </form>
          {/* Divider */}
          <div className="border-t my-2" />
          {/* Change Password */}
          <form className="w-full" onSubmit={handlePwdSubmit} autoComplete="off">
            <div className="font-semibold mb-2 text-gray-700">Change Password</div>
            <div className="mb-2">
              <label className="block text-xs mb-1">Current Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm"
                value={currentPwd}
                onChange={e => setCurrentPwd(e.target.value)}
                disabled={pwdSaving}
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs mb-1">New Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm"
                value={newPwd}
                onChange={e => setNewPwd(e.target.value)}
                disabled={pwdSaving}
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs mb-1">Confirm Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm"
                value={confirmPwd}
                onChange={e => setConfirmPwd(e.target.value)}
                disabled={pwdSaving}
                required
              />
            </div>
            {pwdMsg && <div className="text-green-600 text-xs mb-2">{pwdMsg}</div>}
            {pwdError && <div className="text-red-500 text-xs mb-2">{pwdError}</div>}
            <button
              type="submit"
              className="w-full py-2 rounded bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition disabled:opacity-60 text-sm"
              disabled={pwdSaving}
            >
              {pwdSaving ? "Updating..." : "Update Password"}
            </button>
          </form>
          {/* Divider */}
          <div className="border-t my-2" />
          {/* Account Actions */}
          <div className="w-full flex flex-col gap-2 mt-1">
            <LogoutButton />
            <button
              className="w-full py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-red-100 transition border border-gray-300 text-sm"
              // onClick={deleteAccountHandler}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// LogoutButton component with confirmation and redirect
import { useNavigate } from 'react-router-dom';
function LogoutButton() {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => setShowConfirm(true);
  const confirmLogout = () => {
    localStorage.removeItem('token');
    setShowConfirm(false);
    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 350);
  };
  return (
    <>
      <button
        className="w-full py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition"
        onClick={handleLogout}
      >
        Logout
      </button>
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
    </>
  );
}
