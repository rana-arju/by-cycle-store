
function ShopHeader() {
  return (
    <div>
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
          <h1 className="title">Shop Now</h1>
          <p>UNBEATABLE PRICES | UNMATCHED QUALITY | UNRIVALED SERVICE</p>
        </div>
      </div>
    </div>
  );
}

export default ShopHeader