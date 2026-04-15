import React, { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-yellow-700">Register</h2>
        {submitted ? (
          <p className="text-green-600">Registration successful! You can now log in.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="name@company.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Password</label>
              <input
                type="password"
                name="password"
                className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <button className="w-full bg-yellow-600 text-white py-3 rounded-lg font-bold hover:scale-95 transition" type="submit">
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
