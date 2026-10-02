import { source } from "@/i18n/messages";
import { pageMetadata } from "@/lib/metadata";
import { BookingProvider } from "./_components/booking/booking-flow";
import { Navbar } from "./_components/navbar";
import { Hero } from "./_components/hero";
import { TintLevels } from "./_components/tint-levels";
import { Comparison } from "./_components/comparison";
import { Location } from "./_components/location";
import { Footer } from "./_components/footer";
export function generateMetadata() { return pageMetadata(source("speedCar.speed_car_jo_window_tinting_in_amman"), source("speedCar.compare_window_films_and_glass_coverage_prices"), "/speedcar"); }
export default function SpeedCarPage() {
    return (<BookingProvider>
      <Navbar />
      <main id="speedcar-main">
        <Hero />
        <TintLevels />
        <Comparison />
        <Location />
      </main>
      <Footer />
    </BookingProvider>);
}
