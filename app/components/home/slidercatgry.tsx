import Image from "next/image";
import Reveal from "../../Reveal";

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
    <section className="flex flex-col items-center gap-7 py-20 bg-white text-black " style={{padding: '50px'}}>
      <h2 className="text-4xl font-bold text-center mb-12">
        تسوق من حورس علي حسب الفئة  
      </h2>

<div
  className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full"
  style={{ padding: "40px" }}
>        {categories.map((item) => (
          <div
            key={item.id}
className="group cursor-pointer w-full"          >
            <div className="h-72 flex items-center justify-center">
              <Image
  src={item.image}
  alt={item.name}
  width={170}
  height={220}
  className="w-full h-auto object-contain transition duration-500 group-hover:scale-110"
/>
            </div>

            <h3 className="text-center mt-5 text-black text-xl font-semibold group-hover:text-gray-500 transition" style={{marginTop:"35px"}}>
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </section></Reveal>
  );
}