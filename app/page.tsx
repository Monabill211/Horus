import Header from "./header";
import Footer from "./footer";
import Hero from "./hero";
import CategoriesSlider from "./slidercatgry";
import BestSiller from "./bastsiller";
import RoundemProducts from "./roundemproduct";
import FaqAndPayment from "./Faqandpayment ";
import EditorialBanner from "./Editorialbanner";
import SocialFAB from "./Socialfab";
export default function Home() {
  return (
  <div lang="ar" dir="rtl">
    <Header />
    <Hero />
<EditorialBanner />
<RoundemProducts />
<SocialFAB />
<FaqAndPayment/>
    <Footer />
  </div>
  )
}
