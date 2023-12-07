import React, { Fragment } from "react";
import REMLogo from "../../../assets/images/REM-Logo.svg";
import { Row, Col } from "react-bootstrap";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <Fragment>
      <Row>
        <Col sm={12} md={12} lg={12} className={styles["overlay"]}>
          <Col sm={12} md={12} lg={12} className={styles["overlay-content"]}>
            <img src={REMLogo} width={200} alt="" />
            <span className={styles["loader-line"]}></span>
          </Col>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Loader;
