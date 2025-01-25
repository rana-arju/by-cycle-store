import React, { CSSProperties } from 'react'

function RightHero() {
    const styles = {
      content: {
        zIndex: 2,
        textAlign: "center",
        backgroundColor: "#CFDFEE",
        padding: "24px",
        borderRadius: "8px",
        right: 0,
        top: 0,
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
        zIndex: 2,
      } as CSSProperties,
    };
  return (
    <div
      style={{
        ...styles.content,
        maxWidth: "500px",
        width: "100%",
        margin: "0 auto",
      }}
    >
      <span style={styles.badge}>Month deals</span>
      <div style={styles.content}>
        <h3 style={styles.title}>Hot Deals of The Day</h3>
        <p style={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, ut.
        </p>
        <span style={{ ...styles.price, marginRight: "5px" }}>From 4000</span>
        <button
          style={styles.button}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor =
              styles.buttonHover.backgroundColor || "";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor =
              styles.button.backgroundColor || "";
          }}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default RightHero