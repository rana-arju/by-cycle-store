import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateProduct from "../pages/admin/CreateProduct";
import ProductList from "../pages/admin/ProductList";
import Profile from "../pages/Profile";
import { IUserPaths } from "../types/sidebar.type";

export const adminPath: IUserPaths[] = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Profile",
    path: "profile",
    element: <Profile />,
  },
  {
    name: "Create Product",
    path: "create-product",
    element: <CreateProduct />,
  },
  {
    name: "All Product",
    path: "all-product",
    element: <ProductList />,
  },
];
