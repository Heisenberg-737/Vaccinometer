import React, { useState } from "react";
import "./Record_Block.css";

export const Record_Block = (props) => {
  const [addRecord, setAddRecord] = useState(false);
  const [recordDetails, setRecordDetails] = useState({
    vaccine_name: "",
    manufacturing_date: "",
    expiry_date: "",
    MRP: "",
    private_key: "",
  });
  const submitForm = (e) => {
    e.preventDefault();
    setAddRecord(false);
    props.submit(recordDetails);
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setRecordDetails((prevRecordDetails) => {
      return { ...prevRecordDetails, [name]: value };
    });
  };
  return (
    <div className="Record_Block">
      {props.type === "add" && !addRecord && (
        <div
          style={{
            fontSize: "2rem",
            fontWeight: "600",
            textAlign: "center",
            lineHeight: "50px",
            cursor: "pointer",
          }}
          onClick={() => setAddRecord(!addRecord)}
        >
          <span style={{ fontSize: "5rem" }}>+</span>
          <br />
          ADD RECORD
        </div>
      )}
      {props.type === "add" && addRecord && (
        <form onSubmit={submitForm}>
          <input
            placeholder="VACCINE NAME"
            name="vaccine_name"
            value={recordDetails.vaccine_name}
            onChange={onInputChange}
          />
          <input
            placeholder="MANUFACTURING DATE"
            name="manufacturing_date"
            type="date"
            value={recordDetails.manufacturing_date}
            onChange={onInputChange}
          />
          <input
            placeholder="EXPIRY DATE"
            name="expiry_date"
            type="date"
            value={recordDetails.expiry_date}
            onChange={onInputChange}
          />
          <input
            placeholder="MRP"
            name="MRP"
            value={recordDetails.MRP}
            onChange={onInputChange}
          />
          <input
            placeholder="PRIVATE KEY"
            name="private_key"
            value={recordDetails.private_key}
            onChange={onInputChange}
          />
          <input type="submit" name="Submit" />
        </form>
      )}
      {props.type === "show" && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flex: "1",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "80%",
            }}
          >
            <h4 style={{ margin: "auto auto auto 0px" }}>Vaccine Name</h4>
            <div style={{ margin: "auto auto auto 0px" }}>
              {props.detail.vaccine_name}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flex: "1",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "80%",
            }}
          >
            <h4 style={{ margin: "auto auto auto 0px" }}>Manufacturing Date</h4>
            <div style={{ margin: "auto auto auto 0px" }}>
              {props.detail.manufacturing_date}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flex: "1",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "80%",
            }}
          >
            <h4 style={{ margin: "auto auto auto 0px" }}>Expiry Date</h4>
            <div style={{ margin: "auto auto auto 0px" }}>
              {props.detail.expiry_date}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flex: "1",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "80%",
            }}
          >
            <h4 style={{ margin: "auto auto auto 0px" }}>MRP</h4>
            <div style={{ margin: "auto auto auto 0px" }}>
              {props.detail.MRP}
            </div>
          </div>
          {/* <div
            style={{
              display: "flex",
              flex: "1",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "80%",
            }}
          >
            <h4 style={{ margin: "auto auto auto 0px" }}>Private Key</h4>
            <div style={{ margin: "auto auto auto 0px" }}>
              {props.detail.private_key}
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};
