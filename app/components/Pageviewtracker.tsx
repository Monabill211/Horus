"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/app/supabase/Client";

/**
 * ضيف الكومبوننت ده مرة واحدة بس في app/layout.tsx (جوا body, بعد {children})
 * بيسجّل زيارة في جدول page_views كل ما حد يفتح أي صفحة في الموقع
 */
export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    async function logVisit() {
      const supabase = createClient();

      // مصدر الزيارة - بسيط جداً بناءً على الـ referrer
      let source = "direct";
      const ref = document.referrer;
      if (ref) {
        if (ref.includes("instagram") || ref.includes("facebook") || ref.includes("tiktok") || ref.includes("twitter") || ref.includes("x.com")) {
          source = "social";
        } else if (ref.includes("google") || ref.includes("bing")) {
          source = "search";
        } else {
          source = "referral";
        }
      }

      // معرّف مجهول للزائر يتخزن في المتصفح - عشان لو احتجناه لاحقاً
      let visitorId = localStorage.getItem("horus_visitor_id");
      if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem("horus_visitor_id", visitorId);
      }

      await supabase.from("page_views").insert({
        path: pathname,
        referrer: ref || null,
        source,
        visitor_id: visitorId,
      } as any);
    }

    logVisit();
  }, [pathname]);

  return null; // مفيش أي واجهة، بس بيسجّل في الخلفية
}