import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [view, setView] = useState("login"); // login | register | forgot
  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // Register state
  const [reg, setReg] = useState({ name: "", email: "", password: "" });
  const [regSubmitted, setRegSubmitted] = useState(false);
  // Forgot state
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSubmitted, setForgotSubmitted] = useState(false);


  // Error/success state
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  // Checkbox state
  const [checked, setChecked] = useState(false);

  // Backend URL
  const API_URL = "http://localhost:5000";

  // Handlers
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginEmail, password: loginPassword })
      });
      const data = await res.json();
      if (res.ok && data.access_token) {
        localStorage.setItem("token", data.access_token);
        if (onLogin) onLogin({ name: loginEmail });
      } else {
        setLoginError(data.msg || "Login failed");
      }
    } catch (err) {
      setLoginError("Network error");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError("");
    setRegisterSuccess(false);
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: reg.email, password: reg.password })
      });
      const data = await res.json();
      if (res.ok) {
        setRegisterSuccess(true);
        setRegSubmitted(true);
      } else {
        setRegisterError(data.msg || "Registration failed");
      }
    } catch (err) {
      setRegisterError("Network error");
    }
  };

  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");

  const handleForgot = async (e) => {
    e.preventDefault();
    setForgotError("");
    setForgotSuccess("");
    try {
      const res = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: forgotEmail })
      });
      const data = await res.json();
      if (res.ok) {
        setForgotSuccess(data.msg || "If this email exists, a reset link has been sent.");
        setForgotSubmitted(true);
      } else {
        setForgotError(data.msg || "Something went wrong");
      }
    } catch (err) {
      setForgotError("Network error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg font-sans text-primary p-6">
      <main className="w-full max-w-[900px] grid md:grid-cols-2 bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* LEFT SIDE */}
        <section className="hidden md:flex flex-col justify-center items-center bg-primary text-white p-12">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-3xl font-bold">⏱</div>
            <h1 className="text-4xl font-extrabold mb-2">Task Manager</h1>
            <p className="text-lg text-gray-200 text-center">Professional SaaS dashboard for managing your tasks and workflow.</p>
          </div>
        </section>
        {/* RIGHT SIDE */}
        <section className="p-8 md:p-16 flex flex-col justify-center bg-white">
          <div className="max-w-sm mx-auto w-full">
            {view === "login" && (
              <>
                <h2 className="text-3xl font-extrabold text-primary mb-2">Welcome Back</h2>
                <p className="text-gray-500 mb-8">Sign in to your account</p>
                <form className="space-y-6" onSubmit={handleLogin}>
                  {loginError && <div className="text-red-600 text-center font-semibold">{loginError}</div>}
                  <div>
                    <label className="text-sm font-semibold text-primary">Email</label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      className="w-full p-3 mt-2 rounded-lg bg-gray-100 focus:ring-2 focus:ring-accent outline-none"
                      value={loginEmail}
                      onChange={e => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-semibold text-primary">Password</label>
                      <span className="text-accent-dark font-bold hover:underline cursor-pointer text-xs" onClick={() => setView("forgot")}>Forgot?</span>
                    </div>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full p-3 mt-2 rounded-lg bg-gray-100 focus:ring-2 focus:ring-accent outline-none"
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="login-check"
                      checked={checked}
                      onChange={e => setChecked(e.target.checked)}
                    />
                    <span className="text-sm">I agree to the terms</span>
                  </div>
                  <button
                    className="w-full bg-accent text-white py-3 rounded-lg font-bold hover:bg-accent-dark transition disabled:opacity-60"
                    type="submit"
                    disabled={!checked}
                  >
                    Sign In →
                  </button>
                </form>
                <div className="mt-8 text-center text-gray-500">Or continue with</div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <button className="flex items-center justify-center gap-2 border p-2 rounded-lg font-semibold hover:bg-gray-50 transition">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="w-5 h-5" />
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-2 border p-2 rounded-lg font-semibold hover:bg-gray-50 transition">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" alt="Apple" className="w-5 h-5" />
                    Apple
                  </button>
                </div>
                <p className="mt-6 text-center text-gray-500">
                  New user?{' '}
                  <button className="text-accent-dark font-bold hover:underline" onClick={() => setView("register")}>Sign Up</button>
                </p>
              </>
            )}
            {view === "register" && (
              <>
                <h2 className="text-2xl font-bold mb-4 text-yellow-700">Register</h2>
                {registerSuccess ? (
                  <p className="text-green-600">Registration successful! You can now log in.</p>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-6">
                    {registerError && <div className="text-red-600 text-center font-semibold">{registerError}</div>}
                    <div>
                      <label className="block text-sm font-semibold mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-yellow-400 outline-none"
                        placeholder="Your Name"
                        value={reg.name}
                        onChange={e => setReg({ ...reg, name: e.target.value })}
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
                        value={reg.email}
                        onChange={e => setReg({ ...reg, email: e.target.value })}
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
                        value={reg.password}
                        onChange={e => setReg({ ...reg, password: e.target.value })}
                        required
                      />
                    </div>
                    <button className="w-full bg-yellow-600 text-white py-3 rounded-lg font-bold hover:scale-95 transition" type="submit">
                      Register
                    </button>
                  </form>
                )}
                <p className="mt-6 text-center text-gray-500">
                  Already have an account?{' '}
                  <button className="text-yellow-700 font-bold" onClick={() => { setView("login"); setRegSubmitted(false); }}>Login</button>
                </p>
              </>
            )}
            {view === "forgot" && (
              <>
                <h2 className="text-2xl font-bold mb-4 text-yellow-700">Forgot Password</h2>
                {forgotSubmitted && forgotSuccess && (
                  <p className="text-green-600">{forgotSuccess}</p>
                )}
                {forgotError && (
                  <p className="text-red-600">{forgotError}</p>
                )}
                {!forgotSubmitted && (
                  <form onSubmit={handleForgot} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold mb-1">Email</label>
                      <input
                        type="email"
                        className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-yellow-400 outline-none"
                        placeholder="name@company.com"
                        value={forgotEmail}
                        onChange={e => setForgotEmail(e.target.value)}
                        required
                      />
                    </div>
                    <button className="w-full bg-yellow-600 text-white py-3 rounded-lg font-bold hover:scale-95 transition" type="submit">
                      Send Reset Link
                    </button>
                  </form>
                )}
                <p className="mt-6 text-center text-gray-500">
                  Back to{' '}
                  <button className="text-yellow-700 font-bold" onClick={() => { setView("login"); setForgotSubmitted(false); }}>Login</button>
                </p>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;