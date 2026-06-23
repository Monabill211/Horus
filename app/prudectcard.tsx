"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  sizes?: string[];
  colors?: string[];
  href: string;
};

const DEFAULT_SIZES = ["S", "M", "L", "XL"];
const DEFAULT_COLORS = ["أسود", "أبيض", "ذهبي"];

export default function ProductCardAr({ product }: { product: Product }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const sizes = product.sizes?.length ? product.sizes : DEFAULT_SIZES;
  const colors = product.colors?.length ? product.colors : DEFAULT_COLORS;
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = () => {
    setAdding(true);
    // هنا تحط منطق إضافة المنتج (المقاس + اللون) للسلة الحقيقية قبل التحويل
    setTimeout(() => {
      router.push("/checkout");
    }, 500);
  };

  return (
    <div
      dir="rtl"
      className="flex flex-col w-full border border-[#1a1410]/15 font-[Cairo,sans-serif]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* الصورة - بتتبدل عند الـ hover */}
      <Link href={product.href} className="relative block overflow-hidden aspect-[3/4] bg-[#ede8df]">
        <img
          src={product.image}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${
            hovered && product.hoverImage ? "opacity-0" : "opacity-100"
          }`}
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
      </Link>

      {/* المعلومات */}
      <div className="flex flex-col" style={{ padding: "16px" }}>

        {/* الاسم */}
        <Link
          href={product.href}
          className="font-['Cinzel',serif] text-[12.5px] font-bold tracking-[0.03em] text-[#1a1410] hover:text-[#c9a84c] transition-colors leading-snug"
          style={{ marginBottom: "8px" }}
        >
          {product.name}
        </Link>

        {/* السعر */}
        <div className="flex items-center gap-2" style={{ marginBottom: "14px" }}>
          {product.originalPrice && (
            <span className="text-[12px] text-[#b0a090] line-through">
              {product.originalPrice.toLocaleString()} ج.م
            </span>
          )}
          <span className="text-[14px] font-bold text-[#1a1410]">
            {product.price.toLocaleString()} ج.م
          </span>
        </div>

        {/* اختيار اللون والمقاس - جنب بعض على كل الشاشات بما فيها الموبايل */}
        <div className="grid grid-cols-2 gap-2" style={{ marginBottom: "10px" }}>
          <SelectField value={selectedColor} onChange={setSelectedColor} options={colors} />
          <SelectField value={selectedSize} onChange={setSelectedSize} options={sizes} />
        </div>

        {/* أضف للسلة */}
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className={`w-full font-['Cinzel',serif] text-[11.5px] font-bold tracking-[0.15em] transition-colors ${
            adding ? "bg-[#c9a84c] text-[#0e0b07]" : "bg-[#0e0b07] text-white hover:bg-[#1a1410]"
          }`}
          style={{ padding: "12px 0", borderTop: "2px solid #c9a84c" }}
        >
          {adding ? "جاري التحويل للسلة..." : "أضف للسلة"}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   حقل اختيار (مقاس / لون) - نفس الستايل
───────────────────────────────────────── */
function SelectField({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[#1a1410]/25 text-[12.5px] text-[#1a1410] bg-white outline-none appearance-none focus:border-[#c9a84c]"
        style={{ padding: "10px 32px 10px 12px" }}
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1a1410"
        strokeWidth="2"
        className="absolute pointer-events-none"
        style={{ left: "12px", top: "50%", transform: "translateY(-50%)" }}
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}