// Import necessary components from Ant Design
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  
  const handleOpenChange = (keys) => {
    // Ensure only one submenu is open at a time
    if (keys.length > 0) {
      setOpenKeys([keys[keys.length - 1]]);
    } else {
      setOpenKeys([]);
    }
  };

  const onClickBranchAdmin = () => {
    navigate("/");
  };

  const onClickCounterAdmin = () => {
    navigate("/CounterMain");
  };

  const onClickBranchService = () => {
    navigate("/BranchService");
  };

  const onClickCityAdmin = () => {
    navigate("/CityAdmin");
  };

  const onClickCityBranchServices = () => {
    navigate("/CityBranchService");
  };

  const onClickCityBranchShift = () => {
    navigate("/CityBranchShift");
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
          icon={<i className="icon-settings"></i>}
          title="Setups"
          className="menu-item"
        >
          <Menu.Item
            key="2"
            className="menu-item-sub"
            onClick={onClickBranchAdmin}
          >
            Branch Admin
          </Menu.Item>
          <Menu.Item
            key="3"
            className="menu-item-sub"
            onClick={onClickCounterAdmin}
          >
            Counter Admin{" "}
          </Menu.Item>
          <Menu.Item
            key="4"
            className="menu-item-sub"
            onClick={onClickBranchService}
          >
            Branch Service
          </Menu.Item>
          <Menu.Item
            key="5"
            className="menu-item-sub"
            onClick={onClickCityAdmin}
          >
            City Admin
          </Menu.Item>
          <Menu.Item
            key="6"
            className="menu-item-sub"
            onClick={onClickCityBranchServices}
          >
            City Wise Branch Services
          </Menu.Item>
          <Menu.Item
            key="7"
            className="menu-item-sub"
            onClick={onClickCityBranchShift}
          >
            City Branch Wise Shifts
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="sub2"
          icon={<i className="icon-report"></i>}
          title="Reports"
          className="menu-item-two"
        >
          <Menu.Item key="10" className="menu-item-sub">
            Country Wise Reports
          </Menu.Item>
          <Menu.Item key="11" className="menu-item-sub">
            City Wise Reports
          </Menu.Item>
          <Menu.Item key="12" className="menu-item-sub">
            Branch Wise Reports
          </Menu.Item>
          <Menu.Item key="13" className="menu-item-sub">
            Employee Wise Reports
          </Menu.Item>
          <Menu.Item key="14" className="menu-item-sub">
            Service Wise Reports
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
