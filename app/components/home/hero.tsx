import { Link } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
     <video
  autoPlay
  muted
  loop
  playsInline
  className="absolute inset-0 h-full w-full object-cover"
>
  <source
    src="/imgs/SaveClip.App_AQNrP8b6y5t-EMrCCsW93YNW_C1XWWPK6J_eemDKoFEnl0gZr4vhu4z-2pPrU5HhNNw21gblN9EzpqccjjSnDixfho8zE0t447Fs__k (1).mp4"
    type="video/mp4"
  />
</video>
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black/60"></div> */}

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center px-6" style={{padding: '20px'}}>
          <h1 className="text-yellow-400 text-5xl md:text-7xl font-extrabold uppercase tracking-widest animate-fadeIn">
            حورس 
          </h1>

       
<a href="/shop">
          <button className="mt-10 bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-400 hover:text-black transition-all duration-300 hover:scale-105 shadow-2xl"
          style={{padding: ' 20px 70px ', marginTop: '40px'}}
          >
            اشترِي الآن
          </button></a>
        </div>
      </div>
    </section>
  );
}