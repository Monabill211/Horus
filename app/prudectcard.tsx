"use client";

import { useState } from "react";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  tag?: "جديد" | "خصم" | "محدود";
  sizes: string[];
  href: string;
};

export default function ProductCardAr({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const tagStyles: Record<string, string> = {
    "جديد": "bg-[#0e0b07] text-[#c9a84c]",
    "خصم": "bg-[#c9a84c] text-[#0e0b07]",
    "محدود": "bg-transparent border border-[#c9a84c] text-[#c9a84c]",
  };

  return (
    <div
      dir="rtl"
      className="flex flex-col w-full font-[Cairo,sans-serif] rounded-2xl "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* الصورة */}
      <Link href={product.href} className="relative block overflow-hidden aspect-[3/4] bg-[#ede8df]">

        <img
          src={product.image}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${
            hovered && product.hoverImage ? "opacity-0" : "opacity-100"
          } group-hover:scale-105`}
        />

        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* التاج */}
        {product.tag && (
          <span
            className={`absolute top-3 rounded-[5px] right-3 text-[10px] tracking-wide px-2.5 py-1 z-10 ${tagStyles[product.tag]}`}
          style={{padding:"7px"}}
          >
            {product.tag === "خصم" && discount ? `${discount}%-` : product.tag}
          </span>
        )}

        {/* المفضلة */}
        <button
          onClick={(e) => { e.preventDefault(); setWishlist((v) => !v); }}
          aria-label="إضافة للمفضلة"
          className={`absolute top-3 left-3 z-10 w-9 h-9 flex items-center justify-center backdrop-blur-sm transition-colors ${
            wishlist ? " text-[#c9a84c]" : " text-[#1a1410]  hover:text-[#c9a84c]"
          }`}
        >
          <HeartIcon filled={wishlist} />
        </button>

        {/* إضافة للسلة */}
        <button
          onClick={handleAddToCart}
          style={{padding:"12px"}}
          className={`absolute bottom-0 right-0 left-0 py-3.5 text-[16px] cursor-pointer font-bold text-yellow-400 tracking-wide z-10 transition-all duration-300 ${
            hovered ? "translate-y-0" : "translate-y-full"
          } ${added ? "bg-[#c9a84c] text-[#0e0b07]" : "bg-[#0e0b07] text-[#e8dcc8] hover:bg-[#1a1410]"}`}
        >
          {added ? "تمت الإضافة ✓" : "أضف للسلة"}
        </button>

      </Link>

      {/* المعلومات */}
      <div className="bg-white px-4 py-3.5 flex flex-col gap-2.5" style={{padding:"20px"}}>
        <Link
          href={product.href}
          className="text-[18px] font-black text-center tracking-wide text-[#1a1410] hover:text-[#c9a84c] transition-colors truncate"
        >
          {product.name}
        </Link>

        <div className="flex items-center justify-between gap-2">
          {/* المقاسات */}
          <div className="flex gap-1 flex-wrap">
            {product.sizes.map((s) => (
              <span
                key={s}
                className="text-[10px] text-[#7a6e60] border border-[#d4c9b0] px-1.5 py-0.5"
                style={{padding:"7px"}}
              >
                {s}
              </span>
            ))}
          </div>

          {/* السعر */}
          <div className="flex flex-col items-end gap-0.5">
            {product.originalPrice && (
              <span className="text-[11px] text-[#b0a090] line-through">
                {product.originalPrice.toLocaleString()} ج.م
              </span>
            )}
            <span className="text-[14px] font-bold text-[#1a1410]">
              {product.price.toLocaleString()} ج.م
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}