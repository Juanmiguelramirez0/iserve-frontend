import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  X,
  Mail,
  Lock,
  Info,
  Loader2,
  AlertCircle
} from "lucide-react";

import { useAuth } from "../hooks/useAuth";

export default function LoginModal({ isOpen, onClose }) {
  const { login, loginWithEmail, registerWithEmail } = useAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ GOOGLE LOGIN (REDIRECT ONLY)
const handleGoogleLogin = async () => {
  setLoading(true);
  setError(null);

  try {
    await login(); // only triggers redirect
    // ❌ DO NOT navigate here
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  // EMAIL LOGIN / REGISTER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isRegister) {
        await registerWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }

      onClose();
      // ❗ DO NOT navigate here if you're using auth-based routing

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
          />

          {/* MODAL */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#1e293b] w-full max-w-md rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden pointer-events-auto"
            >

              {/* HEADER */}
              <div className="bg-linear-to-br from-[#6366f1] to-[#312e81] p-8 text-white relative">

                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-3 mb-4">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  <span className="text-sm font-bold uppercase opacity-80">
                    Secure Gateway
                  </span>
                </div>

                <h2 className="text-3xl font-bold">
                  {isRegister ? "Create Account" : "Welcome Back"}
                </h2>

                <p className="text-white/60 text-sm mt-2">
                  Access MIS Helpdesk
                </p>
              </div>

              {/* BODY */}
              <div className="p-8 space-y-6">

                {/* ERROR */}
                {error && (
                  <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl flex items-center space-x-2 text-rose-400 text-sm">
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* GOOGLE LOGIN */}
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full bg-white text-black h-14 rounded-2xl font-bold flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <img
                      src="https://www.google.com/favicon.ico"
                      className="w-5 h-5"
                      alt="google"
                    />
                  )}
                  <span>Continue with Google</span>
                </button>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-4">

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-white"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white h-14 rounded-2xl font-bold"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                    ) : isRegister ? (
                      "Create Account"
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                {/* TOGGLE */}
                <button
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-white/40 text-sm w-full"
                >
                  {isRegister
                    ? "Already have an account? Sign in"
                    : "No account? Create one"}
                </button>

                {/* INFO */}
                <div className="bg-emerald-500/10 p-4 rounded-2xl text-emerald-300 text-xs">
                  <Info className="inline w-4 h-4 mr-1" />
                  iServe LVCC Secure Authentication enabled
                </div>

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}