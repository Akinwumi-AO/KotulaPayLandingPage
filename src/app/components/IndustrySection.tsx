import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ShoppingBag, Briefcase, Zap, ArrowRight } from 'lucide-react';

interface IndustryCardProps {
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
  icon: React.ReactNode;
  index: number;
}

function IndustryCard({ title, description, features, imageUrl, icon, index }: IndustryCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-[#c5e063]/30 hover:shadow-2xl hover:shadow-[#c5e063]/10">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="h-full w-full"
          >
            <ImageWithFallback
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover"
            />
          </motion.div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#001c26] via-[#001c26]/50 to-transparent" />
          
          {/* Icon */}
          <motion.div 
            className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#c5e063] shadow-lg"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-[#0a3d3d]">
              {icon}
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative p-8">
          <h3 className="mb-3 text-2xl font-bold text-white">{title}</h3>
          <p className="mb-6 text-gray-400 leading-relaxed">{description}</p>

          {/* Features */}
          <ul className="mb-6 space-y-3">
            {features.map((feature, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.2 + idx * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c5e063]/20">
                  <div className="h-2 w-2 rounded-full bg-[#c5e063]" />
                </div>
                <span className="text-sm text-gray-300">{feature}</span>
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <motion.button
            whileHover={{ x: 5 }}
            className="group/btn flex items-center gap-2 text-[#c5e063] transition-colors hover:text-[#d4ed7a]"
          >
            <span className="font-medium">Learn more</span>
            <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
          </motion.button>

          {/* Hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#c5e063]/0 to-[#c5e063]/0 opacity-0 transition-opacity duration-500 group-hover:from-[#c5e063]/5 group-hover:to-[#c5e063]/0 group-hover:opacity-100" />
        </div>
      </div>
    </motion.div>
  );
}

export function IndustrySection() {
  const industries = [
    {
      title: 'E-commerce Platforms',
      description: 'Power your online store with seamless checkout experiences and support for all major payment methods.',
      features: [
        'One-click checkout integration',
        'Shopping cart abandonment recovery',
        'Multi-currency pricing',
        'Subscription billing support'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1592503254549-d83d24a4dfab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlLWNvbW1lcmNlJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzcyMjEzMzIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      icon: <ShoppingBag className="size-6" />
    },
    {
      title: 'Retail Businesses',
      description: 'Accept payments in-store and online with unified reporting and inventory management integration.',
      features: [
        'POS system integration',
        'Contactless payment support',
        'Real-time inventory sync',
        'Customer loyalty programs'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1562774207-e20d9ad4b566?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBjb21tZXJjZSUyMGFmcmljYXxlbnwxfHx8fDE3NzIyMTMzMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      icon: <Briefcase className="size-6" />
    },
    {
      title: 'Fintech Solutions',
      description: 'Build next-generation financial products with our robust API and developer-friendly tools.',
      features: [
        'Comprehensive API documentation',
        'Webhook notifications',
        'Sandbox environment',
        'Advanced fraud protection'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1748439281934-2803c6a3ee36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW50ZWNoJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc3MjIxMzMyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      icon: <Zap className="size-6" />
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#04403a] to-[#001c26] py-24">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-[#c5e063] opacity-5 blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-[#c5e063] opacity-5 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c5e063]/30 bg-[#c5e063]/10 px-4 py-2"
          >
            <span className="text-sm font-medium text-[#c5e063]">Powering Every Industry</span>
          </motion.div>

          <h2 className="mb-6 text-5xl font-bold text-white md:text-6xl">
            Solutions for
            <br />
            <span className="text-[#c5e063]">Every Business</span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-400">
            From startups to enterprises, Kotulapay provides tailored payment solutions 
            that grow with your business
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <IndustryCard
              key={index}
              title={industry.title}
              description={industry.description}
              features={industry.features}
              imageUrl={industry.imageUrl}
              icon={industry.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
