"use client";

import {
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Wallet,
} from "lucide-react";

const cards = [
  {
    title: "طلبات جديدة",
    value: "1",
    icon: ShoppingCart,
    color: "#F97316",
    bg: "#FFF1E8",
  },
  {
    title: "هذا الشهر",
    value: "0 ج.م",
    icon: Wallet,
    color: "#A855F7",
    bg: "#F3E8FF",
  },
  {
    title: "هذا الأسبوع",
    value: "0 ج.م",
    icon: TrendingUp,
    color: "#22C55E",
    bg: "#DCFCE7",
  },
  {
    title: "مبيعات اليوم",
    value: "0 ج.م",
    icon: DollarSign,
    color: "#2563EB",
    bg: "#DBEAFE",
  },
];

export default function StatsCards() {
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
                +0
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