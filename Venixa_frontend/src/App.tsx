import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import ForgotPassword from "./pages/ForgotPassword";
import WhatsAppOTPTest from "./pages/WhatsAppOTPTest";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import FindPandits from "./pages/pandits/FindPandits";
import MyBookings from "./pages/pandits/MyBookings";
import PanditProfiles from "./pages/pandits/PanditProfiles";
import PanditReviews from "./pages/pandits/PanditReviews";
import BrowseLivePooja from "./pages/live-pooja/BrowseLivePooja";
import SchedulePooja from "./pages/live-pooja/SchedulePooja";
import MySessions from "./pages/live-pooja/MySessions";
import Recordings from "./pages/live-pooja/Recordings";
import Horoscope from "./pages/astrology/Horoscope";
import KundaliMatching from "./pages/astrology/KundaliMatching";
import ConsultAstrologer from "./pages/astrology/ConsultAstrologer";
import VastuAnalysis from "./pages/astrology/VastuAnalysis";
import AstrologyReports from "./pages/astrology/AstrologyReports";
import BrowseSamagri from "./pages/samagri/BrowseSamagri";
import CustomKits from "./pages/samagri/CustomKits";
import SamagriSubscriptions from "./pages/samagri/SamagriSubscriptions";
import SamagriOrders from "./pages/samagri/SamagriOrders";
import FindTemples from "./pages/temples/FindTemples";
import BookTemplePooja from "./pages/temples/BookTemplePooja";
import LiveDarshan from "./pages/temples/LiveDarshan";
import PrasadDelivery from "./pages/temples/PrasadDelivery";
import BrowseCourses from "./pages/vedapatashala/BrowseCourses";
import LiveClasses from "./pages/vedapatashala/LiveClasses";
import MyLearning from "./pages/vedapatashala/MyLearning";
import Certifications from "./pages/vedapatashala/Certifications";
import DailyPanchang from "./pages/panchang/DailyPanchang";
import MuhuratFinder from "./pages/panchang/MuhuratFinder";
import FestivalCalendar from "./pages/panchang/FestivalCalendar";
import Reminders from "./pages/panchang/Reminders";
import ShopBrowse from "./pages/shop/ShopBrowse";
import Cart from "./pages/shop/Cart";
import ShopOrders from "./pages/shop/ShopOrders";
import Wishlist from "./pages/shop/Wishlist";
import AIAssistant from "./pages/AIAssistant";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  console.log(
    "[ProtectedRoute] token:",
    token ? token.slice(0, 20) + "..." : "NULL",
  );
  if (!token) {
    console.log("[ProtectedRoute] No token, redirecting to /login");
    return <Navigate to="/login" replace />;
  }
  console.log("[ProtectedRoute] Token found, rendering children");
  return <>{children}</>;
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  console.log(
    "[AuthRoute] token:",
    token ? token.slice(0, 20) + "..." : "NULL",
  );
  if (token) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth routes */}
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
          <Route path="/two-factor-auth" element={<TwoFactorAuth />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/whatsapp-otp-test" element={<WhatsAppOTPTest />} />

          {/* Protected app routes — all flat, wrapped in AppLayout */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <AIAssistant />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/ai-assistant"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <FindPandits />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/pandits/find"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <MyBookings />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/pandits/bookings"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <PanditProfiles />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/pandits/profiles"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <PanditReviews />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/pandits/reviews"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <BrowseLivePooja />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/live-pooja/browse"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <SchedulePooja />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/live-pooja/schedule"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <MySessions />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/live-pooja/sessions"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Recordings />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/live-pooja/recordings"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Horoscope />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/astrology/horoscope"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <KundaliMatching />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/astrology/kundali"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <ConsultAstrologer />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/astrology/consult"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <VastuAnalysis />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/astrology/vastu"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <AstrologyReports />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/astrology/reports"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <BrowseSamagri />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/samagri/browse"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <CustomKits />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/samagri/custom"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <SamagriSubscriptions />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/samagri/subscriptions"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <SamagriOrders />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/samagri/orders"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <FindTemples />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/temples/find"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <BookTemplePooja />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/temples/book"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <LiveDarshan />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/temples/darshan"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <PrasadDelivery />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/temples/prasad"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <BrowseCourses />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/vedapatashala/courses"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <LiveClasses />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/vedapatashala/live"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <MyLearning />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/vedapatashala/my-learning"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Certifications />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/vedapatashala/certifications"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <DailyPanchang />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/panchang/daily"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <MuhuratFinder />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/panchang/muhurat"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <FestivalCalendar />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/panchang/festivals"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Reminders />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/panchang/reminders"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <ShopBrowse />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/shop/browse"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Cart />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/shop/cart"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <ShopOrders />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/shop/orders"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Wishlist />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/shop/wishlist"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Settings />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/settings"
          />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Notifications />
                </AppLayout>
              </ProtectedRoute>
            }
            path="/notifications"
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
