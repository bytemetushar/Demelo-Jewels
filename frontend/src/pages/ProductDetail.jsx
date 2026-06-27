import React, { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ShoppingBag, Star, Gem, ShieldCheck, Truck, Heart, Share2 } from "lucide-react";
import { getProductById, products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { onAddToCart } = useCart();
  const { id } = useParams();
  const product = getProductById(id);
  const detailsRef = useRef(null);
  const detailsInView = useInView(detailsRef, { once: true, margin: "-60px" });
  const relatedRef = useRef(null);
  const relatedInView = useInView(relatedRef, { once: true, margin: "-60px" });

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#fffcf7" }}>
        <div className="text-center">
          <Gem size={64} style={{ color: "rgba(180,145,90,0.3)", margin: "0 auto 16px" }} />
          <h1 className="font-['Marcellus'] text-3xl mb-4" style={{ color: "#2c1a0e" }}>Product Not Found</h1>
          <Link to="/collections" className="font-['Jost'] text-sm underline" style={{ color: "#b4915a" }}>
            Browse Collections
          </Link>
        </div>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fffcf7", fontFamily: "'Jost', sans-serif" }}>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-4 sm:pb-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-1.5 sm:gap-2 font-['Jost'] text-xs sm:text-sm overflow-x-auto scrollbar-hide"
          style={{ color: "#a08060" }}
        >
          <Link to="/" className="hover:underline whitespace-nowrap" style={{ color: "#6b4c2a" }}>Home</Link>
          <span className="flex-shrink-0">/</span>
          <Link to="/collections" className="hover:underline whitespace-nowrap" style={{ color: "#6b4c2a" }}>Collections</Link>
          <span className="flex-shrink-0">/</span>
          <span className="truncate" style={{ color: "#b4915a" }}>{product.name}</span>
        </motion.div>
      </div>

      {/* Main Product Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative rounded-3xl overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            {/* Badge */}
            {product.badge && (
              <span
                className="absolute top-4 left-4 rounded-full px-4 py-1.5 font-['Jost'] text-xs font-semibold uppercase tracking-wider"
                style={{ backgroundColor: "#b4915a", color: "#fff" }}
              >
                {product.badge}
              </span>
            )}

            {/* Floating Actions */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: "rgba(255,252,247,0.85)", backdropFilter: "blur(8px)", color: "#6b4c2a" }}
              >
                <Heart size={18} />
              </button>
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: "rgba(255,252,247,0.85)", backdropFilter: "blur(8px)", color: "#6b4c2a" }}
              >
                <Share2 size={18} />
              </button>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            ref={detailsRef}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="flex flex-col"
          >
            <p className="font-['Jost'] text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#b4915a" }}>
              {product.category}
            </p>

            <h1 className="font-['Marcellus'] text-3xl sm:text-4xl lg:text-5xl font-normal mb-4" style={{ color: "#2c1a0e", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(product.rating) ? "#b4915a" : "none"}
                    style={{ color: "#b4915a" }}
                  />
                ))}
              </div>
              <span className="font-['Jost'] text-sm font-medium" style={{ color: "#6b4c2a" }}>
                {product.rating}
              </span>
              <span className="font-['Jost'] text-sm" style={{ color: "#a08060" }}>
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <p className="font-['Marcellus'] text-3xl sm:text-4xl font-normal mb-6" style={{ color: "#b4915a" }}>
              ${product.price.toLocaleString()}
            </p>

            {/* Description */}
            <p className="font-['Jost'] text-sm sm:text-base leading-relaxed mb-6 sm:mb-8" style={{ color: "#6b4c2a" }}>
              {product.description}
            </p>

            {/* Material Tags */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
              {[
                { icon: Gem, label: product.material },
                { icon: ShieldCheck, label: "Authenticity Certified" },
                { icon: Truck, label: "Complimentary Shipping" },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-['Jost'] text-[10px] sm:text-xs font-medium"
                  style={{ backgroundColor: "#fff8ee", border: "1px solid #e8d9c0", color: "#6b4c2a" }}
                >
                  <Icon size={12} className="sm:w-3.5 sm:h-3.5" style={{ color: "#b4915a" }} />
                  <span className="truncate">{label}</span>
                </span>
              ))}
            </div>

            {/* Specs Grid */}
            {product.specs && (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 p-4 sm:p-5 rounded-xl sm:rounded-2xl" style={{ backgroundColor: "#fff8ee", border: "1px solid #e8d9c0" }}>
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key}>
                    <p className="font-['Jost'] text-[10px] sm:text-xs uppercase tracking-wider mb-0.5 sm:mb-1" style={{ color: "#a08060" }}>
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                    <p className="font-['Marcellus'] text-sm sm:text-base font-normal" style={{ color: "#2c1a0e" }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400 }}
                onClick={() => onAddToCart?.(product)}
                className="inline-flex items-center justify-center gap-2 font-['Jost'] font-semibold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300"
                style={{ backgroundColor: "#b4915a", color: "#fff", boxShadow: "0 4px 20px rgba(180,145,90,0.25)" }}
              >
                <ShoppingBag size={16} className="sm:w-5 sm:h-5" />
                <span className="truncate">Add to Cart — ${product.price.toLocaleString()}</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="inline-flex items-center justify-center gap-2 font-['Jost'] font-medium text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border transition-all duration-300"
                style={{ borderColor: "#e8d9c0", color: "#6b4c2a", backgroundColor: "transparent" }}
              >
                <Heart size={16} className="sm:w-5 sm:h-5" />
                Add to Wishlist
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-between sm:justify-start sm:gap-6 mt-6 sm:mt-8 pt-6 sm:pt-8" style={{ borderTop: "1px solid #e8d9c0" }}>
              {[
                { num: "100%", label: "Conflict-Free" },
                { num: "30-Day", label: "Returns" },
                { num: "Lifetime", label: "Warranty" },
              ].map((badge) => (
                <div key={badge.label} className="text-center flex-1">
                  <p className="font-['Marcellus'] text-xs sm:text-sm font-normal" style={{ color: "#b4915a" }}>{badge.num}</p>
                  <p className="font-['Jost'] text-[9px] sm:text-[10px] uppercase tracking-wider" style={{ color: "#a08060" }}>{badge.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section ref={relatedRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="h-px w-full mb-12" style={{ backgroundColor: "#e8d9c0" }} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={relatedInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <p className="font-['Jost'] text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#b4915a" }}>
              You May Also Love
            </p>
            <h2 className="font-['Marcellus'] text-3xl sm:text-4xl font-normal" style={{ color: "#2c1a0e" }}>
              Related Pieces
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={relatedInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/product/${item.id}`} className="block group">
                  <div
                    className="relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1"
                    style={{ border: "1px solid #e8d9c0", backgroundColor: "#fff", boxShadow: "0 4px 16px rgba(0,0,0,0.05)" }}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </div>
                    <div className="p-4">
                      <p className="font-['Jost'] text-xs font-medium uppercase tracking-wider mb-1" style={{ color: "#b4915a" }}>
                        {item.category}
                      </p>
                      <h3 className="font-['Marcellus'] text-lg mb-1" style={{ color: "#2c1a0e" }}>
                        {item.name}
                      </h3>
                      <p className="font-['Jost'] text-base font-medium" style={{ color: "#6b4c2a" }}>
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
