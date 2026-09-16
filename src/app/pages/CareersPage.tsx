import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Briefcase, Mail, Linkedin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export default function CareersPage() {
  return (
    <div className="min-h-screen w-full bg-[#001c26]">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#001c26] pb-14 pt-32 lg:pb-20 lg:pt-40">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#00bf6f] opacity-10 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-[760px] text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#289685]/40 bg-[#289685]/10 px-4 py-2">
              <Briefcase className="size-4 text-[#289685]" />
              <span className="text-sm font-medium text-[#289685]">Careers at Kotulapay</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold text-[#fcfcfd] md:text-5xl lg:text-6xl">
              Join Our Team
            </h1>
            <p className="text-lg text-[#cdced7] leading-relaxed md:text-xl">
              We're building the payment infrastructure that powers Africa's digital economy.
              Come grow with us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#e5f2f6] py-14 lg:py-20">
        <div className="mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">
          <div className="mx-auto max-w-[720px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-3xl bg-white px-8 py-10 md:px-12"
            >
              <div className="mb-8 flex size-[56px] items-center justify-center rounded-[14px] bg-[#d4f291]">
                <Briefcase className="size-6 text-[#1e1f24]" />
              </div>

              <h2 className="mb-4 text-2xl font-bold text-[#1d3b32] md:text-3xl">
                No Open Positions Right Now
              </h2>
              <p className="mb-6 text-[#62636c] leading-relaxed text-lg">
                We currently do not have any open positions. As the company continues to grow,
                future opportunities will be posted here.
              </p>

              <div className="space-y-5 border-t border-[#e5f2f6] pt-6">
                <p className="text-[#62636c] leading-relaxed">
                  If you would like to be considered for future opportunities, you are welcome to
                  send your CV to{' '}
                  <a
                    href="mailto:careers@kotulapay.com"
                    className="inline-flex items-center gap-1.5 font-medium text-[#289685] transition-opacity hover:opacity-80"
                  >
                    <Mail className="size-4" />
                    careers@kotulapay.com
                  </a>
                </p>

                <p className="text-[#62636c] leading-relaxed">
                  We also encourage you to follow us on{' '}
                  <a
                    href="https://www.linkedin.com/company/kotula-pay"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-[#289685] transition-opacity hover:opacity-80"
                  >
                    <Linkedin className="size-4" />
                    LinkedIn
                  </a>
                  {' '}to stay informed about company updates and new openings.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#e5f2f6] pb-14 lg:pb-20">
        <div className="mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">
          <div className="relative overflow-hidden rounded-3xl bg-[#001c26] px-8 py-16 text-center md:px-16">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute left-1/2 top-0 h-full w-[100px] -translate-x-1/2 bg-gradient-to-b from-[#00bf6f] to-transparent opacity-15 blur-[90px]" />
            </div>
            <div className="relative z-10">
              <h2 className="mb-4 text-3xl font-bold text-[#fcfcfd] md:text-4xl">
                Want to Learn More About Us?
              </h2>
              <p className="mx-auto mb-8 max-w-[520px] text-lg text-[#cdced7] leading-relaxed">
                Explore what we do, our mission, and how we're shaping payments across Africa.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link to="/about">
                  <button className="flex items-center gap-2 rounded-full bg-[#289685] px-8 py-4 font-medium text-[#fcfcfd] transition-colors hover:bg-[#237a71] text-base">
                    About Kotulapay
                    <ArrowRight className="size-5" />
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="flex items-center gap-2 rounded-full border border-[#289685] px-8 py-4 font-medium text-[#fcfcfd] transition-colors hover:bg-[rgba(40,150,133,0.12)] text-base">
                    Get in Touch
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
