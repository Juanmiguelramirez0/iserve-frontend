import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./pages/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import Dashboard from "./pages/Dashboard";
import StaffDashboard from "./pages/StaffDashboard"; // ✅ Added
import IServeForm from "./components/iserveform";

export default function App() {
  const { user, authReady } = useAuth();
  const navigate = useNavigate();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Smart Redirect: Send users to the right place based on their role
  useEffect(() => {
    if (authReady && user && window.location.pathname === "/") {
      if (user.role === "staff" || user.role === "admin") {
        navigate("/staff");
      } else {
        navigate("/dashboard");
      }
    }
  }, [authReady, user, navigate]);

  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white">
        <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Routes>
      {/* HOME PAGE */}
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-[#0f172a] text-white">
            <Navbar onLogin={() => setIsLoginModalOpen(true)} />
            <main>
              <Hero onLogin={() => setIsLoginModalOpen(true)} />
              <About />
              <Contact />
            </main>
            <Footer />
            <LoginModal
              isOpen={isLoginModalOpen}
              onClose={() => setIsLoginModalOpen(false)}
            />
          </div>
        }
      />

      {/* STUDENT DASHBOARD */}
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/" replace />}
      />

      {/* STAFF/ADMIN DASHBOARD */}
      <Route
        path="/staff"
        element={
          user && (user.role === "staff" || user.role === "admin") ? (
            <StaffDashboard />
          ) : (
            <Navigate to="/dashboard" replace />
          )
        }
      />

      {/* ISERVE REQUEST FORM */}
      <Route
        path="/request"
        element={user ? <IServeForm /> : <Navigate to="/" replace />}
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}