"use client";

import { useState } from "react";
import Link from "next/link";

export default function FooterAr() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer dir="ltr" className="bg-white text-[#0e0b07] font-[Cairo,sans-serif]" style={{ borderTop: "1px solid #0e0b07" }}>

      {/* View all products */}
      <Link
        href="/shop"
        className="block text-center hover:bg-[#f5f0e8] transition-colors"
        style={{ padding: "14px", borderBottom: "1px solid #0e0b07", fontSize: "13px" }}
      >
        View all products
      </Link>

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        className="block w-full text-center hover:bg-[#f5f0e8] transition-colors"
        style={{ padding: "14px", borderBottom: "1px solid #0e0b07", fontSize: "13px", fontWeight: 700, letterSpacing: "0.05em" }}
      >
        BACK TO TOP
      </button>

      {/* About + Newsletter */}
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ borderBottom: "1px solid #0e0b07" }}
      >
        <div
          style={{ padding: "28px", borderBottom: "1px solid #0e0b07" }}
          className="md:border-l md:border-b-0"
        >
          <p style={{ fontSize: "13px", lineHeight: "1.7", marginBottom: "16px" }}>
            HORUS builds a contemporary streetwear universe shaped by Egyptian heritage, mythology, and modern design.
          </p>
          <p style={{ fontSize: "13px", lineHeight: "1.7" }}>
            The Eye of Horus embodies vision and protection, symbolizing balance, power, and the coexistence of past and present.
          </p>
        </div>

        <div style={{ padding: "28px" }}>
          <p style={{ fontSize: "13px", marginBottom: "16px" }}>
            Join Horus members - get 10% off your first order, plus early access to weekly drops.
          </p>

          {subscribed ? (
            <p style={{ fontSize: "13px", fontWeight: 700 }}>Welcome to Horus ✦</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col">
              <input
                type="email"
                placeholder="your@email.address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  padding: "14px 16px",
                  fontSize: "13px",
                  border: "1px solid #0e0b07",
                  outline: "none",
                  marginBottom: "10px",
                  color: "#0e0b07",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "14px",
                  background: "#0e0b07",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                }}
              >
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Links row */}
      <div
        className="flex flex-wrap items-center justify-center "
        style={{ padding: "16px", borderBottom: "1px solid #0e0b07", gap: "28px" }}
      >
        <Link href="/about" style={{ fontSize: "13px" }} className="hover:underline">
          ABOUT HORUS
        </Link>
        <Link href="/trakingorder" style={{ fontSize: "13px" }} className="hover:underline">
          TRAKING ORDER 
        </Link>
        <Link href="/care" style={{ fontSize: "13px" }} className="hover:underline">
          CARE PRODUCTS
        </Link>
        <Link href="/contact" style={{ fontSize: "13px" }} className="hover:underline">
          CONTACT
        </Link>
        <Link href="/PrivacyPolicy" style={{ fontSize: "13px" }} className="hover:underline">
          PRIVACY
        </Link>
        <Link href="/shop" style={{ fontSize: "13px" }} className="hover:underline">
          SHIPPING
        </Link>
        <Link href="/ShippingPolicy" style={{ fontSize: "13px" }} className="hover:underline">
          REFUND
        </Link>
      </div>

      {/* Social icons */}
      <div
        className="flex items-center justify-center"
        style={{ padding: "16px", borderBottom: "1px solid #0e0b07", gap: "20px" }}
      >
        <a href="https://www.instagram.com/horas_al_malik" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <InstagramIcon />
        </a>
        <a   href="https://www.tiktok.com/@horas_al_malik?_r=1&_t=ZS-95fJnYRNanl" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
          <TikTokIcon />
        </a>
        <a   href="https://www.facebook.com/share/1CWyiEa9At/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
           <FacebookIcon />
        </a>
        <a href="https://wa.me/01223281534" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <WhatsAppIcon />
        </a>
      </div>

      {/* Payment icons */}
      <div
        className="flex flex-wrap items-center justify-center"
        style={{ padding: "16px", borderBottom: "1px solid #0e0b07", gap: "8px" }}
      >
        <PaymentBadge bg="#1A1F71" text="VISA" />
        <PaymentBadge bg="#" text="cash" textColor="#21dd1b" white />
        <PaymentBadge bg="#fff" text="vodafone cash" textColor="#dd1b1b" border />
        <PaymentBadge bg="#000" text="Mastercard" />
   
      </div>

      {/* Copyright */}
      <p style={{ padding: "14px", textAlign: "center", fontSize: "11px", color: "#6e6358" }}>
        © {new Date().getFullYear()} HORUS. All rights reserved.
      </p>
    </footer>
  );
}

/* ── شارة طريقة الدفع ── */
function PaymentBadge({
  bg,
  text,
  textColor = "#fff",
  white = false,
  border = false,
}: {
  bg: string;
  text: string;
  textColor?: string;
  white?: boolean;
  border?: boolean;
}) {
  return (
    <span
      style={{
        background: white ? "#fff" : bg,
        color: white ? "#000" : textColor,
        fontSize: "10px",
        fontWeight: 700,
        padding: "6px 10px",
        borderRadius: "3px",
        border: border ? "1px solid #d4c9b0" : "none",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
  );
}

/* ── أيقونات السوشيال ── */
function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324A6.162 6.162 0 0012 5.838zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.54V6.78a4.85 4.85 0 01-1.01-.09z" />
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

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.6 6.32A8.86 8.86 0 0012.05 4C7.4 4 3.6 7.8 3.6 12.46c0 1.62.45 3.13 1.23 4.43L4 21l4.21-1.36a8.84 8.84 0 003.84.87h.01c4.65 0 8.45-3.8 8.45-8.46a8.4 8.4 0 00-2.91-5.73zM12.06 19.4a7 7 0 01-3.58-.98l-.26-.15-2.66.85.85-2.6-.17-.27a6.93 6.93 0 01-1.07-3.7c0-3.84 3.13-6.97 6.99-6.97 1.87 0 3.62.73 4.94 2.05a6.92 6.92 0 012.05 4.93c0 3.85-3.14 6.84-7.09 6.84z" />
    </svg>
  );
}