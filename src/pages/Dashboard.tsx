import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/layout/ProfileSidebar";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <Layout>
      <Navbar />
      <DashboardSidebar />
      <Layout style={{minHeight: "100vh"}}>
        <div style={{marginTop: "70px"}}>

        <Outlet />
        </div>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
