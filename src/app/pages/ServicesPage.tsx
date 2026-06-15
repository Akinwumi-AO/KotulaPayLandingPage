import { motion } from 'motion/react';
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
  Zap,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import visaLogo from 'figma:asset/244d5d221ebf960a8ce753378fb4dce5611382f6.png';
import mastercardLogo from 'figma:asset/bcbab44d7c42b63f85e9d1e79e4fca4c2454ced8.png';
import amexLogo from 'figma:asset/08473e4cf1bcce15dae6c93326137135865ce4fb.png';
import paypalLogo from 'figma:asset/5c371900cb7213c7333c8c800273fd8b83bdc004.png';
import applePayLogo from 'figma:asset/975f152e4eadbee46faa943bbba68f2c48238857.png';
import googlePayLogo from 'figma:asset/25cb61f1d75bdd57dfe487f9c5f1788a05d86850.png';

export function ServicesPage() {
  const mainServices = [
    {
      icon: CreditCard,
      title: 'Card Collections',
      description: 'Accept global card payments with smart routing, retries, and tokenization that keeps checkout fast and secure.',
      features: [
        'Unified checkout for web and mobile',
        'Smart retries to reduce soft declines',
        'Automated reconciliation with daily reports'
      ],
      stat: '+14%',
      statLabel: 'Average authorization lift',
      highlight: 'Dynamic fraud screening, local acquiring, and intelligent retries help increase approvals.',
      cta: 'Explore Card Payments',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: Wallet,
      title: 'Alternative Payments',
      description: 'Offer customers local methods and wallets, bundled into one integration with unified reporting.',
      features: [
        'Localized checkout copy and receipts',
        'One dashboard across methods and regions',
        'Automated settlement notifications'
      ],
      stat: '45+',
      statLabel: 'Coverage across markets',
      highlight: 'Serve shoppers in their currency with local messaging, payouts, and settlement in your target regions.',
      cta: 'Discover Alternatives',
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      icon: Smartphone,
      title: 'Mobile Money',
      description: 'Reach mobile-first customers with instant collections, automated reconciliation, and real-time payout controls.',
      features: [
        'USSD and app-based payment flows',
        'Instant confirmations and receipts',
        'Scheduled payouts to suppliers'
      ],
      stat: 'Real-time',
      statLabel: 'insights in seconds',
      highlight: 'Track every transaction with live dashboards, downloadable statements, and automated settlement notices.',
      cta: 'See Mobile Money',
      gradient: 'from-green-500/20 to-emerald-500/20'
    }
  ];

  const additionalServices = [
    {
      icon: Globe,
      title: 'Payment Gateway',
      description: 'Seamlessly integrate secure payment processing into your website or application with our robust API and pre-built plugins for popular platforms.'
    },
    {
      icon: RefreshCw,
      title: 'Recurring Billing',
      description: 'Manage subscriptions and recurring payments with ease. Automated billing, flexible schedules, and comprehensive customer management tools.'
    },
    {
      icon: FileText,
      title: 'Invoice Management',
      description: 'Create, send, and track invoices automatically. Reduce payment delays and improve cash flow with our integrated invoicing system.'
    },
    {
      icon: TrendingUp,
      title: 'Multi-Currency Support',
      description: 'Accept payments in 135+ currencies with real-time exchange rates and automatic currency conversion for a truly global experience.'
    },
    {
      icon: Shield,
      title: 'Fraud Prevention',
      description: 'Enterprise-grade security with advanced fraud detection, PCI DSS compliance, and multi-layer authentication to protect your business.'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reporting',
      description: 'Comprehensive dashboards and detailed reporting tools to understand your payment trends, customer behavior, and optimize revenue.'
    },
    {
      icon: Code,
      title: 'Developer Tools',
      description: 'Powerful APIs, webhooks, and SDKs for Node.js, Python, PHP, Java, and more. Complete documentation and sandbox environment included.'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer support via email, phone, and live chat. Our expert team is always ready to help you succeed.'
    }
  ];

  const paymentMethods = [
    { name: 'Visa', logo: visaLogo },
    { name: 'Mastercard', logo: mastercardLogo },
    { name: 'American Express', logo: amexLogo },
    { name: 'PayPal', logo: paypalLogo },
    { name: 'Apple Pay', logo: applePayLogo },
    { name: 'Google Pay', logo: googlePayLogo }
  ];

  return (
    <div className="min-h-screen w-full bg-[#001c26]">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#001c26] via-[#04403a] to-[#001c26] px-6 py-24">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,224,99,0.1),transparent_50%)]" />
          </div>
          
          <div className="relative mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl lg:text-7xl">
                Our <span className="text-[#c5e063]">Services</span>
              </h1>
              <p className="mx-auto max-w-3xl text-lg text-gray-300 md:text-xl">
                Explore the core payment capabilities that power collections, settlement, optimization, and growth across global markets.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Services - Card, Alternative, Mobile Money */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-7xl space-y-16">
            {mainServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${service.gradient} p-8 backdrop-blur-sm transition-all hover:border-[#c5e063]/30 md:p-12`}
              >
                <div className="absolute right-0 top-0 h-64 w-64 translate-x-32 -translate-y-32 rounded-full bg-[#c5e063]/5 blur-3xl transition-all group-hover:bg-[#c5e063]/10" />
                
                <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-12">
                  {/* Left Side - Main Info */}
                  <div>
                    <service.icon className="mb-6 size-14 text-[#c5e063]" />
                    <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">{service.title}</h2>
                    <p className="mb-6 text-lg leading-relaxed text-gray-300">{service.description}</p>
                    
                    <div className="mb-8 space-y-3">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#c5e063]" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="group/btn inline-flex items-center gap-2 rounded-full bg-[#c5e063] px-6 py-3 font-semibold text-[#0a3d3d] shadow-lg transition-all hover:shadow-xl hover:shadow-[#c5e063]/30"
                    >
                      {service.cta}
                      <ArrowRight className="size-5 transition-transform group-hover/btn:translate-x-1" />
                    </motion.button>
                  </div>

                  {/* Right Side - Stats & Highlight */}
                  <div className="flex flex-col justify-center space-y-6">
                    <div className="rounded-2xl border border-white/10 bg-[#001c26]/50 p-8 backdrop-blur-sm">
                      <div className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-400">
                        Performance
                      </div>
                      <div className="mb-1 text-5xl font-bold text-[#c5e063]">{service.stat}</div>
                      <div className="text-sm text-gray-400">{service.statLabel}</div>
                    </div>

                    <div className="rounded-2xl border border-[#c5e063]/20 bg-gradient-to-br from-[#c5e063]/5 to-transparent p-6">
                      <Zap className="mb-3 size-8 text-[#c5e063]" />
                      <p className="text-sm leading-relaxed text-gray-300">{service.highlight}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Additional Services Grid */}
        <section className="bg-gradient-to-br from-[#04403a]/20 to-transparent px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                Complete Payment <span className="text-[#c5e063]">Solutions</span>
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-300">
                Everything you need to accept, manage, and optimize payments for your business.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {additionalServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#001c26] to-[#04403a]/30 p-6 transition-all hover:border-[#c5e063]/30 hover:shadow-lg hover:shadow-[#c5e063]/10"
                >
                  <div className="absolute right-0 top-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-[#c5e063]/5 blur-2xl transition-all group-hover:bg-[#c5e063]/10" />
                  <service.icon className="relative mb-4 size-10 text-[#c5e063] transition-transform group-hover:scale-110" />
                  <h3 className="relative mb-3 text-xl font-semibold text-white">{service.title}</h3>
                  <p className="relative text-sm leading-relaxed text-gray-400">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Payment Methods Section */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                Supported <span className="text-[#c5e063]">Payment Methods</span>
              </h2>
              <p className="mb-12 text-lg text-gray-300">
                Accept major global cards, wallets, and alternative payment rails through one integration.
              </p>

              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
                {paymentMethods.map((method, index) => (
                  <motion.div
                    key={method.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group relative flex aspect-square flex-col items-center justify-center rounded-xl border border-white/10 bg-white/95 p-6 transition-all hover:border-[#c5e063]/30 hover:shadow-lg hover:shadow-[#c5e063]/10"
                  >
                    {typeof method.logo === 'string' && method.logo.startsWith('http') ? (
                      <img 
                        src={method.logo} 
                        alt={method.name}
                        className="h-12 w-auto object-contain"
                      />
                    ) : typeof method.logo === 'string' && method.logo.length <= 3 ? (
                      <div className="text-4xl font-bold text-gray-700">{method.logo}</div>
                    ) : (
                      <img 
                        src={method.logo} 
                        alt={method.name}
                        className={`w-auto object-contain ${
                          method.name === 'American Express' 
                            ? 'h-20' 
                            : method.name === 'Mastercard' || method.name === 'PayPal' 
                            ? 'h-16' 
                            : 'h-12'
                        }`}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#c5e063] to-[#a8c555] p-12 text-center"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
              <div className="relative">
                <h2 className="mb-4 text-3xl font-bold text-[#0a3d3d] md:text-4xl">
                  Ready to Get Started?
                </h2>
                <p className="mb-8 text-lg text-[#0a3d3d]/80">
                  Join thousands of businesses processing payments with KotulaPay. Start accepting payments in minutes.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full bg-[#001c26] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#04403a]"
                  >
                    Start Free Trial
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full border-2 border-[#0a3d3d] px-8 py-4 text-lg font-semibold text-[#0a3d3d] transition-all hover:bg-[#0a3d3d] hover:text-[#c5e063]"
                  >
                    Contact Sales
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}