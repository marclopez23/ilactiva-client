import React from "react";
import "./CommerceCard.scss";
import { Route, Link } from "react-router-dom";

const CommerceCard = ({ commerce, cssClass }) => {
  return (
    <Route>
      <Link>
        <article className={cssClass}>
          <img src={commerce.profileImg} alt={commerce.name} />
          <h3 className="cardTitle">{commerce.name}</h3>
          <button>Ver perfil</button>
        </article>
      </Link>
    </Route>
  );
};

export default CommerceCard;
