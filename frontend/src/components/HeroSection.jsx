import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Diamond, Sparkles } from 'lucide-react';
import heroImg from '../assets/jewelry_showroom_dark_elegant.jpg';
import necklaceImg from '../assets/elegant_diamond_necklace_dark_background.jpg';
import ringImg from '../assets/luxury_jewelry_gold_rings_diamonds.jpg';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
};

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '100dvh' }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <motion.img
          src={heroImg}
          alt="Luxury jewelry showroom"
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />

        {/* Mobile: bottom-to-top gradient */}
        <div
          className="absolute inset-0 sm:hidden"
          style={{
            background: 'linear-gradient(to top, #1a120b 0%, rgba(26,18,11,0.85) 25%, rgba(26,18,11,0.4) 50%, rgba(26,18,11,0.15) 75%, transparent 100%)',
          }}
        />

        {/* Desktop: left-to-right gradient (original) */}
        <div
          className="absolute inset-0 hidden sm:block"
          style={{
            background:
              'linear-gradient(105deg, #2c1a0e 0%, #2c1a0e 30%, rgba(44,26,14,0.85) 50%, rgba(44,26,14,0.5) 70%, rgba(44,26,14,0.2) 90%, transparent 100%)',
          }}
        />
      </div>

      {/* Decorative floating elements — desktop only */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`diamond-${i}`}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${15 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.08, 0.2, 0.08],
              rotate: [0, 45, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.7,
            }}
          >
            <Diamond size={8 + i * 3} strokeWidth={1} style={{ color: '#b4915a' }} />
          </motion.div>
        ))}

        <div
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(180,145,90,0.06) 0%, transparent 70%)' }}
        />
      </div>

      {/* ── MOBILE LAYOUT ── */}
      <div className="relative z-10 flex sm:hidden flex-col justify-center h-full px-5 max-w-7xl mx-auto" style={{ minHeight: '100dvh' }}>
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="max-w-2xl pt-24 pb-28 text-center items-center flex flex-col"
        >
          {/* Eyebrow */}
          <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2.5 mb-5">
            <div className="w-6 h-[1px]" style={{ backgroundColor: '#b4915a' }} />
            <Diamond size={12} style={{ color: '#b4915a' }} strokeWidth={1.5} />
            <span className="font-['Jost'] text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: '#b4915a' }}>
              Handcrafted Since 1924
            </span>
            <div className="w-6 h-[1px]" style={{ backgroundColor: '#b4915a' }} />
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.25)}
            className="font-['Marcellus'] text-[42px] leading-[1.05] mb-4"
            style={{ color: '#fff8ee' }}
          >
            Timeless
            <br />
            <span className="relative inline-block">
              Elegance
              <motion.span
                className="absolute -bottom-1 left-0 h-[2px] rounded-full"
                style={{ backgroundColor: '#b4915a' }}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
              />
            </span>
            <br />
            <span style={{ color: '#b4915a' }}>Modern Luxury</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            {...fadeUp(0.4)}
            className="font-['Jost'] text-sm leading-relaxed mb-7 max-w-md"
            style={{ color: 'rgba(255,248,238,0.6)' }}
          >
            Discover our curated collection of fine jewelry — where master
            craftsmanship meets contemporary design. Each piece tells a story.
          </motion.p>

          {/* CTAs — full width */}
          <motion.div {...fadeUp(0.55)} className="flex flex-col gap-3 w-full mb-10">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 300 }} className="rounded-full">
              <Link
                to="/collections"
                className="inline-flex items-center justify-center gap-2.5 font-['Jost'] font-medium text-sm px-7 py-3.5 rounded-full transition-all duration-300 w-full"
                style={{ backgroundColor: '#b4915a', color: '#fff', boxShadow: '0 4px 24px rgba(180,145,90,0.25)' }}
              >
                Explore Collection
                <ChevronRight size={17} strokeWidth={2.5} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 300 }} className="rounded-full">
              <Link
                to="/our-story"
                className="inline-flex items-center justify-center gap-2 font-['Jost'] font-medium text-sm px-7 py-3.5 rounded-full border transition-all duration-300 w-full"
                style={{ borderColor: 'rgba(180,145,90,0.4)', color: '#b4915a', backgroundColor: 'rgba(180,145,90,0.06)' }}
              >
                Our Story
              </Link>
            </motion.div>
          </motion.div>

          {/* Mini product card */}
          <motion.div
            {...fadeUp(0.7)}
            className="flex items-center gap-3 p-3 rounded-xl w-full max-w-[260px]"
            style={{
              backgroundColor: 'rgba(26,18,11,0.7)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(180,145,90,0.15)',
            }}
          >
            <img src={necklaceImg} alt="Celestine Necklace" className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-['Jost'] text-[9px] uppercase tracking-wider" style={{ color: '#b4915a' }}>Signature Piece</p>
              <p className="font-['Marcellus'] text-sm truncate" style={{ color: '#fff8ee' }}>Celestine Necklace</p>
              <p className="font-['Jost'] text-xs font-medium" style={{ color: '#b4915a' }}>$18,500</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── DESKTOP LAYOUT (original) ── */}
      <div className="relative z-10 hidden sm:flex items-center h-full px-8 lg:px-16 xl:px-24 max-w-7xl mx-auto" style={{ minHeight: '100vh' }}>
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="max-w-2xl py-0"
        >
          {/* Eyebrow */}
          <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2.5 mb-8">
            <div className="w-8 h-[1px]" style={{ backgroundColor: '#b4915a' }} />
            <Diamond size={14} style={{ color: '#b4915a' }} strokeWidth={1.5} />
            <span className="font-['Jost'] text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#b4915a' }}>
              Handcrafted Since 1924
            </span>
            <div className="w-8 h-[1px]" style={{ backgroundColor: '#b4915a' }} />
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.25)}
            className="font-['Marcellus'] text-5xl md:text-6xl lg:text-[72px] leading-[1.05] mb-6"
            style={{ color: '#fff8ee' }}
          >
            Timeless
            <br />
            <span className="relative inline-block">
              Elegance
              <motion.span
                className="absolute -bottom-1 left-0 h-[2px] rounded-full"
                style={{ backgroundColor: '#b4915a' }}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
              />
            </span>
            <br />
            <span style={{ color: '#b4915a' }}>Modern Luxury</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            {...fadeUp(0.4)}
            className="font-['Jost'] text-base md:text-lg leading-relaxed mb-10 max-w-md"
            style={{ color: 'rgba(255,248,238,0.6)' }}
          >
            Discover our curated collection of fine jewelry — where master
            craftsmanship meets contemporary design. Each piece tells a story.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.55)} className="flex flex-row gap-4 mb-0">
            <motion.div whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(180,145,90,0.35)' }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 300 }} className="rounded-full">
              <Link
                to="/collections"
                className="inline-flex items-center justify-center gap-2.5 font-['Jost'] font-medium text-base px-9 py-4 rounded-full transition-all duration-300"
                style={{ backgroundColor: '#b4915a', color: '#fff', boxShadow: '0 4px 24px rgba(180,145,90,0.25)' }}
              >
                Explore Collection
                <ChevronRight size={17} strokeWidth={2.5} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03, backgroundColor: 'rgba(180,145,90,0.15)' }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 300 }} className="rounded-full">
              <Link
                to="/our-story"
                className="inline-flex items-center justify-center gap-2 font-['Jost'] font-medium text-base px-9 py-4 rounded-full border transition-all duration-300"
                style={{ borderColor: 'rgba(180,145,90,0.4)', color: '#b4915a', backgroundColor: 'rgba(180,145,90,0.06)' }}
              >
                Our Story
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust badges */}
          <motion.div {...fadeUp(0.7)} className="flex items-center gap-8 mt-8">
            {[
              { num: '100%', label: 'Conflict-Free' },
              { num: '47', label: 'Countries' },
              { num: '12K+', label: 'Pieces Crafted' },
            ].map((badge, i) => (
              <div key={badge.label} className="flex items-center gap-3">
                {i > 0 && <div className="w-px h-8" style={{ backgroundColor: 'rgba(180,145,90,0.2)' }} />}
                <div>
                  <p className="font-['Marcellus'] text-xl font-normal" style={{ color: '#b4915a' }}>{badge.num}</p>
                  <p className="font-['Jost'] text-[10px] uppercase tracking-wider" style={{ color: 'rgba(255,248,238,0.4)' }}>{badge.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side — floating product cards */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          className="flex items-center justify-end flex-1 relative"
        >
          <div className="relative w-full max-w-md">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(180,145,90,0.25)', boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }}
            >
              <img src={necklaceImg} alt="Celestine Necklace" className="w-full h-[340px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-['Jost'] text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: '#b4915a' }}>Signature Piece</p>
                <p className="font-['Marcellus'] text-xl" style={{ color: '#fff8ee' }}>Celestine Necklace</p>
                <p className="font-['Jost'] text-sm mt-1" style={{ color: 'rgba(255,248,238,0.6)' }}>47 diamonds · 18K gold</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-6 -left-8 z-20 rounded-xl overflow-hidden flex items-center gap-3 p-3"
              style={{ backgroundColor: 'rgba(44,26,14,0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgba(180,145,90,0.2)', boxShadow: '0 12px 32px rgba(0,0,0,0.3)' }}
            >
              <img src={ringImg} alt="Gold Ring" className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <p className="font-['Jost'] text-[9px] uppercase tracking-wider" style={{ color: '#b4915a' }}>New Arrival</p>
                <p className="font-['Marcellus'] text-sm" style={{ color: '#fff8ee' }}>Eternity Ring</p>
                <p className="font-['Jost'] text-xs font-medium" style={{ color: '#b4915a' }}>$3,800</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ rotate: [0, 180, 360], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 z-20"
            >
              <Sparkles size={24} style={{ color: '#b4915a' }} strokeWidth={1} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gold line accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 1, ease: 'easeInOut' }}
        className="absolute bottom-16 sm:bottom-0 left-0 right-0 h-px origin-left"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #b4915a 20%, #b4915a 80%, transparent 100%)' }}
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-['Jost'] text-[9px] uppercase tracking-[0.3em]" style={{ color: 'rgba(180,145,90,0.5)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-6"
          style={{ background: 'linear-gradient(to bottom, rgba(180,145,90,0.5), transparent)' }}
        />
      </motion.div>
    </section>
  );
}
