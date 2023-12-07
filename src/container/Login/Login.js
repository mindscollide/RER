import React, { Fragment, useEffect, useState } from "react";
import { Container, Col, Row, InputGroup, Form } from "react-bootstrap";
// import { Button, TextField, Loader } from "../../../components/elements";
// import { logIn } from "../../../store/actions/Auth-Actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Button } from "../../components/elements";
import { useTranslation } from "react-i18next";
import Header from "../../components/layout/header/Header";
import { setLogIn } from "../../store/actions/Auth_action";
const Login = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [open, setOpen] = useState({
    open: false,
    message: "",
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
    
      let data = {
        UserEmail: auditCredentials.UserName,
        UserPassword: auditCredentials.Password,
        DeviceID: "1",
        Device: "browser",
      };
      dispatch(setLogIn(t, navigate,data));
    } else {
      setOpen({
        ...open,
        open: true,
        message: "Please Fill All Credentials Fields",
      });
    }
  };

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
                      <span className="Heading-js">{t("Login")}</span>
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
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                          />
                        </InputGroup>
                      </div>
                    </Col>
                    <Col sm={12} md={12} lg={12} className="mb-3">
                      <div className="textfield-padding">
                        <InputGroup>
                          <InputGroup.Text
                            id="basic-addon1"
                            className="Icon-Field-class"
                          >
                            <i className="icon-lock"></i>
                          </InputGroup.Text>
                          <Form.Control
                            name="Password"
                            type="Password"
                            className="form-comtrol-textfield"
                            placeholder={t("password")}
                            onChange={setCredentialHandler}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                          />
                        </InputGroup>
                      </div>
                    </Col>
                    <Col
                      sm={12}
                      md={12}
                      lg={12}
                      className="signIn-Signup-btn-col mb-3"
                    >
                      <Button
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

      {/* {auth.Loading ? <Loader /> : null} */}
    </Fragment>
  );
};

export default Login;
