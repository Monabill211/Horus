import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Hero from "./components/home/hero";
import RoundemProducts from "./components/home/roundemproduct";
import FaqAndPayment from "./components/home/Faqandpayment ";
import SocialFAB from "./components/layout/Socialfab";
import FooterAr from "./components/layout/Footerar personsoul";
export default function Home() {
  return (
  <div >
    <Header />
    <Hero />
<RoundemProducts />
<SocialFAB />
{/* <FaqAndPayment/> */}
    {/* <Footer /> */}
    <FooterAr />
  </div>
  )
}
