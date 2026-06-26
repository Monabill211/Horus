"use client";

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
import { visitsData, topSellingProducts, trafficSources } from "./data";
import { StatCard } from "./Shared";

export default function ReportsTab() {
  const totalVisits = visitsData.reduce((sum, d) => sum + d.visits, 0);
  const avgVisits = Math.round(totalVisits / visitsData.length);
  const maxSold = Math.max(...topSellingProducts.map((p) => p.unitsSold));

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
          value={totalVisits.toLocaleString()}
          badge="+18%"
          iconBg="bg-[#c9a84c]/15"
          iconColor="text-[#c9a84c]"
          icon={<Eye size={18} />}
        />
        <StatCard
          label="متوسط الزيارات اليومي"
          value={avgVisits.toLocaleString()}
          badge="+6%"
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          icon={<TrendingUp size={18} />}
        />
        <StatCard
          label="معدل التحويل"
          value="3.4%"
          badge="+0.5%"
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
          icon={<Percent size={18} />}
        />
        <StatCard
          label="متوسط قيمة الطلب"
          value="980 ج.م"
          badge="+4%"
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
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "#8a7e6f" }}
                  axisLine={{ stroke: "#1a1410", strokeOpacity: 0.1 }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#8a7e6f" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: "12px",
                    border: "1px solid rgba(26,20,16,0.1)",
                    borderRadius: "8px",
                    fontFamily: "Cairo, sans-serif",
                  }}
                  labelStyle={{ fontWeight: 600 }}
                  formatter={(value: number) => [`${value} زيارة`, ""]}
                />
                <Area
                  type="monotone"
                  dataKey="visits"
                  stroke="#c9a84c"
                  strokeWidth={2.5}
                  fill="url(#visitsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* مصادر الزيارات */}
        <div className="bg-white rounded-xl border border-[#1a1410]/6" style={{ padding: "24px" }}>
          <h3 className="font-['Cinzel',serif] text-[13px] tracking-wide" style={{ marginBottom: "18px" }}>
            مصادر الزيارات
          </h3>

          {/* بار مقسّم */}
          <div className="flex w-full overflow-hidden rounded-full" style={{ height: "10px", marginBottom: "18px" }}>
            {trafficSources.map((s) => (
              <div key={s.name} style={{ width: `${s.value}%`, background: s.color }} />
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {trafficSources.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-[13px]">
                <div className="flex items-center gap-2">
                  <span
                    className="rounded-full"
                    style={{ width: "9px", height: "9px", background: s.color }}
                  />
                  <span className="text-[#1a1410]">{s.name}</span>
                </div>
                <span className="text-[#8a7e6f]">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* أكثر المنتجات مبيعاً */}
      <div className="bg-white rounded-xl border border-[#1a1410]/6" style={{ padding: "24px" }}>
        <h3 className="font-['Cinzel',serif] text-[13px] tracking-wide" style={{ marginBottom: "20px" }}>
          أكثر المنتجات مبيعاً
        </h3>

        <div className="flex flex-col gap-4">
          {topSellingProducts.map((p, i) => (
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
                  style={{
                    width: `${(p.unitsSold / maxSold) * 100}%`,
                    background: i === 0 ? "#c9a84c" : "#1a1410",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}