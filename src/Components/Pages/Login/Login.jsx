import React, { useState, useEffect } from "react";
import { useAuth } from "../../../Context/Context";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { Header } from "../../utils/Header/Header";

export const Login = () => {
  const history = useHistory();
  const { login } = useAuth();
  const [isManufacturer, setIsManufacturer] = useState(true);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevUserDetails) => {
      return { ...prevUserDetails, [name]: value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = {};
    try {
      user = await login(userDetails.email, userDetails.password);
      console.log(user);
      user && history.push(`/${isManufacturer ? "manufacturer" : "hospital"}`);
      // axios
      //   .post(`/login/${isManufacturer ? "manufacturer" : "hospital"}`, {
      //     email: userDetails.email,
      //   })
      //   .then((res) => {
      //     console.log(res);
      //     setUserDetails({
      //       email: "",
      //       password: "",
      //     });
      //     history.push(`/${isManufacturer ? "manufacturer" : "hospital"}`);
      //   })
      //   .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Header />
      <div className="login">
        <div className="login__left">
          <h1>New here!</h1>
          <p>Register yourself here to get access to our technology</p>
          <button>
            <Link to="/signup" style={{ color: "#fff" }}>
              SIGN UP
            </Link>
          </button>
        </div>
        <div className="login__right">
          <h1>Welcome Back</h1>
          <p>use your email for login</p>
          <div className="login__user__company">
            <div
              className="login__user"
              style={{
                background: isManufacturer ? "#0cb097" : "#ffffff",
                color: isManufacturer ? "#ffffff" : "#0cb097",
                cursor: "pointer",
              }}
              onClick={() => setIsManufacturer(true)}
            >
              Manufacturer
            </div>
            <div
              className="login__company"
              style={{
                background: !isManufacturer ? "#0cb097" : "#ffffff",
                color: !isManufacturer ? "#ffffff" : "#0cb097",
                cursor: "pointer",
              }}
              onClick={() => setIsManufacturer(false)}
            >
              Hospital
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              name="email"
              onChange={onInputChange}
              value={userDetails.email}
              placeholder="EMAIL"
            />
            <input
              name="password"
              onChange={onInputChange}
              value={userDetails.password}
              type="password"
              placeholder="PASSWORD"
            />
            <button type="submit">LOGIN</button>
          </form>
        </div>
      </div>
    </>
  );
};
