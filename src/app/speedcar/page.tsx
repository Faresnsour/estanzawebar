import type { Metadata } from "next";
import { BookingProvider } from "./_components/booking/booking-flow";
import { Navbar } from "./_components/navbar";
import { Hero } from "./_components/hero";
import { TintLevels } from "./_components/tint-levels";
import { Comparison } from "./_components/comparison";
import { Location } from "./_components/location";
import { Footer } from "./_components/footer";

export const metadata: Metadata = {
  title: "Speed Car Jo | تظليل وعزل حراري في عمّان",
  description:
    "قارن خيارات التظليل والسيراميك و3M لدى Speed Car Jo، اختر الزجاج، وجهّز طلب موعد عبر واتساب. الياسمين، قرب جسر الإرسال.",
};

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
