import React, { useEffect, useState } from "react";
import { useEvents } from "../../context/Events/EventsContext.utils";
import cruz from "../../assets/cruz.svg";
import { useParams, useHistory } from "react-router-dom";
import "../Event/Event.scss";

const EditEvent = () => {
  const history = useHistory();
  const { bringEvent } = useEvents();
  const { id } = useParams();
  const [event, setEvent] = useState({});
  console.log(event);
  useEffect(() => {
    bringEvent(id).then(({ data }) => {
      setEvent(data.event);
    });
  }, []);
  return (
    <main className="editEvent">
      <svg className="svgImg">
        <clipPath id="eventImg" clipPathUnits="objectBoundingBox">
          <path d="M0,0.879 V0 H0.112 H0.469 H1 V0.706 V1 H0.07 C0.055,1,0.041,0.989,0.031,0.97 L0.01,0.926 C0.003,0.912,0,0.896,0,0.879"></path>
        </clipPath>
      </svg>
      <section
        className="eventImg"
        style={{ backgroundImage: `url(${event.eventImg})` }}
      >
        <div className="cross">
          <img
            src={cruz}
            className="close"
            alt="close"
            onClick={() => history.goBack()}
          />
        </div>
      </section>
    </main>
  );
};

export default EditEvent;
