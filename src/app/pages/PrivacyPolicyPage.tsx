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

export default function PrivacyPolicyPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('who-we-are');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const sections: Section[] = [
    {
      id: 'who-we-are',
      number: '1',
      title: 'Who We Are',
      content: (
        <>
          <p>Kotulapay ("Kotulapay," "we," "us," or "our") provides digital payment processing, settlement, and related financial technology services through our website at www.kotulapay.com and our associated platforms, APIs, dashboards, and mobile applications (collectively, the "Services"). This Privacy Policy describes how we collect, use, share, and protect information when you visit our website, sign up as a merchant or partner, or otherwise interact with our Services.</p>
          <p>By using our Services, you agree to the practices described in this Policy. If you do not agree, please do not use our website or Services. We may update this Policy from time to time; the "Last Updated" date above reflects the most recent revision. Continued use of our Services after changes take effect constitutes acceptance of the revised Policy.</p>
        </>
      ),
    },
    {
      id: 'information-we-collect',
      number: '2',
      title: 'Information We Collect',
      content: null,
    },
    {
      id: 'how-we-use',
      number: '3',
      title: 'How We Use Your Information',
      content: (
        <>
          <p>We use the information we collect to:</p>
          <ul className="mt-3 space-y-2 list-none">
            {[
              'Onboard and verify merchants and partners, including KYC/KYB and sanctions screening',
              'Process payments, settlements, payouts, and refunds',
              'Reconcile transactions and generate settlement reports',
              'Detect, investigate, and prevent fraud, money laundering, and other financial crime',
              'Maintain the security and integrity of our platform and infrastructure',
              'Provide customer and technical support',
              'Communicate with you about your account, transactions, or changes to our Services',
              'Comply with legal, regulatory, and contractual obligations, including reporting to financial regulators or central banks where required',
              'Improve our website, products, and Services through analytics and testing',
              'Send you service updates, and, where you have opted in, marketing communications about new features or products',
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-[#c5e063] flex-shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-medium">We do not sell your personal information to third parties.</p>
        </>
      ),
    },
    {
      id: 'legal-basis',
      number: '4',
      title: 'Legal Basis for Processing',
      content: (
        <p>Where applicable data protection law requires it, we process your information based on one or more of the following: your consent, the necessity of processing to perform a contract with you (such as our merchant agreement), compliance with a legal obligation (such as AML/KYC regulations), or our legitimate business interests (such as fraud prevention and service improvement), balanced against your rights.</p>
      ),
    },
    {
      id: 'how-we-share',
      number: '5',
      title: 'How We Share Information',
      content: null,
    },
    {
      id: 'international-transfers',
      number: '6',
      title: 'International Data Transfers',
      content: (
        <p>As a payments provider operating across borders, your information may be transferred to, stored, and processed in countries other than your own, including jurisdictions where our infrastructure or banking partners are located. Where required, we apply appropriate safeguards (such as standard contractual clauses or equivalent mechanisms) for such transfers.</p>
      ),
    },
    {
      id: 'cookies',
      number: '7',
      title: 'Cookies and Tracking Technologies',
      content: (
        <p>We use cookies and similar technologies to operate our website, remember preferences, understand how visitors use our site, and, where applicable, support marketing efforts. You can control cookies through your browser settings; disabling certain cookies may limit some website functionality. We do not currently respond to browser "Do Not Track" signals, as no common industry standard yet exists for interpreting them.</p>
      ),
    },
    {
      id: 'data-security',
      number: '8',
      title: 'Data Security',
      content: (
        <>
          <p>We apply administrative, technical, and physical safeguards designed to protect your information, including encryption in transit, access controls, and monitoring of our systems, aligned with PCI-DSS requirements applicable to payment data. However, no system is completely secure, and we cannot guarantee absolute protection against unauthorized access, loss, or misuse.</p>
          <p>If you believe your account or data has been compromised, please contact us immediately at <a href="mailto:security@kotulapay.com" className="text-[#c5e063] hover:underline">security@kotulapay.com</a>.</p>
        </>
      ),
    },
    {
      id: 'data-retention',
      number: '9',
      title: 'Data Retention',
      content: (
        <p>We retain personal and transaction information for as long as necessary to provide our Services, comply with legal and regulatory obligations (including financial record-keeping requirements, which may require retention for several years after account closure), resolve disputes, and enforce our agreements. When information is no longer needed, we take reasonable steps to securely delete or anonymize it.</p>
      ),
    },
    {
      id: 'your-rights',
      number: '10',
      title: 'Your Rights and Choices',
      content: (
        <>
          <p>Depending on your location and applicable law, you may have the right to:</p>
          <ul className="mt-3 space-y-2 list-none">
            {[
              'Access the personal information we hold about you',
              'Request correction of inaccurate information',
              'Request deletion of your information, subject to our legal and regulatory retention obligations',
              'Object to or restrict certain processing',
              'Withdraw consent, where processing is based on consent',
              'Request a copy of your data in a portable format',
              'Opt out of marketing communications at any time via the unsubscribe link in our emails or by contacting us directly',
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-[#c5e063] flex-shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4">To exercise any of these rights, contact us using the details in Section 13. We may need to verify your identity before processing certain requests.</p>
        </>
      ),
    },
    {
      id: 'childrens-privacy',
      number: '11',
      title: "Children's Privacy",
      content: (
        <p>Our Services are intended for businesses and individuals who are at least 18 years old. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected such information, we will take steps to delete it.</p>
      ),
    },
    {
      id: 'third-party-links',
      number: '12',
      title: 'Third-Party Links',
      content: (
        <p>Our website or platform may contain links to third-party websites or services not operated by Kotulapay. We are not responsible for the privacy practices of those third parties, and we encourage you to review their privacy policies separately.</p>
      ),
    },
    {
      id: 'contact-us',
      number: '13',
      title: 'Contact Us',
      content: (
        <>
          <p>If you have questions, concerns, or requests regarding this Privacy Policy or how we handle your information, please contact us at:</p>
          <div className="mt-4 space-y-1">
            <p><strong>Email (General / Privacy):</strong> <a href="mailto:info@kotulapay.com" className="text-[#c5e063] hover:underline">info@kotulapay.com</a></p>
            <p><strong>Address:</strong> Haven Court, 2nd Floor, B6 Waiyaki Way, Nairobi</p>
          </div>
        </>
      ),
    },
    {
      id: 'changes',
      number: '14',
      title: 'Changes to This Policy',
      content: (
        <p>We may revise this Privacy Policy periodically to reflect changes in our practices, technology, legal requirements, or other factors. We will update the "Last Updated" date at the top of this Policy when changes are made, and, where changes are material, we will provide additional notice as required by law.</p>
      ),
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
            <div className="mb-12">
              <h1 className={`text-4xl font-bold md:text-5xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Privacy Policy</h1>
              <div className="mt-4 h-1 w-16 rounded bg-[#c5e063]" />
              <p className={`mt-4 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Last Updated: June 2025</p>
            </div>

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
                    {s.id === 'information-we-collect' ? (
                      <InformationWeCollect isDark={isDarkMode} />
                    ) : s.id === 'how-we-share' ? (
                      <HowWeShare isDark={isDarkMode} />
                    ) : (
                      s.content
                    )}
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

function SubSection({ num, title, body, isDark }: { num: string; title: string; body: string; isDark: boolean }) {
  return (
    <div className="mt-6">
      <h3 className={`mb-2 text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
        <span className="mr-1.5 text-[#c5e063]">{num}</span>{title}
      </h3>
      <p>{body}</p>
    </div>
  );
}

function InformationWeCollect({ isDark }: { isDark: boolean }) {
  return (
    <>
      <p>We collect different categories of information depending on how you interact with us as a website visitor, a merchant/partner applying for or using our payment services, or an end customer transacting through a Kotulapay-powered checkout.</p>
      <SubSection isDark={isDark} num="2.1" title="Identity and Contact Information" body="Name, business name, email address, phone number, physical/registered address, job title, and government-issued identification details submitted during merchant onboarding, KYC (Know Your Customer), or KYB (Know Your Business) verification." />
      <SubSection isDark={isDark} num="2.2" title="Financial and Transaction Information" body="Bank account details, settlement account information, transaction amounts, currency, payment method identifiers (such as masked card numbers), payout history, and reconciliation records. Full card numbers and sensitive cardholder data are handled in accordance with PCI-DSS standards and, where possible, tokenized or processed by our certified payment partners rather than stored directly by us." />
      <SubSection isDark={isDark} num="2.3" title="Compliance and Verification Data" body="Documents and information required for anti-money laundering (AML), sanctions screening, and regulatory due diligence, including business registration certificates, proof of address, beneficial ownership information, and identity documents." />
      <SubSection isDark={isDark} num="2.4" title="Technical and Usage Data" body="IP address, browser type, device identifiers, operating system, referring/exit pages, timestamps, API request logs, and general usage patterns collected automatically when you use our website, dashboard, or API." />
      <SubSection isDark={isDark} num="2.5" title="Communications" body="Records of correspondence with our support, finance, or settlement teams, including emails, chat transcripts, and support tickets." />
      <SubSection isDark={isDark} num="2.6" title="Cookies and Similar Technologies" body="Information collected via cookies, pixels, and analytics tools to understand site usage and improve performance (see Section 7)." />
      <p className="mt-6">We do not knowingly collect sensitive personal data (such as health or biometric information) unless specifically required for identity verification and permitted by applicable law.</p>
    </>
  );
}

function HowWeShare({ isDark }: { isDark: boolean }) {
  return (
    <>
      <p>We disclose information only where necessary and with appropriate safeguards:</p>
      <SubSection isDark={isDark} num="5.1" title="Payment and Banking Partners" body="Acquiring banks, card networks, payment processors, and settlement banks involved in completing your transactions." />
      <SubSection isDark={isDark} num="5.2" title="Regulatory and Law Enforcement Bodies" body="Financial regulators, tax authorities, central banks, or law enforcement, where required by law, court order, or to investigate suspected fraud or financial crime." />
      <SubSection isDark={isDark} num="5.3" title="Service Providers" body="Vendors who support our operations, such as cloud hosting, identity verification, fraud screening, analytics, and customer support tooling, under confidentiality and data protection agreements." />
      <SubSection isDark={isDark} num="5.4" title="Professional Advisors" body="Auditors, legal counsel, and compliance consultants, as needed." />
      <SubSection isDark={isDark} num="5.5" title="Corporate Transactions" body="In the event of a merger, acquisition, financing, or sale of assets, your information may be transferred as part of that transaction, subject to confidentiality commitments." />
      <SubSection isDark={isDark} num="5.6" title="With Your Consent" body="Any other sharing not described above will only occur with your consent or as otherwise permitted by law." />
      <p className="mt-6">We require third parties who process data on our behalf to maintain confidentiality and security standards consistent with this Policy and applicable law.</p>
    </>
  );
}
