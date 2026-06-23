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
const [showOptions, setShowOptions] = useState(false);
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
      className="flex flex-col w-full  font-[Cairo,sans-serif] border border-black"
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
          className="font-bold text-[15px] tracking-[0.01em] text-[#1a1410] hover:text-[#c9a84c] transition-colors"
          style={{ marginBottom: "8px", lineHeight: "1.35" }}
        >
          {product.name}
        </Link>

        {/* السعر */}
        <div className="flex items-center gap-2" style={{ marginBottom: "28px" }}>
          {product.originalPrice && (
            <span className="text-[13px] text-[#8a8a8a] line-through">
              {product.originalPrice.toLocaleString()} ج.م
            </span>
          )}
          <span className="text-[15px] text-[#1a1410]">
            {product.price.toLocaleString()} ج.م
          </span>
        </div>

        {/* اختيار اللون والمقاس - جنب بعض، ملاصقين للزرار تحت */}
<div style={{ marginBottom: "0" }}>
  {!showOptions ? (
    <button
      onClick={() => setShowOptions(true)}
      className="w-full flex items-center font-bold justify-between border border-black bg-white hover:bg-gray-50 transition"
      style={{
        padding: "5px 15px",
        fontSize: "14px",
        cursor: "pointer",
      }}
    >
      <span>SELECT OPTION</span>

      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  ) : (
    <div className="flex flex-col gap-0 font-bold">

      <SelectField
        value={selectedSize}
        onChange={setSelectedSize}
        options={sizes}
        position="right"
      />

      <SelectField
        value={selectedColor}
        onChange={setSelectedColor}
        options={colors}
        position="left"
      />

    </div>
  )}
</div>

        {/* أضف للسلة - ملاصق للسيلكت من غير فراغ */}
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className={`w-full text-[13px] font-bold tracking-[0.08em] border border-t-0 transition-colors ${
            adding
              ? "bg-[#c9a84c] text-[#0e0b07] border-[#c9a84c]"
              : "bg-[#0e0b07] text-white border-[#0e0b07] hover:bg-[#1a1410]"
          }`}
          style={{ padding: "7px 0" }}
        >
          {adding ? "جاري التحويل للسلة..." : "أضف للسلة"}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   حقل اختيار (مقاس / لون) - نفس الستايل، بحدود ملاصقة لبعض
───────────────────────────────────────── */
function SelectField({
  value,
  onChange,
  options,
  position,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  position: "right" | "left";
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full border border-[#1a1410]/25 text-[12.5px] text-[#1a1410] bg-white outline-none appearance-none focus:border-[#c9a84c] ${
          position === "right" ? "border-l-0" : ""
        }`}
        style={{ padding: "11px 32px 11px 12px" }}
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