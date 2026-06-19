"use client";

import ProductCardAr from "./prudectcard";
import Reveal from "./Reveal";

const products = [
  {
    id: "1",
    name: "تيشيرت الفرعون أوفرسايز",
    price: 850,
    originalPrice: 1200,
    hoverImage: "/imgs/WhatsApp Image 2026-05-10 at 9.25.19 PM.jpeg",
    image: "/imgs/WhatsApp Image 2026-05-10 at 9.25.20 PM (1).jpeg",
    tag: "خصم" as const,
    sizes: ["S", "M", "L", "XL"],
    href: "/products/pharaoh-tee",
  },
  {
    id: "2",
    name: "بنطلون النيل الكارجو",
    price: 1450,
        originalPrice: 1500,

    hoverImage: "/imgs/WhatsApp Image 2026-05-10 at 9.25.20 PM (2).jpeg",
    image: "/imgs/WhatsApp Image 2026-05-10 at 9.25.20 PM (3).jpeg",
    tag: "جديد" as const,
    sizes: ["S", "M", "L"],
    href: "/products/nile-cargo",
  },
  {
    id: "3",
    name: "شورت صحراوي كتان",
    price: 650,
    originalPrice: 1200,
    image: "/imgs/WhatsApp Image 2026-05-10 at 9.25.20 PM (1).jpeg",
    hoverImage: "/imgs/WhatsApp Image 2026-05-10 at 9.25.20 PM (2).jpeg",
    tag: "محدود" as const,
    sizes: ["M", "L", "XL"],
    href: "/products/desert-shorts",
  },
  {
    id: "4",
    name: "بدلة حورس الكاملة",
    price: 4200,
    originalPrice: 5500,
    hoverImage: "/imgs/WhatsApp Image 2026-05-11 at 10.31.33 PM (1).jpeg",
    image: "/imgs/WhatsApp Image 2026-05-11 at 10.31.33 PM.jpeg",
    tag: "خصم" as const,
    sizes: ["48", "50", "52", "54"],
    href: "/products/horus-suit",
  },
];

export default function RoundemProducts() {
  return (
    <Reveal>
    <section dir="rtl" className="px-6 md:px-10 py-16 font-[Cairo,sans-serif]" style={{padding:"64px"}}>
      <h2 className="text-2xl text-center  md:text-3xl font-bold tracking-wide text-black mb-9" style={{marginBottom:"36px"}}>
      منتاجات  حورس
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 bg-white">
        {products.map((p) => (
          <ProductCardAr key={p.id} product={p} />
        ))}
      </div>
    </section></Reveal>
  );
}