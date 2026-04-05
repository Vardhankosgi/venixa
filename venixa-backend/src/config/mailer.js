const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth:
    process.env.SMTP_USER && process.env.SMTP_PASS
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  connectionTimeout: 10000,
  greetingTimeout: 5000,
});

if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.warn(
    "[mailer] SMTP not configured. Add SMTP_USER and SMTP_PASS to .env",
  );
}

const sendOTPEmail = async (to, otp, name = "User") => {
  const result = await transporter.sendMail({
    from: process.env.EMAIL_FROM || "noreply@venixa.com",
    to,
    subject: "Your Venixa Login Code",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 20px">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background-color:#ffffff;border-radius:8px;overflow:hidden">
                <tr>
                  <td style="padding:32px 32px 24px">
                    <h1 style="margin:0 0 8px;font-size:24px;font-weight:600;color:#1a1a1a">Venixa</h1>
                    <p style="margin:0;font-size:14px;color:#666666">Trusted Spiritual Platform</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 32px 24px">
                    <p style="margin:0;font-size:16px;color:#333333">Hello ${name},</p>
                    <p style="margin:12px 0 0;font-size:14px;color:#666666">Use the following code to sign in to your Venixa account:</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 32px 24px" align="center">
                    <div style="display:inline-block;padding:16px 32px;background-color:#f8f4f0;border-radius:8px;border:1px solid #e6dfd8">
                      <span style="font-size:32px;font-weight:700;letter-spacing:8px;color:#c94f0f">${otp}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 32px 24px">
                    <p style="margin:0;font-size:13px;color:#999999">This code expires in 10 minutes. Do not share this code with anyone.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px 32px;background-color:#fafafa;border-top:1px solid #eeeeee">
                    <p style="margin:0;font-size:12px;color:#999999;text-align:center">If you did not request this code, please ignore this email.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    text: `Hello ${name},\n\nYour Venixa login code is: ${otp}\n\nThis code expires in 10 minutes. Do not share this code with anyone.\n\nIf you did not request this code, please ignore this email.\n\nVenixa - Trusted Spiritual Platform`,
  });
  return result;
};

const sendPasswordResetEmail = async (to, resetLink, name = "User") => {
  const result = await transporter.sendMail({
    from: process.env.EMAIL_FROM || "noreply@venixa.com",
    to,
    subject: "Reset Your Venixa Password",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 20px">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background-color:#ffffff;border-radius:8px;overflow:hidden">
                <tr>
                  <td style="padding:32px 32px 24px">
                    <h1 style="margin:0 0 8px;font-size:24px;font-weight:600;color:#1a1a1a">Venixa</h1>
                    <p style="margin:0;font-size:14px;color:#666666">Trusted Spiritual Platform</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 32px 24px">
                    <p style="margin:0;font-size:16px;color:#333333">Hello ${name},</p>
                    <p style="margin:12px 0 0;font-size:14px;color:#666666">We received a request to reset your password. Click the button below to create a new password:</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 32px 24px" align="center">
                    <a href="${resetLink}" style="display:inline-block;padding:14px 32px;background-color:#e66a1d;color:#ffffff;text-decoration:none;font-weight:600;border-radius:6px">Reset Password</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 32px 24px">
                    <p style="margin:0;font-size:13px;color:#999999">This link expires in 1 hour. If you did not request a password reset, please ignore this email.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px 32px;background-color:#fafafa;border-top:1px solid #eeeeee">
                    <p style="margin:0;font-size:12px;color:#999999;text-align:center">If you did not request this, please ignore this email.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    text: `Hello ${name},\n\nWe received a request to reset your password. Click the following link to create a new password:\n${resetLink}\n\nThis link expires in 1 hour. If you did not request a password reset, please ignore this email.\n\nVenixa - Trusted Spiritual Platform`,
  });
  return result;
};

module.exports = { sendOTPEmail, sendPasswordResetEmail };
