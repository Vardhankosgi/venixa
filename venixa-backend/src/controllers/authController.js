const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { supabase } = require("../config/supabase");
const { sendOTP } = require("../config/sms");
const { sendOTPEmail, sendPasswordResetEmail } = require("../config/mailer");
const client = require("../whatsapp");
const { generateOTP, verifyOTP } = require("../otp");

const signToken = (userId, role) =>
  jwt.sign({ sub: userId, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

const signRefreshToken = (userId) =>
  jwt.sign({ sub: userId, type: "refresh" }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
  });

const maskPhone = (phone) =>
  phone.slice(0, -6).replace(/\d/g, "X") + phone.slice(-4);

const maskEmail = (email) => {
  const [local, domain] = email.split("@");
  return local.slice(0, 2) + "***@" + domain;
};

const generateAndStoreOTP = async (userId) => {
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const otp_expires_at = new Date(Date.now() + 10 * 60 * 1000).toISOString();
  await supabase
    .from("users")
    .update({ otp_code: otp, otp_expires_at })
    .eq("id", userId);
  return otp;
};

// POST /auth/register
const register = async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      role = "devotee",
      phone,
    } = req.body;

    if (!first_name || !first_name.trim()) {
      return res.status(400).json({ error: "First name is required" });
    }
    if (!last_name || !last_name.trim()) {
      return res.status(400).json({ error: "Last name is required" });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ error: "Email is required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: "Please enter a valid email address" });
    }
    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters" });
    }
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecial) {
      return res
        .status(400)
        .json({
          error:
            "Password must contain uppercase, lowercase, number, and special character",
        });
    }
    if (!phone) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    const full_name = `${first_name.trim()} ${last_name.trim()}`;

    const { data: existingEmail } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();
    if (existingEmail)
      return res.status(409).json({ error: "Email already registered" });

    const { data: existingPhone } = await supabase
      .from("users")
      .select("id")
      .eq("phone", phone)
      .single();
    if (existingPhone)
      return res.status(409).json({ error: "Phone number already registered" });

    const password_hash = await bcrypt.hash(password, 12);

    const { data: user, error } = await supabase
      .from("users")
      .insert({
        id: uuidv4(),
        full_name,
        email,
        password_hash,
        role,
        phone,
        two_fa_enabled: true,
      })
      .select("id, email, role, full_name, phone")
      .single();

    if (error) throw error;

    if (role === "pandit") {
      await supabase.from("pandit_profiles").insert({ user_id: user.id });
    } else if (role === "devotee") {
      await supabase.from("devotee_profiles").insert({ user_id: user.id });
    }

    res.status(201).json({
      message: "Registration successful. Please login to continue.",
      user,
    });
  } catch (err) {
    next(err);
  }
};

