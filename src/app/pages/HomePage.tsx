import { useState, useEffect, lazy, Suspense, startTransition, Component, ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowRight, PhoneCall, ShieldCheck, Zap, Globe, Landmark, CircleDollarSign, Gamepad2, ShoppingCart, Briefcase, PlaneTakeoff, LucideIcon } from 'lucide-react';
import imgCardPayment from '../../imports/image-9.png';
import { BuiltForScale } from '../components/BuiltForScale';
import imgMobileMoney from '../../imports/Homepage/a27f82c8ee5980d3a6c763294d7e7aa9191a9b03.png';
import imgOnePlatform from '../../imports/Homepage/030526e7baed7dfb53b6a1bc2f9c570c8c5cd98e.png';
import imgDevelopers from '../../imports/image-10.png';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

class LazyErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

const Hero1920 = lazy(() => import('../../imports/1920X1080/index'));
const Hero1440 = lazy(() => import('../../imports/1440X1024-1/index'));
const HeroIPad = lazy(() => import('../../imports/IPadPro111-1/index'));
const HeroMobile = lazy(() => import('../../imports/IPhone1617ProMax1-1/index'));

/* ─── 1. HERO ────────────────────────────────────────────────── */
function HeroSection() {
  const [vpWidth, setVpWidth] = useState<number | null>(null);

  useEffect(() => {
    startTransition(() => setVpWidth(window.innerWidth));
    const onResize = () => startTransition(() => setVpWidth(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const bg = <div className="absolute inset-0 bg-[#001c26]" />;

  if (vpWidth === null) {
    return (
      <section className="hero-font-override relative overflow-hidden bg-[#001c26]" style={{ height: '100svh' }} data-nav-theme="dark">
        {bg}
      </section>
    );
  }

  if (vpWidth >= 1920) {
    const scale = vpWidth / 1920;
    const h = Math.round(1080 * scale);
    return (
      <section className="hero-font-override relative overflow-hidden bg-[#001c26]" style={{ height: h }} data-nav-theme="dark">
        {bg}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 1920, height: 1080, transformOrigin: 'top left', transform: `scale(${scale})` }}>
          <LazyErrorBoundary><Suspense fallback={null}><Hero1920 /></Suspense></LazyErrorBoundary>
        </div>
      </section>
    );
  }

  if (vpWidth >= 1024) {
    const scale = vpWidth / 1440;
    const h = Math.round(1024 * scale);
    return (
      <section className="hero-font-override relative overflow-hidden bg-[#001c26]" style={{ height: h }} data-nav-theme="dark">
        {bg}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 1440, height: 1024, transformOrigin: 'top left', transform: `scale(${scale})` }}>
          <LazyErrorBoundary><Suspense fallback={null}><Hero1440 /></Suspense></LazyErrorBoundary>
        </div>
      </section>
    );
  }

  if (vpWidth >= 768) {
    const scale = vpWidth / 834;
    const h = Math.round(1194 * scale);
    return (
      <section className="hero-font-override relative overflow-hidden bg-[#001c26]" style={{ height: h }} data-nav-theme="dark">
        {bg}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 834, height: 1194, transformOrigin: 'top left', transform: `scale(${scale})` }}>
          <LazyErrorBoundary><Suspense fallback={null}><HeroIPad /></Suspense></LazyErrorBoundary>
        </div>
      </section>
    );
  }

  const scale = vpWidth / 440;
  const h = Math.round(1194 * scale);
  return (
    <section className="relative overflow-hidden bg-[#001c26]" style={{ height: h }} data-nav-theme="dark">
      {bg}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 440, height: 1194, transformOrigin: 'top left', transform: `scale(${scale})` }}>
        <LazyErrorBoundary><Suspense fallback={null}><HeroMobile /></Suspense></LazyErrorBoundary>
      </div>
    </section>
  );
}

/* ─── 2. BUILT FOR SCALE — see src/app/components/BuiltForScale.tsx ── */

