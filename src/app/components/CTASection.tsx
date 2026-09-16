import { motion } from 'motion/react';
import { ArrowRight, Rocket } from 'lucide-react';
import { Link } from 'react-router';

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#04403a] to-[#001c26] py-24">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-[#c5e063] opacity-20 blur-[150px]"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-[#c5e063] opacity-20 blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -100, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-[#c5e063]/30 bg-gradient-to-br from-[#c5e063]/10 via-[#c5e063]/5 to-transparent p-12 backdrop-blur-sm md:p-16"
        >
          {/* Decorative elements */}
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#c5e063] opacity-20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#c5e063] opacity-20 blur-3xl" />

          {/* Content */}
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring" }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c5e063]/30 bg-[#c5e063]/20 px-4 py-2"
            >
              <Rocket className="size-5 text-[#c5e063]" />
              <span className="text-sm font-medium text-[#c5e063]">Start Your Journey</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 text-5xl font-bold text-white md:text-6xl"
            >
              Ready to Transform
              <br />
              Your <span className="text-[#c5e063]">Payments?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mb-10 max-w-2xl text-xl text-gray-300"
            >
              Join 500+ African businesses already scaling with Kotulapay. 
              Get started today with our free sandbox environment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(197, 224, 99, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-3 rounded-full bg-[#c5e063] px-8 py-4 text-lg font-semibold text-[#0a3d3d] shadow-lg shadow-[#c5e063]/20 transition-all"
                >
                  Create Free Account
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>

              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  Contact Sales
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#c5e063]" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#c5e063]" />
                <span>No monthly fees</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#c5e063]" />
                <span>24/7 support</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
