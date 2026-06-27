import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare } from "lucide-react";
import heroImg from "../assets/jewelry_showroom_dark_elegant.jpg";

const contactInfo = [
  { icon: Phone, label: "Call Us", value: "+1 (800) 555-GOLD", description: "Mon–Fri, 9am–6pm EST" },
  { icon: Mail, label: "Email", value: "hello@demelojewels.com", description: "We reply within 24 hours" },
  { icon: MapPin, label: "Visit", value: "Via Montenapoleone 12", description: "Milan, Italy 20121" },
  { icon: Clock, label: "Hours", value: "Mon–Sat: 10am–7pm", description: "Sunday by appointment" },
];

export default function Contact() {
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: "-60px" });
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fffcf7", fontFamily: "'Jost', sans-serif" }}>
      {/* Hero */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "40vh", backgroundColor: "#2c1a0e" }}>
        <div className="absolute inset-0">
          <img src={heroImg} alt="Contact" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(44,26,14,0.7) 0%, rgba(44,26,14,0.9) 100%)" }} />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-20 text-center" style={{ minHeight: "40vh" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="font-['Jost'] text-xs sm:text-sm uppercase tracking-[0.25em] mb-4" style={{ color: "#b4915a" }}>
              Get in Touch
            </p>
            <h1 className="font-['Marcellus'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-4" style={{ color: "#fff8ee", letterSpacing: "-0.02em" }}>
              We&apos;d Love to Hear From You
            </h1>
            <p className="font-['Jost'] text-base sm:text-lg max-w-xl mx-auto" style={{ color: "rgba(255,248,238,0.6)" }}>
              Whether you have a question, need assistance, or simply want to share your story, our team is here for you.
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

      {/* Contact Info Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{ backgroundColor: "#fff", border: "1px solid #e8d9c0", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "rgba(180,145,90,0.1)" }}
              >
                <info.icon size={24} style={{ color: "#b4915a" }} strokeWidth={1.5} />
              </div>
              <p className="font-['Jost'] text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#b4915a" }}>
                {info.label}
              </p>
              <p className="font-['Marcellus'] text-base font-normal mb-1" style={{ color: "#2c1a0e" }}>
                {info.value}
              </p>
              <p className="font-['Jost'] text-xs" style={{ color: "#a08060" }}>
                {info.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form & Map */}
      <section ref={formRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl" style={{ backgroundColor: "#fff", border: "1px solid #e8d9c0", boxShadow: "0 8px 32px rgba(0,0,0,0.06)" }}>
              <div className="flex items-center gap-3 mb-8">
                <MessageSquare size={24} style={{ color: "#b4915a" }} />
                <h2 className="font-['Marcellus'] text-2xl sm:text-3xl font-normal" style={{ color: "#2c1a0e" }}>
                  Send Us a Message
                </h2>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle size={64} style={{ color: "#b4915a", margin: "0 auto 16px" }} />
                  <h3 className="font-['Marcellus'] text-2xl mb-3" style={{ color: "#2c1a0e" }}>Thank You!</h3>
                  <p className="font-['Jost'] text-base" style={{ color: "#6b4c2a" }}>
                    Your message has been sent. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "" }); }}
                    className="mt-6 px-6 py-2.5 rounded-full font-['Jost'] text-sm font-medium transition-all duration-300"
                    style={{ backgroundColor: "rgba(180,145,90,0.1)", color: "#b4915a" }}
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-['Jost'] text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#a08060" }}>
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl font-['Jost'] text-sm transition-all duration-300 outline-none"
                        style={{ backgroundColor: "#fff8ee", border: "1.5px solid #e8d9c0", color: "#2c1a0e" }}
                        onFocus={(e) => e.target.style.borderColor = "#b4915a"}
                        onBlur={(e) => e.target.style.borderColor = "#e8d9c0"}
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label className="block font-['Jost'] text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#a08060" }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl font-['Jost'] text-sm transition-all duration-300 outline-none"
                        style={{ backgroundColor: "#fff8ee", border: "1.5px solid #e8d9c0", color: "#2c1a0e" }}
                        onFocus={(e) => e.target.style.borderColor = "#b4915a"}
                        onBlur={(e) => e.target.style.borderColor = "#e8d9c0"}
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-['Jost'] text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#a08060" }}>
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 rounded-xl font-['Jost'] text-sm transition-all duration-300 outline-none"
                      style={{ backgroundColor: "#fff8ee", border: "1.5px solid #e8d9c0", color: "#2c1a0e" }}
                      onFocus={(e) => e.target.style.borderColor = "#b4915a"}
                      onBlur={(e) => e.target.style.borderColor = "#e8d9c0"}
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label className="block font-['Jost'] text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#a08060" }}>
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl font-['Jost'] text-sm transition-all duration-300 outline-none resize-none"
                      style={{ backgroundColor: "#fff8ee", border: "1.5px solid #e8d9c0", color: "#2c1a0e" }}
                      onFocus={(e) => e.target.style.borderColor = "#b4915a"}
                      onBlur={(e) => e.target.style.borderColor = "#e8d9c0"}
                      placeholder="Tell us about your inquiry..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-['Jost'] font-semibold text-sm sm:text-base transition-all duration-300"
                    style={{ backgroundColor: "#b4915a", color: "#fff", boxShadow: "0 4px 20px rgba(180,145,90,0.25)" }}
                  >
                    <Send size={18} />
                    Send Message
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2"
          >
            <div
              className="rounded-2xl sm:rounded-3xl overflow-hidden h-full min-h-[300px] sm:min-h-[400px]"
              style={{ backgroundColor: "#fff8ee", border: "1px solid #e8d9c0" }}
            >
              <div className="relative w-full h-full">
                <img src={heroImg} alt="Our Showroom" className="w-full h-full object-cover" style={{ minHeight: "300px" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="font-['Jost'] text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#b4915a" }}>
                    Our Milan Showroom
                  </p>
                  <p className="font-['Marcellus'] text-xl font-normal mb-1" style={{ color: "#fff8ee" }}>
                    Via Montenapoleone 12
                  </p>
                  <p className="font-['Jost'] text-sm" style={{ color: "rgba(255,248,238,0.7)" }}>
                    20121 Milan, Italy
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="font-['Jost'] text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#b4915a" }}>
            Common Questions
          </p>
          <h2 className="font-['Marcellus'] text-3xl sm:text-4xl font-normal" style={{ color: "#2c1a0e" }}>
            Frequently Asked
          </h2>
        </motion.div>

        <div className="space-y-4">
          {[
            { q: "How long does custom jewelry take?", a: "Custom pieces typically require 4–8 weeks, depending on complexity. We will provide a detailed timeline during your consultation." },
            { q: "Do you offer international shipping?", a: "Yes, we ship to 47 countries worldwide with complimentary insured shipping on all orders over $5,000." },
            { q: "Can I visit the atelier?", a: "Absolutely. Our Milan showroom welcomes visitors by appointment. Contact us to schedule a private viewing." },
            { q: "What is your return policy?", a: "We offer a 30-day return policy for unworn pieces in their original packaging. Custom pieces are final sale." },
          ].map((faq, index) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="p-4 sm:p-6 rounded-xl sm:rounded-2xl"
              style={{ backgroundColor: "#fff", border: "1px solid #e8d9c0" }}
            >
              <h3 className="font-['Marcellus'] text-lg font-normal mb-2" style={{ color: "#2c1a0e" }}>
                {faq.q}
              </h3>
              <p className="font-['Jost'] text-sm leading-relaxed" style={{ color: "#6b4c2a" }}>
                {faq.a}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
