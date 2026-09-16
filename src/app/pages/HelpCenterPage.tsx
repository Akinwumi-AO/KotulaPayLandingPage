import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { HelpCircle, Sparkles } from 'lucide-react';

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001c26] via-[#04403a] to-[#001c26]">
      <Header />
      
      <main className="relative overflow-hidden pt-32 pb-24">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#c5e063] opacity-10 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-[#c5e063] opacity-10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#c5e063]/30 bg-[#c5e063]/10 px-4 py-2"
          >
            <Sparkles className="size-4 text-[#c5e063]" />
            <span className="text-sm font-medium text-[#c5e063]">Coming Soon</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <HelpCircle className="mx-auto mb-6 size-24 text-[#c5e063]" />
            <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
              Help Center
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-400 leading-relaxed">
              Our comprehensive Help Center is on the way. Find answers to common questions, 
              troubleshooting guides, integration tutorials, and step-by-step documentation 
              to help you succeed with Kotulapay.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <p className="text-gray-300">
                In the meantime, please reach out to our support team directly for any assistance 
                you need. We're here to help!
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
