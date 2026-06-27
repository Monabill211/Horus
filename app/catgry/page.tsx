"use client";
import HeaderAr from "../components/layout/header";
import FooterAr from "../components/layout/footer";
import { useState, useEffect } from "react";
import { createClient } from "@/app/supabase/Client";

export default function Page() {
  const [categories, setCategories] = useState<any[]>([]);
    const [loadingList, setLoadingList] = useState(true);
  
useEffect(() => {
  fetchCategories();
}, []);
  
const supabase = createClient();

useEffect(() => {
  fetchCategories();
}, []);

async function fetchCategories() {
  setLoadingList(true);

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    setLoadingList(false);
    return;
  }

  setCategories(data || []);
  setLoadingList(false);
}
  return (
    <>
      <HeaderAr />

      <section className="py-16 px-6 h-dvh" style={{margin:"auto",padding:"20px"}} >
        <h2 className="text-4xl font-bold text-center mb-12" style={{marginBottom:"50px"}}>
          الأقسام
        </h2>


{loadingList ? (
  <p className="text-center text-[#8a7e6f]">جاري التحميل...</p>
) : categories.length === 0 ? (
  <p className="text-center text-[#8a7e6f]">لا توجد فئات بعد</p>
) : (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
    {categories.map((item) => (
      <div
        key={item.id}
        className="relative group overflow-hidden rounded-2xl cursor-pointer h-[320px]"
      >
        <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/35 group-hover:bg-black/50 transition"></div>

        {/* Category Name */}
        <h3 className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white text-2xl font-bold">
          {item.name}
        </h3>
      </div>
    ))}
  </div>
)}
         
        

      </section>

      <FooterAr />
    </>
  );
}