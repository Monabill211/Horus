"use client";

import { useState } from "react";
import { Plus, Search, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { productsData } from "../data";
import { IconButton } from "../Shared";
import AddProductModal from "../add-prodeuct/page";

export default function ProductsTab() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between" style={{ marginBottom: "8px" }}>
        <div>
          <h1 className="font-['Cinzel',serif] text-2xl font-bold">المنتجات</h1>
          <p className="text-[13px] text-[#8a7e6f]" style={{ marginTop: "4px" }}>إدارة منتجات المتجر</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-[#c9a84c] text-[#171310] font-semibold text-[13px] rounded-lg hover:bg-[#dbbf6a] transition-colors"
          style={{ padding: "10px 16px" }}
        >
          <Plus size={14} /> إضافة منتج
        </button>
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
            {productsData.map((p) => (
              <tr key={p.name} className="border-b border-[#1a1410]/5 hover:bg-[#faf8f3] transition-colors">
                <td style={{ padding: "12px 20px" }}>
                  <img src={p.image} alt={p.name} className="object-cover rounded-md" style={{ width: "40px", height: "48px" }} />
                </td>
                <td style={{ padding: "12px 20px" }}>{p.name}</td>
                <td style={{ padding: "12px 20px" }}>
                  {p.original && (
                    <span className="text-[11px] text-[#b0a090] line-through" style={{ marginInlineEnd: "6px" }}>
                      {p.original} ج.م
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
                  {p.status ? <Eye size={16} color="#10b981" /> : <EyeOff size={16} color="#b0a090" />}
                </td>
                <td style={{ padding: "12px 20px" }}>
                  <div className="flex items-center gap-2">
                    <IconButton><Pencil size={13} /></IconButton>
                    <IconButton danger><Trash2 size={13} /></IconButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`.input-field:focus { border-color:#c9a84c; box-shadow: 0 0 0 3px rgba(201,168,76,0.15); }`}</style>

      <AddProductModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}