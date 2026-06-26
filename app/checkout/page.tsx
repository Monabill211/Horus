"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../cart/Cartcontext";
import { createOrder } from "@/app/supabase/orders.client";
import HeaderAr from "../components/layout/header";
import FooterAr from "../components/layout/footer";

export default function Checkout() {
  const router = useRouter();
  const { items, subtotal, clearCart, updateQuantity, removeItem } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [payment, setPayment] = useState<"cod" | "card">("cod");
  const [errorMsg, setErrorMsg] = useState("");
  const [placedOrderNumber, setPlacedOrderNumber] = useState<string | null>(null);

  const shipping = subtotal > 0 ? 60 : 0;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);

    try {
      const order = await createOrder({
        customerName: formData.get("name") as string,
        phone: formData.get("phone") as string,
        governorate: formData.get("governorate") as string,
        address: formData.get("address") as string,
        paymentMethod: payment === "cod" ? "الدفع عند الاستلام" : "دفع إلكتروني",
        shippingCost: shipping,
        items: items.map((item) => ({
          productName: item.name,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
          unitPrice: item.price,
        })),
      });

      clearCart();
      setPlacedOrderNumber(order.order_number);
    } catch (err: any) {
  console.log("ERROR =>", err);
  console.log("MESSAGE =>", err?.message);
  console.log("DETAILS =>", err?.details);
  console.log("HINT =>", err?.hint);

  setErrorMsg(err?.message || "حصل خطأ أثناء تأكيد الطلب");
}
     finally {
      setSubmitting(false);
    }
  };

  /* ══════════ رسالة تأكيد الطلب بعد الإرسال ══════════ */
  if (placedOrderNumber) {
    return (
      <>
        <HeaderAr />
        <div
          dir="rtl"
          className="flex flex-col items-center justify-center text-center bg-[#f7f4ee] font-[Cairo,sans-serif]"
          style={{ minHeight: "70vh", padding: "60px 24px" }}
        >
          <div
            className="flex items-center justify-center rounded-full bg-white shadow-sm"
            style={{ width: "76px", height: "76px", marginBottom: "24px" }}
          >
            <CheckCircleIcon />
          </div>

          <h1
            className="font-['Cinzel',serif] text-2xl font-bold text-[#171310]"
            style={{ marginBottom: "10px" }}
          >
            تم استلام طلبك بنجاح
          </h1>

          <p className="text-[14px] text-[#6e6358]" style={{ marginBottom: "18px" }}>
            هنتواصل معاك على رقم الهاتف لتأكيد الطلب، وهيوصلك خلال 2-5 أيام عمل.
          </p>

          <div
            className="bg-white rounded-xl shadow-sm flex items-center gap-3"
            style={{ padding: "14px 24px", marginBottom: "28px" }}
          >
            <span className="text-[12px] text-[#8a7e6f]">رقم الطلب</span>
            <span className="font-['Cinzel',serif] text-[15px] font-bold text-[#c9a84c]" dir="ltr">
              {placedOrderNumber}
            </span>
          </div>

          <button
            onClick={() => router.push("/shop")}
            className="font-['Cinzel',serif] text-[12px] tracking-[0.15em] text-[#171310] border-b border-[#171310] hover:text-[#c9a84c] hover:border-[#c9a84c] transition-colors"
            style={{ paddingBottom: "4px" }}
          >
            متابعة التسوق ←
          </button>
        </div>
        <FooterAr />
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <HeaderAr />
        <div dir="rtl" className="text-center bg-[#f7f4ee]" style={{ padding: "120px 24px" }}>
          <div
            className="inline-flex items-center justify-center rounded-full bg-white text-[#c9a84c] shadow-sm"
            style={{ width: "72px", height: "72px", marginBottom: "20px" }}
          >
            <BagIcon />
          </div>
          <p className="text-[16px] text-[#6e6358]" style={{ marginBottom: "16px" }}>
            السلة فاضية، لسه مفيش منتجات للدفع
          </p>
          <a
            href="/shop"
            className="font-['Cinzel',serif] text-[12px] tracking-[0.15em] text-[#171310] border-b border-[#171310] hover:text-[#c9a84c] hover:border-[#c9a84c] transition-colors"
            style={{ paddingBottom: "4px" }}
          >
            تسوق الآن ←
          </a>
        </div>
        <FooterAr />
      </>
    );
  }

  return (
    <>
      <HeaderAr />

      <div dir="rtl" className="bg-[#f7f4ee] font-[Cairo,sans-serif] min-h-screen">

        {/* ══════════ مؤشر الخطوات ══════════ */}
        <div className="bg-white border-b border-[#1a1410]/8">
          <div
            className="max-w-5xl mx-auto flex items-center justify-center"
            style={{ padding: "22px 24px", gap: "10px", margin: "auto" }}
          >
            <Step label="السلة" state="done" />
            <StepLine />
            <Step label="الشحن والدفع" state="active" />
            <StepLine />
            <Step label="تأكيد الطلب" state="pending" />
          </div>
        </div>

        <div
          className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8"
          style={{ padding: "36px 24px 64px", margin: "auto" }}
        >

          {/* ══════════ فورم الشحن والدفع ══════════ */}
          <div className="flex flex-col gap-6">

            <div className="bg-white rounded-2xl shadow-sm" style={{ padding: "28px" }}>
              <h2 className="font-['Cinzel',serif] text-[15px] tracking-wide text-[#171310]" style={{ marginBottom: "20px" }}>
                بيانات الشحن
              </h2>

              <form id="checkout-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="الاسم بالكامل" icon={<UserIcon />}>
                    <input name="name" required type="text" placeholder="اسمك بالكامل" className="input-field" style={fieldStyle} />
                  </Field>
                  <Field label="رقم الهاتف" icon={<PhoneIcon />}>
                    <input name="phone" required type="tel" placeholder="01xxxxxxxxx" className="input-field" style={fieldStyle} dir="ltr" />
                  </Field>
                </div>

                <Field label="المحافظة" icon={<MapPinIcon />}>
                  <select name="governorate" required className="input-field" style={fieldStyle} defaultValue="">
                    <option value="" disabled>اختر المحافظة</option>
                    <option>القاهرة</option>
                    <option>الجيزة</option>
                    <option>الإسكندرية</option>
                    <option>أخرى</option>
                  </select>
                </Field>

                <Field label="العنوان بالتفصيل" icon={<HomeIcon />}>
                  <textarea name="address" required rows={3} placeholder="اسم الشارع، رقم المبنى، علامة مميزة..." className="input-field resize-none" style={fieldStyle} />
                </Field>

                {errorMsg && <p className="text-[12.5px] text-rose-600">{errorMsg}</p>}
              </form>
            </div>

            {/* طريقة الدفع - كروت قابلة للضغط */}
            <div className="bg-white rounded-2xl shadow-sm" style={{ padding: "28px" }}>
              <h2 className="font-['Cinzel',serif] text-[15px] tracking-wide text-[#171310]" style={{ marginBottom: "20px" }}>
                طريقة الدفع
              </h2>

              <div className="flex flex-col gap-3">
                <PaymentOption
                  active={payment === "cod"}
                  onClick={() => setPayment("cod")}
                  icon={<CashIcon />}
                  title="الدفع عند الاستلام"
                  desc="ادفع كاش لما يوصلك الطلب"
                />
                <PaymentOption
                  active={payment === "card"}
                  onClick={() => setPayment("card")}
                  icon={<CardIcon />}
                  title="فيزا / فودافون كاش / InstaPay"
                  desc="دفع إلكتروني آمن وفوري"
                />
              </div>
            </div>
          </div>

          {/* ══════════ ملخص الطلب ══════════ */}
          <div style={{ position: "sticky", top: "24px", height: "fit-content" }}>
            <div className="bg-white rounded-2xl shadow-sm" style={{ padding: "28px" }}>
              <h2 className="font-['Cinzel',serif] text-[15px] tracking-wide text-[#171310]" style={{ marginBottom: "20px" }}>
                ملخص الطلب ({items.length})
              </h2>

              <div className="flex flex-col" style={{ marginBottom: "20px", gap: "16px" }}>
                {items.map((item) => (
                  <div key={item.cartId} className="flex items-start" style={{ gap: "12px" }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover rounded-lg shrink-0"
                      style={{ width: "60px", height: "76px" }}
                    />
                    <div className="flex-1 flex flex-col">
                      <p className="text-[13px] font-bold text-[#171310]" style={{ marginBottom: "2px" }}>
                        {item.name}
                      </p>
                      {(item.size || item.color) && (
                        <p className="text-[11px] text-[#8a7e6f]" style={{ marginBottom: "8px" }}>
                          {[item.color, item.size].filter(Boolean).join(" · ")}
                        </p>
                      )}

                      <div className="flex items-center justify-between" style={{ marginTop: "auto" }}>
                        {/* عداد الكمية */}
                        <div className="flex items-center rounded-lg border border-[#1a1410]/12">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                            className="flex items-center justify-center text-[#171310] hover:bg-[#1a1410]/5"
                            style={{ width: "26px", height: "26px" }}
                          >
                            −
                          </button>
                          <span className="text-[12px] text-center" style={{ width: "26px" }}>
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                            className="flex items-center justify-center text-[#171310] hover:bg-[#1a1410]/5"
                            style={{ width: "26px", height: "26px" }}
                          >
                            +
                          </button>
                        </div>

                        <span className="text-[13px] font-bold text-[#171310]">
                          {(item.price * item.quantity).toLocaleString()} ج.م
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.cartId)}
                      aria-label="حذف"
                      className="text-[#b0a090] hover:text-red-500 transition-colors shrink-0"
                      style={{ marginTop: "2px" }}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#1a1410]/8" style={{ paddingTop: "16px" }}>
                <div className="flex items-center justify-between text-[13px] text-[#6e6358]" style={{ marginBottom: "8px" }}>
                  <span>المجموع الفرعي</span>
                  <span>{subtotal.toLocaleString()} ج.م</span>
                </div>
                <div className="flex items-center justify-between text-[13px] text-[#6e6358]" style={{ marginBottom: "16px" }}>
                  <span>الشحن</span>
                  <span>{shipping.toLocaleString()} ج.م</span>
                </div>
                <div className="flex items-center justify-between border-t border-[#1a1410]/8" style={{ paddingTop: "14px", marginBottom: "20px" }}>
                  <span className="font-['Cinzel',serif] text-[14px] font-bold text-[#171310]">الإجمالي</span>
                  <span className="font-['Cinzel',serif] text-[19px] font-bold text-[#c9a84c]">
                    {total.toLocaleString()} ج.م
                  </span>
                </div>

                <button
                  type="submit"
                  form="checkout-form"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#171310] text-white font-['Cinzel',serif] text-[13px] font-bold tracking-[0.15em] rounded-xl hover:bg-[#2a201a] transition-colors disabled:opacity-60"
                  style={{ padding: "16px 0" }}
                >
                  {submitting ? (
                    "جاري تأكيد الطلب..."
                  ) : (
                    <>
                      <LockIcon /> تأكيد الطلب
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8a7e6f]" style={{ marginTop: "12px" }}>
                  <ShieldIcon /> دفع آمن ومضمون 100%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterAr />

      <style>{`.input-field:focus { border-color:#c9a84c; box-shadow: 0 0 0 3px rgba(201,168,76,0.12); }`}</style>
    </>
  );
}

/* ─────────────────────────────────────────
   مؤشر الخطوات
───────────────────────────────────────── */
function Step({ label, state }: { label: string; state: "done" | "active" | "pending" }) {
  return (
    <div className="flex items-center" style={{ gap: "8px", margin: "auto" }}>
      <span
        className={`flex items-center justify-center rounded-full font-bold transition-colors ${
          state === "done"
            ? "bg-[#171310] text-[#c9a84c]"
            : state === "active"
            ? "bg-[#c9a84c] text-[#171310]"
            : "bg-[#f1ebdc] text-[#b0a090]"
        }`}
        style={{ width: "26px", height: "26px", fontSize: "11px" }}
      >
        {state === "done" ? <CheckIcon /> : state === "active" ? "2" : "3"}
      </span>
      <span
        className={`text-[12.5px] hidden sm:inline ${
          state === "pending" ? "text-[#b0a090]" : "text-[#171310] font-semibold"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function StepLine() {
  return <span style={{ width: "32px", height: "1px", background: "rgba(26,20,16,0.15)" }} />;
}

/* ─────────────────────────────────────────
   حقل الفورم
───────────────────────────────────────── */
function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[12px] text-[#6e6358]" style={{ marginBottom: "8px" }}>
        <span className="text-[#c9a84c]">{icon}</span>
        {label}
      </label>
      {children}
    </div>
  );
}

const fieldStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid rgba(26,20,16,0.12)",
  borderRadius: "10px",
  padding: "11px 14px",
  fontSize: "14px",
  outline: "none",
  background: "#fff",
};

/* ─────────────────────────────────────────
   كارت طريقة الدفع
───────────────────────────────────────── */
function PaymentOption({
  active,
  onClick,
  icon,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl border text-right transition-all ${
        active ? "border-[#c9a84c] bg-[#c9a84c]/[0.06]" : "border-[#1a1410]/10 hover:border-[#1a1410]/20"
      }`}
      style={{ padding: "14px 16px" }}
    >
      <span
        className={`flex items-center justify-center rounded-full shrink-0 ${
          active ? "bg-[#c9a84c] text-[#171310]" : "bg-[#f7f4ee] text-[#8a7e6f]"
        }`}
        style={{ width: "38px", height: "38px" }}
      >
        {icon}
      </span>
      <span className="flex-1">
        <p className="text-[13.5px] font-semibold text-[#171310]">{title}</p>
        <p className="text-[11.5px] text-[#8a7e6f]">{desc}</p>
      </span>
      <span
        className={`flex items-center justify-center rounded-full border-2 shrink-0 ${
          active ? "border-[#c9a84c] bg-[#c9a84c]" : "border-[#d4c9b0]"
        }`}
        style={{ width: "20px", height: "20px" }}
      >
        {active && <span className="text-[#171310]"><CheckIcon size={11} /></span>}
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────
   أيقونات
───────────────────────────────────────── */
function CheckIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.6">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12.5l2.8 2.8L16 9.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  );
}

function CashIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="6" width="20" height="13" rx="2" />
      <circle cx="12" cy="12.5" r="3.5" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}