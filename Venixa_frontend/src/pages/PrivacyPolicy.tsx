import React from "react";
import { useNavigate } from "react-router-dom";

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

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen font-[Inter]">
      <LeftPanel />

      <div className="flex flex-1 items-center justify-center bg-gray-50 px-6 py-10">
        <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
          <h2 className="text-2xl font-bold text-gray-900 mb-1 flex-shrink-0">
            Privacy Policy
          </h2>
          <p className="text-sm text-gray-500 mb-4 flex-shrink-0">
            Venixa Pvt Ltd &mdash;{" "}
            <a
              href="https://venixa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:underline"
            >
              https://venixa.com
            </a>
          </p>

          <div className="flex-1 overflow-y-auto pr-2 min-h-0">
            <div className="text-gray-700 space-y-6 text-sm leading-relaxed">
              <p>
                Welcome to{" "}
                <a
                  href="https://venixa.com"
                  className="text-orange-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://venixa.com/
                </a>{" "}
                ("Website") and the Venixa mobile application ("App"), operated
                and owned by <strong>Venixa Pvt Ltd</strong> ("Company",
                "Venixa", "we", "our", "us").
              </p>
              <p>
                We value our users and are committed to protecting their
                privacy. This Privacy Policy ("Policy") explains how we collect,
                use, and disclose the information received through the Website
                and the App, which provide certified Vedic rituals at your
                doorstep, including AI-powered recommendations, booking
                services, and omnichannel interactions.
              </p>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="font-semibold text-orange-800 mb-1">
                  BY ACCESSING OR USING THE WEBSITE OR THE APP
                </p>
                <p className="text-orange-700">
                  You unconditionally accept and agree, without limitation or
                  qualification, to the terms and conditions of this Privacy
                  Policy. If you do not agree with the terms of this Policy,
                  please do not proceed to use the Website or the App.
                </p>
              </div>

              <section>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  1. Personal Information
                </h3>
                <p className="mb-2">
                  To avail of services offered through Venixa, including booking
                  poojas, consultations, or purchasing pooja kits, you are
                  required to provide certain information ("Personal
                  Information"), such as:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Name</li>
                  <li>Contact Number</li>
                  <li>Email Address</li>
                  <li>Residential Address (for service delivery)</li>
                  <li>
                    Spiritual details such as Gotra, Nakshatra, Family deity
                    (optional, for personalization)
                  </li>
                </ul>
                <p className="mt-2">
                  This information is used to process your requests, deliver
                  services, and provide updates related to your bookings.
                </p>
                <p className="mt-2">
                  We may also collect information for Pandits, Veda Patashalas,
                  and Vendors, including:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-1">
                  <li>Identity documents (Aadhar, PAN, etc.)</li>
                  <li>Certifications and affiliations</li>
                  <li>Bank account details</li>
                  <li>Location and service radius</li>
                </ul>
              </section>

              <section>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  2. Payment Information
                </h3>
                <p className="mb-2">
                  We do not collect or store sensitive payment details such as:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Credit/Debit Card Number</li>
                  <li>CVV</li>
                  <li>Expiry Date</li>
                </ul>
                <p className="mt-2">
                  All payments are processed through secure third-party payment
                  gateways. You will enter payment details directly on those
                  platforms, and we are not responsible for any information
                  shared there.
                </p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  3. Voluntary Nature of Information
                </h3>
                <p>
                  Providing personal information is optional. However, failure
                  to provide the required information may limit our ability to
                  deliver services effectively. Use of the platform is at your
                  sole discretion and risk.
                </p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  4. Use of Personal Information
                </h3>
                <p className="mb-2">We use your information to:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Provide and manage pooja booking services</li>
                  <li>Match devotees with certified pandits</li>
                  <li>Personalize recommendations using AI</li>
                  <li>Process payments and transactions</li>
                  <li>Send booking confirmations and updates</li>
                  <li>Improve platform functionality and user experience</li>
                  <li>Notify you about offers, updates, and new services</li>
                </ul>
                <p className="mt-2">
                  If you wish to unsubscribe from communications, you may
                  contact us at{" "}
                  <a
                    href="mailto:support@venixa.com"
                    className="text-orange-600 hover:underline"
                  >
                    support@venixa.com
                  </a>{" "}
                  with the subject line <em>"Unsubscribe Me"</em>.
                </p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  5. AI and Personalization
                </h3>
                <p className="mb-2">Venixa utilizes AI-powered systems to:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Recommend poojas based on user preferences (Gotra,
                    Nakshatra, past bookings)
                  </li>
                  <li>Enable conversational booking through chat interfaces</li>
                  <li>Provide automated support and query resolution</li>
                </ul>
                <p className="mt-2">
                  All AI systems are designed with safeguards to ensure user
                  data privacy and prevent unauthorized access.
                </p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  6. Sharing of Personal Information
                </h3>
                <p className="mb-2">
                  We do not sell, trade, rent, or lease your Personal
                  Information. We may share information with:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Verified Pandits (for service fulfillment)</li>
                  <li>Vendors (for pooja kits and logistics)</li>
                  <li>Payment gateways (for transactions)</li>
                  <li>Government or legal authorities (if required by law)</li>
                </ul>
                <p className="mt-2">
                  We may also share aggregate, non-personal data for analytics
                  and service improvement.
                </p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  7. Additional User Data
                </h3>
                <p className="mb-2">To enhance our services, we may collect:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Device Information:</strong> Device ID, operating
                    system, browser type
                  </li>
                  <li>
                    <strong>Location Data:</strong> GPS, IP-based location for
                    nearby pandit matching
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Interaction patterns, browsing
                    behavior
                  </li>
                  <li>
                    <strong>Media Uploads:</strong> Photos/videos (with user
                    consent)
                  </li>
                  <li>
                    <strong>Chat Data:</strong> Conversations with AI agents for
                    service improvement
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  8. Protection of Information & Storage
                </h3>
                <p className="mb-2">
                  We use secure systems to protect your data:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>SSL encryption for data transmission</li>
                  <li>AES-256 encryption for sensitive data</li>
                  <li>Secure servers and access controls</li>
                  <li>Regular system backups</li>
                </ul>
                <p className="mt-2">
                  Access to data is restricted to authorized personnel only.
                  However, despite best efforts, no system is completely secure.
                  We are not liable for data breaches caused by unauthorized
                  access, cyber-attacks, or technical failures.
                </p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  9. Intellectual Property
                </h3>
                <p className="mb-2">
                  Any content shared by you on the platform, including Photos,
                  Feedback, Reviews, and Comments, is considered non-infringing
                  and grants Venixa unrestricted rights to use such content for
                  platform improvement, marketing, or operational purposes.
                </p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  10. Data Localization and Compliance
                </h3>
                <p className="mb-2">
                  In compliance with applicable Indian laws (including DPDP
                  Act):
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>All data is stored within India</li>
                  <li>
                    Necessary safeguards are implemented for data protection
                  </li>
                  <li>AI systems are governed by strict access controls</li>
                </ul>
              </section>

              <section>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  11. How to Delete Your Data
                </h3>
                <p>
                  You may request deletion of your account and associated data
                  by contacting us at{" "}
                  <a
                    href="mailto:support@venixa.com"
                    className="text-orange-600 hover:underline"
                  >
                    support@venixa.com
                  </a>{" "}
                  with the subject: <em>"Delete My Account"</em>. We will
                  process such requests in accordance with applicable laws.
                </p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  12. Changes to Privacy Policy
                </h3>
                <p>
                  We reserve the right to modify or update this Privacy Policy
                  at any time. Changes will be posted on the Website and App and
                  will be effective immediately upon posting. Users are
                  encouraged to review this Policy periodically.
                </p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  13. Links to Third-Party Sites
                </h3>
                <p>
                  The Website and App may contain links to third-party websites.
                  Venixa is not responsible for the content, privacy practices,
                  or security of such third-party platforms. Users are advised
                  to review their policies independently.
                </p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  14. Third-Party Content Disclaimer
                </h3>
                <p>
                  Any opinions, advice, statements, services, or content
                  provided by third parties (including Pandits, vendors, or
                  users) are their own and not those of Venixa Pvt Ltd.
                </p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  15. How to Contact Us
                </h3>
                <p className="mb-1">
                  For any queries or concerns regarding this Privacy Policy:
                </p>
                <p className="font-semibold text-gray-800">Venixa Pvt Ltd</p>
                <p>
                  📧 Email:{" "}
                  <a
                    href="mailto:support@venixa.com"
                    className="text-orange-600 hover:underline"
                  >
                    support@venixa.com
                  </a>
                </p>
                <p>
                  🌐 Website:{" "}
                  <a
                    href="https://venixa.com/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:underline"
                  >
                    https://venixa.com/contact
                  </a>
                </p>
              </section>
            </div>
          </div>

          <div className="flex gap-4 mt-6 pt-4 border-t flex-shrink-0">
            <button
              onClick={() => window.history.length > 1 ? navigate(-1) : navigate("/login")}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
