import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
const GlobalAdminRoutes = () => {
  let roleID = localStorage.getItem("roleID");
  const token = JSON.parse(localStorage.getItem("token"));
  return token && roleID === "1" ? <Outlet /> : <Navigate to="*" />;
};
export default GlobalAdminRoutes;
