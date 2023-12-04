import React, { Fragment } from "react";
// import JSLOGO from "../../../assets/images/Js-Logo-2.png";
import { Container, Col, Row } from "react-bootstrap";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <Fragment>
      <Col sm={12} md={12} lg={12} className={styles["overlay"]}>
        <Col sm={12} md={12} lg={12} className={styles["overlay-content"]}>
          {/* <img src={JSLOGO} width={200} /> */}
          <span className={styles["loader-line"]}></span>
        </Col>
      </Col>
    </Fragment>
  );
};

export default Loader;
