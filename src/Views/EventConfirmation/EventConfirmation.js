import React from "react";
import cruz from "../../assets/cruz.svg";
import { Route, Link} from "react-router-dom";
import confirmation from "../../assets/confirmation.svg";
import "./EventConfirmation.scss";
const EventConfirmation = () => {
  return (
    <main className="confirmationPage">
      <article className="headerConfirm">
        <Route>
          <Link to="/">
            <img src={cruz} className="close" alt="close" />
          </Link>
        </Route>
        <h1 className="headline">
          ¡Genial! Tu actividad ha sido creada con éxito!
        </h1>
      </article>

      <img src={confirmation} alt="illustration" />
      <article className="fixedButton">
        <Route>
          <Link to={`/`}>Volver al inicio</Link>
        </Route>
      </article>
    </main>
  );
};

export default EventConfirmation;
