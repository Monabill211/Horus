import HeaderAr from "../header";
import FooterAr from "../footer";

export default function ShippingPolicy() {
  return (
    <>
      <HeaderAr />

      <section
        className="bg-[#0d0d0d] text-white"
        style={{ padding: "100px 20px", minHeight: "100vh" }}
      >
        <div className="max-w-5xl mx-auto" style={{margin:"auto"}}>

          <h1
            className="text-center font-bold text-[#D4AF37]"
            style={{ fontSize: "50px", marginBottom: "20px" }}
          >
            سياسة الشحن والاسترجاع
          </h1>

          <p
            className="text-center text-gray-300"
            style={{ marginBottom: "70px" }}
          >
            نسعى في حورس إلى تقديم تجربة تسوق مريحة وآمنة، لذلك نوضح لك سياسة
            الشحن والاستبدال والاسترجاع بكل شفافية.
          </p>

          {/* الشحن */}

          <div
            className="bg-[#181818] border border-[#D4AF37] rounded-2xl"
            style={{ padding: "35px", marginBottom: "35px" }}
          >
            <h2
              className="text-[#D4AF37] text-3xl font-bold"
              style={{ marginBottom: "20px" }}
            >
              🚚 سياسة الشحن
            </h2>

            <ul className="list-disc pr-6 text-gray-300 leading-10">
              <li>يتم تجهيز الطلب خلال 24 - 48 ساعة من تأكيده.</li>
              <li>مدة التوصيل تختلف حسب المحافظة وتتراوح بين يومين إلى 7 أيام عمل.</li>
              <li>سيتم إرسال رقم تتبع الشحنة بعد شحن الطلب.</li>
              <li>في حالة وجود أي تأخير سيتم التواصل مع العميل مباشرة.</li>
            </ul>
          </div>

          {/* الاستبدال */}

          <div
            className="bg-[#181818] border border-[#D4AF37] rounded-2xl"
            style={{ padding: "35px", marginBottom: "35px" }}
          >
            <h2
              className="text-[#D4AF37] text-3xl font-bold"
              style={{ marginBottom: "20px" }}
            >
              🔄 سياسة الاستبدال
            </h2>

            <ul className="list-disc pr-6 text-gray-300 leading-10">
              <li>يمكن استبدال المنتج خلال 14 يومًا من تاريخ الاستلام.</li>
              <li>يشترط أن يكون المنتج بحالته الأصلية وبدون استخدام.</li>
              <li>يجب وجود جميع الملصقات الأصلية مع المنتج.</li>
              <li>يتحمل العميل رسوم الشحن الخاصة بعملية الاستبدال ما لم يكن الخطأ من المتجر.</li>
            </ul>
          </div>

          {/* الاسترجاع */}

          <div
            className="bg-[#181818] border border-[#D4AF37] rounded-2xl"
            style={{ padding: "35px", marginBottom: "35px" }}
          >
            <h2
              className="text-[#D4AF37] text-3xl font-bold"
              style={{ marginBottom: "20px" }}
            >
              💰 سياسة الاسترجاع
            </h2>

            <ul className="list-disc pr-6 text-gray-300 leading-10">
              <li>يمكن طلب استرجاع المنتج خلال 14 يومًا من تاريخ الاستلام.</li>
              <li>يجب أن يكون المنتج غير مستخدم وفي حالته الأصلية.</li>
              <li>بعد استلام المنتج وفحصه سيتم رد المبلغ خلال فترة قصيرة وفقًا لطريقة الدفع.</li>
              <li>لا يمكن استرجاع المنتجات التالفة بسبب سوء الاستخدام.</li>
            </ul>
          </div>

          {/* ملاحظات */}

          <div
            className="bg-[#181818] border-r-4 border-[#D4AF37] rounded-2xl"
            style={{ padding: "30px" }}
          >
            <h2
              className="text-[#D4AF37] text-2xl font-bold"
              style={{ marginBottom: "20px" }}
            >
              📌 ملاحظات هامة
            </h2>

            <ul className="list-disc pr-6 text-gray-300 leading-10">
              <li>يرجى فحص الطلب عند الاستلام.</li>
              <li>في حالة استلام منتج خاطئ أو به عيب تصنيع يرجى التواصل معنا خلال 48 ساعة.</li>
              <li>لأي استفسار يمكنك التواصل مع خدمة العملاء عبر واتساب أو البريد الإلكتروني.</li>
            </ul>
          </div>

        </div>
      </section>

      <FooterAr />
    </>
  );
}