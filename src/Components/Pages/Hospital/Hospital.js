import React, { useEffect, useState } from "react";
import { Header } from "../../utils/Header/Header";
import "./Hospital.css";
import { useAuth } from "../../../Context/Context";
import axios from "axios";

export const Hospital = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  useEffect(() => {
    axios
      .get("/backend/getprofilehosp", { uid: currentUser.uid })
      .then((res) => {
        console.log(res);
        setName(res.data.name);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Header />
      <div className="hospital">
        <h1>Welcome {name}</h1>
        <p>Hospital</p>
      </div>
    </>
  );
};
