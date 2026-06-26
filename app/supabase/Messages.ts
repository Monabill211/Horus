// lib/supabase/messages.ts

import { createClient as createServerClient } from "./Server";
import { createClient as createBrowserClient } from "./Client";
import type { Message } from "./Types";

/* ───── من صفحة "تواصل معنا" ───── */

export async function sendMessage(input: { name: string; email: string; subject: string; message: string }) {
  const supabase = createBrowserClient();
  const { error } = await supabase.from("messages").insert(input);
  if (error) throw error;
}

/* ───── الداش بورد ───── */

export async function getMessages() {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Message[];
}

export async function markMessageAsRead(id: string) {
  const supabase = createBrowserClient();
  const { error } = await supabase.from("messages").update({ is_read: true }).eq("id", id);
  if (error) throw error;
}