import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FileText, ChevronDown, Menu, X } from 'lucide-react';
import { TermsHeader } from '../components/docs/TermsHeader';

interface Section {
  id: string;
  number: string;
  title: string;
  content: React.ReactNode;
}

export default function TermsOfServicePage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('introduction');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const sections: Section[] = [
    {
      id: 'introduction', number: '1', title: 'Introduction',
      content: <>
        <p>These Terms of Service ("Terms") constitute a legally binding agreement between <strong>Finlume Ltd</strong>, a company incorporated in Kenya with registration number PVT-WQ123PB3 and any individual or entity ("User", "Merchant") accessing or using our services via www.kotulapay.com.</p>
        <p>Kotulapay is a financial technology and payment services provider offering payment gateway services, merchant acquiring, collections, payouts, cross-border payments, API integrations, and related financial infrastructure services.</p>
      </>
    },
    {
      id: 'definitions', number: '2', title: 'Definitions',
      content: <ul className="space-y-3 list-none">
        {[
          ['"Merchant Funds"', 'means monies collected by Kotulapay on behalf of a Merchant pending settlement.'],
          ['"Settlement"', 'means the transfer of Merchant Funds, net of applicable fees, to a Merchant\'s designated bank or mobile money account.'],
          ['"Reserve"', 'means an amount of Merchant Funds withheld by Kotulapay to cover potential chargebacks, refunds, or compliance risk.'],
          ['"Sanctions Lists"', 'means the consolidated lists maintained by the United Nations Security Council, the Office of Foreign Assets Control (OFAC), the European Union, and any applicable national regulator.'],
          ['"Regulator"', 'means Central Bank of Kenya, or such other authority with jurisdiction over Kotulapay\'s licensed activities.'],
        ].map(([term, def]) => (
          <li key={term} className="flex gap-2"><span className="text-[#c5e063] flex-shrink-0">•</span><span><strong>{term}</strong> {def}</span></li>
        ))}
      </ul>
    },
    {
      id: 'acceptance', number: '3', title: 'Acceptance of Terms',
      content: <p>By accessing or using Kotulapay services, you agree to be bound by these Terms. If you do not agree, you must not use our services. Material changes to these Terms will be communicated in accordance with Section 30 (Changes to Terms); continued use after the effective date of such changes constitutes acceptance.</p>
    },
    {
      id: 'eligibility', number: '4', title: 'Eligibility and Merchant Onboarding',
      content: <p>To use Kotulapay, you must be a legally registered business or authorized individual capable of entering binding agreements. Merchants must complete onboarding procedures, including Know Your Customer (KYC), Know Your Business (KYB), beneficial ownership disclosure, and verification check as required by applicable laws and regulatory frameworks. Kotulapay reserves the right to decline onboarding at its sole discretion, including where a prospective Merchant's business falls within a restricted or high-risk category.</p>
    },
    {
      id: 'services', number: '5', title: 'Services Provided',
      content: <p>Kotulapay provides payment processing, mobile money integration, bank transfer facilitation, digital wallets, settlement services, reporting tools, fraud monitoring, and related financial technology services, either directly or through regulated third-party partners, acquiring banks, and payment scheme members (each a "Third-Party Partner").</p>
    },
    {
      id: 'licensing', number: '6', title: 'Regulatory Licensing and Status',
      content: <>
        <p>Kotulapay provides its services as a technology service provider operating on behalf of, and pursuant to a written agreement with, Banks ("Licensed Partner"), which is duly licensed and regulated by [Insert Regulator Name] under license number [Insert License Number] to provide payment services within [Insert Jurisdiction(s)]. All Merchant Funds are collected, held, and settled by the Licensed Partner in accordance with its regulatory obligations; Kotulapay does not itself hold a payment service provider license at this time.</p>
        <p>Kotulapay has submitted its own application for a Payment Service Provider license to [Insert Regulator Name], reference number [Insert Reference Number, if available]. Kotulapay is not a licensed deposit-taking bank; Merchant Funds are not covered by any deposit insurance scheme unless expressly stated by the Licensed Partner.</p>
      </>
    },
    {
      id: 'kyc-aml', number: '7', title: 'KYC/AML and Sanctions Compliance',
      content: <p>All Users must comply with applicable Anti-Money Laundering (AML), Counter-Terrorism Financing (CTF), and sanctions regulations. Kotulapay screens Users and transactions against Sanctions Lists on an ongoing basis and reserves the right to request additional documentation, delay or block transactions, suspend transactions, or terminate accounts where compliance risks are identified. Merchants agree to periodic re-verification of KYC/KYB information, at intervals determined by Kotulapay's risk-based approach or as required by the Regulator.</p>
    },
    {
      id: 'prohibited', number: '8', title: 'Prohibited Activities',
      content: <p>You may not use Kotulapay services for illegal activities, fraud, money laundering, financing of terrorism, sale of prohibited or restricted goods/services (including but not limited to unlicensed gambling, counterfeit goods, and narcotics), unauthorized financial activities, evasion of Sanctions Lists, or violation of any applicable laws, card scheme rules, or network rules. A non-exhaustive list of restricted business categories is available on request and may be updated from time to time.</p>
    },
    {
      id: 'fees', number: '9', title: 'Fees and Charges',
      content: <p>Kotulapay charges fees for transactions, settlements, chargebacks, currency conversion, and other services as set out in the applicable Merchant fee schedule provided at onboarding or made available via the Kotulapay dashboard. Fee changes will be communicated to Merchants at least thirty (30) days in advance, except where a fee change is required to reflect a change imposed by a Third-Party Partner, card scheme, or Regulator, in which case Kotulapay will provide notice as soon as reasonably practicable.</p>
    },
    {
      id: 'settlements', number: '10', title: 'Settlements',
      content: <p>Settlement timelines vary depending on payment method, acquiring bank, risk checks, and regulatory requirements, but will not exceed 7 business days from transaction confirmation, save where Section 11 (Reserve, Holdback and Set-Off) or Section 7 (KYC/AML and Sanctions Compliance) applies. Kotulapay reserves the right to delay settlement where risk, fraud, or compliance concerns exist, and will notify the affected Merchant of the reason for delay where legally permitted to do so.</p>
    },
    {
      id: 'reserve', number: '11', title: 'Reserve, Holdback, and Set-Off Rights',
      content: <p>Kotulapay may withhold a Reserve from a Merchant's Settlement where reasonably necessary to cover anticipated chargebacks, refunds, fines, or compliance exposure, particularly for Merchants in higher-risk categories. The applicable Reserve percentage and holding period will be disclosed to the Merchant in writing. Kotulapay may set off any amounts owed to it by a Merchant (including fees, fines, chargebacks, and reversals) against any Merchant Funds otherwise due for Settlement.</p>
    },
    {
      id: 'refunds', number: '12', title: 'Refunds and Chargebacks',
      content: <p>Merchants are responsible for managing refunds and chargebacks in accordance with applicable card scheme rules. Merchants must respond to chargeback notifications within 3 business days of notice from Kotulapay. Kotulapay may debit merchant accounts, or apply amounts held under Section 11, for disputed transactions, chargeback fees, or reversals in accordance with card scheme rules and banking regulations.</p>
    },
    {
      id: 'safeguarding', number: '13', title: 'Safeguarding of Merchant Funds',
      content: <p>Merchant Funds held by Kotulapay pending Settlement are held in a segregated safeguarding account separate from Kotulapay's own operating funds, in accordance with CBK guidelines. Kotulapay does not use Merchant Funds for its own working capital, lending, or investment purposes. In the event of Kotulapay's insolvency, safeguarded Merchant Funds are intended to be protected from claims by Kotulapay's general creditors, subject to applicable law.</p>
    },
    {
      id: 'interest', number: '14', title: 'Interest on Held Funds',
      content: <p>Unless otherwise agreed in writing or required by applicable law, any interest earned on Merchant Funds held in safeguarding or Reserve accounts is retained by Kotulapay as part of its compensation for providing the services.</p>
    },
    {
      id: 'risk', number: '15', title: 'Risk Management and Fraud Prevention',
      content: <p>Kotulapay employs fraud detection systems and monitoring tools. We reserve the right to block, reverse, delay, or investigate suspicious transactions without prior notice where required to manage fraud or compliance risk, and will inform the affected Merchant as soon as reasonably practicable thereafter unless prohibited by law (for example, under anti-tipping-off provisions of AML law).</p>
    },
    {
      id: 'currency', number: '16', title: 'Currency Conversion and Cross-Border Payments',
      content: <p>Where Kotulapay facilitates currency conversion for cross-border transactions, the applicable exchange rate will include a margin over the prevailing interbank/reference rate. The applicable rate and margin will be disclosed to the Merchant at the time of the transaction or in the applicable fee schedule. Cross-border payments remain subject to the foreign exchange control regulations of the originating and receiving jurisdictions, and Kotulapay is not liable for delays caused by such regulatory processes.</p>
    },
    {
      id: 'data-protection', number: '17', title: 'Data Protection and Privacy',
      content: <p>Kotulapay collects and processes personal and transactional data in accordance with applicable data protection laws, including Kenya Data Protection Act 2019. Data may be shared with regulated Third-Party Partners strictly for service delivery, fraud prevention, and compliance purposes. In the event of a data breach, Kotulapay will notify affected Users and, where required, the applicable data protection authority within seventy-two (72) hours of becoming aware of the breach.</p>
    },
    {
      id: 'security', number: '18', title: 'Security',
      content: <p>Kotulapay implements industry-standard security measures, including compliance with the Payment Card Industry Data Security Standard (PCI-DSS) where applicable. Kotulapay does not guarantee that the platform will be entirely free from unauthorized access, viruses, or cyber threats. Users are responsible for securing their credentials, API keys, and integration environments, and must notify Kotulapay immediately upon suspecting a security compromise.</p>
    },
    {
      id: 'availability', number: '19', title: 'Service Availability and Support',
      content: <p>Kotulapay will use reasonable commercial efforts to maintain platform availability but does not guarantee uninterrupted service. Scheduled maintenance will be communicated to Merchants in advance where reasonably possible. Support channels and indicative response times are set out in the Merchant onboarding documentation or dashboard. Nothing in this Section constitutes a guaranteed uptime commitment unless separately agreed in a service-level agreement.</p>
    },
    {
      id: 'ip', number: '20', title: 'Intellectual Property',
      content: <p>All intellectual property rights in the platform, software, branding, and content belong to Kotulapay or its licensors. Users may not copy, modify, reverse-engineer, or distribute any materials without prior written consent.</p>
    },
    {
      id: 'warranties', number: '21', title: 'Representations and Warranties',
      content: <p>Each Merchant represents and warrants that: (a) it is duly registered and authorized to conduct its business under applicable law; (b) all information provided during onboarding and thereafter is true, accurate, and complete; (c) its use of the Services will not violate the Prohibited Activities set out in Section 8; and (d) it holds all licenses, permits, and approvals required to sell its goods or services.</p>
    },
    {
      id: 'confidentiality', number: '22', title: 'Confidentiality',
      content: <p>Each party agrees to keep confidential any non-public business, technical, or transactional information disclosed by the other party in connection with these Terms, and to use such information solely for the purposes of performing its obligations under these Terms, except where disclosure is required by law, Regulator, or court order.</p>
    },
    {
      id: 'suspension', number: '23', title: 'Suspension and Termination',
      content: <p>Kotulapay may suspend or terminate access immediately, and without prior notice where reasonably necessary, if it suspects fraud, illegal activity, breach of these Terms, or regulatory non-compliance. Where suspension or termination is not for such urgent cause, Kotulapay will provide at least 30 days' written notice. On termination, any Merchant Funds not subject to a Reserve or ongoing dispute will be settled to the Merchant's designated account within the agreed number of business days, less any outstanding fees or liabilities.</p>
    },
    {
      id: 'dormancy', number: '24', title: 'Account Dormancy and Unclaimed Funds',
      content: <p>Where a Merchant account remains inactive for 3 consecutive months, Kotulapay may classify the account as dormant and apply an applicable dormancy fee, subject to prior notice. Unclaimed Merchant Funds will be handled in accordance with applicable unclaimed property or escheatment laws in the relevant jurisdiction.</p>
    },
    {
      id: 'liability', number: '25', title: 'Limitation of Liability',
      content: <p>To the maximum extent permitted by law, Kotulapay shall not be liable for indirect, incidental, special, or consequential damages, including loss of profits, revenue, or business opportunities. Kotulapay's aggregate liability to a Merchant for any claim arising under these Terms shall not exceed the total fees paid by that Merchant to Kotulapay in the three (3) months preceding the event giving rise to the claim, except in cases of fraud, willful misconduct, or gross negligence.</p>
    },
    {
      id: 'indemnification', number: '26', title: 'Indemnification',
      content: <p>You agree to indemnify and hold harmless Kotulapay, its directors, employees, and Third-Party Partners against any claims, damages, liabilities, or expenses (including reasonable legal fees) arising from your use of the services, breach of these Terms, or violation of applicable law.</p>
    },
    {
      id: 'force-majeure', number: '27', title: 'Force Majeure',
      content: <p>Neither party shall be liable for any failure or delay in performance under these Terms resulting from causes beyond its reasonable control, including but not limited to natural disasters, war, civil unrest, acts of government, telecommunications or banking system failures, or widespread internet outages, provided that the affected party notifies the other as soon as reasonably practicable and uses reasonable efforts to mitigate the impact.</p>
    },
    {
      id: 'disputes', number: '28', title: 'Dispute Resolution',
      content: <p>In the event of a dispute arising out of or relating to these Terms, the parties will first attempt to resolve the matter through good-faith negotiation for a period of thirty (30) days. If unresolved, the dispute shall be referred to mediation or arbitration in accordance with the rules of the Nairobi Centre for International Arbitration, seated in Nairobi with proceedings conducted in English. Nothing in this Section prevents either party from seeking urgent injunctive relief from a court of competent jurisdiction.</p>
    },
    {
      id: 'complaints', number: '29', title: 'Complaints Handling',
      content: <p>Merchants may submit complaints through the official channels listed on www.kotulapay.com. Kotulapay will acknowledge receipt within 1 business day and aim to resolve complaints within 30 business days. Where a Merchant is not satisfied with the outcome, they may escalate the complaint to the applicable Regulator or Ombudsman where applicable.</p>
    },
    {
      id: 'changes', number: '30', title: 'Changes to Terms',
      content: <p>Kotulapay may modify these Terms from time to time. Material changes will be published on www.kotulapay.com and, where reasonably practicable, communicated directly to Merchants at least thirty (30) days before taking effect. Continued use of the services after the effective date constitutes acceptance of the updated Terms; Merchants who do not agree may terminate their account prior to the effective date without penalty.</p>
    },
    {
      id: 'governing-law', number: '31', title: 'Governing Law and Jurisdiction',
      content: <p>These Terms shall be governed by and interpreted in accordance with the laws of Kenya, without prejudice to any mandatory consumer protection or financial services laws of the jurisdiction in which a Merchant is located. Subject to Section 28 (Dispute Resolution), the courts of Kenya shall have non-exclusive jurisdiction.</p>
    },
    {
      id: 'assignment', number: '32', title: 'Assignment',
      content: <p>Kotulapay may assign or transfer its rights and obligations under these Terms, including in connection with a merger, acquisition, or sale of assets, upon notice to affected Merchants. A Merchant may not assign its rights or obligations under these Terms without Kotulapay's prior written consent.</p>
    },
    {
      id: 'notices', number: '33', title: 'Notices',
      content: <p>Notices under these Terms will be deemed validly given if sent to the email address or physical address provided during onboarding, or published on www.kotulapay.com, and shall be deemed received twenty-four (24) hours after sending (for electronic notices) or five (5) business days after posting (for physical notices).</p>
    },
    {
      id: 'severability', number: '34', title: 'Severability',
      content: <p>If any provision of these Terms is found to be invalid or unenforceable by a court or Regulator of competent jurisdiction, that provision shall be severed, and the remaining provisions shall continue in full force and effect.</p>
    },
    {
      id: 'entire-agreement', number: '35', title: 'Entire Agreement',
      content: <p>These Terms, together with any fee schedules, onboarding documentation, and policies referenced herein, constitute the entire agreement between the parties and supersede all prior agreements, understandings, or representations relating to their subject matter.</p>
    },
    {
      id: 'waiver', number: '36', title: 'Waiver',
      content: <p>No failure or delay by Kotulapay in exercising any right under these Terms shall operate as a waiver of that right, nor shall any single or partial exercise preclude any further exercise of that or any other right.</p>
    },
    {
      id: 'third-party', number: '37', title: 'No Third-Party Beneficiaries',
      content: <p>These Terms are intended solely for the benefit of Kotulapay and the User/Merchant and do not confer any rights or remedies on any third party, except as expressly stated.</p>
    },
    {
      id: 'contact', number: '38', title: 'Contact Information',
      content: <p>For any questions regarding these Terms, please contact Kotulapay through the official communication channels listed on www.kotulapay.com, or in writing at <a href="mailto:compliance@kotulapay.com" className="text-[#c5e063] hover:underline">compliance@kotulapay.com</a>.</p>
    },
  ];

  const activeSectionTitle = sections.find(s => s.id === activeSection)?.title ?? '';

  useEffect(() => {
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visible.delete(entry.target.id);
          }
        });
        if (visible.size === 0) return;
        let topId = '';
        let topY = Infinity;
        visible.forEach((y, id) => { if (y < topY) { topY = y; topId = id; } });
        if (topId) setActiveSection(topId);
      },
      { rootMargin: '-10% 0px -60% 0px', threshold: 0 }
    );
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0d1117]' : 'bg-white'}`}>
      <TermsHeader isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />

      {/* Mobile Fixed Section Nav */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-[64px] left-0 right-0 z-40 border-b md:hidden ${
          isDarkMode ? 'border-gray-800 bg-[#0d1117]' : 'border-gray-200 bg-white'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          <span className={`text-sm font-semibold truncate pr-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{activeSectionTitle}</span>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`flex flex-shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-colors ${
              isDarkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-800' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {isMobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            <ChevronDown className={`size-3.5 transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className={`overflow-y-auto border-t max-h-[60vh] ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}
            >
              <nav className="px-4 py-2">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection(s.id)}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                      activeSection === s.id
                        ? isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
                        : isDarkMode ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <FileText className="size-4 flex-shrink-0" />
                    <span className="text-xs text-gray-500 flex-shrink-0">{s.number}.</span>
                    {s.title}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex pt-[64px] overflow-x-hidden">
        {/* Desktop Sidebar */}
        <aside className={`hidden md:block fixed left-0 top-[64px] h-[calc(100vh-64px)] w-64 overflow-y-auto border-r ${
          isDarkMode ? 'border-gray-800 bg-[#0d1117]' : 'border-gray-200 bg-white'
        }`}>
          <div className="p-6">
            <h3 className={`mb-4 text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Contents
            </h3>
            <nav className="space-y-1">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    activeSection === s.id
                      ? isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
                      : isDarkMode ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <FileText className="size-4 flex-shrink-0" />
                  <span className={`text-xs flex-shrink-0 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{s.number}.</span>
                  <span className="truncate">{s.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="md:ml-64 flex-1 px-4 md:px-12 pt-28 md:pt-12 pb-24 overflow-x-hidden">
          <div className="max-w-4xl w-full">
            {/* Page Header */}
            <div className="mb-12">
              <h1 className={`text-4xl font-bold md:text-5xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Terms of Service</h1>
              <div className="mt-4 h-1 w-16 rounded bg-[#c5e063]" />
            </div>

            {/* Sections */}
            <div className="space-y-16">
              {sections.map((s) => (
                <section
                  key={s.id}
                  id={s.id}
                  className={`scroll-mt-24 border-b pb-16 last:border-0 ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}
                >
                  <h2 className={`mb-4 text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <span className="mr-2 text-[#c5e063]">{s.number}.</span>
                    {s.title}
                  </h2>
                  <div className={`space-y-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {s.content}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </main>
      </div>

    </div>
  );
}
