// Import necessary components from Ant Design
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useTranslation } from "react-i18next";
const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const { t } = useTranslation();

  const handleOpenChange = (keys) => {
    // Ensure only one submenu is open at a time
    if (keys.length > 0) {
      setOpenKeys([keys[keys.length - 1]]);
    } else {
      setOpenKeys([]);
    }
  };

  const onClickBranchAdmin = () => {
    navigate("BranchAdmin");
  };

  const onClickCounterAdmin = () => {
    navigate("CounterMain");
  };

  const onClickBranchService = () => {
    navigate("BranchService");
  };

  const onClickCityAdmin = () => {
    navigate("CityAdmin");
  };

  const onClickCityBranchServices = () => {
    navigate("CityBranchService");
  };

  const onClickCityBranchShift = () => {
    navigate("CityBranchShift");
  };

  const onClickCityWiseCounter = () => {
    navigate("CityWiseCounter");
  };

  const onClickEmployeeMain = () => {
    navigate("EmployeeMain");
  };

  const onClickCountryCityWise = () => {
    navigate("CountryCityWise");
  };

  const onClickBranchServiceCounter = () => {
    navigate("BranchServiceCounter");
  };

  return (
    <Sider width={250} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        className="site-layout"
      >
        <Menu.SubMenu
          key="sub1"
          icon={<i className="icon-settings side-bar-icons"></i>}
          title={t("Setups")}
          className="menu-item"
        >
          <Menu.Item
            key="2"
            className="menu-item-sub"
            onClick={onClickBranchAdmin}
          >
            {t("Branch-admin")}
          </Menu.Item>
          <Menu.Item
            key="3"
            className="menu-item-sub"
            onClick={onClickCounterAdmin}
          >
            {t("Counter-admin")}{" "}
          </Menu.Item>
          <Menu.Item
            key="4"
            className="menu-item-sub"
            onClick={onClickBranchService}
          >
            {t("Branch-service")}
          </Menu.Item>
          <Menu.Item
            key="5"
            className="menu-item-sub"
            onClick={onClickCityAdmin}
          >
            {t("City-admin")}
          </Menu.Item>
          <Menu.Item
            key="6"
            className="menu-item-sub"
            onClick={onClickCityBranchServices}
          >
            {t("City-wise-branch-services")}
          </Menu.Item>
          <Menu.Item
            key="7"
            className="menu-item-sub"
            onClick={onClickCityBranchShift}
          >
            {t("City-branch-wise-shifts")}
          </Menu.Item>

          <Menu.Item
            key="8"
            className="menu-item-sub"
            onClick={onClickCityWiseCounter}
          >
            {t("City-branch-shifts-wise-counter")}
          </Menu.Item>

          <Menu.Item
            key="9"
            className="menu-item-sub"
            onClick={onClickEmployeeMain}
          >
            {t("Employee-main")}
          </Menu.Item>
          <Menu.Item
            key="10"
            className="menu-item-sub"
            onClick={onClickCountryCityWise}
          >
            {t("Country-city-wise-counter")}
          </Menu.Item>
          <Menu.Item
            key="11"
            className="menu-item-sub"
            onClick={onClickBranchServiceCounter}
          >
            {t("Branch-service-wise-counter")}
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="sub2"
          icon={<i className="icon-file side-bar-icons"></i>}
          title="Reports"
          className="menu-item-two"
        >
          <Menu.Item key="" className="menu-item-sub">
            {t("Country-wise-reports")}
          </Menu.Item>
          <Menu.Item key="" className="menu-item-sub">
            {t("City-wise-reports")}
          </Menu.Item>
          <Menu.Item key="" className="menu-item-sub">
            {t("Branch-wise-reports")}
          </Menu.Item>
          <Menu.Item key="" className="menu-item-sub">
            {t("Employee-wise-reports")}
          </Menu.Item>
          <Menu.Item key="" className="menu-item-sub">
            {t("Service-wise-reports")}
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
