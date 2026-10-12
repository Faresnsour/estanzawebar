import Image from "next/image";
import Link from "next/link";
import s from "./booking-site.module.css";
export default function BookingBrand({ label }: { label: string }) {
  return <Link href="/" className={s.brand} aria-label={label}><Image src="/logotube2.png" alt="" width={42} height={42} loading="eager" /><span dir="ltr" translate="no">Estanza</span></Link>;
}
