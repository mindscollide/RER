// Import necessary components from Ant Design
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useTranslation } from "react-i18next";
import { getItem } from "../../../commen/functions/utils.js";
const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const [selectedKeys, setSelectedKeys] = useState(
    localStorage.getItem("selectedKeys") === null
      ? ["2"]
      : [localStorage.getItem("selectedKeys")]
  );
  const items = [
    getItem(
      t("Setups"),
      "sub1",
      <i className="icon-settings side-bar-icons"></i>,
      [
        getItem(t("Shift"), "2"),
        getItem(t("Counter-admin"), "3"),
        getItem(t("Branch-service"), "4"),
        getItem(t("City-admin"), "5"),
        getItem(t("City-wise-branch-services"), "6"),
        getItem(t("City-branch-wise-shifts"), "7"),
        getItem(t("City-branch-shifts-wise-counter"), "8"),
        getItem(t("Employee-main"), "9"),
        getItem(t("Country-city-wise-counter"), "10"),
      ],
      "menu-item-sub"
    ),
    getItem(
      t("Reports"),
      "sub2",
      <i className="icon-file side-bar-icons"></i>,
      [
        getItem(t("Country-wise-reports"), "11"),
        getItem(t("City-wise-reports"), "12"),
        getItem(t("Branch-wise-reports"), "13"),
        getItem(t("Employee-wise-reports"), "14"),
        getItem(t("Service-wise-reports"), "15"),
      ],
      "menu-item-sub"
    ),
  ];
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
      // navigate("CityBranchService");
    } else if (e.key === "12") {
      // navigate("CityBranchShift");
    } else if (e.key === "13") {
      // navigate("CityWiseCounter");
    } else if (e.key === "14") {
      // navigate("EmployeeMain");
    } else if (e.key === "15") {
      // navigate("CountryCityWise");
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