// POST /auth/login — phone + password, sends OTP via Twilio SMS
const login = async (req, res, next) => {
  try {
    console.log("req.headers:", req.headers);
    console.log("req.body:", req.body);
    const { loginInput, password } = req.body;
    console.log("[login] Received request with loginInput:", loginInput, "password length:", password ? password.length : 0);

    if (!loginInput || !loginInput.trim()) {
      return res
        .status(400)
        .json({ error: "Email or mobile number is required" });
    }
    if (!password) {
      console.log("[login] Password is empty");
      return res.status(400).json({ error: "Password is required" });
    }

    const isEmail = loginInput.includes("@");
    let user;

    if (isEmail) {
      const { data: userByEmail, error } = await supabase
        .from("users")
        .select(
          "id, email, role, full_name, password_hash, is_active, two_fa_enabled, phone",
        )
        .eq("email", loginInput)
        .maybeSingle();
      if (error) {
        console.error("[login] DB lookup error:", error.message);
        return res.status(500).json({ error: "Server error" });
      }
      user = userByEmail;
    } else {
      const normalizedPhone = loginInput.startsWith("+")
        ? loginInput
        : "+" + loginInput;
      console.log("[login] normalized phone:", normalizedPhone);
      const { data: userByPhone, error } = await supabase
        .from("users")
        .select(
          "id, email, role, full_name, password_hash, is_active, two_fa_enabled, phone",
        )
        .eq("phone", normalizedPhone)
        .maybeSingle();
      if (error) {
        console.error("[login] DB lookup error:", error.message);
        return res.status(500).json({ error: "Server error" });
      }
      user = userByPhone;
    }

    if (!user) {
      console.log(
        "[login] User not found with:",
        isEmail ? "email" : "phone",
        loginInput,
      );
      return res.status(401).json({ error: "Invalid credentials" });
    }
    if (!user.is_active)
      return res.status(403).json({ error: "Account deactivated" });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    if (user.two_fa_enabled) {
      console.log("[login] 2FA enabled, generating OTP for user:", user.id);
      const otp = await generateAndStoreOTP(user.id);
      let otpSent = false;
      let emailFailed = false;

      if (isEmail) {
        try {
          const name = user.full_name || user.email.split("@")[0];
          await sendOTPEmail(user.email, otp, name);
          otpSent = true;
          console.log("[login] Email OTP sent successfully");
        } catch (err) {
          console.error("[login] Email OTP failed:", err.message || err);
          emailFailed = true;
        }
      } else {
        try {
          const chatId = user.phone.replace("+", "") + "@c.us";
          await client.sendMessage(
            chatId,
            `*Venixa*\n\nDear user,\n\nYour Venixa login verification code is: *${otp}*\n\nThis code is valid for 10 minutes.\nPlease do not share it with anyone.\n\nWarm regards,\nVenixa Team`,
          );
          otpSent = true;
          console.log("[login] WhatsApp OTP sent successfully");
        } catch (err) {
          console.error(
            "[login] WhatsApp failed, trying SMS:",
            err.message || err,
          );
          try {
            await sendOTP(user.phone, otp);
            otpSent = true;
            console.log("[login] SMS OTP sent as fallback");
          } catch (smsErr) {
            console.error("[login] SMS also failed:", smsErr.message || smsErr);
          }
        }
      }

      if (!otpSent) {
        console.log("[login] Verification delivery failed");
        return res
          .status(500)
          .json({
            error: "Failed to send verification code. Please try again.",
          });
      }

      if (emailFailed) {
        console.log("[login] Email failed, logging in without 2FA");
        const token = signToken(user.id, user.role);
        const refreshToken = signRefreshToken(user.id);
        const { password_hash, ...safeUser } = user;
        return res.json({ user: safeUser, token, refreshToken });
      }

      console.log("[login] Generating temp token for 2FA");
      const tempToken = jwt.sign(
        {
          sub: user.id,
          step: "2fa",
          contact: isEmail ? user.email : user.phone,
        },
        process.env.JWT_SECRET,
        { expiresIn: "10m" },
      );

      const responsePayload = {
        requires2FA: true,
        tempToken,
        contact: isEmail ? maskEmail(user.email) : maskPhone(user.phone),
        method: isEmail ? "email" : "sms",
      };

      console.log("[login] Sending 2FA response");
      return res.json(responsePayload);
    }

    const token = signToken(user.id, user.role);
    const refreshToken = signRefreshToken(user.id);
    const { password_hash, ...safeUser } = user;
    res.json({ user: safeUser, token, refreshToken });
  } catch (err) {
    next(err);
  }
};

