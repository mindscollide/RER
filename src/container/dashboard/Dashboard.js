import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/layout/header/Header";
import Sidebar from "../../components/layout/sidebar/Sidebar";
import { Row, Col } from "react-bootstrap";
import { ConfigProvider, Layout } from "antd";
import ar_EG from "antd/es/locale/ar_EG";
import en_US from "antd/es/locale/en_US";
import "./Dashboard.css";

const Dashboard = () => {
  let i18nextLng = localStorage.getItem("i18nextLng");
  console.log("i18nextLng", i18nextLng);
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("i18nextLng") === null
      ? "en"
      : localStorage.getItem("i18nextLng")
  );

  useEffect(() => {
    setCurrentLanguage(i18nextLng);
  }, [i18nextLng]);
  return (
    <>
      <ConfigProvider
        direction={currentLanguage === "ar" ? ar_EG : en_US}
        locale={currentLanguage === "ar" ? ar_EG : en_US}
      >
        <Layout style={{ minHeight: "100vh" }}>
          <Header />

          <Layout hasSider>
            <Sidebar />
            <Layout className="dashboard-outlet">
              <Outlet />
            </Layout>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
};

export default Dashboard;
