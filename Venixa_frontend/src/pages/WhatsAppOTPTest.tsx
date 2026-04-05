import React, { useState } from "react";
import axios from "axios";

const API = "/api";

const WhatsAppOTPTest: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const sendOtp = async () => {
    try {
      const res = await axios.post(`${API}/auth/send-whatsapp-otp`, { phone });
      alert(res.data.success ? "OTP sent on WhatsApp" : "Failed to send OTP");
    } catch (error) {
      console.error(error);
      alert("Error sending OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post(`${API}/auth/verify-whatsapp-otp`, {
        phone,
        otp,
      });
      alert(res.data.success ? "Verified" : "Invalid OTP");
    } catch (error) {
      console.error(error);
      alert("Error verifying OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          WhatsApp OTP Test
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number (+91...)
          </label>
          <input
            type="text"
            placeholder="+919014702869"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <button
          onClick={sendOtp}
          className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition mb-4"
        >
          Send OTP via WhatsApp
        </button>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter OTP
          </label>
          <input
            type="text"
            placeholder="Enter 4-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <button
          onClick={verifyOtp}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default WhatsAppOTPTest;
