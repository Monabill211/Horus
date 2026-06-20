"use client";

import { useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { categoriesData } from "../data";
import { IconButton } from "../Shared";
import AddCategoryModal from "../add-catygre/page";

export default function CategoriesTab() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between" style={{ marginBottom: "24px" }}>
        <div>
          <h1 className="font-['Cinzel',serif] text-2xl font-bold">الفئات</h1>
          <p className="text-[13px] text-[#8a7e6f]" style={{ marginTop: "4px" }}>إدارة فئات المنتجات</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-[#c9a84c] text-[#171310] font-semibold text-[13px] rounded-lg hover:bg-[#dbbf6a] transition-colors"
          style={{ padding: "10px 16px" }}
        >
          <Plus size={14} /> إضافة فئة
        </button>
      </div>

      <div className="relative max-w-sm" style={{ marginBottom: "20px" }}>
        <span className="absolute" style={{ right: "12px", top: "50%", transform: "translateY(-50%)" }}>
          <Search size={14} color="#8a7e6f" />
        </span>
        <input
          type="text"
          placeholder="ابحث عن فئة..."
          className="input-field w-full border border-[#1a1410]/12 rounded-lg text-[13px] outline-none bg-white"
          style={{ padding: "10px 36px 10px 14px" }}
        />
      </div>

      <div className="flex flex-col gap-3">
        {categoriesData.map((c) => (
          <div
            key={c.name}
            className="bg-white rounded-xl border border-[#1a1410]/6 flex items-center justify-between"
            style={{ padding: "16px" }}
          >
            <div className="flex items-center gap-4">
              <img src={c.image} alt={c.name} className="object-cover rounded-lg" style={{ width: "56px", height: "56px" }} />
              <div>
                <p className="font-semibold text-[14px]">{c.name}</p>
                <p className="text-[11px] text-[#8a7e6f]">{c.en}</p>
                <p className="text-[11px] text-[#8a7e6f]" style={{ marginTop: "2px" }}>عدد المنتجات: {c.count}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <IconButton><Pencil size={13} /></IconButton>
              <IconButton danger><Trash2 size={13} /></IconButton>
            </div>
          </div>
        ))}
      </div>

      <style>{`.input-field:focus { border-color:#c9a84c; box-shadow: 0 0 0 3px rgba(201,168,76,0.15); }`}</style>

      {/* <AddCategoryModal open={modalOpen} onClose={() => setModalOpen(false)} /> */}
    </div>
  );
}