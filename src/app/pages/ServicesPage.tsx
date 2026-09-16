import { Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import {
  CreditCard,
  Wallet,
  Smartphone,
  Globe,
  Shield,
  BarChart3,
  Code,
  Headphones,
  RefreshCw,
  FileText,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  LucideIcon,
} from 'lucide-react';

export function ServicesPage() {
  const mainServices = [
    {
      icon: CreditCard,
      title: 'Card Collections',
      description: 'Accept global card payments with smart routing, retries, and tokenization that keeps checkout fast and secure.',
      features: [
        'Unified checkout for web and mobile',
        'Smart retries to reduce soft declines',
        'Automated reconciliation with daily reports',
      ],
      stat: '+14%',
      statLabel: 'Average authorization lift',
      bg: 'bg-[#f6faee]',
      flip: false,
    },
    {
      icon: Wallet,
      title: 'Alternative Payments',
      description: 'Offer customers local methods and wallets, bundled into one integration with unified reporting.',
      features: [
        'Localized checkout copy and receipts',
        'One dashboard across methods and regions',
        'Automated settlement notifications',
      ],
      stat: '45+',
      statLabel: 'Markets covered',
      bg: 'bg-white',
      flip: true,
    },
    {
      icon: Smartphone,
      title: 'Mobile Money',
      description: 'Reach mobile-first customers with instant collections, automated reconciliation, and real-time payout controls.',
      features: [
        'USSD and app-based payment flows',
        'Instant confirmations and receipts',
        'Scheduled payouts to suppliers',
      ],
      stat: 'Real-time',
      statLabel: 'Insights in seconds',
      bg: 'bg-[#e5f2f6]',
      flip: false,
    },
  ];

  const additionalServices: { icon: LucideIcon; title: string; description: string }[] = [
    { icon: Globe,      title: 'Payment Gateway',    description: 'Seamlessly integrate secure payment processing into your website or application with our robust API and pre-built plugins.' },
    { icon: RefreshCw,  title: 'Recurring Billing',  description: 'Manage subscriptions and recurring payments with ease. Automated billing, flexible schedules, and customer management tools.' },
    { icon: FileText,   title: 'Invoice Management', description: 'Create, send, and track invoices automatically. Reduce payment delays and improve cash flow with our integrated invoicing system.' },
    { icon: TrendingUp, title: 'Multi-Currency',      description: 'Accept payments in 135+ currencies with real-time exchange rates and automatic currency conversion for a truly global experience.' },
    { icon: Shield,     title: 'Fraud Prevention',   description: 'Enterprise-grade security with advanced fraud detection, PCI DSS compliance, and multi-layer authentication to protect your business.' },
    { icon: BarChart3,  title: 'Analytics & Reporting', description: 'Comprehensive dashboards and detailed reporting tools to understand your payment trends, customer behavior, and optimize revenue.' },
    { icon: Code,       title: 'Developer Tools',    description: 'Powerful APIs, webhooks, and SDKs for Node.js, Python, PHP, Java, and more. Full documentation and sandbox environment included.' },
    { icon: Headphones, title: '24/7 Support',       description: 'Round-the-clock customer support via email, phone, and live chat. Our expert team is always ready to help you succeed.' },
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
          <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">Our Services</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300 leading-relaxed">
            Explore the core payment capabilities that power collections, settlement, optimization, and growth across global markets.
          </p>
        </div>
      </section>

      {/* Main Services */}
      {mainServices.map(({ icon: Icon, title, description, features, stat, statLabel, bg, flip }) => (
        <section key={title} className={`${bg} py-14 lg:py-20`}>
          <div className="mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              {/* text */}
              <div className={flip ? 'order-1 lg:order-2' : ''}>
                <div className="flex size-[52px] shrink-0 items-center justify-center rounded-[12px] bg-[#d4f291] mb-5">
                  <Icon className="size-5 text-[#1e1f24]" />
                </div>
                <h2 className="mb-4 text-3xl font-bold text-[#001c26] md:text-4xl">{title}</h2>
                <p className="mb-6 text-lg text-[#62636c] leading-relaxed">{description}</p>
                <ul className="mb-8 space-y-3">
                  {features.map(f => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#289685]" />
                      <span className="text-[#62636c]">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact">
                  <button className="flex items-center gap-2 rounded-full bg-[#289685] px-8 py-4 font-medium text-[#fcfcfd] transition-colors hover:bg-[#237a71] text-base">
                    Get Started
                    <ArrowRight className="size-5" />
                  </button>
                </Link>
              </div>

              {/* stat card */}
              <div className={`flex items-center justify-center ${flip ? 'order-2 lg:order-1' : ''}`}>
                <div className="w-full max-w-sm rounded-2xl bg-white border-2 border-[#e6eced] px-10 py-12 text-center">
                  <p className="text-6xl font-bold text-[#001c26] mb-2">{stat}</p>
                  <p className="text-lg text-[#62636c]">{statLabel}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Additional Services */}
      <section className="bg-[#f6faee] py-14 lg:py-20">
        <div className="mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">
          <div className="mx-auto mb-10 max-w-[760px] text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#001c26] md:text-4xl">
              Complete Payment Solutions
            </h2>
            <p className="text-lg text-[#62636c] leading-relaxed">
              Everything you need to accept, manage, and optimize payments for your business.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {additionalServices.map(({ icon: Icon, title, description }) => (
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

      {/* CTA */}
      <section className="bg-[#e5f2f6] py-14 lg:py-20">
        <div className="mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">
          <div className="relative overflow-hidden rounded-3xl bg-[#001c26] px-8 py-16 text-center md:px-16">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute left-1/2 top-0 h-full w-[100px] -translate-x-1/2 bg-gradient-to-b from-[#00bf6f] to-transparent opacity-15 blur-[90px]" />
            </div>
            <div className="relative z-10">
              <h2 className="mb-4 text-3xl font-bold text-[#fcfcfd] md:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="mx-auto mb-8 max-w-[520px] text-lg text-[#cdced7] leading-relaxed">
                Join businesses processing payments with Kotulapay. Start accepting payments in minutes.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link to="/contact">
                  <button className="flex items-center gap-2 rounded-full bg-[#289685] px-8 py-4 font-medium text-[#fcfcfd] transition-colors hover:bg-[#237a71] text-base">
                    Contact Sales
                    <ArrowRight className="size-5" />
                  </button>
                </Link>
                <Link to="/resources/documentation">
                  <button className="flex items-center gap-2 rounded-full border border-[#289685] px-8 py-4 font-medium text-[#fcfcfd] transition-colors hover:bg-[rgba(40,150,133,0.12)] text-base">
                    View Documentation
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
