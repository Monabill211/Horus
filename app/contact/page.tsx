"use client";

import { useState } from "react";
import Reveal from "../Reveal";
import HeaderAr from "../components/layout/header";
import FooterAr from "../components/layout/footer";
import { createClient } from "@/app/supabase/Client";

const subjects = [
  "استفسار عن منتج",
  "مشكلة في طلب",
  "استرجاع أو استبدال",
  "تعاون أو شراكة",
  "أخرى",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget; // ← لازم نخدها قبل أي await
    setSending(true);

    const formData = new FormData(form);
    const supabase = createClient();

    const { error } = await supabase.from("messages").insert({
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    });

    setSending(false);

    if (error) {
      console.log(error);
      alert("حصل خطأ أثناء إرسال الرسالة، حاول تاني");
      return;
    }

    form.reset(); // ← دلوقتي form لسه عنصر حقيقي مش null
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
    <HeaderAr />
 
    <div dir="rtl" className="font-['Cormorant_Garamond',serif]" >

      {/* ══════════ هيرو الصفحة ══════════ */}
      <div className="relative bg-[#0e0b07] overflow-hidden" style={{margin:"auto"}}>
        <div
          className="absolute left-1/2 -translate-x-1/2 opacity-[0.05] pointer-events-none"
          style={{ top: "-64px",margin:"auto" }}
    
        >
          <EyeOfHorus size={420} />
        </div>

        <Reveal>
          <div className="relative max-w-6xl mx-auto text-center" style={{ padding: "64px 24px",margin:"auto" }}>
            <span
              className="block italic text-[16px] tracking-[0.25em] text-[#c9a84c]"
              style={{ marginBottom: "12px" }}
            >
              نحن في خدمتك
            </span>
            <h1 className="font-['Cinzel',serif] text-3xl md:text-4xl font-bold tracking-wide text-[#e8dcc8]">
              تواصل معنا
            </h1>
            <p
              className="italic text-[15px] text-[#8a7e6f] max-w-md mx-auto"
              style={{ margin: "12px auto" }}
            >
              عندك سؤال، طلب خاص، أو محتاج مساعدة؟ فريقنا جاهز يسمعك.
            </p>
          </div>
        </Reveal>
      </div>

      {/* ══════════ كاردز المعلومات ══════════ */}
      <div className="bg-[#f5f0e8]">
        <div
          className="max-w-6xl mx-auto relative z-10"
          style={{ padding: "0 24px", margin: "-32px auto " }}
        >
          <div className="grid text-2xl font-bold grid-cols-1 sm:grid-cols-3 gap-5">
            <Reveal>
              <InfoCard
                icon={<PhoneIcon />}
                title="اتصل بنا"
                value="+20 100 123 4567"
                ltr
              />
            </Reveal>
            <Reveal delay={80}>
              <InfoCard icon={<MailIcon />} title="البريد الإلكتروني" value="support@horus.com" ltr dark />
            </Reveal>
            <Reveal delay={160}>
              <InfoCard icon={<ClockIcon />} title="ساعات العمل" value="يومياً 10ص - 11م" />
            </Reveal>
          </div>
        </div>

        {/* ══════════ الفورم + التفاصيل ══════════ */}
        <div className="max-w-6xl mx-auto" style={{ padding: "64px 24px" ,margin:"auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12">

            {/* الفورم */}
            <Reveal>
              <div>
                <span
                  className="block italic text-[13px] tracking-[0.25em] text-[#c9a84c]"
                  style={{ marginBottom: "8px" }}
                >
                  ابعتلنا رسالة
                </span>
                <h2
                  className="font-['Cinzel',serif] text-2xl font-bold tracking-wide text-[#1a1410]"
                  style={{ marginBottom: "32px" }}
                >
                  إزاي نقدر نساعدك؟
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="الاسم">
                      <input
                        name="name"
                        type="text"
                        placeholder="اسمك بالكامل"
                        required
                        className="input-field w-full border border-[#1a1410]/15 outline-none bg-white text-[14px]"
                        style={{ padding: "12px 16px" }}
                      />
                    </Field>
                    <Field label="رقم الهاتف">
                      <input
                        name="phone"
                        type="tel"
                        placeholder="01xxxxxxxxx"
                        required
                        className="input-field w-full border border-[#1a1410]/15 outline-none bg-white text-[14px]"
                        style={{ padding: "12px 16px" }}
                      />
                    </Field>
                  </div>

                  <Field label="الموضوع">
                    <select
                      name="subject"
                      className="input-field w-full border border-[#1a1410]/15 outline-none bg-white text-[14px]"
                      style={{ padding: "12px 16px" }}
                    >
                      {subjects.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="الرسالة">
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="اكتب رسالتك هنا..."
                      required
                      className="input-field w-full border border-[#1a1410]/15 outline-none bg-white text-[14px] resize-none"
                      style={{ padding: "12px 16px" }}
                    />
                  </Field>

                  <button
                    type="submit"
                    disabled={sending}
                    className="self-start bg-[#c9a84c] text-[#0e0b07] rounded-3xl cursor-pointer  font-['Cinzel',serif] text-[16px] font-bold tracking-[0.2em] hover:bg-[#dbbf6a] hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_rgba(201,168,76,0.3)] disabled:opacity-60"
                    style={{ padding: "16px 48px", margin: "4px auto" }}
                  >
                    {sending ? "جاري الإرسال..." : "إرسال الرسالة"}
                  </button>

                  <p
                    className={`text-[13px] italic text-emerald-600 transition-opacity duration-300 ${
                      submitted ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    ✓ تم إرسال رسالتك بنجاح، هنتواصل معاك قريباً
                  </p>
                </form>
              </div>
            </Reveal>

            {/* التفاصيل + الخريطة + السوشيال */}
            <div className="flex flex-col gap-8">
              <Reveal delay={100}>
                <div>
                  <span
                    className="block italic text-[13px] tracking-[0.25em] text-[#c9a84c]"
                    style={{ marginBottom: "8px" }}
                  >
                    زورنا
                  </span>
                  <h3
                    className="font-['Cinzel',serif] text-xl font-bold tracking-wide text-[#1a1410]"
                    style={{ marginBottom: "16px" }}
                  >
                    الفرع الرئيسي
                  </h3>
                  <p className="italic text-[15px] text-[#6e6358] leading-7">
                    15 شارع التحرير، الدقي، الجيزة، جمهورية مصر العربية
                  </p>
                </div>
              </Reveal>

              {/* خريطة - بديل بصري لحد ما تربطها بـ API خرائط حقيقي */}
              <Reveal delay={160}>
                <div className="relative aspect-[4/3] bg-[#0e0b07] overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(90deg, #c9a84c 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#c9a84c]">
                    <PinIcon />
                    <span className="italic text-[13px] text-[#a89880]">الدقي، الجيزة</span>
                  </div>
                </div>
              </Reveal>

              {/* السوشيال */}
              <Reveal delay={220}>
                <div>
                  <p
                    className="font-['Cinzel',serif] text-[11px] tracking-[0.2em] text-[#c9a84c]"
                    style={{ marginBottom: "16px" }}
                  >
                    تابعنا
                  </p>
                  <div className="flex gap-3">
                    <SocialLink href="https://instagram.com"><InstagramIcon /></SocialLink>
                    <SocialLink href="https://x.com"><XIcon /></SocialLink>
                    <SocialLink href="https://tiktok.com"><TikTokIcon /></SocialLink>
                    <SocialLink href="tel:+201001234567"><PhoneOutlineIcon /></SocialLink>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .input-field { transition: all 0.2s; }
        .input-field:focus { border-color: #c9a84c; box-shadow: 0 0 0 3px rgba(201,168,76,0.12); }
      `}</style>
    </div>
       <FooterAr />
    </>
  );
}

/* ─────────────────────────────────────────
   كارت معلومات
───────────────────────────────────────── */
function InfoCard({
  icon,
  title,
  value,
  ltr,
  dark,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  ltr?: boolean;
  dark?: boolean;
}) {
  return (
    <div
      className="bg-white flex flex-col items-center text-center shadow-[0_4px_24px_rgba(26,20,16,0.06)]"
      style={{ padding: "24px" }}
    >
      <div
        className={`rounded-full flex items-center justify-center ${
          dark ? "bg-[#1a1410]/8 text-[#1a1410]" : "bg-[#c9a84c]/10 text-[#c9a84c]"
        }`}
        style={{ width: "48px", height: "48px", marginBottom: "16px" }}
      >
        {icon}
      </div>
      <p className="font-['Cinzel',serif] text-[12px] tracking-wide" style={{ marginBottom: "6px" }}>
        {title}
      </p>
      <p className="text-[15px] text-[#6e6358]" dir={ltr ? "ltr" : undefined}>
        {value}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────
   حقل فورم
───────────────────────────────────────── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[12px] text-[#6e6358]" style={{ marginBottom: "8px" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   رابط سوشيال
───────────────────────────────────────── */
function SocialLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center border border-[#1a1410]/15 hover:border-[#c9a84c] hover:bg-[#c9a84c]/5 transition-colors text-[#1a1410]"
      style={{ width: "40px", height: "40px" }}
    >
      {children}
    </a>
  );
}

/* ─────────────────────────────────────────
   عين حورس الديكورية
───────────────────────────────────────── */
function EyeOfHorus({ size = 200 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.66} viewBox="0 0 120 80" fill="none">
      <path d="M10 40 Q40 10 60 10 Q80 10 110 40 Q80 70 60 70 Q40 70 10 40Z" stroke="#c9a84c" strokeWidth="1.5" />
      <circle cx="60" cy="40" r="16" stroke="#c9a84c" strokeWidth="1.5" />
      <circle cx="60" cy="40" r="4" fill="#c9a84c" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   أيقونات
───────────────────────────────────────── */
function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function PhoneOutlineIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 4h16v16H4z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324A6.162 6.162 0 0012 5.838zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.54V6.78a4.85 4.85 0 01-1.01-.09z" />
    </svg>
  );
}