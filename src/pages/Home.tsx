import Boxes from "../components/annouce/Boxes"
import Blogs from "../components/Blog"
import Featured from "../components/featured"
import AppFooter from "../components/footer"
import Hero from "../components/Hero section"
import SaleComponent from "../components/Seles"
import Testimonials from "../components/testimonial"

function Home() {
  return (
    <div>
      <Hero />
      <Boxes />
      <Featured />
      <SaleComponent />
      <Testimonials />
      <Blogs />
      <AppFooter />
    </div>
  );
}

export default Home