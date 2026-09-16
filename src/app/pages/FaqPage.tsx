import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        question: 'What is Kotulapay?',
        answer: "Kotulapay is a payment service provider that enables seamless card processing and alternative payment methods across Africa. We provide enterprise-grade payment infrastructure that helps businesses collect payments, scale operations, and grow with secure, reliable payment solutions.",
      },
      {
        question: 'How do I get started with Kotulapay?',
        answer: "Getting started is simple. Sign up for an account, complete the verification process, and you'll receive your API keys. You can then integrate our payment solutions into your platform using our comprehensive documentation and SDKs. Our support team is available to assist you throughout the process.",
      },
      {
        question: 'What countries does Kotulapay support?',
        answer: "Kotulapay currently supports payments across multiple African countries including Kenya, Nigeria, Ghana, Uganda, Tanzania, and South Africa. We're continuously expanding our coverage to serve more markets across the continent.",
      },
    ],
  },
  {
    category: 'Payment Methods',
    questions: [
      {
        question: 'What payment methods do you support?',
        answer: 'We support a wide range of payment methods including credit and debit cards (Visa, Mastercard, American Express), mobile money (M-Pesa, MTN Mobile Money, Airtel Money), bank transfers, and various local payment methods specific to each African market.',
      },
      {
        question: 'Can I accept international payments?',
        answer: 'Yes! Kotulapay supports both local and international payments. You can accept payments from customers worldwide while providing localized payment options for African customers, all through a single integration.',
      },
      {
        question: 'What currencies are supported?',
        answer: 'We support major African currencies including KES, NGN, GHS, UGX, TZS, and ZAR, as well as international currencies like USD, EUR, and GBP — 135+ currencies in total.',
      },
    ],
  },
  {
    category: 'Security & Compliance',
    questions: [
      {
        question: 'Is Kotulapay secure?',
        answer: 'Absolutely. Kotulapay is PCI DSS Level 1 compliant — the highest level of security certification in the payments industry. We use advanced encryption, tokenization, and fraud detection systems to protect your transactions and customer data.',
      },
      {
        question: 'How do you handle data privacy?',
        answer: 'We take data privacy seriously and comply with international data protection regulations including GDPR. Customer payment data is encrypted both in transit and at rest, and we never store sensitive card information on our servers.',
      },
      {
        question: 'What fraud prevention measures are in place?',
        answer: 'Our platform includes advanced fraud detection powered by machine learning, real-time transaction monitoring, 3D Secure authentication, velocity checks, and customizable fraud rules.',
      },
    ],
  },
  {
    category: 'Integration & Technical',
    questions: [
      {
        question: 'How long does integration take?',
        answer: 'Most developers can complete a basic integration in a few hours. Our RESTful APIs are well-documented, and we provide SDKs for popular programming languages including JavaScript, Python, PHP, Ruby, and more.',
      },
      {
        question: 'Do you provide testing environments?',
        answer: "Yes! We provide a complete sandbox environment where you can test all payment flows without processing real transactions. You'll receive test API keys and access to our testing tools to simulate various payment scenarios.",
      },
      {
        question: 'What kind of technical support do you offer?',
        answer: 'We offer comprehensive technical support including detailed documentation, API references, code samples, video tutorials, and a dedicated support team. Enterprise customers also have access to priority support with guaranteed response times.',
      },
    ],
  },
  {
    category: 'Pricing & Fees',
    questions: [
      {
        question: 'How does your pricing work?',
        answer: 'Our pricing is transparent and competitive, with no hidden fees. We charge a percentage of each successful transaction plus a small fixed fee. Contact our sales team for custom pricing based on your needs.',
      },
      {
        question: 'Are there any setup or monthly fees?',
        answer: 'There are no setup fees or monthly minimums for our standard plans. You only pay for successful transactions. Enterprise plans with custom features may have different pricing structures tailored to your business requirements.',
      },
      {
        question: 'When do I receive my funds?',
        answer: 'Settlement times vary by payment method and country, but typically funds are transferred to your bank account within 1–3 business days. Faster settlement options are available for businesses with higher transaction volumes.',
      },
    ],
  },
];

function FaqAccordion({ category, questions }: typeof faqs[0]) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <h3 className="mb-4 text-xl font-bold text-[#001c26]">{category}</h3>
      <div className="space-y-3">
        {questions.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="overflow-hidden rounded-2xl border-2 border-[#e6eced] bg-white">
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left"
              >
                <span className="text-base font-semibold text-[#1d3b32]">{faq.question}</span>
                <ChevronDown
                  className={`size-5 shrink-0 text-[#289685] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <div className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <p className="border-t border-[#e6eced] px-7 py-5 text-[#62636c] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#001c26] to-[#04403a] pt-32 pb-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(197,224,99,0.3) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative z-10 mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px] text-center">
          <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">Frequently Asked Questions</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300 leading-relaxed">
            Find answers to common questions about Kotulapay's payment solutions, integration process, security, and more.
          </p>
        </div>
      </section>

      {/* FAQ content */}
      <section className="bg-[#f6faee] py-14 lg:py-20">
        <div className="mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">
          <div className="mx-auto max-w-3xl space-y-10">
            {faqs.map(section => (
              <FaqAccordion key={section.category} {...section} />
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="bg-[#e5f2f6] py-14 lg:py-20">
        <div className="mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">
          <div className="relative overflow-hidden rounded-3xl bg-[#001c26] px-8 py-16 text-center md:px-16">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute left-1/2 top-0 h-full w-[100px] -translate-x-1/2 bg-gradient-to-b from-[#00bf6f] to-transparent opacity-15 blur-[90px]" />
            </div>
            <div className="relative z-10">
              <h2 className="mb-4 text-3xl font-bold text-[#fcfcfd] md:text-4xl">Still have questions?</h2>
              <p className="mx-auto mb-8 max-w-[520px] text-lg text-[#cdced7] leading-relaxed">
                Our support team is here to help you with any questions or concerns.
              </p>
              <Link to="/contact">
                <button className="flex items-center gap-2 rounded-full bg-[#289685] px-8 py-4 font-medium text-[#fcfcfd] transition-colors hover:bg-[#237a71] text-base mx-auto">
                  Contact Support
                  <ArrowRight className="size-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
