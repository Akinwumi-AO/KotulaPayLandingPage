import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import h2hFlowImage from '../../imports/image-5.png';
import h2hDiagramImage from '../../imports/image-6.png';
import p2pFlowImage from '../../imports/image-7.png';
import p2pDiagramImage from '../../imports/image-8.png';
import { FileText, ChevronDown, Info, Menu, X } from 'lucide-react';
import { DocsHeader } from '../components/docs/DocsHeader';
import { CodeBlock } from '../components/docs/CodeBlock';
import { ParamsTable } from '../components/docs/ParamsTable';

interface SubMenuItem {
  id: string;
  label: string;
}

interface Section {
  id: string;
  label: string;
  subItems?: SubMenuItem[];
}

const sections: Section[] = [
    {
      id: 'introduction',
      label: 'Introduction',
      subItems: [
        { id: 'introduction-environments', label: 'Environments' },
        { id: 'introduction-authentication', label: 'Authentication' },
      ],
    },
    {
      id: 'payments',
      label: 'Payments',
      subItems: [
        { id: 'payments-create', label: 'Create' },
        { id: 'payments-providers', label: 'Payments Providers' },
        { id: 'payments-list', label: 'List' },
        { id: 'payments-get', label: 'Get' },
        { id: 'payments-confirm-two-step', label: 'Confirm Two-Step' },
        { id: 'payments-decline-two-step', label: 'Decline Two-Step' },
        { id: 'payments-get-order', label: 'Get/Order' },
        { id: 'payments-otp', label: 'Otp' },
        { id: 'payments-otp-resend', label: 'Otp resend' },
      ],
    },
    {
      id: 'refund',
      label: 'Refund',
      subItems: [
        { id: 'refund-create', label: 'Create refund' },
      ],
    },
    {
      id: 'payouts',
      label: 'Payouts',
      subItems: [
        { id: 'payouts-make', label: 'Make a payout' },
        { id: 'payouts-providers', label: 'Providers' },
      ],
    },
    {
      id: 'p2p',
      label: 'P2P',
      subItems: [
        { id: 'p2p-payment', label: 'Payment' },
        { id: 'p2p-payout-card', label: 'Payout Card' },
        { id: 'p2p-payout-sbp', label: 'Payout SBP' },
        { id: 'p2p-payout-account', label: 'Payout Account' },
      ],
    },
    {
      id: 'balance',
      label: 'Balance',
      subItems: [
        { id: 'balance-receive', label: 'Receive Balance' },
      ],
    },
    {
      id: 'disputes',
      label: 'Disputes',
      subItems: [
        { id: 'disputes-list', label: 'Dispute list' },
        { id: 'disputes-create', label: 'Create a dispute' },
      ],
    },
    {
      id: 'notification',
      label: 'Notification',
      subItems: [
        { id: 'notification-banking', label: 'Banking notification' },
      ],
    },
    {
      id: 'dictionaries',
      label: 'Dictionaries',
      subItems: [
        { id: 'dictionaries-errors', label: 'Errors' },
        { id: 'dictionaries-payment-states', label: 'Payment states' },
        { id: 'dictionaries-kinds-of-errors', label: 'Kinds of errors' },
        { id: 'dictionaries-codes-of-errors', label: 'Codes of errors' },
      ],
    },
    {
      id: 'operators',
      label: 'Operators',
      subItems: [
        { id: 'operators-operator', label: 'Operator' },
      ],
    },
    {
      id: 'gateway-connect',
      label: 'Gateway.Connect',
      subItems: [
        { id: 'gateway-connect-h2h-flow', label: 'H2H: Flow of Payments' },
        { id: 'gateway-connect-h2h-diagram', label: 'H2H: Diagram of Payment Flow' },
        { id: 'gateway-connect-h2h-endpoints', label: 'H2H: Required Endpoints' },
        { id: 'gateway-connect-h2h-payment', label: 'H2H: Payment' },
        { id: 'gateway-connect-h2h-payout', label: 'H2H: Payout' },
        { id: 'gateway-connect-p2p-flow', label: 'P2P: Flow of Payments' },
        { id: 'gateway-connect-p2p-diagram', label: 'P2P: Diagram of Payment Flow' },
        { id: 'gateway-connect-p2p-endpoints', label: 'P2P: Required Endpoints' },
        { id: 'gateway-connect-p2p-payment', label: 'P2P: Payment' },
        { id: 'gateway-connect-callbacks', label: 'Callbacks' },
        { id: 'gateway-connect-status', label: 'Status' },
      ],
    },
  ];

