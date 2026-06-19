"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "هل يمكنني استرجاع أو استبدال المنتج؟",
    a: "نعم، يوجد استرجاع واستبدال خلال 14 يوم من تاريخ استلام الطلب، بشرط أن يكون المنتج بحالته الأصلية ولم يتم استخدامه.",
  },
  {
    q: "هل يوجد معاينة قبل الدفع؟",
    a: "بالطبع، يمكنك معاينة المنتج عند استلامه قبل دفع المبلغ، وفي حالة عدم الرضا يمكنك رفض الاستلام دون أي رسوم إضافية.",
  },
  {
    q: "كم تستغرق مدة التوصيل؟",
    a: "يتم التوصيل داخل القاهرة والجيزة من 2 إلى 3 أيام عمل، وباقي المحافظات من 3 إلى 5 أيام عمل.",
  },
  {
    q: "ما هي طرق الدفع المتاحة؟",
    a: "نوفر الدفع عند الاستلام (كاش)، بالإضافة إلى الدفع الإلكتروني عبر فيزا، فودافون كاش، وInstaPay.",
  },
  {
    q: "هل الشحن متاح لجميع محافظات مصر؟",
    a: "نعم، نقوم بالشحن لجميع محافظات جمهورية مصر العربية بدون استثناء.",
  },
];

