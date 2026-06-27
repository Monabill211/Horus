"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/app/supabase/Client";
import { IconButton } from "../Shared";
import AddProductModal from "../add-prodeuct/page";

export default function ProductsTab() {
  const [modalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    const supabase = createClient();

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("متأكد عايز تمسح المنتج ده؟")) return;
    const supabase = createClient();
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      console.log(error);
      alert("حصل خطأ أثناء الحذف");
      return;
    }
    fetchProducts();
  };

  const handleDeleteAll = async () => {
    if (!confirm("متأكد عايز تمسح كل المنتجات؟ الإجراء ده نهائي ومش هينفع ترجعه!")) return;
    if (!confirm("تأكيد أخير: هتمسح كل المنتجات بدون استرجاع، متأكد؟")) return;

    const supabase = createClient();
    const { error } = await supabase
      .from("products")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000"); // يطابق كل الصفوف الحقيقية

    if (error) {
      console.log(error);
      alert("حصل خطأ أثناء حذف كل المنتجات: " + error.message);
      return;
    }
    fetchProducts();
  };

  const filtered = products.filter((p) => p.name.includes(search));

  return (
    <div>
      <div className="flex items-center justify-between" style={{ marginBottom: "8px" }}>
        <div>
          <h1 className="font-['Cinzel',serif] text-2xl font-bold">المنتجات</h1>
          <p className="text-[13px] text-[#8a7e6f]" style={{ marginTop: "4px" }}>إدارة منتجات المتجر</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDeleteAll}
            className="flex items-center gap-2 border border-rose-300 text-rose-600 font-semibold text-[13px] rounded-lg hover:bg-rose-50 transition-colors"
            style={{ padding: "10px 16px" }}
          >
            <Trash2 size={14} /> مسح الكل
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-[#c9a84c] text-[#171310] font-semibold text-[13px] rounded-lg hover:bg-[#dbbf6a] transition-colors"
            style={{ padding: "10px 16px" }}
          >
            <Plus size={14} /> إضافة منتج
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3" style={{ margin: "20px 0" }}>
        <select className="input-field border border-[#1a1410]/12 rounded-lg text-[13px] outline-none bg-white" style={{ padding: "10px 14px" }}>
          <option>جميع الفئات</option>
          <option>تيشيرت</option>
          <option>بنطلون</option>
          <option>شورت</option>
          <option>ترنج</option>
        </select>
        <div className="relative flex-1 max-w-xs">
          <span className="absolute" style={{ right: "12px", top: "50%", transform: "translateY(-50%)" }}>
            <Search size={14} color="#8a7e6f" />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن منتج..."
            className="input-field w-full border border-[#1a1410]/12 rounded-lg text-[13px] outline-none"
            style={{ padding: "10px 36px 10px 14px" }}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#1a1410]/6 overflow-x-auto">
        <table className="w-full text-[13.5px]">
          <thead>
            <tr className="text-right text-[11px] text-[#8a7e6f] bg-[#faf8f3] border-b border-[#1a1410]/6">
              <th style={{ padding: "12px 20px" }}>الصورة</th>
              <th style={{ padding: "12px 20px" }}>الاسم</th>
              <th style={{ padding: "12px 20px" }}>السعر</th>
              <th style={{ padding: "12px 20px" }}>المخزون</th>
              <th style={{ padding: "12px 20px" }}>الحالة</th>
              <th style={{ padding: "12px 20px" }}>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center text-[#8a7e6f]" style={{ padding: "24px" }}>
                  جاري التحميل...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-[#8a7e6f]" style={{ padding: "24px" }}>
                  لا توجد منتجات
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id} className="border-b border-[#1a1410]/5 hover:bg-[#faf8f3] transition-colors">
                  <td style={{ padding: "12px 20px" }}>
                    <img src={p.image_url} alt={p.name} className="object-cover rounded-md" style={{ width: "40px", height: "48px" }} />
                  </td>
                  <td style={{ padding: "12px 20px" }}>{p.name}</td>
                  <td style={{ padding: "12px 20px" }}>
                    {p.original_price && (
                      <span className="text-[11px] text-[#b0a090] line-through" style={{ marginInlineEnd: "6px" }}>
                        {p.original_price} ج.م
                      </span>
                    )}
                    <span className="font-bold">{p.price} ج.م</span>
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    <span
                      className={`inline-block rounded-full text-[11px] ${
                        p.stock === 0 ? "bg-rose-100 text-rose-600" : "bg-[#f1ebdc] text-[#5c5346]"
                      }`}
                      style={{ padding: "4px 10px" }}
                    >
                      {p.stock}
                    </span>
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    {p.is_active ? <Eye size={16} color="#10b981" /> : <EyeOff size={16} color="#b0a090" />}
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    <div className="flex items-center gap-2">
                      <IconButton><Pencil size={13} /></IconButton>
                      <IconButton danger onClick={() => handleDelete(p.id)}><Trash2 size={13} /></IconButton>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`.input-field:focus { border-color:#c9a84c; box-shadow: 0 0 0 3px rgba(201,168,76,0.15); }`}</style>

      <AddProductModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          fetchProducts();
        }}
      />
    </div>
  );
}