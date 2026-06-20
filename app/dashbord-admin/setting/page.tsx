import { SettingsField } from "../Shared";

export default function SettingsTab() {
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