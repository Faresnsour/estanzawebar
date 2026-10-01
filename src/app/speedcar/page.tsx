import { pageMetadata } from "@/lib/metadata";
import { BookingProvider } from "./_components/booking/booking-flow";
import { Navbar } from "./_components/navbar";
import { Hero } from "./_components/hero";
import { TintLevels } from "./_components/tint-levels";
import { Comparison } from "./_components/comparison";
import { Location } from "./_components/location";
import { Footer } from "./_components/footer";

export const metadata = pageMetadata("Speed Car Jo — تظليل وعزل حراري في عمّان", "قارن خدمات التظليل وأسعار الزجاج لدى Speed Car Jo، وحدد تفاصيل السيارة والوقت المفضّل لطلب موعد.", "/speedcar");

export default function SpeedCarPage() {
  return (
    <BookingProvider>
      <Navbar />
      <main id="speedcar-main">
        <Hero />
        <TintLevels />
        <Comparison />
        <Location />
      </main>
      <Footer />
    </BookingProvider>
  );
}
