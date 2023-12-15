import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "../../../components/elements";
import "./CountryAdminModal.css";

const CountryAdminModal = ({ countryDeleteModal, setCountryDeleteModal }) => {
  const { t } = useTranslation();

  const onCloseModal = () => {
    setCountryDeleteModal(false);
  };

  // const onNoModalHandler = () => {
  //   setRoasterModal(false);
  // };

  return (
    <>
      <Modal
        show={countryDeleteModal}
        setShow={setCountryDeleteModal}
        className="modaldialog roaster-modal"
        modalHeaderClassName="d-none"
        modalFooterClassName="roaster-modal-footer"
        onHide={onCloseModal}
        ModalBody={
          <>
            <Row>
              <Col>
                <label className="add-edit-heading-modal">{t("Confirm")}</label>
              </Col>
            </Row>
            <Row className="my-2">
              <Col lg={12} md={12} sm={12}>
                <label className="confirm-delete-text">
                  {t("Are-you-sure-you-want-to-delete-the-service-globally")}
                </label>
              </Col>
            </Row>
          </>
        }
        ModalFooter={
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="Yes-No-Roaster-modal-btn-col"
              >
                <Button text={t("Yes")} className="Yes-btn-Employee" />
                <Button
                  text={t("No")}
                  className="No-btn-Employee"
                  onClick={onCloseModal}
                />
              </Col>
            </Row>
          </>
        }
      />
    </>
  );
};

export default CountryAdminModal;
