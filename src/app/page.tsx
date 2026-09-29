import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import HowItWorks from '@/components/HowItWorks';
import PricingSection from '@/components/PricingSection';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-24 sm:pt-28" dir="rtl">
      <Navbar />
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <PricingSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
