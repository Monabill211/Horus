"use client";

import { useState } from "react";
import { X, Plus, UploadCloud, Check } from "lucide-react";

const allSizes = ["S", "M", "L", "XL", "XXL"];

const colorPalette = [
  { name: "أسود", hex: "#1a1410" },
  { name: "أبيض", hex: "#f5f0e8" },
  { name: "ذهبي", hex: "#c9a84c" },
  { name: "بيج", hex: "#cdb38a" },
  { name: "كحلي", hex: "#1c2b4a" },
];

type ColorImages = Record<string, string | null>; // اسم اللون -> رابط preview للصورة

export default function AddProductModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [colorImages, setColorImages] = useState<ColorImages>({});

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) => {
      if (prev.includes(colorName)) {
        // إلغاء اختيار اللون - شيل صورته كمان
        setColorImages((imgs) => {
          const next = { ...imgs };
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
    const url = URL.createObjectURL(file);
    setColorImages((prev) => ({ ...prev, [colorName]: url }));
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setOriginalPrice("");
    setStock("");
    setDescription("");
    setSelectedSizes([]);
    setSelectedColors([]);
    setColorImages({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا تحط استدعاء Supabase الحقيقي لحفظ المنتج + رفع الصور لكل لون
    console.log({ name, price, originalPrice, stock, description, selectedSizes, selectedColors, colorImages });
    resetForm();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ padding: "20px" }}>
      {/* الخلفية */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => {
          resetForm();
          onClose();
        }}
      />

      {/* البانل */}
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
                  const preview = colorImages[colorName];

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
            className="flex items-center justify-center gap-2 bg-[#c9a84c] text-[#171310] font-['Cinzel',serif] text-[13px] font-bold tracking-[0.15em] rounded-lg hover:bg-[#dbbf6a] transition-colors"
            style={{ padding: "12px 0", marginTop: "4px" }}
          >
            <Plus size={15} /> حفظ المنتج
          </button>
        </form>

        <style>{`.input-field:focus { border-color:#c9a84c; box-shadow: 0 0 0 3px rgba(201,168,76,0.15); }`}</style>
      </div>
    </div>
  );
}