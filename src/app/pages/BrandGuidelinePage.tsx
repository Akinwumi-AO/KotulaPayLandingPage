import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ColorPaletteSection } from '../components/ColorPaletteSection';
import { TypographySection } from '../components/TypographySection';
import { BackgroundColorUsageSection } from '../components/BackgroundColorUsageSection';
import { MobileAppLogoSection } from '../components/MobileAppLogoSection';
import { LogoUsageSection } from '../components/LogoUsageSection';
import { LogoMisuseSection } from '../components/LogoMisuseSection';
import { DownloadBrandAssetSection } from '../components/DownloadBrandAssetSection';

export default function BrandGuidelinePage() {
  const [activeSection, setActiveSection] = useState('color-palette');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: 'color-palette', title: 'Color Palette' },
    { id: 'typography', title: 'Typography' },
    { id: 'background-usage', title: 'Background Color Usage' },
    { id: 'mobile-logo', title: 'Mobile App Logo' },
    { id: 'logo-usage', title: 'Logo Usage' },
    { id: 'logo-misuse', title: 'Logo Misuse' },
    { id: 'download-brand-asset', title: 'Download Brand Asset' },
  ];

  const activeTitle = sections.find(s => s.id === activeSection)?.title ?? '';

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
        visible.forEach((y, id) => {
          if (y < topY) { topY = y; topId = id; }
        });
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden bg-gradient-to-b from-[#001c26] to-[#04403a]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(197, 224, 99, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">Brand Guidelines</h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-300">
              Complete brand identity guidelines for Kotulapay
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mobile/Tablet Sticky Top Nav */}
      <div className="sticky top-[80px] z-30 border-b border-gray-200 bg-white shadow-sm lg:hidden" ref={dropdownRef}>
        <div className="flex items-center justify-between px-5 py-3">
          <span className="text-sm font-semibold text-[#001c26]">{activeTitle}</span>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-[#001c26] transition-colors hover:bg-gray-50"
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
              className="overflow-hidden border-t border-gray-100"
            >
              <nav className="px-4 py-2">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      activeSection === section.id
                        ? 'bg-[#c5e063] text-[#001c26] font-semibold'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#001c26]'
                    }`}
                  >
                    <span className="text-xs opacity-40">{String(index + 1).padStart(2, '0')}</span>
                    {section.title}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content with Sidebar */}
      <div className="mx-auto max-w-[1920px] px-6 py-12">
        <div className="flex gap-8">

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block sticky top-24 h-[calc(100vh-6rem)] w-72 flex-shrink-0 overflow-y-auto border-r border-gray-200">
            <div className="p-6">
              <h2 className="mb-6 text-lg font-bold text-[#001c26]">Contents</h2>
              <nav className="space-y-1">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-[#c5e063] text-[#001c26]'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-[#001c26]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xs opacity-50">{String(index + 1).padStart(2, '0')}</span>
                      <span>{section.title}</span>
                    </div>
                  </button>
                ))}
              </nav>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-3">Need help?</p>
                <a
                  href="mailto:info@kotulapay.com"
                  className="block text-sm text-[#001c26] hover:text-[#04403a] font-medium"
                >
                  Contact Brand Team →
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="space-y-12">
              {[
                { id: 'color-palette', num: '01', title: 'Color Palette', Component: ColorPaletteSection },
                { id: 'typography', num: '02', title: 'Typography', Component: TypographySection },
                { id: 'background-usage', num: '03', title: 'Background Color Usage', Component: BackgroundColorUsageSection },
                { id: 'mobile-logo', num: '04', title: 'Mobile App Logo', Component: MobileAppLogoSection },
                { id: 'logo-usage', num: '05', title: 'Logo Usage', Component: LogoUsageSection },
                { id: 'logo-misuse', num: '06', title: 'Logo Misuse', Component: LogoMisuseSection },
                { id: 'download-brand-asset', num: '07', title: 'Download Brand Asset', Component: DownloadBrandAssetSection },
              ].map(({ id, num, title, Component }) => (
                <motion.section
                  key={id}
                  id={id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6 }}
                  className="scroll-mt-24"
                >
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-sm font-mono text-gray-400">{num}</span>
                      <h2 className="text-2xl font-bold text-[#001c26]">{title}</h2>
                    </div>
                    <div className="h-px bg-gradient-to-r from-[#c5e063] to-transparent" />
                  </div>
                  <Component />
                </motion.section>
              ))}
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
