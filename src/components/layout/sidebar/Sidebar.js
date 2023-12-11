// Import necessary components from Ant Design
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useTranslation } from "react-i18next";
import { generateMenuItems, getItem } from "../../../commen/functions/utils.js";
const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  let roleID = localStorage.getItem("roleID");
  const items = generateMenuItems(roleID, t);
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const [selectedKeys, setSelectedKeys] = useState(
    localStorage.getItem("selectedKeys") === null
      ? ["2"]
      : [localStorage.getItem("selectedKeys")]
  );

  const handleOpenChange = (keys) => {
    // Ensure only one submenu is open at a time
    if (keys.length > 0) {
      setOpenKeys([keys[keys.length - 1]]);
    } else {
      setOpenKeys([]);
    }
  };

  const onClick = (e) => {
    console.log("click ", e);
    setSelectedKeys([e.key]);
    localStorage.setItem("selectedKeys", e.key);
    if (e.key === "2") {
      navigate("Shift");
    } else if (e.key === "3") {
      navigate("CounterMain");
    } else if (e.key === "4") {
      navigate("BranchService");
    } else if (e.key === "5") {
      navigate("CityAdmin");
    } else if (e.key === "6") {
      navigate("CityBranchService");
    } else if (e.key === "7") {
      navigate("CityBranchShift");
    } else if (e.key === "8") {
      navigate("CityWiseCounter");
    } else if (e.key === "9") {
      navigate("EmployeeMain");
    } else if (e.key === "10") {
      navigate("CountryCityWise");
    } else if (e.key === "11") {
      navigate("CountryMain");
    } else if (e.key === "12") {
      navigate("CountryAdminMain");
    } else if (e.key === "13") {
      navigate("ServiceCountryScreen");
    } else if (e.key === "14") {
      navigate("CountryCityBranch");
    } else if (e.key === "15") {
      navigate("CountryCityWiseShift");
    } else if (e.key === "16") {
      navigate("CountryCityWiseCounter");
    } else if (e.key === "17") {
      navigate("CountryWiseEmployee");
    } else if (e.key === "18") {
      navigate("BranchRoaster");
    } else if (e.key === "19") {
      navigate("NationalHoliday");
    } else if (e.key === "20") {
      navigate("CountryWiseCity");
    } else if (e.key === "21") {
      navigate("GlobalService");
    } else if (e.key === "22") {
      navigate("CounteryMain");
    } else if (e.key === "23") {
      navigate("CityScreen");
    } else if (e.key === "24") {
      navigate("BranchScreen");
    } else if (e.key === "25") {
      navigate("EmployeeScreen");
    } else if (e.key === "26") {
      navigate("ShiftScreen");
    } else if (e.key === "27") {
      navigate("BranchServiceCounter");
    } else {
      // Handle other keys or add more conditions as needed
    }
  };
  return (
    <Sider width={250} className="site-layout-background">
      <Menu
        defaultSelectedKeys={["1"]}
        selectedKeys={selectedKeys}
        defaultOpenKeys={["sub1"]}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        onClick={onClick}
        mode="inline"
        theme="light"
        // inlineCollapsed={openKeys}
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
