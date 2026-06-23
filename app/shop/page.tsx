"use client";

import { useMemo, useState } from "react";
import ProductCardAr, { type Product } from "../prudectcard";
import Reveal from "../Reveal";
import HeaderAr from "../header";
import FooterAr from "../footer";

type ShopProduct = Product & {
  category: "تيشيرت" | "بنطلون" | "شورت" | "ترنج";
  color: string;
};

const categories: Array<ShopProduct["category"] | "الكل"> = [
  "الكل",
  "تيشيرت",
  "بنطلون",
  "شورت",
  "ترنج",
];

const colorOptions = [
  { name: "أسود", hex: "#1a1410" },
  { name: "أبيض", hex: "#f5f0e8" },
  { name: "ذهبي", hex: "#c9a84c" },
  { name: "بيج", hex: "#cdb38a" },
  { name: "كحلي", hex: "#1c2b4a" },
];

const products: ShopProduct[] = [
  {
    id: "1",
    name: "تيشيرت الفرعون أوفرسايز",
    price: 850,
    originalPrice: 1200,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
    sizes: ["S", "M", "L", "XL"],
    href: "/products/pharaoh-tee",
    category: "تيشيرت",
    color: "أسود",
  },
  {
    id: "2",
    name: "تيشيرت أبيض كلاسيك",
    price: 650,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    sizes: ["S", "M", "L", "XL"],
    href: "/products/classic-white-tee",
    category: "تيشيرت",
    color: "أبيض",
  },
  {
    id: "3",
    name: "بنطلون النيل الكارجو",
    price: 1450,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    sizes: ["S", "M", "L"],
    href: "/products/nile-cargo",
    category: "بنطلون",
    color: "بيج",
  },
  {
    id: "4",
    name: "بنطلون كحلي ستريت",
    price: 1300,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    sizes: ["M", "L", "XL"],
    href: "/products/navy-street-pants",
    category: "بنطلون",
    color: "كحلي",
  },
  {
    id: "5",
    name: "شورت صحراوي كتان",
    price: 650,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&q=80",
    sizes: ["M", "L", "XL"],
    href: "/products/desert-shorts",
    category: "شورت",
    color: "بيج",
  },
  {
    id: "6",
    name: "شورت أسود رياضي",
    price: 580,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&q=80",
    sizes: ["S", "M", "L"],
    href: "/products/black-sport-shorts",
    category: "شورت",
    color: "أسود",
  },
  {
    id: "7",
    name: "ترنج حورس الرياضي",
    price: 2100,
    originalPrice: 2600,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80",
    sizes: ["M", "L", "XL"],
    href: "/products/horus-tracksuit",
    category: "ترنج",
    color: "ذهبي",
  },
  {
    id: "8",
    name: "ترنج أسود كلاسيك",
    price: 1950,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80",
    sizes: ["S", "M", "L", "XL"],
    href: "/products/classic-black-tracksuit",
    category: "ترنج",
    color: "أسود",
  },
  {
    id: "9",
    name: "تيشيرت ذهبي مطرز",
    price: 920,
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80",
    sizes: ["M", "L", "XL"],
    href: "/products/gold-embroidered-tee",
    category: "تيشيرت",
    color: "ذهبي",
  },
  {
    id: "10",
    name: "بنطلون أسود ضيق",
    price: 1250,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
    sizes: ["S", "M", "L"],
    href: "/products/black-slim-pants",
    category: "بنطلون",
    color: "أسود",
  },
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState<ShopProduct["category"] | "الكل">("الكل");
  const [activeColors, setActiveColors] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
      const colorMatch = activeColors.length === 0 || activeColors.includes(p.color);
      return categoryMatch && colorMatch;
    });
  }, [activeCategory, activeColors]);

  const hasActiveFilters = activeCategory !== "الكل" || activeColors.length > 0;

  return (
    <>
    <HeaderAr />
  
    <section dir="rtl" className="bg-[#f5f0e8] font-['Cormorant_Garamond',serif]">
      <div className="max-w-7xl mx-auto" style={{ padding: "40px clamp(20px, 4vw, 40px) 80px" }}>

        {/* عنوان الصفحة */}
        <div className="flex items-end justify-between" style={{ marginBottom: "32px" }}>
          <div>
            <span className="block text-[12px] tracking-[0.2em] text-[#c9a84c] italic" style={{ marginBottom: "6px" }}>
              كل القطع
            </span>
            <h1 className="font-['Cinzel',serif] text-3xl font-bold tracking-wide text-[#1a1410]">
              المتجر
            </h1>
          </div>

          {/* زرار الفلتر - موبايل */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden flex items-center gap-2 border border-[#1a1410] font-['Cinzel',serif] text-[12px] tracking-wide text-[#1a1410]"
            style={{ padding: "10px 18px" }}
          >
            <FilterIcon />
            فلترة
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr]" style={{ gap: "40px" }}>

          {/* ══════════ الفلاتر - ديسكتوب ══════════ */}
          <aside className="hidden lg:block">
            <FiltersPanel
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              activeColors={activeColors}
              toggleColor={toggleColor}
              hasActiveFilters={hasActiveFilters}
              clearFilters={clearFilters}
            />
          </aside>

          {/* ══════════ المنتجات ══════════ */}
          <div>
            <p className="text-[13px] italic text-[#8a7e6f]" style={{ marginBottom: "20px" }}>
              {filtered.length} منتج
            </p>

            {filtered.length === 0 ? (
              <div className="text-center" style={{ padding: "80px 0" }}>
                <p className="text-[15px] italic text-[#8a7e6f]" style={{ marginBottom: "16px" }}>
                  لا توجد منتجات تطابق الفلاتر المختارة
                </p>
                <button
                  onClick={clearFilters}
                  className="font-['Cinzel',serif] text-[12px] tracking-wide text-[#c9a84c] underline"
                >
                  مسح الفلاتر
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                {filtered.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 6) * 60}>
                    <ProductCardAr product={p} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══════════ درج الفلاتر - موبايل ══════════ */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/60" onClick={() => setDrawerOpen(false)} />
        <div
          dir="rtl"
          className={`absolute top-0 right-0 h-full w-[82%] max-w-xs bg-[#f5f0e8] overflow-y-auto transition-transform duration-300 ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ padding: "24px" }}
        >
          <div className="flex items-center justify-between" style={{ marginBottom: "24px" }}>
            <h3 className="font-['Cinzel',serif] text-base tracking-wide text-[#1a1410]">
              فلترة المنتجات
            </h3>
            <button onClick={() => setDrawerOpen(false)} aria-label="إغلاق" className="text-[#1a1410]">
              <XIcon />
            </button>
          </div>

          <FiltersPanel
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeColors={activeColors}
            toggleColor={toggleColor}
            hasActiveFilters={hasActiveFilters}
            clearFilters={clearFilters}
          />

          <button
            onClick={() => setDrawerOpen(false)}
            className="w-full bg-[#1a1410] text-[#e8dcc8] font-['Cinzel',serif] text-[12px] tracking-wide"
            style={{ padding: "14px 0", marginTop: "28px" }}
          >
            عرض {filtered.length} منتج
          </button>
        </div>
      </div>
    </section>
      <FooterAr />
    </>
  );
}

/* ─────────────────────────────────────────
   لوحة الفلاتر (مشتركة بين الديسكتوب والدرج)
───────────────────────────────────────── */
function FiltersPanel({
  activeCategory,
  setActiveCategory,
  activeColors,
  toggleColor,
  hasActiveFilters,
  clearFilters,
}: {
  activeCategory: ShopProduct["category"] | "الكل";
  setActiveCategory: (c: ShopProduct["category"] | "الكل") => void;
  activeColors: string[];
  toggleColor: (name: string) => void;
  hasActiveFilters: boolean;
  clearFilters: () => void;
}) {
  return (
    <div>
      {/* الفئة */}
      <div style={{ marginBottom: "32px" }}>
        <p className="font-['Cinzel',serif] text-[11px] tracking-[0.2em] text-[#c9a84c]" style={{ marginBottom: "14px" }}>
          الفئة
        </p>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-right text-[14px] transition-colors ${
                activeCategory === cat
                  ? "text-[#1a1410] font-bold"
                  : "text-[#6e6358] hover:text-[#c9a84c]"
              }`}
              style={{ padding: "7px 0" }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* اللون */}
      <div style={{ marginBottom: "24px" }}>
        <p className="font-['Cinzel',serif] text-[11px] tracking-[0.2em] text-[#c9a84c]" style={{ marginBottom: "14px" }}>
          اللون
        </p>
        <div className="flex flex-col gap-3">
          {colorOptions.map((c) => {
            const active = activeColors.includes(c.name);
            return (
              <button
                key={c.name}
                onClick={() => toggleColor(c.name)}
                className="flex items-center gap-3"
              >
                <span
                  className="rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    width: "22px",
                    height: "22px",
                    background: c.hex,
                    boxShadow: active
                      ? "0 0 0 2px #f5f0e8, 0 0 0 4px #c9a84c"
                      : "0 0 0 1px rgba(0,0,0,0.15)",
                  }}
                />
                <span
                  className={`text-[13px] transition-colors ${
                    active ? "text-[#1a1410] font-bold" : "text-[#6e6358]"
                  }`}
                >
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* مسح الفلاتر */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="text-[12px] text-[#c9a84c] underline"
        >
          مسح كل الفلاتر
        </button>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   أيقونات
───────────────────────────────────────── */
function FilterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="11" y1="18" x2="13" y2="18" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
