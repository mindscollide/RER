import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = () => {
  let currentUserID = localStorage.getItem("userID");
  let roleID = localStorage.getItem("roleID");

  //   const [currentUser, setCurrentUser] = useState(
  //     RoleID === "3" && (Blur === undefined || Blur === null) ? true : null
  //   );
  const token = JSON.parse(localStorage.getItem("token"));
  console.log("branch@gmail.com", token);
//   alert("branch@gmail.com", token);
  //   return currentUser && token ? <Outlet /> : <Navigate to="*" />;
  return token ? <Outlet /> : <Navigate to="*" />;
};
export default PrivateRoutes;
