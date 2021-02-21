import React, { useState, useEffect } from "react";
import { Header } from "../../utils/Header/Header";
import "./History.css";
import axios from "axios";
import { useAuth } from "../../../Context/Context";

export const History = () => {
  const [details, setDetails] = useState([
    {
      name: "Covivax",
      date: "21/02/2021",
      expiry: "28/02/2021",
      mrp: "5999",
      product_id: "",
    },
    // {
    //   name: "Manjot",
    //   date: "19012001",
    //   expiry: "19012020",
    //   mrp: "20000",
    //   product_id: "1234567890",
    // },
    // {
    //   name: "Manjot",
    //   date: "19012001",
    //   expiry: "19012020",
    //   mrp: "20000",
    //   product_id: "1234567890",
    // },
    // {
    //   name: "Manjot",
    //   date: "19012001",
    //   expiry: "19012020",
    //   mrp: "20000",
    //   product_id: "1234567890",
    // },
  ]);
  const { currentUser } = useAuth();
  // axios
  //   .post("/backend/history", { uid: currentUser.uid })
  //   .then((res) => {
  //     console.log("BACKEND/HISTORY RESPONSE IS :", res);
  //     setDetails(res.data);
  //   })
  //   .catch((err) => console.log(err));
  useEffect(() => {
    axios
      .get("/backend/history", { uid: currentUser.uid })
      .then((res) => {
        console.log("BACKEND/HISTORY RESPONSE IS :", res);
        setDetails(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Header />
      <div className="history">
        <h1>My History</h1>
        {window.location.pathname.includes("manufacturer") && (
          <div className="history__manufacturer">
            <div>
              <h3>S No.</h3>
              {details.map((detail, index) => {
                return <p style={{ textAlign: "center" }}>{index + 1}</p>;
              })}
            </div>
            <div>
              <h3>Vaccine Name</h3>
              {details.map((detail, index) => {
                return <p style={{ textAlign: "center" }}>{detail.name}</p>;
              })}
            </div>
            <div>
              <h3>Manufacturing Date</h3>
              {details.map((detail, index) => {
                return <p style={{ textAlign: "center" }}>{detail.date}</p>;
              })}
            </div>
            <div>
              <h3>Expiry Date</h3>
              {details.map((detail, index) => {
                return <p style={{ textAlign: "center" }}>{detail.expiry}</p>;
              })}
            </div>
            <div>
              <h3>MRP</h3>
              {details.map((detail, index) => {
                return <p style={{ textAlign: "center" }}>{detail.mrp}</p>;
              })}
            </div>
            {/* <div>
              <h3>Product ID</h3>
              {details.map((detail, index) => {
                return (
                  <p style={{ textAlign: "center" }}>{detail.product_id}</p>
                );
              })}
            </div> */}
          </div>
        )}
        {window.location.pathname.includes("hospital") && (
          <div className="history__manufacturer">
            {/* <div>
              <h3>S No.</h3>
              {details.map((detail, index) => {
                return <p style={{ textAlign: "center" }}>{index + 1}</p>;
              })}
            </div>
            <div>
              <h3>Vaccine Name</h3>
              {details.map((detail, index) => {
                return <p style={{ textAlign: "center" }}>{detail.name}</p>;
              })}
            </div>
            <div>
              <h3>Manufacturing Date</h3>
              {details.map((detail, index) => {
                return <p style={{ textAlign: "center" }}>{detail.date}</p>;
              })}
            </div>
            <div>
              <h3>Expiry Date</h3>
              {details.map((detail, index) => {
                return <p style={{ textAlign: "center" }}>{detail.expiry}</p>;
              })}
            </div>
            <div>
              <h3>MRP</h3>
              {details.map((detail, index) => {
                return <p style={{ textAlign: "center" }}>{detail.mrp}</p>;
              })}
            </div> */}
            <div>
              <h3>S No.</h3>
              {details.map((detail, index) => {
                return <p style={{ textAlign: "center" }}>{index + 1}</p>;
              })}
            </div>
            <div>
              <h3>Vaccine Name</h3>
              {details.map((detail, index) => {
                return <p style={{ textAlign: "center" }}>{detail.name}</p>;
              })}
            </div>
            <div>
              <h3>Manufacturing Date</h3>
              {details.map((detail, index) => {
                return <p style={{ textAlign: "center" }}>{detail.date}</p>;
              })}
            </div>
            <div>
              <h3>Expiry Date</h3>
              {details.map((detail, index) => {
                return <p style={{ textAlign: "center" }}>{detail.expiry}</p>;
              })}
            </div>
            <div>
              <h3>MRP</h3>
              {details.map((detail, index) => {
                return <p style={{ textAlign: "center" }}>{detail.mrp}</p>;
              })}
            </div>
            {/* <div>
              <h3>Product ID</h3>
              {details.map((detail, index) => {
                return (
                  <p style={{ textAlign: "center" }}>{detail.product_id}</p>
                );
              })}
            </div> */}
          </div>
        )}
      </div>
    </>
  );
};
