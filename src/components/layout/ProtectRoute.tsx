import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  logout,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../utils/VerifyToken";
type IProtectedRoute = {
  children: ReactNode;
  //role: "admin" | "customer";
  role: string[];
};
const ProtectRoute = ({ children, role }: IProtectedRoute) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);

  if (!token) {
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }
  let user;
  if (token) {
    try {
      user = verifyToken(token);
    } catch (error) {
      return <Navigate to="/login" replace />;
    }
  }

  if (!role.includes(user?.role)) {
    dispatch(logout());
    return <Navigate to={"/login"} replace={true} />;
  }
  return children;
};

export default ProtectRoute;
