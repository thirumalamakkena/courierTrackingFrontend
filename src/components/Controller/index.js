import { useState } from "react";

import "./index.css";
import Table from "../Table";
import Modal from "../Modal";
import CourierModal from "../CourierModal";
import CourierForm from "../CourierForm";
import Header from "../Header";
import Cookies from "js-cookie";

function Controller() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);

  const [rowToEdit, setRowToEdit] = useState(null);
  const [courierID, setCourierID] = useState("");
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [courierData, setCourierData] = useState({});
  const [courierFormModalOpen, setCourierFormModalOpen] = useState(false);

  const handleDeleteRow = async (targetIndex) => {
    setRows(rows.filter((row) => row.shipmentID !== targetIndex));
    await fetch("https://test-vnpf.onrender.com/deleteShipment/" + targetIndex, {
      method: "DELETE",
    });
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = async (newRow) => {
    if (rowToEdit === null) {
      setRows([...rows, newRow]);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRow),
      };
      await fetch("https://test-vnpf.onrender.com/addShipment", requestOptions);
    } else {
      setRows(
        rows.map((currRow) => {
          if (currRow.shipmentID !== rowToEdit) return currRow;
          return newRow;
        })
      );

      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRow),
      };
      await fetch("https://test-vnpf.onrender.com/updateShipment/", requestOptions);
    }
  };

  const onChangeCourier = (e) => {
    setCourierID(e.target.value);
  };

  const onSubmitCourier = async (e) => {
    e.preventDefault();
    const courierResponse = await fetch(
      "https://test-vnpf.onrender.com/getCourier/" + courierID
    );

    
    if (courierResponse.ok) {
      const cData = await courierResponse.json();
      setCourierData(cData);
      setInfoModalOpen(true);
      const res = await fetch(
        "https://test-vnpf.onrender.com/getTrackingData/" +courierID
      );
      
      if (res.ok) {
        const trackingData = await res.json();
        setRows(trackingData);
      }
      else {
        setRows([],alert("No tracking data available"));
        return;
      }
      
    } else {
      setRows([]);
      setCourierData([]);
      alert("Courier not found");
      return;
    }
  };

  const addCourierData = async (courierFormData) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courierFormData),
    };
    await fetch("https://test-vnpf.onrender.com/addCourier", requestOptions);

  };

  const jwtToken = Cookies.get("jwtToken");

  return (
    <>
      <Header />
      <div className="App">
        <form className="courier-container" onSubmit={onSubmitCourier}>
          <input
            type="text"
            placeholder="Enter Courier id"
            className="courier-box"
            onChange={onChangeCourier}
          />
          <button className="submit" type="submit">
            Submit
          </button>
        </form>
        {jwtToken !== undefined && (
          <button
            className="add-courier"
            onClick={() => setCourierFormModalOpen(true)}
          >
            Add Courier
          </button>
        )}
        {courierFormModalOpen && (
          <CourierForm
            getCourierFormData={addCourierData}
            closeCourierForm={() => setCourierFormModalOpen(false)}
          />
        )}
        {infoModalOpen && (
          <CourierModal
            close={() => setInfoModalOpen(false)}
            courierData={courierData}
          />
        )}

        <Table
          rows={rows}
          deleteRow={handleDeleteRow}
          editRow={handleEditRow}
        />
        {jwtToken !== undefined && Object.keys(courierData).length !== 0  && (
          <button onClick={() => setModalOpen(true)} className="btn">
            Add Shipment
          </button>
        )}
        {modalOpen && (
          <Modal
            closeModal={() => {
              setModalOpen(false);
              setRowToEdit(null);
            }}
            courierIDX={courierID}
            onSubmit={handleSubmit}
            defaultValue={
              rowToEdit !== null &&
              rows.find((row) => row.shipmentID === rowToEdit)
            }
          />
        )}
      </div>
    </>
  );
}

export default Controller;
