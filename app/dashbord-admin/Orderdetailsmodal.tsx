"use client";

import { useEffect, useState } from "react";
import { X, MapPin, Phone, Mail, CreditCard } from "lucide-react";
import { createClient } from "@/app/supabase/Client";
import { updateOrderStatus } from "@/app/supabase/orders.client";

const statusOptions = ["قيد الانتظار", "قيد التحضير", "تم الشحن", "تم التسليم", "ملغاة"] as const;

const statusColors: Record<string, string> = {
  "قيد الانتظار": "bg-amber-100 text-amber-700",
  "قيد التحضير": "bg-blue-100 text-blue-600",
  "تم الشحن": "bg-purple-100 text-purple-600",
  "تم التسليم": "bg-emerald-100 text-emerald-600",
  "ملغاة": "bg-rose-100 text-rose-600",
};

type OrderItem = {
  id: string;
  product_name: string;
  color: string | null;
  size: string | null;
  quantity: number;
  unit_price: number;
};

export default function OrderDetailsModal({
  orderId,
  onClose,
  onUpdated,
}: {
  orderId: string | null;
  onClose: () => void;
  onUpdated?: () => void; // عشان نحدّث القايمة في OrdersTab بعد تغيير الحالة
}) {
  const [order, setOrder] = useState<any | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<string>("");

  const fetchOrder = async () => {
    if (!orderId) return;
    setLoading(true);
    const supabase = createClient();

    const { data: orderData } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    const { data: itemsData } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);

    setOrder(orderData);
    setPendingStatus(orderData?.status ?? "");
    setItems(itemsData ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (orderId) fetchOrder();
  }, [orderId]);

  const handleSaveStatus = async () => {
    if (!order || pendingStatus === order.status) return;
    setUpdating(true);
    try {
      await updateOrderStatus(order.id, pendingStatus as any);
      setOrder((prev: any) => ({ ...prev, status: pendingStatus }));
      onUpdated?.();
    } catch (err) {
      console.error(err);
      alert("حصل خطأ أثناء تحديث الحالة");
    } finally {
      setUpdating(false);
    }
  };

  if (!orderId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ padding: "20px" }}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div
        dir="rtl"
        className="relative bg-white rounded-xl w-full max-w-xl overflow-y-auto"
        style={{ maxHeight: "90vh", padding: "28px" }}
      >
        <div className="flex items-center justify-between" style={{ marginBottom: "20px" }}>
          <h2 className="font-['Cinzel',serif] text-lg font-bold">تفاصيل الطلب</h2>
          <button onClick={onClose} className="text-[#8a7e6f] hover:text-[#171310] transition-colors" aria-label="إغلاق">
            <X size={20} />
          </button>
        </div>

        {loading || !order ? (
          <p className="text-center text-[#8a7e6f]" style={{ padding: "40px 0" }}>جاري التحميل...</p>
        ) : (
          <div className="flex flex-col gap-6">

            {/* رقم الطلب + الحالة الحالية */}
            <div className="flex items-center justify-between">
              <span className="font-['Cinzel',serif] text-[14px] font-bold">{order.order_number}</span>
              <span className={`inline-block rounded-full text-[12px] font-semibold ${statusColors[order.status]}`} style={{ padding: "5px 14px" }}>
                {order.status}
              </span>
            </div>

            {/* بيانات العميل */}
            <div className="bg-[#faf8f3] rounded-lg" style={{ padding: "16px" }}>
              <p className="font-semibold text-[14px]" style={{ marginBottom: "10px" }}>{order.customer_name}</p>
              <div className="flex flex-col gap-2 text-[12.5px] text-[#5c5346]">
                <div className="flex items-center gap-2"><Phone size={13} className="text-[#c9a84c]" /> <span dir="ltr">{order.phone}</span></div>
                {order.email && <div className="flex items-center gap-2"><Mail size={13} className="text-[#c9a84c]" /> <span dir="ltr">{order.email}</span></div>}
                <div className="flex items-center gap-2"><MapPin size={13} className="text-[#c9a84c]" /> {order.governorate} - {order.address}</div>
                <div className="flex items-center gap-2"><CreditCard size={13} className="text-[#c9a84c]" /> {order.payment_method}</div>
                {order.notes && <p className="text-[#8a7e6f]" style={{ marginTop: "4px" }}>ملاحظات: {order.notes}</p>}
              </div>
            </div>

            {/* عناصر الطلب */}
            <div>
              <p className="font-['Cinzel',serif] text-[12px] tracking-wide" style={{ marginBottom: "10px" }}>المنتجات</p>
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b border-[#1a1410]/6" style={{ padding: "8px 0" }}>
                    <div>
                      <p className="text-[13px]">{item.product_name}</p>
                      <p className="text-[11px] text-[#8a7e6f]">
                        {[item.color, item.size].filter(Boolean).join(" · ")} × {item.quantity}
                      </p>
                    </div>
                    <span className="text-[13px] font-bold">{(item.unit_price * item.quantity).toLocaleString()} ج.م</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between" style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid rgba(26,20,16,0.08)" }}>
                <span className="text-[13px] text-[#8a7e6f]">المجموع الفرعي</span>
                <span className="text-[13px]">{order.subtotal?.toLocaleString()} ج.م</span>
              </div>
              <div className="flex items-center justify-between" style={{ marginTop: "6px" }}>
                <span className="text-[13px] text-[#8a7e6f]">الشحن</span>
                <span className="text-[13px]">{order.shipping_cost?.toLocaleString()} ج.م</span>
              </div>
              <div className="flex items-center justify-between" style={{ marginTop: "8px" }}>
                <span className="font-['Cinzel',serif] text-[14px] font-bold">الإجمالي</span>
                <span className="font-['Cinzel',serif] text-[15px] font-bold text-[#c9a84c]">{order.total?.toLocaleString()} ج.م</span>
              </div>
            </div>

            {/* تغيير حالة الطلب */}
            <div>
              <p className="font-['Cinzel',serif] text-[12px] tracking-wide" style={{ marginBottom: "10px" }}>تحديث حالة الطلب</p>
              <div className="flex gap-2 flex-wrap" style={{ marginBottom: "14px" }}>
                {statusOptions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setPendingStatus(s)}
                    className={`rounded-lg text-[12px] font-semibold border transition-colors ${
                      pendingStatus === s
                        ? "bg-[#171310] text-[#e8dcc8] border-[#171310]"
                        : "border-[#1a1410]/15 text-[#171310] hover:border-[#c9a84c]"
                    }`}
                    style={{ padding: "8px 14px" }}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <button
                onClick={handleSaveStatus}
                disabled={updating || pendingStatus === order.status}
                className="w-full bg-[#c9a84c] text-[#171310] font-['Cinzel',serif] text-[13px] font-bold tracking-[0.15em] rounded-lg hover:bg-[#dbbf6a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ padding: "12px 0" }}
              >
                {updating ? "جاري الحفظ..." : "حفظ الحالة"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}