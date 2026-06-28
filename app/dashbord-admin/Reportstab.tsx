"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Eye, TrendingUp, ShoppingBag, Percent } from "lucide-react";
import { createClient } from "@/app/supabase/Client";
import { StatCard } from "./Shared";

const dayNames = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

export default function ReportsTab() {
  const [visitsData, setVisitsData] = useState<{ day: string; visits: number }[]>([]);
  const [topProducts, setTopProducts] = useState<{ name: string; unitsSold: number; revenue: number }[]>([]);
  const [trafficSources, setTrafficSources] = useState<{ name: string; value: number; color: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    setLoading(true);
    const supabase = createClient();

    // ── 1) أكثر المنتجات مبيعاً - حقيقي من order_items ──
    const { data: items, error: itemsError } = await supabase
      .from("order_items")
      .select("product_name, quantity, unit_price");

    if (itemsError) console.log(itemsError);

    const grouped: Record<string, { unitsSold: number; revenue: number }> = {};
    (items ?? []).forEach((row: any) => {
      if (!grouped[row.product_name]) grouped[row.product_name] = { unitsSold: 0, revenue: 0 };
      grouped[row.product_name].unitsSold += row.quantity;
      grouped[row.product_name].revenue += row.quantity * row.unit_price;
    });

    const topList = Object.entries(grouped)
      .map(([name, stats]) => ({ name, ...stats }))
      .sort((a, b) => b.unitsSold - a.unitsSold)
      .slice(0, 5);

    setTopProducts(topList);

    // ── 2) الزيارات خلال آخر 7 أيام - من page_views ──
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: views, error: viewsError } = await supabase
      .from("page_views")
      .select("created_at, source")
      .gte("created_at", sevenDaysAgo.toISOString());

    if (viewsError) console.log(viewsError);

    const visitsByDay: Record<string, number> = {};
    const sourceCounts: Record<string, number> = {};

    (views ?? []).forEach((row: any) => {
      const d = new Date(row.created_at);
      const dayName = dayNames[d.getDay()];
      visitsByDay[dayName] = (visitsByDay[dayName] ?? 0) + 1;

      const src = row.source ?? "direct";
      sourceCounts[src] = (sourceCounts[src] ?? 0) + 1;
    });

    setVisitsData(dayNames.map((day) => ({ day, visits: visitsByDay[day] ?? 0 })));

    const totalViews = (views ?? []).length || 1;
    const sourceLabels: Record<string, { label: string; color: string }> = {
      social: { label: "سوشيال ميديا", color: "#c9a84c" },
      search: { label: "بحث جوجل", color: "#171310" },
      direct: { label: "زيارة مباشرة", color: "#8a7e6f" },
      referral: { label: "إحالة من موقع آخر", color: "#d4c9b0" },
    };

    setTrafficSources(
      Object.entries(sourceCounts).map(([key, count]) => ({
        name: sourceLabels[key]?.label ?? key,
        value: Math.round((count / totalViews) * 100),
        color: sourceLabels[key]?.color ?? "#999",
      }))
    );

    setLoading(false);
  }

  const totalVisits = visitsData.reduce((sum, d) => sum + d.visits, 0);
  const avgVisits = visitsData.length ? Math.round(totalVisits / visitsData.length) : 0;
  const maxSold = topProducts.length ? Math.max(...topProducts.map((p) => p.unitsSold)) : 1;

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h1 className="font-['Cinzel',serif] text-2xl font-bold">التقارير</h1>
        <p className="text-[13px] text-[#8a7e6f]" style={{ marginTop: "4px" }}>
          نظرة شاملة على أداء المتجر والزيارات
        </p>
      </div>

      {/* بطاقات سريعة */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: "28px" }}>
        <StatCard
          label="زيارات هذا الأسبوع"
          value={loading ? "..." : totalVisits.toLocaleString()}
          badge=""
          iconBg="bg-[#c9a84c]/15"
          iconColor="text-[#c9a84c]"
          icon={<Eye size={18} />}
        />
        <StatCard
          label="متوسط الزيارات اليومي"
          value={loading ? "..." : avgVisits.toLocaleString()}
          badge=""
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          icon={<TrendingUp size={18} />}
        />
        <StatCard
          label="منتجات مباعة"
          value={loading ? "..." : topProducts.reduce((s, p) => s + p.unitsSold, 0).toString()}
          badge=""
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
          icon={<Percent size={18} />}
        />
        <StatCard
          label="إجمالي إيراد المنتجات"
          value={loading ? "..." : `${topProducts.reduce((s, p) => s + p.revenue, 0).toLocaleString()} ج.م`}
          badge=""
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
          icon={<ShoppingBag size={18} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5" style={{ marginBottom: "20px" }}>

        {/* الزيارات خلال الأسبوع */}
        <div className="bg-white rounded-xl border border-[#1a1410]/6" style={{ padding: "24px" }}>
          <h3 className="font-['Cinzel',serif] text-[13px] tracking-wide" style={{ marginBottom: "16px" }}>
            الزيارات خلال آخر 7 أيام
          </h3>
          {totalVisits === 0 && !loading && (
            <p className="text-[12px] text-[#8a7e6f]" style={{ marginBottom: "10px" }}>
              لسه مفيش زيارات مسجّلة — تأكد إنك ضفت PageViewTracker في الـ layout
            </p>
          )}
          <div style={{ width: "100%", height: "240px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitsData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="visitsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c9a84c" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#c9a84c" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#1a1410" strokeOpacity={0.06} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#8a7e6f" }} axisLine={{ stroke: "#1a1410", strokeOpacity: 0.1 }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#8a7e6f" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ fontSize: "12px", border: "1px solid rgba(26,20,16,0.1)", borderRadius: "8px", fontFamily: "Cairo, sans-serif" }}
formatter={(value: any) => [`${value} زيارة`, ""]}                />
                <Area type="monotone" dataKey="visits" stroke="#c9a84c" strokeWidth={2.5} fill="url(#visitsGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* مصادر الزيارات */}
        <div className="bg-white rounded-xl border border-[#1a1410]/6" style={{ padding: "24px" }}>
          <h3 className="font-['Cinzel',serif] text-[13px] tracking-wide" style={{ marginBottom: "18px" }}>
            مصادر الزيارات
          </h3>

          {trafficSources.length === 0 ? (
            <p className="text-[13px] text-[#8a7e6f]">لا توجد بيانات بعد</p>
          ) : (
            <>
              <div className="flex w-full overflow-hidden rounded-full" style={{ height: "10px", marginBottom: "18px" }}>
                {trafficSources.map((s) => (
                  <div key={s.name} style={{ width: `${s.value}%`, background: s.color }} />
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {trafficSources.map((s) => (
                  <div key={s.name} className="flex items-center justify-between text-[13px]">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full" style={{ width: "9px", height: "9px", background: s.color }} />
                      <span className="text-[#1a1410]">{s.name}</span>
                    </div>
                    <span className="text-[#8a7e6f]">{s.value}%</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* أكثر المنتجات مبيعاً */}
      <div className="bg-white rounded-xl border border-[#1a1410]/6" style={{ padding: "24px" }}>
        <h3 className="font-['Cinzel',serif] text-[13px] tracking-wide" style={{ marginBottom: "20px" }}>
          أكثر المنتجات مبيعاً
        </h3>

        {loading ? (
          <p className="text-[13px] text-[#8a7e6f]">جاري التحميل...</p>
        ) : topProducts.length === 0 ? (
          <p className="text-[13px] text-[#8a7e6f]">لا توجد مبيعات مسجّلة بعد</p>
        ) : (
          <div className="flex flex-col gap-4">
            {topProducts.map((p, i) => (
              <div key={p.name}>
                <div className="flex items-center justify-between" style={{ marginBottom: "6px" }}>
                  <div className="flex items-center gap-2.5">
                    <span
                      className="flex items-center justify-center rounded-full bg-[#171310] text-[#c9a84c] font-['Cinzel',serif] text-[11px] font-bold"
                      style={{ width: "22px", height: "22px" }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-[13.5px]">{p.name}</span>
                  </div>
                  <div className="text-left">
                    <span className="text-[13px] font-bold">{p.revenue.toLocaleString()} ج.م</span>
                    <span className="text-[11px] text-[#8a7e6f]" style={{ marginRight: "8px" }}>
                      {p.unitsSold} وحدة
                    </span>
                  </div>
                </div>
                <div className="w-full bg-[#f1ebdc] rounded-full overflow-hidden" style={{ height: "6px" }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(p.unitsSold / maxSold) * 100}%`, background: i === 0 ? "#c9a84c" : "#1a1410" }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}