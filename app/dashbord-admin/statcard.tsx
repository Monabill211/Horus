"use client";

import { useEffect, useState } from "react";
import {
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { createClient } from "@/app/supabase/Client";

export default function StatsCards() {
  const [newOrders, setNewOrders] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [todayTotal, setTodayTotal] = useState(0);
  const [weekCount, setWeekCount] = useState(0);
  const [weekTotal, setWeekTotal] = useState(0);
  const [monthCount, setMonthCount] = useState(0);
  const [monthTotal, setMonthTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    setLoading(true);
    const supabase = createClient();

    const { data, error } = await supabase
      .from("orders")
      .select("total, status, created_at");

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    let pendingCount = 0;
    let tCount = 0, tTotal = 0;
    let wCount = 0, wTotal = 0;
    let mCount = 0, mTotal = 0;

    (data ?? []).forEach((o: any) => {
      const created = new Date(o.created_at);
      const total = Number(o.total) || 0;

      if (o.status === "قيد الانتظار") pendingCount++;

      if (created >= startOfToday) {
        tCount++;
        tTotal += total;
      }
      if (created >= startOfWeek) {
        wCount++;
        wTotal += total;
      }
      if (created >= startOfMonth) {
        mCount++;
        mTotal += total;
      }
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

  const cards = [
    {
      title: "طلبات جديدة",
      value: loading ? "..." : String(newOrders),
      badge: `+${todayCount} اليوم`,
      icon: ShoppingCart,
      color: "#F97316",
      bg: "#FFF1E8",
    },
    {
      title: "هذا الشهر",
      value: loading ? "..." : `${monthTotal.toLocaleString()} ج.م`,
      badge: `${monthCount} طلب`,
      icon: Wallet,
      color: "#A855F7",
      bg: "#F3E8FF",
    },
    {
      title: "هذا الأسبوع",
      value: loading ? "..." : `${weekTotal.toLocaleString()} ج.م`,
      badge: `${weekCount} طلب`,
      icon: TrendingUp,
      color: "#22C55E",
      bg: "#DCFCE7",
    },
    {
      title: "مبيعات اليوم",
      value: loading ? "..." : `${todayTotal.toLocaleString()} ج.م`,
      badge: `${todayCount} طلب`,
      icon: DollarSign,
      color: "#2563EB",
      bg: "#DBEAFE",
    },
  ];

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
      style={{
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-2xl"
            style={{
              padding: "25px",
              minHeight: "170px",
            }}
          >
            <div
              className="flex items-center justify-between"
              style={{ marginBottom: "40px" }}
            >
              <span
                className="font-bold"
                style={{
                  color: "#16A34A",
                  fontSize: "18px",
                }}
              >
                {card.badge}
              </span>

              <div
                className="rounded-xl flex items-center justify-center"
                style={{
                  width: "60px",
                  height: "60px",
                  background: card.bg,
                }}
              >
                <Icon size={30} color={card.color} />
              </div>
            </div>

            <p
              className="text-gray-500"
              style={{
                marginBottom: "10px",
                fontSize: "17px",
              }}
            >
              {card.title}
            </p>

            <h2
              className="font-bold"
              style={{
                fontSize: "38px",
              }}
            >
              {card.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}