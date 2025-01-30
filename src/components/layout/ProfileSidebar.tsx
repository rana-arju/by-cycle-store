import type React from "react";
import { Button, Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,

  TeamOutlined,
  FileTextOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

const { Sider } = Layout;

interface DashboardSidebarProps {
  userRole: "admin" | "user";
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ userRole }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const adminMenuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      link: "/dashboard/info",
    },
    {
      key: "users",
      icon: <TeamOutlined />,
      label: "Users",
      link: "/dashboard/users",
    },
    {
      key: "products",
      icon: <ShoppingCartOutlined />,
      label: "Products",
      link: "/dashboard/products",
    },
    {
      key: "addproducts",
      icon: <ShoppingCartOutlined />,
      label: "Add Products",
      link: "/dashboard/add-product",
    },
    {
      key: "orders",
      icon: <FileTextOutlined />,
      label: "Orders",
      link: "/dashboard/orders",
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
      link: "/dashboard/profile",
    },
  ];

  const customerMenuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      link: "/dashboard",
    },
    {
      key: "orders",
      icon: <FileTextOutlined />,
      label: "My Orders",
      link: "/dashboard/myOrder",
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
      link: "/dashboard/profile",
    },
  ];

  const menuItems = userRole === "admin" ? adminMenuItems : customerMenuItems;

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth={isMobile ? 80 : 80}
      onBreakpoint={(broken) => {
        setCollapsed(broken);
      }}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 70,
        bottom: 0,
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleCollapsed}
        style={{
          fontSize: "16px",
          width: "100%",
          height: 64,
          color: "white",
          display: isMobile ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#3182ce",
          borderRadius: 0,
        }}
      />
      <Menu
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        selectedKeys={[location.pathname.split("/")[2] || "dashboard"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.link}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default DashboardSidebar;
