"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";
import { createClient } from "@/app/supabase/Client";
import { StatCard } from "./Shared";

const statusColors: Record<string, string> = {
  "قيد الانتظار": "bg-amber-100 text-amber-700",
  "قيد التحضير": "bg-blue-100 text-blue-600",
  "تم الشحن": "bg-purple-100 text-purple-600",
  "تم التسليم": "bg-emerald-100 text-emerald-600",
  "ملغاة": "bg-rose-100 text-rose-600",
};

export default function OverviewTab({ onViewOrders }: { onViewOrders: () => void }) {
  const [lowStock, setLowStock] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  const [newOrders, setNewOrders] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [todayTotal, setTodayTotal] = useState(0);
  const [weekCount, setWeekCount] = useState(0);
  const [weekTotal, setWeekTotal] = useState(0);
  const [monthCount, setMonthCount] = useState(0);
  const [monthTotal, setMonthTotal] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    setLoading(true);
    const supabase = createClient();

    // ── المخزون المنخفض ──
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id, name, stock")
      .eq("stock", 0);

    if (productsError) console.log(productsError);
    setLowStock(products ?? []);

    // ── الطلبات (لكل الكاردز + آخر 3 طلبات) ──
    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .select("id, order_number, customer_name, total, status, created_at")
      .order("created_at", { ascending: false });

    if (ordersError) {
      console.log(ordersError);
      setLoading(false);
      return;
    }

    setRecentOrders((orders ?? []).slice(0, 3));

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    let pendingCount = 0;
    let tCount = 0, tTotal = 0;
    let wCount = 0, wTotal = 0;
    let mCount = 0, mTotal = 0;

    (orders ?? []).forEach((o: any) => {
      const created = new Date(o.created_at);
      const total = Number(o.total) || 0;

      if (o.status === "قيد الانتظار") pendingCount++;
      if (created >= startOfToday) { tCount++; tTotal += total; }
      if (created >= startOfWeek) { wCount++; wTotal += total; }
      if (created >= startOfMonth) { mCount++; mTotal += total; }
    });

    setNewOrders(pendingCount);
    setTodayCount(tCount);
    setTodayTotal(tTotal);
    setWeekCount(wCount);
    setWeekTotal(wTotal);
    setMonthCount(mCount);
    setMonthTotal(mTotal);

    setLoading(false);
  }

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h1 className="font-['Cinzel',serif] text-2xl font-bold">لوحة التحكم</h1>
        <p className="text-[13px] text-[#8a7e6f]" style={{ marginTop: "4px" }}>
          مرحباً بعودتك إلى لوحة التحكم
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: "28px" }}>
        <StatCard
          label="طلبات جديدة"
          value={loading ? "..." : String(newOrders)}
          badge={`+${todayCount} اليوم`}
          iconBg="bg-[#c9a84c]/15"
          iconColor="text-[#c9a84c]"
          icon={<ShoppingCart size={18} />}
        />
        <StatCard
          label="هذا الشهر"
          value={loading ? "..." : `${monthTotal.toLocaleString()} ج.م`}
          badge={`${monthCount} طلب`}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
          icon={<DollarSign size={18} />}
        />
        <StatCard
          label="هذا الأسبوع"
          value={loading ? "..." : `${weekTotal.toLocaleString()} ج.م`}
          badge={`${weekCount} طلب`}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
          icon={<TrendingUp size={18} />}
        />
        <StatCard
          label="مبيعات اليوم"
          value={loading ? "..." : `${todayTotal.toLocaleString()} ج.م`}
          badge={`${todayCount} طلب`}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          icon={<DollarSign size={18} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <div className="bg-white rounded-xl border border-[#1a1410]/6" style={{ padding: "24px" }}>
          <div className="flex items-center gap-2" style={{ marginBottom: "16px" }}>
            <AlertTriangle size={16} color="#e8503a" />
            <h3 className="font-['Cinzel',serif] text-[13px] tracking-wide">مخزون منخفض</h3>
          </div>
          <div className="flex flex-col gap-2">
            {loading ? (
              <p className="text-[13px] text-[#8a7e6f]">جاري التحميل...</p>
            ) : lowStock.length === 0 ? (
              <p className="text-[13px] text-[#8a7e6f]">لا يوجد منتجات منخفضة المخزون</p>
            ) : (
              lowStock.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between bg-rose-50 rounded-lg"
                  style={{ padding: "10px 16px" }}
                >
                  <span className="text-[13px]">{p.name}</span>
                  <span className="text-[11px] text-rose-600">المخزون: 0</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#1a1410]/6" style={{ padding: "24px" }}>
          <h3 className="font-['Cinzel',serif] text-[13px] tracking-wide" style={{ marginBottom: "16px" }}>
            الطلبات الأخيرة
          </h3>
          <div className="flex flex-col" style={{ marginBottom: "16px" }}>
            {loading ? (
              <p className="text-[13px] text-[#8a7e6f]" style={{ padding: "12px 0" }}>جاري التحميل...</p>
            ) : recentOrders.length === 0 ? (
              <p className="text-[13px] text-[#8a7e6f]" style={{ padding: "12px 0" }}>لا توجد طلبات بعد</p>
            ) : (
              recentOrders.map((o) => (
                <div
                  key={o.id}
                  className="flex items-center justify-between border-b border-[#1a1410]/5 last:border-0"
                  style={{ padding: "8px 0" }}
                >
                  <div>
                    <p className="font-bold text-[13px]">{o.total} ج.م</p>
                    <span
                      className={`inline-block text-[10px] rounded-full ${statusColors[o.status] ?? "bg-[#f1ebdc] text-[#5c5346]"}`}
                      style={{ marginTop: "4px", padding: "2px 8px" }}
                    >
                      {o.status}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-[12px] font-semibold">{o.order_number}</p>
                    <p className="text-[11px] text-[#8a7e6f]">{o.customer_name}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <button
            onClick={onViewOrders}
            className="w-full text-center text-[12.5px] text-[#c9a84c] font-semibold border border-[#c9a84c]/30 rounded-lg hover:bg-[#c9a84c]/5 transition-colors"
            style={{ padding: "8px 0" }}
          >
            عرض جميع الطلبات
          </button>
        </div>
      </div>
    </div>
  );
}