// POST /auth/verify-2fa — verifies OTP stored in DB
const verify2FA = async (req, res, next) => {
  try {
    const { tempToken, otp } = req.body;
    console.log("[verify2FA] Received request with tempToken and OTP");

    let decoded;
    try {
      decoded = jwt.verify(tempToken, process.env.JWT_SECRET);
      console.log(
        "[verify2FA] Temp token decoded successfully, user ID:",
        decoded.sub,
      );
    } catch {
      console.log("[verify2FA] Temp token verification failed");
      return res
        .status(401)
        .json({ error: "Session expired. Please login again." });
    }

    if (decoded.step !== "2fa") {
      console.log("[verify2FA] Invalid token type:", decoded.step);
      return res.status(400).json({ error: "Invalid token type" });
    }

    const { data: user } = await supabase
      .from("users")
      .select(
        "id, email, role, full_name, phone, is_active, otp_code, otp_expires_at",
      )
      .eq("id", decoded.sub)
      .single();

    if (!user || !user.is_active) {
      console.log("[verify2FA] User not found or inactive:", user);
      return res.status(401).json({ error: "User not found" });
    }

    if (!user.otp_code || user.otp_code !== otp) {
      console.log(
        "[verify2FA] Invalid OTP - stored:",
        user.otp_code,
        "provided:",
        otp,
      );
      return res.status(401).json({ error: "Invalid OTP" });
    }

    if (new Date() > new Date(user.otp_expires_at)) {
      console.log("[verify2FA] OTP expired - expires at:", user.otp_expires_at);
      return res
        .status(401)
        .json({ error: "OTP has expired. Please request a new one." });
    }

    console.log("[verify2FA] OTP verified successfully, clearing OTP from DB");
    // Clear OTP after successful use
    await supabase
      .from("users")
      .update({ otp_code: null, otp_expires_at: null })
      .eq("id", user.id);

    const token = signToken(user.id, user.role);
    const refreshToken = signRefreshToken(user.id);
    const { otp_code, otp_expires_at, ...safeUser } = user;

    console.log("[verify2FA] Generated tokens, sending response");
    res.json({ user: safeUser, token, refreshToken });
  } catch (err) {
    console.error("[verify2FA] Error:", err);
    next(err);
  }
};

// POST /auth/resend-otp — regenerates OTP and resends via WhatsApp
const resendOTP = async (req, res, next) => {
  try {
    const { tempToken } = req.body;

    let decoded;
    try {
      decoded = jwt.verify(tempToken, process.env.JWT_SECRET);
    } catch {
      return res
        .status(401)
        .json({ error: "Session expired. Please login again." });
    }

    const otp = await generateAndStoreOTP(decoded.sub);
    await sendOTP(decoded.phone, otp);

    res.json({ message: "OTP resent to your WhatsApp" });
  } catch (err) {
    next(err);
  }
};

// POST /auth/forgot-password
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { data: user } = await supabase
      .from("users")
      .select("id, full_name, email")
      .eq("email", email)
      .single();

    if (!user)
      return res.json({
        message: "If that email exists, a reset link has been sent.",
      });

    const resetToken = jwt.sign(
      { sub: user.id, type: "reset" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    
    try {
      const name = user.full_name || user.email.split("@")[0];
      await sendPasswordResetEmail(user.email, resetLink, name);
      console.log(`Password reset email sent to ${user.email}`);
    } catch (emailErr) {
      console.error("Failed to send reset email:", emailErr.message);
      console.log(`Password reset link for ${user.email}: ${resetLink}`);
    }

    res.json({ message: "If that email exists, a reset link has been sent." });
  } catch (err) {
    next(err);
  }
};

// POST /auth/reset-password
const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    if (decoded.type !== "reset")
      return res.status(400).json({ error: "Invalid token type" });

    const password_hash = await bcrypt.hash(password, 12);
    await supabase
      .from("users")
      .update({ password_hash })
      .eq("id", decoded.sub);

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    next(err);
  }
};

// POST /auth/refresh
const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken: token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.type !== "refresh")
      return res.status(400).json({ error: "Invalid token type" });

    const { data: user } = await supabase
      .from("users")
      .select("id, role, is_active")
      .eq("id", decoded.sub)
      .single();

    if (!user || !user.is_active)
      return res.status(401).json({ error: "User not found" });

    res.json({ token: signToken(user.id, user.role) });
  } catch {
    res.status(401).json({ error: "Invalid or expired refresh token" });
  }
};

// GET /auth/me
const getMe = async (req, res) => {
  const { data: user } = await supabase
    .from("users")
    .select(
      "id, email, role, full_name, phone, avatar_url, two_fa_enabled, created_at",
    )
    .eq("id", req.user.id)
    .single();
  res.json({ user });
};

