import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import Home from "../pages/Home";
import About from "../pages/About";
import Blog from "../pages/Blog";
import Contact from "../pages/Contact";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/auth/Login";
import ProtectRoute from "../components/layout/ProtectRoute";
import Dashboard from "../pages/Dashboard";
import MyOrders from "../pages/user/MyOrders";
import Checkout from "../pages/user/Checkout";
import VerifyOrder from "../pages/user/VerifyOrder";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";
import Orders from "../pages/admin/Orders";
import Products from "../pages/admin/Products";
import AddProduct from "../pages/admin/CreateProduct";
import UpdateProduct from "../pages/admin/UpdateProduct";
import Profile from "../pages/Profile";
import PasswordChange from "../pages/auth/PasswordChange";
import OrdersDetails from "../pages/user/OrderDetails";
import NotFound from "../pages/NotFound";
import MainLayout from "../components/layout/Layout";
import Registration from "../pages/auth/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "blog", element: <Blog /> },
      { path: "contact", element: <Contact /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
      { path: "details/:id", element: <ProductDetails /> },
      {
        path: "/checkout",
        element: (
          <ProtectRoute role={["customer"]}>
            <Checkout />
          </ProtectRoute>
        ),
      },
      {
        path: "/order/verify",
        element: (
          <ProtectRoute role={["customer"]}>
            <VerifyOrder />
          </ProtectRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "myOrder",
        element: (
          <ProtectRoute role={["customer"]}>
            <MyOrders />
          </ProtectRoute>
        ),
      },

      {
        path: "info",
        element: (
          <ProtectRoute role={["admin"]}>
            <AdminDashboard />
          </ProtectRoute>
        ),
      },
      {
        path: "users",
        element: (
          <ProtectRoute role={["admin"]}>
            <Users />
          </ProtectRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectRoute role={["admin"]}>
            <Orders />
          </ProtectRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectRoute role={["admin"]}>
            <Products />
          </ProtectRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <ProtectRoute role={["admin"]}>
            <AddProduct />
          </ProtectRoute>
        ),
      },
      {
        path: "productUpdate/:id",
        element: (
          <ProtectRoute role={["admin"]}>
            <UpdateProduct />
          </ProtectRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectRoute role={["customer", "admin"]}>
            <Profile />
          </ProtectRoute>
        ),
      },
      {
        path: "password-update",
        element: (
          <ProtectRoute role={["customer", "admin"]}>
            <PasswordChange />
          </ProtectRoute>
        ),
      },
      {
        path: "order/:id",
        element: (
          <ProtectRoute role={["customer", "admin"]}>
            <OrdersDetails />
          </ProtectRoute>
        ),
      },
    ],
  },
  { path: "*", element: <NotFound /> },
  { path: "/login", element: <Login /> },
  { path: "/registration", element: <Registration /> },
]);

const AllRoutes = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default AllRoutes;
