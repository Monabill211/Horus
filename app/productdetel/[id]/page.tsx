"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Reveal from "../../Reveal";
import HeaderAr from "../../components/layout/header";
import FooterAr from "../../components/layout/footer";
import Socialfab from "../../components/layout/Socialfab";
import { createClient } from "@/app/supabase/Client";
import { useCart } from "@/app/cart/Cartcontext";
import type { Product, ProductColor } from "@/app/supabase/Types";

const DEFAULT_COLOR_HEX: Record<string, string> = {
  أسود: "#1a1410",
  أبيض: "#f5f0e8",
  ذهبي: "#c9a84c",
  بيج: "#cdb38a",
  كحلي: "#1c2b4a",
};

const DEFAULT_SIZES = ["S", "M", "L", "XL", "XXL"];

const sizeChart = [
  { size: "S", chest: "96", length: "68", shoulder: "44" },
  { size: "M", chest: "102", length: "70", shoulder: "46" },
  { size: "L", chest: "108", length: "72", shoulder: "48" },
  { size: "XL", chest: "114", length: "74", shoulder: "50" },
  { size: "XXL", chest: "120", length: "76", shoulder: "52" },
];

type ColorOption = {
  name: string;
  hex: string;
  image: string;
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [colorIdx, setColorIdx] = useState(0);
  const [activeImage, setActiveImage] = useState("");
  const [fade, setFade] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      setLoading(true);
      setNotFound(false);

      const supabase = createClient();
      const { data, error } = await supabase
        .from("products")
        .select("*, product_colors(*)")
        .eq("id", id)
        .eq("is_active", true)
        .single();

      if (error || !data) {
        setNotFound(true);
        setProduct(null);
        setLoading(false);
        return;
      }

      const p = data as Product;
      setProduct(p);
      setActiveImage(p.image_url);
      setSelectedSize(p.sizes?.[0] ?? DEFAULT_SIZES[0]);
      setColorIdx(0);
      setQty(1);
      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  const colors: ColorOption[] = useMemo(() => {
    if (!product?.product_colors?.length) return [];

    return product.product_colors
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((c: ProductColor) => ({
        name: c.color_name,
        hex: c.color_hex ?? DEFAULT_COLOR_HEX[c.color_name] ?? "#1a1410",
        image: c.image_url,
      }));
  }, [product]);

  const galleryImages = useMemo(() => {
    if (!product) return [];

    const imgs = [product.image_url];
    if (product.hover_image_url) imgs.push(product.hover_image_url);
    colors.forEach((c) => imgs.push(c.image));
    return [...new Set(imgs)];
  }, [product, colors]);

  const sizes = product?.sizes?.length ? product.sizes : DEFAULT_SIZES;
  const activeColor = colors[colorIdx];

  useEffect(() => {
    setFade(false);
    const t = setTimeout(() => setFade(true), 40);
    return () => clearTimeout(t);
  }, [activeImage]);

  const discount =
    product?.original_price && product.original_price > product.price
      ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
      : 0;

  const handleColorChange = (i: number) => {
    setColorIdx(i);
    setActiveImage(colors[i].image);
  };

  const handleThumbnailClick = (img: string) => {
    setActiveImage(img);
  };

  const handleAddToCart = () => {
    if (!product) return;

    addItem(
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: activeImage || product.image_url,
        size: selectedSize,
        color: activeColor?.name,
        href: `/productdetel/${product.id}`,
      },
      qty
    );

    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = () => {
    if (!product) return;

    setBuying(true);
    addItem(
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: activeImage || product.image_url,
        size: selectedSize,
        color: activeColor?.name,
        href: `/productdetel/${product.id}`,
      },
      qty
    );
    router.push("/checkout");
  };

  if (loading) {
    return (
      <>
        <HeaderAr />
        <section dir="rtl" className="bg-[#f5f0e8] min-h-[60vh] flex items-center justify-center">
          <p className="text-[15px] italic text-[#8a7e6f]">جاري تحميل المنتج...</p>
        </section>
        <FooterAr />
      </>
    );
  }

  if (notFound || !product) {
    return (
      <>
        <HeaderAr />
        <section dir="rtl" className="bg-[#f5f0e8] min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <p className="text-[15px] italic text-[#8a7e6f]">المنتج غير موجود</p>
          <button
            onClick={() => router.push("/shop")}
            className="font-['Cinzel',serif] text-[12px] tracking-wide text-[#c9a84c] underline"
          >
            العودة للمتجر
          </button>
        </section>
        <FooterAr />
      </>
    );
  }

  return (
    <>
      <HeaderAr />

      <section dir="rtl" className="bg-[#f5f0e8] font-['Cormorant_Garamond',serif]">
        <div
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12"
          style={{ padding: "48px clamp(20px, 4vw, 40px)" }}
        >
          {/* ══════════ المعرض ══════════ */}
          <div className="flex flex-col-reverse lg:flex-row gap-4">
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
              {galleryImages.map((img) => (
                <button
                  key={img}
                  onClick={() => handleThumbnailClick(img)}
                  className={`relative shrink-0 overflow-hidden border-2 transition-all duration-300 ${
                    activeImage === img
                      ? "border-[#c9a84c] scale-100"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                  style={{ width: "72px", height: "92px" }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="relative flex-1 aspect-[3/4] bg-[#ede8df] overflow-hidden">
              {discount > 0 && (
                <span
                  className="absolute z-10 bg-[#c9a84c] text-[#0e0b07] text-[11px] font-bold tracking-wide font-['Cinzel',serif]"
                  style={{ top: "16px", right: "16px", padding: "6px 12px" }}
                >
                  خصم {discount}%
                </span>
              )}
              <img
                src={activeImage}
                alt={product.name}
                className={`w-full h-full object-cover transition-all duration-500 ease-out ${
                  fade ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"
                }`}
              />
            </div>
          </div>

          {/* ══════════ التفاصيل ══════════ */}
          <div className="flex flex-col">
            <Reveal>
              <span className="text-[12px] tracking-[0.2em] text-[#c9a84c] italic">
                HRS-{product.id.slice(0, 8).toUpperCase()}
              </span>
              <h1
                className="font-['Cinzel',serif] text-2xl md:text-[32px] font-bold tracking-wide text-[#1a1410]"
                style={{ marginTop: "8px", marginBottom: "16px" }}
              >
                {product.name}
              </h1>

              <div className="flex items-center gap-3" style={{ marginBottom: "24px" }}>
                <span className="font-['Cinzel',serif] text-2xl font-bold text-[#1a1410]">
                  {product.price.toLocaleString()} ج.م
                </span>
                {product.original_price && product.original_price > product.price && (
                  <span className="text-base text-[#b0a090] line-through">
                    {product.original_price.toLocaleString()} ج.م
                  </span>
                )}
              </div>

              {product.description && (
                <p
                  className="text-[15px] leading-7 italic text-[#6e6358] max-w-md"
                  style={{ marginBottom: "32px" }}
                >
                  {product.description}
                </p>
              )}
            </Reveal>

            {colors.length > 0 && (
              <Reveal delay={80}>
                <div style={{ marginBottom: "28px" }}>
                  <p
                    className="font-['Cinzel',serif] text-[12px] tracking-[0.15em] text-[#1a1410]"
                    style={{ marginBottom: "12px" }}
                  >
                    اللون: <span className="text-[#c9a84c]">{activeColor?.name}</span>
                  </p>
                  <div className="flex gap-3">
                    {colors.map((c, i) => (
                      <button
                        key={c.name}
                        onClick={() => handleColorChange(i)}
                        aria-label={c.name}
                        className={`relative rounded-full transition-transform duration-300 ${
                          colorIdx === i ? "scale-110" : "hover:scale-105"
                        }`}
                        style={{
                          width: "40px",
                          height: "40px",
                          background: c.hex,
                          boxShadow:
                            colorIdx === i
                              ? `0 0 0 2px #f5f0e8, 0 0 0 4px #c9a84c`
                              : `0 0 0 1px rgba(0,0,0,0.1)`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            <Reveal delay={140}>
              <div style={{ marginBottom: "28px" }}>
                <div
                  className="flex items-center justify-between"
                  style={{ marginBottom: "12px" }}
                >
                  <p className="font-['Cinzel',serif] text-[12px] tracking-[0.15em] text-[#1a1410]">
                    المقاس: <span className="text-[#c9a84c]">{selectedSize}</span>
                  </p>
                  <button
                    onClick={() => setSizeChartOpen(true)}
                    className="text-[12px] text-[#6e6358] underline hover:text-[#c9a84c] transition-colors"
                  >
                    جدول المقاسات
                  </button>
                </div>

                <div className="flex gap-2.5 flex-wrap">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`flex items-center justify-center font-['Cinzel',serif] text-[13px] border transition-all duration-200 ${
                        selectedSize === s
                          ? "border-[#1a1410] bg-[#1a1410] text-[#e8dcc8] scale-105"
                          : "border-[#1a1410]/20 text-[#1a1410] hover:border-[#c9a84c]"
                      }`}
                      style={{ width: "48px", height: "48px" }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div style={{ marginBottom: "32px" }}>
                <p
                  className="font-['Cinzel',serif] text-[12px] tracking-[0.15em] text-[#1a1410]"
                  style={{ marginBottom: "12px" }}
                >
                  الكمية
                </p>
                <div className="inline-flex items-center border border-[#1a1410]/20">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex items-center justify-center text-lg text-[#1a1410] hover:bg-[#1a1410]/5 transition-colors"
                    style={{ width: "44px", height: "44px" }}
                  >
                    −
                  </button>
                  <span
                    className="text-center font-['Cinzel',serif] text-[14px] text-[#1a1410]"
                    style={{ width: "48px" }}
                  >
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="flex items-center justify-center text-lg text-[#1a1410] hover:bg-[#1a1410]/5 transition-colors"
                    style={{ width: "44px", height: "44px" }}
                  >
                    +
                  </button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div className="flex flex-col gap-3" style={{ marginBottom: "32px" }}>
                <button
                  onClick={handleBuyNow}
                  className={`relative overflow-hidden font-['Cinzel',serif] text-[13px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                    buying
                      ? "bg-[#1a1410] text-[#c9a84c] scale-[0.98]"
                      : "bg-[#c9a84c] text-[#0e0b07] hover:bg-[#dbbf6a] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(201,168,76,0.4)]"
                  }`}
                  style={{ padding: "16px 0" }}
                >
                  <span className="absolute inset-0 bg-[#c9a84c]/40 blur-md animate-pulse -z-10" />
                  {buying ? "جاري التحويل للدفع..." : "اشتري الآن"}
                </button>

                <button
                  onClick={handleAddToCart}
                  className={`font-['Cinzel',serif] text-[13px] tracking-[0.2em] uppercase border transition-all duration-300 ${
                    added
                      ? "bg-[#1a1410] border-[#1a1410] text-[#c9a84c]"
                      : "bg-transparent border-[#1a1410] text-[#1a1410] hover:bg-[#1a1410] hover:text-[#e8dcc8]"
                  }`}
                  style={{ padding: "16px 0" }}
                >
                  {added ? "تمت الإضافة للسلة ✓" : "أضف للسلة"}
                </button>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div
                className="flex flex-wrap gap-5 border-t border-[#1a1410]/10"
                style={{ paddingTop: "24px" }}
              >
                <MiniTrust icon={<ReturnIcon />} label="استرجاع خلال 14 يوم" />
                <MiniTrust icon={<EyeIcon />} label="معاينة قبل الدفع" />
                <MiniTrust icon={<TruckIcon />} label="شحن لكل المحافظات" />
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <DetailsAccordion description={product.description} />
        </Reveal>

        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
            sizeChartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSizeChartOpen(false)}
          />
          <div
            dir="rtl"
            className={`relative bg-[#f5f0e8] w-[92%] max-w-md transition-all duration-300 ${
              sizeChartOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
            }`}
            style={{ padding: "28px" }}
          >
            <button
              onClick={() => setSizeChartOpen(false)}
              className="absolute text-[#1a1410] hover:text-[#c9a84c] transition-colors"
              style={{ top: "16px", left: "16px" }}
              aria-label="إغلاق"
            >
              <XIcon />
            </button>

            <h3
              className="font-['Cinzel',serif] text-lg tracking-wide text-[#1a1410]"
              style={{ marginBottom: "4px" }}
            >
              جدول المقاسات
            </h3>
            <p
              className="text-[12px] italic text-[#8a7e6f]"
              style={{ marginBottom: "20px" }}
            >
              القياسات بالسنتيمتر
            </p>

            <table className="w-full text-center text-[13px]">
              <thead>
                <tr className="border-b border-[#1a1410]/15 font-['Cinzel',serif] text-[11px] tracking-wide text-[#c9a84c]">
                  <th style={{ padding: "8px 0" }}>المقاس</th>
                  <th style={{ padding: "8px 0" }}>الصدر</th>
                  <th style={{ padding: "8px 0" }}>الطول</th>
                  <th style={{ padding: "8px 0" }}>الكتف</th>
                </tr>
              </thead>
              <tbody>
                {sizeChart.map((row) => (
                  <tr
                    key={row.size}
                    className={`border-b border-[#1a1410]/8 ${
                      row.size === selectedSize ? "bg-[#c9a84c]/15" : ""
                    }`}
                  >
                    <td className="font-bold text-[#1a1410]" style={{ padding: "10px 0" }}>
                      {row.size}
                    </td>
                    <td className="text-[#6e6358]" style={{ padding: "10px 0" }}>
                      {row.chest}
                    </td>
                    <td className="text-[#6e6358]" style={{ padding: "10px 0" }}>
                      {row.length}
                    </td>
                    <td className="text-[#6e6358]" style={{ padding: "10px 0" }}>
                      {row.shoulder}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Socialfab />
      </section>
      <FooterAr />
    </>
  );
}

function DetailsAccordion({ description }: { description: string | null }) {
  const [open, setOpen] = useState<number | null>(0);

  const items = [
    {
      title: "تفاصيل المنتج",
      content:
        description ||
        "قطن مصري 100% بكثافة 240 جرام، طباعة ديجيتال عالية الجودة لا تتأثر بالغسيل. القصة أوفرسايز مريحة تناسب الاستخدام اليومي.",
    },
    {
      title: "العناية بالمنتج",
      content: "يُغسل في مياه بارودة، يُجفف في الظل، يُكوى على درجة حرارة منخفضة من الخلف.",
    },
    {
      title: "الشحن والتوصيل",
      content:
        "التوصيل داخل القاهرة والجيزة من 2-3 أيام عمل، وباقي المحافظات من 3-5 أيام عمل. الدفع عند الاستلام مع إمكانية المعاينة.",
    },
  ];

  return (
    <div
      className="max-w-6xl mx-auto"
      style={{ padding: "0 clamp(20px, 4vw, 40px) 64px" }}
    >
      <div className="border-t border-[#1a1410]/10">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="border-b border-[#1a1410]/10">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between text-right"
                style={{ padding: "20px 0" }}
              >
                <span
                  className={`font-['Cinzel',serif] text-[13px] tracking-wide transition-colors ${
                    isOpen ? "text-[#c9a84c]" : "text-[#1a1410]"
                  }`}
                >
                  {item.title}
                </span>
                <span
                  className={`flex items-center justify-center border transition-all duration-300 ${
                    isOpen ? "rotate-45 border-[#c9a84c] text-[#c9a84c]" : "border-[#1a1410]/20 text-[#1a1410]"
                  }`}
                  style={{ width: "28px", height: "28px" }}
                >
                  <PlusIcon />
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-32" : "max-h-0"
                }`}
                style={isOpen ? { paddingBottom: "20px" } : undefined}
              >
                <p className="text-[14px] leading-7 italic text-[#6e6358] max-w-xl">
                  {item.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MiniTrust({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[#6e6358]">
      <span className="text-[#c9a84c]">{icon}</span>
      <span className="text-[12px]">{label}</span>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
      <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
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

function ReturnIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7v6h6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 13a9 9 0 1015-6.7L21 9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 3h13v13H1z" strokeLinejoin="round" />
      <path d="M14 8h4l3 3v5h-7V8z" strokeLinejoin="round" />
      <circle cx="6" cy="18.5" r="1.8" />
      <circle cx="17" cy="18.5" r="1.8" />
    </svg>
  );
}
