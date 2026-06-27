import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, ShoppingBag, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getNewArrivals, getFeaturedProducts } from "../data/products";
import { useCart } from "../context/CartContext";

export default function NewArrivals() {
  const { onAddToCart, onShowProductModal } = useCart();
  const newArrivals = getNewArrivals();
  const featured = getFeaturedProducts().filter((p) => p.badge !== "New").slice(0, 4);
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fffcf7", fontFamily: "'Jost', sans-serif" }}>
      {/* Hero */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "50vh", backgroundColor: "#2c1a0e" }}>
        <div className="absolute inset-0">
          <img src={newArrivals[0]?.image} alt="New Arrivals" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(44,26,14,0.7) 0%, rgba(180,145,90,0.2) 50%, rgba(44,26,14,0.8) 100%)" }} />
        </div>

        {/* Floating sparkles decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: "#b4915a",
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                opacity: 0.4,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-20 text-center" style={{ minHeight: "50vh" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: "rgba(180,145,90,0.2)", border: "1.5px solid rgba(180,145,90,0.3)" }}
            >
              <Sparkles size={28} style={{ color: "#b4915a" }} />
            </motion.div>
            <p className="font-['Jost'] text-xs sm:text-sm uppercase tracking-[0.25em] mb-4" style={{ color: "#b4915a" }}>
              Just Arrived
            </p>
            <h1 className="font-['Marcellus'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-6" style={{ color: "#fff8ee", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Fresh from the <span style={{ color: "#b4915a" }}>Atelier</span>
            </h1>
            <p className="font-['Jost'] text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(255,248,238,0.65)" }}>
              Be the first to discover our latest creations — each one a testament to the art of modern jewelry design.
            </p>
          </motion.div>
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 right-0 h-px origin-left"
          style={{ background: "linear-gradient(90deg, transparent 0%, #b4915a 20%, #b4915a 80%, transparent 100%)" }}
        />
      </section>

      {/* New Arrivals Grid */}
      <section ref={gridRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={gridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-['Jost'] text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#b4915a" }}>
            {newArrivals.length} New Pieces
          </p>
          <h2 className="font-['Marcellus'] text-3xl sm:text-4xl md:text-5xl font-normal" style={{ color: "#2c1a0e", letterSpacing: "-0.02em" }}>
            Latest Additions
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {newArrivals.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div
                className="relative overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2"
                style={{ border: "1px solid #e8d9c0", backgroundColor: "#fff", boxShadow: "0 8px 32px rgba(0,0,0,0.06)" }}
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                  {/* New Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full font-['Jost'] text-[11px] font-semibold uppercase tracking-wider"
                      style={{ backgroundColor: "rgba(180,145,90,0.9)", color: "#fff" }}
                    >
                      <Sparkles size={12} />
                      New
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onShowProductModal?.(product)}
                      className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{ backgroundColor: "rgba(255,252,247,0.92)", color: "#6b4c2a", backdropFilter: "blur(8px)" }}
                    >
                      <Eye size={20} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onAddToCart?.(product)}
                      className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{ backgroundColor: "#b4915a", color: "#fff" }}
                    >
                      <ShoppingBag size={20} />
                    </motion.button>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <p className="font-['Jost'] text-[10px] sm:text-xs font-medium uppercase tracking-wider mb-1" style={{ color: "#b4915a" }}>
                      {product.category}
                    </p>
                    <h3 className="font-['Marcellus'] text-base sm:text-xl md:text-2xl font-normal leading-tight" style={{ color: "#fff" }}>
                      {product.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <p className="font-['Marcellus'] text-lg sm:text-2xl font-normal" style={{ color: "#b4915a" }}>
                      ${product.price.toLocaleString()}
                    </p>
                    <Link
                      to={`/product/${product.id}`}
                      className="inline-flex items-center gap-1 font-['Jost'] text-sm font-medium transition-all duration-300 group/link"
                      style={{ color: "#6b4c2a" }}
                    >
                      Details
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Picks CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <div className="h-px w-full mb-10 sm:mb-16" style={{ backgroundColor: "#e8d9c0" }} />
        <div className="text-center mb-8 sm:mb-12">
          <p className="font-['Jost'] text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#b4915a" }}>
            Also Discover
          </p>
          <h2 className="font-['Marcellus'] text-2xl sm:text-3xl md:text-4xl font-normal" style={{ color: "#2c1a0e" }}>
            Editor&apos;s Picks
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {featured.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/product/${product.id}`} className="block group">
                <div
                  className="relative overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-500 hover:-translate-y-1"
                  style={{ border: "1px solid #e8d9c0", backgroundColor: "#fff" }}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-2.5 sm:p-4">
                    <h3 className="font-['Marcellus'] text-xs sm:text-sm md:text-base mb-1 truncate" style={{ color: "#2c1a0e" }}>
                      {product.name}
                    </h3>
                    <p className="font-['Jost'] text-xs sm:text-sm font-medium" style={{ color: "#b4915a" }}>
                      ${product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
