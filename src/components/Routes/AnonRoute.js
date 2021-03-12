import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext.utils";

function AnonRoute({ path, exact, children }) {
  const { user } = useAuth();
  if (user.isLogged) {
    return <Redirect to="/private" />;
  }

  return (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  );
}

export default AnonRoute;
