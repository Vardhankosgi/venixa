import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const API = "/api";

const LeftPanel = () => (
  <div className="hidden md:flex flex-1 relative overflow-hidden text-white">
    <div className="absolute inset-0 bg-gradient-to-br from-[#e66a1d] to-[#c94f0f]" />
    <div className="absolute inset-0 opacity-10">
      <svg width="100%" height="100%">
        <defs>
          <pattern
            id="mandala"
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

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "devotee",
  });
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const firstName = (form.first_name || "").trim();
    const lastName = (form.last_name || "").trim();
    const userEmail = (form.email || "").trim();
    
    if (!firstName) {
      setError("First name is required");
      return;
    }
    if (!lastName) {
      setError("Last name is required");
      return;
    }
    if (!userEmail) {
      setError("Email is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (phone.length < 7) {
      setError("Please enter a valid phone number");
      return;
    }
    if (!form.password) {
      setError("Password is required");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    const passwordChecks = {
      uppercase: /[A-Z]/.test(form.password),
      lowercase: /[a-z]/.test(form.password),
      number: /[0-9]/.test(form.password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(form.password),
    };
    if (
      !passwordChecks.uppercase ||
      !passwordChecks.lowercase ||
      !passwordChecks.number ||
      !passwordChecks.special
    ) {
      setError(
        "Password must contain uppercase, lowercase, number, and special character",
      );
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          password: form.password,
          role: form.role,
          phone: "+" + phone,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }
      navigate("/login");
    } catch {
      setError(
        "Unable to connect to server. Make sure the backend is running on port 5000.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen font-[Inter]">
      <LeftPanel />
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Create an account
          </h2>
          <p className="text-gray-500 mb-6">
            Enter your details to get started
          </p>

          {/* <div className="flex gap-4 mb-6">
            <button className="flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-100">
              <FcGoogle size={20} /> Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-100">
              <FaApple /> Apple
            </button>
          </div> */}

          {/* <div className="flex items-center mb-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="mx-3 text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div> */}

          <form onSubmit={handleSignup}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-gray-600">First Name</label>
                <input
                  name="first_name"
                  type="text"
                  placeholder="First name"
                  value={form.first_name}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Last Name</label>
                <input
                  name="last_name"
                  type="text"
                  placeholder="Last name"
                  value={form.last_name}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-600">Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                required
              />
            </div>

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
              {/* <p className="text-xs text-gray-400 mt-1">
                Used for 2FA verification via SMS
              </p> */}
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-600">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                required
                minLength={8}
              />
              {form.password && (
                <p
                  className={`text-xs mt-1 ${form.password.length >= 8 && /[A-Z]/.test(form.password) && /[a-z]/.test(form.password) && /[0-9]/.test(form.password) && /[!@#$%^&*(),.?":{}|<>]/.test(form.password) ? "text-green-600" : "text-orange-500"}`}
                >
                  {form.password.length >= 8 &&
                  /[A-Z]/.test(form.password) &&
                  /[a-z]/.test(form.password) &&
                  /[0-9]/.test(form.password) &&
                  /[!@#$%^&*(),.?":{}|<>]/.test(form.password)
                    ? "✓ Strong password"
                    : "Create a strong password"}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="text-sm text-gray-600">Select Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              >
                <option value="devotee">Devotee</option>
                <option value="pandit">Pandit</option>
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>

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
                  Creating account...
                </span>
              ) : (
                "Create Account →"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-orange-600 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
