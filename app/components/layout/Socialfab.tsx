"use client";

import { useState } from "react";

const socialLinks = [
  {
    name: "واتساب",
    href: "https://wa.me/01223281534",
    bg: "#25D366",
    icon: <WhatsAppIcon />,
  },
  {
    name: "إنستجرام",
    href: "https://www.instagram.com/horas_al_malik",
    bg: "linear-gradient(135deg, #f58529, #dd2a7b, #8134af, #515bd4)",
    icon: <InstagramIcon />,
  },
  {
    name: "تيك توك",
    href: "https://www.tiktok.com/@horas_al_malik?_r=1&_t=ZS-95fJnYRNanl",
    bg: "#000000",
    icon: <TikTokIcon />,
  },
  {
    name: "فيسبوك",
    href: "https://www.facebook.com/share/1CWyiEa9At/?mibextid=wwXIfr",
    bg: "#1877F2",
    icon: <FacebookIcon />,
  },
];

export default function SocialFAB() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 50 }}>

      {/* أيقونات السوشيال - بتتكشف لفوق */}
      <div className="flex flex-col items-center" style={{ marginBottom: "14px", gap: "12px" }}>
        {socialLinks.map((item, i) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
            className="flex items-center justify-center rounded-full shadow-lg transition-all duration-300"
            style={{
              width: "48px",
              height: "48px",
              background: item.bg,
              color: "#fff",
              opacity: open ? 1 : 0,
              transform: open ? "scale(1) translateY(0)" : "scale(0.4) translateY(16px)",
              transitionDelay: open ? `${i * 60}ms` : "0ms",
              pointerEvents: open ? "auto" : "none",
            }}
          >
            {item.icon}
          </a>
        ))}
      </div>

      {/* الزرار الرئيسي */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "إغلاق" : "تواصل معنا"}
        className="relative flex items-center justify-center rounded-full shadow-xl transition-transform duration-300"
        style={{
          width: "58px",
          height: "58px",
          background: "#25D366",
          color: "#fff",
          transform: open ? "rotate(135deg)" : "rotate(0deg)",
        }}
      >
        {/* حلقة نابضة تلفت النظر لما يكون مقفول */}
        {!open && (
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: "#25D366", opacity: 0.5 }}
          />
        )}
        <span className="relative z-10">
          <PlusIcon />
        </span>
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────
   أيقونات
───────────────────────────────────────── */
function PlusIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
      <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.6 6.32A8.86 8.86 0 0012.05 4C7.4 4 3.6 7.8 3.6 12.46c0 1.62.45 3.13 1.23 4.43L4 21l4.21-1.36a8.84 8.84 0 003.84.87h.01c4.65 0 8.45-3.8 8.45-8.46a8.4 8.4 0 00-2.91-5.73zM12.06 19.4a7 7 0 01-3.58-.98l-.26-.15-2.66.85.85-2.6-.17-.27a6.93 6.93 0 01-1.07-3.7c0-3.84 3.13-6.97 6.99-6.97 1.87 0 3.62.73 4.94 2.05a6.92 6.92 0 012.05 4.93c0 3.85-3.14 6.84-7.09 6.84zm3.83-5.15c-.21-.1-1.23-.6-1.42-.67-.19-.07-.33-.1-.47.1-.14.21-.54.67-.66.8-.12.14-.24.15-.45.05-.21-.1-1.21-.45-2.06-1.27-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.1-.52.1-.1.22-.27.33-.4.11-.14.15-.24.22-.4.07-.16.04-.3-.04-.4-.08-.1-.71-1.7-.97-2.32-.16-.4-.33-.34-.46-.35-.12-.01-.27-.01-.41-.01-.14 0-.37.05-.57.27-.2.21-.76.74-.76 1.8s.78 2.1.89 2.24c.11.14 1.51 2.3 3.67 3.13 1.82.7 2.19.59 2.59.55.4-.04 1.3-.53 1.48-1.04.18-.51.18-.94.13-1.04-.05-.1-.21-.16-.43-.27z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324A6.162 6.162 0 0012 5.838zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.54V6.78a4.85 4.85 0 01-1.01-.09z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z"/>
    </svg>
  );
}