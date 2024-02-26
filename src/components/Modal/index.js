import React, { useState } from "react";

import "./index.css";

const Modal = ({ closeModal, onSubmit, defaultValue,courierIDX }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      shipmentID: "",
      location: "",
      status: "Arrived",
      courierID: courierIDX,
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.shipmentID && formState.location && formState.status) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    onSubmit(formState);
    closeModal();
    
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="shipmentID">ShipmentID</label>
            <input name="shipmentID" onChange={handleChange} value={formState.shipmentID}  />
          </div>
          <div className="form-group">
            <label htmlFor="description">Location</label>
            <textarea
              name="location"
              onChange={handleChange}
              value={formState.location}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formState.status}
            >
              <option value="Dispatched">Dispatched</option>
              <option value="Arrived">Arrived</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};


export default Modal;