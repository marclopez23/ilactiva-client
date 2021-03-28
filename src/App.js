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
import MoreEvents from "./Views/MoreEvents/MoreEvents";
import FollowedCommerces from "./Views/FollowedCommerces/FollowedCommerces";
import Search from "./Views/Search/Search";
import EventsList from "./Views/EventsList/EventsList";
import Footer from "./components/Footer/Footer";
import ErrorPage from "./Views/ErrorPage/ErrorPage";
function App() {
  const { user } = useAuth();
  return (
    <>
      <Menu />
      <Switch>
        <PrivateRoute exact path="/eventos-:filtro">
          <EventsList />
        </PrivateRoute>
        <PrivateRoute exact path="/buscar">
          <Search />
          <Navbar />
        </PrivateRoute>
        <PrivateRoute exact path="/eventos/:query/:cuando">
          <MoreEvents />
        </PrivateRoute>
        <PrivateRoute exact path="/eventos/:query/">
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
        <PrivateRoute exact path="/evento/creado/">
          <EventConfirmation />
        </PrivateRoute>
        <Route exact path="/evento/:id">
          <Event />
        </Route>
        <PrivateRoute exact path="/evento/editar/:id">
          <EditEvent />
        </PrivateRoute>
        <PrivateRoute exact path="/comercios/seguidos">
          <FollowedCommerces />
        </PrivateRoute>
        <Route exact path="/comercios/:id">
          <CommercePage />
        </Route>
        <PrivateRoute exact path="/eventos">
          <Events />
          <Navbar />
        </PrivateRoute>
        <Route exact path="/">
          {user.isLogged && (
            <>
              <HomePrivate />
              <Navbar />
            </>
          )}
          {!user.isLogged && <Home />}
        </Route>

        <Route path="*">
          <ErrorPage
            title="Nos encanta crear cosas pero parece ser que la página que estas buscando
        no existe."
          />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
