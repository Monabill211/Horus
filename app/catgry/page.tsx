import React from "react";
import HeaderAr from "../header";
import FooterAr from "../footer";
import Image from "next/image";

export default function Page() {
  const categories = [
    {
      id: 1,
      image: "/imgs/download.jpg",
      name: "شورتات",
    },
    {
      id: 2,
      image: "/imgs/download (1).jpg",
      name: "تشرتات",
    },
    {
      id: 3,
      image: "/imgs/download (2).jpg",
      name: "بناطيل",
    },
    {
      id: 4,
      image: "/imgs/download (3).jpg",
      name: "ترنجات",
    },
  ];

  return (
    <>
      <HeaderAr />

      <section className="py-16 px-6 h-dvh" style={{margin:"auto",padding:"20px"}} >
        <h2 className="text-4xl font-bold text-center mb-12" style={{marginBottom:"50px"}}>
          الأقسام
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {categories.map((item) => (
            <div
              key={item.id}
              className="relative group overflow-hidden rounded-2xl cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={400}
                height={500}
                className="w-full h-80 object-cover transition duration-500 group-hover:scale-110"
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
      </section>

      <FooterAr />
    </>
  );
}