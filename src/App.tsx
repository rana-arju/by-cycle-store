import type React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import { useAppSelector } from "./redux/hook";
import { IUser, useCurrentToken } from "./redux/features/auth/authSlice";
import { verifyToken } from "./utils/VerifyToken";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import Login from "./pages/auth/Login";
import ProtectRoute from "./components/layout/ProtectRoute";
import Dashboard from "./pages/Dashboard";
import MyOrders from "./pages/user/MyOrders";
import Orders from "./pages/admin/Orders";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Products from "./pages/admin/Products";
import AddProduct from "./pages/admin/CreateProduct";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Checkout from "./pages/user/Checkout";
import ProductDetails from "./pages/ProductDetails";
import VerifyOrder from "./pages/user/VerifyOrder";
import UpdateProduct from "./pages/admin/UpdateProduct";
import PasswordChange from "./pages/auth/PasswordChange";

const App: React.FC = () => {
  const token = useAppSelector(useCurrentToken);

  let user;
  if (token) {
    user = verifyToken(token);
  }
  const role = (user as IUser)?.role as "admin" | "customer" | null;
  const [userRole, setUserRole] = useState<"admin" | "customer" | null>(role);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
        },
      }}
    >
      <Router>
        <Layout userRole={userRole || undefined}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/verify" element={<VerifyOrder />} />
            <Route path="/order/my-orders" element={<MyOrders />} />
            <Route path="/details/:id" element={<ProductDetails />} />
            <Route
              path="/login"
              element={<Login setUserRole={setUserRole} />}
            />
            {userRole && (
              <>
                <Route
                  path="/dashboard"
                  element={
                    <ProtectRoute role="customer">
                      <Dashboard />
                    </ProtectRoute>
                  }
                />
                <Route
                  path="/dashboard/checkout"
                  element={
                    <ProtectRoute role="customer">
                      <Checkout />
                    </ProtectRoute>
                  }
                />
                <Route
                  path="/dashboard/myOrder"
                  element={
                    <ProtectRoute role="customer">
                      <MyOrders />
                    </ProtectRoute>
                  }
                />
                <Route path="/dashboard/orders" element={<Orders />} />
                {userRole === "admin" && (
                  <>
                    <Route
                      path="/dashboard/info"
                      element={
                        <ProtectRoute role="admin">
                          <AdminDashboard />
                        </ProtectRoute>
                      }
                    />
                    <Route
                      path="/dashboard/users"
                      element={
                        <ProtectRoute role="admin">
                          <Users />
                        </ProtectRoute>
                      }
                    />
                    <Route
                      path="/dashboard/orders"
                      element={
                        <ProtectRoute role="admin">
                          <Orders />
                        </ProtectRoute>
                      }
                    />
                    <Route
                      path="/dashboard/products"
                      element={
                        <ProtectRoute role="admin">
                          <Products />
                        </ProtectRoute>
                      }
                    />
                    <Route
                      path="/dashboard/add-product"
                      element={
                        <ProtectRoute role="admin">
                          <AddProduct />
                        </ProtectRoute>
                      }
                    />{" "}
                    <Route
                      path="/dashboard/productUpdate/:id"
                      element={
                        <ProtectRoute role="admin">
                          <UpdateProduct />
                        </ProtectRoute>
                      }
                    />
                  </>
                )}
                {(userRole === "customer" || userRole === "admin") && (
                  <>
                    <Route path="/dashboard/profile" element={<Profile />} />
                    <Route
                      path="/dashboard/password-update"
                      element={<PasswordChange />}
                    />
                  </>
                )}
              </>
            )}
          </Routes>
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default App;
