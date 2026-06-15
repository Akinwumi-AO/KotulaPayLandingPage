import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const sections = [
  {
    number: '1',
    title: 'Introduction',
    content: `These Terms of Service ("Terms") constitute a legally binding agreement between Kotula Pay and any individual or entity (Merchant) accessing or using our services via www.kotulapay.com.\n\nKotula Pay is a financial technology and payment services provider offering payment gateway services, merchant acquiring, collections, payouts, cross-border payments, API integrations, and related financial infrastructure services.`,
  },
  {
    number: '2',
    title: 'Acceptance of Terms',
    content: `By accessing or using Kotula Pay services, you agree to be bound by these Terms. If you do not agree, you must not use our services. Continued use of the platform constitutes acceptance of any updates or modifications to these Terms.`,
  },
  {
    number: '3',
    title: 'Eligibility and Merchant Onboarding',
    content: `To use Kotula Pay, you must be a legally registered business or authorized individual capable of entering binding agreements. Merchants must complete onboarding procedures, including Know Your Customer (KYC), Know Your Business (KYB), and verification checks as required by applicable laws and regulatory frameworks.`,
  },
  {
    number: '4',
    title: 'Services Provided',
    content: `Kotula Pay provides payment processing, card acquiring, mobile money integration, bank transfer facilitation, digital wallets, settlement services, reporting tools, fraud monitoring, and related financial technology services either directly or through regulated third-party partners.`,
  },
  {
    number: '5',
    title: 'KYC/AML and Compliance',
    content: `All users must comply with applicable Anti-Money Laundering (AML), Counter-Terrorism Financing (CTF), and sanctions regulations. Kotula Pay reserves the right to request additional documentation, suspend transactions, or terminate accounts where compliance risks are identified.`,
  },
  {
    number: '6',
    title: 'Prohibited Activities',
    content: `You may not use Kotula Pay services for illegal activities, fraud, money laundering, financing of terrorism, sale of prohibited goods/services, unauthorized financial activities, or violation of any applicable laws or network rules.`,
  },
  {
    number: '7',
    title: 'Fees and Charges',
    content: `Kotula Pay may charge fees for transactions, settlements, chargebacks, currency conversion, or other services. Fees will be communicated separately and may be updated from time to time with notice where required.`,
  },
  {
    number: '8',
    title: 'Settlements',
    content: `Settlement timelines vary depending on payment method, acquiring banks, risk checks, and regulatory requirements. Kotula Pay reserves the right to delay settlements where risk or compliance concerns exist.`,
  },
  {
    number: '9',
    title: 'Refunds and Chargebacks',
    content: `Merchants are responsible for managing refunds and chargebacks. Kotula Pay may debit merchant accounts for disputed transactions, chargeback fees, or reversals in accordance with card scheme rules and banking regulations.`,
  },
  {
    number: '10',
    title: 'Risk Management and Fraud Prevention',
    content: `Kotula Pay employs fraud detection systems and monitoring tools. We reserve the right to block, reverse, or investigate suspicious transactions without prior notice.`,
  },
  {
    number: '11',
    title: 'Data Protection and Privacy',
    content: `Kotula Pay collects and processes personal and transactional data in accordance with applicable data protection laws. Data may be shared with regulated partners strictly for service delivery and compliance purposes.`,
  },
  {
    number: '12',
    title: 'Security',
    content: `While Kotula Pay implements industry-standard security measures, we do not guarantee that the platform will be free from unauthorized access, viruses, or cyber threats. Users are responsible for securing their credentials.`,
  },
  {
    number: '13',
    title: 'Intellectual Property',
    content: `All intellectual property rights in the platform, software, branding, and content belong to Kotula Pay or its licensors. Users may not copy, modify, or distribute any materials without prior written consent.`,
  },
  {
    number: '14',
    title: 'Suspension and Termination',
    content: `Kotula Pay may suspend or terminate access immediately if we suspect fraud, illegal activity, breach of Terms, or regulatory non-compliance.`,
  },
  {
    number: '15',
    title: 'Limitation of Liability',
    content: `To the maximum extent permitted by law, Kotula Pay shall not be liable for indirect, incidental, or consequential damages, including loss of profits, revenue, or business opportunities.`,
  },
  {
    number: '16',
    title: 'Indemnification',
    content: `You agree to indemnify and hold harmless Kotula Pay, its directors, employees, and partners against any claims, damages, liabilities, or expenses arising from your use of the services or breach of these Terms.`,
  },
  {
    number: '17',
    title: 'Changes to Terms',
    content: `Kotula Pay may modify these Terms at any time. Updated versions will be published on www.kotulapay.com and continued use of the services constitutes acceptance of such changes.`,
  },
  {
    number: '18',
    title: 'Governing Law',
    content: `These Terms shall be governed by and interpreted in accordance with the laws of the jurisdiction in which Kotula Pay is incorporated, unless otherwise required by applicable regulatory frameworks.`,
  },
  {
    number: '19',
    title: 'Contact Information',
    content: `For any questions regarding these Terms, please contact Kotula Pay through the official communication channels listed on www.kotulapay.com.`,
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001c26] via-[#04403a] to-[#001c26]">
      <Header />

      <main className="mx-auto max-w-4xl px-6 pb-24 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="mb-2 text-sm text-gray-400">Website: www.kotulapay.com</p>
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Kotula Pay – Terms of Service
          </h1>
          <div className="mt-4 h-1 w-16 rounded bg-[#c5e063]" />
        </motion.div>

        <div className="space-y-10">
          {sections.map((section, i) => (
            <motion.div
              key={section.number}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="border-b border-white/10 pb-10 last:border-0"
            >
              <h2 className="mb-3 text-xl font-semibold text-white">
                <span className="mr-2 text-[#c5e063]">{section.number}.</span>
                {section.title}
              </h2>
              {section.content.split('\n\n').map((para, j) => (
                <p key={j} className="mb-3 leading-relaxed text-gray-300 last:mb-0">
                  {para}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
