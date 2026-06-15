import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Briefcase, Mail, Linkedin } from 'lucide-react';

export default function CareersPage() {
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
            <Mail className="size-4 text-[#c5e063]" />
            <span className="text-sm font-medium text-[#c5e063]">Contact Us</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <Briefcase className="mx-auto mb-6 size-24 text-[#c5e063]" />
            <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
              Careers
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-400 leading-relaxed">
              Thank you for your interest in joining our team.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 space-y-8"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <p className="mb-6 text-lg text-gray-300 leading-relaxed">
                We currently do not have any open positions. As the company continues to grow, 
                future opportunities will be posted on this page.
              </p>
              
              <div className="space-y-6 text-gray-300">
                <p className="leading-relaxed">
                  If you would like to be considered for future opportunities, you are welcome to 
                  send your CV to{' '}
                  <a 
                    href="mailto:careers@kotulapay.com"
                    className="inline-flex items-center gap-1 font-medium text-[#c5e063] underline decoration-[#c5e063]/30 transition-all hover:decoration-[#c5e063]"
                  >
                    <Mail className="size-4" />
                    careers@kotulapay.com
                  </a>
                </p>
                
                <p className="leading-relaxed">
                  We also encourage you to follow us on{' '}
                  <a 
                    href="https://www.linkedin.com/company/kotula-pay"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-[#c5e063] underline decoration-[#c5e063]/30 transition-all hover:decoration-[#c5e063]"
                  >
                    <Linkedin className="size-4" />
                    LinkedIn
                  </a>
                  {' '}to stay informed about company updates and new openings.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}