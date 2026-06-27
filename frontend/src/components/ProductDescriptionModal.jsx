import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Star, Gem, ShieldCheck, Truck, ArrowRight } from "lucide-react";

export default function ProductDescriptionModal({ product, onAddToCart, onClose }) {
  useEffect(() => {
    if (!product) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, product]);

  if (!product) return null;

  const safeProduct = product ?? {};
  const image = safeProduct.image ?? null;
  const title = safeProduct.title ?? safeProduct.name ?? "Luxury Jewelry Piece";
  const price = safeProduct.price ?? null;
  const description =
    safeProduct.description ??
    "A meticulously crafted piece that embodies timeless elegance. Designed for those who appreciate the finer details in life, each element is hand-selected and set by master artisans.";
  const rating = safeProduct.rating ?? 4.9;
  const reviews = safeProduct.reviews ?? 12;
  const material = safeProduct.material ?? "18K Gold & Diamonds";
  const inStock = safeProduct.inStock ?? true;

  const handleAdd = () => {
    if (onAddToCart && product) onAddToCart(product);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(44,26,14,0.55)", backdropFilter: "blur(4px)" }}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal Card - full width bottom sheet on mobile, centered card on desktop */}
        <motion.div
          className="relative z-10 w-full sm:max-w-4xl max-h-[90vh] sm:max-h-none overflow-hidden rounded-t-3xl sm:rounded-3xl"
          style={{ backgroundColor: "#fffcf7", border: "1px solid #e8d9c0", boxShadow: "0 -4px 32px rgba(44,26,14,0.18)" }}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        >
          {/* Drag indicator on mobile */}
          <div className="flex justify-center pt-3 sm:hidden">
            <div className="w-10 h-1 rounded-full" style={{ backgroundColor: "#e8d9c0" }} />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-colors duration-200"
            style={{ backgroundColor: "#f0e8d8", color: "#6b4c2a" }}
            aria-label="Close"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex flex-col md:flex-row overflow-y-auto max-h-[90vh] sm:max-h-none">
            {/* Image */}
            <div className="relative w-full md:w-1/2 h-56 sm:h-72 md:h-auto flex-shrink-0" style={{ backgroundColor: "#f5ede0" }}>
              {image ? (
                <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Gem className="w-12 h-12 sm:w-16 sm:h-16" style={{ color: "rgba(180,145,90,0.3)" }} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Details */}
            <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-['Jost'] font-medium" style={{ color: "#b4915a" }}>
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#b4915a]" style={{ color: "#b4915a" }} />
                  {typeof rating === "number" ? rating.toFixed(1) : rating}
                </span>
                <span className="text-xs sm:text-sm font-['Jost']" style={{ color: "#a08060" }}>
                  ({typeof reviews === "number" ? reviews : 0} reviews)
                </span>
              </div>

              <h2 className="font-['Marcellus'] text-xl sm:text-2xl md:text-3xl leading-tight mb-1.5 sm:mb-2" style={{ color: "#2c1a0e" }}>
                {title}
              </h2>

              <p className="font-['Jost'] text-lg sm:text-xl md:text-2xl font-medium mb-3 sm:mb-4" style={{ color: "#b4915a" }}>
                {price != null ? `$${Number(price).toLocaleString()}` : "Price on request"}
              </p>

              <p className="font-['Jost'] text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6" style={{ color: "#6b4c2a" }}>
                {description}
              </p>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                {[
                  { icon: Gem, label: material },
                  { icon: ShieldCheck, label: "Certified" },
                  { icon: Truck, label: "Free Shipping" },
                ].map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-['Jost'] text-[10px] sm:text-xs font-medium"
                    style={{ backgroundColor: "#fff8ee", border: "1px solid #e8d9c0", color: "#6b4c2a" }}
                  >
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{ color: "#b4915a" }} />
                    {label}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-2 sm:gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAdd}
                  disabled={!inStock}
                  className="inline-flex items-center justify-center gap-2 flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl sm:rounded-3xl font-['Jost'] font-semibold text-sm sm:text-base transition-all duration-300"
                  style={
                    inStock
                      ? { backgroundColor: "#b4915a", color: "#fff" }
                      : { backgroundColor: "#e8d9c0", color: "#a08060", cursor: "not-allowed" }
                  }
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                  {inStock ? "Add to Cart" : "Out of Stock"}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl sm:rounded-3xl font-['Jost'] font-semibold text-sm sm:text-base border transition-all duration-300"
                  style={{ borderColor: "#e8d9c0", color: "#6b4c2a", backgroundColor: "transparent" }}
                >
                  Close
                </motion.button>
                </div>

                {product?.id && (
                  <Link
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-2xl sm:rounded-3xl font-['Jost'] text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-[rgba(180,145,90,0.08)]"
                    style={{ color: "#b4915a" }}
                  >
                    View Full Details
                    <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
