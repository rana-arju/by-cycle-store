import type React from "react";
import { Link } from "react-router-dom";
import "../styles/notfound.css";
import { Button } from "antd";

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="wheel-container">
          <div className="wheel">
            <div className="spoke"></div>
            <div className="spoke"></div>
            <div className="spoke"></div>
          </div>
        </div>
        <h1 className="not-found-title">Oops! Page Not Found</h1>
        <p className="not-found-message">
          Looks like you've taken a wrong turn. Don't worry, even the best
          cyclists get lost sometimes!
        </p>
        <Link to="/" >
        <Button type="primary">

         Back Home
        </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
