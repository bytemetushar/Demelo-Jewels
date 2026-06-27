import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Diamond, ArrowRight, Gem } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import heroImg from "../assets/jewelry_showroom_dark_elegant.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#1a120b" }}>
      {/* Left side — Image (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={heroImg}
          alt="Luxury jewelry"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,18,11,0.5) 0%, rgba(26,18,11,0.2) 100%)" }} />

        {/* Floating diamonds */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${15 + i * 16}%`, top: `${20 + (i % 3) * 20}%` }}
            animate={{ y: [0, -12, 0], opacity: [0.08, 0.2, 0.08], rotate: [0, 45, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          >
            <Diamond size={10 + i * 3} strokeWidth={1} style={{ color: "#b4915a" }} />
          </motion.div>
        ))}

        {/* Brand overlay */}
        <div className="absolute bottom-10 left-10">
          <p className="font-['Marcellus'] text-3xl mb-2" style={{ color: "#fff8ee" }}>Demelo Jewels</p>
          <p className="font-['Jost'] text-xs uppercase tracking-[0.3em]" style={{ color: "rgba(180,145,90,0.6)" }}>
            Handcrafted Since 1924
          </p>
        </div>
      </div>

      {/* Right side — Form */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-10 py-12 relative">
        {/* Background glow */}
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(180,145,90,0.04) 0%, transparent 70%)" }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative"
        >
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-block">
              <p className="font-['Marcellus'] text-2xl" style={{ color: "#fff8ee" }}>Demelo Jewels</p>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2.5 mb-5">
              <div className="w-8 h-px" style={{ backgroundColor: "#b4915a" }} />
              <Gem size={14} style={{ color: "#b4915a" }} />
              <div className="w-8 h-px" style={{ backgroundColor: "#b4915a" }} />
            </div>
            <h1 className="font-['Marcellus'] text-3xl sm:text-4xl font-normal mb-3" style={{ color: "#fff8ee" }}>
              Welcome Back
            </h1>
            <p className="font-['Jost'] text-sm" style={{ color: "rgba(255,248,238,0.45)" }}>
              Sign in to access your collection and saved pieces.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block font-['Jost'] text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: "rgba(180,145,90,0.6)" }}>
                Email Address
              </label>
              <div
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300"
                style={{
                  backgroundColor: focusedField === "email" ? "rgba(180,145,90,0.08)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${focusedField === "email" ? "rgba(180,145,90,0.4)" : "rgba(180,145,90,0.12)"}`,
                }}
              >
                <Mail size={17} style={{ color: focusedField === "email" ? "#b4915a" : "rgba(180,145,90,0.35)" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com"
                  className="flex-1 bg-transparent outline-none font-['Jost'] text-sm"
                  style={{ color: "#fff8ee" }}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-['Jost'] text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: "rgba(180,145,90,0.6)" }}>
                Password
              </label>
              <div
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300"
                style={{
                  backgroundColor: focusedField === "password" ? "rgba(180,145,90,0.08)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${focusedField === "password" ? "rgba(180,145,90,0.4)" : "rgba(180,145,90,0.12)"}`,
                }}
              >
                <Lock size={17} style={{ color: focusedField === "password" ? "#b4915a" : "rgba(180,145,90,0.35)" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your password"
                  className="flex-1 bg-transparent outline-none font-['Jost'] text-sm"
                  style={{ color: "#fff8ee" }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="transition-colors duration-200"
                  style={{ color: "rgba(180,145,90,0.4)" }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="text-right">
              <button type="button" className="font-['Jost'] text-xs transition-colors duration-200 hover:text-[#b4915a]" style={{ color: "rgba(180,145,90,0.5)" }}>
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(180,145,90,0.35)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2.5 font-['Jost'] font-medium text-sm py-4 rounded-full transition-all duration-300"
              style={{ backgroundColor: "#b4915a", color: "#fff", boxShadow: "0 4px 24px rgba(180,145,90,0.25)" }}
            >
              Sign In
              <ArrowRight size={16} strokeWidth={2.5} />
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(180,145,90,0.12)" }} />
            <span className="font-['Jost'] text-[10px] uppercase tracking-wider" style={{ color: "rgba(180,145,90,0.35)" }}>or</span>
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(180,145,90,0.12)" }} />
          </div>

          {/* Social login */}
          <div className="space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 font-['Jost'] text-sm py-3.5 rounded-xl transition-all duration-300 hover:bg-[rgba(255,255,255,0.06)]"
              style={{ border: "1px solid rgba(180,145,90,0.15)", color: "rgba(255,248,238,0.6)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Signup link */}
          <p className="text-center mt-8 font-['Jost'] text-sm" style={{ color: "rgba(255,248,238,0.4)" }}>
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="font-medium transition-colors duration-200 hover:text-[#b4915a]" style={{ color: "#b4915a" }}>
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
