import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
const BranchAdminRoutes = () => {
  let roleID = localStorage.getItem("roleID");
  const token = JSON.parse(localStorage.getItem("token"));
  return token && roleID === "4" ? <Outlet /> : <Navigate to="*" />;
};
export default BranchAdminRoutes;
