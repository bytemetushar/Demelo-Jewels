import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ChevronRight, Gem, ArrowRight, Diamond, Quote, Star, ChevronLeft, Heart } from "lucide-react";

import HeroSection from "../components/HeroSection";
import JewelryCategoriesGrid from "../components/JewelryCategoriesGrid";
import FeaturedCollectionGrid from "../components/FeaturedCollectionGrid";
import CheckoutSection from "../components/CheckoutSection";

import { useCart } from "../context/CartContext";
import { apiGet, apiPost } from "../config/api";

import heroImg from "../assets/jewelry_showroom_dark_elegant.jpg";
import detailImg from "../assets/elegant_diamond_necklace_dark_background.jpg";
import scrollImg1 from "../assets/diamond_earrings_luxury_jewelry.jpg";
import scrollImg2 from "../assets/luxury_jewelry_gold_rings_diamonds.jpg";
import scrollImg3 from "../assets/luxury_gold_bracelet_jewelry.jpg";
import scrollImg4 from "../assets/gold_jewelry_collection_luxury.jpg";
import scrollImg5 from "../assets/luxury_watch_gold_jewelry.jpg";

const scrollProducts = [
  { id: 101, name: "Diamond Stud Earrings", price: 4200, image: scrollImg1, tag: "Bestseller" },
  { id: 102, name: "Gold Eternity Ring", price: 3800, image: scrollImg2, tag: "New" },
  { id: 103, name: "Gold Link Bracelet", price: 5600, image: scrollImg3, tag: "Limited" },
  { id: 104, name: "Heritage Gold Set", price: 8900, image: scrollImg4, tag: "Collection" },
  { id: 105, name: "Chronograph Luxe", price: 12400, image: scrollImg5, tag: "Exclusive" },
];

const testimonials = [
  {
    name: "Isabelle M.",
    location: "Paris, France",
    text: "The Celestine necklace took my breath away. The craftsmanship is extraordinary — every diamond catches the light perfectly. My mother cried when she saw it.",
    rating: 5,
    piece: "Celestine Necklace",
  },
  {
    name: "James R.",
    location: "New York, USA",
    text: "I proposed with the Eternity Ring from Demelo. She said yes before I even finished the question. The ring is absolutely stunning.",
    rating: 5,
    piece: "Eternity Ring",
  },
  {
    name: "Anika K.",
    location: "Dubai, UAE",
    text: "Three generations of women in my family now wear Demelo pieces. The Heritage Gold Set is timeless — it feels like wearing a piece of history.",
    rating: 5,
    piece: "Heritage Gold Set",
  },
];


