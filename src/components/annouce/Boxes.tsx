import {
  CustomerServiceOutlined,
  DollarOutlined,
  TruckOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import "./boxes.css";
function Boxes() {
  return (
    <div className="boxes container">
      <div className="box">
        <TruckOutlined />
        <div className="content">
          <h1>Free Delivery</h1>
          <p>Free shipping on all order</p>
        </div>
      </div>
      <div className="box">
        <DollarOutlined />
        <div className="content">
          <h1>Returns</h1>
          <p>Back guarantee under 7 days</p>
        </div>
      </div>
      <div className="box">
        <CustomerServiceOutlined />
        <div className="content">
          <h1>Support 24/7</h1>
          <p>Support online 24 hours a day</p>
        </div>
      </div>
      <div className="box">
        <WalletOutlined />
        <div className="content">
          <h1>payments</h1>
          <p>100% payment security</p>
        </div>
      </div>
    </div>
  );
}

export default Boxes;
