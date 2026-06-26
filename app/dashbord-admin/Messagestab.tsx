"use client";

import { useState } from "react";
import { messagesData } from "./data";

export default function MessagesTab() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h1 className="font-['Cinzel',serif] text-2xl font-bold">رسائل العملاء</h1>
        <p className="text-[13px] text-[#8a7e6f]" style={{ marginTop: "4px" }}>
          الرسائل الواردة من صفحة "تواصل معنا"
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {messagesData.map((m, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={m.email + i} className="bg-white rounded-xl border border-[#1a1410]/6 overflow-hidden">
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full flex items-center justify-between text-right"
                style={{ padding: "16px 20px" }}
              >
                <div className="flex items-center gap-3">
                  {!m.read && <span className="rounded-full bg-[#c9a84c]" style={{ width: "8px", height: "8px" }} />}
                  <div>
                    <p className={`text-[13.5px] ${!m.read ? "font-bold" : ""}`}>{m.name}</p>
                    <p className="text-[11px] text-[#8a7e6f]">{m.subject}</p>
                  </div>
                </div>
                <span className="text-[11px] text-[#8a7e6f]">{m.date}</span>
              </button>
              {isOpen && (
                <div style={{ padding: "0 20px 18px" }}>
                  <p className="text-[13px] text-[#5c5346]" style={{ marginBottom: "8px" }}>{m.message}</p>
                  <p className="text-[11px] text-[#8a7e6f]" dir="ltr">{m.email}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}