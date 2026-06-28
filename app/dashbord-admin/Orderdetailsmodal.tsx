"use client";

import { useEffect, useState } from "react";
import { X, MapPin, Phone, Mail, CreditCard } from "lucide-react";
import { createClient } from "@/app/supabase/Client";
import { updateOrderStatus } from "@/app/supabase/orders.client";

const statusOptions = [
  "قيد الانتظار",
  "قيد التحضير",
  "تم الشحن",
  "تم التسليم",
  "ملغاة",
] as const;

const statusColors: Record<string, string> = {
  "قيد الانتظار": "bg-amber-100 text-amber-700",
  "قيد التحضير": "bg-blue-100 text-blue-600",
  "تم الشحن": "bg-purple-100 text-purple-600",
  "تم التسليم": "bg-emerald-100 text-emerald-600",
  "ملغاة": "bg-rose-100 text-rose-600",
};

type Order = {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  email: string | null;
  governorate: string;
  address: string;
  payment_method: string;
  notes: string |null;
  subtotal: number;
  shipping_cost: number;
  total: number;
  status: string;
  created_at: string;
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
  onUpdated?: () => void;
}) {
  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [pendingStatus, setPendingStatus] = useState("");

  const fetchOrder = async () => {
    if (!orderId) return;

    setLoading(true);

    const supabase = createClient();

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError) {
      console.log(orderError);
      setLoading(false);
      return;
    }

    const { data: itemsData, error: itemsError } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);

    if (itemsError) {
      console.log(itemsError);
    }

    const currentOrder = orderData as unknown as Order;

    setOrder(currentOrder);
    setPendingStatus(currentOrder.status);
    setItems((itemsData ?? []) as OrderItem[]);
    setLoading(false);
  };

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const handleSaveStatus = async () => {
    if (!order) return;
    if (pendingStatus === order.status) return;

    setUpdating(true);

    try {
      await updateOrderStatus(order.id, pendingStatus as any);

      setOrder({
        ...order,
        status: pendingStatus,
      });

      onUpdated?.();
    } catch (err) {
      console.log(err);
      alert("حصل خطأ أثناء تحديث الحالة");
    } finally {
      setUpdating(false);
    }
  };

  if (!orderId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div
        dir="rtl"
        className="relative bg-white rounded-xl w-full max-w-xl overflow-y-auto"
        style={{ maxHeight: "90vh", padding: "28px" }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-lg">
            تفاصيل الطلب
          </h2>

          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {loading || !order ? (
          <p className="text-center py-10">
            جاري التحميل...
          </p>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <span>{order.order_number}</span>

              <span
                className={`rounded-full px-4 py-1 text-xs font-bold ${statusColors[order.status]}`}
              >
                {order.status}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
              <p className="font-bold">{order.customer_name}</p>

              <div className="flex gap-2 items-center">
                <Phone size={14} />
                {order.phone}
              </div>

              {order.email && (
                <div className="flex gap-2 items-center">
                  <Mail size={14} />
                  {order.email}
                </div>
              )}

              <div className="flex gap-2 items-center">
                <MapPin size={14} />
                {order.governorate} - {order.address}
              </div>

              <div className="flex gap-2 items-center">
                <CreditCard size={14} />
                {order.payment_method}
              </div>

              {order.notes && (
                <p>{order.notes}</p>
              )}
            </div>

            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b pb-2"
                >
                  <div>
                    <p>{item.product_name}</p>
                    <p className="text-sm text-gray-500">
                      {[item.color, item.size]
                        .filter(Boolean)
                        .join(" - ")}
                      {" × "}
                      {item.quantity}
                    </p>
                  </div>

                  <span>
                    {item.unit_price * item.quantity} ج.م
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between">
                <span>المجموع الفرعي</span>
                <span>{order.subtotal} ج.م</span>
              </div>

              <div className="flex justify-between">
                <span>الشحن</span>
                <span>{order.shipping_cost} ج.م</span>
              </div>

              <div className="flex justify-between font-bold">
                <span>الإجمالي</span>
                <span>{order.total} ج.م</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setPendingStatus(status)}
                    className={`px-4 py-2 rounded-lg border ${
                      pendingStatus === status
                        ? "bg-black text-white"
                        : ""
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <button
                onClick={handleSaveStatus}
                disabled={
                  updating ||
                  pendingStatus === order.status
                }
                className="w-full bg-yellow-500 py-3 rounded-lg font-bold"
              >
                {updating
                  ? "جاري الحفظ..."
                  : "حفظ الحالة"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}