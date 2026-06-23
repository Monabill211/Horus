"use client";

import ProductCardAr from "./prudectcard";

const products = [
  {
    id: "1",
    name: "تيشيرت الفرعون أوفرسايز",
    price: 850,
    originalPrice: 1200,
    image:
     "/imgs/5OIm2oqzrgJYiDe994-Sss7CVvfriQl_zgnFdXcgAYeHw03gwLV-DTZCnheJKtHfemSxdeMUVgd6jk9zMxwyc-d2HHARGv6-V4fLcQD_CM19dL5k4uLkHEuwNnWaHeDG7IHOubrnzoyDxbMz0L1lzTUR9hv-6UvUmR5wF0H1NNc.jpg",
    hoverImage: "/imgs/WhatsApp Image 2026-05-10 at 9.25.20 PM (1).jpeg",
    tag: "خصم" as const,
    sizes: ["S", "M", "L", "XL"],
    colors: ["أسود", "ذهبي"],
    href: "/products/pharaoh-tee",
  },
  {
    id: "2",
    name: "تيشيرت الفرعون أوفرسايز",
    price: 850,
    originalPrice: 1200,
    image:
     "/imgs/5OIm2oqzrgJYiDe994-Sss7CVvfriQl_zgnFdXcgAYeHw03gwLV-DTZCnheJKtHfemSxdeMUVgd6jk9zMxwyc-d2HHARGv6-V4fLcQD_CM19dL5k4uLkHEuwNnWaHeDG7IHOubrnzoyDxbMz0L1lzTUR9hv-6UvUmR5wF0H1NNc.jpg",
    hoverImage: "/imgs/WhatsApp Image 2026-05-10 at 9.25.20 PM (1).jpeg",
    tag: "خصم" as const,
    sizes: ["S", "M", "L", "XL"],
    colors: ["أسود", "ذهبي"],
    href: "/products/pharaoh-tee",
  },
  {
    id: "3",
    name: "تيشيرت الفرعون أوفرسايز",
    price: 850,
    originalPrice: 1200,
    image:
     "/imgs/5OIm2oqzrgJYiDe994-Sss7CVvfriQl_zgnFdXcgAYeHw03gwLV-DTZCnheJKtHfemSxdeMUVgd6jk9zMxwyc-d2HHARGv6-V4fLcQD_CM19dL5k4uLkHEuwNnWaHeDG7IHOubrnzoyDxbMz0L1lzTUR9hv-6UvUmR5wF0H1NNc.jpg",
    hoverImage: "/imgs/WhatsApp Image 2026-05-10 at 9.25.20 PM (1).jpeg",
    tag: "خصم" as const,
    sizes: ["S", "M", "L", "XL"],
    colors: ["أسود", "ذهبي"],
    href: "/products/pharaoh-tee",
  },
  {
    id: "4",
    name: "بنطلون النيل الكارجو",
    price: 1450,
    image: 
     "/imgs/5OIm2oqzrgJYiDe994-Sss7CVvfriQl_zgnFdXcgAYeHw03gwLV-DTZCnheJKtHfemSxdeMUVgd6jk9zMxwyc-d2HHARGv6-V4fLcQD_CM19dL5k4uLkHEuwNnWaHeDG7IHOubrnzoyDxbMz0L1lzTUR9hv-6UvUmR5wF0H1NNc.jpg",
    hoverImage: "/imgs/WhatsApp Image 2026-05-10 at 9.25.19 PM.jpeg",
    tag: "جديد" as const,
    sizes: ["S", "M", "L"],
    colors: ["أسود", "ذهبي"],
    href: "/products/nile-cargo",
  },
  {
    id: "5",
    name: "شورت صحراوي كتان",
    price: 650,
    image: 
     "/imgs/5OIm2oqzrgJYiDe994-Sss7CVvfriQl_zgnFdXcgAYeHw03gwLV-DTZCnheJKtHfemSxdeMUVgd6jk9zMxwyc-d2HHARGv6-V4fLcQD_CM19dL5k4uLkHEuwNnWaHeDG7IHOubrnzoyDxbMz0L1lzTUR9hv-6UvUmR5wF0H1NNc.jpg",
    hoverImage: "/imgs/WhatsApp Image 2026-05-10 at 9.25.19 PM.jpeg",

    tag: "محدود" as const,
    sizes: ["M", "L", "XL"],
    colors: ["أسود", "ذهبي"],
    href: "/products/desert-shorts",
  },
  {
    id: "6",
    name: "بدلة حورس الكاملة",
    price: 4200,
    originalPrice: 5500,
    image: "/imgs/WhatsApp Image 2026-05-10 at 9.25.19 PM.jpeg",

    hoverImage: "/imgs/WhatsApp Image 2026-05-11 at 10.31.33 PM.jpeg",
    tag: "خصم" as const,
    sizes: ["48", "50", "52", "54"],
    colors: ["أسود", "ذهبي"],
    href: "/products/horus-suit",
  },
    {
    id: "7",
    name: "شورت صحراوي كتان",
    price: 650,
    image: "/imgs/WhatsApp Image 2026-05-10 at 9.25.20 PM.jpeg",
    hoverImage: "/imgs/WhatsApp Image 2026-05-10 at 9.25.19 PM.jpeg",

    tag: "محدود" as const,
    sizes: ["M", "L", "XL"],
    colors: ["أسود", "ذهبي"],
    href: "/products/desert-shorts",
  },  {
    id: "",
    name: "شورت صحراوي كتان",
    price: 650,
    image: "/imgs/WhatsApp Image 2026-05-10 at 9.25.20 PM.jpeg",
    hoverImage: "/imgs/WhatsApp Image 2026-05-10 at 9.25.19 PM.jpeg",

    tag: "محدود" as const,
    sizes: ["M", "L", "XL"],
    colors: ["أسود", "ذهبي"],
    href: "/products/desert-shorts",
  },
];

export default function ProductsGridAr() {
  return (
  <section
    dir="rtl"
    className="bg-[#f5f0e8] font-[Cairo,sans-serif]"
  >
    <h2
      className="text-2xl md:text-3xl font-bold tracking-wide text-[#1a1410]"
      style={{ padding: "20px" }}
    >
      وصل حديثاً
    </h2>

    <div className="grid grid-cols-2">
      {products.map((p) => (
        <ProductCardAr key={p.id} product={p} />
      ))}
    </div>
  </section>
);
}