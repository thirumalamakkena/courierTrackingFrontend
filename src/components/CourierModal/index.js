import React from "react";

const CourierModal = ({ close, courierData }) => {
 
  const {
    courierID,
    courierName,
    fromAddress,
    toAddress,
    timestamp,
    isDelivered,
  } = courierData;
 

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") close();
      }}
    >
      <div className="modal">
        <h2>Courier Details</h2>
        <p>Courier ID: {courierID}</p>
        <p>Courier Name: {courierName}</p>
        <p>From Address: {fromAddress}</p>
        <p>To Address: {toAddress}</p>
        <p>Timestamp: {timestamp}</p>
        <p>Is Delivered: {isDelivered}</p>
      </div>
    </div>
  );
};

export default CourierModal;
