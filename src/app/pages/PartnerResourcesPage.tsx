import { motion } from 'motion/react';
import { Construction, Users, ArrowRight, Handshake } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router';

export default function PartnerResourcesPage() {
  return (
    <div className="min-h-screen w-full bg-[#001c26]">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#001c26] pb-14 pt-32 lg:pb-20 lg:pt-40">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#00bf6f] opacity-10 blur-[120px]" />
          <div className="absolute right-[-5%] top-[-10%] h-[120%] w-[40%] bg-gradient-to-b from-[#00bf6f0d] to-transparent blur-[80px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-[760px] text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#289685]/40 bg-[#289685]/10 px-4 py-2">
              <Users className="size-4 text-[#289685]" />
              <span className="text-sm font-medium text-[#289685]">Partner Resource Centre</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold text-[#fcfcfd] md:text-5xl lg:text-6xl">
              Built for Our Partners
            </h1>
            <p className="text-lg text-[#cdced7] leading-relaxed md:text-xl">
              Exclusive resources, tools, and support materials to help you deliver exceptional
              payment solutions to your customers across Africa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What's coming */}
      <section className="bg-[#f6faee] py-14 lg:py-20">
        <div className="mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">
          <div className="mx-auto mb-10 max-w-[600px] text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#1d3b32] md:text-4xl">
              What We're Building
            </h2>
            <p className="text-[#62636c] text-lg leading-relaxed">
              Our dedicated partner portal is under development. Here's a preview of what's coming.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { title: 'Marketing Materials', desc: 'Co-branded assets, banners, and campaign templates ready to deploy with your brand.' },
              { title: 'Training Programs', desc: 'Structured onboarding paths and certification tracks for your sales and technical teams.' },
              { title: 'Dedicated Support', desc: 'Priority access to our partner success team and a dedicated Slack channel.' },
            ].map(({ title, desc }) => (
              <div key={title} className="flex flex-col gap-4 items-start rounded-2xl bg-white px-7 py-8">
                <div className="flex size-[52px] shrink-0 items-center justify-center rounded-[12px] bg-[#d4f291]">
                  <Handshake className="size-5 text-[#1e1f24]" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-[#1d3b32] leading-snug">{title}</h3>
                  <p className="text-[#62636c] text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming soon card */}
      <section className="bg-[#e5f2f6] py-14 lg:py-20">
        <div className="mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-[560px]"
          >
            <div className="rounded-3xl bg-white px-8 py-12 text-center">
              <motion.div
                animate={{ rotate: [0, 4, -4, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="mx-auto mb-6 flex size-[72px] items-center justify-center rounded-[18px] bg-[#d4f291]"
              >
                <Construction className="size-8 text-[#1e1f24]" />
              </motion.div>

              <h2 className="mb-3 text-2xl font-bold text-[#1d3b32] md:text-3xl">
                Coming Soon
              </h2>
              <p className="mb-8 text-[#62636c] leading-relaxed">
                We're developing a dedicated partner portal with everything you need to grow
                your business with Kotulapay.
              </p>

              <div className="inline-flex items-center gap-2 rounded-full border border-[#289685]/30 bg-[#289685]/8 px-5 py-2.5 text-sm font-medium text-[#289685]">
                <div className="size-2 animate-pulse rounded-full bg-[#289685]" />
                Under Construction
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#e5f2f6] pb-14 lg:pb-20">
        <div className="mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">
          <div className="relative overflow-hidden rounded-3xl bg-[#001c26] px-8 py-16 text-center md:px-16">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute left-1/2 top-0 h-full w-[100px] -translate-x-1/2 bg-gradient-to-b from-[#00bf6f] to-transparent opacity-15 blur-[90px]" />
              <div className="absolute left-1/3 top-0 h-full w-[60px] -translate-x-1/2 bg-gradient-to-b from-[#00bf6f] to-transparent opacity-10 blur-[60px]" />
            </div>
            <div className="relative z-10">
              <h2 className="mb-4 text-3xl font-bold text-[#fcfcfd] md:text-4xl">
                Interested in Partnering with Us?
              </h2>
              <p className="mx-auto mb-8 max-w-[520px] text-lg text-[#cdced7] leading-relaxed">
                Reach out to our partnerships team and let's explore how we can grow together
                across African markets.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link to="/contact">
                  <button className="flex items-center gap-2 rounded-full bg-[#289685] px-8 py-4 font-medium text-[#fcfcfd] transition-colors hover:bg-[#237a71] text-base">
                    Talk to Our Team
                    <ArrowRight className="size-5" />
                  </button>
                </Link>
                <Link to="/services">
                  <button className="flex items-center gap-2 rounded-full border border-[#289685] px-8 py-4 font-medium text-[#fcfcfd] transition-colors hover:bg-[rgba(40,150,133,0.12)] text-base">
                    Our Services
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
