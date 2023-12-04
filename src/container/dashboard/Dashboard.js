import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/layout/header/Header";
import Sidebar from "../../components/layout/sidebar/Sidebar";
import { Row, Col } from "react-bootstrap";
import { ConfigProvider, Layout } from "antd";
import ar_EG from "antd/es/locale/ar_EG";
import en_US from "antd/es/locale/en_US";
import "./Dashboard.css";

const Dashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  return (
    <>
      <ConfigProvider
        direction={currentLanguage === "ar" ? ar_EG : en_US}
        locale={currentLanguage === "ar" ? ar_EG : en_US}
      >
        <Layout>
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
