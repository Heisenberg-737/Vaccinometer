import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../../Context/Context";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  useEffect(() => {
    console.log(currentUser);
  });
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Redirect to="/" />;
      }}
    ></Route>
  );
}
