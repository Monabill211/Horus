import HeaderAr from "../components/layout/header";
import FooterAr from "../components/layout/footer";
import Socialfab from "../components/layout/Socialfab";

export default function SizeGuide() {
  return (
    <>
      <HeaderAr />

      <section
        className="bg-[#0d0d0d] text-white"
        style={{ padding: "100px 20px", minHeight: "100vh", }}
      >
        <div className="max-w-6xl mx-auto" style={{margin:"auto"}}>

          <h1
            className="text-center font-bold text-[#D4AF37]"
            style={{ fontSize: "50px", marginBottom: "20px" }}
          >
            دليل المقاسات
          </h1>

          <p
            className="text-center text-gray-300"
            style={{ marginBottom: "60px" }}
          >
            استخدم الجدول التالي لاختيار المقاس المناسب لك قبل إتمام عملية الشراء.
          </p>

          {/* Table */}

          <div className="overflow-x-auto rounded-2xl border border-[#D4AF37]">

            <table className="w-full text-center">

              <thead className="bg-[#D4AF37] text-black">

                <tr>
                  <th style={{ padding: "18px" }}>المقاس</th>
                  <th>الصدر (سم)</th>
                  <th>الخصر (سم)</th>
                  <th>الطول (سم)</th>
                  <th>الوزن(كم)</th>
                </tr>

              </thead>

              <tbody>

                <tr className="border-b border-gray-700">
                  <td style={{ padding: "18px" }}>S</td>
                  <td>90 - 95</td>
                  <td>75 - 80</td>
                  <td>68</td>
                  <td>55-65</td>
                </tr>

                <tr className="border-b border-gray-700">
                  <td style={{ padding: "18px" }}>M</td>
                  <td>96 - 101</td>
                  <td>81 - 86</td>
                  <td>70</td>
                  <td>65-75</td>
                </tr>

                <tr className="border-b border-gray-700">
                  <td style={{ padding: "18px" }}>L</td>
                  <td>102 - 107</td>
                  <td>87 - 92</td>
                  <td>72</td>
                  <td>75-85</td>
                </tr>

                <tr className="border-b border-gray-700">
                  <td style={{ padding: "18px" }}>XL</td>
                  <td>108 - 114</td>
                  <td>93 - 99</td>
                  <td>74</td>
                  <td>85-90</td>
                </tr>

                <tr>
                  <td style={{ padding: "18px" }}>XXL</td>
                  <td>115 - 122</td>
                  <td>100 - 108</td>
                  <td>76</td>
                  <td>95</td>
                </tr>

              </tbody>

            </table>

          </div>

          {/* Tips */}

          <div
            className="grid md:grid-cols-3 gap-8"
            style={{ marginTop: "70px" }}
          >

            <div
              className="bg-[#181818] border border-[#D4AF37] rounded-2xl text-center"
              style={{ padding: "35px" }}
            >
              <div className="text-5xl">📏</div>

              <h3
                className="text-[#D4AF37] text-2xl font-bold"
                style={{ margin: "20px 0" }}
              >
                قياس الصدر
              </h3>

              <p className="text-gray-300">
                لف شريط القياس حول أعرض جزء من الصدر بدون شد.
              </p>
            </div>

            <div
              className="bg-[#181818] border border-[#D4AF37] rounded-2xl text-center"
              style={{ padding: "35px" }}
            >
              <div className="text-5xl">📐</div>

              <h3
                className="text-[#D4AF37] text-2xl font-bold"
                style={{ margin: "20px 0" }}
              >
                قياس الخصر
              </h3>

              <p className="text-gray-300">
                قم بقياس محيط الخصر في أضيق نقطة.
              </p>
            </div>

            <div
              className="bg-[#181818] border border-[#D4AF37] rounded-2xl text-center"
              style={{ padding: "35px" }}
            >
              <div className="text-5xl">👕</div>

              <h3
                className="text-[#D4AF37] text-2xl font-bold"
                style={{ margin: "20px 0" }}
              >
                إذا كنت بين مقاسين
              </h3>

              <p className="text-gray-300">
                اختر المقاس الأكبر للحصول على راحة أكثر.
              </p>
            </div>

          </div>

          {/* Note */}

          <div
            className="bg-[#181818] border-r-4 border-[#D4AF37] rounded-xl"
            style={{ padding: "25px", marginTop: "60px" }}
          >
            <h3 className="text-[#D4AF37] text-2xl font-bold">
              ملاحظة
            </h3>

            <p
              className="text-gray-300"
              style={{ marginTop: "15px", lineHeight: "2" }}
            >
              قد تختلف المقاسات بمقدار 1 إلى 2 سم حسب نوع القماش وطريقة التصنيع،
              لذلك يُفضل مقارنة المقاسات بقطعة ملابس تمتلكها بالفعل للحصول على أفضل اختيار.
            </p>
          </div>

        </div>
      </section>
 <Socialfab />
      <FooterAr />
    </>
  );
}