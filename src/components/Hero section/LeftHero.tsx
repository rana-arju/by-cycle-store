import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Autoplay } from "swiper/modules";
import { CSSProperties } from "react";
import hero1 from "../../assets/1.webp";
import hero2 from "../../assets/2.jpg";
import hero3 from "../../assets/3.jpg";
import { Button } from "antd";
import { Link } from "react-router-dom";
interface SliderItem {
  title: string;
  description: string;
  price: string;
  image: string;
}

const sliderData: SliderItem[] = [
  {
    title: "Best Deals Of The Week",
    description: "Amazing discounts and deals",
    price: "$399.99",
    image: hero1,
  },
  {
    title: "Exclusive Weekend Offers",
    description: "Don't miss out on these offers!",
    price: "$299.99",
    image: hero2,
  },
  {
    title: "Limited Time Sale",
    description: "Grab it before it's gone!",
    price: "$199.99",
    image: hero3,
  },
];

const styles = {
  sliderContainer: {
    width: "100%",
    //maxWidth: "800px",
    margin: "0 auto",
  } as CSSProperties,
  slide: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundPosition: "center top",
    color: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    height: "400px",
  } as CSSProperties,
  content: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "24px",
    borderRadius: "8px",
    right: 0,
    top: 0,
  } as CSSProperties,
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "8px",
  } as CSSProperties,
  description: {
    color: "#a0aec0",
    marginBottom: "16px",
    fontSize: "18px",
  } as CSSProperties,
  price: {
    color: "#f6ad55",
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "16px",
  } as CSSProperties,
  button: {
    backgroundColor: "#3182ce",
    color: "white",
    fontWeight: "bold",
    padding: "12px 24px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    fontSize: "16px",
  } as CSSProperties,
  buttonHover: {
    backgroundColor: "#2b6cb0",
  } as CSSProperties,
  badge: {
    backgroundColor: "#e53e3e",
    color: "white",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "bold",
    position: "absolute",
    top: "16px",
    left: "16px",
    zIndex: 2,
  } as CSSProperties,
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  } as CSSProperties,
};

const LeftHero: React.FC = () => {
  return (
    <div style={styles.sliderContainer}>
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        {sliderData.map((item, index) => (
          <SwiperSlide
            key={index}
            style={{ ...styles.slide, backgroundImage: `url(${item.image})` }}
          >
            <div style={styles.overlay}></div>
            <span style={styles.badge}>Weekend Deal</span>
            <div style={styles.content}>
              <h3 style={styles.title}>{item.title}</h3>
              <p style={styles.description}>{item.description}</p>
              <span style={{ ...styles.price, marginRight: "5px" }}>
                From {item.price}
              </span>
              <Link to="/shop">
                <Button type="primary">Shop Now</Button>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LeftHero;
