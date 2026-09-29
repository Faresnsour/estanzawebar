"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpLeft, Sparkles, Car } from "lucide-react";
import Navbar from "@/components/Navbar";

type Project = {
  id: string;
  category: "auto" | "clinics";
  title: string;
  client: string;
  location: string;
  desc: string;
  tags: string[];
  liveUrl: string;
  image: string;
};

const PROJECTS_AUTO: Project[] = [
  {
    id: "wash33",
    category: "auto",
    title: "منظومة حجز واستعراض خدمات العناية بالمركبات الفاخرة",
    client: "WASH 33 Car Care",
    location: "عمّان، الأردن",
    desc: "تصميم تجربة Atelier راقية متوافقة كلياً مع الجوال لحجز غسيل السيارات المتنقل والدراي كلين، مع ربط تأكيد فوري عبر واتساب وحساب ديناميكي للأسعار.",
    tags: ["غسيل متنقل", "دراي كلين", "حجز واتساب فوري", "تصميم خاص"],
    liveUrl: "/wash33",
    image: "/hero-car.jpg",
  }
];

const PROJECTS_CLINICS: Project[] = [
  {
    id: "derma-clinic",
    category: "clinics",
    title: "نظام جدولة وحجز استشارات وجلسات العناية بالبشرة والليزر",
    client: "نموذج مركز تجميل وسبا طبي",
    location: "عمّان، الأردن",
    desc: "واجهة استقبال رقمية لتنظيم مواعيد الفيلر، البوتوكس، والليزر مع فلترة حسب الطبيب والخدمة وأتمتة تأكيد المواعيد لتفادي التغيب.",
    tags: ["عيادات جلدية", "حجز جلسات", "إدارة أطباء", "تأكيد تلقائي"],
    liveUrl: "https://wa.me/962790899175?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D9%85%D8%B9%D8%A7%D9%8A%D9%86%D8%A9%20%D9%86%D8%B8%D8%A7%D9%85%20%D8%A7%D9%84%D8%B9%D9%8A%D8%A7%D8%AF%D8%A7%D8%AA%20%D8%A7%D9%84%D8%B7%D8%A8%D9%8A%D8%A9",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
  }
];

