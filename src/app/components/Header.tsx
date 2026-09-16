import { motion, useScroll, useTransform } from 'motion/react';
import { Menu, X, ChevronDown, Play } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { Logo } from './Logo';
import svgPaths from '@/imports/TopNav/svg-o33sbfzyv3';

/**
 * Returns the perceived luminance (0–1) of an element's background.
 * Handles both solid colours and CSS gradients (backgroundImage).
 * Returns null if the background is fully transparent / unset.
 */
function getElLuminance(el: HTMLElement): number | null {
  const s = getComputedStyle(el);

  // 1. Solid background-color
  const cm = s.backgroundColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (cm) {
    const alpha = parseFloat(cm[4] ?? '1');
    if (alpha > 0.05) {
      return (0.2126 * +cm[1] + 0.7152 * +cm[2] + 0.0722 * +cm[3]) / 255;
    }
  }

  // 2. CSS gradient (background-image) – average opaque colour stops only
  const img = s.backgroundImage;
  if (img && img !== 'none') {
    const all = [...img.matchAll(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/g)];
    // Discard nearly-transparent stops (e.g. decorative grids at 0.03 alpha)
    const opaque = all.filter(m => parseFloat(m[4] ?? '1') > 0.1);
    if (opaque.length) {
      let sum = 0;
      opaque.forEach(m => { sum += (0.2126 * +m[1] + 0.7152 * +m[2] + 0.0722 * +m[3]) / 255; });
      return sum / opaque.length;
    }
  }

  return null; // transparent / unset
}

/**
 * Samples the background luminance directly behind the nav pill.
 * Uses document.elementsFromPoint (full z-stack) so fixed nav layers are
 * skipped. Supports a data-nav-theme="light|dark" override on any section.
 *
 * Returns true when the content behind is light (→ use dark-text nav).
 */
