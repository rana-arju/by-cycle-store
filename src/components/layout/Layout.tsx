import type React from "react";
import { useState, useEffect } from "react";
import { Layout as AntLayout, Button } from "antd";
import { useLocation } from "react-router-dom";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
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
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setCollapsed(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <AntLayout className="min-h-screen">
      <Navbar />
      <AntLayout className="mt-16">
        {isDashboard && userRole && (
          <DashboardSidebar
            userRole={userRole}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        )}
        <AntLayout
          className={`transition-all duration-300 ease-in-out ${
            isDashboard && userRole && !collapsed ? "ml-60" : "ml-0"
          } ${isDashboard && userRole && collapsed ? "ml-20" : "ml-0"}`}
        >
          <Content className="site-layout-background min-h-screen overflow-initial">
            <div
              className={`bg-white ${isDashboard && userRole ? "p-6" : "p-0"}`}
            >
              {isDashboard && userRole && (
                <Button
                  type="primary"
                  onClick={toggleSidebar}
                  className="mb-4 lg:hidden"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                >
                  {collapsed ? "Expand" : "Collapse"}
                </Button>
              )}
              {children}
            </div>
          </Content>
        </AntLayout>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
