import React, { useState } from "react";
import "./index.css";

const CourierForm = ({ closeCourierForm, getCourierFormData }) => {
  const [courierFormDataState, setCourierFormDataState] = useState({
    courierID: "",
    courierName: "",
    fromAddress: "",
    toAddress: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courierID || !courierName || !fromAddress || !toAddress) {
      alert("Please fill all the details");
      return;
    }
    getCourierFormData(courierFormDataState);

    closeCourierForm();
  };

  const onChangeCourier = (e) => {
    setCourierFormDataState({
      ...courierFormDataState,
      [e.target.name]: e.target.value,
    });
  };

  const { courierID, courierName, fromAddress, toAddress } =
    courierFormDataState;

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeCourierForm();
      }}
    >
      <div className="modal">
        <form onSubmit={handleSubmit} className="form-container">
          <label htmlFor="courierID" className="form-label">
            Courier ID:
          </label>
          <input
            type="text"
            id="courierId"
            className="form-input"
            value={courierID}
            name="courierID"
            onChange={onChangeCourier}
          />
          <br />
          <label className="form-label" htmlFor="courierName">
            Courier Name:
          </label>
          <input
            type="text"
            id="courierName"
            className="form-input"
            value={courierName}
            name="courierName"
            onChange={onChangeCourier}
          />
          <br />

          <label className="form-label" htmlFor="fromAddress">
            From Address:
          </label>
          <input
            type="text"
            id="fromAddress"
            name="fromAddress"
            value={fromAddress}
            className="form-input"
            onChange={onChangeCourier}
          />
          <br />
          <label className="form-label" htmlFor="toAddress">
            To Address:
          </label>
          <input
            type="text"
            id="toAddress"
            name="toAddress"
            className="form-input"
            value={toAddress}
            onChange={onChangeCourier}
          />
          <br />
          <button type="submit" className="form-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourierForm;
