"use client";

import Link from "next/link";

const categories = [
  {
    name: "تيشيرت",
    href: "/collections/tshirts",
    image: "/imgs/download (1).jpg",
  },
  {
    name: "بنطلون",
    href: "/collections/pants",
    image: "/imgs/download (2).jpg",
  },
  {
    name: "شورت",
    href: "/collections/shorts",
        image: "/imgs/download.jpg",

  },
  {
    name: "ترنج",
    href: "/collections/tracksuits",
    image: "/imgs/download (3).jpg",
  },
];

export default function EditorialBanner() {
  return (
    <section dir="rtl" className="bg-[#faf8f3]" style={{ padding: "16px 0" }}>

      {/* وسم المجموعة - هوية حورس خفيفة */}
      <div className="text-center" style={{ marginBottom: "32px" }}>
        <span className="italic text-[13px] tracking-[0.25em] text-[#c9a84c]">
          تسوق بحسب الفئة
        </span>
        <h2
          className="font-['Cinzel',serif] text-2xl md:text-3xl font-bold tracking-wide"
          style={{ marginTop: "8px" }}
        >
          Rise of the Ancients
        </h2>
      </div>

      {/* شريط الصور - edge to edge - كل صورة فئة */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.href}
            className="group relative aspect-[3/4] overflow-hidden block"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* تظليل سفلي عشان الاسم يتقرا */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

            {/* اسم الفئة */}
            <span
              className="absolute left-0 right-0 text-center font-['Cinzel',serif] text-white tracking-[0.15em]"
              style={{ bottom: "18px", fontSize: "14px" }}
            >
              {cat.name}
            </span>
          </Link>
        ))}
      </div>

      {/* تعليق تحت الصور */}
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ marginTop: "24px", padding: "0 24px" }}
      >
        <p className="font-['Cinzel',serif] text-[13px] tracking-[0.15em]">
          كل المقاسات متاحة الآن <span className="text-[#c9a84c]">|</span>
        </p>
        <Link
          href="/collections"
          className="font-['Cinzel',serif] text-[12px] tracking-[0.2em] border-b border-[#1a1410] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
          style={{ paddingBottom: "4px" }}
        >
          تسوق المجموعة كاملة ←
        </Link>
      </div>
    </section>
  );
}