import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Button, Modal } from "../../../components/elements";
import { deleteGlobalServiceMainApi } from "../../../store/actions/Admin_action";
import "./GlobalDeleteModal.css";

const GlobalDeleteModal = ({
  globalID,
  globalModal,
  setGlobalModal,
  route,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingFlag = useSelector((state) => state.Loader.Loading);

  const onCloseModal = () => {
    setGlobalModal(false);
  };

  const yesHandler = async () => {
    if (route === "GlobalService") {
      let data = {
        ServiceID: globalID,
      };
      await dispatch(
        deleteGlobalServiceMainApi(
          t,
          navigate,
          loadingFlag,
          data,
          setGlobalModal
        )
      );
    }
  };

  return (
    <>
      <Modal
        show={globalModal}
        setShow={setGlobalModal}
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
                <Button
                  text={t("Yes")}
                  className="Yes-btn-Employee"
                  onClick={yesHandler}
                />
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

export default GlobalDeleteModal;
