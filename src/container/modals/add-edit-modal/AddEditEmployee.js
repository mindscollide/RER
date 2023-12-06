import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Modal,
  Checkbox,
} from "../../../components/elements";
import { Radio } from "antd";
import Select from "react-select";
import "./AddEditEmployee.css";
import { useTranslation } from "react-i18next";

const AddEditEmployee = ({ addEditModal, setAddEditModal }) => {
  const { t } = useTranslation();
  const [homeVisit, setHomeVisit] = useState(null);
  const [branchEmployee, setBranchEmployee] = useState(null);
  const [isCheckbox, setIsCheckbox] = useState(false);

  const homeVisitRadioChange = (e) => {
    setHomeVisit(e.target.value);
  };

  const branchEmployeeRadioChange = (e) => {
    setBranchEmployee(e.target.value);
  };

  const onCloseAddEditModal = () => {
    setAddEditModal(false);
  };

  const onCancelModalHandler = () => {
    setAddEditModal(false);
  };

  const handleCheckboxChange = (e) => {
    setIsCheckbox(e.target.checked);
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
                  {t("Add-edit-employee")}
                </label>
              </Col>
            </Row>
            <Row>
              <Col lg={2} md={2} sm={2} className="mt-3">
                <div className="checkbox-div">
                  <Checkbox
                    onChange={handleCheckboxChange}
                    checked={isCheckbox}
                    classNameDiv="chechbox-align-label"
                    label={
                      <span className="checkbox-label-Active-Employee-Modal">
                        {t("Active")}
                      </span>
                    }
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
            <Row className="mt-2">
              <Col lg={4} md={4} sm={4}>
                <div className="Radio-Btn-div-For-Select">
                  <Radio.Group
                    onChange={branchEmployeeRadioChange}
                    value={branchEmployee}
                  >
                    <Radio value="option1">{t("Branch-employee")}</Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col lg={8} md={8} sm={8} className="mt-1">
                <Select placeholder="Branch Employee" />
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12} className="mt-3">
                <Radio.Group onChange={homeVisitRadioChange} value={homeVisit}>
                  <Radio value="option1">{t("Home-visit")}</Radio>
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
                <Button
                  text={t("Add-update")}
                  className="AddEdit-btn-Employee"
                />
                <Button
                  text={t("Cancel")}
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
