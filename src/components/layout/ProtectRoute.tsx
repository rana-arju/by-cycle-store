import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  IUser,
  logout,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../utils/VerifyToken";
type IProtectedRoute = {
  children: ReactNode;
  role: string;
};
const ProtectRoute = ({ children, role }: IProtectedRoute) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }
  if (!token) {
    dispatch(logout());
    return <Navigate to={"/login"} replace={true} />;
  }
  if (role !== (user as IUser)?.role) {
    dispatch(logout());
    return <Navigate to={"/login"} replace={true} />;
  }
  return children;
};

export default ProtectRoute;
