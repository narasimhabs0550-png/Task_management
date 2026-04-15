import React, { useState } from "react";

export default function ResetPassword() {
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  // Get token from URL
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }
    if (newPwd.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPwd !== confirmPwd) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPwd })
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Password reset successful! You can now log in.");
      } else {
        setError(data.msg || "Reset failed");
      }
    } catch {
      setError("Network error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-yellow-700">Reset Password</h2>
        {msg ? (
          <p className="text-green-600">{msg}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="text-red-600 text-center font-semibold">{error}</div>}
            <div>
              <label className="block text-sm font-semibold mb-1">New Password</label>
              <input
                type="password"
                className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="New password"
                value={newPwd}
                onChange={e => setNewPwd(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Confirm Password</label>
              <input
                type="password"
                className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="Confirm password"
                value={confirmPwd}
                onChange={e => setConfirmPwd(e.target.value)}
                required
              />
            </div>
            <button className="w-full bg-yellow-600 text-white py-3 rounded-lg font-bold hover:scale-95 transition" type="submit">
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
