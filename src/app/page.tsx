import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProofSection from "@/components/ProofSection";
import ProblemSection from "@/components/ProblemSection";
import HowItWorks from "@/components/HowItWorks";
import SetupSection from "@/components/SetupSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/metadata";

export const metadata = {
  ...pageMetadata("Estanza | نظام حجز لمراكز السيارات في الأردن", "صفحة حجز بهوية مركزك تعرض الخدمات والأسعار وتجمع بيانات العميل والسيارة في طلب مرتب عبر واتساب. بدون تطبيق أو حساب، وباقة تبدأ بـ130 دينار.", "/"),
  title: { absolute: "Estanza | نظام حجز لمراكز السيارات في الأردن" },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-[#F8FAF9] pt-20 text-[#05221C]" dir="rtl">
        <Hero />
        <ProofSection />
        <ProblemSection />
        <HowItWorks />
        <SetupSection />
        <PricingSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
