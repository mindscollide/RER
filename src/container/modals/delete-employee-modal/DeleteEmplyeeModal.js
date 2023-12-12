import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Button, Modal } from "../../../components/elements";
import "./DeleteEmployeeModal.css";
import { useTranslation } from "react-i18next";
import { deleteBranchCounterApi, deleteBranchShiftApi } from "../../../store/actions/Admin_action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const DeleteEmployeeModal = ({
  deleteModal,
  setDeleteModal,
  deleteID,
  route,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Loading = useSelector((state) => state.Loader.Loading);

  const onCloseModal = () => {
    setDeleteModal(false);
  };

  const yesHandler = async () => {
    if (route === "BranchAdminShift") {
      let data = {
        ShiftID: deleteID,
        BranchID: Number(localStorage.getItem("branchID")),
      };
      await dispatch(
        deleteBranchShiftApi(t, navigate, Loading, data, setDeleteModal)
      );
    }else if(route ==="BranchAdminCounterMain"){
      let data = {
        CounterID: deleteID,
        BranchID: Number(localStorage.getItem("branchID")),
      };
      await dispatch(
        deleteBranchCounterApi(t, navigate, Loading, data, setDeleteModal)
      );
    }
  };

  return (
    <>
      <Modal
        show={deleteModal}
        setShow={setDeleteModal}
        className="modaldialog delete-modal"
        modalHeaderClassName="d-none"
        modalFooterClassName="modal-bank-footer"
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
              <Col lg={12} md={12} sm={12} className="Yes-No-modal-btn-col">
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

export default DeleteEmployeeModal;
