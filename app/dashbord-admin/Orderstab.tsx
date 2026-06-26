"use client";

import { Search, Download, Eye } from "lucide-react";
import { createClient } from "@/app/supabase/Client";
import { useState, useEffect } from "react";
import OrderDetailsModal from "./Orderdetailsmodal";

const statusColors: Record<string, string> = {
  "قيد الانتظار": "bg-amber-100 text-amber-700",
  "قيد التحضير": "bg-blue-100 text-blue-600",
  "تم الشحن": "bg-purple-100 text-purple-600",
  "تم التسليم": "bg-emerald-100 text-emerald-600",
  "ملغاة": "bg-rose-100 text-rose-600",
};

export default function OrdersTab() {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setOrders(data || []);
  }

  return (
    <div>
      <div className="flex items-center justify-between" style={{ marginBottom: "8px" }}>
        <div>
          <h1 className="font-['Cinzel',serif] text-2xl font-bold">
            الطلبات
          </h1>
          <p className="text-[13px] text-[#8a7e6f]">
            إدارة طلبات المتجر
          </p>
        </div>

        <button
          className="flex items-center gap-2 bg-[#c9a84c] text-[#171310] rounded-lg"
          style={{ padding: "10px 16px" }}
        >
          <Download size={14} />
          تصدير
        </button>
      </div>

      <div className="bg-white rounded-xl overflow-x-auto" style={{ marginTop: "20px" }}>
        <table className="w-full text-[13.5px]">
          <thead>
            <tr className="text-right text-[11px] text-[#8a7e6f] bg-[#faf8f3] border-b border-[#1a1410]/6">
              <th style={{ padding: "12px 20px" }}>رقم الطلب</th>
              <th style={{ padding: "12px 20px" }}>الاسم</th>
              <th style={{ padding: "12px 20px" }}>الإجمالي</th>
              <th style={{ padding: "12px 20px" }}>الحالة</th>
              <th style={{ padding: "12px 20px" }}>التاريخ</th>
              <th style={{ padding: "12px 20px" }}>الإجراءات</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-[#8a7e6f]" style={{ padding: "24px" }}>
                  لا توجد طلبات
                </td>
              </tr>
            ) : (
              orders.map((o: any) => (
                <tr key={o.id} className="border-b border-[#1a1410]/5 hover:bg-[#faf8f3] transition-colors">
                  <td className="font-semibold" style={{ padding: "12px 20px" }}>{o.order_number ?? o.id}</td>
                  <td style={{ padding: "12px 20px" }}>{o.customer_name}</td>
                  <td className="font-bold" style={{ padding: "12px 20px" }}>{o.total} ج.م</td>
                  <td style={{ padding: "12px 20px" }}>
                    <span
                      className={`inline-block rounded-full text-[11px] font-semibold ${statusColors[o.status] ?? "bg-[#f1ebdc] text-[#5c5346]"}`}
                      style={{ padding: "4px 12px" }}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="text-[#8a7e6f]" style={{ padding: "12px 20px" }}>
                    {new Date(o.created_at).toLocaleDateString("ar-EG")}
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    <button
                      onClick={() => setSelectedOrderId(o.id)}
                      className="flex items-center justify-center rounded-lg border border-[#1a1410]/12 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
                      style={{ width: "34px", height: "34px" }}
                      aria-label="عرض التفاصيل"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <OrderDetailsModal
        orderId={selectedOrderId}
        onClose={() => setSelectedOrderId(null)}
        onUpdated={getOrders}
      />
    </div>
  );
}