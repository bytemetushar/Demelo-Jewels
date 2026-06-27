import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Trash2, ArrowRight, Gem } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Saved() {
  const { savedItems, toggleSaved, onAddToCart } = useCart();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fffcf7" }}>
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "30vh", backgroundColor: "#1a120b" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${15 + i * 20}%`, top: `${20 + (i % 2) * 25}%` }}
              animate={{ y: [0, -12, 0], opacity: [0.08, 0.2, 0.08], rotate: [0, 45, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
            >
              <Gem size={10 + i * 3} strokeWidth={1} style={{ color: "#b4915a" }} />
            </motion.div>
          ))}
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 py-14 sm:py-18 text-center" style={{ minHeight: "30vh" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2.5 mb-5">
              <div className="w-8 h-px" style={{ backgroundColor: "#b4915a" }} />
              <Heart size={14} style={{ color: "#b4915a" }} fill="#b4915a" />
              <div className="w-8 h-px" style={{ backgroundColor: "#b4915a" }} />
            </div>
            <h1 className="font-['Marcellus'] text-3xl sm:text-4xl md:text-5xl font-normal mb-3" style={{ color: "#fff8ee", letterSpacing: "-0.02em" }}>
              Your Saved Pieces
            </h1>
            <p className="font-['Jost'] text-sm sm:text-base max-w-md mx-auto" style={{ color: "rgba(255,248,238,0.5)" }}>
              {savedItems.length > 0
                ? `You have ${savedItems.length} cherished ${savedItems.length === 1 ? "piece" : "pieces"} saved.`
                : "Start saving pieces you love to see them here."}
            </p>
          </motion.div>
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 right-0 h-px origin-left"
          style={{ background: "linear-gradient(90deg, transparent, #b4915a 20%, #b4915a 80%, transparent)" }}
        />
      </section>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-18">
        {savedItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 sm:py-24"
          >
            <div
              className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(180,145,90,0.08)", border: "1px solid rgba(180,145,90,0.15)" }}
            >
              <Heart size={32} style={{ color: "rgba(180,145,90,0.35)" }} />
            </div>
            <h2 className="font-['Marcellus'] text-2xl sm:text-3xl mb-3" style={{ color: "#2c1a0e" }}>
              No saved pieces yet
            </h2>
            <p className="font-['Jost'] text-sm sm:text-base mb-8 max-w-sm mx-auto" style={{ color: "#a08060" }}>
              Tap the heart icon on any piece to save it to your collection.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/collections"
                className="inline-flex items-center gap-2.5 font-['Jost'] font-medium text-sm px-8 py-3.5 rounded-full transition-all duration-300"
                style={{ backgroundColor: "#b4915a", color: "#fff", boxShadow: "0 4px 20px rgba(180,145,90,0.25)" }}
              >
                Explore Collections
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {savedItems.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative"
                >
                  <div
                    className="relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2"
                    style={{
                      border: "1px solid rgba(180,145,90,0.15)",
                      backgroundColor: "#1a120b",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                    }}
                  >
                    {/* Image */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a120b] via-[#1a120b]/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a120b]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Gold shimmer */}
                      <div
                        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"
                        style={{ background: "linear-gradient(105deg, transparent 30%, rgba(180,145,90,0.08) 50%, transparent 70%)" }}
                      />

                      {/* Badge */}
                      {product.badge && (
                        <span
                          className="absolute top-3 left-3 rounded-full px-3 py-1 font-['Jost'] text-[10px] font-semibold uppercase tracking-[0.15em]"
                          style={{ backgroundColor: "rgba(180,145,90,0.9)", color: "#fff", boxShadow: "0 2px 12px rgba(180,145,90,0.35)" }}
                        >
                          {product.badge}
                        </span>
                      )}

                      {/* Remove from saved */}
                      <motion.button
                        onClick={() => toggleSaved(product)}
                        className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center z-20 transition-all duration-300"
                        style={{
                          backgroundColor: "rgba(220,60,60,0.85)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(255,100,100,0.3)",
                          boxShadow: "0 2px 12px rgba(220,60,60,0.3)",
                        }}
                        whileHover={{ scale: 1.15, backgroundColor: "rgba(220,60,60,1)" }}
                        whileTap={{ scale: 0.85 }}
                      >
                        <Trash2 size={15} style={{ color: "#fff" }} />
                      </motion.button>

                      {/* Add to cart */}
                      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 z-20">
                        <motion.button
                          onClick={() => onAddToCart(product)}
                          className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 sm:py-3 font-['Jost'] text-xs sm:text-sm font-semibold transition-all duration-300 sm:opacity-0 sm:translate-y-4 sm:group-hover:opacity-100 sm:group-hover:translate-y-0"
                          style={{
                            backgroundColor: "#b4915a",
                            color: "#fff",
                            boxShadow: "0 4px 20px rgba(180,145,90,0.4)",
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <ShoppingBag size={15} />
                          Add to Cart
                        </motion.button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 relative">
                      <div
                        className="absolute top-0 left-5 right-5 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: "linear-gradient(90deg, transparent, #b4915a, transparent)" }}
                      />
                      <p className="mb-1.5 font-['Jost'] text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em]" style={{ color: "#b4915a" }}>
                        {product.category}
                      </p>
                      <h3 className="mb-2 font-['Marcellus'] text-sm sm:text-lg font-normal leading-snug" style={{ color: "#fff8ee" }}>
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="font-['Marcellus'] text-base sm:text-xl font-normal" style={{ color: "#b4915a" }}>
                          ${product.price?.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className="text-[8px] sm:text-[10px]"
                              style={{ color: i < Math.floor(product.rating || 0) ? "#b4915a" : "rgba(180,145,90,0.25)" }}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
