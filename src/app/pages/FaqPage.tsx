import { motion } from 'motion/react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'What is KotulaPay?',
          answer: 'KotulaPay is a payment service provider that enables seamless card processing and alternative payment methods across Africa. We provide enterprise-grade payment infrastructure that helps businesses collect payments, scale operations, and grow with secure, reliable payment solutions.'
        },
        {
          question: 'How do I get started with KotulaPay?',
          answer: 'Getting started is simple! Sign up for an account, complete the verification process, and you\'ll receive your API keys. You can then integrate our payment solutions into your platform using our comprehensive documentation and SDKs. Our support team is available to assist you throughout the process.'
        },
        {
          question: 'What countries does KotulaPay support?',
          answer: 'KotulaPay currently supports payments across multiple African countries including Kenya, Nigeria, Ghana, Uganda, Tanzania, and South Africa. We\'re continuously expanding our coverage to serve more markets across the continent.'
        }
      ]
    },
    {
      category: 'Payment Methods',
      questions: [
        {
          question: 'What payment methods do you support?',
          answer: 'We support a wide range of payment methods including credit and debit cards (Visa, Mastercard, American Express), mobile money (M-Pesa, MTN Mobile Money, Airtel Money), bank transfers, and various local payment methods specific to each African market.'
        },
        {
          question: 'Can I accept international payments?',
          answer: 'Yes! KotulaPay supports both local and international payments. You can accept payments from customers worldwide while providing localized payment options for African customers, all through a single integration.'
        },
        {
          question: 'What currencies are supported?',
          answer: 'We support major African currencies including KES (Kenyan Shilling), NGN (Nigerian Naira), GHS (Ghanaian Cedi), UGX (Ugandan Shilling), TZS (Tanzanian Shilling), ZAR (South African Rand), as well as international currencies like USD, EUR, and GBP.'
        }
      ]
    },
    {
      category: 'Security & Compliance',
      questions: [
        {
          question: 'Is KotulaPay secure?',
          answer: 'Absolutely. KotulaPay is PCI DSS Level 1 compliant, which is the highest level of security certification in the payments industry. We use advanced encryption, tokenization, and fraud detection systems to protect your transactions and customer data.'
        },
        {
          question: 'How do you handle data privacy?',
          answer: 'We take data privacy seriously and comply with international data protection regulations including GDPR. Customer payment data is encrypted both in transit and at rest, and we never store sensitive card information on our servers. We use industry-standard tokenization for secure payment processing.'
        },
        {
          question: 'What fraud prevention measures are in place?',
          answer: 'Our platform includes advanced fraud detection powered by machine learning, real-time transaction monitoring, 3D Secure authentication, velocity checks, and customizable fraud rules. We also provide detailed transaction analytics to help you identify and prevent fraudulent activities.'
        }
      ]
    },
    {
      category: 'Integration & Technical',
      questions: [
        {
          question: 'How long does integration take?',
          answer: 'Integration time varies based on your technical requirements, but most developers can complete a basic integration in a few hours. Our RESTful APIs are well-documented, and we provide SDKs for popular programming languages including JavaScript, Python, PHP, Ruby, and more.'
        },
        {
          question: 'Do you provide testing environments?',
          answer: 'Yes! We provide a complete sandbox environment where you can test all payment flows without processing real transactions. You\'ll receive test API keys and access to our testing tools to simulate various payment scenarios.'
        },
        {
          question: 'What kind of technical support do you offer?',
          answer: 'We offer comprehensive technical support including detailed documentation, API references, code samples, video tutorials, and a dedicated support team. Enterprise customers also have access to priority support with guaranteed response times and dedicated account managers.'
        }
      ]
    },
    {
      category: 'Pricing & Fees',
      questions: [
        {
          question: 'How does your pricing work?',
          answer: 'Our pricing is transparent and competitive, with no hidden fees. We charge a percentage of each successful transaction plus a small fixed fee. The exact rates depend on your transaction volume, business type, and payment methods used. Contact our sales team for custom pricing based on your needs.'
        },
        {
          question: 'Are there any setup or monthly fees?',
          answer: 'There are no setup fees or monthly minimums for our standard plans. You only pay for successful transactions. Enterprise plans with custom features may have different pricing structures tailored to your business requirements.'
        },
        {
          question: 'When do I receive my funds?',
          answer: 'Settlement times vary by payment method and country, but typically funds are transferred to your bank account within 1-3 business days. We offer faster settlement options for businesses with higher transaction volumes.'
        }
      ]
    }
  ];

  const allQuestions = faqs.flatMap((category, categoryIndex) =>
    category.questions.map((q, questionIndex) => ({
      ...q,
      category: category.category,
      globalIndex: faqs.slice(0, categoryIndex).reduce((sum, cat) => sum + cat.questions.length, 0) + questionIndex
    }))
  );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-[#001c26] to-[#04403a] pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#c5e063] to-[#c5e063]/80">
                <HelpCircle className="h-8 w-8 text-[#0a3d3d]" />
              </div>
            </div>
            <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-300 leading-relaxed">
              Find answers to common questions about KotulaPay's payment solutions, 
              integration process, security, and more.
            </p>
          </motion.div>

          {/* FAQ Sections */}
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="mb-12"
            >
              <h2 className="mb-6 text-2xl font-bold text-[#c5e063]">
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const globalIndex = faqs.slice(0, categoryIndex).reduce((sum, cat) => sum + cat.questions.length, 0) + questionIndex;
                  const isOpen = openIndex === globalIndex;
                  
                  return (
                    <motion.div
                      key={questionIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: categoryIndex * 0.1 + questionIndex * 0.05 }}
                      className="overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm"
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                        className="flex w-full items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-white/5"
                      >
                        <span className="text-lg font-semibold text-white">
                          {faq.question}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown className="h-5 w-5 text-[#c5e063]" />
                        </motion.div>
                      </button>
                      
                      <motion.div
                        initial={false}
                        animate={{
                          height: isOpen ? 'auto' : 0,
                          opacity: isOpen ? 1 : 0
                        }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/10 px-6 py-5">
                          <p className="text-gray-300 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-br from-[#c5e063]/10 to-[#c5e063]/5 p-8 text-center backdrop-blur-sm"
          >
            <h3 className="mb-4 text-2xl font-bold text-white">
              Still have questions?
            </h3>
            <p className="mb-6 text-gray-300">
              Our support team is here to help you with any questions or concerns.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-[#c5e063] px-8 py-3 font-semibold text-[#0a3d3d] shadow-lg shadow-[#c5e063]/20 transition-all hover:shadow-xl hover:shadow-[#c5e063]/30"
            >
              Contact Support
            </motion.button>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}