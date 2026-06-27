import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Gem, ShoppingBag, Eye, Grid3X3, LayoutGrid, ChevronDown, Heart } from "lucide-react";
import { products, categories } from "../data/products";
import { useCart } from "../context/CartContext";

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
  { label: "Best Rated", value: "rating" },
];

export default function Collections() {
  const { onAddToCart, onShowProductModal, toggleSaved, isSaved } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [gridCols, setGridCols] = useState(3);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  let filtered = selectedCategory === "All"
    ? [...products]
    : products.filter((p) => p.category === selectedCategory);

  switch (sortBy) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      filtered.sort((a, b) => b.id - a.id);
      break;
    default:
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  const gridClass = gridCols === 2
    ? "grid-cols-1 sm:grid-cols-2"
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fffcf7", fontFamily: "'Jost', sans-serif" }}>
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "40vh", backgroundColor: "#2c1a0e" }}>
        <div className="absolute inset-0">
          <img
            src={products[1].image}
            alt="Collections"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(44,26,14,0.6) 0%, rgba(44,26,14,0.85) 100%)" }} />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 py-16 sm:py-20 text-center" style={{ minHeight: "40vh" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="font-['Jost'] text-xs sm:text-sm uppercase tracking-[0.25em] mb-4" style={{ color: "#b4915a" }}>
              Our Collections
            </p>
            <h1 className="font-['Marcellus'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-4" style={{ color: "#fff8ee", letterSpacing: "-0.02em" }}>
              Discover Exquisite Pieces
            </h1>
            <p className="font-['Jost'] text-sm sm:text-base md:text-lg max-w-xl mx-auto" style={{ color: "rgba(255,248,238,0.65)" }}>
              Browse our curated selection of fine jewelry, each piece handcrafted with passion and precision.
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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* Filters Bar */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 sm:gap-6 mb-8 sm:mb-10"
        >
          {/* Category Pills - horizontal scroll on mobile */}
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide" style={{ WebkitOverflowScrolling: "touch" }}>
            {["All", ...categories].map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedCategory(cat)}
                className="flex-shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-['Jost'] text-xs sm:text-sm font-medium transition-all duration-300"
                style={{
                  backgroundColor: selectedCategory === cat ? "#b4915a" : "#fff",
                  color: selectedCategory === cat ? "#fff" : "#6b4c2a",
                  border: selectedCategory === cat ? "1.5px solid #b4915a" : "1.5px solid #e8d9c0",
                  boxShadow: selectedCategory === cat ? "0 4px 16px rgba(180,145,90,0.25)" : "none",
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <p className="font-['Jost'] text-xs sm:text-sm" style={{ color: "#a08060" }}>
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"} found
            </p>
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-3 sm:pl-4 pr-8 sm:pr-10 py-2 sm:py-2.5 rounded-xl font-['Jost'] text-xs sm:text-sm font-medium cursor-pointer transition-all duration-300"
                  style={{
                    backgroundColor: "#fff",
                    border: "1.5px solid #e8d9c0",
                    color: "#6b4c2a",
                    outline: "none",
                  }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#a08060" }} />
              </div>

              {/* Grid Toggle */}
              <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl" style={{ backgroundColor: "#fff", border: "1.5px solid #e8d9c0" }}>
                <button
                  onClick={() => setGridCols(2)}
                  className="p-1.5 sm:p-2 rounded-lg transition-all duration-200"
                  style={{ backgroundColor: gridCols === 2 ? "#b4915a" : "transparent", color: gridCols === 2 ? "#fff" : "#a08060" }}
                >
                  <Grid3X3 size={14} />
                </button>
                <button
                  onClick={() => setGridCols(3)}
                  className="p-1.5 sm:p-2 rounded-lg transition-all duration-200"
                  style={{ backgroundColor: gridCols === 3 ? "#b4915a" : "transparent", color: gridCols === 3 ? "#fff" : "#a08060" }}
                >
                  <LayoutGrid size={14} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Product Grid */}
        <div className={`grid gap-5 sm:gap-7 ${gridClass}`}>
          {filtered.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
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

                  {/* Invisible click target — tapping the image opens details */}
                  <button
                    onClick={() => onShowProductModal?.(product)}
                    className="absolute inset-0 z-10 cursor-pointer"
                    aria-label={`View details of ${product.name}`}
                  />

                  {/* Dark overlay always visible, stronger on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a120b] via-[#1a120b]/20 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a120b]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Gold shimmer sweep on hover */}
                  <div
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"
                    style={{
                      background: "linear-gradient(105deg, transparent 30%, rgba(180,145,90,0.08) 50%, transparent 70%)",
                    }}
                  />

                  {/* Badge */}
                  {product.badge && (
                    <span
                      className="absolute top-3 left-3 sm:top-4 sm:left-4 rounded-full px-3 py-1 font-['Jost'] text-[10px] font-semibold uppercase tracking-[0.15em]"
                      style={{
                        backgroundColor: "rgba(180,145,90,0.9)",
                        color: "#fff",
                        boxShadow: "0 2px 12px rgba(180,145,90,0.35)",
                      }}
                    >
                      {product.badge}
                    </span>
                  )}

                  {/* Quick view circle — always visible on mobile, hover on desktop */}
                  <motion.button
                    onClick={() => onShowProductModal?.(product)}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:scale-75 sm:group-hover:scale-100 z-20"
                    style={{
                      backgroundColor: "rgba(180,145,90,0.85)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(180,145,90,0.4)",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
                    }}
                    whileHover={{ backgroundColor: "#b4915a", scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Eye size={16} style={{ color: "#fff" }} />
                  </motion.button>

                  {/* Heart / Save button — always visible */}
                  <motion.button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSaved(product); }}
                    className="absolute top-3 left-3 sm:top-4 sm:left-4 w-10 h-10 rounded-full flex items-center justify-center z-20 transition-all duration-300"
                    style={{
                      backgroundColor: isSaved(product.id) ? "rgba(180,145,90,0.9)" : "rgba(26,18,11,0.5)",
                      backdropFilter: "blur(8px)",
                      border: `1px solid ${isSaved(product.id) ? "rgba(180,145,90,0.5)" : "rgba(255,255,255,0.15)"}`,
                      boxShadow: isSaved(product.id) ? "0 2px 12px rgba(180,145,90,0.4)" : "0 2px 8px rgba(0,0,0,0.2)",
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.85 }}
                  >
                    <Heart
                      size={16}
                      style={{ color: isSaved(product.id) ? "#fff" : "rgba(255,255,255,0.7)" }}
                      fill={isSaved(product.id) ? "#fff" : "none"}
                    />
                  </motion.button>

                  {/* Bottom actions — always visible on mobile, hover on desktop */}
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 z-20">
                    <motion.button
                      onClick={() => onAddToCart?.(product)}
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
                  {/* Gold accent line on top */}
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
                      ${product.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className="text-[8px] sm:text-[10px]"
                          style={{ color: i < Math.floor(product.rating) ? "#b4915a" : "rgba(180,145,90,0.25)" }}
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
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 sm:py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(180,145,90,0.1)", border: "1px solid rgba(180,145,90,0.2)" }}>
              <Gem size={28} style={{ color: "#b4915a" }} />
            </div>
            <p className="font-['Marcellus'] text-xl sm:text-2xl mt-4" style={{ color: "#2c1a0e" }}>
              No pieces found
            </p>
            <p className="font-['Jost'] text-xs sm:text-sm mt-2" style={{ color: "#a08060" }}>
              Try adjusting your filters to discover more
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
