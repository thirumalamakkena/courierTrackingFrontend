import React from "react";
import Cookies from "js-cookie";

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import "./index.css";

const Table = ({ rows, deleteRow, editRow }) => {
  const jwtToken = Cookies.get("jwtToken");

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>ShipmentID</th>
            <th className="expand">Location</th>
            <th>Status</th>
            {jwtToken && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const statusText =
              row.status.charAt(0).toUpperCase() + row.status.slice(1);
            const idx = row.shipmentID;
            return (
              <tr key={idx}>
                <td>{row.shipmentID}</td>
                <td className="expand">{row.location}</td>
                <td>
                  <span className={`label label-${row.status.toLowerCase()}`}>
                    {statusText}
                  </span>
                </td>
                {jwtToken && (
                  <td className="fit">
                    <span className="actions">
                      <BsFillTrashFill
                        className="delete-btn"
                        onClick={() => deleteRow(idx)}
                      />
                      <BsFillPencilFill
                        className="edit-btn"
                        onClick={() => editRow(idx)}
                      />
                    </span>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
