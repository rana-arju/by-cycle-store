import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";

const { Content } = Layout;

// Simple components for each route

const Login = () => <h1>Login Page</h1>;
const Profile = () => <h1>Profile Page</h1>;
const Cart = () => <h1>Cart Page</h1>;

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Navbar />
        <Content style={{ marginTop: 64 }}>
          <div style={{ background: "#fff", minHeight: 380 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
