import { Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Shield, Target, Award, Cpu, Globe, Headphones, ArrowRight } from 'lucide-react';

export function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Security',
      description: 'We prioritize the protection of your data with industry-leading security standards and encryption.',
    },
    {
      icon: Target,
      title: 'Transparency',
      description: 'Clear pricing, honest communication, and no hidden fees — you always know where you stand.',
    },
    {
      icon: Award,
      title: 'Innovation',
      description: 'Continuously evolving our platform with cutting-edge technology to stay ahead of the curve.',
    },
    {
      icon: Headphones,
      title: 'Customer Excellence',
      description: '24/7 support and dedicated account management to ensure your success is our priority.',
    },
  ];

  const stats = [
    { label: 'Uptime Guarantee', value: '99.9%' },
    { label: 'Currencies Supported', value: '135+' },
    { label: 'Payment Methods', value: '200+' },
    { label: 'African Markets', value: '15+' },
  ];

  const capabilities = [
    {
      icon: Cpu,
      title: 'Technology',
      description: 'Built with cutting-edge technology and industry-leading security standards, our platform handles millions of transactions daily.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'We support payments in 135+ currencies and connect to 200+ payment methods, giving your customers flexibility and choice.',
    },
    {
      icon: Headphones,
      title: 'Support',
      description: '24/7 customer support ensures your business is never left without help. Our dedicated team is always ready.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#001c26] to-[#04403a] pt-32 pb-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(197,224,99,0.3) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative z-10 mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px] text-center">
          <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">About Kotulapay</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300 leading-relaxed">
            A cutting-edge payment gateway company that has redefined the way businesses and consumers engage in digital transactions across Africa and beyond.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-[#f6faee] py-14 lg:py-20">
        <div className="mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-[#001c26] md:text-4xl">Our Story</h2>
              <p className="text-lg text-[#62636c] leading-relaxed mb-4">
                Established with a vision to simplify and secure the world of online payments, we have swiftly become a trusted partner for businesses of all sizes and industries.
              </p>
              <p className="text-lg text-[#62636c] leading-relaxed">
                From startups to enterprises, we empower organizations to accept payments seamlessly and grow their revenue with confidence — across global card networks and African mobile money rails.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ label, value }) => (
                <div key={label} className="rounded-2xl bg-white px-7 py-8 text-center">
                  <p className="text-4xl font-bold text-[#001c26] mb-1">{value}</p>
                  <p className="text-sm text-[#62636c]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">
          <div className="mx-auto mb-10 max-w-[760px] text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#001c26] md:text-4xl">Mission & Vision</h2>
            <p className="text-lg text-[#62636c] leading-relaxed">
              Driving financial inclusion and enabling seamless commerce across borders.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-4 items-start rounded-2xl bg-[#f6faee] px-7 py-8">
              <div className="flex size-[52px] shrink-0 items-center justify-center rounded-[12px] bg-[#d4f291]">
                <Target className="size-5 text-[#1e1f24]" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-[#1d3b32] leading-snug">Our Mission</h3>
                <p className="text-[#62636c] text-sm leading-relaxed">
                  To empower businesses globally by providing secure, scalable, and innovative payment solutions that simplify transactions and drive growth in the digital economy.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 items-start rounded-2xl bg-[#f6faee] px-7 py-8">
              <div className="flex size-[52px] shrink-0 items-center justify-center rounded-[12px] bg-[#d4f291]">
                <Award className="size-5 text-[#1e1f24]" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-[#1d3b32] leading-snug">Our Vision</h3>
                <p className="text-[#62636c] text-sm leading-relaxed">
                  To be the world's most trusted and accessible payment gateway, enabling seamless commerce across borders and breaking down barriers to global business expansion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#e5f2f6] py-14 lg:py-20">
        <div className="mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">
          <div className="mx-auto mb-10 max-w-[760px] text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#001c26] md:text-4xl">Our Values</h2>
            <p className="text-lg text-[#62636c] leading-relaxed">
              Security, transparency, innovation, and customer excellence are at the core of everything we do.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex flex-col gap-4 items-start rounded-2xl bg-white px-7 py-8">
                <div className="flex size-[52px] shrink-0 items-center justify-center rounded-[12px] bg-[#d4f291]">
                  <Icon className="size-5 text-[#1e1f24]" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-[#1d3b32] leading-snug">{title}</h3>
                  <p className="text-[#62636c] text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">
          <div className="mx-auto mb-10 max-w-[760px] text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#001c26] md:text-4xl">Technology & Capabilities</h2>
            <p className="text-lg text-[#62636c] leading-relaxed">
              Enterprise-grade infrastructure built for reliability, scale, and developer simplicity.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex flex-col gap-4 items-start rounded-2xl bg-[#f6faee] px-7 py-8">
                <div className="flex size-[52px] shrink-0 items-center justify-center rounded-[12px] bg-[#d4f291]">
                  <Icon className="size-5 text-[#1e1f24]" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-[#1d3b32] leading-snug">{title}</h3>
                  <p className="text-[#62636c] text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#e5f2f6] py-14 lg:py-20">
        <div className="mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">
          <div className="relative overflow-hidden rounded-3xl bg-[#001c26] px-8 py-16 text-center md:px-16">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute left-1/2 top-0 h-full w-[100px] -translate-x-1/2 bg-gradient-to-b from-[#00bf6f] to-transparent opacity-15 blur-[90px]" />
            </div>
            <div className="relative z-10">
              <h2 className="mb-4 text-3xl font-bold text-[#fcfcfd] md:text-4xl">
                Ready to Transform Your Payments?
              </h2>
              <p className="mx-auto mb-8 max-w-[520px] text-lg text-[#cdced7] leading-relaxed">
                Join 500+ African businesses already scaling with Kotulapay.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link to="/contact">
                  <button className="flex items-center gap-2 rounded-full bg-[#289685] px-8 py-4 font-medium text-[#fcfcfd] transition-colors hover:bg-[#237a71] text-base">
                    Get Started
                    <ArrowRight className="size-5" />
                  </button>
                </Link>
                <Link to="/services">
                  <button className="flex items-center gap-2 rounded-full border border-[#289685] px-8 py-4 font-medium text-[#fcfcfd] transition-colors hover:bg-[rgba(40,150,133,0.12)] text-base">
                    View Services
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
