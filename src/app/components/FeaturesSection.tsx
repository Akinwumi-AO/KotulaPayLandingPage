import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Shield, Zap, Lock, ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  index: number;
}

function FeatureCard({ icon, title, description, features, index }: FeatureCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm transition-all duration-500 hover:border-[#c5e063]/30 hover:shadow-2xl hover:shadow-[#c5e063]/10">
        {/* Animated gradient background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-[#c5e063]/0 via-[#c5e063]/0 to-[#c5e063]/0 opacity-0 transition-opacity duration-500 group-hover:from-[#c5e063]/10 group-hover:via-[#c5e063]/5 group-hover:to-[#c5e063]/0 group-hover:opacity-100"
        />

        {/* Icon */}
        <motion.div 
          className="relative z-10 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#c5e063]/20 to-[#c5e063]/10"
          whileHover={{ 
            scale: 1.1,
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.5 }
          }}
        >
          <div className="text-[#c5e063]">
            {icon}
          </div>
        </motion.div>

        {/* Title */}
        <h3 className="relative z-10 mb-3 text-2xl font-bold text-white">
          {title}
        </h3>

        {/* Description */}
        <p className="relative z-10 mb-6 text-gray-400 leading-relaxed">
          {description}
        </p>

        {/* Features list */}
        <ul className="relative z-10 space-y-3">
          {features.map((feature, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 + idx * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c5e063]/20">
                <div className="h-2 w-2 rounded-full bg-[#c5e063]" />
              </div>
              <span className="text-sm text-gray-300">{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* Hover arrow */}
        <motion.div 
          className="absolute bottom-8 right-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c5e063]">
            <ArrowRight className="size-5 text-[#0a3d3d]" />
          </div>
        </motion.div>

        {/* Decorative corner */}
        <div className="absolute right-0 top-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-[#c5e063] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />
      </div>
    </motion.div>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: <Shield className="size-8" />,
      title: "Enterprise-Grade Security",
      description: "Bank-level security protocols and compliance standards to protect every transaction and keep your customers' data safe.",
      features: [
        "PCI DSS Level 1 certified infrastructure",
        "End-to-end 256-bit encryption",
        "Real-time fraud detection and prevention",
        "Automated security monitoring 24/7"
      ]
    },
    {
      icon: <Zap className="size-8" />,
      title: "Lightning-Fast Settlements",
      description: "Get paid faster with automated settlements and real-time transaction processing across all payment methods.",
      features: [
        "Instant settlement options available",
        "Real-time payment confirmation",
        "Automated reconciliation tools",
        "Multi-currency settlement support"
      ]
    },
    {
      icon: <Lock className="size-8" />,
      title: "Global Card Coverage + African APMs",
      description: "Accept card payments worldwide and alternative payment methods across key African markets.",
      features: [
        "Global card processing coverage",
        "Mobile money in 9 African countries",
        "Kenya, Uganda, Tanzania, Rwanda, Zambia",
        "Ghana, Nigeria, Egypt, Cameroon supported"
      ]
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#04403a] to-[#001c26] py-24">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-[#c5e063] opacity-5 blur-3xl" />
        <div className="absolute right-0 bottom-1/4 h-96 w-96 rounded-full bg-[#c5e063] opacity-5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c5e063]/30 bg-[#c5e063]/10 px-4 py-2 backdrop-blur-sm"
          >
            <div className="h-2 w-2 animate-pulse rounded-full bg-[#c5e063]" />
            <span className="text-sm font-medium text-[#c5e063]">Global Cards + African Mobile Money</span>
          </motion.div>
          
          <h2 className="mb-6 text-5xl font-bold text-white md:text-6xl">
            Everything You Need to 
            <br />
            <span className="text-[#c5e063]">Accept Payments</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-400">
            Comprehensive payment infrastructure with global card processing and African mobile money coverage 
            to help you collect, scale, and grow worldwide.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              features={feature.features}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}