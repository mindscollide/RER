import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
const CountryAdminRoutes = () => {
  let roleID = localStorage.getItem("roleID");
  const token = JSON.parse(localStorage.getItem("token"));
  return token && roleID === "2" ? <Outlet /> : <Navigate to="*" />;
};
export default CountryAdminRoutes;
