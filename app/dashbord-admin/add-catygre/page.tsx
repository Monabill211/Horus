"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/app/supabase/Client";

export default function AddCategoryPage() {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoadingList(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      setLoadingList(false);
      return;
    }

    setCategories(data ?? []);
    setLoadingList(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return alert("ارفع صورة للفئة");

    setLoading(true);
    const supabase = createClient();

    // رفع الصورة
    const fileExt = imageFile.name.split(".").pop() || "jpg";
    const fileName = `categories/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(fileName, imageFile);

    if (uploadError) {
      console.log(uploadError);
      alert("حصل خطأ في رفع الصورة: " + uploadError.message);
      setLoading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName);

    // حفظ الفئة
    const { error } = await supabase.from("categories").insert({
      name,
      image_url: urlData.publicUrl,
    });

    setLoading(false);

    if (error) {
      console.log(error);
      alert("حصل خطأ في حفظ الفئة: " + error.message);
      return;
    }

    // تصفير الفورم وتحديث القايمة بدون مغادرة الصفحة
    setName("");
    setImageFile(null);
    setImagePreview(null);
    fetchCategories();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("متأكد عايز تمسح الفئة دي؟")) return;
    const supabase = createClient();
    const { error } = await supabase.from("categories").delete().eq("id", id);

    if (error) {
      console.log(error);
      alert("حصل خطأ في الحذف: " + error.message);
      return;
    }

    fetchCategories();
  };

  return (
    <div dir="rtl" style={{ padding: "40px", maxWidth: "480px" }}>
      <h1 className="font-['Cinzel',serif] text-2xl font-bold" style={{ marginBottom: "24px" }}>
        إضافة فئة
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5" style={{ marginBottom: "40px" }}>

        <div>
          <label className="block text-[13px]" style={{ marginBottom: "8px" }}>اسم الفئة</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="مثال: هودي"
            className="w-full border border-[#1a1410]/20 rounded-lg text-[14px] outline-none"
            style={{ padding: "12px 14px" }}
          />
        </div>

        <div>
          <label className="block text-[13px]" style={{ marginBottom: "8px" }}>صورة الفئة</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              setImageFile(file);
              setImagePreview(file ? URL.createObjectURL(file) : null);
            }}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="معاينة"
              style={{ width: "160px", marginTop: "12px", borderRadius: "8px" }}
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#171310] text-white rounded-lg font-bold"
          style={{ padding: "12px 0" }}
        >
          {loading ? "جاري الحفظ..." : "حفظ الفئة"}
        </button>
      </form>

      {/* ══════════ قايمة الفئات ══════════ */}
      <h2 className="font-['Cinzel',serif] text-lg font-bold" style={{ marginBottom: "16px" }}>
        الفئات الحالية
      </h2>

      {loadingList ? (
        <p style={{ color: "#8a7e6f" }}>جاري التحميل...</p>
      ) : categories.length === 0 ? (
        <p style={{ color: "#8a7e6f" }}>لا توجد فئات بعد</p>
      ) : (
        <div className="flex flex-col" style={{ gap: "10px" }}>
          {categories.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between rounded-lg border border-[#1a1410]/12"
              style={{ padding: "10px" }}
            >
              <div className="flex items-center" style={{ gap: "12px" }}>
                <img
                  src={c.image_url}
                  alt={c.name}
                  style={{ width: "44px", height: "44px", borderRadius: "8px", objectFit: "cover" }}
                />
                <span className="text-[14px]">{c.name}</span>
              </div>
              <button
                onClick={() => handleDelete(c.id)}
                className="text-red-600 text-[13px] font-bold"
                style={{ padding: "6px 12px" }}
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}