import type React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Login from "./auth/Login";
import Dashboard from "./Dashboard";
import Orders from "./admin/Orders";
import Users from "./admin/Users";
import Products from "./admin/Products";
import Profile from "./Profile";
import Layout from "../components/layout/Layout";
import AdminDashboard from "./admin/AdminDashboard";
import { useAppSelector } from "../redux/hook";
import { IUser, useCurrentToken } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/VerifyToken";
import Shop from "./Shop";
import ProtectRoute from "../components/layout/ProtectRoute";
import AddProduct from "./admin/CreateProduct";
import MyOrders from "./user/MyOrders";

const Test: React.FC = () => {
  const token = useAppSelector(useCurrentToken);

  let user;
  if (token) {
    user = verifyToken(token);
  }
  const role = (user as IUser)?.role as "admin" | "user" | null;
  const [userRole, setUserRole] = useState<"admin" | "user" | null>(role);

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
            <Route
              path="/login"
              element={<Login setUserRole={setUserRole} />}
            />
            {userRole && (
              <>
                <Route
                  path="/dashboard"
                  element={
                    <ProtectRoute role="user">
                      <Dashboard />
                    </ProtectRoute>
                  }
                />{" "}
                <Route
                  path="/dashboard/myOrder"
                  element={
                    <ProtectRoute role="user">
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
                    />
                  </>
                )}
                {(userRole === "user" || userRole === "admin") && (
                  <Route path="/dashboard/profile" element={<Profile />} />
                )}
              </>
            )}
          </Routes>
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default Test;
