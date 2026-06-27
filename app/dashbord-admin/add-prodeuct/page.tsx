"use client";

import { useEffect, useState } from "react";
import { X, Plus, UploadCloud, Check } from "lucide-react";
import { createClient } from "@/app/supabase/Client";

const allSizes = ["S", "M", "L", "XL", "XXL"];

const colorPalette = [
  { name: "أسود", hex: "#1a1410" },
  { name: "أبيض", hex: "#f5f0e8" },
  { name: "ذهبي", hex: "#c9a84c" },
  { name: "بيج", hex: "#cdb38a" },
  { name: "كحلي", hex: "#1c2b4a" },
];

export default function AddProductModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // لازم نفصل الملف الحقيقي (للرفع) عن رابط المعاينة (للعرض بس)
  const [colorFiles, setColorFiles] = useState<Record<string, File>>({});
  const [colorPreviews, setColorPreviews] = useState<Record<string, string>>({});

  const [loading, setLoading] = useState(false);

  // هات قايمة الفئات لحظة ما المودال يفتح
  useEffect(() => {
    if (!open) return;
    const supabase = createClient();
    supabase
      .from("categories")
      .select("id, name")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
          return;
        }
        setCategories(data ?? []);
      });
  }, [open]);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) => {
      if (prev.includes(colorName)) {
        setColorFiles((f) => {
          const next = { ...f };
          delete next[colorName];
          return next;
        });
        setColorPreviews((p) => {
          const next = { ...p };
          delete next[colorName];
          return next;
        });
        return prev.filter((c) => c !== colorName);
      }
      return [...prev, colorName];
    });
  };

  const handleColorImage = (colorName: string, file: File | null) => {
    if (!file) return;
    setColorFiles((prev) => ({ ...prev, [colorName]: file }));
    setColorPreviews((prev) => ({ ...prev, [colorName]: URL.createObjectURL(file) }));
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setOriginalPrice("");
    setStock("");
    setDescription("");
    setCategoryId("");
    setSelectedSizes([]);
    setSelectedColors([]);
    setColorFiles({});
    setColorPreviews({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryId) {
      alert("اختار فئة المنتج");
      return;
    }
    if (selectedColors.length === 0) {
      alert("اختار لون واحد على الأقل وصورته");
      return;
    }
    const missing = selectedColors.find((c) => !colorFiles[c]);
    if (missing) {
      alert(`لازم ترفع صورة للون "${missing}"`);
      return;
    }

    setLoading(true);
    const supabase = createClient();

    try {
      // 1) رفع صورة كل لون على Storage
      const uploadedColors: { name: string; hex: string; url: string }[] = [];

      for (const colorName of selectedColors) {
        const color = colorPalette.find((c) => c.name === colorName)!;
        const file = colorFiles[colorName];
        const fileExt = file.name.split(".").pop() || "jpg";
        const fileName = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName);
        uploadedColors.push({ name: colorName, hex: color.hex, url: urlData.publicUrl });
      }

      // 2) حفظ المنتج - مرتبط بالفئة المختارة
      const { data: product, error: productError } = await supabase
        .from("products")
        .insert({
          name,
          description,
          price: Number(price),
          original_price: originalPrice ? Number(originalPrice) : null,
          stock: Number(stock),
          sizes: selectedSizes,
          category_id: categoryId,
          image_url: uploadedColors[0].url,
          hover_image_url: uploadedColors[1]?.url ?? null,
        })
        .select()
        .single();

      if (productError) throw productError;

      // 3) حفظ صورة كل لون في product_colors
      const colorRows = uploadedColors.map((c) => ({
        product_id: product.id,
        color_name: c.name,
        color_hex: c.hex,
        image_url: c.url,
      }));

      const { error: colorsError } = await supabase.from("product_colors").insert(colorRows);
      if (colorsError) throw colorsError;

      resetForm();
      onClose();
    } catch (err: any) {
      console.log(err);
      alert("حصل خطأ: " + (err?.message ?? "حاول تاني"));
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ padding: "20px" }}>
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => {
          resetForm();
          onClose();
        }}
      />

      <div
        dir="rtl"
        className="relative bg-white rounded-xl w-full max-w-lg overflow-y-auto"
        style={{ maxHeight: "90vh", padding: "28px" }}
      >
        <div className="flex items-center justify-between" style={{ marginBottom: "20px" }}>
          <h2 className="font-['Cinzel',serif] text-lg font-bold">إضافة منتج جديد</h2>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="text-[#8a7e6f] hover:text-[#171310] transition-colors"
            aria-label="إغلاق"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* اسم المنتج */}
          <div>
            <label className="block text-[12px] text-[#5c5346]" style={{ marginBottom: "8px" }}>
              اسم المنتج
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: تيشيرت الفرعون أوفرسايز"
              className="input-field w-full border border-[#1a1410]/12 rounded-lg text-[13px] outline-none"
              style={{ padding: "10px 14px" }}
            />
          </div>

          {/* الفئة - من الفئات الحقيقية اللي ضايفها */}
          <div>
            <label className="block text-[12px] text-[#5c5346]" style={{ marginBottom: "8px" }}>
              الفئة
            </label>
            <select
              required
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="input-field w-full border border-[#1a1410]/12 rounded-lg text-[13px] outline-none bg-white"
              style={{ padding: "10px 14px" }}
            >
              <option value="" disabled>
                {categories.length === 0 ? "لا توجد فئات - ضيف فئة الأول" : "اختار الفئة"}
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* السعر + السعر قبل الخصم */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] text-[#5c5346]" style={{ marginBottom: "8px" }}>
                السعر
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="850"
                className="input-field w-full border border-[#1a1410]/12 rounded-lg text-[13px] outline-none"
                style={{ padding: "10px 14px" }}
              />
            </div>
            <div>
              <label className="block text-[12px] text-[#5c5346]" style={{ marginBottom: "8px" }}>
                السعر قبل الخصم
              </label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="1200"
                className="input-field w-full border border-[#1a1410]/12 rounded-lg text-[13px] outline-none"
                style={{ padding: "10px 14px" }}
              />
            </div>
          </div>

          {/* المخزون */}
          <div>
            <label className="block text-[12px] text-[#5c5346]" style={{ marginBottom: "8px" }}>
              المخزون
            </label>
            <input
              type="number"
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="24"
              className="input-field w-full border border-[#1a1410]/12 rounded-lg text-[13px] outline-none"
              style={{ padding: "10px 14px" }}
            />
          </div>

          {/* الوصف */}
          <div>
            <label className="block text-[12px] text-[#5c5346]" style={{ marginBottom: "8px" }}>
              الوصف
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="وصف مختصر عن المنتج وخامته..."
              className="input-field w-full border border-[#1a1410]/12 rounded-lg text-[13px] outline-none resize-none"
              style={{ padding: "10px 14px" }}
            />
          </div>

          {/* المقاسات - اختيار متعدد */}
          <div>
            <label className="block text-[12px] text-[#5c5346]" style={{ marginBottom: "10px" }}>
              المقاسات
            </label>
            <div className="flex gap-2 flex-wrap">
              {allSizes.map((size) => {
                const active = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`flex items-center justify-center rounded-lg text-[12.5px] border transition-colors ${
                      active
                        ? "bg-[#171310] border-[#171310] text-[#e8dcc8]"
                        : "border-[#1a1410]/15 text-[#171310] hover:border-[#c9a84c]"
                    }`}
                    style={{ width: "44px", height: "44px" }}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* الألوان - اختيار متعدد */}
          <div>
            <label className="block text-[12px] text-[#5c5346]" style={{ marginBottom: "10px" }}>
              الألوان
            </label>
            <div className="flex items-center gap-3 flex-wrap">
              {colorPalette.map((c) => {
                const active = selectedColors.includes(c.name);
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => toggleColor(c.name)}
                    className="relative rounded-full transition-transform"
                    style={{
                      width: "36px",
                      height: "36px",
                      background: c.hex,
                      transform: active ? "scale(1.1)" : "scale(1)",
                      boxShadow: active
                        ? "0 0 0 2px #fff, 0 0 0 4px #c9a84c"
                        : "0 0 0 1px rgba(0,0,0,0.15)",
                    }}
                    aria-label={c.name}
                  >
                    {active && (
                      <span
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ color: c.name === "أبيض" ? "#171310" : "#fff" }}
                      >
                        <Check size={14} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* صور كل لون مختار */}
          {selectedColors.length > 0 && (
            <div>
              <label className="block text-[12px] text-[#5c5346]" style={{ marginBottom: "10px" }}>
                صورة كل لون
              </label>
              <div className="flex flex-col gap-3">
                {selectedColors.map((colorName) => {
                  const color = colorPalette.find((c) => c.name === colorName)!;
                  const preview = colorPreviews[colorName];

                  return (
                    <div
                      key={colorName}
                      className="flex items-center gap-3 border border-[#1a1410]/10 rounded-lg"
                      style={{ padding: "10px" }}
                    >
                      <span
                        className="rounded-full shrink-0"
                        style={{ width: "20px", height: "20px", background: color.hex, boxShadow: "0 0 0 1px rgba(0,0,0,0.15)" }}
                      />
                      <span className="text-[12.5px] flex-1">{colorName}</span>

                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleColorImage(colorName, e.target.files?.[0] ?? null)}
                        />
                        {preview ? (
                          <img
                            src={preview}
                            alt={colorName}
                            className="object-cover rounded-md"
                            style={{ width: "44px", height: "52px" }}
                          />
                        ) : (
                          <span
                            className="flex flex-col items-center justify-center rounded-md border-2 border-dashed border-[#c9a84c]/50 text-[#c9a84c] hover:bg-[#c9a84c]/5 transition-colors"
                            style={{ width: "44px", height: "52px" }}
                          >
                            <UploadCloud size={16} />
                          </span>
                        )}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* حفظ */}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-[#c9a84c] text-[#171310] font-['Cinzel',serif] text-[13px] font-bold tracking-[0.15em] rounded-lg hover:bg-[#dbbf6a] transition-colors disabled:opacity-60"
            style={{ padding: "12px 0", marginTop: "4px" }}
          >
            <Plus size={15} /> {loading ? "جاري الحفظ..." : "حفظ المنتج"}
          </button>
        </form>

        <style>{`.input-field:focus { border-color:#c9a84c; box-shadow: 0 0 0 3px rgba(201,168,76,0.15); }`}</style>
      </div>
    </div>
  );
}