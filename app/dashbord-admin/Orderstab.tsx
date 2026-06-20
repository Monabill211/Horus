import { Search, Download, Eye } from "lucide-react";
import { ordersData } from "./data";

export default function OrdersTab() {
  return (
    <div>
      <div className="flex items-center justify-between" style={{ marginBottom: "8px" }}>
        <div>
          <h1 className="font-['Cinzel',serif] text-2xl font-bold">الطلبات</h1>
          <p className="text-[13px] text-[#8a7e6f]" style={{ marginTop: "4px" }}>إدارة طلبات المتجر</p>
        </div>
        <button
          className="flex items-center gap-2 bg-[#c9a84c] text-[#171310] font-semibold text-[13px] rounded-lg hover:bg-[#dbbf6a] transition-colors"
          style={{ padding: "10px 16px" }}
        >
          <Download size={14} /> تصدير
        </button>
      </div>

      <div className="flex items-center gap-3" style={{ margin: "20px 0" }}>
        <select className="input-field border border-[#1a1410]/12 rounded-lg text-[13px] outline-none bg-white" style={{ padding: "10px 14px" }}>
          <option>جميع الحالات</option>
          <option>قيد الانتظار</option>
          <option>تم الشحن</option>
          <option>تم التسليم</option>
          <option>ملغاة</option>
        </select>
        <div className="relative flex-1 max-w-xs">
          <span className="absolute" style={{ right: "12px", top: "50%", transform: "translateY(-50%)" }}>
            <Search size={14} color="#8a7e6f" />
          </span>
          <input
            type="text"
            placeholder="ابحث عن طلب أو عميل..."
            className="input-field w-full border border-[#1a1410]/12 rounded-lg text-[13px] outline-none"
            style={{ padding: "10px 36px 10px 14px" }}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#1a1410]/6 overflow-x-auto">
        <table className="w-full text-[13.5px]">
          <thead>
            <tr className="text-right text-[11px] text-[#8a7e6f] bg-[#faf8f3] border-b border-[#1a1410]/6">
              <th style={{ padding: "12px 20px" }}>معرف الطلب</th>
              <th style={{ padding: "12px 20px" }}>العميل</th>
              <th style={{ padding: "12px 20px" }}>البريد الإلكتروني</th>
              <th style={{ padding: "12px 20px" }}>الإجمالي</th>
              <th style={{ padding: "12px 20px" }}>الحالة</th>
              <th style={{ padding: "12px 20px" }}>التاريخ</th>
              <th style={{ padding: "12px 20px" }}>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((o) => (
              <tr key={o.id} className="border-b border-[#1a1410]/5 hover:bg-[#faf8f3] transition-colors">
                <td className="font-semibold" style={{ padding: "14px 20px" }}>{o.id}</td>
                <td style={{ padding: "14px 20px" }}>{o.customer}</td>
                <td className="text-[#8a7e6f]" dir="ltr" style={{ padding: "14px 20px" }}>{o.email}</td>
                <td className="font-bold" style={{ padding: "14px 20px" }}>{o.total} ج.م</td>
                <td style={{ padding: "14px 20px" }}>
                  <span className={`inline-block rounded-full text-[11px] font-semibold ${o.color}`} style={{ padding: "4px 12px" }}>
                    {o.status}
                  </span>
                </td>
                <td className="text-[#8a7e6f]" style={{ padding: "14px 20px" }}>{o.date}</td>
                <td style={{ padding: "14px 20px" }}>
                  <button
                    className="flex items-center gap-1.5 border border-[#1a1410]/12 rounded-lg text-[12px] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
                    style={{ padding: "6px 12px" }}
                  >
                    <Eye size={12} color="#10b981" /> عرض
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`.input-field:focus { border-color:#c9a84c; box-shadow: 0 0 0 3px rgba(201,168,76,0.15); }`}</style>
    </div>
  );
}