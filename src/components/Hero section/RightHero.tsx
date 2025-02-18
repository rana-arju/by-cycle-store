import { Button } from "antd";
import { CSSProperties } from "react";
import { Link } from "react-router-dom";

function RightHero() {
  const styles = {
    content: {
      zIndex: 2,
      textAlign: "center",
      backgroundColor: "#CFDFEE",
      padding: "24px",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    } as CSSProperties,
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "8px",
      color: "#000",
    } as CSSProperties,
    description: {
      color: "#000",
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
      zIndex: 99,
    } as CSSProperties,
  };
  return (
    <div
      className="hero-section-wrapper"
      style={{
        ...styles.content,

        width: "100%",
        margin: "0 auto",
      }}
    >
      <span style={styles.badge}>Month deals</span>
      <div style={styles.content}>
        <h3 style={styles.title}>Hot Deals of The Day</h3>
        <p style={styles.description}>
          Explore our new range and get the best offers
        </p>
        <span style={{ ...styles.price, marginRight: "5px" }}>From 4000</span>
        <Link to="/shop">
          <Button type="primary">Shop Now</Button>
        </Link>
      </div>
    </div>
  );
}

export default RightHero;
