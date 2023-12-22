// Import necessary components from Ant Design
import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useTranslation } from "react-i18next";
import { generateMenuItems, getItem } from "../../../commen/functions/utils.js";
import {
  setIsCityWiseBranchService,
  setIsCountryCityWiseCounter,
  setIsCountryServiceScreenComponent,
  setIsCountryWiseCityComponent,
  setIsServiceCountryScreenComponent,
} from "../../../store/actions/global_action";
import {
  getCityBranchServiceFail,
  getAllShiftsOfBranchFail,
} from "../../../store/actions/Admin_action";
import { useDispatch } from "react-redux";
const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let roleID = localStorage.getItem("roleID");
  const items = generateMenuItems(roleID, t);
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const [selectedKeys, setSelectedKeys] = useState(
    localStorage.getItem("selectedKeys") === null
      ? ["2"]
      : [localStorage.getItem("selectedKeys")]
  );
  let sideBar = localStorage.getItem("selectedKeys");
  // updating get city branch services data in table
  useEffect(() => {
    setSelectedKeys(localStorage.getItem("selectedKeys"));
  }, [sideBar]);

  const handleOpenChange = (keys) => {
    // Ensure only one submenu is open at a time
    if (keys.length > 0) {
      setOpenKeys([keys[keys.length - 1]]);
    } else {
      setOpenKeys([]);
    }
  };

  const onClick = (e) => {
    setSelectedKeys([e.key]);
    localStorage.setItem("selectedKeys", e.key);
    if (e.key === "2") {
      navigate("Shift");
    } else if (e.key === "3") {
      navigate("Counter");
    } else if (e.key === "4") {
      navigate("Services");
    } else if (e.key === "5") {
      dispatch(setIsCityWiseBranchService(false));
      dispatch(setIsCountryCityWiseCounter(false));
      navigate("Branch");
      dispatch(getCityBranchServiceFail(""));
      dispatch(getAllShiftsOfBranchFail(""));
    } else if (e.key === "6") {
      navigate("CityBranchService");
    } else if (e.key === "7") {
      navigate("Shifts");
    } else if (e.key === "8") {
      navigate("Counters");
    } else if (e.key === "9") {
      navigate("Employee");
    } else if (e.key === "10") {
      navigate("CountryCityWise");
    } else if (e.key === "11") {
      navigate("CountryMain");
    } else if (e.key === "12") {
      dispatch(setIsCountryWiseCityComponent(false));
      navigate("City");
    } else if (e.key === "13") {
      navigate("Services");
    } else if (e.key === "14") {
      navigate("Branch");
    } else if (e.key === "15") {
      navigate("Shifts");
    } else if (e.key === "16") {
      navigate("Counters");
    } else if (e.key === "17") {
      navigate("Employee");
    } else if (e.key === "18") {
      navigate("BranchRoaster");
    } else if (e.key === "19") {
      navigate("Holidays");
    } else if (e.key === "20") {
      navigate("Services");
    } else if (e.key === "21") {
      dispatch(setIsCountryServiceScreenComponent(false));
      navigate("Services");
    } else if (e.key === "22") {
      dispatch(setIsServiceCountryScreenComponent(false));
      navigate("Country");
    } else if (e.key === "23") {
      navigate("City");
    } else if (e.key === "24") {
      navigate("Branch");
    } else if (e.key === "25") {
      navigate("Employee");
    } else if (e.key === "26") {
      navigate("Shifts");
    } else if (e.key === "27") {
      navigate("Counters");
    } else if (e.key === "28") {
      navigate("AppoinmentReport");
    } else if (e.key === "29") {
      navigate("CountryWorking");
    } else if (e.key === "30") {
      navigate("AppointmentReportCity");
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
