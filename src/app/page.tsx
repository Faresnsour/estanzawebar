import { source } from "@/i18n/messages";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProofSection from "@/components/ProofSection";
import ProblemSection from "@/components/ProblemSection";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import s from "@/components/estanza.module.css";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata() {
    const result = await pageMetadata(source("site.estanza_booking_systems_for_automotive_centres_in"), source("site.a_branded_booking_page_for_your_automotive"), "/");
    return { ...result, title: { absolute: result.openGraph?.title } };
}
export default function Home() {
    return (<>
      <Navbar />
      <main id="main-content" className={`${s.system} ${s.page}`}>
        <Hero />
        <ProofSection />
        <ProblemSection />
        <HowItWorks />
        <PricingSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>);
}
