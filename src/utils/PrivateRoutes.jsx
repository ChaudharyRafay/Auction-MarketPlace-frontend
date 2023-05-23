import { Navigate, Outlet } from "react-router-dom";
export const PrivateRoutes = () => {
  let auth = JSON.parse(localStorage.getItem("userData"));
  console.log(auth);
  return auth ? <Outlet /> : <Navigate to={"/logins"} />;
};
