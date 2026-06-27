import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Gem, Award, Globe, Heart, Sparkles, Star } from "lucide-react";
import heroImg from "../assets/jewelry_showroom_dark_elegant.jpg";

const milestones = [
  { year: "1924", title: "The Beginning", description: "Giuseppe Demelo opens a small goldsmith workshop in Milan, crafting bespoke pieces for local aristocrats." },
  { year: "1952", title: "The Signature Style", description: "Maria Demelo introduces the iconic floral motif that would become the brand's hallmark, blending Italian artistry with nature-inspired design." },
  { year: "1978", title: "International Debut", description: "Demelo Jewels debuts at the Basel International Jewellery Fair, earning acclaim for innovative gem-setting techniques." },
  { year: "1995", title: "The Atelier Expands", description: "A new workshop opens in Milan's Brera district, dedicated to high jewelry and one-of-a-kind creations." },
  { year: "2010", title: "Ethical Commitment", description: "Demelo Jewels pledges 100% conflict-free sourcing, setting a new standard for luxury jewelers worldwide." },
  { year: "2024", title: "A Century of Craft", description: "Celebrating 100 years of artistry, Demelo Jewels continues to push boundaries while honoring tradition." },
];

const values = [
  { icon: Gem, title: "Master Craftsmanship", description: "Every piece is handcrafted by artisans with decades of experience, using techniques refined over a century." },
  { icon: Heart, title: "Ethical Sourcing", description: "We guarantee 100% conflict-free diamonds and responsibly sourced metals for every creation." },
  { icon: Award, title: "Uncompromising Quality", description: "Each jewel undergoes rigorous quality testing, from raw material to finished piece." },
  { icon: Globe, title: "Global Heritage", description: "Our Milan atelier serves clients in 47 countries, bringing Italian elegance to the world." },
];

export default function OurStory() {
  const heroRef = useRef(null);
  const timelineRef = useRef(null);
  const valuesRef = useRef(null);
  const ctaRef = useRef(null);

  const timelineInView = useInView(timelineRef, { once: true, margin: "-80px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fffcf7", fontFamily: "'Jost', sans-serif" }}>
      {/* Hero */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "60vh" }}>
        <div className="absolute inset-0">
          <img src={heroImg} alt="Our Story" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(44,26,14,0.75) 0%, rgba(44,26,14,0.55) 100%)" }} />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center" style={{ minHeight: "60vh" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <p className="font-['Jost'] text-xs sm:text-sm uppercase tracking-[0.25em] mb-4" style={{ color: "#b4915a" }}>
              Our Story
            </p>
            <h1 className="font-['Marcellus'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-6" style={{ color: "#fff8ee", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              A Century of <span style={{ color: "#b4915a" }}>Timeless</span> Artistry
            </h1>
            <p className="font-['Jost'] text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(255,248,238,0.7)" }}>
              From a small workshop in Milan to a global name in fine jewelry, the Demelo legacy is one of passion, precision, and an unwavering commitment to beauty.
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

      {/* Philosophy */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles size={32} style={{ color: "#b4915a", margin: "0 auto 16px" }} />
          <h2 className="font-['Marcellus'] text-3xl sm:text-4xl md:text-5xl font-normal mb-6" style={{ color: "#2c1a0e", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            Where Tradition Meets Vision
          </h2>
          <p className="font-['Jost'] text-base sm:text-lg leading-relaxed mb-6" style={{ color: "#6b4c2a" }}>
            At Demelo Jewels, we believe that true luxury lies not just in the preciousness of materials, but in the story they tell and the emotions they evoke. For a hundred years, our family has poured heart and soul into every creation.
          </p>
          <p className="font-['Jost'] text-base sm:text-lg leading-relaxed" style={{ color: "#6b4c2a" }}>
            Each piece begins as a sketch, imagined by our designers and brought to life by master goldsmiths in our Milan atelier. We work only with the finest natural diamonds and responsibly sourced metals, ensuring that beauty never comes at a cost to conscience.
          </p>
        </motion.div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="relative w-full" style={{ backgroundColor: "#fff8ee" }}>
        <div className="h-px w-full" style={{ backgroundColor: "#e8d9c0" }} />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="font-['Jost'] text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#b4915a" }}>
              Our Journey
            </p>
            <h2 className="font-['Marcellus'] text-3xl sm:text-4xl md:text-5xl font-normal" style={{ color: "#2c1a0e", letterSpacing: "-0.02em" }}>
              A Legacy in the Making
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical Line */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
              style={{ backgroundColor: "#e8d9c0", transform: "translateX(-50%)" }}
            />

            {milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-start mb-12 last:mb-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Dot */}
                  <div
                    className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 z-10"
                    style={{ backgroundColor: "#b4915a", boxShadow: "0 0 0 4px rgba(180,145,90,0.2)" }}
                  />

                  {/* Content */}
                  <div className={`ml-14 md:ml-0 md:w-5/12 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="font-['Marcellus'] text-2xl sm:text-3xl font-normal" style={{ color: "#b4915a" }}>
                      {milestone.year}
                    </span>
                    <h3 className="font-['Marcellus'] text-xl sm:text-2xl font-normal mt-2 mb-3" style={{ color: "#2c1a0e" }}>
                      {milestone.title}
                    </h3>
                    <p className="font-['Jost'] text-sm sm:text-base leading-relaxed" style={{ color: "#6b4c2a" }}>
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        <div className="h-px w-full" style={{ backgroundColor: "#e8d9c0" }} />
      </section>

      {/* Values */}
      <section ref={valuesRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={valuesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="font-['Jost'] text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#b4915a" }}>
            Our Values
          </p>
          <h2 className="font-['Marcellus'] text-3xl sm:text-4xl md:text-5xl font-normal" style={{ color: "#2c1a0e", letterSpacing: "-0.02em" }}>
            What We Stand For
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{ backgroundColor: "#fff", border: "1px solid #e8d9c0", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: "rgba(180,145,90,0.1)" }}
              >
                <value.icon size={28} style={{ color: "#b4915a" }} strokeWidth={1.5} />
              </div>
              <h3 className="font-['Marcellus'] text-xl font-normal mb-3" style={{ color: "#2c1a0e" }}>
                {value.title}
              </h3>
              <p className="font-['Jost'] text-sm leading-relaxed" style={{ color: "#6b4c2a" }}>
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="relative w-full overflow-hidden" style={{ backgroundColor: "#2c1a0e" }}>
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="w-full h-full object-cover opacity-15" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#b4915a" style={{ color: "#b4915a" }} />
              ))}
            </div>
            <h2 className="font-['Marcellus'] text-3xl sm:text-4xl md:text-5xl font-normal mb-6" style={{ color: "#fff8ee", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              Become Part of the Story
            </h2>
            <p className="font-['Jost'] text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "rgba(255,248,238,0.6)" }}>
              Every Demelo jewel is more than a piece of jewelry — it is an heirloom in the making. Begin your chapter with us.
            </p>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link
                to="/collections"
                className="inline-flex items-center justify-center gap-2 font-['Jost'] font-medium text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 rounded-full transition-all duration-300"
                style={{ backgroundColor: "#b4915a", color: "#fff" }}
              >
                Explore the Collection
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
