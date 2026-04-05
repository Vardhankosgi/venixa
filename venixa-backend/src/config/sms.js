const client = require("../whatsapp");

/**
 * Sends a 4-digit verification code via WhatsApp Web (whatsapp-web.js).
 * WARNING: This is personal account style; true business sign requires WhatsApp Business API.
 */
const sendOTP = async (to, otp) => {
  const phone = to.startsWith("+") ? to : "+" + to;

  if (!client) {
    throw new Error("WhatsApp client not initialized");
  }

  if (!client.info || !client.info.wid) {
    throw new Error(
      "WhatsApp client not ready. Please scan QR and wait for connection.",
    );
  }

  const chatId = phone.replace("+", "") + "@c.us";
  const message = `*Venixa*\n\nDear user,\n\nYour Venixa verification code is: *${otp}*\n\nThis code is valid for 5 minutes.\nPlease do not share it with anyone.\n\nWarm regards,\nVenixa Team`;

  try {
    await client.sendMessage(chatId, message);
    console.log(`✅ OTP sent to ${phone} via WhatsApp Web`);
    return;
  } catch (err) {
    console.error("Failed to send OTP via WhatsApp Web:", err.message || err);
    throw new Error(
      `Failed to send OTP via WhatsApp Web. ${err.message || err}`,
    );
  }
};

module.exports = { sendOTP };
