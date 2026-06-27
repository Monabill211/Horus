"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/app/supabase/Client";

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("horus_admin_unlocked");
    if (saved === "true") setUnlocked(true);
    setChecking(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const supabase = createClient();
    const { data, error: rpcError } = await supabase.rpc("check_admin_password", {
      input_password: password,
    });

    setSubmitting(false);

    if (rpcError) {
      console.log(rpcError);
      setError("حصل خطأ، حاول تاني");
      return;
    }

    if (data === true) {
      sessionStorage.setItem("horus_admin_unlocked", "true");
      setUnlocked(true);
    } else {
      setError("كلمة السر غلط");
    }
  };

  if (checking) return null;

  if (!unlocked) {
    return (
      <div
        dir="rtl"
        className="flex items-center justify-center"
        style={{ minHeight: "100vh", background: "#f7f4ee", padding: "20px" }}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl"
          style={{ padding: "36px", width: "100%", maxWidth: "360px" }}
        >
          <div className="flex items-center gap-2.5" style={{ marginBottom: "24px" }}>
            <div
              className="rounded-lg bg-[#171310] flex items-center justify-center text-[#c9a84c] font-['Cinzel',serif] text-sm"
              style={{ width: "36px", height: "36px" }}
            >
              ح
            </div>
            <span className="font-['Cinzel',serif] text-[17px] tracking-[0.08em]">لوحة تحكم حورس</span>
          </div>

          <label className="block text-[12px] text-[#5c5346]" style={{ marginBottom: "8px" }}>
            كلمة السر
          </label>
          <input
            type="password"
            required
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border border-[#1a1410]/15 rounded-lg text-[14px] outline-none"
            style={{ padding: "12px 14px", marginBottom: "16px" }}
          />

          {error && (
            <p className="text-[12.5px] text-rose-600" style={{ marginBottom: "16px" }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#c9a84c] text-[#171310] font-['Cinzel',serif] text-[13px] font-bold tracking-[0.15em] rounded-lg hover:bg-[#dbbf6a] transition-colors disabled:opacity-60"
            style={{ padding: "12px 0" }}
          >
            {submitting ? "جاري التحقق..." : "دخول"}
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}