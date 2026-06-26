import HeaderAr from "../header";
import FooterAr from "../components/layout/footer";

export default function AboutPage() {
  return (
    <>
      <HeaderAr />

      <section
        className="bg-[#0d0d0d] text-white"
        style={{ padding: "120px 20px" }}
      >
        <div
          className="max-w-6xl mx-auto"
          style={{ margin: "0 auto" }}
        >
          <p className="text-center tracking-[8px] text-[#D4AF37] font-semibold">
            HORUS
          </p>

          <h1
            className="text-center font-bold text-[#D4AF37]"
            style={{ marginTop: "20px", marginBottom: "40px", fontSize: "55px" }}
          >
            من نحن
          </h1>

          <p
            className="text-center text-gray-300 leading-10 text-lg max-w-4xl mx-auto"
            style={{ marginBottom: "70px" }}
          >
            في <span className="text-[#D4AF37] font-bold">حورس</span> نؤمن أن
            الأناقة ليست مجرد ملابس، بل أسلوب حياة يعكس شخصية كل فرد. لذلك
            نقدم تشكيلة مميزة من الملابس العصرية بخامات عالية الجودة وتصاميم
            تجمع بين الفخامة والراحة لتناسب جميع الأذواق.
          </p>

          <div
            className="grid md:grid-cols-3 gap-8"
            style={{ marginTop: "40px" }}
          >
            <div
              className="bg-[#181818] border border-[#D4AF37] rounded-2xl text-center hover:scale-105 duration-300"
              style={{ padding: "40px 25px" }}
            >
              <div className="text-5xl">🚚</div>

              <h2
                className="text-[#D4AF37] text-2xl font-bold"
                style={{ marginTop: "20px", marginBottom: "15px" }}
              >
                شحن سريع
              </h2>

              <p className="text-gray-300">
                نوفر خدمة شحن سريعة وآمنة إلى جميع المحافظات مع متابعة الطلب
                حتى يصل إليك.
              </p>
            </div>

            <div
              className="bg-[#181818] border border-[#D4AF37] rounded-2xl text-center hover:scale-105 duration-300"
              style={{ padding: "40px 25px" }}
            >
              <div className="text-5xl">⭐</div>

              <h2
                className="text-[#D4AF37] text-2xl font-bold"
                style={{ marginTop: "20px", marginBottom: "15px" }}
              >
                جودة عالية
              </h2>

              <p className="text-gray-300">
                جميع منتجاتنا مصنوعة من أفضل الخامات لضمان الجودة والراحة
                والاستدامة.
              </p>
            </div>

            <div
              className="bg-[#181818] border border-[#D4AF37] rounded-2xl text-center hover:scale-105 duration-300"
              style={{ padding: "40px 25px" }}
            >
              <div className="text-5xl">👕</div>

              <h2
                className="text-[#D4AF37] text-2xl font-bold"
                style={{ marginTop: "20px", marginBottom: "15px" }}
              >
                أحدث الموضة
              </h2>

              <p className="text-gray-300">
                نتابع أحدث صيحات الموضة لنقدم لك تصميمات عصرية تناسب جميع
                المناسبات.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="bg-black text-white"
        style={{ padding: "120px 20px" }}
      >
        <div
          className="max-w-4xl mx-auto text-center"
          style={{ margin: "0 auto" }}
        >
          <h2
            className="text-[#D4AF37] font-bold"
            style={{ fontSize: "45px", marginBottom: "35px" }}
          >
            رؤيتنا
          </h2>

          <p className="text-gray-300 text-lg leading-10">
            نسعى لأن تصبح <span className="text-[#D4AF37]">حورس</span> واحدة من
            أبرز العلامات التجارية المصرية في مجال الملابس، وأن نقدم تجربة
            تسوق تجمع بين الجودة والفخامة والأسعار المناسبة مع خدمة عملاء
            متميزة.
          </p>
        </div>
      </section>

      <FooterAr />
    </>
  );
}