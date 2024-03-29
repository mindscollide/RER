import React, { Fragment, useEffect, useRef, useState } from "react";
import { Container, Col, Row, InputGroup, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Button, Notification } from "../../components/elements";
import { useTranslation } from "react-i18next";
import Header from "../../components/layout/header/Header";
import { setLogIn } from "../../store/actions/Auth_action";
import { emailOnlyRegex, validateEmail } from "../../commen/functions/regex";
const Login = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const passwordInputRef = useRef(null);
  const loginButtonRef = useRef(null);

  const [errorBar, setErrorBar] = useState("");

  const [openNotification, setOpenNotification] = useState({
    loginFlag: false,
    loginNotification: null,
    severity: "none",
  });

  const [auditCredentials, setAuditCredentials] = useState({
    UserName: "",
    Password: "",
    // fakePassword: "",
  });

  // credentials for email and password
  const setCredentialHandler = (e) => {
    if (e.target.name === "Password") {
      let numChars = e.target.value;
      // let showText = "";
      // for (let i = 0; i < numChars.length; i++) {
      //   showText += "•";
      // }
      setAuditCredentials({
        ...auditCredentials,
        [e.target.name]: e.target.value,
        // ["fakePassword"]: showText,
      });
    } else {
      setAuditCredentials({
        ...auditCredentials,
        [e.target.name]: e.target.value,
      });
    }
  };

  // handler for submit login
  const loginValidateHandler = (e) => {
    e.preventDefault();
    if (auditCredentials.UserName !== "" && auditCredentials.Password !== "") {
      const isEmailValidValue = validateEmail(auditCredentials.UserName);

      if (isEmailValidValue) {
        setErrorBar(false);
        const data = {
          UserEmail: auditCredentials.UserName,
          UserPassword: auditCredentials.Password,
          DeviceID: "1",
          Device: "browser",
        };
        dispatch(setLogIn(t, navigate, data, i18n));
      } else {
        setErrorBar(true);
        setOpenNotification({
          ...openNotification,
          loginFlag: true,
          loginNotification: t("Email-format-is-incorrect"),
          severity: "error",
        });

        // Close the notification after 3 seconds
        setTimeout(() => {
          setOpenNotification({
            ...openNotification,
            loginFlag: false,
          });
        }, 3000);
      }
    } else {
      setErrorBar(true);
      setOpenNotification({
        ...openNotification,
        loginFlag: true,
        loginNotification: t("Please-fill-all-fields"),
        severity: "error",
      });

      // Close the notification after 3 seconds
      setTimeout(() => {
        setOpenNotification({
          ...openNotification,
          loginFlag: false,
        });
      }, 3000);
    }
  };

  const handleEnterKey = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextRef && nextRef.current) {
        nextRef.current.focus();
      }
    }
  };

  useEffect(() => {
    // Focus on the login button when the component mounts
    if (loginButtonRef.current) {
      loginButtonRef.current.tabIndex = 0;
    }
  }, []);

  // navigate to forgot page
  const navigateToForgot = () => {
    navigate("/Forgot");
  };

  return (
    <Fragment>
      <Col sm={12} lg={12} md={12} className="sign-in">
        <Header />

        <Container>
          <Row>
            <Col sm={12} md={12} lg={12} className="login-container">
              <Row>
                <Col sm={5} md={5} lg={5} className="center-div flex-column">
                  <Row>
                    <Col lg={12} md={12} sm={12} className="mb-3">
                      <img
                        src={process.env.PUBLIC_URL + "/REM-Logo.svg"}
                        width="150"
                        alt="REM Logo"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} md={12} lg={12} className="mt-1">
                      <span className="Heading-Rer">{t("Login")}</span>
                    </Col>
                    <Col sm={12} md={12} lg={12} className="mt-3">
                      <div className="textfield-padding">
                        <InputGroup className="mb-3">
                          <InputGroup.Text
                            id="basic-addon1"
                            className="Icon-Field-class"
                          >
                            <i className="icon-user"></i>
                          </InputGroup.Text>
                          <Form.Control
                            name="UserName"
                            className="form-comtrol-textfield"
                            placeholder={t("Email-id")}
                            value={auditCredentials.UserName}
                            onChange={setCredentialHandler}
                            onKeyDown={(e) =>
                              handleEnterKey(e, passwordInputRef)
                            } // added onKeyDown event
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                          />
                        </InputGroup>
                        <Row>
                          <Col className="d-flex justify-content-start">
                            <p
                              className={
                                errorBar && auditCredentials.UserName === ""
                                  ? "errorMessageLogin"
                                  : "errorMessageLogin_hidden"
                              }
                            >
                              {t("Email-is-required")}
                            </p>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col sm={12} md={12} lg={12} className="mb-1">
                      <div className="textfield-padding">
                        <InputGroup>
                          <InputGroup.Text
                            id="basic-addon1"
                            className="Icon-Field-class"
                          >
                            <i className="icon-lock"></i>
                          </InputGroup.Text>
                          <Form.Control
                            ref={passwordInputRef}
                            name="Password"
                            type="Password"
                            className="form-comtrol-textfield"
                            placeholder={t("password")}
                            value={auditCredentials.Password}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                loginValidateHandler(e);
                              }
                            }}
                            onChange={setCredentialHandler}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                          />
                        </InputGroup>
                        <Row>
                          <Col className="d-flex justify-content-start">
                            <p
                              className={
                                errorBar && auditCredentials.Password === ""
                                  ? "errorPasswordSignInMessage"
                                  : "errorPasswordSignInMessage_hidden"
                              }
                            >
                              {t("Password-is-required")}
                            </p>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col
                      sm={12}
                      md={12}
                      lg={12}
                      className="signIn-Signup-btn-col mb-2"
                    >
                      <Button
                        ref={loginButtonRef}
                        text={t("Login")}
                        className="login-btn"
                        onClick={loginValidateHandler}
                      />
                    </Col>

                    <Col
                      sm={12}
                      md={12}
                      lg={12}
                      className="d-flex justify-content-center"
                    >
                      <label
                        className="forget-lablel-text"
                        onClick={navigateToForgot}
                      >
                        {t("Forgot-password")}
                      </label>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Col>
      <Notification
        show={openNotification.loginFlag}
        hide={setOpenNotification}
        message={openNotification.loginNotification}
        severity={openNotification.severity}
        notificationClass={
          openNotification.severity
            ? "notification-error"
            : "notification-email"
        }
      />
      {/* {auth.Loading ? <Loader /> : null} */}
    </Fragment>
  );
};

export default Login;
