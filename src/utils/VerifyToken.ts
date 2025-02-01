import { jwtDecode } from "jwt-decode";
/*
export const verifyToken = (token: string) => {
  return jwtDecode(token);
};
*/
export const verifyToken = (token: string): any => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    return null;
  }
};
