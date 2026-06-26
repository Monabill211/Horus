// lib/supabase/categories.ts

import { createClient as createServerClient } from "./Server";
import { createClient as createBrowserClient } from "./Client";
import type { Product, ProductColor } from "./Types";

export async function getCategories() {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data as Category[];
}

export async function createCategory(input: { name: string; nameEn?: string; imageUrl: string }) {
  const supabase = createBrowserClient();
  const { data, error } = await supabase
    .from("categories")
    .insert({ name: input.name, name_en: input.nameEn ?? null, image_url: input.imageUrl })
    .select()
    .single();

  if (error) throw error;
  return data as Category;
}

export async function deleteCategory(id: string) {
  const supabase = createBrowserClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw error;
}