/* ─── 3. EVERYTHING YOU NEED ────────────────────────────────── */
function EverythingYouNeed() {
  const cards: { icon: LucideIcon; title: string; desc: string }[] = [
    {
      icon: ShieldCheck,
      title: 'Enterprise-Grade Security',
      desc: "Bank-level security protocols and compliance standards to protect every transaction and keep customers' data safe.",
    },
    {
      icon: Zap,
      title: 'Lightning-Fast Settlements',
      desc: 'Get paid faster with automated settlements and real-time transaction processing across all payment methods.',
    },
    {
      icon: Globe,
      title: 'Global Card Coverage + African APMs',
      desc: 'Accept card payments worldwide and alternative payment methods across key African markets.',
    },
  ];

  return (
    <section className="bg-[#f6faee] py-14 lg:py-20">
      <div className="mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">
        <div className="mx-auto mb-10 max-w-[760px] text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#1d3b32] md:text-4xl">
            Everything You Need to Accept Payments
          </h2>
          <p className="text-[#62636c] text-lg leading-relaxed">
            Comprehensive payment infrastructure with global card processing and African mobile money coverage to help you collect, scale, and grow worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {cards.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col gap-4 items-start rounded-2xl bg-white px-7 py-8">
              <div className="flex size-[52px] shrink-0 items-center justify-center rounded-[12px] bg-[#d4f291]">
                <Icon className="size-5 text-[#1e1f24]" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-[#1d3b32] leading-snug">{title}</h3>
                <p className="text-[#62636c] text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 4. ONE PLATFORM ───────────────────────────────────────── */
function OnePlatform() {
  return (
    <section className="relative overflow-hidden bg-[#001c26] py-14 lg:py-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[55%] top-[-10%] h-[120%] w-[60%] bg-gradient-to-b from-[#00bf6f22] to-transparent blur-[80px]" />
        <div className="absolute left-[72%] top-[5%] h-[90%] w-[20px] bg-gradient-to-b from-[#00bf6f] to-transparent opacity-20 blur-[90px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="max-w-[900px]">
            <h2 className="mb-4 text-3xl font-bold text-[#fcfcfd] md:text-4xl">
              One Platform,<br />All Payment Methods
            </h2>
            <p className="mb-7 text-lg text-[#cdced7] leading-relaxed">
              Global card processing with localised African mobile money support across Kenya, Uganda, Tanzania, Rwanda, Zambia, Ghana, Nigeria, Egypt, Cameroon and lot more.
            </p>
            <Link to="/contact">
              <button className="flex items-center gap-2 rounded-full bg-[#289685] px-8 py-4 font-medium text-[#fcfcfd] transition-colors hover:bg-[#237a71] text-base xl:text-lg">
                <PhoneCall className="size-5 shrink-0" />
                Talk to Sales
              </button>
            </Link>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <img src={imgOnePlatform} alt="One platform all payment methods" className="w-full max-w-[580px] object-contain drop-shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 5. GLOBAL CARD PAYMENT ────────────────────────────────── */
function GlobalCardPayment() {
  return (
    <section className="bg-[#e5f2f6] py-14 lg:py-20">
      <div className="mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1 flex items-center justify-center lg:justify-start">
            <img src={imgCardPayment} alt="Global card payment" className="w-full max-w-[600px] object-contain drop-shadow-xl" />
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="mb-4 text-3xl font-bold text-[#001c26] md:text-4xl">Global Card Payment</h2>
            <div className="space-y-3 text-lg text-[#62636c] leading-relaxed">
              <p>Kotulapay enables your business to accept remote card payments through a secure, globally connected gateway. Below are the key parameters for this solution.</p>
              <p>Accept major global cards, wallets, and alternative payment rails through one integration.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 6. MOBILE MONEY ───────────────────────────────────────── */
function MobileMoney() {
  return (
    <section className="bg-[#f6faee] py-14 lg:py-20">
      <div className="mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-[#1d3b32] md:text-4xl">
              Mobile Money &amp;<br />Alternative Payment Methods
            </h2>
            <p className="text-lg text-[#62636c] leading-relaxed">
              Reach mobile-first customers across Africa with instant collections and payouts via all major Mobile Network Operators. Our APMS solution gives you a single integration across multiple markets, currencies, and networks.
            </p>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <img src={imgMobileMoney} alt="Mobile money across Africa" className="w-full max-w-[580px] object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 7. BUILT FOR DEVELOPERS ───────────────────────────────── */
function BuiltForDevelopers() {
  return (
    <section className="relative overflow-hidden bg-[#001c26] py-14 lg:py-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[-5%] top-[-10%] h-[120%] w-[55%] bg-gradient-to-b from-[#00bf6f18] to-transparent blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="flex items-center justify-center lg:justify-start">
            <img src={imgDevelopers} alt="Built for developers" className="w-full max-w-[580px] object-contain drop-shadow-2xl" />
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold text-[#fcfcfd] md:text-4xl">Built for Developers</h2>
            <p className="mb-7 text-lg text-[#cdced7] leading-relaxed">
              {`Get up and running in minutes with our intuitive API and comprehensive documentation. We've built the tools developers love.`}
            </p>
            <Link to="/resources/documentation">
              <button className="flex items-center gap-2 rounded-full bg-[#289685] px-8 py-4 font-medium text-[#fcfcfd] transition-colors hover:bg-[#237a71] text-base xl:text-lg">
                <svg className="size-5 shrink-0" fill="none" viewBox="0 0 32 24" stroke="currentColor" strokeWidth="2.2">
                  <path d="M8 6L2 12L8 18M24 6L30 12L24 18" />
                </svg>
                Read Our Documentation
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 8. INDUSTRIES WE POWER ────────────────────────────────── */
function IndustriesWePower() {
  const industries: { icon: LucideIcon; name: string }[] = [
    { icon: Landmark,         name: 'Fintech & Neobanks' },
    { icon: CircleDollarSign, name: 'Forex & Trading' },
    { icon: Gamepad2,         name: 'Gaming & Betting' },
    { icon: ShoppingCart,     name: 'Marketplace & E-commerce' },
    { icon: Briefcase,        name: 'SaaS & Billing' },
    { icon: PlaneTakeoff,     name: 'Travel & Digital Services' },
  ];

  return (
    <section className="bg-[#f6faee] py-14 lg:py-20">
      <div className="mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#001c26] md:text-4xl">Industries We Power</h2>
          <p className="mx-auto max-w-[520px] text-lg text-[#62636c] leading-relaxed">
            From early-stage fintechs to enterprise platforms, Kotulapay scales with your business.
          </p>
        </div>

        <div className="mx-auto mb-10 grid max-w-4xl grid-cols-1 gap-x-12 gap-y-5 sm:grid-cols-3">
          {industries.map(({ icon: Icon, name }) => (
            <div key={name} className="flex items-center gap-3">
              <div className="flex size-[44px] shrink-0 items-center justify-center rounded-[12px] bg-[#d4f291]">
                <Icon className="size-5 text-[#1e1f24]" />
              </div>
              <span className="font-medium text-[#1e1f24] text-base">{name}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link to="/contact">
            <button className="flex items-center gap-2 rounded-full bg-[#289685] px-8 py-4 font-medium text-[#fcfcfd] transition-colors hover:bg-[#237a71] text-base xl:text-lg">
              Get Started
              <ArrowRight className="size-5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── 9. READY TO TRANSFORM CTA ─────────────────────────────── */
function ReadyToTransform() {
  return (
    <section className="bg-[#e5f2f6] py-14 lg:py-20">
      <div className="mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">
        <div className="relative overflow-hidden rounded-3xl bg-[#001c26] px-8 py-16 text-center md:px-16">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-0 h-full w-[100px] -translate-x-1/2 bg-gradient-to-b from-[#00bf6f] to-transparent opacity-15 blur-[90px]" />
            <div className="absolute left-1/3 top-0 h-full w-[60px] -translate-x-1/2 bg-gradient-to-b from-[#00bf6f] to-transparent opacity-10 blur-[60px]" />
          </div>

          <div className="relative z-10">
            <h2 className="mb-4 text-3xl font-bold text-[#fcfcfd] md:text-4xl">
              Ready to Transform<br />Your Payments?
            </h2>
            <p className="mx-auto mb-8 max-w-[520px] text-lg text-[#cdced7] leading-relaxed">
              Join 500+ African businesses already scaling with Kotulapay. Get started today with our free sandbox environment.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/resources/documentation">
                <button className="flex items-center gap-2 rounded-full bg-[#289685] px-8 py-4 font-medium text-[#fcfcfd] transition-colors hover:bg-[#237a71] text-base xl:text-lg whitespace-nowrap">
                  Learn More
                </button>
              </Link>
              <Link to="/contact">
                <button className="flex items-center gap-2 rounded-full border border-[#289685] px-8 py-4 font-medium text-[#fcfcfd] transition-colors hover:bg-[rgba(40,150,133,0.12)] text-base xl:text-lg whitespace-nowrap">
                  Contact Sales
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────── */
export function HomePage() {
  return (
    <div className="min-h-screen w-full bg-[#001c26]">
      <Header />
      <main>
        <HeroSection />
        <BuiltForScale />
        <EverythingYouNeed />
        <OnePlatform />
        <GlobalCardPayment />
        <MobileMoney />
        <BuiltForDevelopers />
        <IndustriesWePower />
        <ReadyToTransform />
      </main>
      <Footer />
    </div>
  );
}
