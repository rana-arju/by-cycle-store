import type React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, Button, Drawer, Space, Badge } from "antd";
import logo from "../../assets/logo.png";
import {
  MenuOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./navbar.css";

const { Header } = Layout;

interface MenuItem {
  key: string;
  label: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { key: "home", label: "Home", path: "/" },
  { key: "about", label: "About", path: "/about" },
  { key: "services", label: "Services", path: "/services" },
  { key: "contact", label: "Contact", path: "/contact" },
];

const Navbar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // This should be managed by user authentication system
  const location = useLocation();
  const [count, setCount] = useState(0);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleLogout = () => {
    // Implement logout logic here
    setIsLoggedIn(false);
  };

  const renderMenuItems = () =>
    menuItems.map((item) => (
      <Menu.Item key={item.key}>
        <Link to={item.path}>{item.label}</Link>
      </Menu.Item>
    ));

  const renderRightMenu = () => (
    <Space size="large" className="right-menu">
      {isLoggedIn ? (
        <>
          <Link to="/profile">
            <UserOutlined className="nav-icon" />
          </Link>
          <LogoutOutlined className="nav-icon" onClick={handleLogout} />
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </Space>
  );

  return (
    <Header className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>
      <div className="navbar-menu">
        {/* Desktop Menu */}
        <div className="desktop-menu">
          <Menu
           
            mode="horizontal"
            selectedKeys={[location.pathname]}
          >
            {renderMenuItems()}
          </Menu>
        </div>
      </div>
      <div className="navbar-right">
        {renderRightMenu()}
        <Link to="/cart" className="cart-icon desktop-cart">
          <Badge count={count} size="small">
            <ShoppingCartOutlined className="nav-icon" />
          </Badge>
        </Link>
      </div>
      {/* Mobile Menu and Cart */}
      <div className="mobile-menu">
        <Link to="/cart" className="cart-icon mobile-cart">
          <Badge count={count} size="small">
            <ShoppingCartOutlined className="nav-icon" />
          </Badge>
        </Link>
        <Button type="primary" onClick={showDrawer}>
          <MenuOutlined />
        </Button>
      </div>
      {/* Mobile Menu Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={onClose}
        visible={visible}
        className="mobile-drawer"
      >
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          onClick={onClose}
        >
          {renderMenuItems()}
        </Menu>
        <div className="drawer-right-menu">{renderRightMenu()}</div>
      </Drawer>
    </Header>
  );
};

export default Navbar;
