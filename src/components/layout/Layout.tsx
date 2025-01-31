import type React from "react";
import { Layout as AntLayout } from "antd";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import DashboardSidebar from "./ProfileSidebar";

const { Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
  userRole?: "admin" | "customer";
}

const Layout: React.FC<LayoutProps> = ({ children, userRole }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Navbar />
      <AntLayout style={{ marginTop: "60px" }}>
        {isDashboard && userRole && <DashboardSidebar userRole={userRole} />}
        <AntLayout style={{ marginLeft: isDashboard && userRole ? 210 : 0 }}>
          <Content
            className="site-layout-background"
            style={{
              overflow: "initial",
              minHeight: "100vh",
            }}
          >
            <div
              style={{background: "#fff",
                paddingLeft: "10px",
                paddingTop: isDashboard && userRole ? "20px" : 0,
              }}
            >
              {children}
            </div>
          </Content>
        </AntLayout>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
