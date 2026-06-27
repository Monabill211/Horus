"use client";

import { LogOut } from "lucide-react";
import { navItems, type Tab } from "./data";
import Link from "next/link";

export default function Sidebar({
  activeTab,
  onTabChange,
}: {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}) {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-l border-[#1a1410]/8 shrink-0">

      {/* لوجو */}
      <div
        className="flex items-center gap-2.5"
        style={{ padding: "20px 24px", borderBottom: "1px solid rgba(26,20,16,0.08)" }}
      >
        <div
          className="rounded-lg bg-[#171310] flex items-center justify-center text-[#c9a84c] font-['Cinzel',serif] text-sm"
          style={{ width: "36px", height: "36px" }}
        >
          ح
        </div>
        <span className="font-['Cinzel',serif] text-[17px] tracking-[0.08em]">حورس</span>
      </div>

      {/* نافيجيشن */}
      <nav className="flex-1 flex flex-col gap-1" style={{ padding: "20px 12px" }}>
        {navItems.map((item) => (
          <button
            key={item.tab}
            onClick={() => onTabChange(item.tab)}
            className={`flex items-center gap-3 rounded-lg text-[13.5px] transition-colors ${
              activeTab === item.tab
                ? "bg-[#c9a84c] text-[#171310] font-semibold"
                : "text-[#5c5346] hover:bg-[#f1ebdc]"
            }`}
            style={{ padding: "10px 14px" }}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* معلومات المستخدم + خروج */}
      <div style={{ padding: "16px", borderTop: "1px solid rgba(26,20,16,0.08)" }}>
        <div style={{ padding: "0 8px", marginBottom: "12px" }}>
          <p className="text-[11px] text-[#8a7e6f]">مسجل دخول كـ</p>
          <p className="text-[12.5px] font-semibold">حورس</p>
          <span className="inline-block text-[10px] text-[#c9a84c] font-bold" style={{ marginTop: "4px" }}>
            Admin
          </span>
        </div>
        <Link href="/" >
        <button
          className="w-full flex items-center justify-center gap-2 bg-[#e8503a] text-white text-[13px] font-semibold rounded-lg hover:bg-[#d4432e] transition-colors"
          style={{ padding: "10px 0" }}
        >
          <LogOut size={15} />
          تسجيل خروج
        </button></Link>
      </div>
    </aside>
  );
}