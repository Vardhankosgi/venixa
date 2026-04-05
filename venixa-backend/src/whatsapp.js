const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
  authStrategy: new LocalAuth(), // saves session locally
});

client.on("qr", (qr) => {
  console.log("Scan this QR with WhatsApp:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("✅ WhatsApp connected!");
});

client.on("auth_failure", () => {
  console.log("❌ Auth failed");
});

client.initialize();

module.exports = client;