export default function ShowcasePage() {
  const [activeSection, setActiveSection] = useState<"auto" | "clinics" | null>(null);

  return (
    <div dir="rtl" className="min-h-screen bg-[#F8FAF9] text-[#05221C] font-sans antialiased">
      <Navbar />

      <main className="pt-28 pb-20 max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* الحالة 1: تصفح الأقسام الرئيسية */}
        {activeSection === null && (
          <div className="space-y-12">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#008774]/10 border border-[#008774]/20 text-[#008774] text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#008774] animate-pulse" />
                معرض الأعمال والأنظمة المجهزة
              </div>
              
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#05221C] leading-tight">
                اختر مجال نشاطك <br />
                <span className="text-[#008774]">لاستعراض النماذج المخصصة.</span>
              </h1>
              
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                أنظمة حجز رقمية متخصصة ومصممة بدقة لتلائم متطلبات قطاعك ورفع كفاءة مبيعاتك وتثبيت المواعيد.
              </p>
            </div>

            {/* بطاقات الأقسام */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* قسم استوديوهات السيارات */}
              <div 
                onClick={() => setActiveSection("auto")}
                className="group relative cursor-pointer bg-white border-2 border-slate-200/90 hover:border-[#008774] rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#008774]/10 border border-[#008774]/20 flex items-center justify-center text-[#008774] group-hover:bg-[#008774] group-hover:text-white transition-all duration-300">
                    <Car className="w-7 h-7" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#008774] uppercase tracking-wider">
                      قطاع العناية بالمركبات
                    </span>
                    <h2 className="text-2xl font-bold text-[#05221C] group-hover:text-[#008774] transition-colors">
                      مراكز واستوديوهات السيارات
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      أنظمة حجز متطورة لمراكز تركيب الـ PPF، النانو سيراميك، التلميع الاحترافي، والتجهيز والغسيل المتنقل في عمّان.
                    </p>
                  </div>
                </div>

                <div className="pt-8 flex items-center justify-between border-t border-slate-100 mt-6 text-sm font-bold text-[#05221C] group-hover:text-[#008774]">
                  <span>استعراض مشاريع السيارات</span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#008774]/10 flex items-center justify-center transition-colors">
                    <ArrowLeft className="w-4 h-4 text-[#05221C] group-hover:text-[#008774]" />
                  </div>
                </div>
              </div>

              {/* قسم العيادات الطبية */}
              <div 
                onClick={() => setActiveSection("clinics")}
                className="group relative cursor-pointer bg-white border-2 border-slate-200/90 hover:border-[#008774] rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#008774]/10 border border-[#008774]/20 flex items-center justify-center text-[#008774] group-hover:bg-[#008774] group-hover:text-white transition-all duration-300">
                    <Sparkles className="w-7 h-7" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#008774] uppercase tracking-wider">
                      القطاع الطبي والتجميلي
                    </span>
                    <h2 className="text-2xl font-bold text-[#05221C] group-hover:text-[#008774] transition-colors">
                      العيادات والمراكز الطبية
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      واجهات حجز وجدولة ذكية لجلسات الليزر، الفيلر، العناية بالبشرة، والاستشارات الطبية مع تقليل التغيب بنسبة 40%.
                    </p>
                  </div>
                </div>

                <div className="pt-8 flex items-center justify-between border-t border-slate-100 mt-6 text-sm font-bold text-[#05221C] group-hover:text-[#008774]">
                  <span>استعراض مشاريع العيادات</span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#008774]/10 flex items-center justify-center transition-colors">
                    <ArrowLeft className="w-4 h-4 text-[#05221C] group-hover:text-[#008774]" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* الحالة 2: مشاريع السيارات */}
        {activeSection === "auto" && (
          <div className="space-y-8">
            <button
              onClick={() => setActiveSection(null)}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#05221C] hover:text-[#008774] transition-colors py-2 px-3 rounded-lg hover:bg-slate-200/50 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>الرجوع إلى كافة الأقسام</span>
            </button>

            <div className="space-y-2 pb-6 border-b border-slate-200">
              <span className="text-xs font-bold text-[#008774] uppercase">مشاريع منجزة</span>
              <h2 className="text-3xl font-extrabold text-[#05221C]">مراكز واستوديوهات السيارات</h2>
              <p className="text-sm text-slate-600 font-normal">استعراض الأنظمة الرقمية المجهزة لمراكز العناية بالسيارات في الأردن.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PROJECTS_AUTO.map((p) => (
                <div key={p.id} className="bg-white border-2 border-slate-200/90 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-[16/10] w-full bg-[#05221C]">
                      <Image src={p.image} alt={p.title} fill className="object-cover" />
                    </div>
                    <div className="p-6 space-y-3">
                      <span className="text-xs font-bold text-[#008774]">{p.client} • {p.location}</span>
                      <h3 className="text-lg font-bold text-[#05221C]">{p.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">{p.desc}</p>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {p.tags.map((t) => (
                          <span key={t} className="text-[11px] font-medium bg-[#F8FAF9] text-[#05221C] border border-slate-200 px-2.5 py-1 rounded-md">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <Link href={p.liveUrl} className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#05221C] hover:bg-[#008774] text-white text-xs font-bold transition-colors">
                      <span>معاينة النظام الحقيقي</span>
                      <ArrowUpLeft className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* الحالة 3: مشاريع العيادات */}
        {activeSection === "clinics" && (
          <div className="space-y-8">
            <button
              onClick={() => setActiveSection(null)}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#05221C] hover:text-[#008774] transition-colors py-2 px-3 rounded-lg hover:bg-slate-200/50 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>الرجوع إلى كافة الأقسام</span>
            </button>

            <div className="space-y-2 pb-6 border-b border-slate-200">
              <span className="text-xs font-bold text-[#008774] uppercase">مشاريع منجزة</span>
              <h2 className="text-3xl font-extrabold text-[#05221C]">العيادات والمراكز الطبية والتجميلية</h2>
              <p className="text-sm text-slate-600 font-normal">أنظمة استقبال وحجز مصممة لرفع كفاءة الجدولة للعيادات.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PROJECTS_CLINICS.map((p) => (
                <div key={p.id} className="bg-white border-2 border-slate-200/90 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-[16/10] w-full bg-[#05221C]">
                      <Image src={p.image} alt={p.title} fill className="object-cover" />
                    </div>
                    <div className="p-6 space-y-3">
                      <span className="text-xs font-bold text-[#008774]">{p.client} • {p.location}</span>
                      <h3 className="text-lg font-bold text-[#05221C]">{p.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">{p.desc}</p>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {p.tags.map((t) => (
                          <span key={t} className="text-[11px] font-medium bg-[#F8FAF9] text-[#05221C] border border-slate-200 px-2.5 py-1 rounded-md">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#05221C] hover:bg-[#008774] text-white text-xs font-bold transition-colors">
                      <span>طلب معاينة النظام</span>
                      <ArrowUpLeft className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}