import Boxes from "../components/annouce/Boxes"
import Blogs from "../components/Blog"
import Featured from "../components/featured"
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
    </div>
  );
}

export default Home