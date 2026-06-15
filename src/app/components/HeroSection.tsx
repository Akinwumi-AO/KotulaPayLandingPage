import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, CheckCircle2, Shield, Zap, Globe2 } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router';
import svgPaths from "../../imports/svg-drp7jvy7jp";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#001c26] via-[#04403a] to-[#001c26]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Decorative circles with animation */}
        <motion.div 
          className="absolute -left-32 -top-20 h-[508px] w-[508px]"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <svg className="size-full opacity-20" fill="none" viewBox="0 0 508 508">
            <g clipPath="url(#clip0_1_668)">
              <path d={svgPaths.p169f4b80} fill="white" opacity="0.1" />
              <path d={svgPaths.p2a1d6f00} fill="white" opacity="0.1" />
              <path d={svgPaths.p3e984400} fill="white" opacity="0.1" />
            </g>
          </svg>
        </motion.div>

        <motion.div 
          className="absolute bottom-0 right-0 h-[464px] w-[464px]"
          animate={{ 
            rotate: -360,
            scale: [1, 1.15, 1]
          }}
          transition={{ 
            rotate: { duration: 80, repeat: Infinity, ease: "linear" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <svg className="size-full opacity-15" fill="none" viewBox="0 0 464 464">
            <g clipPath="url(#clip0_1_737)">
              <path d={svgPaths.pda9e800} fill="white" opacity="0.1" />
              <path d={svgPaths.ped6ad00} fill="white" opacity="0.1" />
              <path d={svgPaths.p3f22200} fill="white" opacity="0.1" />
            </g>
          </svg>
        </motion.div>

        {/* Gradient Blobs */}
        <motion.div 
          className="absolute left-[5%] top-[10%] h-[340px] w-[340px] rounded-full bg-[#c5e063] opacity-20 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute right-[10%] top-[40%] h-[500px] w-[500px] rounded-full bg-[#c5e063] opacity-15 blur-[100px]"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(197, 224, 99, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(197, 224, 99, 0.03) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-40"
        style={{ y, opacity }}
      >
        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-sm">
            <div className="flex size-6 items-center justify-center rounded-full bg-[#c5e063]/20">
              <CheckCircle2 className="size-4 text-[#c5e063]" />
            </div>
            <span className="text-sm text-white/90">Trusted by 500+ businesses globally</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-center"
        >
          <h1 className="mb-4 text-7xl font-bold tracking-tight text-white md:text-8xl">
            Payments that
          </h1>
          <div className="relative inline-block">
            <h1 className="relative z-10 text-7xl font-bold tracking-tight text-[#c5e063] md:text-8xl">
              Power the World
            </h1>
            <motion.div 
              className="absolute -bottom-2 left-0 h-1 bg-[#c5e063]"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 1 }}
            />
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mb-12 max-w-3xl text-center text-xl leading-relaxed text-gray-300 md:text-2xl"
        >
          Enterprise-grade payment infrastructure built for the World. Accept cards, mobile money, 
          and local payment methods through a single, powerful API.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16 flex flex-wrap items-center justify-center gap-4"
        >
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(197, 224, 99, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 rounded-full bg-[#c5e063] px-8 py-4 text-lg font-semibold text-[#0a3d3d] shadow-lg shadow-[#c5e063]/20 transition-all"
            >
              Talk to Sales
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
          >
            Explore Solutions
            <Globe2 className="size-5 transition-transform group-hover:rotate-12" />
          </motion.button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400"
        >
          <div className="flex items-center gap-2">
            <Shield className="size-4 text-[#c5e063]" />
            <span>PCI DSS Level 1</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="size-4 text-[#c5e063]" />
            <span>256-bit Encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-[#c5e063]" />
            <span>ISO 27001 Certified</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}