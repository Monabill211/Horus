"use client";

import { useState } from "react";
import { X, Plus, UploadCloud } from "lucide-react";
import { createClient } from "@/app/supabase/Client";

export default function AddCategoryModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
}) {
  const [name, setName] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleImage = (file: File | null) => {
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const resetForm = () => {
    setName("");
    setNameEn("");
    setImageFile(null);
    setImagePreview(null);
    setErrorMsg("");
  };

  const close = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      setErrorMsg("لازم ترفع صورة للفئة");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const supabase = createClient();

      // 1) رفع صورة الفئة على Supabase Storage
      const fileName = `categories/${Date.now()}-${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

      // 2) حفظ الفئة في قاعدة البيانات
      const { error: insertError } = await supabase.from("categories").insert({
        name,
        name_en: nameEn || null,
        image_url: publicUrlData.publicUrl,
      });

      if (insertError) throw insertError;

      onCreated?.();
      close();
    } catch (err) {
      console.error(err);
      setErrorMsg("حصل خطأ أثناء حفظ الفئة، حاول تاني");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ padding: "20px" }}>
      <div className="absolute inset-0 bg-black/50" onClick={close} />

      <div dir="rtl" className="relative bg-white rounded-xl w-full max-w-sm" style={{ padding: "28px" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: "20px" }}>
          <h2 className="font-['Cinzel',serif] text-lg font-bold">إضافة فئة جديدة</h2>
          <button onClick={close} className="text-[#8a7e6f] hover:text-[#171310] transition-colors" aria-label="إغلاق">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div>
            <label className="block text-[12px] text-[#5c5346]" style={{ marginBottom: "8px" }}>
              اسم الفئة (عربي)
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: هودي"
              className="input-field w-full border border-[#1a1410]/12 rounded-lg text-[13px] outline-none"
              style={{ padding: "10px 14px" }}
            />
          </div>

          <div>
            <label className="block text-[12px] text-[#5c5346]" style={{ marginBottom: "8px" }}>
              الاسم بالإنجليزي (اختياري)
            </label>
            <input
              type="text"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              placeholder="Hoodies"
              dir="ltr"
              className="input-field w-full border border-[#1a1410]/12 rounded-lg text-[13px] outline-none"
              style={{ padding: "10px 14px" }}
            />
          </div>

          <div>
            <label className="block text-[12px] text-[#5c5346]" style={{ marginBottom: "8px" }}>
              صورة الفئة
            </label>
            <label className="cursor-pointer block">
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImage(e.target.files?.[0] ?? null)} />
              {imagePreview ? (
                <img src={imagePreview} alt="معاينة الفئة" className="w-full object-cover rounded-lg" style={{ aspectRatio: "4/3" }} />
              ) : (
                <div
                  className="w-full flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#c9a84c]/50 text-[#c9a84c] hover:bg-[#c9a84c]/5 transition-colors"
                  style={{ aspectRatio: "4/3" }}
                >
                  <UploadCloud size={22} />
                  <span className="text-[11px]">اضغط لرفع صورة</span>
                </div>
              )}
            </label>
          </div>

          {errorMsg && <p className="text-[12px] text-rose-600">{errorMsg}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 bg-[#171310] text-[#e8dcc8] font-['Cinzel',serif] text-[13px] font-bold tracking-[0.15em] rounded-lg hover:bg-[#2a201a] transition-colors disabled:opacity-60"
            style={{ padding: "12px 0", marginTop: "4px" }}
          >
            <Plus size={15} /> {submitting ? "جاري الحفظ..." : "حفظ الفئة"}
          </button>
        </form>

        <style>{`.input-field:focus { border-color:#c9a84c; box-shadow: 0 0 0 3px rgba(201,168,76,0.15); }`}</style>
      </div>
    </div>
  );
}