import React, { useState } from "react";
import { Header } from "../../utils/Header/Header";
import "./Know_Your_Vaccine.css";
import { QRCodeScanner } from "../../utils/QRCodeScanner/QRCodeScanner";
import axios from "axios";

export const Know_Your_Vaccine = () => {
  const [product_id, setProduct_id] = useState("");
  const [qrData, setQRData] = useState("");
  const [data, setData] = useState([]);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const onChangeProductKey = (e) => {
    const { name, value } = e.target;
    setProduct_id(value);
  };
  const submitProduct_Id = (e) => {
    e.preventDefault();
    axios
      .post("/backend/public", { product_id: product_id })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  function getData(data) {
    console.log(data);
    setQRData(data);
    setProduct_id(data.text);
    // submitProduct_Id();
  }
  return (
    <>
      <Header />
      <div className="know_your_vaccine">
        <h1>Know Your Vaccine</h1>
        <div className="know_your_vaccine__content">
          <div className="know_your_vaccine__left">
            <h1>Enter Product ID</h1>
            <form onSubmit={submitProduct_Id}>
              <input
                name="product_id"
                value={product_id}
                placeholder="PRODUCT KEY"
                onChange={onChangeProductKey}
              />
            </form>
          </div>
          <div className="know_your_vaccine__line"></div>
          <div className="know_your_vaccine__right">
            <h1>Scan By QR Code</h1>
            {!showQRScanner && (
              <div
                className="showButton"
                onClick={() => setShowQRScanner(!showQRScanner)}
              >
                Show qr scanner
              </div>
            )}
            <div
              className="know_your_vaccine__right__QRscanner"
              style={{ display: !showQRScanner ? "none" : "" }}
            >
              {showQRScanner && <QRCodeScanner xd={getData} />}
            </div>
          </div>
        </div>
        <div
          className="know_your_vaccine__details"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          {data.map((data) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                  margin: "10px",
                  flexDirection: "column",
                  border: "1px solid #000000",
                  borderRadius: "20px",
                  width: "300px",
                }}
              >
                <div style={{ padding: "10px", margin: "5px" }}>
                  <strong>Name</strong> : {data.name}
                </div>
                <div style={{ padding: "10px", margin: "5px" }}>
                  <strong>Date</strong> : {data.date}
                </div>
                <div style={{ padding: "10px", margin: "5px" }}>
                  <strong>Role</strong> : {data.role}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
