import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Views/Login/Login.js";
import SignUp from "./Views/SignUp/SignUp";

import AnonRoute from "./components/Routes/AnonRoute";

function App() {
  return (
    <Switch>
      <AnonRoute exact path="/login">
        <Login />
      </AnonRoute>
      <AnonRoute exact path="/signup">
        <SignUp />
      </AnonRoute>
    </Switch>
  );
}

export default App;
