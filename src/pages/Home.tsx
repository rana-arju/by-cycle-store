import Boxes from "../components/annouce/Boxes"
import Featured from "../components/featured"
import AppFooter from "../components/footer"
import Hero from "../components/Hero section"

function Home() {
  return (
    <div>
      <Hero />
      <Boxes />
      <Featured />
      <AppFooter />
    </div>
  )
}

export default Home