export default function FaqAndPayment() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section dir="rtl" className="relative bg-[#0e0b07] text-[#a89880] overflow-hidden">

      {/* خط ذهبي علوي */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/70 to-transparent" />

      {/* عين حورس ديكور خلفية */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-[0.04] pointer-events-none">
        <EyeOfHorus size={420} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-20 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16" style={{padding:"80px",margin:'auto'}}>

        {/* ── الأسئلة الشائعة ── */}
        <div>
          <Reveal>
            <span className="block font-['Cormorant_Garamond',serif] italic text-[13px] tracking-[0.25em] text-[#c9a84c] mb-2">
              عندك سؤال؟
            </span>
            <h2 className="font-['Cinzel',serif] text-2xl md:text-[34px] font-bold tracking-[0.05em] text-[#e8dcc8] mb-10">
              الأسئلة الشائعة
            </h2>
          </Reveal>

          <div className="flex flex-col">
            {faqs.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <Reveal key={i} delay={i * 80}>
                  <div className="border-b border-[#c9a84c]/15">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-4 py-5 text-right group"
                      style={{padding:"16px"}}
                    >
                      <span
                        className={`font-['Cormorant_Garamond',serif] text-[16px] md:text-[18px] transition-colors ${
                          isOpen ? "text-[#c9a84c]" : "text-[#e8dcc8] group-hover:text-[#c9a84c]"
                        }`}
                      >
                        {item.q}
                      </span>
                      <span
                        className={`shrink-0 w-8 h-8 flex items-center justify-center border transition-all duration-300 ${
                          isOpen
                            ? "rotate-45 border-[#c9a84c] text-[#c9a84c] bg-[#c9a84c]/10"
                            : "border-[#c9a84c]/30 text-[#a89880] group-hover:border-[#c9a84c]"
                        }`}
                      >
                        <PlusIcon />
                      </span>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? "max-h-40 pb-5" : "max-h-0"
                      }`}
                    >
                      <p className="font-['Cormorant_Garamond',serif] italic text-[14px] leading-7 text-[#8a7e6f] max-w-md">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* ── طرق الدفع والضمانات ── */}
        <div className="flex flex-col gap-12">

          {/* طرق الدفع */}
          <div>
            <Reveal delay={100}>
              <span className="block font-['Cormorant_Garamond',serif] italic text-[13px] tracking-[0.25em] text-[#c9a84c] mb-2">
                آمن وسهل
              </span>
              <h2 className="font-['Cinzel',serif] text-2xl font-bold tracking-[0.05em] text-[#e8dcc8] mb-7" style={{marginBottom:"30px"}}>
                طرق الدفع
              </h2>
            </Reveal>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "فيزا", sub: "Visa", icon: <VisaIcon /> },
                { label: "ماستركارد", sub: "Mastercard", icon: <MastercardIcon /> },
                { label: "فودافون كاش", sub: "Vodafone Cash", icon: <PhonePayIcon /> },
                { label: "InstaPay", sub: "انستاباي", icon: <InstaPayIcon /> },
                { label: "الدفع عند الاستلام", sub: "Cash on Delivery", icon: <CashIcon /> },
              ].map((p, i) => (
                <Reveal key={p.label} delay={150 + i * 60}>
                  <PaymentCard label={p.label} sub={p.sub}>
                    {p.icon}
                  </PaymentCard>
                </Reveal>
              ))}
            </div>
          </div>

          {/* الضمانات */}
          <Reveal delay={200}>
            <div className="flex flex-col gap-5 border-t border-[#c9a84c]/15 pt-8" style={{padding:"32px"}}>
              <Guarantee icon={<ReturnIcon />} title="استرجاع مضمون" desc="استرجاع أو استبدال خلال 14 يوم" />
              <Guarantee icon={<EyeIcon />} title="معاينة قبل الدفع" desc="افحص المنتج قبل دفع أي مبلغ" />
              <Guarantee icon={<TruckIcon />} title="شحن لكل المحافظات" desc="توصيل سريع لباب البيت" />
            </div>
          </Reveal>
        </div>

      </div>

      {/* خط ذهبي سفلي */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/70 to-transparent" />
    </section>
  );
}

/* ── كارت طريقة الدفع ── */
function PaymentCard({
  label,
  sub,
  children,
}: {
  label: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2.5 bg-white/[0.03] border border-[#c9a84c]/15 px-3 py-5 hover:border-[#c9a84c]/60 hover:bg-white/[0.05] transition-colors">
      <div className="h-7 flex items-center justify-center">{children}</div>
      <div className="text-center">
        <p className="font-['Cinzel',serif] text-[16px] font-bold tracking-wide text-[#e8dcc8] leading-tight">{label}</p>
        <p className="font-['Cormorant_Garamond',serif] italic font-bold text-[10px] text-[#6e6358] tracking-wide">{sub}</p>
      </div>
    </div>
  );
}

/* ── عنصر ضمان ── */
function Guarantee({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="shrink-0 w-10 h-10 flex items-center justify-center border border-[#c9a84c]/40 text-[#c9a84c]">
        {icon}
      </div>
      <div>
        <p className="font-['Cinzel',serif] text-[13px] tracking-wide text-[#e8dcc8]">{title}</p>
        <p className="font-['Cormorant_Garamond',serif] italic text-[13px] text-[#8a7e6f]">{desc}</p>
      </div>
    </div>
  );
}

/* ── عين حورس الديكورية ── */
function EyeOfHorus({ size = 200 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.66} viewBox="0 0 120 80" fill="none">
      <path d="M10 40 Q40 10 60 10 Q80 10 110 40 Q80 70 60 70 Q40 70 10 40Z" stroke="#c9a84c" strokeWidth="1.5" />
      <circle cx="60" cy="40" r="16" stroke="#c9a84c" strokeWidth="1.5" />
      <circle cx="60" cy="40" r="4" fill="#c9a84c" />
      <path d="M10 40 Q2 28 0 16" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M110 40 Q118 28 120 16" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M52 56 Q48 68 44 76 Q52 72 60 74 Q68 72 76 76 Q72 68 68 56" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/* ── أيقونات ── */
function PlusIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
      <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
    </svg>
  );
}

function VisaIcon() {
  return (
    <svg width="40" height="14" viewBox="0 0 48 16" fill="none">
      <rect width="48" height="16" rx="2" fill="#1A1F71" />
      <text x="24" y="11.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontStyle="italic" fontWeight="700" fontSize="8" fill="#fff">
        VISA
      </text>
    </svg>
  );
}

function MastercardIcon() {
  return (
    <svg width="40" height="24" viewBox="0 0 48 30">
      <circle cx="18" cy="15" r="11" fill="#EB001B" />
      <circle cx="30" cy="15" r="11" fill="#F79E1B" fillOpacity="0.9" />
    </svg>
  );
}

function PhonePayIcon() {
  return (
    <svg width="20" height="28" viewBox="0 0 24 32" fill="none" stroke="#E60000" strokeWidth="1.5">
      <rect x="3" y="2" width="18" height="28" rx="3" />
      <line x1="3" y1="23" x2="21" y2="23" />
      <circle cx="12" cy="26.5" r="1" fill="#E60000" stroke="none" />
    </svg>
  );
}

function InstaPayIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#9b7fc9" strokeWidth="1.5">
      <path d="M12 2L4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CashIcon() {
  return (
    <svg width="28" height="20" viewBox="0 0 32 22" fill="none" stroke="#e8dcc8" strokeWidth="1.3">
      <rect x="1" y="1" width="30" height="20" rx="2" />
      <circle cx="16" cy="11" r="5" />
    </svg>
  );
}

function ReturnIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7v6h6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 13a9 9 0 1015-6.7L21 9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 3h13v13H1z" strokeLinejoin="round" />
      <path d="M14 8h4l3 3v5h-7V8z" strokeLinejoin="round" />
      <circle cx="6" cy="18.5" r="1.8" />
      <circle cx="17" cy="18.5" r="1.8" />
    </svg>
  );
}