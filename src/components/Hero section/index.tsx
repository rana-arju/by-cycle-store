import LeftHero from "./LeftHero";
import RightHero from "./RightHero";
import "./hero.css";
import banner from "../../assets/banner.png"
function Hero() {
  return (
    <div className="container">
      <div className="hero">
        <LeftHero />
        <RightHero />
      </div>
      <div className="banner">
        <img src={banner} alt="" />
      </div>
    </div>
  );
}

export default Hero;
