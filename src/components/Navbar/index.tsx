import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, Button, Drawer, Space, Badge } from "antd";
import {
  MenuOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  DownOutlined,
} from "@ant-design/icons";
import logo from "../../assets/logo.png";
import "./navbar.css";
import {
  IUser,
  logout,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { verifyToken } from "../../utils/VerifyToken";

const { Header } = Layout;

interface MenuItem {
  key: string;
  label: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { key: "home", label: "Home", path: "/" },
  { key: "shop", label: "Shop", path: "/shop" },
  { key: "about", label: "About", path: "/about" },
  { key: "contact", label: "Contact", path: "/contact" },
  { key: "services", label: "Services", path: "/services" },
  { key: "blog", label: "Blog", path: "/blog" },
];

const Navbar: React.FC = () => {
const dispatch = useAppDispatch()
  const token = useAppSelector(useCurrentToken);
 
  let user;
  if (token) {
    user = verifyToken(token);
  }
  const role = (user as IUser)?.role;

  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const [overflowedItems, setOverflowedItems] = useState<MenuItem[]>([]);
  const [count, setCount] = useState(0);

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  const handleLogout = () => dispatch(logout());// Implement logout logic

  const renderMenuItems = () =>
    menuItems
      .slice(0, menuItems.length - overflowedItems.length)
      .map((item) => (
        <Menu.Item key={item.key}>
          <Link to={item.path}>{item.label}</Link>
        </Menu.Item>
      ));

  const renderRightMenu = () => (
    <Space size="large" className="right-menu">
      {role ? (
        <>
          <Link to="/profile">
            <UserOutlined className="nav-icon" />
          </Link>
          <LogoutOutlined className="nav-icon" onClick={handleLogout} />
        </>
      ) : (
        <Button>
          <Link to="/login">Login</Link>
        </Button>
      )}
    </Space>
  );

  useEffect(() => {
    // Dynamically calculate overflowed items based on window width
    const handleResize = () => {
      const navWidth = document.querySelector(".navbar-menu")?.clientWidth || 0;
      const availableSpace = navWidth - 200; // Subtract space for logo & right menu
      const menuItemWidth = 100; // Approximate width per menu item
      const maxVisibleItems = Math.floor(availableSpace / menuItemWidth);

      if (menuItems.length > maxVisibleItems) {
        setOverflowedItems(menuItems.slice(maxVisibleItems));
      } else {
        setOverflowedItems([]);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial calculation
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          <Menu mode="horizontal" selectedKeys={[location.pathname]}>
            {renderMenuItems()}
            {overflowedItems.length > 0 && (
              <Menu.SubMenu
                key="more"
                title={
                  <>
                    More <DownOutlined />
                  </>
                }
              >
                {overflowedItems.map((item) => (
                  <Menu.Item key={item.key}>
                    <Link to={item.path}>{item.label}</Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            )}
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
      {/* Mobile Menu */}
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
      {/* Mobile Drawer */}
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
          {menuItems.map((item) => (
            <Menu.Item key={item.key}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
        <div className="drawer-right-menu">{renderRightMenu()}</div>
      </Drawer>
    </Header>
  );
};

export default Navbar;
