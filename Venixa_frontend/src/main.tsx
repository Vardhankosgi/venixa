import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import Dashboard from "./pages/Dashboard";
import AIAssistant from "./pages/AIAssistant";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";

// Pandits
import FindPandits from "./pages/pandits/FindPandits";
import MyBookings from "./pages/pandits/MyBookings";
import PanditProfiles from "./pages/pandits/PanditProfiles";
import PanditReviews from "./pages/pandits/PanditReviews";

// Live Pooja
import BrowseLivePooja from "./pages/live-pooja/BrowseLivePooja";
import SchedulePooja from "./pages/live-pooja/SchedulePooja";
import MySessions from "./pages/live-pooja/MySessions";
import Recordings from "./pages/live-pooja/Recordings";

// Astrology
import Horoscope from "./pages/astrology/Horoscope";
import KundaliMatching from "./pages/astrology/KundaliMatching";
import ConsultAstrologer from "./pages/astrology/ConsultAstrologer";
import VastuAnalysis from "./pages/astrology/VastuAnalysis";
import AstrologyReports from "./pages/astrology/AstrologyReports";

// Samagri
import BrowseSamagri from "./pages/samagri/BrowseSamagri";
import CustomKits from "./pages/samagri/CustomKits";
import SamagriSubscriptions from "./pages/samagri/SamagriSubscriptions";
import SamagriOrders from "./pages/samagri/SamagriOrders";

// Temples
import FindTemples from "./pages/temples/FindTemples";
import BookTemplePooja from "./pages/temples/BookTemplePooja";
import LiveDarshan from "./pages/temples/LiveDarshan";
import PrasadDelivery from "./pages/temples/PrasadDelivery";

// Vedapatashala
import BrowseCourses from "./pages/vedapatashala/BrowseCourses";
import LiveClasses from "./pages/vedapatashala/LiveClasses";
import MyLearning from "./pages/vedapatashala/MyLearning";
import Certifications from "./pages/vedapatashala/Certifications";

// Panchang
import DailyPanchang from "./pages/panchang/DailyPanchang";
import MuhuratFinder from "./pages/panchang/MuhuratFinder";
import FestivalCalendar from "./pages/panchang/FestivalCalendar";
import Reminders from "./pages/panchang/Reminders";