function useIsLightBackground(navRef: React.RefObject<HTMLDivElement | null>) {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const detect = () => {
      const nav = navRef.current;
      if (!nav) return;

      // Sample at vertical centre of the pill, three horizontal positions
      const { top, height } = nav.getBoundingClientRect();
      const sampleY = top + height / 2;
      const xs = [window.innerWidth * 0.25, window.innerWidth * 0.5, window.innerWidth * 0.75];

      let lightVotes = 0;
      let darkVotes = 0;

      for (const x of xs) {
        // elementsFromPoint returns the full z-stack top→bottom
        const stack = document.elementsFromPoint(x, sampleY) as HTMLElement[];

        for (const el of stack) {
          // Skip the nav's own layers
          if (nav.contains(el)) continue;

          // Honour explicit data-nav-theme attribute
          const theme = el.closest('[data-nav-theme]')?.getAttribute('data-nav-theme');
          if (theme === 'light') { lightVotes++; break; }
          if (theme === 'dark')  { darkVotes++;  break; }

          const lum = getElLuminance(el);
          if (lum !== null) {
            lum > 0.5 ? lightVotes++ : darkVotes++;
            break; // found first opaque layer — stop walking the stack
          }
        }
      }

      // Need majority (≥2 of 3) to flip
      if (lightVotes >= 2) setIsLight(true);
      else if (darkVotes >= 2) setIsLight(false);
      // tie → keep current value
    };

    detect();
    window.addEventListener('scroll', detect, { passive: true });
    window.addEventListener('resize', detect, { passive: true });
    return () => {
      window.removeEventListener('scroll', detect);
      window.removeEventListener('resize', detect);
    };
  }, [navRef]);

  return isLight;
}

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type DropdownColumn = { title: string; items: { label: string; href: string }[] };
type NavItem = {
  label: string; href: string; isRoute: boolean;
  hasDropdown?: boolean; dropdownColumns?: DropdownColumn[];
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Home',     href: '/',              isRoute: true },
  { label: 'About Us', href: '/about',          isRoute: true },
  { label: 'Services', href: '/services',       isRoute: true },
  {
    label: 'Resources', href: '#resources', isRoute: false, hasDropdown: true,
    dropdownColumns: [
      { title: 'INSIGHTS',       items: [{ label: 'Blogs', href: 'https://blog.kotulapay.com/' }, { label: 'Videos', href: '/resources/videos' }] },
      { title: 'PARTNER RESOURCE CENTER',  items: [
        { label: 'Documentation', href: '/resources/documentation' },
        { label: 'API reference',           href: '/resources/api-reference' },
        { label: 'Brand guidelines',        href: '/brand-guidelines' },
        { label: 'FAQ',                     href: '/resources/faq' },
      ]},
    ],
  },
  { label: 'FAQs',    href: '/resources/faq', isRoute: true },
  { label: 'Contact', href: '/contact',        isRoute: true },
];

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export function Header() {
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isLight = false;

  const [isMobileMenuOpen,    setIsMobileMenuOpen]    = useState(false);
  const [isResourcesHovered,  setIsResourcesHovered]  = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);

  const isOnResourcesPage =
    location.pathname.startsWith('/resources') || location.pathname === '/brand-guidelines';

  useEffect(() => {
    setIsResourcesHovered(false);
    setIsMobileResourcesOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Extra glass depth on scroll (dark mode only; CSS handles the light↔dark swap)
  const { scrollY } = useScroll();
  const scrollGlass = useTransform(scrollY, [0, 100], [0, 1]);

  // ── Colour tokens ──────────────────────────
  // isLight = true  → background is light  → nav text must be dark
  // isLight = false → background is dark   → nav text must be light
  const pillCls    = 'bg-white/[0.32] border-black/10';
  const textBase   = 'text-[#1e1f24]';
  const textActive = 'text-[#289685]';
  const textHover  = 'hover:text-[#289685]';
  const chevron    = '#1E1F24';
  const signInBdr  = 'border-[#1e1f24]';
  const signInTxt  = 'text-[#1e1f24] hover:bg-black/5';
  const divider    = 'bg-black/10';
  const toggleClr  = 'text-[#1e1f24]';

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8 sm:pt-5 lg:px-[105px] lg:pt-6">
      {/* ── Pill ── */}
      <div
        ref={navRef}
        className={`relative rounded-full border backdrop-blur-md transition-all duration-500 ${pillCls}`}
      >
        {/* Extra scroll-depth tint (dark mode only) */}
        {!isLight && (
          <motion.div
            style={{ opacity: scrollGlass }}
            className="pointer-events-none absolute inset-0 rounded-full bg-white/[0.06]"
          />
        )}

        {/* ── Main bar ── */}
        <div className="relative flex items-center justify-between gap-4 px-6 py-3 md:px-10 md:py-4">

          {/* Logo */}
          <Link to="/" className="shrink-0">
            <Logo
              variant="dark"
              className="h-8 w-auto md:h-10"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-5 xl:flex xl:gap-7">
            {NAV_ITEMS.map((item) => {
              const active = item.isRoute ? location.pathname === item.href : isOnResourcesPage;
              const cls = `whitespace-nowrap text-[16px] leading-6 transition-colors duration-300 ${
                active ? textActive : `${textBase} ${textHover}`
              }`;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setIsResourcesHovered(true)}
                  onMouseLeave={() => item.hasDropdown && setIsResourcesHovered(false)}
                >
                  {item.isRoute ? (
                    <Link to={item.href} className={cls} style={{ fontFeatureSettings: '"dlig" 1' }}>
                      {item.label}
                    </Link>
                  ) : (
                    <a href={item.href} className={`flex items-center gap-1 ${cls}`} style={{ fontFeatureSettings: '"dlig" 1' }}>
                      {item.label}
                      <svg fill="none" viewBox="0 0 11.4552 7.0002" width="10" height="6"
                        className={`transition-transform duration-200 ${isResourcesHovered ? 'rotate-180' : ''}`}>
                        <path d={svgPaths.p3289f600} fill={chevron} />
                      </svg>
                    </a>
                  )}

                  {/* Dropdown */}
                  {item.hasDropdown && item.dropdownColumns && (
                    <div
                      className={`absolute left-1/2 top-full -translate-x-1/2 pt-4 transition-all duration-200 ${
                        isResourcesHovered
                          ? 'pointer-events-auto translate-y-0 opacity-100'
                          : 'pointer-events-none -translate-y-1 opacity-0'
                      }`}
                      onMouseEnter={() => setIsResourcesHovered(true)}
                      onMouseLeave={() => setIsResourcesHovered(false)}
                    >
                      <div className="grid min-w-[480px] grid-cols-2 gap-10 rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl">
                        {item.dropdownColumns.map((col) => (
                          <div key={col.title}>
                            <div className="mb-4 flex items-center gap-2">
                              <Play className="size-3 fill-[#99d261] text-[#99d261]" />
                              <h5 className="text-xs font-semibold uppercase tracking-widest text-[#289685]">{col.title}</h5>
                            </div>
                            <div className="space-y-0.5">
                              {col.items.map((di) =>
                                di.href.startsWith('http') ? (
                                  <a key={di.label} href={di.href} target="_blank" rel="noreferrer"
                                    onClick={() => setIsResourcesHovered(false)}
                                    className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-[#289685]/10 hover:text-[#0a3d3d]">
                                    {di.label}
                                  </a>
                                ) : (
                                  <Link key={di.label} to={di.href}
                                    onClick={() => setIsResourcesHovered(false)}
                                    className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-[#289685]/10 hover:text-[#0a3d3d]">
                                    {di.label}
                                  </Link>
                                )
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden shrink-0 items-center gap-2 xl:flex">
            <Link to="/contact">
              <button
                className={`relative rounded-full px-6 py-2.5 text-[15px] font-medium leading-none tracking-[-0.03em] whitespace-nowrap transition-colors duration-300 ${signInTxt}`}
                style={{ fontFeatureSettings: '"calt" 0, "liga" 0' }}
              >
                Sign In
                <span className={`pointer-events-none absolute inset-0 rounded-full border-2 transition-colors duration-300 ${signInBdr}`} />
              </button>
            </Link>
            <Link to="/contact">
              <button
                className="whitespace-nowrap rounded-full bg-[#289685] px-6 py-2.5 text-[15px] font-medium leading-none tracking-[-0.03em] text-[#fcfcfd] transition-colors hover:bg-[#1e7a6c]"
                style={{ fontFeatureSettings: '"calt" 0, "liga" 0' }}
              >
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`flex items-center justify-center transition-colors duration-300 xl:hidden ${toggleClr}`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

      </div>

      {/* ── Mobile menu panel (white card, separate from pill) ── */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out xl:hidden ${
          isMobileMenuOpen ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mt-3 rounded-2xl bg-white px-6 py-8 shadow-xl">
          {/* Nav links */}
          <div className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => {
              const active = item.isRoute ? location.pathname === item.href : isOnResourcesPage;
              const linkCls = `text-[20px] leading-7 transition-colors duration-200 font-['Helvetica_Neue',sans-serif] ${
                active ? 'text-[#289685] font-semibold' : 'text-[#1e1f24]'
              }`;
              return item.isRoute ? (
                <Link key={item.label} to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={linkCls}
                  style={{ fontFeatureSettings: '"dlig" 1' }}>
                  {item.label}
                </Link>
              ) : (
                <div key={item.label}>
                  <button
                    onClick={() => setIsMobileResourcesOpen(!isMobileResourcesOpen)}
                    className={`flex w-full items-center gap-1 ${linkCls}`}
                    style={{ fontFeatureSettings: '"dlig" 1' }}
                  >
                    {item.label}
                    <ChevronDown className={`size-5 shrink-0 transition-transform duration-200 ${isMobileResourcesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {/* Resources sub-panel — same design as desktop dropdown */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isMobileResourcesOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {item.dropdownColumns && (
                      <div className="mt-3 grid grid-cols-2 gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl">
                        {item.dropdownColumns.map((col) => (
                          <div key={col.title}>
                            <div className="mb-4 flex items-center gap-2">
                              <Play className="size-3 fill-[#99d261] text-[#99d261]" />
                              <h5 className="text-xs font-semibold uppercase tracking-widest text-[#289685]">{col.title}</h5>
                            </div>
                            <div className="space-y-0.5">
                              {col.items.map((di) => (
                                <Link key={di.label} to={di.href}
                                  onClick={() => { setIsMobileMenuOpen(false); setIsMobileResourcesOpen(false); }}
                                  className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-[#289685]/10 hover:text-[#0a3d3d]">
                                  {di.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col gap-3">
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="relative w-full rounded-full py-[14px] text-[18px] font-medium tracking-[-0.04em] text-[#1e1f24] transition-colors hover:bg-black/5"
                style={{ fontFeatureSettings: '"calt" 0, "liga" 0' }}>
                Sign In
                <span className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#cdced7]" />
              </button>
            </Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="w-full rounded-full bg-[#289685] py-[14px] text-[18px] font-medium tracking-[-0.04em] text-[#1e1f24] transition-colors hover:bg-[#1e7a6c]"
                style={{ fontFeatureSettings: '"calt" 0, "liga" 0' }}>
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
