import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { TextField, Button, Modal } from "../../../components/elements";
import "./DeleteEmployeeModal.css";

const DeleteEmployeeModal = ({ deleteModal, setDeleteModal }) => {
  const onCloseModal = () => {
    setDeleteModal(false);
  };

  const onNoModalHandler = () => {
    setDeleteModal(false);
  };

  return (
    <>
      <Modal
        show={deleteModal}
        setShow={deleteModal}
        className="modaldialog delete-modal"
        modalHeaderClassName="d-none"
        modalFooterClassName="modal-bank-footer"
        onHide={onCloseModal}
        ModalBody={
          <>
            <Row>
              <Col>
                <label className="add-edit-heading-modal">Confirm</label>
              </Col>
            </Row>
            <Row className="my-2">
              <Col lg={12} md={12} sm={12}>
                <label className="confirm-delete-text">
                  Are you sure you want to delete the service globally
                </label>
              </Col>
            </Row>
          </>
        }
        ModalFooter={
          <>
            <Row>
              <Col lg={12} md={12} sm={12} className="Yes-No-modal-btn-col">
                <Button text="Yes" className="Yes-btn-Employee" />
                <Button
                  text="No"
                  className="No-btn-Employee"
                  onClick={onNoModalHandler}
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
