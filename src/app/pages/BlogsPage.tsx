import { motion } from 'motion/react';
import { Construction } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function BlogsPage() {
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
            <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
              Blogs & Insights
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-300 leading-relaxed">
              Stay informed with the latest trends, insights, and best practices in payment technology, 
              fintech innovation, and digital commerce across Africa.
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
                We're currently working on bringing you valuable content, expert insights, 
                and industry updates. Check back soon for our latest blog posts.
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