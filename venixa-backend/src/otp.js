const otpStore = new Map();

function generateOTP(phone) {
  const otp = Math.floor(1000 + Math.random() * 9000);

  otpStore.set(phone, {
    otp,
    expires: Date.now() + 5 * 60 * 1000,
  });

  return otp;
}

function verifyOTP(phone, inputOtp) {
  const data = otpStore.get(phone);

  if (!data) return false;
  if (Date.now() > data.expires) return false;

  return data.otp == inputOtp;
}

module.exports = { generateOTP, verifyOTP };
