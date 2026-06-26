"use client";

import { useState } from "react";
import Link from "next/link";

const collections = [
  { label: "تشرتات", href: "/shop" },
  { label: "شورت", href: "/shop" },
  { label: "بنطلون", href: "/shop" },
  { label: "ترنج", href: "/shop" },
];

const helpLinks = [
  { label: "دليل المقاسات", href: "/size" },
  { label: "الشحن والاسترجاع", href: "/ShippingPolicy" },
  { label: "تتبع الطلب", href: "/trakingorder" },
  { label: "تعليمات العناية", href: "/care" },
  { label: "تواصل معنا", href: "/contact" },
];

const legalLinks = [
  { label: "الخصوصية", href: "/PrivacyPolicy" },
  { label: "الشروط والأحكام", href: "/terms" },
  { label: "ملفات تعريف الارتباط", href: "/cookies" },
];

export default function FooterAr() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer dir="rtl" className="bg-[#0e0b07] text-[#a89880] font-[Cairo,sans-serif]">

      {/* خط ذهبي علوي */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/70 to-transparent" />

      {/* الأقسام الرئيسية */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 px-6 md:px-10 py-14 border-b border-[#c9a84c]/20" style={{padding:"40px"}}>

        {/* البراند */}
        <div className="sm:col-span-2 lg:col-span-1">
          <span className="block font-bold text-2xl tracking-[0.25em] text-[#e8dcc8] mb-1">
            حورس
          </span>
          <p className="text-[16px] italic text-[#6e6358] leading-7 max-w-[260px]">
            وُلدت من رمال مصر القديمة، صُنعت لمن يحمل روح الملوك في عروقه.
          </p>

          <div className="flex gap-3 mt-5" style={{marginTop:"20px"}}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="إنستجرام"
              className="w-9 h-9 flex items-center justify-center border border-[#c9a84c]/30 hover:border-[#c9a84c] hover:bg-[#c9a84c]/10 hover:text-[#c9a84c] transition-colors"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="إكس"
              className="w-9 h-9 flex items-center justify-center border border-[#c9a84c]/30 hover:border-[#c9a84c] hover:bg-[#c9a84c]/10 hover:text-[#c9a84c] transition-colors"
            >
              <XIcon />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="تيك توك"
              className="w-9 h-9 flex items-center justify-center border border-[#c9a84c]/30 hover:border-[#c9a84c] hover:bg-[#c9a84c]/10 hover:text-[#c9a84c] transition-colors"
            >
              <TikTokIcon />
            </a>
          </div>
        </div>

        {/* التشكيلات */}
        <div>
          <p className="text-[16px] tracking-[0.2em] text-[#c9a84c] mb-5" style={{marginBottom:"20px"}}>الفئات</p>
          <ul className="flex flex-col gap-2.5">
            {collections.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[13px] italic text-[#6e6358] hover:text-[#c9a84c] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* المساعدة */}
        <div>
          <p className="text-[11px] tracking-[0.2em] text-[#c9a84c] mb-5" style={{marginBottom:"20px"}}>مساعدة</p>
          <ul className="flex flex-col gap-2.5">
            {helpLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[13px] italic text-[#6e6358] hover:text-[#c9a84c] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* النشرة البريدية */}
        <div>
          <p className="text-[11px] tracking-[0.2em] text-[#c9a84c] mb-5" style={{marginBottom:"20px"}} >الدائرة الداخلية</p>
          <p className="text-[13px] italic text-[#6e6358] leading-7 mb-4" style={{marginBottom:"16px"}} >
            انضم لعائلة حورس. وصول حصري للإطلاقات الجديدة والعروض المقدسة.
          </p>

          {subscribed ? (
            <p className="text-[13px] italic text-[#c9a84c] tracking-wide">
              مرحباً بك في الدائرة الداخلية ✦
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="البريد الإلكتروني"
               style={{padding:"5px"}}
                className="flex-1 min-w-0 bg-white/5 border border-[#c9a84c]/25 border-l-0 px-3.5 py-2.5 text-[13px] italic text-[#e8dcc8] placeholder:text-[#4a4136] outline-none focus:border-[#c9a84c]/60"
              />
              <button
                type="submit"
                className="bg-[#c9a84c]/15 border border-[#c9a84c]/25 px-4 py-2.5 text-[10px] tracking-wide text-[#c9a84c] hover:bg-[#c9a84c]/30 transition-colors whitespace-nowrap"
              >
                اشترك
              </button>
            </form>
          )}
        </div>
      </div>

      {/* الشريط السفلي */}
      <div className="flex flex-col sm:flex-row items-center text-center justify-between gap-3 px-6 md:px-10 py-4 text-center sm:text-right">
        <span className="text-[11px] italic text-white text-center tracking-wide ">
          © {new Date().getFullYear()} حورس. جميع الحقوق محفوظة.
        </span>
        <div className="flex gap-6">
          {legalLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[12px] tracking-wide text-white hover:text-[#c9a84c] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 md:px-10 py-4 text-center sm:text-right" style={{padding:'5px'}}>
        <span className="text-[13px] italic text-white tracking-wide " style={{margin:"auto"}}>
          devlpar by 
          <span className="bg-[#c9a84c] cursor-pointer rounded-2xl" style={{padding:"3px"}}>MoSalah</span>
        </span>
    
      
      </div>

      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />
    </footer>
  );
}

/* ── أيقونات السوشيال ── */
function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.54V6.78a4.85 4.85 0 01-1.01-.09z" />
    </svg>
  );
}