import LeftHero from "./LeftHero";
import RightHero from "./RightHero";
import "./hero.css";
function Hero() {
  return (
    <div className="hero conatiner">
      <LeftHero />

      <RightHero />
    </div>
  );
}

export default Hero;
