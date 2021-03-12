import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Views/Login/Login.js";
import SignUp from "./Views/SignUp/SignUp";
import Events from "./Views/Events/Events";
import Event from "./Views/Event/Event";
import CreateEvent from "./Views/CreateEvent/CreateEvent";
import AnonRoute from "./components/Routes/AnonRoute";
import PrivateRoute from "./components/Routes/PrivateRoute";

function App() {
  return (
    <Switch>
      <PrivateRoute exact path="/events/create">
        <CreateEvent />
      </PrivateRoute>
      <AnonRoute exact path="/login">
        <Login />
      </AnonRoute>
      <AnonRoute exact path="/signup">
        <SignUp />
      </AnonRoute>
      <Route exact path="/events/:id">
        <Event />
      </Route>
      <Route path="/events">
        <Events />
      </Route>
    </Switch>
  );
}

export default App;
