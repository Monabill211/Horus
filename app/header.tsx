"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "الفئات ", href: "/catgry" },
  { label: "المتجر", href: "/shop" },
  { label: "من حورس", href: "/about" },
  { label: "تتبع شحنتك", href: "/trakingorder" },
  { label: "الشحن والاسترجاع", href: "/ShippingPolicy" },
  { label: "دليل المقاسات", href: "/size" },
  { label: "تعليمات العناية", href: "/care" },

];

export default function HeaderAr() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = 2;

  return (
    <header dir="rtl" className="bg-[#0e0b07] text-[#e8dcc8] relative font-[Cairo,sans-serif]">
      {/* خط ذهبي علوي */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />

   
      

      {/* الصف الرئيسي */}
      <div className="flex items-center justify-between px-6 md:px-10 py-5" style={{padding:"20px"}}>
        {/* اللوجو */}
        <Link href="/" className="flex items-center gap-3">
          <HorusEye />
          <div className="flex flex-col">
            <span className="font-bold text-2xl md:text-3xl tracking-[0.3em] text-[#e8dcc8]" style={{padding:"5px"}}>
              HORAS
            </span>
       
          </div>
        </Link>

        {/* الناف بار - ديسكتوب */}
        <nav className="hidden md:flex items-center gap-8  ">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-[16px] tracking-wide text-[#a89880] hover:text-[#e8dcc8] transition-colors group"
            >
              {link.label}
              <span className="absolute -bottom-1 right-0 w-0 h-px bg-[#c9a84c] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* الأزرار */}
        <div className="flex items-center gap-4">
          <button aria-label="بحث" className="text-[#a89880] hover:text-[#c9a84c] transition-colors">
            <SearchIcon />
          </button>
          <button
            aria-label="القائمة"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden text-[#a89880] hover:text-[#c9a84c] transition-colors"
          >
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* القائمة - موبايل */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col gap-4 px-6 py-5 border-t border-[#c9a84c]/20">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-wide text-[#a89880] hover:text-[#c9a84c] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}

      {/* خط ذهبي سفلي */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/70 to-transparent" />
    </header>
  );
}

/* ── أيقونات ── */
function HorusEye() {
  return (
    <svg width="40" height="40" viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="36" rx="28" ry="14" stroke="#c9a84c" strokeWidth="1.5" />
      <circle cx="40" cy="36" r="8" stroke="#c9a84c" strokeWidth="1.5" />
      <circle cx="40" cy="36" r="3" fill="#c9a84c" />
      <path d="M12 36 Q6 30 4 24" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M68 36 Q74 30 76 24" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M34 44 Q32 54 28 62 Q32 58 40 60 Q48 58 52 62 Q48 54 46 44" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}