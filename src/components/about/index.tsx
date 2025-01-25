import "./about.css";
import img from "../../assets/3.jpg";
function AboutHeader() {
  return (
    <>
      <div className="overlay"></div>
      <div className="about-header">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            color: "white",
          }}
        >
          <h1 className="title">About Us</h1>
          <p>UNBEATABLE PRICES | UNMATCHED QUALITY | UNRIVALED SERVICE</p>
        </div>
      </div>
      <div style={{ marginTop: "20px" }} className="container about-content">
        <p>
          Welcome to Imam Cycle Store, your one-stop-shop for all your cycling
          needs! At Imam Cycle Store, we are passionate about cycling and our
          goal is to provide you with the best cycling experience possible. Our
          mission is to offer top-quality bicycles, accessories, and exceptional
          service to our customers at unbeatable prices.
        </p>
        <p>
          Imam Cycle Store is a family-owned and operated business that has been
          serving the cycling community in Bangladesh for over 30 years. We take
          pride in providing our customers with a wide variety of bicycles,
          ranging from road bikes, mountain bikes, city bikes, kids’ bikes, and
          more. Our bicycles are carefully selected from reputable brands that
          are known for their superior quality, durability, and performance.
        </p>
        <img src={img} alt="" style={{height: "300px" , width: "100%", objectFit: "cover"}} />
      </div>
    </>
  );
}

export default AboutHeader;
