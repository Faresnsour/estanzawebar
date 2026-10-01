import { pageMetadata } from "@/lib/metadata";

import { Navbar } from "./_components/navbar";
import { AutoSpaHero } from "./_components/auto-spa-hero";
import { TrustBar } from "./_components/trust-bar";
import { CareFinder } from "./_components/care-finder";
import { Results } from "./_components/results";
import { Services } from "./_components/services";
import { Location } from "./_components/location";
import { AutoSpaFooter } from "./_components/footer";
import { BookingProvider } from "./_components/booking/booking-sheet";

export const metadata = pageMetadata("DOPAMINE Auto Spa — خدمات وطلب موعد", "خدمات العناية بالسيارات لدى DOPAMINE في مسقط. اختر فئة السيارة والباقة وجهّز طلب موعد عبر واتساب.", "/autoSpa");

export default function AutoSpaPage() {
  return (
    <BookingProvider>
      <Navbar />

      <main id="main-content">
        <AutoSpaHero />
        <TrustBar />
        <CareFinder />
        <Results />
        <Services />
        <Location />
      </main>

      <AutoSpaFooter />
    </BookingProvider>
  );
}