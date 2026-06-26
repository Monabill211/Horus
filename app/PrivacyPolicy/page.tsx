import HeaderAr from "../header";
import FooterAr from "../components/layout/footer";

export default function PrivacyPolicy() {
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
            سياسة الخصوصية
          </h1>

          <p
            className="text-center text-gray-300"
            style={{ marginBottom: "70px" }}
          >
            نحن في <span className="text-[#D4AF37] font-bold">حورس</span> نلتزم
            بحماية خصوصية عملائنا والحفاظ على سرية بياناتهم الشخصية، ويتم
            استخدام المعلومات فقط لتقديم أفضل تجربة تسوق ممكنة.
          </p>

          {/* المعلومات التي نجمعها */}

          <div
            className="bg-[#181818] border border-[#D4AF37] rounded-2xl"
            style={{ padding: "35px", marginBottom: "35px" }}
          >
            <h2
              className="text-[#D4AF37] text-3xl font-bold"
              style={{ marginBottom: "20px" }}
            >
              📋 المعلومات التي نجمعها
            </h2>

            <ul className="list-disc pr-6 text-gray-300 leading-10">
              <li>الاسم الكامل.</li>
              <li>رقم الهاتف.</li>
              <li>البريد الإلكتروني (إن وجد).</li>
              <li>عنوان الشحن.</li>
              <li>بيانات الطلبات السابقة.</li>
            </ul>
          </div>

          {/* استخدام البيانات */}

          <div
            className="bg-[#181818] border border-[#D4AF37] rounded-2xl"
            style={{ padding: "35px", marginBottom: "35px" }}
          >
            <h2
              className="text-[#D4AF37] text-3xl font-bold"
              style={{ marginBottom: "20px" }}
            >
              🔒 كيف نستخدم بياناتك؟
            </h2>

            <ul className="list-disc pr-6 text-gray-300 leading-10">
              <li>تنفيذ وتجهيز الطلبات.</li>
              <li>توصيل المنتجات إلى عنوانك.</li>
              <li>التواصل معك بشأن الطلبات أو الاستفسارات.</li>
              <li>تحسين خدمات المتجر وتجربة المستخدم.</li>
            </ul>
          </div>

          {/* حماية البيانات */}

          <div
            className="bg-[#181818] border border-[#D4AF37] rounded-2xl"
            style={{ padding: "35px", marginBottom: "35px" }}
          >
            <h2
              className="text-[#D4AF37] text-3xl font-bold"
              style={{ marginBottom: "20px" }}
            >
              🛡️ حماية البيانات
            </h2>

            <p className="text-gray-300 leading-9">
              نستخدم وسائل حماية مناسبة للحفاظ على بيانات العملاء ومنع الوصول
              غير المصرح به إليها، ولا تتم مشاركة بياناتك مع أي طرف ثالث إلا في
              الحالات الضرورية مثل شركات الشحن أو إذا كان ذلك مطلوبًا بموجب
              القانون.
            </p>
          </div>

          {/* ملفات تعريف الارتباط */}

          <div
            className="bg-[#181818] border border-[#D4AF37] rounded-2xl"
            style={{ padding: "35px", marginBottom: "35px" }}
          >
            <h2
              className="text-[#D4AF37] text-3xl font-bold"
              style={{ marginBottom: "20px" }}
            >
              🍪 ملفات تعريف الارتباط (Cookies)
            </h2>

            <p className="text-gray-300 leading-9">
              قد يستخدم الموقع ملفات تعريف الارتباط لتحسين تجربة التصفح وحفظ
              بعض الإعدادات وتطوير أداء الموقع.
            </p>
          </div>

          {/* حقوق العميل */}

          <div
            className="bg-[#181818] border border-[#D4AF37] rounded-2xl"
            style={{ padding: "35px", marginBottom: "35px" }}
          >
            <h2
              className="text-[#D4AF37] text-3xl font-bold"
              style={{ marginBottom: "20px" }}
            >
              👤 حقوقك
            </h2>

            <ul className="list-disc pr-6 text-gray-300 leading-10">
              <li>طلب تعديل بياناتك الشخصية.</li>
              <li>طلب حذف بياناتك عند الحاجة.</li>
              <li>الاستفسار عن كيفية استخدام بياناتك.</li>
            </ul>
          </div>

          {/* التواصل */}

          <div
            className="bg-[#181818] border-r-4 border-[#D4AF37] rounded-2xl"
            style={{ padding: "30px" }}
          >
            <h2
              className="text-[#D4AF37] text-2xl font-bold"
              style={{ marginBottom: "20px" }}
            >
              📞 تواصل معنا
            </h2>

            <p className="text-gray-300 leading-9">
              إذا كان لديك أي استفسار حول سياسة الخصوصية أو طريقة استخدام
              بياناتك، يمكنك التواصل معنا عبر صفحة "اتصل بنا" أو من خلال خدمة
              العملاء، وسنكون سعداء بمساعدتك.
            </p>
          </div>

        </div>
      </section>

      <FooterAr />
    </>
  );
}