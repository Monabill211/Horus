// lib/supabase/server.ts
// يستخدم في Server Components (صفحات بدون "use client") و Route Handlers

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./Types";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // ممكن تحصل في Server Components اللي مش بتسمح بتعديل الكوكيز مباشرة
            // مش مشكلة لو عندك middleware بيعمل refresh للسيشن
          }
        },
      },
    }
  );
}