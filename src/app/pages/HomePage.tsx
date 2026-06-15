import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { StatsSection } from '../components/StatsSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { PaymentMethodsSection } from '../components/PaymentMethodsSection';
import { IndustrySection } from '../components/IndustrySection';
import { DeveloperSection } from '../components/DeveloperSection';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';

export function HomePage() {
  return (
    <div className="min-h-screen w-full bg-[#001c26]">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <PaymentMethodsSection />
        <IndustrySection />
        <DeveloperSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
