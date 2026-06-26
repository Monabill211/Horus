"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/supabase/Client";

export default function AddCategoryPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
      alert("حصل خطأ في حفظ الفئة");
      return;
    }

    router.push("/dashbord-admin");
  };

  return (
    <div dir="rtl" style={{ padding: "40px", maxWidth: "420px" }}>
      <h1 className="font-['Cinzel',serif] text-2xl font-bold" style={{ marginBottom: "24px" }}>
        إضافة فئة
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

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
            required
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
    </div>
  );
}