import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic email validation
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    // Simulate API call
    setIsSubmitted(true);
  };

  return (
    <div className="flex min-h-screen font-[Inter]">
      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-1 relative overflow-hidden text-white">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#e66a1d] to-[#c94f0f]" />

        {/* Floral Pattern SVG */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="mandala"
                x="0"
                y="0"
                width="200"
                height="200"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="40"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
                <path
                  d="M100 20 L120 80 L180 100 L120 120 L100 180 L80 120 L20 100 L80 80 Z"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mandala)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16">
          {/* Logo */}
          <div className="flex items-center mb-12">
            <div className="w-10 h-10 flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                <path
                  d="M12 2C10 6 6 8 6 12a6 6 0 0012 0c0-4-4-6-6-10z"
                  opacity="0.8"
                />
                <path
                  d="M12 6c-1.5 3-4 4.5-4 6.5a4 4 0 008 0C16 10.5 13.5 9 12 6z"
                  opacity="0.6"
                />
              </svg>
            </div>
            <h1 className="ml-3 text-2xl font-bold tracking-[0.3em]">VENIXA</h1>
          </div>

          {/* Subtitle */}
          <p className="uppercase text-xs tracking-[0.3em] opacity-80 mb-4">
            Trusted Spiritual Platform
          </p>

          {/* Heading */}
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Sacred Rituals,
            <br />
            Verified Pandits.
          </h1>

          {/* Description */}
          <p className="text-lg opacity-90 max-w-md mb-8">
            Book experienced Pandits for authentic Poojas, Homas, and spiritual
            ceremonies across India.
          </p>

          {/* Stats */}
          <div className="flex gap-8 text-sm opacity-90">
            <span>• 10,000+ Pandits</span>
            <span>• 500+ Cities</span>
            <span>• 50,000+ Poojas</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl">
          {!isSubmitted ? (
            <>
              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Forgot your password?
              </h2>
              <p className="text-gray-500 mb-6">
                No worries! Enter your email and we'll send you a reset link.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="text-sm text-gray-600">Email</label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    required
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-orange-700 transition"
                >
                  Send Reset Link →
                </button>
              </form>

              {/* Back to Login */}
              <p className="text-center text-sm text-gray-600 mt-6">
                Remember your password?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-orange-600 hover:underline"
                >
                  Back to login
                </button>
              </p>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Check your email
                </h2>
                <p className="text-gray-500 mb-6">
                  We've sent a password reset link to{" "}
                  <span className="font-semibold text-gray-700">{email}</span>
                </p>
                <p className="text-sm text-gray-400 mb-6">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-orange-600 hover:underline text-sm"
                >
                  Try another email
                </button>
              </div>

              {/* Back to Login */}
              <p className="text-center text-sm text-gray-600 mt-6">
                <button
                  onClick={() => navigate("/login")}
                  className="text-orange-600 hover:underline"
                >
                  Back to login
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
