import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./BranchService.css";
import {
  Paper,
  TextField,
  Button,
  Table,
  Notification,
} from "../../../components/elements";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";
import {
  clearResponseMessageAdmin,
  getBranchServicesApi,
  //Commented Because Using Update All
  // updateBranchServicesApi,
  updateAllBranchServicesApi,
} from "../../../store/actions/Admin_action";

const BranchService = () => {
  const { t } = useTranslation();

  const currentLanguage = localStorage.getItem("i18nextLng");

  // const { adminReducer } = useSelector((state) => state);

  const Loading = useSelector((state) => state.Loader.Loading);

  const branchServicesData = useSelector(
    (state) => state.admin.branchServicesData
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [branchServices, setBranchServices] = useState([]);

  const [notification, setNotification] = useState({
    notificationFlag: false,
    notificationMessage: null,
  });

  const [initialBranchServicesData, setInitialBranchServicesData] = useState(
    []
  );

  useEffect(() => {
    dispatch(getBranchServicesApi(t, navigate, Loading));
  }, []);

  useEffect(() => {
    if (branchServicesData !== undefined && branchServicesData !== null) {
      setBranchServices(branchServicesData);
      setInitialBranchServicesData(branchServicesData);
    }
  }, [branchServicesData]);

  const handleSwitchChange = (checked, rowIndex) => {
    setBranchServices((prevServices) => {
      return prevServices.map((service, index) => {
        if (index === rowIndex) {
          return {
            ...service,
            isServiceAvailableAtBranch: checked,
          };
        }
        return service;
      });
    });
  };

  const handleTextFieldChangeService = (value, rowIndex, min, max) => {
    // Validate the input range
    const numericValue = Number(value);
    if (numericValue >= min && numericValue <= max) {
      setBranchServices((prevServices) => {
        return prevServices.map((service, index) => {
          if (index === rowIndex) {
            return {
              ...service,
              serviceSlotDurationMinutes: numericValue,
            };
          }
          return service;
        });
      });
      // Handle invalid input (e.g., show an error message)
      console.error("Invalid input. Please enter a value between 10 and 100.");
    }
  };

  const handleTextFieldChangeRoaster = (value, rowIndex, min, max) => {
    // Validate the input range
    const numericValue = Number(value);
    if (numericValue >= min && numericValue <= max) {
      setBranchServices((prevServices) => {
        return prevServices.map((service, index) => {
          if (index === rowIndex) {
            return {
              ...service,
              maximumAdvanceRoasterDays: numericValue,
            };
          }
          return service;
        });
      });
      // Handle invalid input (e.g., show an error message)
      console.error("Invalid input. Please enter a value between 10 and 100.");
    }
  };

  const handleTextFieldChangeMargin = (value, rowIndex, min, max) => {
    // Validate the input range
    const numericValue = Number(value);
    if (numericValue >= min && numericValue <= max) {
      setBranchServices((prevServices) => {
        return prevServices.map((service, index) => {
          if (index === rowIndex) {
            return {
              ...service,
              prebookingDaysMarginForBranch: numericValue,
            };
          }
          return service;
        });
      });
      // Handle invalid input (e.g., show an error message)
      console.error("Invalid input. Please enter a value between 10 and 100.");
    }
  };

  const columns = [
    {
      title: <span className="table-text">{t("Service")}</span>,
      dataIndex: "branchService",
      key: "branchService",
      width: "400px",
      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.branchService.serviceNameEnglish
            : record.branchService.serviceNameArabic}
        </span>
      ),
    },

    {
      title: <span className="table-text">{t("Branch-availability")}</span>,
      dataIndex: "isServiceAvailableAtBranch",
      key: "isServiceAvailableAtBranch",
      width: "200px",
      align: "center",
      render: (text, record, rowIndex) => (
        <Switch
          checked={text}
          onChange={(checked) => handleSwitchChange(checked, rowIndex)}
        />
      ),
    },
    {
      title: <span className="table-text">{t("Service-slot-minutes")}</span>,
      dataIndex: "serviceSlotDurationMinutes",
      key: "serviceSlotDurationMinutes",
      width: "200px",
      align: "center",
      render: (text, record, rowIndex) => (
        <>
          <span className="For-table-textfield">
            <TextField
              labelClass="d-none"
              className="for-inside-table-textfiel"
              value={text}
              onChange={(e) => {
                const inputValue = e.target.value;
                const numericInput = inputValue.replace(/[^0-9]/g, "");
                handleTextFieldChangeService(numericInput, rowIndex, 10, 100);
              }}
              type="number"
              min={10}
              max={100}
            />
          </span>
        </>
      ),
    },
    {
      title: <span className="table-text">{t("Advance-roaster-days")}</span>,
      dataIndex: "maximumAdvanceRoasterDays",
      key: "maximumAdvanceRoasterDays",
      width: "200px",
      align: "center",
      render: (text, record, rowIndex) => (
        <>
          <span className="For-table-textfield">
            <TextField
              labelClass="d-none"
              className="for-inside-table-textfiel"
              value={text}
              onChange={(e) => {
                const inputValue = e.target.value;
                const numericInput = inputValue.replace(/[^0-9]/g, "");
                handleTextFieldChangeRoaster(numericInput, rowIndex, 0, 30);
              }}
              type="number"
              min={0}
              max={30}
            />
          </span>
        </>
      ),
    },
    {
      title: <span className="table-text">{t("Prebooking-margin-days")}</span>,
      dataIndex: "prebookingDaysMarginForBranch",
      key: "prebookingDaysMarginForBranch",
      width: "200px",
      align: "center",
      render: (text, record, rowIndex) => (
        <>
          <span className="For-table-textfield">
            <TextField
              labelClass="d-none"
              className="for-inside-table-textfiel"
              value={text}
              onChange={(e) => {
                const inputValue = e.target.value;
                const numericInput = inputValue.replace(/[^0-9]/g, "");
                handleTextFieldChangeMargin(numericInput, rowIndex, 10, 100);
              }}
              type="number"
              min={0}
              max={30}
            />
          </span>
        </>
      ),
    },
  ];

  const revertButton = () => {
    console.log("Initial Data:", initialBranchServicesData);
    setBranchServices(initialBranchServicesData);
    console.log("Updated Data:", branchServices);
  };

  const saveBranchServices = async (data) => {
    try {
      //Commenting Because Using Get All
      // const apiPromises = data.map(async (row) => {
      //   const requestData = {
      //     BranchID: Number(localStorage.getItem("branchID")),
      //     BranchServiceID: row.branchService.serviceID,
      //     IsServiceAvailableAtBranch: row.isServiceAvailableAtBranch,
      //     ServiceSlotDurationMinutes: row.serviceSlotDurationMinutes,
      //   };
      //   return dispatch(
      //     updateBranchServicesApi(requestData, t, navigate, Loading)
      //   );
      // });
      // await Promise.all(apiPromises);

      //Update All Functionality
      const requestData = {
        BranchID: 1,
        ListOfBranchServices: data.map((branchService) => {
          return {
            BranchServiceID: branchService.branchServiceID,
            IsServiceAvailableAtBranch:
              branchService.isServiceAvailableAtBranch,
            ServiceSlotDurationMinutes:
              branchService.serviceSlotDurationMinutes,
            MaximumAdvanceRoasterDays: branchService.maximumAdvanceRoasterDays,
            PrebookingDaysMarginForBranch:
              branchService.prebookingDaysMarginForBranch,
          };
        }),
      };
      console.log("Update Branch Services Data", requestData);
      dispatch(updateAllBranchServicesApi(t, navigate, Loading, requestData));
      // dispatch(getBranchServicesApi(t, navigate, Loading));
    } catch (error) {
      console.error("Error in API calls", error);
    }
  };

  useEffect(() => {
    setTimeout(
      setNotification({
        ...notification,
        notificationFlag: true,
        notificationMessage: "Record Saved",
      }),
      3000
    );
    dispatch(clearResponseMessageAdmin(null));
  }, []);

  return (
    <>
      <section className="SectionBranchService-Admin">
        <Row>
          <Col lg={6} md={6} sm={6} className="d-flex justify-content-start">
            <span className="shift-heading">
              {t("Branch")}
              <span className="shift-sub-heading">
                {" "}
                {currentLanguage === "en"
                  ? "(" +
                    localStorage.getItem("countryName") +
                    " " +
                    "-" +
                    " " +
                    localStorage.getItem("cityName") +
                    ")"
                  : "(" +
                    localStorage.getItem("countryNameArabic") +
                    " - " +
                    localStorage.getItem("cityNameArabic") +
                    ")"}
              </span>
            </span>
          </Col>
          <Col lg={6} md={6} sm={6} className="d-flex justify-content-end">
            <span className="shift-sub-heading-right">
              {currentLanguage === "en"
                ? localStorage.getItem("branchName")
                : localStorage.getItem("branchNameArabic")}
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="BranchService-Admin-paper">
              <Row>
                <Col lg={12} md={12} sm={12} className="btn-col-class">
                  <Button
                    icon={<i className="icon-save icon-space"></i>}
                    text={t("Save")}
                    className="save-btn-BranchService"
                    onClick={() => saveBranchServices(branchServices)}
                  />
                  <Button
                    icon={<i className="icon-repeat icon-space"></i>}
                    text={t("Revert")}
                    className="revert-btn-BranchService"
                    onClick={revertButton}
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  <Table
                    rows={branchServices}
                    column={columns}
                    pagination={false}
                  />
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
      </section>
      {/* <Notification
        show={notification.notificationFlag}
        hide={setNotification}
        message={notification.notificationMessage}
      /> */}
    </>
  );
};

export default BranchService;
