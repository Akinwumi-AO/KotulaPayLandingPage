import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Code2, Terminal, BookOpen, ArrowRight, Check, Copy } from 'lucide-react';

export function DeveloperSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const codeExample = `// Initialize Kotulapay
import { Kotulapay } from 'kotulapay';

const payment = new Kotulapay({
  publicKey: 'pk_live_...',
  currency: 'KES'
});

// Create payment
const response = await payment.charge({
  amount: 10000,
  email: 'customer@example.com',
  metadata: {
    orderId: '12345'
  }
});`;

  const features = [
    'RESTful API with comprehensive documentation',
    'Client libraries for popular languages',
    'Webhooks for real-time notifications',
    'Sandbox environment for testing',
    'Test cards and payment scenarios',
    'Detailed error handling'
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-b from-[#001c26] to-[#04403a] py-24">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute left-1/3 top-1/4 h-[500px] w-[500px] rounded-full bg-[#c5e063] opacity-10 blur-[120px]"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, type: "spring" }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c5e063]/30 bg-[#c5e063]/10 px-4 py-2"
            >
              <Code2 className="size-4 text-[#c5e063]" />
              <span className="text-sm font-medium text-[#c5e063]">Developer-First Integration</span>
            </motion.div>

            <h2 className="mb-6 text-5xl font-bold text-white md:text-6xl">
              Built for
              <br />
              <span className="text-[#c5e063]">Developers</span>
            </h2>

            <p className="mb-8 text-xl text-gray-400 leading-relaxed">
              Get up and running in minutes with our intuitive API and comprehensive documentation. 
              We've built the tools developers love.
            </p>

            {/* Features List */}
            <div className="mb-8 space-y-4">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#c5e063]/20">
                    <Check className="size-4 text-[#c5e063]" />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-2 rounded-full bg-[#c5e063] px-6 py-3 font-semibold text-[#0a3d3d] shadow-lg shadow-[#c5e063]/20 transition-all hover:shadow-xl hover:shadow-[#c5e063]/30"
              >
                <Terminal className="size-5" />
                <span>Read API Docs</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <BookOpen className="size-5" />
                <span>View Examples</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column - Code Example */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0a0d14]/80 to-[#0a0d14]/60 p-6 backdrop-blur-sm">
              {/* Window Controls */}
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="ml-4 text-sm text-gray-500">payment.js</span>
              </div>

              {/* Code */}
              <div className="relative">
                <pre className="overflow-x-auto text-sm">
                  <code className="text-gray-300">
                    <span className="text-gray-500">// Initialize Kotulapay</span>
                    {'\n'}
                    <span className="text-purple-400">import</span>
                    {' '}
                    <span className="text-gray-300">{'{ Kotulapay }'}</span>
                    {' '}
                    <span className="text-purple-400">from</span>
                    {' '}
                    <span className="text-green-400">'kotulapay'</span>
                    <span className="text-gray-300">;</span>
                    {'\n\n'}
                    <span className="text-purple-400">const</span>
                    {' '}
                    <span className="text-blue-400">payment</span>
                    {' = '}
                    <span className="text-purple-400">new</span>
                    {' '}
                    <span className="text-yellow-400">Kotulapay</span>
                    <span className="text-gray-300">{'({'}</span>
                    {'\n  '}
                    <span className="text-blue-300">publicKey</span>
                    <span className="text-gray-300">: </span>
                    <span className="text-green-400">'pk_live_...'</span>
                    <span className="text-gray-300">,</span>
                    {'\n  '}
                    <span className="text-blue-300">currency</span>
                    <span className="text-gray-300">: </span>
                    <span className="text-green-400">'KES'</span>
                    {'\n'}
                    <span className="text-gray-300">{'});'}</span>
                    {'\n\n'}
                    <span className="text-gray-500">// Create payment</span>
                    {'\n'}
                    <span className="text-purple-400">const</span>
                    {' '}
                    <span className="text-blue-400">response</span>
                    {' = '}
                    <span className="text-purple-400">await</span>
                    {' '}
                    <span className="text-blue-400">payment</span>
                    <span className="text-gray-300">.</span>
                    <span className="text-yellow-400">charge</span>
                    <span className="text-gray-300">{'({'}</span>
                    {'\n  '}
                    <span className="text-blue-300">amount</span>
                    <span className="text-gray-300">: </span>
                    <span className="text-orange-400">10000</span>
                    <span className="text-gray-300">,</span>
                    {'\n  '}
                    <span className="text-blue-300">email</span>
                    <span className="text-gray-300">: </span>
                    <span className="text-green-400">'customer@example.com'</span>
                    <span className="text-gray-300">,</span>
                    {'\n  '}
                    <span className="text-blue-300">metadata</span>
                    <span className="text-gray-300">: {'{'}</span>
                    {'\n    '}
                    <span className="text-blue-300">orderId</span>
                    <span className="text-gray-300">: </span>
                    <span className="text-green-400">'12345'</span>
                    {'\n  '}
                    <span className="text-gray-300">{'}'}</span>
                    {'\n'}
                    <span className="text-gray-300">{'});'}</span>
                  </code>
                </pre>

                {/* Copy button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopy(codeExample, 0)}
                  className="absolute right-2 top-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  {copiedIndex === 0 ? (
                    <span className="flex items-center gap-1">
                      <Check className="size-3" />
                      Copied!
                    </span>
                  ) : (
                    'Copy'
                  )}
                </motion.button>
              </div>

              {/* Decorative elements */}
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#c5e063] opacity-10 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#c5e063] opacity-10 blur-3xl" />
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 top-1/4 rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur-sm"
            >
              <div className="mb-1 text-xs text-gray-400">Response Time</div>
              <div className="text-2xl font-bold text-[#c5e063]">{'<100ms'}</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 bottom-1/4 rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur-sm"
            >
              <div className="mb-1 text-xs text-gray-400">API Uptime</div>
              <div className="text-2xl font-bold text-[#c5e063]">99.99%</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}