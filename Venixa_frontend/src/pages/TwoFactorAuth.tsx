import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const API = "/api";

const TwoFactorAuth: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const tempToken = sessionStorage.getItem("2fa_temp_token");
  const maskedPhone =
    sessionStorage.getItem("2fa_phone") || "your mobile number";

  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (!isVerified && !sessionStorage.getItem("2fa_temp_token"))
      navigate("/login", { replace: true });
  }, [isVerified]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (otp.length !== 4) {
      setError("Please enter the 4-digit code");
      return;
    }

    console.log("[2FA] Starting verification with OTP:", otp);
    setIsVerifying(true);
    try {
      console.log("[2FA] Sending request to /auth/verify-2fa");
      const res = await fetch(`${API}/auth/verify-2fa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tempToken, otp }),
      });
      console.log("[2FA] Response status:", res.status);
      const data = await res.json();
      console.log("[2FA] Response data:", data);

      if (!res.ok) {
        console.log("[2FA] Verification failed:", data.error);
        setError(data.error || "Verification failed");
        return;
      }

      console.log("[2FA] Verification successful, storing tokens");
      // Store tokens, clear 2FA session data
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      sessionStorage.removeItem("2fa_temp_token");
      sessionStorage.removeItem("2fa_phone");
      console.log(
        "[2FA] token stored:",
        localStorage.getItem("token")?.slice(0, 20),
      );
      console.log(
        "[2FA] Stored token confirmed:",
        !!localStorage.getItem("token"),
      );
      setIsVerified(true);
      console.log("[2FA] Redirecting to main app...");
      navigate("/", { replace: true });
    } catch (err) {
      console.error("[2FA] Network error:", err);
      setError("Network error. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError("");
    try {
      const res = await fetch(`${API}/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tempToken }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to resend OTP");
        return;
      }
      setTimeLeft(60);
      setCanResend(false);
      setOtp("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex min-h-screen font-[Inter]">
      {/* Left Panel */}
      <div className="hidden md:flex flex-1 relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#e66a1d] to-[#c94f0f]" />
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
        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="flex items-center mb-12">
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
            <h1 className="ml-3 text-2xl font-bold tracking-[0.3em]">VENIXA</h1>
          </div>
          <p className="uppercase text-xs tracking-[0.3em] opacity-80 mb-4">
            Trusted Spiritual Platform
          </p>
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Sacred Rituals,
            <br />
            Verified Pandits.
          </h1>
          <p className="text-lg opacity-90 max-w-md mb-8">
            Book experienced Pandits for authentic Poojas, Homas, and spiritual
            ceremonies across India.
          </p>
          <div className="flex gap-8 text-sm opacity-90">
            <span>• 10,000+ Pandits</span>
            <span>• 500+ Cities</span>
            <span>• 50,000+ Poojas</span>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl">
          {/* Icon */}
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Verify Your Mobile
          </h2>
          <p className="text-gray-500 mb-1 text-center text-sm">
            We sent a 4-digit code via WhatsApp to
          </p>
          <p className="text-orange-600 font-semibold text-center mb-6">
            {maskedPhone}
          </p>

          <form onSubmit={handleVerify}>
            <div className="mb-6">
              <label className="text-sm text-gray-600 block mb-3 text-center">
                Enter OTP
              </label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={4}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup>
                    {[0, 1, 2, 3].map((index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
              )}
            </div>

            <div className="text-center mb-6">
              {timeLeft > 0 ? (
                <p className="text-sm text-gray-500">
                  Code expires in{" "}
                  <span className="font-semibold text-orange-600">
                    {timeLeft}s
                  </span>
                </p>
              ) : (
                <p className="text-sm text-red-500">
                  Code expired. Please request a new one.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isVerifying || otp.length !== 4}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Verify Code →"
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            {canResend ? (
              <button
                onClick={handleResend}
                disabled={isResending}
                className="text-orange-600 hover:underline text-sm disabled:opacity-50"
              >
                {isResending ? "Sending..." : "Resend WhatsApp code"}
              </button>
            ) : (
              <p className="text-sm text-gray-400">
                Resend available in {timeLeft}s
              </p>
            )}
          </div>

          <p className="text-center text-sm text-gray-600 mt-4">
            <button
              onClick={() => navigate("/login")}
              className="text-orange-600 hover:underline"
            >
              ← Back to login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