// POST /auth/logout
const logout = (req, res) => res.json({ message: "Logged out successfully" });

// POST /auth/send-whatsapp-otp
const sendWhatsAppOTP = async (req, res, next) => {
  try {
    const { phone } = req.body;

    const otp = generateOTP(phone);

    const chatId = phone.replace("+", "") + "@c.us";

    await client.sendMessage(
      chatId,
      `*Venixa*\n\nDear user,\n\nYour Venixa verification code is: *${otp}*\n\nThis code is valid for 5 minutes.\nPlease do not share it with anyone.\n\nWarm regards,\nVenixa Team`,
    );

    res.send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false });
  }
};

// POST /auth/verify-whatsapp-otp
const verifyWhatsAppOTP = (req, res) => {
  const { phone, otp } = req.body;
  const isValid = verifyOTP(phone, otp);
  res.send({ success: isValid });
};

// POST /auth/send-login-otp - use WhatsApp
const sendLoginOTP = async (req, res, next) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    const normalizedPhone = phone.startsWith("+") ? phone : "+" + phone;

    const { data: user, error } = await supabase
      .from("users")
      .select("id, phone, is_active")
      .eq("phone", normalizedPhone)
      .maybeSingle();

    if (error || !user) {
      return res
        .status(404)
        .json({ error: "User not found with this mobile number" });
    }

    if (!user.is_active) {
      return res.status(403).json({ error: "Account is deactivated" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    await supabase
      .from("users")
      .update({
        otp_code: otp,
        otp_expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
      })
      .eq("id", user.id);

    try {
      const chatId = normalizedPhone.replace("+", "") + "@c.us";
      await client.sendMessage(
        chatId,
        `*Venixa*\n\nDear user,\n\nYour Venixa verification code is: *${otp}*\n\nThis code is valid for 5 minutes.\nPlease do not share it with anyone.\n\nWarm regards,\nVenixa Team`,
      );
    } catch (err) {
      console.error("[sendLoginOTP] WhatsApp error:", err.message);
      return res.status(500).json({ error: "Failed to send WhatsApp OTP" });
    }

    res.json({ success: true, phone: normalizedPhone });
  } catch (err) {
    console.error("[sendLoginOTP] Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// POST /auth/check-user-phone - check if user exists
const checkUserPhone = async (req, res, next) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    const normalizedPhone = phone.startsWith("+") ? phone : "+" + phone;

    const { data: user, error } = await supabase
      .from("users")
      .select("id, phone, is_active")
      .eq("phone", normalizedPhone)
      .maybeSingle();

    if (error || !user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.is_active) {
      return res.status(403).json({ error: "Account is deactivated" });
    }

    res.json({ exists: true, phone: normalizedPhone });
  } catch (err) {
    console.error("[checkUserPhone] Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// POST /auth/verify-login-otp
const verifyLoginOTP = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ error: "Phone and OTP are required" });
    }

    const normalizedPhone = phone.startsWith("+") ? phone : "+" + phone;

    const { data: user, error } = await supabase
      .from("users")
      .select("id, email, role, full_name, phone, otp_code, otp_expires_at")
      .eq("phone", normalizedPhone)
      .maybeSingle();

    if (error || !user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.otp_code || user.otp_code !== otp) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    const expiresAt = new Date(user.otp_expires_at);
    if (expiresAt < new Date()) {
      return res.status(401).json({ error: "OTP expired" });
    }

    await supabase
      .from("users")
      .update({ otp_code: null, otp_expires_at: null })
      .eq("id", user.id);

    const token = signToken(user.id, user.role);
    const refreshToken = signRefreshToken(user.id);

    res.json({
      token,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("[verifyLoginOTP] Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  register,
  login,
  verify2FA,
  resendOTP,
  forgotPassword,
  resetPassword,
  refreshToken,
  getMe,
  logout,
  sendWhatsAppOTP,
  verifyWhatsAppOTP,
  sendLoginOTP,
  verifyLoginOTP,
  checkUserPhone,
};
