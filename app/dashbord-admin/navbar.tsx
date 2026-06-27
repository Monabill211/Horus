"use client";

import { Moon, Globe } from "lucide-react";

export default function Topbar({ title }: { title: string }) {
  return (
    <header
      className="bg-white border-b border-[#1a1410]/8 flex items-center justify-between"
      style={{ padding: "14px 24px" }}
    >
      <div>
        <h2 className="font-['Cinzel',serif] text-[16px] tracking-wide">{title}</h2>
       
      </div>

      <div className="flex items-center gap-4">
        <button className="text-[#5c5346] hover:text-[#c9a84c]">
          <Moon size={17} />
        </button>

        <div className="flex items-center gap-1.5 text-[12px] text-[#5c5346]">
          <Globe size={14} /> EN
        </div>

        <div className="flex items-center gap-2.5">
          <div
            className="rounded-full bg-[#c9a84c]/20 flex items-center justify-center text-[#171310] font-bold text-[12px]"
            style={{ width: "32px", height: "32px" }}
          >
            أ
          </div>
          <div className="hidden sm:block">
            <p className="text-[12.5px] font-semibold leading-none">حورس</p>
            <p className="text-[10px] text-[#8a7e6f]">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}