import Image from "next/image";
import Reveal from "./Reveal";

const categories = [
  {
    id: 1,
    name: "شورت",
    image: "/imgs/download.jpg",
  },
  {
    id: 2,
    name: "تشيرت",
    image: "/imgs/download (1).jpg",
  },
  {
    id: 3,
    name: "بنطلون",
    image: "/imgs/download (2).jpg",
  },
  {
    id: 4,
    name: "ترنج كامل",
    image: "/imgs/download (3).jpg",
  },
];
export default function Categories() {
  return (
    <Reveal>
    <section className="flex flex-col items-center gap-7 py-20 bg-white " style={{padding: '80px'}}>
      <h2 className="text-4xl font-bold text-center mb-12">
        تسوق من حورس علي حسب الفئة  
      </h2>

      <div className="flex gap-28 flex-wrap overflow-x-auto px-10 scrollbar-hide" style={{padding:"40px"}}>
        {categories.map((item) => (
          <div
            key={item.id}
            className="min-w-[220px] group cursor-pointer"
          >
            <div className="h-72 flex items-center justify-center">
              <Image
                src={item.image}
                alt={item.name}
                width={220}
                height={220}
                className="object-contain transition duration-500 group-hover:scale-110"
              />
            </div>

            <h3 className="text-center mt-5 text-xl font-semibold group-hover:text-gray-500 transition">
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </section></Reveal>
  );
}