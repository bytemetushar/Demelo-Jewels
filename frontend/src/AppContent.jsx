import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CartProvider, useCart } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import PageTransition from './components/PageTransition.jsx';
import Home from './pages/Home.jsx';
import Collections from './pages/Collections.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import OurStory from './pages/OurStory.jsx';
import Contact from './pages/Contact.jsx';
import NewArrivals from './pages/NewArrivals.jsx';
import Saved from './pages/Saved.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

function AppRoutes() {
  const location = useLocation();
  const { cartCount, setCartOpen } = useCart();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Jost', sans-serif" }}>
      {!isAuthPage && <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/collections" element={<PageTransition><Collections /></PageTransition>} />
          <Route path="/product/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
          <Route path="/our-story" element={<PageTransition><OurStory /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/new-arrivals" element={<PageTransition><NewArrivals /></PageTransition>} />
          <Route path="/saved" element={<PageTransition><Saved /></PageTransition>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </AnimatePresence>

      {!isAuthPage && <Footer />}
    </div>
  );
}

export default function AppContent() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </AuthProvider>
  );
}