export default function DocumentationPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('introduction');
  const [selectedLanguage, setSelectedLanguage] = useState('cURL');
  const [expandedSection, setExpandedSection] = useState<string>('introduction');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const handleLanguageChange = (language: string) => setSelectedLanguage(language);

  useEffect(() => {
    const allIds: string[] = [];
    sections.forEach(s => {
      allIds.push(s.id);
      s.subItems?.forEach(sub => allIds.push(sub.id));
    });

    // Track which sections are currently intersecting
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

        // Pick the visible element closest to the top of the viewport
        let topId = '';
        let topY = Infinity;
        visible.forEach((y, id) => {
          if (y < topY) { topY = y; topId = id; }
        });

        if (topId) {
          setActiveSection(topId);
          const parent = sections.find(
            s => s.id === topId || s.subItems?.some(sub => sub.id === topId)
          );
          if (parent) setExpandedSection(parent.id);
        }
      },
      { rootMargin: '-10% 0px -60% 0px', threshold: 0 }
    );

    allIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    const parentSection = sections.find(
      s => s.id === id || s.subItems?.some(sub => sub.id === id)
    );
    if (parentSection) setExpandedSection(parentSection.id);
    setActiveSection(id);
  };

  const toggleSection = (id: string) => {
    setExpandedSection(id);
    scrollToSection(id);
  };

  const activeSectionLabel = (() => {
    for (const s of sections) {
      if (s.id === activeSection) return s.label;
      const sub = s.subItems?.find(sub => sub.id === activeSection);
      if (sub) return sub.label;
    }
    return '';
  })();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`min-h-screen overflow-x-hidden ${isDarkMode ? 'bg-[#0d1117]' : 'bg-white'}`}>
      <DocsHeader
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
      />

      {/* Mobile/Tablet Fixed Section Nav */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-16 left-0 right-0 z-40 border-b md:hidden ${
          isDarkMode ? 'border-gray-800 bg-[#0d1117]' : 'border-gray-200 bg-white'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {activeSectionLabel}
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-colors ${
              isDarkMode
                ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
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
              className={`overflow-y-auto border-t max-h-[60vh] ${
                isDarkMode ? 'border-gray-800' : 'border-gray-100'
              }`}
            >
              <nav className="px-4 py-2">
                {sections.map((section) => (
                  <div key={section.id}>
                    <button
                      onClick={() => { toggleSection(section.id); setIsMobileMenuOpen(false); }}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors ${
                        activeSection === section.id || section.subItems?.some(s => s.id === activeSection)
                          ? isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
                          : isDarkMode ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="size-4 flex-shrink-0" />
                        {section.label}
                      </span>
                      {section.subItems && <ChevronDown className={`size-4 flex-shrink-0 transition-transform ${expandedSection === section.id ? 'rotate-180' : ''}`} />}
                    </button>
                    {section.subItems && expandedSection === section.id && (
                      <div className={`ml-6 mt-1 space-y-1 border-l pl-3 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        {section.subItems.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={() => { scrollToSection(subItem.id); setIsMobileMenuOpen(false); }}
                            className={`block w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
                              activeSection === subItem.id
                                ? isDarkMode ? 'text-[#c5e063]' : 'text-[#04403a] font-medium'
                                : isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex pt-16 overflow-x-hidden">
        {/* Desktop Left Sidebar */}
        <aside className={`hidden md:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 overflow-y-auto border-r ${
          isDarkMode ? 'border-gray-800 bg-[#0d1117]' : 'border-gray-200 bg-white'
        }`}>
          <div className="p-6">
            <h3 className={`mb-4 text-xs font-semibold uppercase tracking-wider ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Guides
            </h3>
            <nav className="space-y-1">
              {sections.map((section) => (
                <div key={section.id}>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors ${
                      activeSection === section.id || section.subItems?.some(s => s.id === activeSection)
                        ? isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
                        : isDarkMode ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="size-4 flex-shrink-0" />
                      {section.label}
                    </span>
                    {section.subItems && section.subItems.length > 0 && (
                      <ChevronDown className={`size-4 flex-shrink-0 transition-transform ${expandedSection === section.id ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                  {section.subItems && expandedSection === section.id && (
                    <div className="ml-6 mt-1 space-y-1 border-l border-gray-700 pl-3">
                      {section.subItems.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => scrollToSection(subItem.id)}
                          className={`block w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
                            activeSection === subItem.id
                              ? isDarkMode ? 'text-[#c5e063]' : 'text-[#04403a] font-medium'
                              : isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="md:ml-64 flex-1 px-4 md:px-12 py-12 overflow-x-hidden pt-28 md:pt-12">
          <div className="max-w-4xl w-full">
            {/* Introduction */}
            <section id="introduction" className="scroll-mt-24">
              <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Introduction
              </h1>
              <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Kotulapay is a simple, fast and reliable payment engine with open architecture. Founded back in 2018 now it is supported and constantly developing by the community of software engineers with bold background in payment and e-wallet systems.
              </p>
              <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Kotulapay Business API - a solution specifically designed for internet businesses in need of multicurrency payment processing. We support all major currencies.
              </p>

              {/* Environments */}
              <div id="introduction-environments" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Environments
                </h2>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  There are two environments available for integration:
                </p>
                <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <strong className={isDarkMode ? 'text-white' : 'text-gray-900'}>Production environment:</strong>{' '}
                  <code className={`px-2 py-1 rounded text-sm ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>
                    https://business.kotulapay.com
                  </code>
                </p>

                {/* Sandbox Environment */}
                <h3 className={`text-2xl font-bold mb-3 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Sandbox Environment
                </h3>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Sandbox provides full functionality but it only emulates processing, no actual bank transactions are made. You can use the following PAN for tests:
                </p>
                <ul className={`mb-4 space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      <code className={`px-2 py-1 rounded text-sm mr-2 ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>
                        4617611794313933
                      </code>
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>: CONFIRMED as 3-D Secure transaction</span>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      <code className={`px-2 py-1 rounded text-sm mr-2 ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>
                        4626233193837898
                      </code>
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>: DECLINED as 3-D Secure transaction</span>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      <code className={`px-2 py-1 rounded text-sm mr-2 ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>
                        4392963203551251
                      </code>
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>: CONFIRMED as non 3-D Secure transaction</span>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      <code className={`px-2 py-1 rounded text-sm mr-2 ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>
                        4730198364688516
                      </code>
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>: DECLINED as non 3-D Secure transaction</span>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      <code className={`px-2 py-1 rounded text-sm mr-2 ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>
                        4627342642639018
                      </code>
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>: APPROVED PAYOUT</span>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      <code className={`px-2 py-1 rounded text-sm mr-2 ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>
                        4968357931420422
                      </code>
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>: DECLINED PAYOUT</span>
                    </span>
                  </li>
                </ul>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  You can use any cardholder name, expiry date and CVV2/CVC2 with these PANs. 3-D Secure is also emulated with a page that doesn't require any password but only shows you 2 buttons. One button is for successful authentication, another is for failed authentication. Note, that when you chose to fail authentication, order is always declined, no matter what PAN was used.
                </p>
                <div className={`px-4 py-3 rounded-lg mb-6 ${isDarkMode ? 'bg-yellow-900/20 border border-yellow-700/30' : 'bg-yellow-50 border border-yellow-200'}`}>
                  <p className={`text-sm flex items-start gap-2 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                    <Info className="size-5 flex-shrink-0 mt-0.5" />
                    <strong>Don't use real cards on Sandbox environment.</strong>
                  </p>
                </div>

                {/* Production Environment */}
                <h3 className={`text-2xl font-bold mb-3 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Production Environment
                </h3>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Once you complete integration with Sandbox environment you will be provided with Production credentials. These are completely different credentials, not related with the ones on Sandbox. Production always makes real bank transactions, cards from Sandbox are not supported on this environment.
                </p>
              </div>

              {/* Authentication */}
              <div id="introduction-authentication" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Authentication
                </h2>
                
                <CodeBlock
                  code={
                    selectedLanguage === 'cURL'
                      ? `curl https://business.kotulapay.com/api/v1/payments \\
   -H "Authorization: Bearer merchant_private_key"`
                      : selectedLanguage === 'Python'
                      ? `import http.client

conn = http.client.HTTPSConnection("...")

headers = {
    'authorization': "Bearer merchant_private_key",
    }`
                      : selectedLanguage === 'PHP'
                      ? `<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_HTTPHEADER => array(
    "authorization: Bearer merchant_private_key",
  ),
));`
                      : `OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("https://business.kotulapay.com/api/v1/payouts")
...
  .addHeader("content-type", "application/json")
  .addHeader("authorization", "Bearer merchant_private_key")
  .build();

Response response = client.newCall(request).execute();`
                  }
                  language={selectedLanguage}
                  isDarkMode={isDarkMode}
                />

                <p className={`mt-6 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Authenticate your account when using the API, by including your secret API key which has been sent via email during registration. Management of your API keys can be done within the Backoffice. Your API keys carry importance and privileges, be sure to store them securely. Please do not share your secret API keys in publicly accessible areas such GitHub and client-side code areas.
                </p>
                
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Authentication to the API is performed via bearer auth keys (for cross-origin requests), use{' '}
                  <code className={`px-2 py-1 rounded text-sm ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>
                    -H "Authorization: Bearer merchant_private_key"
                  </code>.
                </p>

                <div className={`px-4 py-3 rounded-lg mb-6 ${isDarkMode ? 'bg-red-900/20 border border-red-700/30' : 'bg-red-50 border border-red-200'}`}>
                  <p className={`text-sm ${isDarkMode ? 'text-red-300' : 'text-red-800'}`}>
                    All API requests must be made through <strong>HTTPS</strong>. Calls made through plain HTTP will fail. API requests without authentication will also fail.
                  </p>
                </div>
              </div>

              {/* Section Divider */}
              <div className="mt-16 mb-8">
                <hr className={`border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`} />
              </div>
            </section>

            {/* Payments Section */}
            <section id="payments" className="scroll-mt-24">
              <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Payments
              </h1>
              <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Kotulapay payment processing REST API.
              </p>

              {/* Create */}
              <div id="payments-create" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Create
                </h2>
                
                <CodeBlock
                  code={
                    selectedLanguage === 'cURL'
                      ? `curl "https://business.kotulapay.com/api/v1/payments" \\
    -X POST \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json" -d '{
        "product" : "Your Product",
        "amount" : "1000",
        "currency" : "CNY",
        "redirectSuccessUrl" : "https://your-site.com/success",
        "redirectFailUrl" : "https://your-site.com/fail",
        "extraReturnParam" : "your order id or other info",
        "pendingUrl" : "https://your-site.com/pending",\`
        "expires_at": 5,
        "orderNumber" : "your order number",
        "locale": "zh"

    }'`
                      : selectedLanguage === 'Python'
                      ? `from django.http import HttpResponseRedirect, HttpResponse
import requests
import json

def pay(request) :

    MERCHANT_PRIVATE_KEY = 'merchant_private_key'
    LIVE_URL = 'https://business.kotulapay.com';
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "product" : request.POST['product_name'],
        "amount" : request.POST['order_amount'],
        "currency" : "CNY",
        "redirectSuccessUrl": request.POST['notify_url'],
        "redirectFailUrl" : request.POST['return_url'],
        "extraReturnParam" : request.POST['order_no'],
        "orderNumber" : request.POST['order_number'],
        "locale" : request.POST['locale']
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }

    resp = requests.post('%s/api/v1/payments' % (SANDBOX_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_payload = json.loads(resp.text)
        return HttpResponseRedirect(resp_payload['processingUrl'])
    else:
        return HttpResponse('<html><body><span>Something gone wrong: %s</span></body></html>' % (resp.status_code))`
                      : selectedLanguage === 'PHP'
                      ? `<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://business.kotulapay.com/api/v1/payments",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{ \\"product\\" : \\"Your Product\\", \\"amount\\" : \\"10000\\", \\"currency\\" : \\"CNY\\", \\"redirectSuccessUrl\\" : \\"https://your-site.com/success\\", \\"redirectFailUrl\\" : \\"https://your-site.com/fail\\", \\"extraReturnParam\\" : \\"your order id or other info\\", \\"orderNumber\\" : \\"your order number\\", \\"locale\\" : \\"zh\\"\\n}",
  CURLOPT_HTTPHEADER => array(
    "authorization: Bearer merchant_private_key",
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`
                      : `MediaType JSON = MediaType.parse("application/json; charset=utf-8");

HashMap<String, Object> params = new HashMap<String, Object>();

params.put("product", "Kotulapay Example Payment");
params.put("amount", "1000");
params.put("currency", "EUR");
params.put("redirectSuccessUrl", "[sucess redirect url]");
params.put("redirectFailUrl", "[fail redirect url]");
params.put("orderNumber", "[merchat system order number]");
params.put("extraReturnParam", "[some additional params]");
params.put("locale", "[user locale]");
OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
       .url("https://business.kotulapay.com/api/v1/payments")
       .post(RequestBody.create(JSON, new Gson().toJson(params)))
       .addHeader("content-type", "application/json")
       .addHeader("authorization", "Bearer merchant_private_key")
       .build();

Call call = client.newCall(request);

call.enqueue(new Callback() {

   @Override
   public void onFailure(Call call, IOException e) {
       Log.e("response ", "onFailure(): " + e.getMessage() );
   }

   @Override
   public void onResponse(Call call, Response response) throws IOException {
       String resp = response.body().string();
       Log.e("response ", "onResponse(): " + resp );
   }
});`
                  }
                  language={selectedLanguage}
                  isDarkMode={isDarkMode}
                />

                <p className={`mt-6 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Return status 200 and JSON:
                </p>

                <CodeBlock
                  code={`{
  "success": true | false,
  "errors": [],
  "token": "[payment token]",
  "processingUrl": "https://business.kotulapay.com/p/[payment token]",
  "payment": {
    "amount": "10020",
    "currency": "CNY",
    "status": "init"
  },
  "redirectRequest": {
    "url": "[redirect url, for example ACS URL for 3ds]",
    "params": {
      "PaReq": "[PaReq for current payment]",
      "TermUrl": "https://business.kotulapay.com/checkout_results/[payment token]/callback_3ds"
    },
    "type": "post"
  }
}`}
                  language={selectedLanguage}
                  isDarkMode={isDarkMode}
                />

                <p className={`mt-6 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Initialize payments - to begin receiving payments, you must first call using the following script. This will enable you to obtain a payment token, which will be required later to complete API integration.
                </p>

                <p className={`mt-6 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <strong className={isDarkMode ? 'text-white' : 'text-gray-900'}>HTTP Request via SSL</strong>
                </p>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <code className={`px-2 py-1 rounded text-sm ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>
                    POST '/api/v1/payments'
                  </code>
                </p>

                <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Query Parameters
                </h3>
                
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description', 'Validation']}
                  rows={[
                    ['product', 'yes', "Product name (Service description) (example: 'iPhone').", 'minLength: 5, maxLength: 255'],
                    ['amount', 'yes', 'Payment amount in cents (10020), except JPY', 'minLength: 1, maxLength: 32'],
                    ['currency', 'yes', 'Currency code (CNY, EUR, USD, JPY).', 'minLength: 3, maxLength: 3'],
                    ['callbackUrl', 'yes', 'The server URL a merchant will be notified about a payment finalisation', 'Valid URI format'],
                    ['redirectSuccessUrl', 'no', 'The URL a customer will be redirected to in the case of successfull payment', 'Valid URI format'],
                    ['redirectFailUrl', 'no', 'The URL a customer will be redirected to in the case of payment error or failure', 'Valid URI format'],
                    ['pendingUrl', 'no', 'The URL a customer will be redirected to the specific page in the case of pending payment instead built-in checkout_resault_page', 'Valid URI format'],
                    ['extraReturnParam', 'no', 'Bank/Payment method list, description, etc', 'minLength: 1, maxLength: 1024'],
                    ['expires_at', 'no', 'Expired payment time for requests without a bank card', 'minLength: 1'],
                    ['orderNumber', 'no', 'The current order number from a company system.', 'minLength: 3, maxLength: 255 (string)'],
                    ['locale', 'no', 'The locale is used on a payment page by default. Currently supported locales: en, zh and jp from ISO 639-1.', 'minLength: 2, maxLength: 5 (string)'],
                    ['walletToken', 'no', "Set this parameter when making recurring payment from a customer's wallet. A customer will receive notification and has to confirm the payment.", 'returns by API for recurring payments only'],
                    ['recurring', 'no', 'Set this parameter to true when initializing recurring payment.', 'boolean'],
                    ['recurringToken', 'no', 'Set this parameter when making recurring payment previously initialized with recurring param.', 'returns by API for recurring payments only'],
                    ['needConfirmation', 'no', 'Set this parameter whe making payment in two steps (preAuth and confirm/decline)', ''],
                    ['card', 'no', 'Card object for Host2Host payments.', ''],
                    ['customer', 'no', 'Customer object for Host2Host payments.', ''],
                    ['recurring_data', 'no', 'Recurring data object for Host2Host payments.', ''],
                    ['merchantUrl', 'no', 'Param to control traffic from aggregators', ''],
                  ]}
                />

                <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Card Object Parameters
                </h3>
                
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description', 'Validation']}
                  rows={[
                    ['pan', 'yes', "Customer's card number (PAN). Any valid card number, may contain spaces", 'Valid card number (16-19 digits)'],
                    ['expires', 'yes', "Customer's card expiration date. Format: mm/yyyy", 'mm/yyyy format'],
                    ['holder', 'yes', "Customer's cardholder name. Any valid cardholder name", 'minLength: 5, maxLength: 50'],
                    ['cvv', 'yes', "Customer's CVV2 / CVC2 / CAV2", 'minLength: 3, maxLength: 3 Only digits (\\d+)'],
                  ]}
                />

                <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Customer Object Parameters (optional)
                </h3>
                
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description', 'Validation']}
                  rows={[
                    ['email', 'yes', "Customer's email, is mandatory if Customer object posted on a request", 'Valid email format'],
                    ['address', 'no', "Customer's billing address", 'minLength: 5, maxLength: 55'],
                    ['country', 'no', "Customer's billing country", 'ISO country code format "GB"'],
                    ['city', 'no', "Customer's billing city", 'minLength: 4, maxLength: 55'],
                    ['region', 'no', "Customer's billing region", 'minLength: 5, maxLength: 55'],
                    ['postcode', 'no', "Customer's billing ZipCode", 'minLength: 4, maxLength: 55'],
                    ['phone', 'no', "Customer's billing phone number", 'minLength: 6, maxLength: 20'],
                    ['ip', 'no', 'Customer IP address', 'Valid IP address format (XX.XX.XX.XX)'],
                    ['browser', 'no', 'Customer browser object for 3ds2 payments.', ''],
                  ]}
                />

                <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Customer browser object for 3ds2 payments (optional)
                </h3>
                
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description', 'Example']}
                  rows={[
                    ['accept_header', 'no', "Browser's content type", 'text/html'],
                    ['color_depth', 'no', "Browser's color depth value", '32'],
                    ['ip', 'no', "Browser's ip", '177.255.255.35'],
                    ['language', 'no', "Browser's language", 'ru'],
                    ['screen_height', 'no', "Browser's screen height", '1080'],
                    ['screen_width', 'no', "Browser's screen width", '1920'],
                    ['tz', 'no', "Browser's time zone", '180'],
                    ['user_agent', 'no', "Browser's user agent", 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:96.0) Gecko/20100101 Firefox/96.0'],
                    ['java_enabled', 'no', 'Is java enabled', 'true'],
                    ['javascript_enabled', 'no', 'Is javascript enabled', 'true'],
                    ['window_width', 'no', "Browser's window width", '1920'],
                    ['window_height', 'no', "Browser's window height", '1080'],
                  ]}
                />

                <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Recurring data object for payments (optional)
                </h3>
                
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description', 'Validation']}
                  rows={[
                    ['days', 'no', 'Customer days object for payments.', 'Number of days between authorizations from 1'],
                    ['exp_date', 'no', 'Customer exd_date object for payments.', 'Period of validity of periodic payments in format YYYYMMDD'],
                  ]}
                />
              </div>

              {/* Providers */}
              <div id="payments-providers" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Payments Providers
                </h2>

                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <strong className={isDarkMode ? 'text-white' : 'text-gray-900'}>Code:</strong>
                </p>

                {selectedLanguage === 'Java' && (
                  <CodeBlock
                    isDarkMode={isDarkMode}
                    language="java"
                    code={`MediaType JSON = MediaType.parse("application/json; charset=utf-8");

HashMap<String, Object> params = new HashMap<String, Object>();

params.put("product", "Kotulapay Example Payment");
params.put("amount", "1000");
params.put("currency", "EUR");
params.put("redirectSuccessUrl", "[sucess redirect url]");
params.put("redirectFailUrl", "[fail redirect url]");
params.put("orderNumber", "[merchat system order number]");
params.put("extraReturnParam", "[some additional params]");
params.put("locale", "[user locale]");
OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
       .url("https://business.kotulapay.com/api/v1/payments")
       .post(RequestBody.create(JSON, new Gson().toJson(params)))
       .addHeader("content-type", "application/json")
       .addHeader("authorization", "Bearer merchant_private_key")
       .build();

Call call = client.newCall(request);

call.enqueue(new Callback() {

   @Override
   public void onFailure(Call call, IOException e) {
       Log.e("response ", "onFailure(): " + e.getMessage() );
   }

   @Override
   public void onResponse(Call call, Response response) throws IOException {
       String resp = response.body().string();
       Log.e("response ", "onResponse(): " + resp );
   }
});`}
                  />
                )}

                <p className={`mb-4 ${selectedLanguage === 'Java' ? 'mt-6' : ''} ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Return status 200 and JSON:
                </p>

                <CodeBlock
                  isDarkMode={isDarkMode}
                  language="json"
                  code={
                    selectedLanguage === 'cURL'
                      ? `{
  "success": true | false,
  "errors": [],
  "token": "[payment token]",
  "processingUrl": [
        {
            "webmoney": "http://business.kotulapay.com/p/165998589a413b56ae72fbfdc15b016b/webmoney?locale=en"
        },
        {
            "bank_card": "http://business.kotulapay.com/p/165998589a413b56ae72fbfdc15b016b/bank_card?locale=en"
        },
        {
            "qiwi_wallet": "http://business.kotulapay.com/p/165998589a413b56ae72fbfdc15b016b/qiwi_wallet?locale=en"
        },
        {
            "skrill_wallet": "http://business.kotulapay.com/p/165998589a413b56ae72fbfdc15b016b/skrill_wallet?locale=en"
        }
  ],
  "selectorURL": "https://business.kotulapay.com/select/[payment token]/",
  "payment": {
    "amount": "10020",
    "currency": "CNY",
    "status": "init"
  },
  "redirectRequest": {
    "url": "[redirect url, for example ACS URL for 3ds]",
    "params": {
      "PaReq": "[PaReq for current payment]",
      "TermUrl": "https://business.kotulapay.com/checkout_results/[payment token]/callback_3ds"
    },
    "type": "post"
  }
}`
                      : selectedLanguage === 'Python'
                      ? `{
  "success": true | false,
  "errors": [],
  "token": "[payment token]",
  "processingUrl": [
        {
            "webmoney": "http://business.kotulapay.com/p/165998589a413b56ae72fbfdc15b016b/webmoney?locale=en"
        },
        {
            "bank_card": "http://business.kotulapay.com/p/165998589a413b56ae72fbfdc15b016b/bank_card?locale=en"
        },
        {
            "qiwi_wallet": "http://business.kotulapay.com/p/165998589a413b56ae72fbfdc15b016b/qiwi_wallet?locale=en"
        },
        {
            "skrill_wallet": "http://business.kotulapay.com/p/165998589a413b56ae72fbfdc15b016b/skrill_wallet?locale=en"
        }
  ],
  "selectorURL": "https://business.kotulapay.com/select/[payment token]/",
  "payment": {
    "amount": "10020",
    "currency": "CNY",
    "status": "init"
  },
  "redirectRequest": {
    "url": "[redirect url, for example ACS URL for 3ds]",
    "params": {
      "PaReq": "[PaReq for current payment]",
      "TermUrl": "https://business.kotulapay.com/checkout_results/[payment token]/callback_3ds"
    },
    "type": "post"
  }
}`
                      : selectedLanguage === 'PHP'
                      ? `{
  "success": true | false,
  "errors": [],
  "token": "[payment token]",
  "processingUrl": [
        {
            "webmoney": "http://business.kotulapay.com/p/165998589a413b56ae72fbfdc15b016b/webmoney?locale=en"
        },
        {
            "bank_card": "http://business.kotulapay.com/p/165998589a413b56ae72fbfdc15b016b/bank_card?locale=en"
        },
        {
            "qiwi_wallet": "http://business.kotulapay.com/p/165998589a413b56ae72fbfdc15b016b/qiwi_wallet?locale=en"
        },
        {
            "skrill_wallet": "http://business.kotulapay.com/p/165998589a413b56ae72fbfdc15b016b/skrill_wallet?locale=en"
        }
  ],
  "selectorURL": "https://business.kotulapay.com/select/[payment token]/",
  "payment": {
    "amount": "10020",
    "currency": "CNY",
    "status": "init"
  },
  "redirectRequest": {
    "url": "[redirect url, for example ACS URL for 3ds]",
    "params": {
      "PaReq": "[PaReq for current payment]",
      "TermUrl": "https://business.kotulapay.com/checkout_results/[payment token]/callback_3ds"
    },
    "type": "post"
  }
}`
                      : selectedLanguage === 'Java'
                      ? `{
  "success": true | false,
  "errors": [],
  "token": "[payment token]",
  "processingUrl": [
        {
            "webmoney": "http://business.kotulapay.com/p/165998589a413b56ae72fbfdc15b016b/webmoney?locale=en"
        },
        {
            "bank_card": "http://business.kotulapay.com/p/165998589a413b56ae72fbfdc15b016b/bank_card?locale=en"
        },
        {
            "qiwi_wallet": "http://business.kotulapay.com/p/165998589a413b56ae72fbfdc15b016b/qiwi_wallet?locale=en"
        },
        {
            "skrill_wallet": "http://business.kotulapay.com/p/165998589a413b56ae72fbfdc15b016b/skrill_wallet?locale=en"
        }
  ],
  "selectorURL": "https://business.kotulapay.com/select/[payment token]/",
  "payment": {
    "amount": "10020",
    "currency": "CNY",
    "status": "init"
  },
  "redirectRequest": {
    "url": "[redirect url, for example ACS URL for 3ds]",
    "params": {
      "PaReq": "[PaReq for current payment]",
      "TermUrl": "https://business.kotulapay.com/checkout_results/[payment token]/callback_3ds"
    },
    "type": "post"
  }
}`
                      : ''
                  }
                />

                <p className={`mt-4 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  In case multiple payment providers enabled to a merchant account, Create payment reponse JSON will have processingUrl object represented as an array of available payment providers (please refer to JSON response). Use those URLs to redirect your customer to a payment provider (method).
                </p>

                <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  List of payment providers
                </h3>

                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  In case you want a customer to choose a payment provider (method) it might be convenient to use a specific page (widget) with payment provider list, which is availabe by "selectorURL" parameter in JSON response object
                </p>
              </div>

              {/* List */}
              <div id="payments-list" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  List
                </h2>

                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <strong className={isDarkMode ? 'text-white' : 'text-gray-900'}>Code:</strong>
                </p>

                {selectedLanguage === 'cURL' && (
                  <CodeBlock
                    isDarkMode={isDarkMode}
                    language="bash"
                    code={`curl "https://business.kotulapay.com/api/v1/payments?dateFrom=2016-05-11&page=1&perPage=1" \\\\
    -H "Authorization: Bearer merchant_private_key"`}
                  />
                )}

                {selectedLanguage === 'Python' && (
                  <CodeBlock
                    isDarkMode={isDarkMode}
                    language="python"
                    code={``}
                  />
                )}

                {selectedLanguage === 'PHP' && (
                  <CodeBlock
                    isDarkMode={isDarkMode}
                    language="php"
                    code={`<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://business.kotulapay.com/api/v1/payments?dateFrom=2016-05-11&page=1&perPage=1",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
      "authorization: Bearer merchant_private_key"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`}
                  />
                )}

                {selectedLanguage === 'Java' && (
                  <CodeBlock
                    isDarkMode={isDarkMode}
                    language="java"
                    code={`OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("https://business.kotulapay.com/api/v1/payments")
  .get()
  .addHeader("authorization", "Bearer merchant_private_key")
  .build();

Response response = client.newCall(request).execute();`}
                  />
                )}

                <p className={`mb-4 ${(selectedLanguage === 'cURL' || selectedLanguage === 'Python' || selectedLanguage === 'PHP' || selectedLanguage === 'Java') ? 'mt-6' : ''} ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Return status 200 and JSON:
                </p>

                <CodeBlock
                  isDarkMode={isDarkMode}
                  language="json"
                  code={`{
  "success": true | false,
  "errors": [],
  "status": 200,
  "totalCount": 10,
  "curentPage": 1,
  "perPage": 1,
  "totalPage": 10,
  "payments": [
    {
      "id": 1,
      "status": "sent",
      "token": "[payment token]",
      "currency": "CNY",
      "product": "Your Product",
      "redirect_success_url": "https://your-site.com/success",
      "redirect_fail_url": "https://your-site.com/fail",
      "amount": 10000,
      "created_at": "2016-06-27T14:13:00.273Z",
      "updated_at": "2016-06-27T14:15:44.715Z",
      "extra_return_param": "your order id or other info",
      "operation_type": "pay",
      "order_number": 1
    }
  ]
}`}
                />

                <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Payments List - this is the method used to display the list of returned payments.
                </p>

                <p className={`mt-4 mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  HTTP Request via SSL
                </p>
                <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  GET '/api/v1/payments'
                </p>

                <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Query Parameters
                </h3>
                <ParamsTable
                  headers={['Parameter', 'Description', 'Required']}
                  rows={[
                    ['dateFrom', "Date from (example: '2015-01-01')", 'No'],
                    ['dateTo', "Date to (example: '2015-01-02')", 'No'],
                    ['page', 'Page number (default: 1)', 'No'],
                    ['perPage', 'Payment per page (max: 500, default: 20)', 'No'],
                    ['operationType', 'Operation type (Available values: pays, payouts, all)', 'No'],
                    ['orderNumber', "Merchant's order number", 'No'],
                  ]}
                  isDarkMode={isDarkMode}
                />
              </div>

              {/* Get */}
              <div id="payments-get" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Get
                </h2>

                {selectedLanguage === 'cURL' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="bash"
                      code={`curl "https://business.kotulapay.com/api/v1/payments/[payment_token]" \\
    -H "Authorization: Bearer merchant_private_key"`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true | false,
    "errors": [],
    "status": 200,
    "payment": {
      "id": 2599,
      "status": "pending | approved | declined",
      "token": "[payment token]",
      "currency": "[payment currency]",
      "product": "[product description]",
      "callback_url": "[callback/notification url]",
      "redirect_success_url": "success redirection url",
      "redirect_fail_url": "fail redirection url",
      "amount": 0,
      "created_at": "[creation date]",
      "updated_at": "[last status update date]",
      "extra_return_param": "[extra params, can be use to payment identification in merchat system]",
      "operation_type": "pay | payout",
      "order_number": "[merchant's order number]",
      "commission_data": {
                  "commission_value": 0.0,
                  "commission_fee": 0.0,
                  "commission_amount": 0.0
              }
    }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'Python' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="python"
                      code={``}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true | false,
    "errors": [],
    "status": 200,
    "payment": {
      "id": 2599,
      "status": "pending | approved | declined",
      "token": "[payment token]",
      "currency": "[payment currency]",
      "product": "[product description]",
      "callback_url": "[callback/notification url]",
      "redirect_success_url": "success redirection url",
      "redirect_fail_url": "fail redirection url",
      "amount": 0,
      "created_at": "[creation date]",
      "updated_at": "[last status update date]",
      "extra_return_param": "[extra params, can be use to payment identification in merchat system]",
      "operation_type": "pay | payout",
      "order_number": "[merchant's order number]",
      "commission_data": {
                  "commission_value": 0.0,
                  "commission_fee": 0.0,
                  "commission_amount": 0.0
              }
    }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'PHP' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="php"
                      code={``}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true | false,
    "errors": [],
    "status": 200,
    "payment": {
      "id": 2599,
      "status": "pending | approved | declined",
      "token": "[payment token]",
      "currency": "[payment currency]",
      "product": "[product description]",
      "callback_url": "[callback/notification url]",
      "redirect_success_url": "success redirection url",
      "redirect_fail_url": "fail redirection url",
      "amount": 0,
      "created_at": "[creation date]",
      "updated_at": "[last status update date]",
      "extra_return_param": "[extra params, can be use to payment identification in merchat system]",
      "operation_type": "pay | payout",
      "order_number": "[merchant's order number]",
      "commission_data": {
                  "commission_value": 0.0,
                  "commission_fee": 0.0,
                  "commission_amount": 0.0
              }
    }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'Java' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="java"
                      code={``}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true | false,
    "errors": [],
    "status": 200,
    "payment": {
      "id": 2599,
      "status": "pending | approved | declined",
      "token": "[payment token]",
      "currency": "[payment currency]",
      "product": "[product description]",
      "callback_url": "[callback/notification url]",
      "redirect_success_url": "success redirection url",
      "redirect_fail_url": "fail redirection url",
      "amount": 0,
      "created_at": "[creation date]",
      "updated_at": "[last status update date]",
      "extra_return_param": "[extra params, can be use to payment identification in merchat system]",
      "operation_type": "pay | payout",
      "order_number": "[merchant's order number]",
      "commission_data": {
                  "commission_value": 0.0,
                  "commission_fee": 0.0,
                  "commission_amount": 0.0
              }
    }
}`}
                    />
                  </>
                )}

                <p className={`mt-6 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Payment Get - this is the method used to retrieve information about single payment.
                </p>

                <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  HTTP Request via SSL
                </p>
                <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  GET '/api/v1/payments/[payment_token]'
                </p>
              </div>

              {/* Confirm Two-Step */}
              <div id="payments-confirm-two-step" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Confirm Two-Step
                </h2>

                {selectedLanguage === 'cURL' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="bash"
                      code={`curl "https://business.kotulapay.com/api/v1/payments/confirm" \\
    -X POST \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json" -d '{
        "token" : "Your Product"
    }'`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "result": 0,
  "status": 200,
  "payment": {
    "amount": 100,
    "gateway_amount": 100,
    "currency": "USD",
    "status": "approved|declined",
    "two_stage_mode": true
  }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'Python' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="python"
                      code={`from django.http import HttpResponseRedirect, HttpResponse
import requests
import json

def pay(request) :

    MERCHANT_PRIVATE_KEY = 'merchant_private_key'
    LIVE_URL = 'https://business.kotulapay.com';
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "token" : request.POST['token payment']
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }

    resp = requests.post('%s/api/v1/payments/confirm' % (SANDBOX_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_payload = json.loads(resp.text)
        return HttpResponseRedirect(resp_payload['processingUrl'])
    else:
        return HttpResponse('<html><body><span>Something gone wrong: %s</span></body></html>' % (resp.status_code))`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "result": 0,
  "status": 200,
  "payment": {
    "amount": 100,
    "gateway_amount": 100,
    "currency": "USD",
    "status": "approved|declined",
    "two_stage_mode": true
  }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'PHP' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="php"
                      code={`<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://business.kotulapay.com/api/v1/payments/confirm",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{ \\"token\\" : \\"payment token\\"\\n}",
  CURLOPT_HTTPHEADER => array(
    "authorization: Bearer merchant_private_key",
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "result": 0,
  "status": 200,
  "payment": {
    "amount": 100,
    "gateway_amount": 100,
    "currency": "USD",
    "status": "approved|declined",
    "two_stage_mode": true
  }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'Java' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="java"
                      code={`MediaType JSON = MediaType.parse("application/json; charset=utf-8");

HashMap<String, Object> params = new HashMap<String, Object>();

params.put("token", "payment token");
OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
       .url("https://business.kotulapay.com/api/v1/payments/confirm")
       .post(RequestBody.create(JSON, new Gson().toJson(params)))
       .addHeader("content-type", "application/json")
       .addHeader("authorization", "Bearer merchant_private_key")
       .build();

Call call = client.newCall(request);

call.enqueue(new Callback() {

   @Override
   public void onFailure(Call call, IOException e) {
       Log.e("response ", "onFailure(): " + e.getMessage() );
   }

   @Override
   public void onResponse(Call call, Response response) throws IOException {
       String resp = response.body().string();
       Log.e("response ", "onResponse(): " + resp );
   }
});`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "result": 0,
  "status": 200,
  "payment": {
    "amount": 100,
    "gateway_amount": 100,
    "currency": "USD",
    "status": "approved|declined",
    "two_stage_mode": true
  }
}`}
                    />
                  </>
                )}

                <p className={`mt-6 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Confirm Two-Step payment by providing a payment token.
                </p>

                <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  HTTP Request via SSL
                </p>
                <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  POST '/api/v1/payments/confirm'
                </p>

                <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Query Parameters
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description']}
                  rows={[
                    ['token', 'yes', 'Payment token.'],
                  ]}
                />
              </div>

              {/* Decline Two-Step */}
              <div id="payments-decline-two-step" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Decline Two-Step
                </h2>

                {selectedLanguage === 'Python' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="python"
                      code={`from django.http import HttpResponseRedirect, HttpResponse
import requests
import json

def pay(request) :

    MERCHANT_PRIVATE_KEY = 'merchant_private_key'
    LIVE_URL = 'https://business.kotulapay.com';
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "token" : request.POST['token payment']
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }

    resp = requests.post('%s/api/v1/payments/decline' % (SANDBOX_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_payload = json.loads(resp.text)
        return HttpResponseRedirect(resp_payload['processingUrl'])
    else:
        return HttpResponse('<html><body><span>Something gone wrong: %s</span></body></html>' % (resp.status_code))`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "result": 0,
  "status": 200,
  "payment": {
    "amount": 100,
    "gateway_amount": 100,
    "currency": "USD",
    "status": "approved|declined",
    "two_stage_mode": true
  }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'PHP' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="php"
                      code={`<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://business.kotulapay.com/api/v1/payments/decline",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{ \\"token\\" : \\"payment token\\"\\n}",
  CURLOPT_HTTPHEADER => array(
    "authorization: Bearer merchant_private_key",
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "result": 0,
  "status": 200,
  "payment": {
    "amount": 100,
    "gateway_amount": 100,
    "currency": "USD",
    "status": "approved|declined",
    "two_stage_mode": true
  }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'cURL' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="bash"
                      code={`curl "https://business.kotulapay.com/api/v1/payments/decline" \\
    -X POST \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json" -d '{
        "token" : "Your Product"
    }'`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "result": 0,
  "status": 200,
  "payment": {
    "amount": 100,
    "gateway_amount": 100,
    "currency": "USD",
    "status": "approved|declined",
    "two_stage_mode": true
  }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'Java' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="java"
                      code={`MediaType JSON = MediaType.parse("application/json; charset=utf-8");

HashMap<String, Object> params = new HashMap<String, Object>();

params.put("token", "payment token");
OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
       .url("https://business.kotulapay.com/api/v1/payments/decline")
       .post(RequestBody.create(JSON, new Gson().toJson(params)))
       .addHeader("content-type", "application/json")
       .addHeader("authorization", "Bearer merchant_private_key")
       .build();

Call call = client.newCall(request);

call.enqueue(new Callback() {

   @Override
   public void onFailure(Call call, IOException e) {
       Log.e("response ", "onFailure(): " + e.getMessage() );
   }

   @Override
   public void onResponse(Call call, Response response) throws IOException {
       String resp = response.body().string();
       Log.e("response ", "onResponse(): " + resp );
   }
});`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "result": 0,
  "status": 200,
  "payment": {
    "amount": 100,
    "gateway_amount": 100,
    "currency": "USD",
    "status": "approved|declined",
    "two_stage_mode": true
  }
}`}
                    />
                  </>
                )}

                <p className={`mt-6 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Decline Two-Step payment by providing a payment token.
                </p>

                <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  HTTP Request via SSL
                </p>
                <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  POST '/api/v1/payments/decline'
                </p>

                <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Query Parameters
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description']}
                  rows={[
                    ['token', 'yes', 'Payment token.'],
                  ]}
                />
              </div>

              {/* Get/Order */}
              <div id="payments-get-order" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Get/Order
                </h2>

                {selectedLanguage === 'cURL' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="bash"
                      code={`curl "https://business.kotulapay.com/api/v1/payments/order/[order_number]" \\
    -H "Authorization: Bearer merchant_private_key"`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success":  true | false,
    "result": 0,
    "status": 200,
    "totalCount": 1,
    "curentPage": 1,
    "perPage": 100,
    "totalPage": 1,
    "payments": [
        {
            "id": 123,
            "status": "pending | approved | declined | expired",
            "token": "[payment token]",
            "currency": "[payment currency]",
            "product": "[payment currency]",
            "callback_url": "[callback/notification url]",
            "redirect_success_url": "success redirection url",
            "redirect_fail_url": "fail redirection url",
            "amount": 100,
            "created_at": "[creation date]",
            "updated_at": "[last status update date]",
            "extra_return_param": "[extra params, can be use to payment identification in merchant system]",
            "operation_type": "pay | payout",
            "order_number": "[merchant's order number]"
        }
    ]
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'Python' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="python"
                      code={``}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success":  true | false,
    "result": 0,
    "status": 200,
    "totalCount": 1,
    "curentPage": 1,
    "perPage": 100,
    "totalPage": 1,
    "payments": [
        {
            "id": 123,
            "status": "pending | approved | declined | expired",
            "token": "[payment token]",
            "currency": "[payment currency]",
            "product": "[payment currency]",
            "callback_url": "[callback/notification url]",
            "redirect_success_url": "success redirection url",
            "redirect_fail_url": "fail redirection url",
            "amount": 100,
            "created_at": "[creation date]",
            "updated_at": "[last status update date]",
            "extra_return_param": "[extra params, can be use to payment identification in merchant system]",
            "operation_type": "pay | payout",
            "order_number": "[merchant's order number]"
        }
    ]
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'PHP' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="php"
                      code={``}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success":  true | false,
    "result": 0,
    "status": 200,
    "totalCount": 1,
    "curentPage": 1,
    "perPage": 100,
    "totalPage": 1,
    "payments": [
        {
            "id": 123,
            "status": "pending | approved | declined | expired",
            "token": "[payment token]",
            "currency": "[payment currency]",
            "product": "[payment currency]",
            "callback_url": "[callback/notification url]",
            "redirect_success_url": "success redirection url",
            "redirect_fail_url": "fail redirection url",
            "amount": 100,
            "created_at": "[creation date]",
            "updated_at": "[last status update date]",
            "extra_return_param": "[extra params, can be use to payment identification in merchant system]",
            "operation_type": "pay | payout",
            "order_number": "[merchant's order number]"
        }
    ]
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'Java' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="java"
                      code={``}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success":  true | false,
    "result": 0,
    "status": 200,
    "totalCount": 1,
    "curentPage": 1,
    "perPage": 100,
    "totalPage": 1,
    "payments": [
        {
            "id": 123,
            "status": "pending | approved | declined | expired",
            "token": "[payment token]",
            "currency": "[payment currency]",
            "product": "[payment currency]",
            "callback_url": "[callback/notification url]",
            "redirect_success_url": "success redirection url",
            "redirect_fail_url": "fail redirection url",
            "amount": 100,
            "created_at": "[creation date]",
            "updated_at": "[last status update date]",
            "extra_return_param": "[extra params, can be use to payment identification in merchant system]",
            "operation_type": "pay | payout",
            "order_number": "[merchant's order number]"
        }
    ]
}`}
                    />
                  </>
                )}

                <p className={`mt-6 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Payment Get/Order - this is the method used to retrieve information about payments by order_number.
                </p>

                <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  HTTP Request via SSL
                </p>
                <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  GET '/api/v1/payments/order/[order_number]'
                </p>
              </div>

              {/* Otp */}
              <div id="payments-otp" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Otp
                </h2>

                {selectedLanguage === 'Python' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="python"
                      code={``}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true | false,
    "errors": [],
    "status": 200
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'PHP' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="php"
                      code={``}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true | false,
    "errors": [],
    "status": 200
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'Java' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="java"
                      code={``}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true | false,
    "errors": [],
    "status": 200
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'cURL' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="bash"
                      code={`curl "https://business.kotulapay.com/api/v1/otp" \\
    -X POST \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json" -d '{
        "token" : "YP741BPPRuDYSAPJG6ErFyoofWYReZWA",
        "otp" : "443443",
    }'`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true | false,
    "errors": [],
    "status": 200
}`}
                    />
                  </>
                )}

                <p className={`mt-6 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Otp - this is the method used to confirm mobile payment.
                </p>

                <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  HTTP Request via SSL
                </p>
                <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  POST '/api/v1/otp'
                </p>

                <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Query Parameters
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description', 'Validation']}
                  rows={[
                    ['token', 'yes', 'Payment token', ''],
                    ['otp', 'yes', 'Otp code', ''],
                  ]}
                />
              </div>

              {/* Otp resend */}
              <div id="payments-otp-resend" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Otp resend
                </h2>

                {selectedLanguage === 'cURL' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="bash"
                      code={`curl "https://business.kotulapay.com/api/v1/otp-resend?token=YP741BPPRuDYSAPJG6ErFyoofWYReZWA" \\
    -H "Authorization: Bearer merchant_private_key"`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true | false,
    "errors": [],
    "status": 200
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'Python' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="python"
                      code={``}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true | false,
    "errors": [],
    "status": 200
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'PHP' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="php"
                      code={``}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true | false,
    "errors": [],
    "status": 200
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'Java' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="java"
                      code={``}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true | false,
    "errors": [],
    "status": 200
}`}
                    />
                  </>
                )}

                <p className={`mt-6 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Otp resend - this is the method used to resend the OTP code.
                </p>

                <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  HTTP Request via SSL
                </p>
                <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  GET '/api/v1/otp-resend'
                </p>
              </div>

              {/* Section Divider */}
              <div className="mt-16 mb-8">
                <hr className={`border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`} />
              </div>
            </section>

            {/* Refund Section */}
            <section id="refund" className="scroll-mt-24">
              <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Refunds
              </h1>
              <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Kotulapay refunds processing REST API.
              </p>

              {/* Create refund */}
              <div id="refund-create" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Create refund
                </h2>

                {selectedLanguage === 'Python' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="python"
                      code={`from django.http import HttpResponseRedirect, HttpResponse
import requests
import json

def pay(request) :

    MERCHANT_PRIVATE_KEY = 'merchant_private_key'
    LIVE_URL = 'https://business.kotulapay.com';
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "token" : request.POST['token payment'],
    "amount": 100
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }

    resp = requests.post('%s/api/v1/refunds' % (SANDBOX_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_payload = json.loads(resp.text)
        return HttpResponseRedirect(resp_payload['processingUrl'])
    else:
        return HttpResponse('<html><body><span>Something gone wrong: %s</span></body></html>' % (resp.status_code))`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "errors": [],
  "token": "[payment token]",
  "processingUrl": "https://business.kotulapay.com/p/[payment token]",
  "refund": {
    "token": "3a1a4fc8f975eb022a1c0ddb3abcded9",
    "amount": "10020",
    "currency": "USD",
    "status": "approved|declined"
  }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'Java' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="java"
                      code={`MediaType JSON = MediaType.parse("application/json; charset=utf-8");

HashMap<String, Object> params = new HashMap<String, Object>();

params.put("token", "payment token");
params.put("amount", 100);
OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
       .url("https://business.kotulapay.com/api/v1/refunds")
       .post(RequestBody.create(JSON, new Gson().toJson(params)))
       .addHeader("content-type", "application/json")
       .addHeader("authorization", "Bearer merchant_private_key")
       .build();

Call call = client.newCall(request);

call.enqueue(new Callback() {

   @Override
   public void onFailure(Call call, IOException e) {
       Log.e("response ", "onFailure(): " + e.getMessage() );
   }

   @Override
   public void onResponse(Call call, Response response) throws IOException {
       String resp = response.body().string();
       Log.e("response ", "onResponse(): " + resp );
   }
});`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "errors": [],
  "token": "[payment token]",
  "processingUrl": "https://business.kotulapay.com/p/[payment token]",
  "refund": {
    "token": "3a1a4fc8f975eb022a1c0ddb3abcded9",
    "amount": "10020",
    "currency": "USD",
    "status": "approved|declined"
  }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'PHP' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="php"
                      code={`<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://business.kotulapay.com/api/v1/payments",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{ \\"token\\" : \\"payment token\\"\\n}",
  CURLOPT_HTTPHEADER => array(
    "authorization: Bearer merchant_private_key",
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "errors": [],
  "token": "[payment token]",
  "processingUrl": "https://business.kotulapay.com/p/[payment token]",
  "refund": {
    "token": "3a1a4fc8f975eb022a1c0ddb3abcded9",
    "amount": "10020",
    "currency": "USD",
    "status": "approved|declined"
  }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'cURL' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="bash"
                      code={`curl "https://business.kotulapay.com/api/v1/refunds" \\
    -X POST \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json" -d '{
        "token" : "Your Product",
        "amount": 1000
    }'`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "errors": [],
  "token": "[payment token]",
  "processingUrl": "https://business.kotulapay.com/p/[payment token]",
  "refund": {
    "token": "3a1a4fc8f975eb022a1c0ddb3abcded9",
    "amount": "10020",
    "currency": "USD",
    "status": "approved|declined"
  }
}`}
                    />
                  </>
                )}

                <p className={`mt-6 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Create refunds by providing a payment token.
                </p>

                <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  HTTP Request via SSL
                </p>
                <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  POST '/api/v1/refunds'
                </p>

                <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Query Parameters
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description']}
                  rows={[
                    ['token', 'yes', 'Payment token.'],
                    ['amount', 'no', 'Refund amount in cents.'],
                  ]}
                />
              </div>

              {/* Section Divider */}
              <div className="mt-16 mb-8">
                <hr className={`border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`} />
              </div>
            </section>

            {/* Payouts Section */}
            <section id="payouts" className="scroll-mt-24">
              <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Payouts
              </h1>
              <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Transferring money from a business account to a client account.
              </p>

              {/* Make a payout */}
              <div id="payouts-make" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Make a payout
                </h2>

                {selectedLanguage === 'cURL' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="bash"
                      code={`curl "https://business.kotulapay.com/api/v1/payouts" \\
    -X POST \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json" -d '{
        "amount" : 1000,
        "currency" : "CNY",
        "orderNumber": "10001",
        "extraReturnParam" : "test payout",

        "card": {
            "pan" : "4276111152393643",
            "expires" : "08/2022"
        },

        "customer": {
            "first_name" : "Mike",
            "last_name" : "Green",
            "email" : "test@kotulapay.com",
            "address" : "725 5th Ave, New York, NY 10022, United States",
            "ip" : "1.1.1.1"
        }
}'`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "errors": [],
  "payout": {
      "token": "[payment token]",
      "status": "[payment status]",
      "timestamp": "2016-06-09T03:46:45Z"
  }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'Python' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="python"
                      code={`from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
import requests
import json

def payout(request) :

    MERCHANT_PRIVATE_KEY = 'your-merchant-private-key'
    LIVE_URL = 'https://business.kotulapay.com';
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "amount" : 10000,
        "currency" : "EUR",
        "orderNumber": "10001",
        "card": {
            "pan" : "4276111152393643",
            "expires" : "08/2022"
        },

        "customer": {
            "first_name" : "Mike",
            "last_name" : "Green",
            "email" : "test@kotulapay.com",
            "address" : "test test",
            "ip" : "1.1.1.1"
        }
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }

    resp = requests.post('%s/api/v1/payouts' % (SANDBOX_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_o = json.loads(resp.text)
        return HttpResponseRedirect(resp_o['status'])
    else:
        return HttpResponse('<html><body><span>Something gone wrong: %s</span> : %s</body></html>' % (resp.status_code, resp.text))`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "errors": [],
  "payout": {
      "token": "[payment token]",
      "status": "[payment status]",
      "timestamp": "2016-06-09T03:46:45Z"
  }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'PHP' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="php"
                      code={`<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://business.kotulapay.com/api/v1/payouts",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{ \\"amount\\" : 1000, \\"currency\\" : \\"CNY\\", \\"orderNumber\\" : \\"10001\\", \\"extraReturnParam\\" : \\"test payout\\", \\"card\\": { \\"pan\\" : \\"4276111152393643\\", \\"expires\\" : \\"08/2022\\" }, \\"customer\\": { \\"email\\" : \\"test@kotulapay.com\\", \\"first_name\\" : \\"Mike\\", \\"last_name\\" : \\"Green\\", \\"address\\" : \\"test test\\", \\"ip\\" : \\"1.1.1.1\\"}\n}",
  CURLOPT_HTTPHEADER => array(
    "authorization: Bearer edf526c5374796cdcec5dce731405cee",
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "errors": [],
  "payout": {
      "token": "[payment token]",
      "status": "[payment status]",
      "timestamp": "2016-06-09T03:46:45Z"
  }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'Java' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="java"
                      code={`MediaType JSON = MediaType.parse("application/json; charset=utf-8");

HashMap<String, Object> params = new HashMap<String, Object>();

params.put("amount", 1000);
params.put("currency", "EUR");
params.put("orderNumber", "[merchat system order number]");

OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
       .url("https://business.kotulapay.com/api/v1/payouts")
       .post(RequestBody.create(JSON, new Gson().toJson(params)))
       .addHeader("content-type", "application/json")
       .addHeader("authorization", "Bearer merchant_private_key")
       .build();

Call call = client.newCall(request);

call.enqueue(new Callback() {

   @Override
   public void onFailure(Call call, IOException e) {
       Log.e("response ", "onFailure(): " + e.getMessage() );
   }

   @Override
   public void onResponse(Call call, Response response) throws IOException {
       String resp = response.body().string();
       Log.e("response ", "onResponse(): " + resp );
   }
});`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "errors": [],
  "payout": {
      "token": "[payment token]",
      "status": "[payment status]",
      "timestamp": "2016-06-09T03:46:45Z"
  }
}`}
                    />
                  </>
                )}

                <p className={`mt-6 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Create a payout operation.
                </p>

                <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  HTTP Request via SSL
                </p>
                <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  POST '/api/v1/payouts'
                </p>

                <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Query Parameters
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description']}
                  rows={[
                    ['amount', 'yes', 'Payment amount in minimal values as of; USD and EUR / Cents, for JPY / Yen, for CNY / Fen.'],
                    ['currency', 'yes', 'Currency code (CNY, EUR, USD, JPY)'],
                    ['orderNumber', 'yes', "Kotulapay's client inner order number"],
                    ['card', 'yes', 'Card object for Host2Host payouts.'],
                    ['customer', 'yes', 'Customer object for Host2Host payouts.'],
                  ]}
                />

                <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Card Payout Object Parameters
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description']}
                  rows={[
                    ['pan', 'yes', "Customer's card number (PAN). Any valid card number, may contain spaces"],
                    ['expires', 'yes', "Customer's card expiration date. Format: mm/yyyy"],
                  ]}
                />

                <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Customer Object Parameters (optional)
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description']}
                  rows={[
                    ['email', 'yes', "Customer's email, is mandatory if Customer object posted on a request"],
                    ['address', 'no', 'Customer\'s billing address in the full format like "725 5th Ave, New York, NY 10022, United States"'],
                    ['ip', 'yes', 'Customer IP address'],
                    ['first_name', 'no', 'Customer name'],
                    ['last_name', 'no', 'Customer surname'],
                  ]}
                />
              </div>

              {/* Providers */}
              <div id="payouts-providers" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Providers
                </h2>

                {selectedLanguage === 'Java' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="java"
                      code={`MediaType JSON = MediaType.parse("application/json; charset=utf-8");

HashMap<String, Object> params = new HashMap<String, Object>();

params.put("amount", 1000);
params.put("currency", "EUR");
params.put("orderNumber", "[merchat system order number]");

OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
       .url("https://business.kotulapay.com/api/v1/payouts")
       .post(RequestBody.create(JSON, new Gson().toJson(params)))
       .addHeader("content-type", "application/json")
       .addHeader("authorization", "Bearer merchant_private_key")
       .build();

Call call = client.newCall(request);

call.enqueue(new Callback() {

   @Override
   public void onFailure(Call call, IOException e) {
       Log.e("response ", "onFailure(): " + e.getMessage() );
   }

   @Override
   public void onResponse(Call call, Response response) throws IOException {
       String resp = response.body().string();
       Log.e("response ", "onResponse(): " + resp );
   }
});`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "errors": [],
  "token": "[payment token]",
  "processingUrl": [
        {
            "webmoney": "http://business.kotulapay.com/pout/165998589a413b56ae72fbfdc15b016b/webmoney?locale=en"
        },
        {
            "bank_card": "http://business.kotulapay.com/pout/165998589a413b56ae72fbfdc15b016b/bank_card?locale=en"
        },
        {
            "qiwi_wallet": "http://business.kotulapay.com/pout/165998589a413b56ae72fbfdc15b016b/qiwi_wallet?locale=en"
        },
        {
            "skrill_wallet": "http://business.kotulapay.com/pout/165998589a413b56ae72fbfdc15b016b/skrill_wallet?locale=en"
        }
  ],
  "selectorURL": "https://business.kotulapay.com/select/pout/[payment token]/",
  "payment": {
    "amount": "10020",
    "currency": "CNY",
    "status": "init"
  }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'PHP' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="php"
                      code={`<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://business.kotulapay.com/api/v1/payouts",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{ \\"amount\\" : 1000, \\"currency\\" : \\"CNY\\", \\"orderNumber\\" : \\"10001\\", \\"extraReturnParam\\" : \\"test payout\\", \\"card\\": { \\"pan\\" : \\"4276111152393643\\", \\"expires\\" : \\"08/2022\\" }, \\"customer\\": { \\"email\\" : \\"test@kotulapay.com\\", \\"address\\" : \\"test test\\", \\"first_name\\" : \\"Mike\\", \\"last_name\\" : \\"Green\\", \\"ip\\" : \\"1.1.1.1\\"}\n}",
  CURLOPT_HTTPHEADER => array(
    "authorization: Bearer edf526c5374796cdcec5dce731405cee",
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "errors": [],
  "token": "[payment token]",
  "processingUrl": [
        {
            "webmoney": "http://business.kotulapay.com/pout/165998589a413b56ae72fbfdc15b016b/webmoney?locale=en"
        },
        {
            "bank_card": "http://business.kotulapay.com/pout/165998589a413b56ae72fbfdc15b016b/bank_card?locale=en"
        },
        {
            "qiwi_wallet": "http://business.kotulapay.com/pout/165998589a413b56ae72fbfdc15b016b/qiwi_wallet?locale=en"
        },
        {
            "skrill_wallet": "http://business.kotulapay.com/pout/165998589a413b56ae72fbfdc15b016b/skrill_wallet?locale=en"
        }
  ],
  "selectorURL": "https://business.kotulapay.com/select/pout/[payment token]/",
  "payment": {
    "amount": "10020",
    "currency": "CNY",
    "status": "init"
  }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'Python' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="python"
                      code={`from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
import requests
import json

def payout(request) :

    MERCHANT_PRIVATE_KEY = 'your-merchant-private-key'
    LIVE_URL = 'https://business.kotulapay.com';
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "amount" : 10000,
        "currency" : "EUR",
        "orderNumber": "10001",
        "card": {
            "pan" : "4276111152393643",
            "expires" : "08/2022"
        },

        "customer": {
            "first_name" : "Mike",
            "last_name" : "Green",
            "email" : "test@kotulapay.com",
            "address" : "test test",
            "ip" : "1.1.1.1"
        }
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }

    resp = requests.post('%s/api/v1/payouts' % (SANDBOX_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_o = json.loads(resp.text)
        return HttpResponseRedirect(resp_o['status'])
    else:
        return HttpResponse('<html><body><span>Something gone wrong: %s</span> : %s</body></html>' % (resp.status_code, resp.text))`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "errors": [],
  "token": "[payment token]",
  "processingUrl": [
        {
            "webmoney": "http://business.kotulapay.com/pout/165998589a413b56ae72fbfdc15b016b/webmoney?locale=en"
        },
        {
            "bank_card": "http://business.kotulapay.com/pout/165998589a413b56ae72fbfdc15b016b/bank_card?locale=en"
        },
        {
            "qiwi_wallet": "http://business.kotulapay.com/pout/165998589a413b56ae72fbfdc15b016b/qiwi_wallet?locale=en"
        },
        {
            "skrill_wallet": "http://business.kotulapay.com/pout/165998589a413b56ae72fbfdc15b016b/skrill_wallet?locale=en"
        }
  ],
  "selectorURL": "https://business.kotulapay.com/select/pout/[payment token]/",
  "payment": {
    "amount": "10020",
    "currency": "CNY",
    "status": "init"
  }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'cURL' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="bash"
                      code={`curl "https://business.kotulapay.com/api/v1/payouts" \\
    -X POST \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json" -d '{
        "amount" : 1000,
        "currency" : "CNY",
        "orderNumber": "10001",
        "extraReturnParam" : "test payout",

        "card": {
            "pan" : "4276111152393643",
            "expires" : "08/2022"
        },

        "customer": {
            "email" : "test@kotulapay.com",
            "address" : "test test",
            "ip" : "1.1.1.1",
            "first_name" : "Mike",
            "last_name" : "Green",
        }
}'`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "errors": [],
  "token": "[payment token]",
  "processingUrl": [
        {
            "webmoney": "http://business.kotulapay.com/pout/165998589a413b56ae72fbfdc15b016b/webmoney?locale=en"
        },
        {
            "bank_card": "http://business.kotulapay.com/pout/165998589a413b56ae72fbfdc15b016b/bank_card?locale=en"
        },
        {
            "qiwi_wallet": "http://business.kotulapay.com/pout/165998589a413b56ae72fbfdc15b016b/qiwi_wallet?locale=en"
        },
        {
            "skrill_wallet": "http://business.kotulapay.com/pout/165998589a413b56ae72fbfdc15b016b/skrill_wallet?locale=en"
        }
  ],
  "selectorURL": "https://business.kotulapay.com/select/pout/[payment token]/",
  "payment": {
    "amount": "10020",
    "currency": "CNY",
    "status": "init"
  }
}`}
                    />
                  </>
                )}

                <p className={`mt-6 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  In case multiple payout providers enabled to a merchant account, Create payout reponse JSON will have processingUrl object represented as an array of available payout providers (please refer to JSON response). Use those URLs to redirect your customer to a payout provider (method).
                </p>

                <h3 className={`text-xl font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  List of payout providers
                </h3>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  In case you want a customer to choose a payout provider (method) it might be convenient to use a specific page (widget) with payout provider list, which is availabe by "selectorURL" parameter in JSON response object
                </p>
              </div>

              {/* Section Divider */}
              <div className="mt-16 mb-8">
                <hr className={`border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`} />
              </div>
            </section>

            {/* P2P Section */}
            <section id="p2p" className="scroll-mt-24">
              <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                P2P
              </h1>
              <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Kotulapay p2p payment processing REST API.
              </p>

              {/* Payment */}
              <div id="p2p-payment" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Payment
                </h2>

                {selectedLanguage === 'cURL' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="bash"
                      code={`curl "https://business.kotulapay.com/api/v1/payments" \\
    -X POST \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json" -d '{
        "product": "Tests",
        "amount": 100300,
        "currency": "RUB",
        "callbackUrl": "https://test.com",
        "redirectSuccessUrl": "https://success.test.com/",
        "redirectFailUrl": "https://declined.test.com/",
        "bank_account": {
            "bank_name": "sber",
            "requisite_type": "sbp/card/account/link"
        },
        "customer": {
            "email": "test@test.com",
            "ip": "178.175.50.34"
        }
    }'`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true,
    "result": 0,
    "status": 200,
    "token": "K9doc43HAPnqSuGdvN5RMX42tE54331",
    "processingUrl": [
        {
            "trader": "https://business.kotulapay.com/p/K9doc43HAPnqSuGdvN5RMX42tE54331?..."
        }
    ],
    "selectorUrl": "https://business.kotulapay.com/select/K9doc43HAPnqSuGdvN5RMX42tE54331?...",
    "payment": {
        "amount": 1000,
        "gateway_amount": 1000,
        "currency": "RUB",
        "status": "init",
        "two_stage_mode": false,
        "commission": 0
    }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'Python' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="python"
                      code={`from django.http import HttpResponseRedirect, HttpResponse
import requests
import json

def pay(request) :

    MERCHANT_PRIVATE_KEY = 'merchant_private_key'
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
      "product": "Tests",
      "amount": 100300,
      "currency": "RUB",
      "callbackUrl": "https://test.com",
      "redirectSuccessUrl": "https://success.test.com/",
      "redirectFailUrl": "https://declined.test.com/",
      "bank_account": {
          "bank_name": "sber",
          "requisite_type": "sbp/card/account/link"
      },
      "customer": {
          "email": "test@test.com",
          "ip": "178.175.50.34"
      }
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }

    resp = requests.post('%s/api/v1/payments' % (SANDBOX_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_payload = json.loads(resp.text)
        return HttpResponseRedirect(resp_payload['processingUrl'])
    else:
        return HttpResponse('<html><body><span>Something gone wrong: %s</span></body></html>' % (resp.status_code))`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true,
    "result": 0,
    "status": 200,
    "token": "K9doc43HAPnqSuGdvN5RMX42tE54331",
    "processingUrl": [
        {
            "trader": "https://business.kotulapay.com/p/K9doc43HAPnqSuGdvN5RMX42tE54331?..."
        }
    ],
    "selectorUrl": "https://business.kotulapay.com/select/K9doc43HAPnqSuGdvN5RMX42tE54331?...",
    "payment": {
        "amount": 1000,
        "gateway_amount": 1000,
        "currency": "RUB",
        "status": "init",
        "two_stage_mode": false,
        "commission": 0
    }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'PHP' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="php"
                      code={`<?php

$curl = curl_init();

$data = [
    "product" => "Tests",
    "amount" => 100300,
    "currency" => "RUB",
    "callbackUrl" => "https://test.com",
    "redirectSuccessUrl" => "https://success.test.com/",
    "redirectFailUrl" => "https://declined.test.com/",
    "bank_account" => [
        "bank_name" => "sber",
        "requisite_type" => "sbp/card/account/link"
    ],
    "customer" => [
        "email" => "test@test.com",
        "ip" => "178.175.50.34"
    ]
];

curl_setopt_array($curl, array(
    CURLOPT_URL => "https://business.kotulapay.com/api/v1/payments",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => json_encode($data),
    CURLOPT_HTTPHEADER => array(
        "authorization: Bearer merchant_private_key",
        "content-type: application/json"
    ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    echo $response;
}
?>`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true,
    "result": 0,
    "status": 200,
    "token": "K9doc43HAPnqSuGdvN5RMX42tE54331",
    "processingUrl": [
        {
            "trader": "https://business.kotulapay.com/p/K9doc43HAPnqSuGdvN5RMX42tE54331?..."
        }
    ],
    "selectorUrl": "https://business.kotulapay.com/select/K9doc43HAPnqSuGdvN5RMX42tE54331?...",
    "payment": {
        "amount": 1000,
        "gateway_amount": 1000,
        "currency": "RUB",
        "status": "init",
        "two_stage_mode": false,
        "commission": 0
    }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'Java' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="java"
                      code={`import com.google.gson.Gson;
import okhttp3.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {

    public static void main(String[] args) {
        MediaType JSON = MediaType.parse("application/json; charset=utf-8");

        Map<String, Object> params = new HashMap<>();
        params.put("product", "Tests");
        params.put("amount", 100300);
        params.put("currency", "RUB");
        params.put("callbackUrl", "https://test.com");
        params.put("redirectSuccessUrl", "https://success.test.com/");
        params.put("redirectFailUrl", "https://declined.test.com/");

        Map<String, String> bankAccount = new HashMap<>();
        bankAccount.put("bank_name", "sber");
        bankAccount.put("requisite_type", "sbp/card/account/link");
        params.put("bank_account", bankAccount);

        Map<String, String> customer = new HashMap<>();
        customer.put("email", "test@test.com");
        customer.put("ip", "178.175.50.34");
        params.put("customer", customer);

        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url("https://business.kotulapay.com/api/v1/payments")
                .post(RequestBody.create(JSON, new Gson().toJson(params)))
                .addHeader("content-type", "application/json")
                .addHeader("authorization", "Bearer merchant_private_key")
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                System.err.println("onFailure(): " + e.getMessage());
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                String resp = response.body().string();
                System.out.println("onResponse(): " + resp);
            }
        });
    }
}`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true,
    "result": 0,
    "status": 200,
    "token": "K9doc43HAPnqSuGdvN5RMX42tE54331",
    "processingUrl": [
        {
            "trader": "https://business.kotulapay.com/p/K9doc43HAPnqSuGdvN5RMX42tE54331?..."
        }
    ],
    "selectorUrl": "https://business.kotulapay.com/select/K9doc43HAPnqSuGdvN5RMX42tE54331?...",
    "payment": {
        "amount": 1000,
        "gateway_amount": 1000,
        "currency": "RUB",
        "status": "init",
        "two_stage_mode": false,
        "commission": 0
    }
}`}
                    />
                  </>
                )}

                <p className={`mt-6 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Initialize payments - to begin receiving payments, you must first call using the following script. This will enable you to obtain a payment token, which will be required later to complete API integration. Use redirect/GET to processingUrl after request.
                </p>

                <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  HTTP Request via SSL
                </p>
                <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  POST '/api/v1/payments'
                </p>

                <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Query Parameters
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description', 'Validation']}
                  rows={[
                    ['product', 'yes', "Product name (Service description) (example: 'iPhone').", 'minLength: 5, maxLength: 255'],
                    ['amount', 'yes', 'Payment amount in cents (10020), except JPY', 'minLength: 1, maxLength: 32'],
                    ['currency', 'yes', 'Currency code (CNY, EUR, USD, JPY).', 'minLength: 3, maxLength: 3'],
                    ['callbackUrl', 'yes', 'The server URL a merchant will be notified about a payment finalisation', 'Valid URI format'],
                    ['redirectSuccessUrl', 'no', 'The URL a customer will be redirected to in the case of successfull payment', 'Valid URI format'],
                    ['redirectFailUrl', 'no', 'The URL a customer will be redirected to in the case of payment error or failure', 'Valid URI format'],
                    ['extraReturnParam', 'no', 'Bank/Payment method list, description, etc', 'minLength: 1, maxLength: 1024'],
                    ['orderNumber', 'no', 'The current order number from a company system.', 'minLength: 3, maxLength: 255 (string)'],
                    ['locale', 'no', 'The locale is used on a payment page by default. Currently supported locales: en, zh and jp from ISO 639-1.', 'minLength: 2, maxLength: 5 (string)'],
                    ['bank_account', 'no', 'Bank details object for p2p payments.', ''],
                    ['customer', 'yes', 'Customer object for Host2Host payments.', ''],
                  ]}
                />

                <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Bank account Payment Object Parameters
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description']}
                  rows={[
                    ['bank_name', 'no', 'Customer bank name: sberbank/tbank/raiffeisen/uralsib/alfabank/sovcombank/humo/uzcard'],
                    ['requisite_type', 'no', 'Requisite type for payment: sbp/card/account/link'],
                  ]}
                />

                <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Customer Object Parameters (optional)
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description', 'Validation']}
                  rows={[
                    ['email', 'yes', "Customer's email, is mandatory if Customer object posted on a request", 'Valid email format'],
                    ['ip', 'no', 'Customer IP address', 'Valid IP address format (XX.XX.XX.XX)'],
                  ]}
                />
              </div>

              {/* Payout Card */}
              <div id="p2p-payout-card" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Payout Card
                </h2>

                {selectedLanguage === 'cURL' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="bash"
                      code={`curl "https://business.kotulapay.com/api/v1/payouts" \\
    -X POST \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json" -d '{
        "amount": 1000,
        "currency": "RUB",
        "orderNumber": "10001",
        "callbackUrl": "https://test.com",
        "bank_account": {
            "bank_name": "sber",
            "requisite_type": "card"
        },
        "card": {
            "pan": "4627342642639018"
        },
        "customer": {
            "email": "test@test.com",
            "ip": "178.175.20.33",
            "first_name": "Иванов",
            "last_name": "Иван",
            "middle_name": "Иванович",
            "phone": "79998889900"
        }
    }'`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true,
    "result": 0,
    "status": 200,
    "token": "c3452f792233e43aeaa819c68766043",
    "processingUrl": [
        {
            "trader": "https://business.kotulapay.com/payout/..."
        }
    ],
    "selectorUrl": "https://business.kotulapay.com/select/payout/c3452f792233e43aeaa819c68766043",
    "payment": {
        "amount": 30000,
        "currency": "RUB",
        "gateway_amount": 30000,
        "gateway_currency": "RUB",
        "status": "init"
    }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'Python' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="python"
                      code={`from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
import requests
import json

def payout(request) :

    MERCHANT_PRIVATE_KEY = 'your-merchant-private-key'
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "amount" : 1000,
        "currency" : "RUB",
        "orderNumber": "10001",
        "callbackUrl": "https://test.com",
        "bank_account": {
            "bank_name": "sber",
            "requisite_type": "card"
        },
        "card": {
            "pan": "4627342642639018"
        },
        "customer": {
            "email": "test@test.com",
            "ip": "178.175.20.33",
            "first_name": "Иванов",
            "last_name": "Иван",
            "middle_name": "Иванович",
            "phone": "79998889900"
        }
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }

    resp = requests.post('%s/api/v1/payouts' % (SANDBOX_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_o = json.loads(resp.text)
        return HttpResponseRedirect(resp_o['status'])
    else:
        return HttpResponse('<html><body><span>Something gone wrong: %s</span> : %s</body></html>' % (resp.status_code, resp.text))`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true,
    "result": 0,
    "status": 200,
    "token": "c3452f792233e43aeaa819c68766043",
    "processingUrl": [
        {
            "trader": "https://business.kotulapay.com/payout/..."
        }
    ],
    "selectorUrl": "https://business.kotulapay.com/select/payout/c3452f792233e43aeaa819c68766043",
    "payment": {
        "amount": 30000,
        "currency": "RUB",
        "gateway_amount": 30000,
        "gateway_currency": "RUB",
        "status": "init"
    }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'PHP' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="php"
                      code={`<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://business.kotulapay.com/api/v1/payouts",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => json_encode([
    "amount" => 1000,
    "currency" => "RUB",
    "orderNumber" => "10001",
    "callbackUrl" => "https://test.com",
    "bank_account" => [
      "bank_name" => "sber",
      "requisite_type" => "card"
    ],
    "card" => [
      "pan" => "4627342642639018"
    ],
    "customer" => [
      "email" => "test@kotulapay.com",
      "ip" => "1.1.1.1"
    ]
  ]),
  CURLOPT_HTTPHEADER => array(
    "authorization: Bearer merchant_private_key",
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true,
    "result": 0,
    "status": 200,
    "token": "c3452f792233e43aeaa819c68766043",
    "processingUrl": [
        {
            "trader": "https://business.kotulapay.com/payout/..."
        }
    ],
    "selectorUrl": "https://business.kotulapay.com/select/payout/c3452f792233e43aeaa819c68766043",
    "payment": {
        "amount": 30000,
        "currency": "RUB",
        "gateway_amount": 30000,
        "gateway_currency": "RUB",
        "status": "init"
    }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'Java' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="java"
                      code={`import com.google.gson.Gson;
import okhttp3.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {

    public static void main(String[] args) {
        MediaType JSON = MediaType.parse("application/json; charset=utf-8");

        Map<String, Object> params = new HashMap<>();
        params.put("amount", 1000);
        params.put("currency", "RUB");
        params.put("orderNumber", "10001");
        params.put("callbackUrl", "https://test.com");

        Map<String, String> bankAccount = new HashMap<>();
        bankAccount.put("bank_name", "sber");
        bankAccount.put("requisite_type", "card");
        params.put("bank_account", bankAccount);

        Map<String, String> card = new HashMap<>();
        card.put("pan", "4627342642639018");
        params.put("card", card);

        Map<String, String> customer = new HashMap<>();
        customer.put("email", "test@test.com");
        customer.put("ip", "178.175.20.33");
        customer.put("first_name", "Иванов");
        customer.put("last_name", "Иван");
        customer.put("middle_name", "Иванович");
        customer.put("phone", "79998889900");
        params.put("customer", customer);

        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url("https://business.kotulapay.com/api/v1/payouts")
                .post(RequestBody.create(JSON, new Gson().toJson(params)))
                .addHeader("content-type", "application/json")
                .addHeader("authorization", "Bearer merchant_private_key")
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                System.err.println("onFailure(): " + e.getMessage());
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                String resp = response.body().string();
                System.out.println("onResponse(): " + resp);
            }
        });
    }
}`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true,
    "result": 0,
    "status": 200,
    "token": "c3452f792233e43aeaa819c68766043",
    "processingUrl": [
        {
            "trader": "https://business.kotulapay.com/payout/..."
        }
    ],
    "selectorUrl": "https://business.kotulapay.com/select/payout/c3452f792233e43aeaa819c68766043",
    "payment": {
        "amount": 30000,
        "currency": "RUB",
        "gateway_amount": 30000,
        "gateway_currency": "RUB",
        "status": "init"
    }
}`}
                    />
                  </>
                )}

                <p className={`mt-6 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Create a payout operation. Use GET to processingUrl after request.
                </p>

                <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  HTTP Request via SSL
                </p>
                <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  POST '/api/v1/payouts'
                </p>

                <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Query Parameters
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description']}
                  rows={[
                    ['amount', 'yes', 'Payment amount in minimal values. ex: 123 RUB = 1.23 RUB.'],
                    ['currency', 'yes', 'Currency code'],
                    ['orderNumber', 'yes', "Kotulapay's client inner order number"],
                    ['callbackUrl', 'no', 'merchant notification url'],
                    ['bank_account', 'yes', 'Bank details object for p2p payouts.'],
                    ['card', 'yes', 'Card object for card p2p payouts.'],
                    ['customer', 'yes', 'Customer object for payouts.'],
                  ]}
                />

                <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Card Payout Object Parameters
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description']}
                  rows={[
                    ['pan', 'yes', "Customer's card number (PAN). Any valid card number"],
                  ]}
                />

                <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Bank account Payout Object Parameters
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description']}
                  rows={[
                    ['bank_name', 'no', 'Customer bank name: sberbank/tbank/raiffeisen/uralsib/alfabank/sovcombank/humo/uzcard'],
                    ['requisite_type', 'yes', 'card'],
                  ]}
                />

                <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Customer Object Parameters
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description']}
                  rows={[
                    ['email', 'yes', 'Valid email format'],
                    ['ip', 'yes', 'Customer IP address'],
                    ['first_name', 'no', 'Customer name'],
                    ['last_name', 'no', 'Customer surname'],
                    ['middle_name', 'no', 'Customer middle name'],
                    ['phone', 'no', 'Customer phone for sbp'],
                  ]}
                />
              </div>

              {/* Payout SBP */}
              <div id="p2p-payout-sbp" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Payout SBP
                </h2>

                {selectedLanguage === 'cURL' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="bash"
                      code={`curl "https://business.kotulapay.com/api/v1/payouts" \\
    -X POST \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json" -d '{
        "amount": 1000,
        "currency": "RUB",
        "orderNumber": "10001",
        "callbackUrl": "https://test.com",
        "bank_account": {
            "bank_name": "sber",
            "requisite_type": "sbp"
        },
        "customer": {
            "email": "test@test.com",
            "ip": "178.175.20.33",
            "first_name": "Иванов",
            "last_name": "Иван",
            "middle_name": "Иванович",
            "phone": "79998889900"
        }
    }'`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true,
    "result": 0,
    "status": 200,
    "token": "c3452f792233e43aeaa819c68766043",
    "processingUrl": [
        {
            "trader": "https://business.kotulapay.com/payout/..."
        }
    ],
    "selectorUrl": "https://business.kotulapay.com/select/payout/c3452f792233e43aeaa819c68766043",
    "payment": {
        "amount": 30000,
        "currency": "RUB",
        "gateway_amount": 30000,
        "gateway_currency": "RUB",
        "status": "init"
    }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'Python' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="python"
                      code={`from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
import requests
import json

def payout(request) :

    MERCHANT_PRIVATE_KEY = 'your-merchant-private-key'
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "amount" : 1000,
        "currency" : "RUB",
        "orderNumber": "10001",
        "callbackUrl": "https://test.com",
        "bank_account": {
            "bank_name": "sber",
            "requisite_type": "sbp"
        },
        "customer": {
            "email": "test@test.com",
            "ip": "178.175.20.33",
            "first_name": "Иванов",
            "last_name": "Иван",
            "middle_name": "Иванович",
            "phone": "79998889900"
        }
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }

    resp = requests.post('%s/api/v1/payouts' % (SANDBOX_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_o = json.loads(resp.text)
        return HttpResponseRedirect(resp_o['status'])
    else:
        return HttpResponse('<html><body><span>Something gone wrong: %s</span> : %s</body></html>' % (resp.status_code, resp.text))`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true,
    "result": 0,
    "status": 200,
    "token": "c3452f792233e43aeaa819c68766043",
    "processingUrl": [
        {
            "trader": "https://business.kotulapay.com/payout/..."
        }
    ],
    "selectorUrl": "https://business.kotulapay.com/select/payout/c3452f792233e43aeaa819c68766043",
    "payment": {
        "amount": 30000,
        "currency": "RUB",
        "gateway_amount": 30000,
        "gateway_currency": "RUB",
        "status": "init"
    }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'PHP' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="php"
                      code={`<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://business.kotulapay.com/api/v1/payouts",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => json_encode([
    "amount" => 1000,
    "currency" => "RUB",
    "orderNumber" => "10001",
    "callbackUrl" => "https://test.com",
    "bank_account" => [
      "bank_name" => "sber",
      "requisite_type" => "sbp"
    ],
    "customer" => [
      "email" => "test@kotulapay.com",
      "phone" => "79998889900",
      "ip" => "1.1.1.1"
    ]
  ]),
  CURLOPT_HTTPHEADER => array(
    "authorization: Bearer merchant_private_key",
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true,
    "result": 0,
    "status": 200,
    "token": "c3452f792233e43aeaa819c68766043",
    "processingUrl": [
        {
            "trader": "https://business.kotulapay.com/payout/..."
        }
    ],
    "selectorUrl": "https://business.kotulapay.com/select/payout/c3452f792233e43aeaa819c68766043",
    "payment": {
        "amount": 30000,
        "currency": "RUB",
        "gateway_amount": 30000,
        "gateway_currency": "RUB",
        "status": "init"
    }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'Java' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="java"
                      code={`import com.google.gson.Gson;
import okhttp3.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {

    public static void main(String[] args) {
        MediaType JSON = MediaType.parse("application/json; charset=utf-8");

        Map<String, Object> params = new HashMap<>();
        params.put("amount", 1000);
        params.put("currency", "RUB");
        params.put("orderNumber", "10001");
        params.put("callbackUrl", "https://test.com");

        Map<String, String> bankAccount = new HashMap<>();
        bankAccount.put("bank_name", "sber");
        bankAccount.put("requisite_type", "sbp");
        params.put("bank_account", bankAccount);

        Map<String, String> customer = new HashMap<>();
        customer.put("email", "test@test.com");
        customer.put("ip", "178.175.20.33");
        customer.put("first_name", "Иванов");
        customer.put("last_name", "Иван");
        customer.put("middle_name", "Иванович");
        customer.put("phone", "79998889900");
        params.put("customer", customer);

        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url("https://business.kotulapay.com/api/v1/payouts")
                .post(RequestBody.create(JSON, new Gson().toJson(params)))
                .addHeader("content-type", "application/json")
                .addHeader("authorization", "Bearer merchant_private_key")
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                System.err.println("onFailure(): " + e.getMessage());
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                String resp = response.body().string();
                System.out.println("onResponse(): " + resp);
            }
        });
    }
}`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true,
    "result": 0,
    "status": 200,
    "token": "c3452f792233e43aeaa819c68766043",
    "processingUrl": [
        {
            "trader": "https://business.kotulapay.com/payout/..."
        }
    ],
    "selectorUrl": "https://business.kotulapay.com/select/payout/c3452f792233e43aeaa819c68766043",
    "payment": {
        "amount": 30000,
        "currency": "RUB",
        "gateway_amount": 30000,
        "gateway_currency": "RUB",
        "status": "init"
    }
}`}
                    />
                  </>
                )}

                <p className={`mt-6 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Create a payout operation. Use GET to processingUrl after request.
                </p>

                <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  HTTP Request via SSL
                </p>
                <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  POST '/api/v1/payouts'
                </p>

                <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Query Parameters
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description']}
                  rows={[
                    ['amount', 'yes', 'Payment amount in minimal values. ex: 123 RUB = 1.23 RUB.'],
                    ['currency', 'yes', 'Currency code'],
                    ['orderNumber', 'yes', "Kotulapay's client inner order number"],
                    ['callbackUrl', 'no', 'merchant notification url'],
                    ['bank_account', 'yes', 'Bank details object for p2p payouts.'],
                    ['customer', 'yes', 'Customer object for payouts.'],
                  ]}
                />

                <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Bank account Payout Object Parameters
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description']}
                  rows={[
                    ['bank_name', 'yes', 'Customer bank name: sberbank/tbank/raiffeisen/uralsib/alfabank/sovcombank/humo/uzcard'],
                    ['requisite_type', 'yes', 'sbp'],
                  ]}
                />

                <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Customer Object Parameters
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description']}
                  rows={[
                    ['email', 'yes', 'Valid email format'],
                    ['ip', 'yes', 'Customer IP address'],
                    ['first_name', 'no', 'Customer name'],
                    ['last_name', 'no', 'Customer surname'],
                    ['middle_name', 'no', 'Customer middle name'],
                    ['phone', 'yes', 'Customer phone for sbp'],
                  ]}
                />
              </div>

              {/* Payout Account */}
              <div id="p2p-payout-account" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Payout Account
                </h2>

                {selectedLanguage === 'cURL' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="bash"
                      code={`curl "https://business.kotulapay.com/api/v1/payouts" \\
    -X POST \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json" -d '{
        "amount": 1000,
        "currency": "RUB",
        "orderNumber": "10001",
        "callbackUrl": "https://test.com",
        "bank_account": {
            "bank_name": "sber",
            "requisite_type": "account",
            "account_number": "1234567891123456"
        },
        "customer": {
            "email": "test@test.com",
            "ip": "178.175.20.33",
            "first_name": "Иванов",
            "last_name": "Иван",
            "middle_name": "Иванович",
            "phone": "79998889900"
        }
    }'`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true,
    "result": 0,
    "status": 200,
    "token": "c3452f792233e43aeaa819c68766043",
    "processingUrl": [
        {
            "trader": "https://business.kotulapay.com/payout/..."
        }
    ],
    "selectorUrl": "https://business.kotulapay.com/select/payout/c3452f792233e43aeaa819c68766043",
    "payment": {
        "amount": 30000,
        "currency": "RUB",
        "gateway_amount": 30000,
        "gateway_currency": "RUB",
        "status": "init"
    }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'Python' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="python"
                      code={`from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
import requests
import json

def payout(request) :

    MERCHANT_PRIVATE_KEY = 'your-merchant-private-key'
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "amount" : 1000,
        "currency" : "RUB",
        "orderNumber": "10001",
        "callbackUrl": "https://test.com",
        "bank_account": {
            "bank_name": "sber",
            "requisite_type": "account",
            "account_number": "1234567891123456"
        },
        "customer": {
            "email": "test@test.com",
            "ip": "178.175.20.33",
            "first_name": "Иванов",
            "last_name": "Иван",
            "middle_name": "Иванович",
            "phone": "79998889900"
        }
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }

    resp = requests.post('%s/api/v1/payouts' % (SANDBOX_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_o = json.loads(resp.text)
        return HttpResponseRedirect(resp_o['status'])
    else:
        return HttpResponse('<html><body><span>Something gone wrong: %s</span> : %s</body></html>' % (resp.status_code, resp.text))`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true,
    "result": 0,
    "status": 200,
    "token": "c3452f792233e43aeaa819c68766043",
    "processingUrl": [
        {
            "trader": "https://business.kotulapay.com/payout/..."
        }
    ],
    "selectorUrl": "https://business.kotulapay.com/select/payout/c3452f792233e43aeaa819c68766043",
    "payment": {
        "amount": 30000,
        "currency": "RUB",
        "gateway_amount": 30000,
        "gateway_currency": "RUB",
        "status": "init"
    }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'PHP' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="php"
                      code={`<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://business.kotulapay.com/api/v1/payouts",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => json_encode([
    "amount" => 1000,
    "currency" => "RUB",
    "orderNumber" => "10001",
    "callbackUrl" => "https://test.com",
    "bank_account" => [
      "bank_name" => "sber",
      "requisite_type" => "account",
      "account_number" => "1234567891123456"
    ],
    "customer" => [
      "email" => "test@kotulapay.com",
      "ip" => "1.1.1.1"
    ]
  ]),
  CURLOPT_HTTPHEADER => array(
    "authorization: Bearer merchant_private_key",
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true,
    "result": 0,
    "status": 200,
    "token": "c3452f792233e43aeaa819c68766043",
    "processingUrl": [
        {
            "trader": "https://business.kotulapay.com/payout/..."
        }
    ],
    "selectorUrl": "https://business.kotulapay.com/select/payout/c3452f792233e43aeaa819c68766043",
    "payment": {
        "amount": 30000,
        "currency": "RUB",
        "gateway_amount": 30000,
        "gateway_currency": "RUB",
        "status": "init"
    }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'Java' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="java"
                      code={`import com.google.gson.Gson;
import okhttp3.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {

    public static void main(String[] args) {
        MediaType JSON = MediaType.parse("application/json; charset=utf-8");

        Map<String, Object> params = new HashMap<>();
        params.put("amount", 1000);
        params.put("currency", "RUB");
        params.put("orderNumber", "10001");
        params.put("callbackUrl", "https://test.com");

        Map<String, String> bankAccount = new HashMap<>();
        bankAccount.put("bank_name", "sber");
        bankAccount.put("requisite_type", "account");
        bankAccount.put("account_number", "1234567891123456");
        params.put("bank_account", bankAccount);

        Map<String, String> customer = new HashMap<>();
        customer.put("email", "test@test.com");
        customer.put("ip", "178.175.20.33");
        customer.put("first_name", "Иванов");
        customer.put("last_name", "Иван");
        customer.put("middle_name", "Иванович");
        customer.put("phone", "79998889900");
        params.put("customer", customer);

        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url("https://business.kotulapay.com/api/v1/payouts")
                .post(RequestBody.create(JSON, new Gson().toJson(params)))
                .addHeader("content-type", "application/json")
                .addHeader("authorization", "Bearer merchant_private_key")
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                System.err.println("onFailure(): " + e.getMessage());
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                String resp = response.body().string();
                System.out.println("onResponse(): " + resp);
            }
        });
    }
}`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true,
    "result": 0,
    "status": 200,
    "token": "c3452f792233e43aeaa819c68766043",
    "processingUrl": [
        {
            "trader": "https://business.kotulapay.com/payout/..."
        }
    ],
    "selectorUrl": "https://business.kotulapay.com/select/payout/c3452f792233e43aeaa819c68766043",
    "payment": {
        "amount": 30000,
        "currency": "RUB",
        "gateway_amount": 30000,
        "gateway_currency": "RUB",
        "status": "init"
    }
}`}
                    />
                  </>
                )}

                <p className={`mt-6 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Create a payout operation. Use GET to processingUrl after request.
                </p>

                <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  HTTP Request via SSL
                </p>
                <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  POST '/api/v1/payouts'
                </p>

                <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Query Parameters
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description']}
                  rows={[
                    ['amount', 'yes', 'Payment amount in minimal values. ex: 123 RUB = 1.23 RUB.'],
                    ['currency', 'yes', 'Currency code'],
                    ['orderNumber', 'yes', "Kotulapay's client inner order number"],
                    ['callbackUrl', 'no', 'merchant notification url'],
                    ['bank_account', 'yes', 'Bank details object for p2p payouts.'],
                    ['customer', 'yes', 'Customer object for payouts.'],
                  ]}
                />

                <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Bank account Payout Object Parameters
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description']}
                  rows={[
                    ['bank_name', 'yes', 'Customer bank name: sberbank/tbank/raiffeisen/uralsib/alfabank/sovcombank/humo/uzcard'],
                    ['account_number', 'yes', "Customer's account number. Any valid account number"],
                    ['requisite_type', 'yes', 'account'],
                  ]}
                />

                <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Customer Object Parameters
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description']}
                  rows={[
                    ['email', 'yes', 'Valid email format'],
                    ['ip', 'yes', 'Customer IP address'],
                    ['first_name', 'no', 'Customer name'],
                    ['last_name', 'no', 'Customer surname'],
                    ['middle_name', 'no', 'Customer middle name'],
                    ['phone', 'no', 'Customer phone for sbp'],
                  ]}
                />
              </div>

              {/* Section Divider */}
              <div className="mt-16 mb-8">
                <hr className={`border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`} />
              </div>
            </section>

            {/* Balance Section */}
            <section id="balance" className="scroll-mt-24">
              <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Balance
              </h1>
              <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Request current Kotulapay balance.
              </p>

              {/* Receive Balance */}
              <div id="balance-receive" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Receive Balance
                </h2>

                {selectedLanguage === 'Java' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="java"
                      code={`OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("https://business.kotulapay.com/api/v1/balance?currency=CNY")
  .get()
  .addHeader("content-type", "application/json")
  .addHeader("authorization", "Bearer merchant_private_key")
  .build();

Response response = client.newCall(request).execute();`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "result": 0,
  "status": 200,
  "errors": [],
  "wallet": {
    "available": 0,
    "hold": 0,
    "currency": "CNY"
  }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'PHP' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="php"
                      code={`<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://business.kotulapay.com/api/v1/balance?currency=CNY",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "authorization: Bearer merchant_private_key",
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "result": 0,
  "status": 200,
  "errors": [],
  "wallet": {
    "available": 0,
    "hold": 0,
    "currency": "CNY"
  }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'Python' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="python"
                      code={`from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
import requests
import json

def balance(request) :

    MERCHANT_PRIVATE_KEY = 'merchant_private_key'
    SANDBOX_URL = 'https://business.kotulapay.com'

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }
    resp = requests.get('%s/api/v1/balance' % (SANDBOX_URL), params = {'currency':'CNY'}, headers=headers)

    if resp.status_code == 200:
        resp_o = json.loads(resp.text)
        return HttpResponse('<html><body><span>Your balance %s</body></html>' % (resp_o['wallet']['available']))
    else:
        return HttpResponse('<html><body><span>Something gone wrong: %s</span> : %s</body></html>' % (resp.status_code, resp.text))`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "result": 0,
  "status": 200,
  "errors": [],
  "wallet": {
    "available": 0,
    "hold": 0,
    "currency": "CNY"
  }
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'cURL' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="bash"
                      code={`curl "https://business.kotulapay.com/api/v1/balance?currency=CNY" \\
    -X GET \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json"`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "result": 0,
  "status": 200,
  "errors": [],
  "wallet": {
    "available": 0,
    "hold": 0,
    "currency": "CNY"
  }
}`}
                    />
                  </>
                )}

                <p className={`mt-6 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Receiving the balance for a business account. Balance is returned as an object displaying available and pending amounts. Balances shown may not be released and/or processed.
                </p>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  The <code className={`px-1.5 py-0.5 rounded text-sm ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>errors</code> field may not be present in the response.
                </p>

                <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  HTTP Request via SSL
                </p>
                <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  GET '/api/v1/balance'
                </p>

                <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Query Parameters
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Description']}
                  rows={[
                    ['currency', 'Currency code (CNY)'],
                  ]}
                />
              </div>

              {/* Section Divider */}
              <div className="mt-16 mb-8">
                <hr className={`border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`} />
              </div>
            </section>

            {/* Disputes Section */}
            <section id="disputes" className="scroll-mt-24">
              <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Disputes
              </h1>
              <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Request current Kotulapay dispute list.
              </p>

              {/* Dispute list */}
              <div id="disputes-list" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Dispute list
                </h2>

                {selectedLanguage === 'Java' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="java"
                      code={`OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("https://business.kotulapay.com/api/v1/disputes")
  .get()
  .addHeader("content-type", "application/json")
  .addHeader("authorization", "Bearer merchant_private_key")
  .build();

Response response = client.newCall(request).execute();`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true,
    "status": 200,
    "disputes": [
        {
            "id": 27,
            "amount": 2,
            "currency": "USD",
            "investigation_report": null,
            "status": "processing",
            "merchant_profile_id": 3,
            "user_profile_id": 3,
            "feed_id": 330,
            "created_at": "2019-09-13T08:46:21.302Z",
            "updated_at": "2019-09-13T08:46:21.343Z",
            "dispute_type": 2,
            "reason_code": "123",
            "comment": "some comment"
        }
    ]
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'PHP' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="php"
                      code={`<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://business.kotulapay.com/api/v1/disputes",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "authorization: Bearer merchant_private_key",
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true,
    "status": 200,
    "disputes": [
        {
            "id": 27,
            "amount": 2,
            "currency": "USD",
            "investigation_report": null,
            "status": "processing",
            "merchant_profile_id": 3,
            "user_profile_id": 3,
            "feed_id": 330,
            "created_at": "2019-09-13T08:46:21.302Z",
            "updated_at": "2019-09-13T08:46:21.343Z",
            "dispute_type": 2,
            "reason_code": "123",
            "comment": "some comment"
        }
    ]
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'Python' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="python"
                      code={`from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
import requests
import json

def disputes(request) :

    MERCHANT_PRIVATE_KEY = 'merchant_private_key'
    SANDBOX_URL = 'https://business.kotulapay.com'

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }
    resp = requests.get('%s/api/v1/disputes' % (SANDBOX_URL), headers=headers)`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true,
    "status": 200,
    "disputes": [
        {
            "id": 27,
            "amount": 2,
            "currency": "USD",
            "investigation_report": null,
            "status": "processing",
            "merchant_profile_id": 3,
            "user_profile_id": 3,
            "feed_id": 330,
            "created_at": "2019-09-13T08:46:21.302Z",
            "updated_at": "2019-09-13T08:46:21.343Z",
            "dispute_type": 2,
            "reason_code": "123",
            "comment": "some comment"
        }
    ]
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'cURL' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="bash"
                      code={`curl "https://business.kotulapay.com/api/v1/disputes" \\
    -X GET \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json"`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
    "success": true,
    "status": 200,
    "disputes": [
        {
            "id": 27,
            "amount": 2,
            "currency": "USD",
            "investigation_report": null,
            "status": "processing",
            "merchant_profile_id": 3,
            "user_profile_id": 3,
            "feed_id": 330,
            "created_at": "2019-09-13T08:46:21.302Z",
            "updated_at": "2019-09-13T08:46:21.343Z",
            "dispute_type": 2,
            "reason_code": "123",
            "comment": "some comment"
        }
    ]
}`}
                    />
                  </>
                )}

                <p className={`mt-6 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Getting a list of last disputes for a business account.
                </p>

                <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  HTTP Request via SSL
                </p>
                <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  GET '/api/v1/disputes'
                </p>

                <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Query Parameters
                </h3>
                <p className={`mb-3 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Returns 100 latest records</p>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description']}
                  rows={[
                    ['status', 'no', 'Dispute status for filter [approved/pending/declined]'],
                    ['date', 'no', 'Date for filter'],
                    ['requisite', 'no', 'Requisite for filter'],
                    ['device', 'no', 'Device for filter'],
                  ]}
                />
              </div>

              {/* Create a dispute */}
              <div id="disputes-create" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Create a dispute
                </h2>

                {selectedLanguage === 'Java' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="java"
                      code={`MediaType JSON = MediaType.parse("application/json; charset=utf-8");

HashMap<String, Object> params = new HashMap<String, Object>();

params.put("token", "XsKkj4kmSjNATwoJdoiwwCmEKbT5efZX");
params.put("description", "test description");
params.put("document", "/home/test/Pictures/Screenshot from 2024-04-12 17-38-19.png");

OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
       .url("https://business.kotulapay.com/api/v1/disputes")
       .post(RequestBody.create(JSON, new Gson().toJson(params)))
       .addHeader("content-type", "application/json")
       .addHeader("authorization", "Bearer merchant_private_key")
       .build();

Call call = client.newCall(request);

call.enqueue(new Callback() {

   @Override
   public void onFailure(Call call, IOException e) {
       Log.e("response ", "onFailure(): " + e.getMessage() );
   }

   @Override
   public void onResponse(Call call, Response response) throws IOException {
       String resp = response.body().string();
       Log.e("response ", "onResponse(): " + resp );
   }
});`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "result": 0,
  "status": 200
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'PHP' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="php"
                      code={`<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://business.kotulapay.com/api/v1/disputes",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{ \\"token\\" : \\"XsKkj4kmSjNATwoJdoiwwCmEKbT5efZX\\", \\"description\\" : \\"test description\\", \\"document\\" : \\"/home/test/Pictures/screenshot.png\\"}",
  CURLOPT_HTTPHEADER => array(
    "authorization: Bearer merchant_private_key",
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "result": 0,
  "status": 200
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'Python' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="python"
                      code={`from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
import requests
import json

def payout(request) :

    MERCHANT_PRIVATE_KEY = 'your-merchant-private-key'
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "token" : "XsKkj4kmSjNATwoJdoiwwCmEKbT5efZX",
        "description" : "test description",
        "document": "/home/test/Pictures/Screenshot from 2024-04-12 17-38-19.png"
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }

    resp = requests.post('%s/api/v1/disputes' % (SANDBOX_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_o = json.loads(resp.text)
        return HttpResponseRedirect(resp_o['status'])
    else:
        return HttpResponse('<html><body><span>Something gone wrong: %s</span> : %s</body></html>' % (resp.status_code, resp.text))`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "result": 0,
  "status": 200
}`}
                    />
                  </>
                )}

                {selectedLanguage === 'cURL' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="bash"
                      code={`curl "https://business.kotulapay.com/api/v1/disputes" \\
    -X POST \\
    -H "Authorization: Bearer merchant_private_key" \\
    --header 'Content-Type: application/json' \\
    --form 'token="XsKkj4kmSjNATwoJdoiwwCmEKbT5efZX"' \\
    --form 'description="test description"' \\
    --form 'document=@"/home/test/Pictures/Screenshot from 2024-04-12 17-38-19.png"'`}
                    />

                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Return status 200 and JSON:
                    </p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{
  "success": true | false,
  "result": 0,
  "status": 200
}`}
                    />
                  </>
                )}

                <p className={`mt-6 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Create a dispute.
                </p>

                <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  HTTP Request via SSL
                </p>
                <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  POST '/api/v1/disputes'
                </p>

                <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Query Parameters
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Parameter', 'Mandatory', 'Description']}
                  rows={[
                    ['token', 'yes', 'Payment token'],
                    ['description', 'yes', 'Description for dispute'],
                    ['document', 'yes', 'Payment receipt for dispute'],
                    ['amount', 'no', 'Amount for dispute'],
                  ]}
                />
              </div>

              {/* Section Divider */}
              <div className="mt-16 mb-8">
                <hr className={`border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`} />
              </div>
            </section>

            {/* Notification Section */}
            <section id="notification" className="scroll-mt-24">
              <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Notification
              </h1>
              <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Notifications with the payment or payout status are sent to your callback URL using POST methods. In case payment or payout status changed (pending/approved/declined) — notification type is sent accordingly.
              </p>

              <CodeBlock
                isDarkMode={isDarkMode}
                language={selectedLanguage}
                code={
                  selectedLanguage === 'Python'
                    ? `from django.views.decorators.csrf import csrf_exempt\nfrom django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound\n\n@csrf_exempt\ndef notifyme(request) :\n    req_o = json.loads(request.read());\n    return HttpResponse('Status is:%s' % (req_o['status']))`
                    : `Params:\n\n{\n  "token": "payment token",\n  "type": "payment type: payment | payout",\n  "status" : "payment status: pending | approved | declined ",\n  "extraReturnParam" : "extra params",\n  "orderNumber" : "merchant order number",\n  "walletToken": "payer's Kotulapay wallet unique identifier, only for Kotulapay payments",\n  "recurringToken": "payer's previously initialized recurring token, for making recurrent payment repeatedly",\n  "sanitizedMask": "payer's sanitized card, if it was provided",\n  "amount": "payment amount in cents",\n  "currency": "payment currency",\n  "gatewayAmount": "exchanged amount in cents",\n  "gatewayCurrency": "exchanged currency"\n}`
                }
              />

              <div className="mt-4 mb-4 flex items-center gap-3 rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3">
                <Info className="h-4 w-4 shrink-0 text-yellow-700" />
                <p className="text-sm font-bold text-yellow-800"><code className="font-mono font-bold">callback</code> can be configured in the company's back office.</p>
              </div>
              <div className="mb-8 flex items-center gap-3 rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3">
                <Info className="h-4 w-4 shrink-0 text-yellow-700" />
                <p className="text-sm font-bold text-yellow-800">We define a notification as "successfully being sent" only in the case that your server responded with a 200 HTTP status code. If your server responded any error codes, we schedule recursive callbacks within a 1 hour interval, but not more than 9 times.</p>
              </div>

              {/* Banking notification */}
              <div id="notification-banking" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Banking notification
                </h2>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Notifications with the account or transfer status are sent to your callback URL using POST methods. In case account status is changed, a notification will be sent accordingly.
                </p>

                <CodeBlock
                  isDarkMode={isDarkMode}
                  language={selectedLanguage}
                  code={
                    selectedLanguage === 'Python'
                      ? `from django.views.decorators.csrf import csrf_exempt\nfrom django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound\n\n@csrf_exempt\ndef notifyme(request) :\n    req_o = json.loads(request.read());\n    return HttpResponse('Status is:%s' % (req_o['status']))`
                      : `Params:\n\n{\n  "subject": "account | transfer | compliance",\n  "token": "transfer token | profile token",\n  "status": "approved | pending | declined",\n  "message" : "any comments from the system operator",\n  "data" : {\n      "account": {\n          "number" : "IBAN or account number",\n          "swift" : "valid SWIFT code"\n      }, //or\n      "transfer": {\n            "token": "payment token",\n            "updated-at": "2020-01-01 00:00:01",\n            "created-at": "2020-01-01 00:00:00",\n            "status": "pending",\n            "name_from": "Mike Z.",\n            "name_to": "Johny Depp",\n            "operation_type": "payout",\n            "payload": {\n                "amount": "10000",\n                "currency": "USD",\n                "account_from": "account number",\n                "account_to": "account number"\n            },\n            "bank_info": {\n                "ref_number": "bank ref number",\n                "extra_data": "some bank data"\n            }\n      }, //or\n      "compliance": {\n          "compliance_status":"documents_required | pending | approved  | declined"\n      }\n  }\n}`
                  }
                />

                <div className="mt-4 mb-3 flex items-center gap-3 rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3">
                  <Info className="h-4 w-4 shrink-0 text-yellow-700" />
                  <p className="text-sm font-bold text-yellow-800"><code className="font-mono font-bold">callback</code> can be configured in the company's back office or sent as a value of <code className="font-mono font-bold">callback_url</code> parameter.</p>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3">
                  <Info className="h-4 w-4 shrink-0 text-yellow-700" />
                  <p className="text-sm font-bold text-yellow-800">We define a notification as "successfully being sent" only in the case that your server responded with a 200 HTTP status code. If your server responded any error codes, we schedule recursive callbacks within a 1 hour interval, but not more than 9 times.</p>
                </div>
              </div>

              {/* Section Divider */}
              <div className="mt-16 mb-8">
                <hr className={`border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`} />
              </div>
            </section>

            {/* Dictionaries Section */}
            <section id="dictionaries" className="scroll-mt-24">
              <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Dictionaries
              </h1>
              <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {/* Content will be added here */}
              </p>

              {/* Errors */}
              <div id="dictionaries-errors" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Errors
                </h2>
                <p className={`mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  If any method failed, the JSON response with status code 403/502 returned that specified the problem.
                </p>
                <p className={`mb-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Return status 403 and JSON:</p>
                <div className={`rounded-lg overflow-hidden mb-4 ${isDarkMode ? 'bg-[#161b22] border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
                  <div className={`px-4 py-2 border-b text-xs font-mono ${isDarkMode ? 'border-gray-700 bg-[#0d1117] text-gray-400' : 'border-gray-200 bg-gray-100 text-gray-600'}`}>JSON</div>
                  <div className="p-4 space-y-1 font-mono text-sm overflow-x-auto">
                    {[
                      `{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'merchant_not_found', 'kind': 'api_error'}]}`,
                      `{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'user_not_found', 'kind': 'api_error'}]}`,
                      `{'success': false, 'result': 1, 'status': 502, 'errors': [{'code': 'fetch_processing_url_error', 'kind': 'api_error'}]}`,
                      `{'success': false, 'result': 1, 'status': 502, 'errors': [{'code': 'invalid_json', 'kind': 'api_error'}]}`,
                      `{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'balance_less_than_amount', 'kind': 'processing_error'}]}`,
                      `{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'absent_keys:pay/payout', 'kind': 'settings_error'}]}`,
                      `{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'absent_keys:currency', 'kind': 'settings_error'}]}`,
                      `{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'auth_header_not_found', 'kind': 'authentication_error'}]}`,
                      `{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'unknown_auth_header', 'kind': 'authentication_error'}]}`,
                      `{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'amount_less_than_minimum', 'kind': 'invalid_request_error'}]}`,
                      `{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'customer_email_not_found', 'kind': 'invalid_request_error'}]}`,
                      `{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'absent_host2host_mode', 'kind': 'invalid_request_error'}]}`,
                      `{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'payment_in_final_state', 'kind': 'invalid_request_error'}]}`,
                      `{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'payment_not_found', 'kind': 'invalid_request_error'}]}`,
                      `{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'settings_are_absent', 'kind': 'invalid_request_error'}]}`,
                    ].map((line, i) => (
                      <div key={i} className={isDarkMode ? 'text-[#c5e063]/80' : 'text-[#04403a]'}>{line}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payment states */}
              <div id="dictionaries-payment-states" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Payment states
                </h2>
                <div className={`overflow-x-auto rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                        <th className={`px-4 py-3 text-left font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>State</th>
                        <th className={`px-4 py-3 text-left font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Final</th>
                        <th className={`px-4 py-3 text-left font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { state: 'init', final: 'no', description: 'Request to API will initiate payments.' },
                        { state: 'pending', final: 'no', description: 'User redirected to the Kotulapay Checkout facility during processing.' },
                        { state: 'approved', final: 'yes', description: 'Successfully completed payment.' },
                        { state: 'declined', final: 'yes', description: 'Unsuccessful payment.' },
                        { state: 'expired', final: 'no', description: 'The transaction has expired due to timeout but may still be processed.' },
                      ].map((row, i) => (
                        <tr key={i} className={`border-b ${isDarkMode ? 'border-gray-700/50 hover:bg-gray-800/30' : 'border-gray-100 hover:bg-gray-50'}`}>
                          <td className="px-4 py-3"><code className={`px-2 py-0.5 rounded text-sm ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>{row.state}</code></td>
                          <td className="px-4 py-3">{row.final === 'yes' ? <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-500">yes</span> : <span className={`rounded-full px-2 py-0.5 text-xs ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>no</span>}</td>
                          <td className={`px-4 py-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{row.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Kinds of errors */}
              <div id="dictionaries-kinds-of-errors" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Kinds of errors
                </h2>
                <div className={`overflow-x-auto rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                        <th className={`px-4 py-3 text-left font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Kind</th>
                        <th className={`px-4 py-3 text-left font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { kind: 'api_error', description: 'Indicate rare occasions such as an Kotulapay API server technicality.' },
                        { kind: 'authentication_error', description: 'Authentication request failure.' },
                        { kind: 'invalid_request_error', description: 'Invalid parameters which produce invalid requests.' },
                        { kind: 'processing_error', description: 'Processing the payment generated an error.' },
                        { kind: 'settings_error', description: 'Incorrect settings.' },
                        { kind: 'gateway_error', description: 'Gateway responded with an error.' },
                        { kind: 'http_error', description: 'HTTP/HTTPS error.' },
                      ].map((row, i) => (
                        <tr key={i} className={`border-b ${isDarkMode ? 'border-gray-700/50 hover:bg-gray-800/30' : 'border-gray-100 hover:bg-gray-50'}`}>
                          <td className="px-4 py-3"><code className={`px-2 py-0.5 rounded text-sm ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>{row.kind}</code></td>
                          <td className={`px-4 py-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{row.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Codes of errors */}
              <div id="dictionaries-codes-of-errors" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Codes of errors
                </h2>
                {[
                  { title: 'Api errors', codes: [
                    { code: 'merchant_not_found', final: 'yes', description: 'No merchant found with this token.' },
                    { code: 'fetch_processing_url_error', final: 'no', description: 'Failed to fetch processing URL.' },
                    { code: 'invalid_json', final: 'no', description: 'Invalid JSON from provider.' },
                    { code: 'user_not_found', final: 'yes', description: 'No information found about the merchant with merchant_private_key.' },
                    { code: 'card_token_is_blank', final: 'no', description: 'Card token is blank.' },
                    { code: 'payment_already_has_pending_dispute', final: 'yes', description: 'Payment already has a pending dispute.' },
                    { code: 'content_type_not_allowed', final: 'no', description: 'Request content_type not allowed.' },
                    { code: 'requisite_not_found', final: 'yes', description: 'Required requisite not found.' },
                    { code: 'action_skipped_due_to_debounce', final: 'no', description: 'Action skipped due to debounce.' },
                    { code: 'core_api_error', final: 'no', description: 'Core API returned error.' },
                    { code: 'no_route_match', final: 'yes', description: 'No route match for request.' },
                    { code: 'order_number_already_exists', final: 'yes', description: 'Repeating an order of already identified order number.' },
                  ]},
                  { title: 'Settings errors', codes: [
                    { code: 'absent_keys:pay/payout', final: 'no', description: 'Absent pay or payout key.' },
                    { code: 'absent_keys:currency', final: 'no', description: 'Absent or incorrect currency value.' },
                    { code: 'settings_are_absent', final: 'yes', description: 'Absent settings.' },
                    { code: 'settings_for_placeholder_are_absent', final: 'yes', description: 'Settings for <...> are absent (placeholder for provider-specific key).' },
                  ]},
                  { title: 'Authentication errors', codes: [
                    { code: 'auth_header_not_found', final: 'no', description: 'Absent Authorization key.' },
                    { code: 'unknown_auth_header', final: 'no', description: 'Unknown or invalid Authorization header.' },
                    { code: 'incorrect_private_key', final: 'no', description: 'The current private key cannot identify the user.' },
                  ]},
                  { title: 'Invalid request errors', codes: [
                    { code: 'amount_less_than_minimum', final: 'no', description: 'Minimum payout amount has not been requested.' },
                    { code: 'customer_email_not_found', final: 'no', description: 'Absent customer email.' },
                    { code: 'absent_host2host_mode', final: 'no', description: 'Absent allow_host2host=true in settings when making request without card.' },
                    { code: 'payment_in_final_state', final: 'yes', description: 'Payment has final status.' },
                    { code: 'payment_not_found', final: 'yes', description: 'Payment not found.' },
                    { code: 'token_description_document_are_required', final: 'no', description: 'Required params [:token, :description, :document] are missing.' },
                    { code: 'filtered_traders_is_missing', final: 'no', description: 'Required param filtered_traders is missing.' },
                    { code: 'bank_name_is_not_valid_choice', final: 'no', description: 'bank_name value not in allowed list.' },
                  ]},
                  { title: 'Processing errors', codes: [
                    { code: 'balance_less_than_amount', final: 'no', description: 'Payout cannot be completed due to insufficient funds.' },
                    { code: 'cant_create_dispute', final: 'yes', description: 'Cannot create dispute.' },
                    { code: 'amount_no_money', final: 'yes', description: 'Insufficient funds.' },
                    { code: 'no_money_available_on_refund', final: 'yes', description: 'No money available on refund.' },
                    { code: 'commission_not_received', final: 'yes', description: 'Commission not received.' },
                    { code: 'incorrect_amount', final: 'no', description: 'Absent or incorrect amount value.' },
                  ]},
                  { title: 'Gateway errors', codes: [
                    { code: 'gateway_response_error: error', final: 'no', description: 'General gateway error.' },
                    { code: 'gateway_response_error: unsupported_traffic', final: 'yes', description: 'Unsupported traffic type by gateway.' },
                    { code: 'gateway_response_error: type_pay_card_is_not_a_valid_choice', final: 'yes', description: 'Invalid value for type_pay / card choice.' },
                    { code: 'gateway_response_error: not_found_rate', final: 'yes', description: 'Rate not found in gateway.' },
                    { code: 'gateway_response_error: trader_not_found', final: 'yes', description: 'Trader not found in gateway.' },
                    { code: 'gateway_response_error: change_of_amount_is_not_supported', final: 'yes', description: 'Change of amount not supported by gateway.' },
                  ]},
                  { title: 'HTTP errors', codes: [
                    { code: 'http_422_filtered_traders_is_missing', final: 'no', description: '422 response: filtered_traders is missing.' },
                    { code: 'http_422_bank_name_is_not_in_allowed_list', final: 'no', description: '422 response: bank_name not in allowed list.' },
                  ]},
                ].map((group, gi) => (
                  <div key={gi} className="mb-8">
                    <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-[#c5e063]' : 'text-[#04403a]'}`}>{group.title}</h3>
                    <div className={`overflow-x-auto rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className={`border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                            <th className={`px-4 py-3 text-left font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>State</th>
                            <th className={`px-4 py-3 text-left font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Final</th>
                            <th className={`px-4 py-3 text-left font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.codes.map((row, ci) => (
                            <tr key={ci} className={`border-b ${isDarkMode ? 'border-gray-700/50 hover:bg-gray-800/30' : 'border-gray-100 hover:bg-gray-50'}`}>
                              <td className="px-4 py-3"><code className={`px-2 py-0.5 rounded text-xs ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>{row.code}</code></td>
                              <td className="px-4 py-3">{row.final === 'yes' ? <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-500">yes</span> : <span className={`rounded-full px-2 py-0.5 text-xs ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>no</span>}</td>
                              <td className={`px-4 py-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{row.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>

              {/* Section Divider */}
              <div className="mt-16 mb-8">
                <hr className={`border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`} />
              </div>
            </section>

            {/* Operators Section */}
            <section id="operators" className="scroll-mt-24">
              <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Operators
              </h1>

              {/* Operator */}
              <div id="operators-operator" className="scroll-mt-24">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Operator
                </h2>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Return operator by phone.
                </p>
                <div className={`inline-flex items-center gap-3 rounded-lg border px-4 py-2 mb-6 ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                  <span className="rounded bg-blue-500 px-2 py-0.5 font-mono text-xs font-bold text-white">GET</span>
                  <code className={`font-mono text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>/api/v1/operator</code>
                </div>
                <CodeBlock
                  isDarkMode={isDarkMode}
                  language={selectedLanguage}
                  code={
                    selectedLanguage === 'Python'
                      ? `from django.shortcuts import render\nfrom django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound\nfrom django.views.decorators.csrf import csrf_exempt\nimport requests\nimport json\n\ndef operator(request) :\n\n    MERCHANT_PRIVATE_KEY = 'merchant-private-key'\n    LIVE_URL = 'https://business.kotulapay.com';\n    SANDBOX_URL = 'https://business.kotulapay.com'\n\n    headers = {\n        'Content-Type': 'application/json',\n        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)\n    }\n    resp = requests.get('%s/api/v1/operator?phone=77775415544' % (SANDBOX_URL), headers=headers)`
                      : selectedLanguage === 'PHP'
                      ? `<?php\n\n$curl = curl_init();\n\ncurl_setopt_array($curl, array(\n  CURLOPT_URL => "https://business.kotulapay.com/api/v1/operator?phone=77775415544",\n  CURLOPT_RETURNTRANSFER => true,\n  CURLOPT_ENCODING => "",\n  CURLOPT_MAXREDIRS => 10,\n  CURLOPT_TIMEOUT => 30,\n  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,\n  CURLOPT_CUSTOMREQUEST => "GET",\n  CURLOPT_HTTPHEADER => array(\n    "authorization: Bearer merchant_private_key",\n    "content-type: application/json"\n  ),\n));\n\n$response = curl_exec($curl);\n$err = curl_error($curl);\n\ncurl_close($curl);\n\nif ($err) {\n  echo "cURL Error #:" . $err;\n} else {\n  echo $response;\n}`
                      : selectedLanguage === 'Java'
                      ? `OkHttpClient client = new OkHttpClient();\n\nRequest request = new Request.Builder()\n.url("https://business.kotulapay.com/api/v1/operator?phone=77775415544")\n.get()\n.addHeader("content-type", "application/json")\n.addHeader("authorization", "Bearer merchant_private_key")\n.build();\n\nResponse response = client.newCall(request).execute();`
                      : `curl "https://business.kotulapay.com/api/v1/operator?phone=77775415544" \\\n    -H "Authorization: Bearer merchant_private_key"`
                  }
                />
                <p className={`mt-4 mb-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Return status 200 and JSON:</p>
                <CodeBlock
                  isDarkMode={isDarkMode}
                  language="json"
                  code={`{\n  "success": true | false,\n  "status": 200,\n  "operator": "beeline"\n}`}
                />
                <p className={`mt-6 mb-4 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>HTTP Request via SSL</p>
                <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>GET '/api/v1/operator'</p>
                <p className={`mb-3 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Query Parameters</p>
                <div className={`overflow-x-auto rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                        <th className={`px-4 py-3 text-left font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Parameter</th>
                        <th className={`px-4 py-3 text-left font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Mandatory</th>
                        <th className={`px-4 py-3 text-left font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={`border-b ${isDarkMode ? 'border-gray-700/50' : 'border-gray-100'}`}>
                        <td className="px-4 py-3"><code className={`px-2 py-0.5 rounded text-sm ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>phone</code></td>
                        <td className="px-4 py-3"><span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-500">yes</span></td>
                        <td className={`px-4 py-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone number.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section Divider */}
              <div className="mt-16 mb-8">
                <hr className={`border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`} />
              </div>
            </section>

            {/* Gateway Connect Section */}
            <section id="gateway-connect" className="scroll-mt-24">
              <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Gateway.Connect
              </h1>
              <p className={`text-lg leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Gateway.Connect is an integration layer that allows external payment providers to connect directly with the Kotulapay processing infrastructure. It supports two integration models: <strong className={isDarkMode ? 'text-white' : 'text-gray-900'}>H2H (Host-to-Host)</strong> and <strong className={isDarkMode ? 'text-white' : 'text-gray-900'}>P2P (Peer-to-Peer)</strong>.
              </p>
              <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                These settings govern parameter formatting, define permitted fields, and specify behavior for each payment method.
              </p>

              {/* H2H: Flow of Payments */}
              <div id="gateway-connect-h2h-flow" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  H2H: Flow of Payments
                </h2>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Payment flow
                </p>
                <img
                  src={h2hFlowImage}
                  alt="H2H Flow of Payments diagram"
                  className="mt-6 w-full rounded-lg border border-gray-700"
                />
              </div>

              {/* H2H: Diagram of Payment Flow */}
              <div id="gateway-connect-h2h-diagram" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  H2H: Diagram of Payment Flow
                </h2>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Payment flow
                </p>
                <img
                  src={h2hDiagramImage}
                  alt="H2H Diagram of Payment Flow"
                  className="mt-6 w-full rounded-lg border border-gray-700"
                />
              </div>

              {/* H2H: Required Endpoints */}
              <div id="gateway-connect-h2h-endpoints" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  H2H: Required Endpoints
                </h2>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  The external service must respond to the following endpoints:
                </p>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Path', 'Method', 'Description']}
                  rows={[
                    ['/pay', 'POST', 'Payment initiation'],
                    ['/payout', 'POST', 'Payout'],
                    ['/refund', 'POST', 'Refund'],
                    ['/status', 'POST', 'Transaction status'],
                    ['/confirm_secure_code', 'POST', '3DS confirmation'],
                    ['/resend_otp', 'POST', 'OTP confirmation'],
                    ['/next_payment_step', 'POST', 'Additional async steps in 3DS'],
                  ]}
                />
              </div>

              {/* H2H: Payment */}
              <div id="gateway-connect-h2h-payment" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  H2H: Payment
                </h2>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Request structure. The <code className={`px-1.5 py-0.5 rounded text-sm ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>params</code> object contains the following keys:
                </p>
                <ul className={`mb-6 space-y-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {[
                    ['settings', 'general gateway or environment settings'],
                    ['params', 'payment method data (e.g. cardholder info, browser data, etc.)'],
                    ['payment', 'payment-specific information (amount, currency, redirect URLs, token)'],
                    ['processing_url', 'internal redirect URL after 3DS'],
                    ['callback_url', 'URL where the payment result callback will be sent'],
                    ['callback_3ds_url', '3DS-specific callback URL after challenge or fingerprinting'],
                    ['method_name', 'action to be performed (e.g. "pay")'],
                  ].map(([key, desc]) => (
                    <li key={key} className="flex items-start gap-2">
                      <code className={`mt-0.5 shrink-0 px-1.5 py-0.5 rounded text-sm ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>{key}</code>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>

                {(selectedLanguage === 'cURL' || selectedLanguage === 'Python' || selectedLanguage === 'PHP' || selectedLanguage === 'Java') && (
                  <CodeBlock
                    isDarkMode={isDarkMode}
                    language="json"
                    code={`{
  "settings": {
    "sandbox": true
  },
  "params": {
    "pan": "4392963203551251",
    "expires": "08/2025",
    "holder": "John Doe",
    "cvv": "196",
    "email": "50-18@gmail.com",
    "country": "AU",
    "city": "Transmetropolitan",
    "state": "AU",
    "phone": "+77022579074",
    "browser": {
      "accept_header": "application/json, text/plain, */*",
      "color_depth": "32",
      "ip": "109.48.0.1",
      "language": "us-US",
      "screen_height": "1080",
      "screen_width": "1920",
      "tz": "-180",
      "user_agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:92.0)",
      "java_enabled": "true",
      "window_width": "1240",
      "window_height": "560"
    },
    "first_name": "Test",
    "last_name": "Test2",
    "extra_return_param": "_blank_"
  },
  "payment": {
    "redirect_success_url": "https://success.com/?token=4gbk3dVf8QbdVp7KWCbKvHtgfXKtSWCk&type=pay&status=approve...",
    "redirect_fail_url": "https://declined.com/?token=4gbk3dVf8QbdVp7KWCbKvHtgfXKtSWCk&type=pay&status=declined...",
    "token": "4gbk3dVf8QbdVp7KWCbKvHtgfXKtSWCk",
    "gateway_amount": 100000,
    "gateway_currency": "EUR"
  },
  "processing_url": "http://business:4000/checkout_results/<token>/processing",
  "callback_url": "http://business:4000/callbacks/v2/gateway_callbacks/<token>",
  "callback_3ds_url": "http://business:4000/checkout_results/<token>/callback_3ds",
  "method_name": "pay"
}`}
                  />
                )}

                <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Available parameter fields
                </h3>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Below is a list of possible parameters that may be included in the <code className={`px-1.5 py-0.5 rounded text-sm ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>params</code> object for an external application.
                </p>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Field', 'Type', 'Description']}
                  rows={[
                    ['pan', 'String', 'Card PAN'],
                    ['expires', 'String', 'Card expiration date'],
                    ['holder', 'String', 'Card holder name'],
                    ['cvv', 'String', 'Card CVV code'],
                    ['email', 'String', 'Customer email'],
                    ['country', 'String', 'Customer country'],
                    ['city', 'String', 'Customer city'],
                    ['state', 'String', 'Customer state'],
                    ['postcode', 'String', 'Customer postal code'],
                    ['street', 'String', 'Customer street address'],
                    ['address', 'String', 'Customer address'],
                    ['region', 'String', 'Customer region'],
                    ['phone', 'String', 'Customer phone number'],
                    ['otp', 'String', 'One-time password'],
                    ['pin', 'String', 'Personal identification number'],
                    ['bank_code', 'String', 'Bank code'],
                    ['bank_account_number', 'String', 'Bank account number'],
                    ['identify_type', 'String', 'Identification type'],
                    ['identify_number', 'String', 'Identification number'],
                    ['recurring', 'Boolean', 'Recurring payment flag'],
                    ['need_confirmation', 'Boolean', 'Confirmation requirement'],
                    ['browser', 'Object', 'Browser data (JSON object)'],
                    ['country_code', 'String', 'Customer country code'],
                    ['first_name', 'String', 'Customer first name'],
                    ['father_name', 'String', "Customer father's name"],
                    ['last_name', 'String', 'Customer last name'],
                    ['website', 'String', 'Customer website'],
                    ['birthday', 'String', 'Customer birthday'],
                    ['recurring_data', 'Object', 'Recurring payment data'],
                    ['pending_url', 'String', 'URL for pending payments'],
                    ['extra_return_param', 'String', 'Extra return parameter'],
                  ]}
                />

                <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Available payment fields
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Field', 'Type', 'Description']}
                  rows={[
                    ['id', 'Integer', 'Payment ID (not used)'],
                    ['status', 'String', 'Payment status'],
                    ['token', 'String', 'Internal payment token'],
                    ['currency', 'String', 'Origin payment currency'],
                    ['product', 'String', 'Product name'],
                    ['callback_url', 'String', 'Merchant callback URL'],
                    ['redirect_success_url', 'String', 'URL for successful payment redirect'],
                    ['redirect_fail_url', 'String', 'URL for failed payment redirect'],
                    ['redirect_request', 'String', 'URL for redirect request (not used)'],
                    ['merchant_private_key', 'String', 'Private key for Merchant record'],
                    ['amount', 'Integer', 'Payment amount'],
                    ['gatewayable_type', 'String', 'Name of gateway (e.g., Gateway::TestpayPayment)'],
                    ['gatewayable_id', 'Integer', 'ID of gateway record'],
                    ['created_at', 'Datetime', 'Payment creation date'],
                    ['updated_at', 'Datetime', 'Payment update date'],
                    ['extra_return_param', 'String', 'Extra return parameter'],
                    ['operation_type', 'String', 'Payment operation type (e.g., pay, refund, payout)'],
                    ['order_number', 'String', 'Merchant order number'],
                    ['declination_reason', 'String', 'Reason for payment declination'],
                    ['lead_id', 'Integer', 'ID of the lead record'],
                    ['ip', 'String', 'Customer IP address'],
                    ['browser_info', 'String', 'Browser information'],
                    ['bank_card_id', 'Integer', 'ID of the bank card record'],
                    ['kind', 'String', 'Payment kind (e.g., wallet, direct)'],
                    ['refund_id', 'Integer', 'ID of the refund payment record'],
                    ['scoring_remark', 'String', 'Scoring remark'],
                    ['country_code_by_BIN', 'String', 'Country code by BIN (e.g., US)'],
                    ['country_code_by_phone', 'String', 'Country code by phone (e.g., US)'],
                    ['country_code_by_IP', 'String', 'Country code by IP (e.g., US)'],
                    ['business_account_legal_name', 'String', 'Business account legal name from merchant core settings'],
                    ['business_account_profileID', 'String', 'Business account profile ID from merchant core settings'],
                    ['card_masked_number', 'String', 'Masked card number (e.g., 1234****234)'],
                    ['gateway_details', 'JSON', 'Gateway-specific details (contains gateway_ids, redirect_request and other data)'],
                    ['gateway_currency', 'String', 'Gateway currency after conversion'],
                    ['gateway_amount', 'Integer', 'Gateway amount after conversion'],
                    ['details', 'JSON', 'Additional details (e.g., request data, error data etc.)'],
                    ['scoring_action', 'String', 'Scoring action (e.g., success)'],
                    ['scoring_action_log', 'JSON', 'Scoring action log (e.g., {riskscore: {...}})'],
                    ['gateway_alias', 'String', 'Gateway alias (e.g., testpay)'],
                    ['card_brand_name', 'String', 'Card brand name (e.g., Visa, MasterCard)'],
                    ['routing_logs', 'JSON', 'Routing logs (e.g., {prev_route: null, next_route...})'],
                    ['gateway_token', 'String', 'External gateway ID (e.g., 123456789)'],
                    ['two_stage_mode', 'Boolean', 'Indicates if the payment is in two-stage mode'],
                    ['settings', 'JSON', 'Payment settings (e.g., {status_checker_time_rates: {...}})'],
                    ['rrn', 'String', 'RRN (Retrieval Reference Number)'],
                    ['commission_data', 'JSON', 'Commission data (e.g., {commission_fee: 10, commission_amount: 10})'],
                    ['notification_settings', 'JSON', 'Notification settings (e.g., {"recipient"=>"test@test.tt", "allow_notification"=>true})'],
                    ['customer_country', 'String', 'Customer country (e.g., US)'],
                    ['trader_id', 'Integer', 'Trader ID (e.g., 123456)'],
                    ['merchant_url', 'String', 'Merchant URL (e.g., http://example.com)'],
                    ['reference', 'String', 'Reference (e.g., 123456789)'],
                    ['locale', 'String', 'Locale (e.g., en-US)'],
                  ]}
                />

                <div className={`px-4 py-3 rounded-lg mt-6 mb-6 ${isDarkMode ? 'bg-yellow-900/20 border border-yellow-700/30' : 'bg-yellow-50 border border-yellow-200'}`}>
                  <p className={`text-sm flex items-start gap-2 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                    <Info className="size-5 flex-shrink-0 mt-0.5" />
                    <span><strong>result</strong> must be either <code className="font-mono">success</code> or <code className="font-mono">declined</code>. If <code className="font-mono">status: approved</code> is returned, the transaction is still not finalised until a callback is received or status is polled.</span>
                  </p>
                </div>

                <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Response Fields
                </h3>

                {(selectedLanguage === 'cURL' || selectedLanguage === 'Python' || selectedLanguage === 'PHP' || selectedLanguage === 'Java') && (
                  <CodeBlock
                    isDarkMode={isDarkMode}
                    language="json"
                    code={`{
  "status": "approved",
  "gateway_token": "4409b224-b1a7-41e5-8216-7c98560f4f08",
  "result": "success",
  "card_3ds_enrolled": true,
  "processingUrl": "http://business:4000/checkout_results/<token>/processing",
  "redirect_request": {
    "url": "http://business:4000/checkout_results/<token>/processing",
    "type": "post_iframes",
    "iframes": [
      {
        "url": "http://test:9090/3ds",
        "data": {
          "creq": "<creq-token>",
          "token": "<token>"
        }
      }
    ]
  },
  "logs": [
    {
      "gateway": "testing",
      "request": {
        "url": "https://some.site",
        "params": {
          "callback_url": "https://test.com",
          "amount": 1234,
          "currency": "USD",
          "extra_return_param": "Tinkoff",
          "order_number": "AutoTest#Payout-5264998"
        }
      },
      "status": 200,
      "response": "{status: \\"OK\\"}",
      "kind": "request",
      "created_at": "2025-05-15T18:21:55+02:00",
      "duration": 0.5
    }
  ]
}`}
                  />
                )}

                <p className={`mt-6 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Response structure:
                </p>
                <ul className={`mb-6 space-y-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {[
                    ['gateway_token', 'External token or ID of the payment'],
                    ['card_enrolled', 'Indicates if the card requires 3DS flow'],
                    ['redirect_request', 'Redirect info required for 3DS payments'],
                    ['logs', 'Request/response logs from the integration'],
                  ].map(([key, desc]) => (
                    <li key={key} className="flex items-start gap-2">
                      <code className={`mt-0.5 shrink-0 px-1.5 py-0.5 rounded text-sm ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>{key}</code>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>

                <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  redirect_request
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Field', 'Type', 'Description', 'Notes']}
                  rows={[
                    ['redirect_request.url', 'String', 'Redirect or iframe processing URL', 'For post_iframes: always /checkout_requests/<token>/processing'],
                    ['redirect_request.type', 'String', 'Determines the redirect logic', 'One of: post_iframes, get_with_processing, get, post, redirect_html'],
                    ['redirect_request.wait_milliseconds', 'Integer', 'Delay before marking payment as processed and triggering next_payment_step asynchronously', 'Optional'],
                    ['redirect_request.params', 'Object', 'Form data (used in all types except post_iframes)', 'Optional'],
                    ['redirect_request.iframes', 'Object', 'Used for post_iframes type only', 'Required for iframe flows'],
                    ['redirect_request.iframes.url', 'String', 'ACS backend URL', 'Required'],
                    ['redirect_request.iframes.data', 'Object', 'Parameters used for fingerprinting and rendering the ACS form', 'Required'],
                  ]}
                />

                <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  logs
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Field', 'Type', 'Description', 'Notes']}
                  rows={[
                    ['logs.request', 'Object', 'Outgoing request sent to the provider', 'Includes headers, body, etc.'],
                    ['logs.response', 'Object', 'Response received from the provider', 'Includes body, status, etc.'],
                    ['logs.status', 'String', 'HTTP status code', 'e.g. "200", "400"'],
                    ['logs.created_at', 'Datetime', 'Timestamp of request creation', 'ISO 8601'],
                    ['logs.updated_at', 'Datetime', 'Timestamp of latest update to the request lifecycle', 'ISO 8601'],
                    ['logs.kind', 'String', 'Name of the endpoint or request type', 'e.g. "pay", "status"'],
                    ['logs.gateway', 'String', 'Name of the integration/gateway', 'Optional'],
                    ['logs.duration', 'Float', 'Duration of the request in seconds', 'Optional'],
                    ['logs.direction', 'String', 'Direction: out for external request, in for callback', 'Required'],
                  ]}
                />

                <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Declined response
                </h3>
                <p className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  HTTP status: Anything but 200
                </p>
                <p className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Error field:
                </p>
                <ul className={`mb-4 space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-center gap-2">
                    <span className="mr-1">•</span>
                    <code className={`px-1.5 py-0.5 rounded text-sm ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>error</code>
                    <span>(String)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="mr-1">•</span>
                    <span>or</span>
                    <code className={`px-1.5 py-0.5 rounded text-sm ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>errors</code>
                    <span>(Array&lt;String&gt;)</span>
                  </li>
                </ul>
              </div>

              {/* H2H: Payout */}
              <div id="gateway-connect-h2h-payout" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  H2H: Payout
                </h2>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Request structure. Payout fields mostly mirror the payment request (see above).
                </p>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  The <code className={`px-1.5 py-0.5 rounded text-sm ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>params</code> object contains the following keys:
                </p>
                <ul className={`mb-6 space-y-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {[
                    ['settings', 'general gateway or environment settings'],
                    ['params', 'payment method data (e.g. cardholder info, browser data, etc.)'],
                    ['payment', 'payment-specific information (amount, currency, redirect URLs, token)'],
                    ['processing_url', 'internal redirect URL after 3DS'],
                    ['callback_url', 'URL where the payment result callback will be sent'],
                    ['callback_3ds_url', '3DS-specific callback URL after challenge or fingerprinting'],
                    ['method_name', 'action to be performed (e.g. "payout")'],
                  ].map(([key, desc]) => (
                    <li key={key} className="flex items-start gap-2">
                      <code className={`mt-0.5 shrink-0 px-1.5 py-0.5 rounded text-sm ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>{key}</code>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>

                {(selectedLanguage === 'cURL' || selectedLanguage === 'Python' || selectedLanguage === 'PHP' || selectedLanguage === 'Java') && (
                  <CodeBlock
                    isDarkMode={isDarkMode}
                    language="json"
                    code={`{
    "params": {
        "card": {
            "pan": "4627342642639018",
            "expires": "04/2022"
        },
        "customer": {
            "email": "test@test.com",
            "address": "Earth",
            "ip": "1.1.1.1"
        },
        "extra_return_param": "123",
        "order_number": "Payout-5264998"
    },
    "payment": {
        "token": "TE8ovE9Bngh8XVzozoLdXwNhQ2F9774L",
        "gateway_amount": 100,
        "gateway_currency": "EUR"
    },
    "settings": {
      "sandbox": true
    },
    "processing_url": "http://business:4000/checkout_results/TE8ovE9Bngh8XVzozoLdXwNhQ2F9774L/processing",
    "callback_url": "http://business:4000/callbacks/v2/gateway_callbacks/TE8ovE9Bngh8XVzozoLdXwNhQ2F9774L",
    "method_name": "payout"
}`}
                  />
                )}

                <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Available parameter fields
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Field', 'Type', 'Description']}
                  rows={[
                    ['card', 'Object', 'Card object (pan, expires)'],
                    ['customer', 'Object', 'Customer object (email, address, ip)'],
                    ['order_number', 'String', 'Merchant order number'],
                    ['extra_return_param', 'String', 'Extra return parameter'],
                  ]}
                />

                <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Available payment fields
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Field', 'Type', 'Description']}
                  rows={[
                    ['id', 'Integer', 'Payment ID (not used)'],
                    ['status', 'String', 'Payment status'],
                    ['token', 'String', 'Internal payment token'],
                    ['currency', 'String', 'Origin payment currency'],
                    ['product', 'String', 'Product name'],
                    ['callback_url', 'String', 'Merchant callback URL'],
                    ['redirect_success_url', 'String', 'URL for successful payment redirect'],
                    ['redirect_fail_url', 'String', 'URL for failed payment redirect'],
                    ['redirect_request', 'String', 'URL for redirect request (not used)'],
                    ['merchant_private_key', 'String', 'Private key for Merchant record'],
                    ['amount', 'Integer', 'Payment amount'],
                    ['gatewayable_type', 'String', 'Name of gateway (e.g., Gateway::TestpayPayment)'],
                    ['gatewayable_id', 'Integer', 'ID of gateway record'],
                    ['created_at', 'Datetime', 'Payment creation date'],
                    ['updated_at', 'Datetime', 'Payment update date'],
                    ['extra_return_param', 'String', 'Extra return parameter'],
                    ['operation_type', 'String', 'Payment operation type (e.g., pay, refund, payout)'],
                    ['order_number', 'String', 'Merchant order number'],
                    ['declination_reason', 'String', 'Reason for payment declination'],
                    ['lead_id', 'Integer', 'ID of the lead record'],
                    ['ip', 'String', 'Customer IP address'],
                    ['kind', 'String', 'Payment kind (e.g., wallet, direct)'],
                    ['refund_id', 'Integer', 'ID of the refund payment record'],
                    ['scoring_remark', 'String', 'Scoring remark'],
                    ['country_code_by_BIN', 'String', 'Country code by BIN (e.g., US)'],
                    ['country_code_by_phone', 'String', 'Country code by phone (e.g., US)'],
                    ['country_code_by_IP', 'String', 'Country code by IP (e.g., US)'],
                    ['business_account_legal_name', 'String', 'Business account legal name from merchant core settings'],
                    ['business_account_profileID', 'String', 'Business account profile ID from merchant core settings'],
                    ['card_masked_number', 'String', 'Masked card number (e.g., 1234****234)'],
                    ['gateway_details', 'JSON', 'Gateway-specific details (contains gateway_ids, redirect_request and other data)'],
                    ['gateway_currency', 'String', 'Gateway currency after conversion'],
                    ['gateway_amount', 'Integer', 'Gateway amount after conversion'],
                    ['details', 'JSON', 'Additional details (e.g., request data, error data etc.)'],
                    ['gateway_alias', 'String', 'Gateway alias (e.g., testpay)'],
                    ['card_brand_name', 'String', 'Card brand name (e.g., Visa, MasterCard)'],
                    ['gateway_token', 'String', 'External gateway ID (e.g., 123456789)'],
                    ['two_stage_mode', 'Boolean', 'Indicates if the payment is in two-stage mode'],
                    ['settings', 'JSON', 'Payment settings (e.g., {status_checker_time_rates: {...}})'],
                    ['rrn', 'String', 'RRN (Retrieval Reference Number)'],
                    ['commission_data', 'JSON', 'Commission data (e.g., {commission_fee: 10, commission_amount: 10})'],
                    ['notification_settings', 'JSON', 'Notification settings (e.g., {"recipient"=>"test@test.tt", "allow_notification"=>true})'],
                    ['customer_country', 'String', 'Customer country (e.g., US)'],
                    ['merchant_url', 'String', 'Merchant URL (e.g., http://example.com)'],
                    ['reference', 'String', 'Reference (e.g., 123456789)'],
                    ['locale', 'String', 'Locale (e.g., en-US)'],
                  ]}
                />

                <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Payout Response
                </h3>

                {(selectedLanguage === 'cURL' || selectedLanguage === 'Python' || selectedLanguage === 'PHP' || selectedLanguage === 'Java') && (
                  <CodeBlock
                    isDarkMode={isDarkMode}
                    language="json"
                    code={`{
  "status": "approved",
  "gateway_token": "f268ae4e-e5b4-451d-a46c-7c7b44d47195",
  "result": "success",
  "processingUrl": "http://business:4000/checkout_results/<token>/processing",
  "logs": [...]
}`}
                  />
                )}

                <p className={`mt-6 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  The response object contains the following keys:
                </p>
                <ul className={`mb-6 space-y-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {[
                    ['status', 'response status (e.g. "ok")'],
                    ['gateway_token', 'unique transaction identifier from the external gateway'],
                    ['result', 'outcome of the transaction (e.g. "success", "declined")'],
                    ['processingUrl', 'internal redirect URL used during processing'],
                    ['logs', 'array of request/response logs related to the transaction'],
                  ].map(([key, desc]) => (
                    <li key={key} className="flex items-start gap-2">
                      <code className={`mt-0.5 shrink-0 px-1.5 py-0.5 rounded text-sm ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>{key}</code>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section Divider */}
              <div className="mt-16 mb-8">
                <hr className={`border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`} />
              </div>

              {/* P2P: Flow of Payments */}
              <div id="gateway-connect-p2p-flow" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  P2P: Flow of Payments
                </h2>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Payment flow
                </p>
                <img
                  src={p2pFlowImage}
                  alt="P2P Flow of Payments diagram"
                  className="mt-6 w-full rounded-lg border border-gray-700"
                />
              </div>

              {/* P2P: Diagram of Payment Flow */}
              <div id="gateway-connect-p2p-diagram" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  P2P: Diagram of Payment Flow
                </h2>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Payment flow
                </p>
                <img
                  src={p2pDiagramImage}
                  alt="P2P Diagram of Payment Flow"
                  className="mt-6 w-full rounded-lg border border-gray-700"
                />
              </div>

              {/* P2P: Required Endpoints */}
              <div id="gateway-connect-p2p-endpoints" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  P2P: Required Endpoints
                </h2>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  The external service must respond to the following endpoints:
                </p>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Path', 'Method', 'Description']}
                  rows={[
                    ['/pay', 'POST', 'Pay request'],
                    ['/status', 'POST', 'Check status'],
                    ['/payout', 'POST', 'Payout request'],
                    ['/refund', 'POST', 'Refund request'],
                    ['/confirm_secure_code', 'POST', 'Confirm OTP secret key'],
                    ['/p2p_redirect', 'GET', 'Redirect to charge page'],
                    ['/pay_by_form', 'POST', 'Approve payment by form'],
                  ]}
                />
              </div>

              {/* P2P: Payment */}
              <div id="gateway-connect-p2p-payment" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  P2P: Payment
                </h2>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  The format of the P2P request has a similar structure to H2H mode. However, a new block is added — <code className={`px-1.5 py-0.5 rounded text-sm ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>bank_account</code> — which contains information about requisite details.
                </p>

                {(selectedLanguage === 'cURL' || selectedLanguage === 'Python' || selectedLanguage === 'PHP' || selectedLanguage === 'Java') && (
                  <CodeBlock
                    isDarkMode={isDarkMode}
                    language="json"
                    code={`{
    "product": "Tests",
    "order_number": "1234566789",
    "amount": 22200,
    "currency": "EUR",
    "redirect_success_url": "https://success.com/",
    "redirect_fail_url": "https://declined.com/",
    "callback_url": "https://test.io/callback",
    "bank_account": {
        "requisite_type": "card"
    },
    "customer": {
        "email": "dog@gmail.com"
    }
}`}
                  />
                )}

                <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Section: customer
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Field', 'Type', 'Description']}
                  rows={[
                    ['customer.ip', 'String', "Client's IP address"],
                    ['customer.phone', 'String', "Client's phone number"],
                    ['customer.name', 'String', "Client's full name"],
                    ['customer.email', 'String', "Client's email address"],
                    ['customer.client_id', 'String', "Client's internal ID"],
                    ['customer.first_name', 'String', "Client's first name"],
                    ['customer.last_name', 'String', "Client's last name"],
                    ['customer.middle_name', 'String', "Client's middle name"],
                    ['customer.address', 'String', "Client's address"],
                    ['customer.city', 'String', "Client's city"],
                    ['customer.state', 'String', "Client's state or region"],
                    ['customer.postcode', 'String', "Client's postal code"],
                    ['customer.country', 'String', "Client's country"],
                    ['customer.locale', 'String', "Client's language locale"],
                    ['customer.userid', 'String', "Client's user ID in the merchant system"],
                    ['customer.mode_of_payment', 'String', 'Mode of payment'],
                    ['customer.coin', 'String', 'Currency'],
                    ['customer.payment_system_id', 'String', 'ID of the payment system'],
                    ['customer.card_bin', 'String', 'BIN of the card'],
                    ['customer.birthday', 'String', "Client's date of birth"],
                  ]}
                />

                <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Section: bank_account
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Field', 'Type', 'Description']}
                  rows={[
                    ['bank_account.bank_account', 'String', 'Bank account number'],
                    ['bank_account.account_holder', 'String', "Account holder's name"],
                    ['bank_account.bank_state', 'String', "Bank's state"],
                    ['bank_account.bank_city', 'String', "Bank's city"],
                    ['bank_account.ifsc_code', 'String', 'IFSC code (India specific)'],
                    ['bank_account.bank_address', 'String', "Bank's address"],
                    ['bank_account.account_number', 'String', 'Account number'],
                    ['bank_account.account_name', 'String', 'Account holder name'],
                    ['bank_account.requisite_type', 'String', 'Type of requisite'],
                    ['bank_account.bank_name', 'String', 'Bank name'],
                  ]}
                />

                <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Section: default
                </h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Field', 'Type', 'Description']}
                  rows={[
                    ['default.recurring', 'Boolean', 'Indicates if the payment is recurring'],
                    ['default.website', 'String', 'Website of the merchant'],
                    ['default.extra_return_param', 'String', 'Additional return parameters'],
                    ['default.pending_url', 'String', 'Immediate redirect URL for waiting page'],
                    ['default.need_confirmation', 'Boolean', 'Indicates two-step payment requirement'],
                  ]}
                />

                <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Server Response for P2P Payments
                </h3>

                {(selectedLanguage === 'cURL' || selectedLanguage === 'Python' || selectedLanguage === 'PHP' || selectedLanguage === 'Java') && (
                  <CodeBlock
                    isDarkMode={isDarkMode}
                    language="json"
                    code={`{
  "status": "approved",
  "gateway_token": "539VLCBtWfKsJcU4SJH3gVqHNXsaGbfC",
  "result": "pending",
  "requisites": {
    "card": "4617611794313933",
    "holder": "Clark Kent",
    "bank_name": "dogbank"
  },
  "redirectRequest": {
    "url": null,
    "type": "post_iframes",
    "iframes": [
      {
        "url": null,
        "data": {
          "token": "539VLCBtWfKsJcU4SJH3gVqHNXsaGbfC"
        }
      }
    ]
  },
  "logs": [...]
}`}
                  />
                )}

                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Field', 'Type', 'Description']}
                  rows={[
                    ['redirect_request', 'Object', "Contains the URL to redirect the user to the P2P payment page. Usually excluded when wrapped_to_json is enabled in settings."],
                    ['result', 'String', 'approved / declined / pending'],
                    ['requisites', 'Object', "Contains trader's requisites, displayed on the form or returned in JSON."],
                    ['gateway_token', 'String', 'Token from the external gateway'],
                    ['logs', 'Array', 'Logs of the operation. Refer to the standard logs structure.'],
                  ]}
                />
              </div>

              {/* Callbacks */}
              <div id="gateway-connect-callbacks" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Callbacks
                </h2>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Kotulapay receives asynchronous notifications (callbacks) about payment events. These callbacks must be authenticated, validated, and follow specific payload and security requirements.
                </p>

                <h3 className={`text-2xl font-bold mb-4 mt-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Callback Endpoint
                </h3>
                <p className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Endpoint format:</p>
                <p className={`mb-6 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  POST /callbacks/v2/gateway_callbacks/:token
                </p>
                <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Where <code className={`px-1.5 py-0.5 rounded text-sm ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>token</code> is the <code className={`px-1.5 py-0.5 rounded text-sm ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>Payment.token</code> of the current transaction.
                </p>

                <h3 className={`text-2xl font-bold mb-4 mt-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Authentication &amp; JWT Format
                </h3>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Callbacks are authenticated using a JWT token in the <code className={`px-1.5 py-0.5 rounded text-sm ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>Authorization</code> header:
                </p>
                <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Authorization: Bearer &lt;JWT_TOKEN&gt;
                </p>
                <p className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>JWT Header:</p>
                <div className={`flex items-start gap-3 rounded-lg border px-4 py-3 mb-4 ${isDarkMode ? 'border-yellow-700/30 bg-yellow-900/20' : 'border-yellow-300 bg-yellow-50'}`}>
                  <Info className={`mt-0.5 size-4 flex-shrink-0 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'}`} />
                  <p className={`text-sm ${isDarkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                    Encryption algorithm: <code className={`px-1.5 py-0.5 rounded text-sm font-mono ${isDarkMode ? 'text-yellow-200' : 'text-yellow-900'}`}>HS512</code>
                  </p>
                </div>
                <p className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>JWT Payload:</p>

                {(selectedLanguage === 'cURL' || selectedLanguage === 'Python' || selectedLanguage === 'PHP' || selectedLanguage === 'Java') && (
                  <CodeBlock
                    isDarkMode={isDarkMode}
                    language="json"
                    code={`{
  "status": "approved",
  "currency": "USD",
  "amount": 100,
  "secure": {
    "encrypted_data": "<base64-string>",
    "iv_value": "<base64-string>"
  }
}`}
                  />
                )}

                <ul className={`mt-4 mb-6 space-y-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li><code className={`px-1.5 py-0.5 rounded text-sm ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>secure</code> contains the encrypted <code className={`px-1.5 py-0.5 rounded text-sm ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>merchant_key</code> (AES-256-CBC).</li>
                  <li>HS512 signature uses <code className={`px-1.5 py-0.5 rounded text-sm ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>settings['sign_key']</code> as the secret.</li>
                </ul>

                <h3 className={`text-2xl font-bold mb-4 mt-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Encrypting the Merchant Key
                </h3>
                <div className={`flex items-start gap-3 rounded-lg border px-4 py-3 mb-4 ${isDarkMode ? 'border-yellow-700/30 bg-yellow-900/20' : 'border-yellow-300 bg-yellow-50'}`}>
                  <Info className={`mt-0.5 size-4 flex-shrink-0 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'}`} />
                  <p className={`text-sm ${isDarkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                    Use AES-256-CBC encryption with the system master key
                  </p>
                </div>

                {selectedLanguage === 'cURL' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="bash"
                      code={`openssl enc -aes-256-cbc -in merchant_key.txt -out encrypted_key.bin -K <master_token> -iv <iv_value>`}
                    />
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="python"
                      code={`function processJwt(jwt_token, sign_key):
    # Step 1: Decode JWT and extract 'secure' block
    base64_payload = jwt_token.split('.')[1]
    decoded_payload = Base64Decode(base64_payload)
    json_payload = ParseJSON(decoded_payload)
    secure_block = json_payload["secure"]

    # Step 2: Decrypt merchant key
    encrypted_data = secure_block["encrypted_data"]
    iv = secure_block["iv_value"]
    master_key = GetConfig("master_token")[0:32]

    merchant_private_key = AES256Decrypt(
        key = master_key,
        iv = iv,
        data = encrypted_data
    )

    # Step 3: Validate signature
    is_valid = JwtVerify(token = jwt_token, secret = sign_key, algorithm = "HS512")

    return {
        "merchant_private_key": merchant_private_key,
        "secure_block": secure_block,
        "jwt_valid": is_valid
    }`}
                    />
                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Example Output:</p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{ "encrypted_data": "<Base64>", "iv_value": "<Base64>" }`}
                    />
                  </>
                )}
                {selectedLanguage === 'Python' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="python"
                      code={`import base64
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes

def pad(data):
    pad_len = 16 - (len(data) % 16)
    return data + bytes([pad_len] * pad_len)

def encrypt_merchant_key(merchant_key: str, master_token: str):
    key = master_token.encode('utf-8')[:32]
    iv = get_random_bytes(16)

    cipher = AES.new(key, AES.MODE_CBC, iv)
    padded_data = pad(merchant_key.encode('utf-8'))
    encrypted = cipher.encrypt(padded_data)

    return {
        "encrypted_data": base64.b64encode(encrypted).decode('utf-8'),
        "iv_value": base64.b64encode(iv).decode('utf-8')
    }`}
                    />
                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Example Output:</p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{ "encrypted_data": "<Base64>", "iv_value": "<Base64>" }`}
                    />
                  </>
                )}

                {selectedLanguage === 'PHP' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="php"
                      code={`<?php
function encryptMerchantKey(string $merchantKey, string $masterToken): array {
    $key = substr($masterToken, 0, 32);
    $iv = openssl_random_pseudo_bytes(16);

    $encryptedData = openssl_encrypt(
        $merchantKey,
        'aes-256-cbc',
        $key,
        OPENSSL_RAW_DATA,
        $iv
    );

    return [
        'encrypted_data' => base64_encode($encryptedData),
        'iv_value' => base64_encode($iv),
    ];
}

$merchantKey = 'merchant_private_key_string';
$masterToken = 'your_very_long_32+_byte_master_token_here';

$result = encryptMerchantKey($merchantKey, $masterToken);
print_r($result);`}
                    />
                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Example Output:</p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{ "encrypted_data": "<Base64>", "iv_value": "<Base64>" }`}
                    />
                  </>
                )}

                {selectedLanguage === 'Java' && (
                  <>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="java"
                      code={`import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.security.SecureRandom;

public class AesEncryptor {
    public static void main(String[] args) throws Exception {
        String merchantKey = "merchant_private_key_string";
        String masterToken = "your_very_long_32+_byte_master_token_here";

        byte[] keyBytes = masterToken.substring(0, 32).getBytes("UTF-8");
        byte[] ivBytes = new byte[16];
        new SecureRandom().nextBytes(ivBytes);

        SecretKeySpec keySpec = new SecretKeySpec(keyBytes, "AES");
        IvParameterSpec ivSpec = new IvParameterSpec(ivBytes);

        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, keySpec, ivSpec);

        byte[] encrypted = cipher.doFinal(merchantKey.getBytes("UTF-8"));

        String encryptedData = Base64.getEncoder().encodeToString(encrypted);
        String ivValue = Base64.getEncoder().encodeToString(ivBytes);

        System.out.println("encrypted_data: " + encryptedData);
        System.out.println("iv_value: " + ivValue);
    }
}`}
                    />
                    <p className={`mt-4 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Example Output:</p>
                    <CodeBlock
                      isDarkMode={isDarkMode}
                      language="json"
                      code={`{ "encrypted_data": "<Base64>", "iv_value": "<Base64>" }`}
                    />
                  </>
                )}

                <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Server-side Validation Steps
                </h3>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Payload Schema Validation</p>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Field', 'Type', 'Constraints / Pattern', 'Required', 'Description']}
                  rows={[
                    ['token', 'String', 'Length: 32', 'Yes', 'Unique token identifying the payment'],
                    ['gateway_token', 'String', '—', 'No', 'Token from the external gateway'],
                    ['status', 'String', 'approved / declined / refunded', 'Yes', 'Result status of the payment'],
                    ['refund', 'Boolean', '—', 'No', 'Indicates if this is a refund'],
                    ['reason', 'String', 'Min length: 5', 'No', 'Decline or refund reason'],
                    ['currency', 'String', 'Length: 3–4', 'Yes', 'ISO currency code (e.g. USD, EUR)'],
                    ['amount', 'Integer', '—', 'Yes', 'Payment amount in minor units'],
                    ['gateway_callback', 'Object', '—', 'No', 'Full provider response (if needed)'],
                  ]}
                />

                <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Example cURL Request
                </h3>

                {selectedLanguage === 'cURL' && (
                  <CodeBlock
                    isDarkMode={isDarkMode}
                    language="bash"
                    code={`curl --location 'http://business:4000/callbacks/v2/gateway_callbacks/gJJN4VytdaNxivS5kcvWkeMb448EWJQc' \\
     --header 'Content-Type: application/json' \\
     --header 'Authorization: Bearer <JWT_TOKEN>' \\
     --data '{
        "status": "approved",
        "currency": "USD",
        "amount": 100
      }'`}
                  />
                )}

                <p className={`mt-6 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <strong className={isDarkMode ? 'text-white' : 'text-gray-900'}>Success:</strong> HTTP 200 — <code className={`px-1.5 py-0.5 rounded text-sm ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>{'{ success: true }'}</code>
                </p>

                <h3 className={`text-2xl font-bold mb-4 mt-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Errors</h3>
                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Code', 'Message']}
                  rows={[
                    ['401', 'Authorization token is missing'],
                    ['422', 'Invalid JWT signature'],
                    ['422', 'Invalid payload schema'],
                  ]}
                />

                <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Logs and Debugging
                </h3>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Each callback is logged via InteractionLogger with: request (raw &amp; parsed), response, direction: <code className={`px-1.5 py-0.5 rounded text-sm ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>"in"</code>, timestamps and duration.
                </p>

                <h3 className={`text-2xl font-bold mb-4 mt-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Common Pitfalls
                </h3>
                <ul className={`mb-6 space-y-1.5 list-disc list-inside ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>Incorrect master token for AES key</li>
                  <li>Missing fields in secure payload</li>
                  <li>Expired or mismatched JWT tokens</li>
                  <li>Schema violations (e.g. short token, missing currency)</li>
                </ul>
              </div>

              {/* Status */}
              <div id="gateway-connect-status" className="scroll-mt-24 mt-12">
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Status
                </h2>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Kotulapay also has a transaction status polling functionality. The endpoint on the application side should respond to the <code className={`px-1.5 py-0.5 rounded text-sm ${isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#04403a]'}`}>/status</code> path.
                </p>

                <h3 className={`text-2xl font-bold mb-4 mt-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Request body
                </h3>

                {(selectedLanguage === 'cURL' || selectedLanguage === 'Python' || selectedLanguage === 'PHP' || selectedLanguage === 'Java') && (
                  <CodeBlock
                    isDarkMode={isDarkMode}
                    language="json"
                    code={`{
    "settings": {
        "bearer_token": "cd6fb795fd41348df8f0"
    },
    "payment": {
        "gateway_token": "H97UakuQMh17THitGy3Bzu9bX1YSfCEv"
    },
    "method_name": "status"
}`}
                  />
                )}

                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Field', 'Type', 'Description']}
                  rows={[
                    ['settings', 'Object', 'General gateway or environment settings'],
                    ['settings.bearer_token', 'String', 'Authorization bearer token'],
                    ['payment', 'Object', 'Payment-specific information'],
                    ['payment.gateway_token', 'String', 'Unique identifier for the transaction'],
                    ['method_name', 'String', "Name of the method to be executed (e.g., 'status')"],
                  ]}
                />

                <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Response body
                </h3>

                {(selectedLanguage === 'cURL' || selectedLanguage === 'Python' || selectedLanguage === 'PHP' || selectedLanguage === 'Java') && (
                  <CodeBlock
                    isDarkMode={isDarkMode}
                    language="json"
                    code={`{
    "result": "OK",
    "status": "pending",
    "details": "Transaction is pending",
    "amount": 22200,
    "currency": "RUB",
    "logs": [...]
}`}
                  />
                )}

                <ParamsTable
                  isDarkMode={isDarkMode}
                  headers={['Field', 'Type', 'Description']}
                  rows={[
                    ['result', 'String', 'Result status of the transaction (e.g. OK, ERROR)'],
                    ['status', 'String', 'Current status of the transaction (e.g. pending, approved)'],
                    ['details', 'String', 'Additional status details or message'],
                    ['amount', 'Integer', 'Amount of the transaction in minor units'],
                    ['currency', 'String', 'Currency of the transaction'],
                    ['logs', 'Array', 'Logs of the transaction process'],
                  ]}
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}