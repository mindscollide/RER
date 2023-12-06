import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Modal,
  Checkbox,
} from "../../../components/elements";
import { Radio } from "antd";
import "./AddEditEmployee.css";

const AddEditEmployee = ({ addEditModal, setAddEditModal }) => {
  const [homeVisit, setHomeVisit] = useState(null);

  const homeVisitRadioChange = (e) => {
    setHomeVisit(e.target.value);
  };

  const onCloseAddEditModal = () => {
    setAddEditModal(false);
  };

  const onCancelModalHandler = () => {
    setAddEditModal(false);
  };

  return (
    <>
      <Modal
        show={addEditModal}
        setShow={setAddEditModal}
        className="modaldialog add-edit-modal"
        modalHeaderClassName="d-none"
        modalFooterClassName="modal-bank-footer"
        // size="m"
        onHide={onCloseAddEditModal}
        ModalBody={
          <>
            <Row>
              <Col>
                <label className="add-edit-heading-modal">
                  Add/Edit Employee
                </label>
              </Col>
            </Row>
            <Row>
              <Col lg={2} md={2} sm={2} className="mt-3">
                <div className="checkbox-div">
                  <Checkbox
                    classNameDiv="chechbox-align-label"
                    label={<span className="checkbox-label">Active</span>}
                  />
                </div>
              </Col>
              <Col lg={10} md={10} sm={10}>
                <TextField
                  placeholder="add employee"
                  className="textfield-with-checkbox"
                />
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <TextField placeholder="Branch Employee" />
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12} className="mt-3">
                <Radio.Group onChange={homeVisitRadioChange} value={homeVisit}>
                  <Radio value="option1">Home Visit</Radio>
                </Radio.Group>
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
                className="add-edit-cancel-modal-btn-col"
              >
                <Button text="Add/Update" className="AddEdit-btn-Employee" />
                <Button
                  text="Cancel"
                  className="Cancel-btn-Employee"
                  onClick={onCancelModalHandler}
                />
              </Col>
            </Row>
          </>
        }
      />
    </>
  );
};

export default AddEditEmployee;