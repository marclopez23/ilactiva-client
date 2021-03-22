import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Views/Login/Login.js";
import SignUp from "./Views/SignUp/SignUp";
import Events from "./Views/Events/Events";
import Event from "./Views/Event/Event";
import CreateEvent from "./Views/CreateEvent/CreateEvent";
import Home from "./Views/Home/Home";
import HomePrivate from "./Views/HomePrivate/HomePrivate";
import AnonRoute from "./components/Routes/AnonRoute";
import PrivateRoute from "./components/Routes/PrivateRoute";
import EventConfirmation from "./Views/EventConfirmation/EventConfirmation";
import Menu from "./components/Menu/Menu";
import Profile from "./Views/Profile/Profile";
import EditProfile from "./Views/EditProfile/EditProfile";
import Navbar from "./components/Navbar/Navbar";
import { useAuth } from "./context/Auth/AuthContext.utils";
import UserEvents from "./Views/UserEvents/UserEvents";
import EditEvent from "./Views/EditEvent/EditEvent";
import CommercePage from "./Views/CommercePage/CommercePage";

function App() {
  const { user } = useAuth();
  return (
    <>
      <Menu />
      <Switch>
        <PrivateRoute exact path="/eventos/creados/:id">
          <UserEvents />
        </PrivateRoute>
        <PrivateRoute exact path="/perfil/editar/:id">
          <EditProfile />
        </PrivateRoute>
        <PrivateRoute exact path="/perfil">
          <Profile />
          <Navbar />
        </PrivateRoute>
        <PrivateRoute exact path="/crear-evento">
          <CreateEvent />
        </PrivateRoute>
        <AnonRoute exact path="/iniciar-sesion">
          <Login />
        </AnonRoute>
        <AnonRoute exact path="/registrarme">
          <SignUp />
        </AnonRoute>
        <PrivateRoute exact path="/eventos/creado/">
          <EventConfirmation />
        </PrivateRoute>
        <Route exact path="/eventos/:id">
          <Event />
        </Route>
        <PrivateRoute exact path="/eventos/:id/editar">
          <EditEvent />
        </PrivateRoute>
        <Route exact path="/comercios/:id">
          <CommercePage />
        </Route>
        <Route exact path="/eventos">
          <Events />
          <Navbar />
        </Route>
        {user.isLogged ? (
          <>
            <PrivateRoute exact path="/">
              <HomePrivate />
              <Navbar />
            </PrivateRoute>
          </>
        ) : (
          <>
            <AnonRoute exact path="/">
              <Home />
            </AnonRoute>
          </>
        )}
      </Switch>
    </>
  );
}

export default App;
