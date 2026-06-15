import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Shield, Target, Award, Cpu, Globe, Headphones } from 'lucide-react';

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
      description: 'Clear pricing, honest communication, and no hidden fees - you always know where you stand.',
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
    { icon: Cpu, label: 'Uptime Guarantee', value: '99.9%' },
    { icon: Globe, label: 'Currencies Supported', value: '135+' },
    { icon: Shield, label: 'Payment Methods', value: '200+' },
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
          
          <div className="relative mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl lg:text-7xl">
                About <span className="text-[#c5e063]">KotulaPay</span>
              </h1>
              <p className="mx-auto max-w-3xl text-lg text-gray-300 md:text-xl">
                A cutting-edge payment gateway company that has redefined the way businesses and consumers engage in digital transactions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#04403a]/40 to-[#001c26]/40 p-8 backdrop-blur-sm md:p-12">
                <h2 className="mb-4 text-3xl font-bold text-white">Our Story</h2>
                <p className="text-lg leading-relaxed text-gray-300">
                  Established with a vision to simplify and secure the world of online payments, we have swiftly become a trusted partner for businesses of all sizes and industries. From startups to enterprises, we empower organizations to accept payments seamlessly and grow their revenue with confidence.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-gradient-to-br from-[#04403a]/20 to-transparent px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#001c26] to-[#04403a]/30 p-8 transition-all hover:border-[#c5e063]/30"
              >
                <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-[#c5e063]/10 blur-3xl transition-all group-hover:bg-[#c5e063]/20" />
                <Target className="mb-6 size-12 text-[#c5e063]" />
                <h2 className="mb-4 text-3xl font-bold text-white">Our Mission</h2>
                <p className="text-lg leading-relaxed text-gray-300">
                  To empower businesses globally by providing secure, scalable, and innovative payment solutions that simplify transactions and drive growth in the digital economy.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#001c26] to-[#04403a]/30 p-8 transition-all hover:border-[#c5e063]/30"
              >
                <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-[#c5e063]/10 blur-3xl transition-all group-hover:bg-[#c5e063]/20" />
                <Award className="mb-6 size-12 text-[#c5e063]" />
                <h2 className="mb-4 text-3xl font-bold text-white">Our Vision</h2>
                <p className="text-lg leading-relaxed text-gray-300">
                  To be the world's most trusted and accessible payment gateway, enabling seamless commerce across borders and breaking down barriers to global business expansion.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4 text-4xl font-bold text-white">Our Values</h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-300">
                Security, transparency, innovation, and customer excellence are at the core of everything we do.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#04403a]/20 to-transparent p-6 transition-all hover:border-[#c5e063]/30 hover:shadow-lg hover:shadow-[#c5e063]/10"
                >
                  <value.icon className="mb-4 size-10 text-[#c5e063] transition-transform group-hover:scale-110" />
                  <h3 className="mb-2 text-xl font-semibold text-white">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology & Capabilities */}
        <section className="bg-gradient-to-br from-[#04403a]/20 to-transparent px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#001c26] to-[#04403a]/30 p-8 text-center transition-all hover:border-[#c5e063]/30"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(197,224,99,0.1),transparent_50%)] opacity-0 transition-opacity group-hover:opacity-100" />
                  <stat.icon className="mx-auto mb-4 size-12 text-[#c5e063]" />
                  <div className="mb-2 text-5xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 grid gap-8 md:grid-cols-3"
            >
              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-[#04403a]/20 to-transparent p-8">
                <Cpu className="mb-4 size-10 text-[#c5e063]" />
                <h3 className="mb-3 text-xl font-semibold text-white">Technology</h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  Built with cutting-edge technology and industry-leading security standards, our platform handles millions of transactions daily.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-[#04403a]/20 to-transparent p-8">
                <Globe className="mb-4 size-10 text-[#c5e063]" />
                <h3 className="mb-3 text-xl font-semibold text-white">Global Reach</h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  We support payments in 135+ currencies and connect to 200+ payment methods, giving your customers flexibility and choice.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-[#04403a]/20 to-transparent p-8">
                <Headphones className="mb-4 size-10 text-[#c5e063]" />
                <h3 className="mb-3 text-xl font-semibold text-white">Support</h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  24/7 customer support in multiple languages ensures your business is never left without help. Our dedicated team is always ready.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
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
                  Ready to Transform Your Payments?
                </h2>
                <p className="mb-8 text-lg text-[#0a3d3d]/80">
                  Join thousands of businesses that trust KotulaPay for their payment processing needs.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full bg-[#001c26] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#04403a]"
                >
                  Get Started Today
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
