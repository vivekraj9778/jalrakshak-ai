import React, { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  User,
  Mail,
  Phone,
  Lock,
  UserPlus,
  AlertCircle,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      setError(
        "Please fill all required fields."
      );
      return;
    }

    if (formData.password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    try {
      setLoading(true);

      // IMPORTANT:
      // AuthContext register expects an object
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      navigate("/user-dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Registration failed:",
        error
      );

      setError(
        error.message ||
          "Registration failed."
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
            Create Account
          </h1>

          <p className="text-slate-400 text-sm mt-2">
            Join JalRakshak emergency response
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl">

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

            {/* NAME */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Full Name *
              </label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-flood-blue"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email *
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-flood-blue"
                />
              </div>
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Phone Number
              </label>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-flood-blue"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password *
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-flood-blue"
                />
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Confirm Password *
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-flood-blue"
                />
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-flood-blue hover:bg-flood-hover disabled:opacity-60 text-white font-bold text-sm"
            >
              <UserPlus className="w-4 h-4" />

              {loading
                ? "Creating account..."
                : "Create Account"}
            </button>

          </form>

          {/* LOGIN LINK */}
          <div className="text-center mt-6 pt-5 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Already have an account?
            </p>

            <Link
              to="/login"
              className="inline-block mt-2 text-sm font-bold text-flood-blue hover:underline"
            >
              Login
            </Link>
          </div>

        </div>

        {/* HOME LINK */}
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