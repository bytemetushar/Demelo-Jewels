import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Diamond, Home, Grid3X3, Sparkles, Phone, Heart, User, LogOut } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Header({ cartCount = 0, onCartOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const { savedCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    { label: "Collections", path: "/collections", icon: Grid3X3 },
    { label: "New Arrivals", path: "/new-arrivals", icon: Sparkles },
    { label: "Our Story", path: "/our-story", icon: Diamond },
    { label: "Contact", path: "/contact", icon: Phone },
  ];

  const isHome = location.pathname === "/";

  const bottomTabs = [
    { label: "Home", path: "/", icon: Home },
    { label: "Collections", path: "/collections", icon: Grid3X3 },
    { label: "New In", path: "/new-arrivals", icon: Sparkles },
    { label: "Saved", path: "/saved", icon: Heart },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{
            backgroundColor: scrolled
              ? "rgba(255,252,247,0.97)"
              : isHome
              ? "rgba(255,252,247,0.88)"
              : "rgba(255,252,247,0.97)",
            backdropFilter: scrolled ? "blur(16px)" : "blur(8px)",
            WebkitBackdropFilter: scrolled ? "blur(16px)" : "blur(8px)",
            borderBottom: scrolled
              ? "1px solid rgba(180,145,90,0.25)"
              : "1px solid rgba(180,145,90,0.12)",
            boxShadow: scrolled ? "0 2px 24px rgba(150,110,60,0.08)" : "none",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-10 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 z-10" aria-label="Home">
            <span
              className="text-[20px] sm:text-[22px] md:text-[26px] font-normal tracking-wide"
              style={{ fontFamily: "'Marcellus', serif", color: "#2c1a0e" }}
            >
              Demelo Jewels
            </span>
            <span
              className="hidden sm:inline-block w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "#b4915a" }}
            />
          </Link>

          {/* Center Nav — Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className="relative text-sm font-medium transition-colors duration-200"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    color: isActive ? "#b4915a" : "#6b4c2a",
                  }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 h-[1.5px] bg-[#b4915a] transition-all duration-300"
                    style={{ width: isActive ? "100%" : "0%" }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3 z-10">
            {/* Profile / Login */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition-all duration-300"
                  style={{
                    borderColor: profileOpen ? "#b4915a" : "rgba(180,145,90,0.35)",
                    backgroundColor: profileOpen ? "rgba(180,145,90,0.15)" : "rgba(180,145,90,0.08)",
                    color: "#b4915a",
                  }}
                >
                  <span className="font-['Marcellus'] text-sm font-normal">{user.avatar}</span>
                </button>

                {/* Profile dropdown */}
                <AnimatePresence>
                  {profileOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-56 rounded-xl overflow-hidden z-50"
                        style={{
                          backgroundColor: "#1a120b",
                          border: "1px solid rgba(180,145,90,0.2)",
                          boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                        }}
                      >
                        <div className="px-4 py-3 border-b" style={{ borderColor: "rgba(180,145,90,0.1)" }}>
                          <p className="font-['Marcellus'] text-sm" style={{ color: "#fff8ee" }}>{user.name}</p>
                          <p className="font-['Jost'] text-[10px] mt-0.5" style={{ color: "rgba(255,248,238,0.4)" }}>{user.email}</p>
                        </div>
                        <div className="py-1">
                          <Link
                            to="/saved"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 font-['Jost'] text-sm transition-colors duration-200 hover:bg-[rgba(180,145,90,0.08)]"
                            style={{ color: "rgba(255,248,238,0.6)" }}
                          >
                            <Heart size={15} />
                            Saved Pieces
                          </Link>
                          <button
                            onClick={() => { logout(); setProfileOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 font-['Jost'] text-sm transition-colors duration-200 hover:bg-[rgba(180,145,90,0.08)]"
                            style={{ color: "rgba(255,248,238,0.6)" }}
                          >
                            <LogOut size={15} />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition-all duration-300 hover:bg-[rgba(180,145,90,0.15)]"
                style={{
                  borderColor: "rgba(180,145,90,0.35)",
                  backgroundColor: "rgba(180,145,90,0.08)",
                  color: "#6b4c2a",
                }}
              >
                <User size={17} strokeWidth={1.8} />
              </Link>
            )}

            <button
              aria-label="Open cart"
              onClick={onCartOpen}
              className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition-all duration-300"
              style={{
                borderColor: "rgba(180,145,90,0.35)",
                backgroundColor: "rgba(180,145,90,0.08)",
                color: "#6b4c2a",
              }}
            >
              <ShoppingBag size={17} strokeWidth={1.8} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold"
                  style={{ backgroundColor: "#b4915a", color: "#fff" }}
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition-all duration-300"
              style={{
                borderColor: mobileOpen ? "transparent" : "rgba(180,145,90,0.3)",
                backgroundColor: mobileOpen ? "#b4915a" : "rgba(180,145,90,0.07)",
                color: mobileOpen ? "#fff" : "#6b4c2a",
              }}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={17} strokeWidth={2} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={17} strokeWidth={2} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Full-Screen Mobile Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] md:hidden flex flex-col"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(44,26,14,0.6)" }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative flex flex-col h-full"
              style={{
                background: "linear-gradient(160deg, #1a120b 0%, #2c1a0e 40%, #1a120b 100%)",
              }}
            >
              {/* Decorative background elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                  className="absolute -top-32 -right-32 w-64 h-64 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(180,145,90,0.06) 0%, transparent 70%)" }}
                />
                <div
                  className="absolute bottom-20 -left-20 w-48 h-48 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(180,145,90,0.04) 0%, transparent 70%)" }}
                />
                {/* Floating diamonds */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{ right: `${15 + i * 18}%`, top: `${20 + (i % 2) * 30}%` }}
                    animate={{ y: [0, -10, 0], opacity: [0.1, 0.25, 0.1], rotate: [0, 45, 0] }}
                    transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  >
                    <Diamond size={10 + i * 3} strokeWidth={1} style={{ color: "#b4915a" }} />
                  </motion.div>
                ))}
              </div>

              {/* Top bar inside overlay */}
              <div className="relative flex items-center justify-between px-5 pt-4 pb-2">
                <span className="font-['Jost'] text-[10px] uppercase tracking-[0.3em]" style={{ color: "rgba(180,145,90,0.5)" }}>
                  Navigation
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ border: "1px solid rgba(180,145,90,0.2)" }}
                >
                  <X size={16} style={{ color: "#b4915a" }} />
                </button>
              </div>

              {/* Gold divider */}
              <div className="mx-5 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(180,145,90,0.3), transparent)" }} />

              {/* Nav links */}
              <nav className="relative flex-1 flex flex-col justify-center px-8 gap-1">
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.path;
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.07, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setMobileOpen(false)}
                        className="group flex items-center gap-4 py-4 transition-all duration-300"
                        style={{ borderBottom: "1px solid rgba(180,145,90,0.08)" }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                          style={{
                            backgroundColor: isActive ? "rgba(180,145,90,0.2)" : "rgba(180,145,90,0.06)",
                            border: `1px solid ${isActive ? "rgba(180,145,90,0.35)" : "rgba(180,145,90,0.1)"}`,
                          }}
                        >
                          <Icon size={18} style={{ color: isActive ? "#b4915a" : "rgba(180,145,90,0.5)" }} />
                        </div>
                        <div>
                          <span
                            className="block text-xl sm:text-2xl font-normal transition-colors duration-300"
                            style={{
                              fontFamily: "'Marcellus', serif",
                              color: isActive ? "#b4915a" : "#fff8ee",
                            }}
                          >
                            {link.label}
                          </span>
                          <span
                            className="block text-[10px] uppercase tracking-[0.2em] mt-0.5 font-['Jost']"
                            style={{ color: isActive ? "rgba(180,145,90,0.6)" : "rgba(255,248,238,0.25)" }}
                          >
                            {link.label === "Collections" && "Explore all pieces"}
                            {link.label === "New Arrivals" && "Latest additions"}
                            {link.label === "Our Story" && "Our heritage"}
                            {link.label === "Contact" && "Get in touch"}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Auth link in mobile overlay */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + navLinks.length * 0.07, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Link
                    to={isAuthenticated ? "/saved" : "/login"}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center gap-4 py-4 transition-all duration-300"
                    style={{ borderBottom: "1px solid rgba(180,145,90,0.08)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: "rgba(180,145,90,0.06)",
                        border: "1px solid rgba(180,145,90,0.1)",
                      }}
                    >
                      {isAuthenticated ? <User size={18} style={{ color: "rgba(180,145,90,0.5)" }} /> : <User size={18} style={{ color: "rgba(180,145,90,0.5)" }} />}
                    </div>
                    <div>
                      <span
                        className="block text-xl sm:text-2xl font-normal transition-colors duration-300"
                        style={{ fontFamily: "'Marcellus', serif", color: "#fff8ee" }}
                      >
                        {isAuthenticated ? `Hi, ${user.name}` : "Sign In"}
                      </span>
                      <span
                        className="block text-[10px] uppercase tracking-[0.2em] mt-0.5 font-['Jost']"
                        style={{ color: "rgba(255,248,238,0.25)" }}
                      >
                        {isAuthenticated ? "View your profile" : "Access your account"}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </nav>

              {/* Bottom section */}
              <div className="relative px-8 pb-8 pt-4">
                <div className="h-px mb-6" style={{ background: "linear-gradient(90deg, transparent, rgba(180,145,90,0.2), transparent)" }} />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.4 }}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-['Jost'] text-[10px] uppercase tracking-[0.2em]" style={{ color: "rgba(180,145,90,0.4)" }}>
                      Handcrafted Since
                    </p>
                    <p className="font-['Marcellus'] text-lg" style={{ color: "rgba(255,248,238,0.6)" }}>
                      1924
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {["Instagram", "Pinterest", "TikTok"].map((social) => (
                      <span
                        key={social}
                        className="text-[9px] uppercase tracking-wider font-['Jost'] cursor-pointer transition-colors duration-300 hover:text-[#b4915a]"
                        style={{ color: "rgba(255,248,238,0.25)" }}
                      >
                        {social}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom Tab Bar (Mobile only) ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div
          className="flex items-stretch justify-around h-16"
          style={{
            backgroundColor: "rgba(26,18,11,0.97)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(180,145,90,0.15)",
            boxShadow: "0 -4px 24px rgba(0,0,0,0.2)",
          }}
        >
          {bottomTabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            const Icon = tab.icon;
            const isSavedTab = tab.label === "Saved";
            return (
              <Link
                key={tab.label}
                to={tab.path}
                className="flex flex-col items-center justify-center gap-1 flex-1 relative"
              >
                {/* Active indicator dot */}
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute -top-px left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full"
                    style={{ backgroundColor: "#b4915a" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {/* Saved badge */}
                {isSavedTab && savedCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1.5 right-1/2 translate-x-4 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[7px] font-bold"
                    style={{ backgroundColor: "#b4915a", color: "#fff" }}
                  >
                    {savedCount}
                  </motion.span>
                )}
                <Icon
                  size={19}
                  style={{ color: isActive ? "#b4915a" : "rgba(255,248,238,0.35)" }}
                  strokeWidth={isActive ? 2 : 1.5}
                  fill={isSavedTab && savedCount > 0 ? "#b4915a" : "none"}
                />
                <span
                  className="text-[9px] font-medium font-['Jost'] tracking-wider"
                  style={{ color: isActive ? "#b4915a" : "rgba(255,248,238,0.35)" }}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}

          {/* Cart tab with badge */}
          <button
            onClick={onCartOpen}
            className="flex flex-col items-center justify-center gap-1 flex-1 relative"
          >
            {cartCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1.5 right-1/2 translate-x-4 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[7px] font-bold"
                style={{ backgroundColor: "#b4915a", color: "#fff" }}
              >
                {cartCount}
              </motion.div>
            )}
            <ShoppingBag
              size={19}
              style={{ color: "rgba(255,248,238,0.35)" }}
              strokeWidth={1.5}
            />
            <span
              className="text-[9px] font-medium font-['Jost'] tracking-wider"
              style={{ color: "rgba(255,248,238,0.35)" }}
            >
              Cart
            </span>
          </button>
        </div>
        {/* Safe area padding for iPhone */}
        <div className="h-[env(safe-area-inset-bottom)]" style={{ backgroundColor: "rgba(26,18,11,0.97)" }} />
      </div>
    </>
  );
}
