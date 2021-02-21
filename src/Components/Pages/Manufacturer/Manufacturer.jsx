import React, { useEffect, useState } from "react";
import { Header } from "../../utils/Header/Header";
import "./Manufacturer.css";
import { useAuth } from "../../../Context/Context";
import axios from "axios";

export const Manufacturer = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  console.log("currentUser.uid : ", currentUser.uid);
  axios
    .post("/backend/getprofilemanu", { uid: currentUser.uid })
    .then((res) => {
      console.log("RESPONSE IS : ", res);
      setName(res.data[0].name);
    })
    .catch((err) => console.log("GET PROFILE MANU : ", err));
  // useEffect(() => {
  //   axios
  //     .get("/backend/getprofilemanu", { uid: currentUser.uid })
  //     .then((res) => {
  //       console.log(res);
  //       setName(res.data.name);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  return (
    <>
      <Header />
      <div className="manufacturer">
        <h1>Welcome {name}</h1>
        <p>Manufacturer</p>
      </div>
    </>
  );
};
