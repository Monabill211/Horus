"use client";

import { useState } from "react";
import { createClient } from "@/app/supabase/Client";
import HeaderAr from "../components/layout/header";
import FooterAr from "../components/layout/footer";
import Socialfab from "../components/layout/Socialfab";

const statusDisplay: Record<string, string> = {
  "قيد الانتظار": "🟡 الطلب قيد الانتظار",
  "قيد التحضير": "🟡 جاري تجهيز الطلب",
  "تم الشحن": "🚚 الطلب لدى شركة الشحن",
  "تم التسليم": "✅ تم توصيل الطلب",
  "ملغاة": "❌ تم إلغاء الطلب",
};

export default function TrackOrder() {
  const [tracking, setTracking] = useState("");
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleTrack = async () => {
    if (!tracking) return;

    setLoading(true);
    setNotFound(false);

    const supabase = createClient();
    const { data, error } = await supabase
      .from("orders")
      .select("status")
      .eq("order_number", tracking.trim())
      .single();

    setLoading(false);

    if (error || !data) {
      setNotFound(true);
      setShow(true);
      return;
    }

    setStatus(statusDisplay[data.status] ?? data.status);
    setShow(true);
  };

  return (
    <>
      <HeaderAr />

      <section
        className="bg-[#0d0d0d] min-h-screen flex items-center justify-center"
        style={{ padding: "100px 20px" }}
      >
        <div
          className="bg-[#181818] border border-[#D4AF37] rounded-3xl shadow-2xl"
          style={{ maxWidth: "600px", width: "100%", padding: "50px" }}
        >
          <h1
            className="text-center text-[#D4AF37] font-bold"
            style={{ fontSize: "40px", marginBottom: "15px" }}
          >
            تتبع الشحنة
          </h1>

          <p
            className="text-center text-gray-400"
            style={{ marginBottom: "35px" }}
          >
            أدخل رقم الطلب لمعرفة حالته. (مثال: ORD-123456)
          </p>

          <input
            type="text"
            placeholder="رقم الطلب"
            value={tracking}
            onChange={(e) => setTracking(e.target.value)}
            dir="ltr"
            className="w-full bg-[#222] border border-gray-700 rounded-xl text-white outline-none focus:border-[#D4AF37]"
            style={{ padding: "18px", marginBottom: "25px" }}
          />

          <button
            onClick={handleTrack}
            disabled={loading}
            className="w-full bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-yellow-500 duration-300 disabled:opacity-60"
            style={{ padding: "18px" }}
          >
            {loading ? "جاري البحث..." : "تتبع الشحنة"}
          </button>
        </div>

        {/* Popup */}
        {show && (
          <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
            <div
              className="bg-[#181818] border border-[#D4AF37] rounded-2xl text-center"
              style={{ padding: "40px", width: "400px" }}
            >
              <h2
                className="text-[#D4AF37] font-bold"
                style={{ marginBottom: "25px", fontSize: "30px" }}
              >
                {notFound ? "غير موجود" : "حالة الشحنة"}
              </h2>

              <p
                className="text-white"
                style={{ fontSize: "22px", marginBottom: "30px" }}
              >
                {notFound ? "لم نجد طلب بهذا الرقم، تأكد من الرقم وحاول تاني." : status}
              </p>

              <button
                onClick={() => setShow(false)}
                className="bg-[#D4AF37] text-black rounded-lg hover:bg-yellow-500 duration-300"
                style={{ padding: "12px 35px" }}
              >
                إغلاق
              </button>
            </div>
          </div>
        )}
      </section>
 <Socialfab />
      <FooterAr />
    </>
  );
}