export default function Home() {
  const { onAddToCart, onShowProductModal, toggleSaved, isSaved } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const hScrollRef = useRef(null);
  const detailRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);
  const testimonialRef = useRef(null);


  const hScrollInView = useInView(hScrollRef, { once: true, margin: "-80px" });
  const detailInView = useInView(detailRef, { once: true, margin: "-80px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-80px" });
  const testimonialInView = useInView(testimonialRef, { once: true, margin: "-80px" });

  useEffect(() => {
    apiGet("/api/products")
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]));
    apiGet("/api/categories")
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((p) => (p.category ?? p.categoryName) === selectedCategory)
    : products;

  const onPlaceOrder = async (payload) => {
    setOrderProcessing(true);
    try {
      const res = await apiPost("/api/order", payload);
      setOrderConfirmation(res);
    } catch (e) {
      setOrderConfirmation({ error: e.message });
    } finally {
      setOrderProcessing(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#fffcf7" }}>
      {/* HERO */}
      <div ref={heroRef} className="relative">
        <motion.div style={{ opacity: heroOpacity, y: heroY }}>
          <HeroSection />
        </motion.div>
      </div>

      {/* ── H-SCROLL — Season's Highlights (Dark Cards) ── */}
      <section ref={hScrollRef} className="relative w-full overflow-hidden" style={{ backgroundColor: "#fffcf7" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hScrollInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-10 sm:mb-14 flex items-end justify-between"
          >
            <div>
              <p className="font-['Jost'] text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#b4915a" }}>
                Curated Picks
              </p>
              <h2 className="font-['Marcellus'] text-3xl sm:text-4xl md:text-5xl font-normal" style={{ color: "#2c1a0e", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                This Season&apos;s Highlights
              </h2>
            </div>
            <Link
              to="/collections"
              className="hidden sm:inline-flex items-center gap-2 font-['Jost'] text-sm font-medium transition-colors duration-300 hover:text-[#b4915a]"
              style={{ color: "#a08060" }}
            >
              View All
              <ArrowRight size={15} />
            </Link>
          </motion.div>

          <div
            className="flex gap-4 sm:gap-5 overflow-x-auto pb-6 scrollbar-hide"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
          >
            {scrollProducts.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={hScrollInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                className="flex-shrink-0 group"
                style={{ scrollSnapAlign: "start", width: "min(72vw, 300px)" }}
              >
                <button
                  onClick={() => onShowProductModal(item)}
                  className="block text-left w-full"
                >
                  <div
                    className="relative rounded-2xl overflow-hidden transition-all duration-500 group-hover:-translate-y-2"
                    style={{
                      backgroundColor: "#1a120b",
                      border: "1px solid rgba(180,145,90,0.15)",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                    }}
                  >
                    {/* Image */}
                    <div className="relative h-64 sm:h-72 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a120b] via-[#1a120b]/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a120b]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Gold shimmer */}
                      <div
                        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"
                        style={{ background: "linear-gradient(105deg, transparent 30%, rgba(180,145,90,0.08) 50%, transparent 70%)" }}
                      />

                      {/* Badge */}
                      <span
                        className="absolute top-3 left-3 rounded-full px-3 py-1 font-['Jost'] text-[10px] font-semibold uppercase tracking-[0.15em]"
                        style={{ backgroundColor: "rgba(180,145,90,0.9)", color: "#fff", boxShadow: "0 2px 12px rgba(180,145,90,0.35)" }}
                      >
                        {item.tag}
                      </span>

                      {/* Heart button */}
                      <motion.button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSaved(item); }}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center z-20 transition-all duration-300"
                        style={{
                          backgroundColor: isSaved(item.id) ? "rgba(180,145,90,0.9)" : "rgba(26,18,11,0.5)",
                          backdropFilter: "blur(8px)",
                          border: `1px solid ${isSaved(item.id) ? "rgba(180,145,90,0.5)" : "rgba(255,255,255,0.15)"}`,
                        }}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.85 }}
                      >
                        <Heart
                          size={14}
                          style={{ color: isSaved(item.id) ? "#fff" : "rgba(255,255,255,0.7)" }}
                          fill={isSaved(item.id) ? "#fff" : "none"}
                        />
                      </motion.button>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 relative">
                      <div
                        className="absolute top-0 left-5 right-5 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: "linear-gradient(90deg, transparent, #b4915a, transparent)" }}
                      />
                      <h3 className="font-['Marcellus'] text-base sm:text-lg mb-1.5" style={{ color: "#fff8ee" }}>
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="font-['Marcellus'] text-lg font-normal" style={{ color: "#b4915a" }}>
                          ${item.price.toLocaleString()}
                        </p>
                        <span className="font-['Jost'] text-xs font-medium flex items-center gap-1.5 transition-all duration-300 group-hover:gap-2.5" style={{ color: "rgba(255,248,238,0.4)" }}>
                          View
                          <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DETAIL — 50/50 Feature (Dark Dramatic) ── */}
      <section ref={detailRef} className="relative w-full overflow-hidden" style={{ backgroundColor: "#1a120b" }}>
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(180,145,90,0.05) 0%, transparent 70%)" }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={detailInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden" style={{ border: "1px solid rgba(180,145,90,0.15)" }}>
                <img src={detailImg} alt="Signature piece" className="w-full h-[280px] sm:h-[420px] md:h-[520px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a120b]/60 via-transparent to-transparent" />

                {/* Floating label */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={detailInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute bottom-6 left-6 right-6"
                >
                  <div
                    className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full"
                    style={{
                      backgroundColor: "rgba(26,18,11,0.8)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(180,145,90,0.25)",
                    }}
                  >
                    <Gem size={14} style={{ color: "#b4915a" }} />
                    <span className="font-['Jost'] text-xs font-medium" style={{ color: "#b4915a" }}>Signature Collection</span>
                  </div>
                </motion.div>
              </div>

              {/* Decorative corner */}
              <div className="absolute -top-3 -left-3 w-12 h-12 border-l-2 border-t-2 rounded-tl-xl" style={{ borderColor: "rgba(180,145,90,0.25)" }} />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-r-2 border-b-2 rounded-br-xl" style={{ borderColor: "rgba(180,145,90,0.25)" }} />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={detailInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 mb-5">
                <div className="w-8 h-px" style={{ backgroundColor: "#b4915a" }} />
                <span className="font-['Jost'] text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#b4915a" }}>
                  The Crown Jewel
                </span>
              </div>

              <h2 className="font-['Marcellus'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal mb-5 sm:mb-7" style={{ color: "#fff8ee", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                The Celestine
                <br />
                <span style={{ color: "#b4915a" }}>Necklace</span>
              </h2>

              <p className="font-['Jost'] text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-10" style={{ color: "rgba(255,248,238,0.5)" }}>
                Hand-set with 47 conflict-free diamonds on an 18K gold chain, the Celestine is the
                centerpiece of our Atelier collection. Each stone is selected for brilliance and
                clarity, then set by master artisans in our Milan workshop.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-8 sm:gap-10 mb-10 sm:mb-12">
                {[
                  { label: "Diamonds", value: "47" },
                  { label: "Gold Purity", value: "18K" },
                  { label: "Craft Time", value: "120h" },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={detailInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                    className="relative"
                  >
                    <p className="font-['Marcellus'] text-3xl sm:text-4xl" style={{ color: "#b4915a" }}>{s.value}</p>
                    <p className="font-['Jost'] text-[10px] uppercase tracking-[0.2em] mt-1" style={{ color: "rgba(255,248,238,0.35)" }}>{s.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(180,145,90,0.35)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  onClick={() => onAddToCart({ id: 999, name: "The Celestine Necklace", price: 18500, image: detailImg })}
                  className="inline-flex items-center justify-center gap-2.5 font-['Jost'] font-medium text-sm px-8 py-4 rounded-full transition-all duration-300"
                  style={{ backgroundColor: "#b4915a", color: "#fff", boxShadow: "0 4px 24px rgba(180,145,90,0.25)" }}
                >
                  Add to Cart — $18,500
                  <ChevronRight size={16} strokeWidth={2.5} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03, backgroundColor: "rgba(180,145,90,0.12)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  onClick={() => onShowProductModal({ id: 999, name: "The Celestine Necklace", price: 18500, image: detailImg, description: "Hand-set with 47 conflict-free diamonds on an 18K gold chain." })}
                  className="inline-flex items-center justify-center gap-2 font-['Jost'] font-medium text-sm px-8 py-4 rounded-full border transition-all duration-300"
                  style={{ borderColor: "rgba(180,145,90,0.3)", color: "#b4915a", backgroundColor: "rgba(180,145,90,0.06)" }}
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS (Dark) ── */}
      <section ref={statsRef} className="relative w-full overflow-hidden" style={{ backgroundColor: "#2c1a0e" }}>
        <div className="absolute inset-0 pointer-events-none">
          <img src={heroImg} alt="" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {[
              { num: "1924", label: "Established" },
              { num: "12K+", label: "Pieces Crafted" },
              { num: "47", label: "Countries" },
              { num: "100%", label: "Conflict-Free" },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                className="text-center relative"
              >
                {/* Top gold line */}
                <div className="w-8 h-px mx-auto mb-4" style={{ background: "linear-gradient(90deg, transparent, #b4915a, transparent)" }} />
                <p className="font-['Marcellus'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-1 sm:mb-2" style={{ color: "#b4915a", lineHeight: 1.1 }}>
                  {stat.num}
                </p>
                <p className="font-['Jost'] text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em]" style={{ color: "rgba(255,248,238,0.4)" }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section ref={testimonialRef} className="relative w-full overflow-hidden" style={{ backgroundColor: "#fffcf7" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-14"
          >
            <p className="font-['Jost'] text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#b4915a" }}>
              Client Stories
            </p>
            <h2 className="font-['Marcellus'] text-3xl sm:text-4xl md:text-5xl font-normal" style={{ color: "#2c1a0e", letterSpacing: "-0.02em" }}>
              Cherished by Thousands
            </h2>
          </motion.div>

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1"
                style={{
                  backgroundColor: "#1a120b",
                  border: "1px solid rgba(180,145,90,0.12)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
                }}
              >
                {/* Quote icon */}
                <div className="mb-5">
                  <Quote size={28} style={{ color: "rgba(180,145,90,0.25)" }} />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={13} fill="#b4915a" style={{ color: "#b4915a" }} />
                  ))}
                </div>

                {/* Text */}
                <p className="font-['Jost'] text-sm sm:text-[15px] leading-relaxed mb-6" style={{ color: "rgba(255,248,238,0.6)" }}>
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-['Marcellus'] text-sm"
                    style={{ backgroundColor: "rgba(180,145,90,0.15)", color: "#b4915a" }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-['Marcellus'] text-sm" style={{ color: "#fff8ee" }}>{t.name}</p>
                    <p className="font-['Jost'] text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,248,238,0.3)" }}>{t.location}</p>
                  </div>
                </div>

                {/* Gold corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
                  <div className="absolute -top-8 -right-8 w-16 h-16 rotate-45" style={{ backgroundColor: "rgba(180,145,90,0.08)" }} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-2.5 mt-8 sm:mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className="transition-all duration-300"
                style={{
                  width: activeTestimonial === i ? "24px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  backgroundColor: activeTestimonial === i ? "#b4915a" : "rgba(180,145,90,0.25)",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA (Dark) ── */}
      <section ref={ctaRef} className="relative w-full overflow-hidden" style={{ backgroundColor: "#2c1a0e" }}>
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(44,26,14,0.85) 0%, rgba(44,26,14,0.6) 50%, rgba(44,26,14,0.8) 100%)" }} />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-12 h-px" style={{ backgroundColor: "#b4915a" }} />
              <Diamond size={16} style={{ color: "#b4915a" }} />
              <div className="w-12 h-px" style={{ backgroundColor: "#b4915a" }} />
            </div>
            <h2 className="font-['Marcellus'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal mb-4 sm:mb-6 max-w-3xl mx-auto" style={{ color: "#fff8ee", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              Begin Your Legacy
            </h2>
            <p className="font-['Jost'] text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-12 max-w-xl mx-auto" style={{ color: "rgba(255,248,238,0.55)" }}>
              Every piece at Demelo Jewels is designed to be treasured for generations. Explore the
              collection and find the jewel that speaks to you.
            </p>
            <motion.div
              whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(180,145,90,0.35)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link
                to="/collections"
                className="inline-flex items-center justify-center gap-2.5 font-['Jost'] font-medium text-sm sm:text-base px-9 py-4 rounded-full transition-all duration-300"
                style={{ backgroundColor: "#b4915a", color: "#fff", boxShadow: "0 4px 24px rgba(180,145,90,0.25)" }}
              >
                Shop the Collection
                <ChevronRight size={17} strokeWidth={2.5} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section id="categories" className="relative" style={{ backgroundColor: "#fffcf7" }}>
        <JewelryCategoriesGrid
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat === selectedCategory ? null : cat)}
        />
      </section>

      {/* ── COLLECTION ── */}
      <section id="collection" className="relative" style={{ backgroundColor: "#fffcf7" }}>
        <FeaturedCollectionGrid
          products={filteredProducts}
          onAddToCart={onAddToCart}
          onShowProductModal={onShowProductModal}
        />
      </section>

      {/* Checkout */}
      {checkoutOpen && (
        <CheckoutSection
          onPlaceOrder={onPlaceOrder}
          processing={orderProcessing}
          confirmation={orderConfirmation}
        />
      )}
    </div>
  );
}
