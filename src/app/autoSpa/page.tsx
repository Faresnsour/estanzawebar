import type { Metadata } from "next";

import { Navbar } from "./_components/navbar";
import { AutoSpaHero } from "./_components/auto-spa-hero";
import { TrustBar } from "./_components/trust-bar";
import { CareFinder } from "./_components/care-finder";
import { Results } from "./_components/results";
import { Services } from "./_components/services";
import { Location } from "./_components/location";
import { AutoSpaFooter } from "./_components/footer";
import { BookingProvider } from "./_components/booking/booking-sheet";

export const metadata: Metadata = {
  title: "DOPAMINE Auto Spa | Feel the Shine",
  description:
    "تعرّف على خدمات DOPAMINE للعناية بالسيارات في المعبيلة، مسقط، وجهّز طلب موعد عبر واتساب.",
};

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