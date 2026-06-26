import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./Types";

export function createClient() {
  return createBrowserClient<Database>(
    "https://kkzxihhvsjrlhpmvhgmj.supabase.co",
    "sb_publishable_H2radb2nxI5KPo_KG_WU9g_gJcO0v1U"
  );
}