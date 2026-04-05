import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const API = "http://localhost:5000/api";

const LeftPanel = () => (
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
);

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("phone");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [step, setStep] = useState<"input" | "otp" | "password">(
    loginMethod === "phone" ? "otp" : "password",
  );

  const handleSendOTP = async () => {
    setError("");
    const phoneRegex = /^\+?[1-9]\d{6,14}$/;

    if (phone.length < 7) {
      setError("Mobile number is required");
      return;
    }
    const cleanPhone = "+" + phone.replace(/^\+/, "");
    if (!phoneRegex.test(cleanPhone)) {
      setError("Please enter a valid mobile number");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API}/auth/check-user-phone`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleanPhone }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 404) {
          setError("Mobile number not registered. Please sign up first.");
          return;
        }
        setError(data.error || "Failed to check user");
        return;
      }

      const otpRes = await fetch(`${API}/auth/send-login-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleanPhone }),
      });
      const otpData = await otpRes.json();

      if (!otpRes.ok) {
        setError(otpData.error || "Failed to send OTP");
        return;
      }

      setOtpSent(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setError("");

    if (!otp || otp.length !== 4) {
      setError("Please enter the 4-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API}/auth/verify-login-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: "+" + phone, otp }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Verification failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/", { replace: true });
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    console.log("handleEmailLogin called");
    console.log("email:", email);
    console.log("password:", password);
    setError("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    console.log("trimmedEmail:", trimmedEmail);
    console.log("trimmedPassword:", trimmedPassword);

    if (!trimmedEmail) {
      setError("Email is required");
      return;
    }
    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!trimmedPassword) {
      setError("Password is required");
      return;
    }
    if (!agreeTerms) {
      setError("Please agree to the Privacy Policy and Terms of Service");
      return;
    }

    console.log("Sending login request:", {
      loginInput: trimmedEmail,
      password: trimmedPassword,
    });

    setIsLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          loginInput: trimmedEmail,
          password: trimmedPassword,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      if (data.requires2FA) {
        setStep("otp");
        sessionStorage.setItem("2fa_temp_token", data.tempToken);
        sessionStorage.setItem("2fa_phone", data.phone);
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        navigate("/", { replace: true });
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmailOTP = async () => {
    setError("");

    if (!otp || otp.length !== 4) {
      setError("Please enter the 4-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API}/auth/verify-2fa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tempToken: sessionStorage.getItem("2fa_temp_token"),
          otp,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Verification failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      sessionStorage.removeItem("2fa_temp_token");
      sessionStorage.removeItem("2fa_phone");
      navigate("/", { replace: true });
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMethod === "phone") {
      if (!otpSent) {
        handleSendOTP();
      } else if (step === "otp") {
        handleVerifyOTP();
      }
    } else {
      if (step === "password") {
        handleEmailLogin();
      } else if (step === "otp") {
        handleVerifyEmailOTP();
      }
    }
  };

  return (
    <div className="flex min-h-screen font-[Inter]">
      <LeftPanel />
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sign in to your account
          </h2>
          <p className="text-gray-500 mb-6">
            {loginMethod === "phone"
              ? "Enter your mobile number"
              : step === "otp"
                ? "Enter the verification code sent to your email"
                : "Enter your email and password"}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-sm text-gray-600">Login with</label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="loginMethod"
                    checked={loginMethod === "phone"}
                    onChange={() => {
                      setLoginMethod("phone");
                      setOtpSent(false);
                      setStep("otp");
                      setOtp("");
                      setEmail("");
                      setPassword("");
                    }}
                    className="mr-2"
                  />
                  Mobile
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="loginMethod"
                    checked={loginMethod === "email"}
                    onChange={() => {
                      setLoginMethod("email");
                      setOtpSent(false);
                      setStep("password");
                      setOtp("");
                      setPhone("");
                    }}
                    className="mr-2"
                  />
                  Email
                </label>
              </div>
            </div>

            {loginMethod === "email" && step === "password" ? (
              <>
                <div className="mb-4">
                  <label className="text-sm text-gray-600">Email</label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="username"
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>

                <div className="mb-4">
                  <label className="text-sm text-gray-600">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    required
                  />
                </div>

                <p className="text-xs text-gray-500 mb-4">
                  <label className="flex items-start text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mr-2 mt-0.5"
                    />
                    <span>
                      By signing in you agree to{" "}
                      <a
                        href="/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:underline"
                      >
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a
                        href="/terms-and-conditions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:underline"
                      >
                        Terms and Conditions
                      </a>
                    </span>
                  </label>
                </p>
              </>
            ) : loginMethod === "email" && step === "otp" ? (
              <>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    A verification code has been sent to your registered email
                    address.
                  </p>
                  <label className="text-sm text-gray-600">
                    Enter verification code
                  </label>
                  <input
                    type="text"
                    placeholder="4-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={4}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              </>
            ) : otpSent ? (
              <>
                <div className="mb-4">
                  <label className="text-sm text-gray-600">Enter OTP</label>
                  <input
                    type="text"
                    placeholder="4-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={4}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              </>
            ) : (
              <div className="mb-4">
                <label className="text-sm text-gray-600">Mobile Number</label>
                <div className="mt-1">
                  <PhoneInput
                    country={"in"}
                    value={phone}
                    onChange={(val) => setPhone(val)}
                    inputProps={{ name: "phone", required: true }}
                    containerClass="w-full"
                    inputClass="!w-full !py-2 !text-sm !border !rounded-lg !border-gray-300 focus:!ring-2 focus:!ring-orange-500"
                    buttonClass="!border !border-gray-300 !rounded-l-lg"
                    enableSearch
                    searchPlaceholder="Search country..."
                    preferredCountries={[
                      "in",
                      "us",
                      "gb",
                      "ae",
                      "sg",
                      "au",
                      "ca",
                    ]}
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
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
                  {loginMethod === "email"
                    ? step === "otp"
                      ? "Verifying..."
                      : "Signing in..."
                    : otpSent
                      ? "Verifying..."
                      : "Sending OTP..."}
                </span>
              ) : loginMethod === "email" ? (
                step === "otp" ? (
                  "Verify Code →"
                ) : (
                  "Sign In →"
                )
              ) : otpSent ? (
                "Verify OTP →"
              ) : (
                "Get OTP →"
              )}
            </button>
          </form>
          <br />

          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-orange-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <a href="/signup" className="text-orange-600 hover:underline">
              Create account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
