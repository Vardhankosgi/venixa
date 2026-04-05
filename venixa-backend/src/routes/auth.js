const router = require("express").Router();
const { z } = require("zod");
const { validate } = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");
const ctrl = require("../controllers/authController");

const registerSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["devotee", "pandit", "admin", "super_admin"]).optional(),
  phone: z
    .string()
    .regex(
      /^\+[1-9]\d{7,14}$/,
      "Phone must be in E.164 format e.g. +919876543210",
    ),
});

const loginSchema = z.object({
  loginInput: z.string().min(1),
  password: z.string().min(1),
});

router.post("/register", validate(registerSchema), ctrl.register);
router.post("/login", validate(loginSchema), ctrl.login);
router.post("/verify-2fa", ctrl.verify2FA);
router.post("/resend-otp", ctrl.resendOTP);
router.post("/forgot-password", ctrl.forgotPassword);
router.post("/reset-password", ctrl.resetPassword);
router.post("/refresh", ctrl.refreshToken);
router.get("/me", authenticate, ctrl.getMe);
router.post("/logout", authenticate, ctrl.logout);
router.post("/send-whatsapp-otp", ctrl.sendWhatsAppOTP);
router.post("/verify-whatsapp-otp", ctrl.verifyWhatsAppOTP);
router.post("/send-login-otp", ctrl.sendLoginOTP);
router.post("/verify-login-otp", ctrl.verifyLoginOTP);
router.post("/check-user-phone", ctrl.checkUserPhone);

module.exports = router;
