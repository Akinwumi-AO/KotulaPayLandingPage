import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { TrendingUp, Award, Globe2, Clock } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}

function StatCard({ icon, value, label, delay }: StatCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    const duration = 2000;
    const steps = 60;
    const stepValue = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  const formatValue = (val: number) => {
    if (value.includes('B')) return `$${val.toFixed(1)}B+`;
    if (value.includes('%')) return `${val.toFixed(2)}%`;
    if (value.includes('+')) return `${Math.floor(val)}+`;
    return val.toString();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#c5e063]/30 hover:shadow-xl hover:shadow-[#c5e063]/10">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#c5e063]/0 to-[#c5e063]/0 opacity-0 transition-opacity duration-300 group-hover:from-[#c5e063]/5 group-hover:to-[#c5e063]/0 group-hover:opacity-100" />
        
        {/* Icon */}
        <motion.div 
          className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6f8fa]"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[#99D261]">
            {icon}
          </div>
        </motion.div>

        {/* Value */}
        <div className="relative mb-2">
          <motion.h3 
            className="text-5xl font-bold text-white"
            initial={{ scale: 0.5 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
          >
            {isInView ? formatValue(count) : value}
          </motion.h3>
        </div>

        {/* Label */}
        <p className="text-base text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
          {label}
        </p>

        {/* Decorative element */}
        <motion.div 
          className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#c5e063] opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-10"
        />
      </div>
    </motion.div>
  );
}

export function StatsSection() {
  const stats = [
    {
      icon: <Award className="size-6" />,
      value: "99.99%",
      label: "Platform Uptime"
    },
    {
      icon: <TrendingUp className="size-6" />,
      value: "$2.5B+",
      label: "Processed Annually"
    },
    {
      icon: <Globe2 className="size-6" />,
      value: "135+",
      label: "Currencies Supported"
    },
    {
      icon: <Clock className="size-6" />,
      value: "24/7",
      label: "Support Available"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#001c26] to-[#04403a] py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(197, 224, 99, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-5xl font-bold text-white">
            Built for <span className="text-[#c5e063]">Scale</span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-400">
            Powering businesses worldwide with reliable, enterprise-grade payment infrastructure 
            for global card processing and African mobile money
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}