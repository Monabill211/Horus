"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCardAr, { type Product } from "../prudectcard";
import Reveal from "@/app/Reveal";
import HeaderAr from "../layout/header";
import FooterAr from "../layout/footer";
import { createClient } from "@/app/supabase/Client";

type ShopProduct = Product & {
  category: string;
  colors: string[];
};

const colorOptions = [
  { name: "أسود", hex: "#1a1410" },
  { name: "أبيض", hex: "#f5f0e8" },
  { name: "ذهبي", hex: "#c9a84c" },
  { name: "بيج", hex: "#cdb38a" },
  { name: "كحلي", hex: "#1c2b4a" },
];

export default function Shop() {
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [categoryNames, setCategoryNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState<string>("الكل");
  const [activeColors, setActiveColors] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const supabase = createClient();

    // الفئات - عشان قايمة الفلتر تبقى ديناميكية
    const { data: cats } = await supabase.from("categories").select("id, name");
    const categoryMap: Record<string, string> = {};
    cats?.forEach((c: any) => (categoryMap[c.id] = c.name));
    setCategoryNames(cats?.map((c: any) => c.name) ?? []);

    // المنتجات + ألوانها
    const { data, error } = await supabase
      .from("products")
      .select("*, product_colors(color_name)")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    const mapped: ShopProduct[] = (data ?? []).map((p: any) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      originalPrice: p.original_price ?? undefined,
      image: p.image_url,
      hoverImage: p.hover_image_url ?? undefined,
      sizes: p.sizes ?? [],
      colors: (p.product_colors ?? []).map((c: any) => c.color_name),
      href: `/productdetel/${p.id}`,
      category: categoryMap[p.category_id] ?? "",
    }));

    setProducts(mapped);
    setLoading(false);
  }

  const categories = useMemo(() => ["الكل", ...categoryNames], [categoryNames]);

  const toggleColor = (name: string) => {
    setActiveColors((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const clearFilters = () => {
    setActiveCategory("الكل");
    setActiveColors([]);
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const categoryMatch = activeCategory === "الكل" || p.category === activeCategory;
      const colorMatch =
        activeColors.length === 0 || activeColors.some((c) => p.colors.includes(c));
      return categoryMatch && colorMatch;
    });
  }, [products, activeCategory, activeColors]);

  const hasActiveFilters = activeCategory !== "الكل" || activeColors.length > 0;

  return (
    <>
    <section dir="rtl" className="bg-[#f5f0e8] font-['Cormorant_Garamond',serif]">
          <div>
            <h2 className="font-['Cinzel',serif] text-3xl font-bold tracking-wide text-[#1a1410]">
             ALL IN STOCK
            </h2>
          </div>
          {/* ══════════ المنتجات ══════════ */}
          <div>
            <p className="text-[13px] italic text-[#8a7e6f]" style={{ marginBottom: "20px" }}>
              {loading ? "جاري التحميل..." : `${filtered.length} منتج`}
            </p>
            {!loading && filtered.length === 0 ? (
              <div className="text-center" style={{ padding: "80px 0" }}>
                <p className="text-[15px] italic text-[#8a7e6f]" style={{ marginBottom: "16px" }}>
                  لا توجد منتجات تطابق الفلاتر المختارة
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2">
                {filtered.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 6) * 60}>
                    <ProductCardAr product={p} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
    </section>
    </>
  );
}


