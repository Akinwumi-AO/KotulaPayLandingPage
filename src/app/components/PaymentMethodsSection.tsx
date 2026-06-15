import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { CreditCard, Smartphone, Wallet, Globe2 } from 'lucide-react';

interface PaymentMethod {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  methods: string[];
  color: string;
}

export function PaymentMethodsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'cards',
      icon: <CreditCard className="size-8" />,
      title: 'Global Cards',
      description: 'Accept major cards worldwide',
      methods: ['Visa', 'Mastercard', 'American Express', 'Verve'],
      color: '#8B5CF6'
    },
    {
      id: 'mobile',
      icon: <Smartphone className="size-8" />,
      title: 'African Mobile Money',
      description: 'Mobile payments across 9 African countries',
      methods: ['M-Pesa (Kenya)', 'MTN Money', 'Airtel Money', 'Tigo Pesa'],
      color: '#EC4899'
    },
    {
      id: 'wallet',
      icon: <Wallet className="size-8" />,
      title: 'Digital Wallets',
      description: 'Support for popular digital wallets',
      methods: ['PayPal', 'Apple Pay', 'Google Pay', 'Samsung Pay'],
      color: '#F59E0B'
    },
    {
      id: 'bank',
      icon: <Globe2 className="size-8" />,
      title: 'Bank Transfer',
      description: 'Direct bank account payments',
      methods: ['USSD', 'Bank Account', 'QR Code', 'Direct Debit'],
      color: '#10B981'
    }
  ];

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-b from-[#001c26] to-[#04403a] py-24">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-[#c5e063] opacity-10 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring" }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c5e063]/30 bg-[#c5e063]/10 px-4 py-2"
          >
            <span className="text-sm font-medium text-[#c5e063]">Accept Every Payment Method</span>
          </motion.div>

          <h2 className="mb-6 text-5xl font-bold text-white md:text-6xl">
            One Platform,
            <br />
            <span className="text-[#c5e063]">All Payment Methods</span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-400">
            Global card processing with localized African mobile money support across Kenya, Uganda, 
            Tanzania, Rwanda, Zambia, Ghana, Nigeria, Egypt, and Cameroon
          </p>
        </motion.div>

        {/* Payment Methods Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#c5e063]/30">
                {/* Icon Container */}
                <motion.div 
                  className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#c5e063]/20 to-[#c5e063]/10"
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                    rotate: hoveredIndex === index ? [0, -5, 5, 0] : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-[#c5e063]">
                    {method.icon}
                  </div>
                </motion.div>

                {/* Title */}
                <h3 className="mb-2 text-xl font-bold text-white">{method.title}</h3>
                
                {/* Description */}
                <p className="mb-4 text-sm text-gray-400">{method.description}</p>

                {/* Methods List */}
                <div className="space-y-2">
                  {method.methods.map((m, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.05 }}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-[#c5e063]" />
                      {m}
                    </motion.div>
                  ))}
                </div>

                {/* Hover effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-[#c5e063]/0 to-[#c5e063]/0 opacity-0 transition-opacity duration-300 group-hover:from-[#c5e063]/5 group-hover:to-[#c5e063]/0 group-hover:opacity-100"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}