// lib/supabase/reports.ts

import { createClient as createServerClient } from "./Server";
import { createClient as createBrowserClient } from "./Client";

/* ───── تسجيل زيارة صفحة (من أي مكان في الموقع) ───── */

export async function logPageView(path: string, source?: string) {
  const supabase = createBrowserClient();

  // معرف مجهول للزائر يتخزن في المتصفح
  let visitorId = localStorage.getItem("horus_visitor_id");
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem("horus_visitor_id", visitorId);
  }

  await supabase.from("page_views").insert({
    path,
    source: source ?? document.referrer ? "referral" : "direct",
    referrer: document.referrer || null,
    visitor_id: visitorId,
  });
}

/* ───── الزيارات خلال آخر 7 أيام (لتاب التقارير) ───── */

export async function getVisitsLast7Days() {
  const supabase = await createServerClient();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data, error } = await supabase
    .from("page_views")
    .select("created_at")
    .gte("created_at", sevenDaysAgo.toISOString());

  if (error) throw error;

  // تجميع الزيارات حسب اليوم
  const grouped: Record<string, number> = {};
  data.forEach((row) => {
    const day = new Date(row.created_at).toLocaleDateString("ar-EG", { weekday: "long" });
    grouped[day] = (grouped[day] ?? 0) + 1;
  });

  return Object.entries(grouped).map(([day, visits]) => ({ day, visits }));
}

/* ───── مصادر الزيارات (نسبة كل مصدر) ───── */

export async function getTrafficSources() {
  const supabase = await createServerClient();
  const { data, error } = await supabase.from("page_views").select("source");
  if (error) throw error;

  const total = data.length || 1;
  const counts: Record<string, number> = {};
  data.forEach((row) => {
    const src = row.source ?? "direct";
    counts[src] = (counts[src] ?? 0) + 1;
  });

  return Object.entries(counts).map(([source, count]) => ({
    name: source,
    value: Math.round((count / total) * 100),
  }));
}

/* ───── أكثر المنتجات مبيعاً (من order_items) ───── */

export async function getTopSellingProducts(limit = 5) {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("order_items")
    .select("product_name, quantity, unit_price");

  if (error) throw error;

  const grouped: Record<string, { unitsSold: number; revenue: number }> = {};
  data.forEach((row) => {
    if (!grouped[row.product_name]) {
      grouped[row.product_name] = { unitsSold: 0, revenue: 0 };
    }
    grouped[row.product_name].unitsSold += row.quantity;
    grouped[row.product_name].revenue += row.quantity * row.unit_price;
  });

  return Object.entries(grouped)
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.unitsSold - a.unitsSold)
    .slice(0, limit);
}