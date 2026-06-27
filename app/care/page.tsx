import HeaderAr from "../components/layout/header";
import FooterAr from "../components/layout/footer";
import Socialfab from "../components/layout/Socialfab";

export default function CarePage() {
  return (
    <>
      <HeaderAr />

      <section
        className="bg-[#0d0d0d] text-white"
        style={{ padding: "100px 20px", minHeight: "100vh" }}
      >
        <div className="max-w-6xl mx-auto" style={{margin:"auto"}}>

          <h1
            className="text-center font-bold text-[#D4AF37]"
            style={{ fontSize: "50px", marginBottom: "20px" }}
          >
            العناية بالمنتجات
          </h1>

          <p
            className="text-center text-gray-300"
            style={{ marginBottom: "70px" }}
          >
            حافظ على جودة وأناقة ملابسك باتباع الإرشادات التالية.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div
              className="bg-[#181818] border border-[#D4AF37] rounded-2xl"
              style={{ padding: "35px" }}
            >
              <div className="text-5xl">🧺</div>

              <h2
                className="text-[#D4AF37] text-2xl font-bold"
                style={{ margin: "20px 0" }}
              >
                الغسيل
              </h2>

              <p className="text-gray-300 leading-8">
                اغسل الملابس بالماء البارد أو الفاتر (30° مئوية) للحفاظ على
                الألوان والخامة.
              </p>
            </div>

            <div
              className="bg-[#181818] border border-[#D4AF37] rounded-2xl"
              style={{ padding: "35px" }}
            >
              <div className="text-5xl">🌈</div>

              <h2
                className="text-[#D4AF37] text-2xl font-bold"
                style={{ margin: "20px 0" }}
              >
                فصل الألوان
              </h2>

              <p className="text-gray-300 leading-8">
                اغسل الملابس الداكنة معًا، والفاتحة معًا لتجنب انتقال الألوان.
              </p>
            </div>

            <div
              className="bg-[#181818] border border-[#D4AF37] rounded-2xl"
              style={{ padding: "35px" }}
            >
              <div className="text-5xl">🧴</div>

              <h2
                className="text-[#D4AF37] text-2xl font-bold"
                style={{ margin: "20px 0" }}
              >
                المنظفات
              </h2>

              <p className="text-gray-300 leading-8">
                استخدم منظفًا لطيفًا، وتجنب الكلور أو المواد الكيميائية القوية.
              </p>
            </div>

            <div
              className="bg-[#181818] border border-[#D4AF37] rounded-2xl"
              style={{ padding: "35px" }}
            >
              <div className="text-5xl">☀️</div>

              <h2
                className="text-[#D4AF37] text-2xl font-bold"
                style={{ margin: "20px 0" }}
              >
                التجفيف
              </h2>

              <p className="text-gray-300 leading-8">
                جفف الملابس في الظل بعيدًا عن أشعة الشمس المباشرة للحفاظ على
                اللون.
              </p>
            </div>

            <div
              className="bg-[#181818] border border-[#D4AF37] rounded-2xl"
              style={{ padding: "35px" }}
            >
              <div className="text-5xl">🧼</div>

              <h2
                className="text-[#D4AF37] text-2xl font-bold"
                style={{ margin: "20px 0" }}
              >
                الكي
              </h2>

              <p className="text-gray-300 leading-8">
                اكوي الملابس على درجة حرارة مناسبة حسب نوع القماش، ويفضل قلبها
                على الوجه الداخلي.
              </p>
            </div>

            <div
              className="bg-[#181818] border border-[#D4AF37] rounded-2xl"
              style={{ padding: "35px" }}
            >
              <div className="text-5xl">👕</div>

              <h2
                className="text-[#D4AF37] text-2xl font-bold"
                style={{ margin: "20px 0" }}
              >
                التخزين
              </h2>

              <p className="text-gray-300 leading-8">
                اطوِ الملابس بعناية أو علّقها على شماعات مناسبة، واحفظها في
                مكان جاف بعيدًا عن الرطوبة.
              </p>
            </div>

          </div>

          <div
            className="bg-[#181818] border-r-4 border-[#D4AF37] rounded-2xl"
            style={{ padding: "30px", marginTop: "70px" }}
          >
            <h2
              className="text-[#D4AF37] text-3xl font-bold"
              style={{ marginBottom: "20px" }}
            >
              نصائح مهمة
            </h2>

            <ul className="text-gray-300 leading-10 list-disc pr-6">
              <li>اقرأ تعليمات الغسيل الموجودة على ملصق المنتج.</li>
              <li>اقلب الملابس قبل الغسيل للحفاظ على الطباعة.</li>
              <li>لا تستخدم مجفف الملابس بدرجات حرارة مرتفعة.</li>
              <li>لا تترك الملابس مبللة لفترة طويلة.</li>
              <li>استخدم شماعات مناسبة للحفاظ على شكل الملابس.</li>
            </ul>
          </div>

        </div>
      </section>
 <Socialfab />
      <FooterAr />
    </>
  );
}