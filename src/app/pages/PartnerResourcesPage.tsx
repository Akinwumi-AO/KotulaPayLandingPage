import { motion } from 'motion/react';
import { Construction, Users } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function PartnerResourcesPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-[#001c26] to-[#04403a] pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#c5e063] to-[#c5e063]/80">
                <Users className="h-8 w-8 text-[#0a3d3d]" />
              </div>
            </div>
            <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
              Partner Resource Center
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-300 leading-relaxed">
              Exclusive resources, tools, and support materials for our partners to help you deliver 
              exceptional payment solutions to your customers across Africa.
            </p>
          </motion.div>

          {/* Under Construction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-2xl"
          >
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-12 text-center backdrop-blur-sm">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#c5e063]/20 to-[#c5e063]/5"
              >
                <Construction className="h-12 w-12 text-[#c5e063]" />
              </motion.div>
              
              <h2 className="mb-4 text-3xl font-bold text-white">
                Coming Soon
              </h2>
              <p className="mb-6 text-gray-400 leading-relaxed">
                We're developing a dedicated partner portal with marketing materials, 
                co-branding resources, training programs, and dedicated partner support.
              </p>
              
              <div className="inline-flex items-center gap-2 rounded-full border border-[#c5e063]/30 bg-[#c5e063]/10 px-6 py-3 text-sm text-[#c5e063]">
                <div className="h-2 w-2 animate-pulse rounded-full bg-[#c5e063]" />
                Under Construction
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}