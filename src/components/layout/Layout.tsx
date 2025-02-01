import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

import AppFooter from "../footer";
const { Content } = Layout;

function MainLayout() {
  return (
    <Layout>
      <Navbar />
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
      <AppFooter />
    </Layout>
  );
}

export default MainLayout;
