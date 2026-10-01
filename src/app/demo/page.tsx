import DemoBooking from "./demo-booking";
import { preferredDays } from "@/lib/booking";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";
export const metadata = pageMetadata("جرّب نموذج الحجز", "جرّب اختيار الخدمة والموعد وإدخال بيانات السيارة والعميل، وشاهد كيف تُجهّز رسالة طلب الحجز.", "/demo", false);

export default function DemoPage() {
  return <DemoBooking days={preferredDays(new Date(), "Asia/Amman", 3)} />;
}
