"use client";

import ProductCardAr from "./prudectcard";

const products = [
  {
    id: "1",
    name: "تيشيرت الفرعون أوفرسايز",
    price: 850,
    originalPrice: 1200,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
    tag: "خصم" as const,
    sizes: ["S", "M", "L", "XL"],
    colors: ["أسود", "ذهبي"],
    href: "/products/pharaoh-tee",
  },
  {
    id: "2",
    name: "بنطلون النيل الكارجو",
    price: 1450,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    tag: "جديد" as const,
    sizes: ["S", "M", "L"],
    colors: ["أسود", "ذهبي"],
    href: "/products/nile-cargo",
  },
  {
    id: "3",
    name: "شورت صحراوي كتان",
    price: 650,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&q=80",
    tag: "محدود" as const,
    sizes: ["M", "L", "XL"],
    colors: ["أسود", "ذهبي"],
    href: "/products/desert-shorts",
  },
  {
    id: "4",
    name: "بدلة حورس الكاملة",
    price: 4200,
    originalPrice: 5500,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80",
    tag: "خصم" as const,
    sizes: ["48", "50", "52", "54"],
    colors: ["أسود", "ذهبي"],
    href: "/products/horus-suit",
  },
];

export default function ProductsGridAr() {
  return (
    <section dir="rtl" className="bg-[#f5f0e8] px-6 md:px-10 py-16 font-[Cairo,sans-serif]">
      <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-[#1a1410] mb-9">
        وصل حديثاً
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
        {products.map((p) => (
          <ProductCardAr key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}