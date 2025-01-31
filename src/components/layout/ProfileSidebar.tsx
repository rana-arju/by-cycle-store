import type React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  FileTextOutlined,
  FormOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

interface DashboardSidebarProps {
  userRole: "admin" | "customer";
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  userRole,
  collapsed,
  setCollapsed,
}) => {
  const location = useLocation();

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
    {
      key: "passwordUpdate",
      icon: <FormOutlined />,
      label: "Password Update",
      link: "/dashboard/password-update",
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
    {
      key: "passwordUpdate",
      icon: <FormOutlined />,
      label: "Password Update",
      link: "/dashboard/password-update",
    },
  ];

  const menuItems = userRole === "admin" ? adminMenuItems : customerMenuItems;

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth={80}
      onBreakpoint={(broken) => {
        setCollapsed(broken);
      }}
      className="fixed left-0 top-16 bottom-0 overflow-auto transition-all duration-300 ease-in-out"
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        selectedKeys={[location.pathname.split("/")[2] || "dashboard"]}
        className="h-full border-r-0"
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
