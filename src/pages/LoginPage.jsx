import React, { useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  ShieldAlert,
  Mail,
  Lock,
  LogIn,
  UserPlus,
  AlertCircle,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const from =
    location.state?.from?.pathname || null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError(
        "Please enter email and password."
      );
      return;
    }

    try {
      setLoading(true);

      // IMPORTANT:
      // AuthContext login expects an object
      const loggedInUser = await login({
        email: email.trim(),
        password,
      });

      if (loggedInUser?.role === "admin") {
        navigate(
          from || "/dashboard",
          {
            replace: true,
          }
        );
      } else {
        navigate(
          "/user-dashboard",
          {
            replace: true,
          }
        );
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error
      );

      setError(
        error.message ||
          "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white p-2 shadow-xl">
            <img
              src="/logo.png"
              alt="JalRakshak AI"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>

          <h1 className="text-3xl font-black text-white mt-5">
            JalRakshak AI
          </h1>

          <p className="text-slate-400 text-sm mt-2">
            Flood Emergency Response System
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-flood-blue" />
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900">
                Welcome Back
              </h2>

              <p className="text-xs text-slate-500">
                Login to continue
              </p>
            </div>

          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-5 flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* EMAIL */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address
              </label>

              <div className="relative">

                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-flood-blue"
                />

              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
              </label>

              <div className="relative">

                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter your password"
                  className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-flood-blue"
                />

              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-flood-blue hover:bg-flood-hover disabled:opacity-60 text-white font-bold text-sm transition-colors"
            >

              <LogIn className="w-4 h-4" />

              {loading
                ? "Signing in..."
                : "Login"}

            </button>

          </form>

          {/* REGISTER */}
          <div className="text-center mt-6 pt-5 border-t border-slate-100">

            <p className="text-xs text-slate-500">
              Don't have an account?
            </p>

            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 mt-2 text-sm font-bold text-flood-blue hover:underline"
            >
              <UserPlus className="w-4 h-4" />
              Create a new account
            </Link>

          </div>

        </div>

        {/* HOME */}
        <Link
          to="/"
          className="block text-center text-xs text-slate-500 hover:text-white mt-5"
        >
          ← Return to public home
        </Link>

      </div>
    </div>
  );
};