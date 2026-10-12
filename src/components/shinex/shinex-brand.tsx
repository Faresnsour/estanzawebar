import Image from "next/image";
import s from "./shinex.module.css";
export default function ShinexBrand({ name }: { name: string }) {
  return <a href="#top" className={s.brand} aria-label={name}>
    <Image src="/shinex/logo.jpg" alt="" width={48} height={48} priority />
    <span><strong>{name}</strong><small lang="en" dir="ltr" translate="no">SHINEX</small></span>
  </a>;
}
