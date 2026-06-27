"use client";

import { useState } from "react";
import { createClient } from "@/app/supabase/Client";
import { SettingsField } from "../Shared";

export default function SettingsTab() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({ text: "كلمة السر الجديدة وتأكيدها غير متطابقين", error: true });
      return;
    }
    if (newPassword.length < 6) {
      setMessage({ text: "كلمة السر لازم تكون 6 حروف/أرقام على الأقل", error: true });
      return;
    }

    setSaving(true);
    const supabase = createClient();
    const { data, error } = await supabase.rpc("update_admin_password", {
      old_password: oldPassword,
      new_password: newPassword,
    });
    setSaving(false);

    if (error) {
      console.log(error);
      setMessage({ text: "حصل خطأ، حاول تاني", error: true });
      return;
    }

    if (data === true) {
      setMessage({ text: "تم تغيير كلمة السر بنجاح ✓", error: false });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setMessage({ text: "كلمة السر القديمة غلط", error: true });
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h1 className="font-['Cinzel',serif] text-2xl font-bold">الإعدادات</h1>
        <p className="text-[13px] text-[#8a7e6f]" style={{ marginTop: "4px" }}>بيانات المتجر والتواصل والدفع</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* بيانات المتجر */}
        <div className="bg-white rounded-xl border border-[#1a1410]/6" style={{ padding: "24px" }}>
          <h3 className="font-['Cinzel',serif] text-[13px] tracking-wide" style={{ marginBottom: "18px" }}>بيانات المتجر</h3>
          <div className="flex flex-col gap-4">
            <SettingsField label="اسم المتجر" defaultValue="حورس" />
            <SettingsField label="البريد الإلكتروني" defaultValue="support@horus.com" dir="ltr" />
            <SettingsField label="رقم الهاتف" defaultValue="+20 100 123 4567" dir="ltr" />
            <SettingsField label="العنوان" defaultValue="15 شارع التحرير، الدقي، الجيزة" />
          </div>
        </div>

        {/* السوشيال ميديا */}
        <div className="bg-white rounded-xl border border-[#1a1410]/6" style={{ padding: "24px" }}>
          <h3 className="font-['Cinzel',serif] text-[13px] tracking-wide" style={{ marginBottom: "18px" }}>روابط السوشيال ميديا</h3>
          <div className="flex flex-col gap-4">
            <SettingsField label="إنستجرام" defaultValue="instagram.com/horus" dir="ltr" />
            <SettingsField label="تيك توك" defaultValue="tiktok.com/@horus" dir="ltr" />
            <SettingsField label="إكس" defaultValue="x.com/horus" dir="ltr" />
          </div>
        </div>

        {/* طرق الدفع */}
        <div className="bg-white rounded-xl border border-[#1a1410]/6" style={{ padding: "24px" }}>
          <h3 className="font-['Cinzel',serif] text-[13px] tracking-wide" style={{ marginBottom: "18px" }}>طرق الدفع المفعّلة</h3>
          <div className="flex flex-col gap-3">
            {["الدفع عند الاستلام", "فيزا / ماستركارد", "فودافون كاش", "InstaPay"].map((method) => (
              <label key={method} className="flex items-center justify-between">
                <span className="text-[13px]">{method}</span>
                <input type="checkbox" defaultChecked className="accent-[#c9a84c]" style={{ width: "18px", height: "18px" }} />
              </label>
            ))}
          </div>
        </div>

        {/* الشحن */}
        <div className="bg-white rounded-xl border border-[#1a1410]/6" style={{ padding: "24px" }}>
          <h3 className="font-['Cinzel',serif] text-[13px] tracking-wide" style={{ marginBottom: "18px" }}>إعدادات الشحن</h3>
          <div className="flex flex-col gap-4">
            <SettingsField label="شحن القاهرة والجيزة (ج.م)" defaultValue="50" />
            <SettingsField label="شحن باقي المحافظات (ج.م)" defaultValue="70" />
            <SettingsField label="مدة التوصيل المتوقعة" defaultValue="2-5 أيام عمل" />
          </div>
        </div>

        {/* تغيير كلمة سر الأدمن */}
        <div className="bg-white rounded-xl border border-[#1a1410]/6" style={{ padding: "24px" }}>
          <h3 className="font-['Cinzel',serif] text-[13px] tracking-wide" style={{ marginBottom: "18px" }}>
            تغيير كلمة سر لوحة التحكم
          </h3>
          <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
            <div>
              <label className="block text-[11px] text-[#8a7e6f]" style={{ marginBottom: "6px" }}>كلمة السر الحالية</label>
              <input
                type="password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full border border-[#1a1410]/12 rounded-lg text-[13px] outline-none"
                style={{ padding: "10px 14px" }}
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#8a7e6f]" style={{ marginBottom: "6px" }}>كلمة السر الجديدة</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-[#1a1410]/12 rounded-lg text-[13px] outline-none"
                style={{ padding: "10px 14px" }}
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#8a7e6f]" style={{ marginBottom: "6px" }}>تأكيد كلمة السر الجديدة</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-[#1a1410]/12 rounded-lg text-[13px] outline-none"
                style={{ padding: "10px 14px" }}
              />
            </div>

            {message && (
              <p className={`text-[12.5px] ${message.error ? "text-rose-600" : "text-emerald-600"}`}>
                {message.text}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="bg-[#171310] text-[#e8dcc8] font-['Cinzel',serif] text-[12.5px] font-bold tracking-[0.15em] rounded-lg hover:bg-[#2a201a] transition-colors disabled:opacity-60"
              style={{ padding: "11px 0" }}
            >
              {saving ? "جاري الحفظ..." : "تغيير كلمة السر"}
            </button>
          </form>
        </div>
      </div>

      <button
        className="bg-[#c9a84c] text-[#171310] font-['Cinzel',serif] text-[13px] font-bold tracking-[0.15em] rounded-lg hover:bg-[#dbbf6a] transition-colors"
        style={{ padding: "12px 40px", marginTop: "24px" }}
      >
        حفظ التغييرات
      </button>
    </div>
  );
}