// Shop
import ShopBrowse from "./pages/shop/ShopBrowse";
import Cart from "./pages/shop/Cart";
import ShopOrders from "./pages/shop/ShopOrders";
import Wishlist from "./pages/shop/Wishlist";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  if (token) return <Navigate to="/" replace />;
  return <>{children}</>;
};

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <Signup />
            </AuthRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/two-factor-auth" element={<TwoFactorAuth />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Main */}
        <Route
          path="/ai-assistant"
          element={
            <AppLayout>
              <AIAssistant />
            </AppLayout>
          }
        />

        {/* Pandits */}
        <Route
          path="/pandits/find"
          element={
            <AppLayout>
              <FindPandits />
            </AppLayout>
          }
        />
        <Route
          path="/pandits/bookings"
          element={
            <AppLayout>
              <MyBookings />
            </AppLayout>
          }
        />
        <Route
          path="/pandits/profiles"
          element={
            <AppLayout>
              <PanditProfiles />
            </AppLayout>
          }
        />
        <Route
          path="/pandits/reviews"
          element={
            <AppLayout>
              <PanditReviews />
            </AppLayout>
          }
        />

        {/* Live Pooja */}
        <Route
          path="/live-pooja/browse"
          element={
            <AppLayout>
              <BrowseLivePooja />
            </AppLayout>
          }
        />
        <Route
          path="/live-pooja/schedule"
          element={
            <AppLayout>
              <SchedulePooja />
            </AppLayout>
          }
        />
        <Route
          path="/live-pooja/sessions"
          element={
            <AppLayout>
              <MySessions />
            </AppLayout>
          }
        />
        <Route
          path="/live-pooja/recordings"
          element={
            <AppLayout>
              <Recordings />
            </AppLayout>
          }
        />

        {/* Astrology */}
        <Route
          path="/astrology/horoscope"
          element={
            <AppLayout>
              <Horoscope />
            </AppLayout>
          }
        />
        <Route
          path="/astrology/kundali"
          element={
            <AppLayout>
              <KundaliMatching />
            </AppLayout>
          }
        />
        <Route
          path="/astrology/consult"
          element={
            <AppLayout>
              <ConsultAstrologer />
            </AppLayout>
          }
        />
        <Route
          path="/astrology/vastu"
          element={
            <AppLayout>
              <VastuAnalysis />
            </AppLayout>
          }
        />
        <Route
          path="/astrology/reports"
          element={
            <AppLayout>
              <AstrologyReports />
            </AppLayout>
          }
        />

        {/* Samagri */}
        <Route
          path="/samagri/browse"
          element={
            <AppLayout>
              <BrowseSamagri />
            </AppLayout>
          }
        />
        <Route
          path="/samagri/custom"
          element={
            <AppLayout>
              <CustomKits />
            </AppLayout>
          }
        />
        <Route
          path="/samagri/subscriptions"
          element={
            <AppLayout>
              <SamagriSubscriptions />
            </AppLayout>
          }
        />
        <Route
          path="/samagri/orders"
          element={
            <AppLayout>
              <SamagriOrders />
            </AppLayout>
          }
        />

        {/* Temples */}
        <Route
          path="/temples/find"
          element={
            <AppLayout>
              <FindTemples />
            </AppLayout>
          }
        />
        <Route
          path="/temples/book"
          element={
            <AppLayout>
              <BookTemplePooja />
            </AppLayout>
          }
        />
        <Route
          path="/temples/darshan"
          element={
            <AppLayout>
              <LiveDarshan />
            </AppLayout>
          }
        />
        <Route
          path="/temples/prasad"
          element={
            <AppLayout>
              <PrasadDelivery />
            </AppLayout>
          }
        />

        {/* Vedapatashala */}
        <Route
          path="/vedapatashala/courses"
          element={
            <AppLayout>
              <BrowseCourses />
            </AppLayout>
          }
        />
        <Route
          path="/vedapatashala/live"
          element={
            <AppLayout>
              <LiveClasses />
            </AppLayout>
          }
        />
        <Route
          path="/vedapatashala/my-learning"
          element={
            <AppLayout>
              <MyLearning />
            </AppLayout>
          }
        />
        <Route
          path="/vedapatashala/certifications"
          element={
            <AppLayout>
              <Certifications />
            </AppLayout>
          }
        />

        {/* Panchang */}
        <Route
          path="/panchang/daily"
          element={
            <AppLayout>
              <DailyPanchang />
            </AppLayout>
          }
        />
        <Route
          path="/panchang/muhurat"
          element={
            <AppLayout>
              <MuhuratFinder />
            </AppLayout>
          }
        />
        <Route
          path="/panchang/festivals"
          element={
            <AppLayout>
              <FestivalCalendar />
            </AppLayout>
          }
        />
        <Route
          path="/panchang/reminders"
          element={
            <AppLayout>
              <Reminders />
            </AppLayout>
          }
        />

        {/* Shop */}
        <Route
          path="/shop/browse"
          element={
            <AppLayout>
              <ShopBrowse />
            </AppLayout>
          }
        />
        <Route
          path="/shop/cart"
          element={
            <AppLayout>
              <Cart />
            </AppLayout>
          }
        />
        <Route
          path="/shop/orders"
          element={
            <AppLayout>
              <ShopOrders />
            </AppLayout>
          }
        />
        <Route
          path="/shop/wishlist"
          element={
            <AppLayout>
              <Wishlist />
            </AppLayout>
          }
        />

        {/* Account */}
        <Route
          path="/settings"
          element={
            <AppLayout>
              <Settings />
            </AppLayout>
          }
        />
        <Route
          path="/notifications"
          element={
            <AppLayout>
              <Notifications />
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>,
);
