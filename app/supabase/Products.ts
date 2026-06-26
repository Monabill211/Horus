// lib/supabase/products.ts

import { createClient as createServerClient } from "./Server";
import { createClient as createBrowserClient } from "./Client";
import type { Product, ProductColor } from "./Types";

/* ───── قراءة (Server Components) ───── */

export async function getProducts() {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*), product_colors(*)")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Product[];
}

export async function getProductsByCategory(categoryId: string) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, product_colors(*)")
    .eq("category_id", categoryId)
    .eq("is_active", true);

  if (error) throw error;
  return data as Product[];
}

export async function getProductById(id: string) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*), product_colors(*)")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Product;
}

/* ───── كتابة (Client Components - الداش بورد) ───── */

type NewProductInput = {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  sizes: string[];
  categoryId: string;
  imageUrl: string;
  hoverImageUrl?: string;
  colors: { name: string; hex?: string; imageUrl: string }[];
};

export async function createProduct(input: NewProductInput) {
  const supabase = createBrowserClient();

  // 1) إضافة المنتج نفسه
  const { data: product, error: productError } = await supabase
    .from("products")
    .insert({
      name: input.name,
      description: input.description,
      price: input.price,
      original_price: input.originalPrice ?? null,
      stock: input.stock,
      sizes: input.sizes,
      category_id: input.categoryId,
      image_url: input.imageUrl,
      hover_image_url: input.hoverImageUrl ?? null,
    })
    .select()
    .single();

  if (productError) throw productError;

  // 2) إضافة صورة كل لون مرتبطة بالمنتج
  if (input.colors.length > 0) {
    const colorRows = input.colors.map((c) => ({
      product_id: product.id,
      color_name: c.name,
      color_hex: c.hex ?? null,
      image_url: c.imageUrl,
    }));

    const { error: colorsError } = await supabase.from("product_colors").insert(colorRows);
    if (colorsError) throw colorsError;
  }

  return product as Product;
}

export async function updateProduct(id: string, updates: Partial<NewProductInput>) {
  const supabase = createBrowserClient();
  const { error } = await supabase
    .from("products")
    .update({
      name: updates.name,
      description: updates.description,
      price: updates.price,
      original_price: updates.originalPrice,
      stock: updates.stock,
      sizes: updates.sizes,
    })
    .eq("id", id);

  if (error) throw error;
}

export async function deleteProduct(id: string) {
  const supabase = createBrowserClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

/* ───── رفع صورة لـ Supabase Storage ───── */

export async function uploadProductImage(file: File, folder = "products") {
  const supabase = createBrowserClient();
  const fileName = `${folder}/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage.from("product-images").upload(fileName, file);
  if (error) throw error;

  const { data } = supabase.storage.from("product-images").getPublicUrl(fileName);
  return data.publicUrl;
}