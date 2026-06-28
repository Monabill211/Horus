"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/app/supabase/Client";

export default function MessagesTab() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    setLoading(true);
    const supabase = createClient();

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setMessages(data ?? []);
    setLoading(false);
  }

  const handleOpen = async (i: number, msg: any) => {
    setOpenIdx(openIdx === i ? null : i);

    if (!msg.is_read) {
      const supabase = createClient();
      await (supabase.from("messages") as any).update({ is_read: true }).eq("id", msg.id);
      setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, is_read: true } : m)));
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h1 className="font-['Cinzel',serif] text-2xl font-bold">رسائل العملاء</h1>
        <p className="text-[13px] text-[#8a7e6f]" style={{ marginTop: "4px" }}>
          الرسائل الواردة من صفحة "تواصل معنا"
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {loading ? (
          <p className="text-center text-[#8a7e6f]" style={{ padding: "24px" }}>جاري التحميل...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-[#8a7e6f]" style={{ padding: "24px" }}>لا توجد رسائل بعد</p>
        ) : (
          messages.map((m, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={m.id} className="bg-white rounded-xl border border-[#1a1410]/6 overflow-hidden">
                <button
                  onClick={() => handleOpen(i, m)}
                  className="w-full flex items-center justify-between text-right"
                  style={{ padding: "16px 20px" }}
                >
                  <div className="flex items-center gap-3">
                    {!m.is_read && <span className="rounded-full bg-[#c9a84c]" style={{ width: "8px", height: "8px" }} />}
                    <div>
                      <p className={`text-[13.5px] ${!m.is_read ? "font-bold" : ""}`}>{m.name}</p>
                      <p className="text-[11px] text-[#8a7e6f]">{m.subject}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#8a7e6f]">
                    {new Date(m.created_at).toLocaleDateString("ar-EG")}
                  </span>
                </button>
                {isOpen && (
                  <div style={{ padding: "0 20px 18px" }}>
                    <p className="text-[13px] text-[#5c5346]" style={{ marginBottom: "8px" }}>{m.message}</p>
                    {m.phone && (
                      <p className="text-[11px] text-[#8a7e6f]" dir="ltr" style={{ marginBottom: "2px" }}>{m.phone}</p>
                    )}
                    {m.email && <p className="text-[11px] text-[#8a7e6f]" dir="ltr">{m.email}</p>}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}