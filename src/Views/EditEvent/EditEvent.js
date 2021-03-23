import React, { useEffect, useState } from "react";
import { useEvents } from "../../context/Events/EventsContext.utils";
import cruz from "../../assets/cruz.svg";
import { useParams, useHistory } from "react-router-dom";
import { uploadFileService } from "../../service/upload.service";
import "../Event/Event.scss";
import "./EditEvent.scss";
import SimpleHeader from "../../components/SimpleHeader/SimpleHeader";

const EditEvent = () => {
  let setDate = false;
  const history = useHistory();
  const { bringEvent, eventEdit } = useEvents();
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [imageReady, setImageReady] = useState(true);
  useEffect(() => {
    bringEvent(id).then(({ data }) => {
      setEvent(data.event);
    });
  }, []);
  useEffect(() => {
    getDate();
    setDate = true;
  }, [event.date]);

  const getDate = () => {
    var date = new Date(event.date);
    var dd = String(date.getDate()).padStart(2, "0");
    var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = date.getFullYear();
    date = `${yyyy}-${mm}-${dd}`;
    setEvent((state) => ({ ...state, date: date }));
    return date;
  };

  const currentDay = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`;
    return today;
  };

  const handleFree = (event) => {
    const { checked, name } = event.target;
    if (!checked) {
      setEvent((state) => ({
        ...state,
        price: 0,
      }));
    }
    setEvent((state) => ({
      ...state,
      [name]: checked,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEvent((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleUpload = async (e) => {
    setImageReady(false);
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    const { data } = await uploadFileService(uploadData);
    setEvent({ ...event, profileImg: data });
    setImageReady(true);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await eventEdit(id, event);
      setEvent({});
      history.goBack();
    } catch (e) {
      console.log(e);
    }
  };
  console.log(event);
  return (
    <main className="editEvent">
      <svg className="svgImg">
        <clipPath id="eventImg" clipPathUnits="objectBoundingBox">
          <path d="M0,0.879 V0 H0.112 H0.469 H1 V0.706 V1 H0.07 C0.055,1,0.041,0.989,0.031,0.97 L0.01,0.926 C0.003,0.912,0,0.896,0,0.879"></path>
        </clipPath>
      </svg>
      <SimpleHeader title="Editar información" />
      <section
        className="eventImg"
        style={{ backgroundImage: `url(${event.eventImg})` }}
      >
        <input
          type="file"
          name="file"
          id="file"
          value={event.file || ""}
          onChange={handleUpload}
        />
      </section>

      <form action="">
        <label htmlFor="tite">Título del evento:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={event.title || ""}
          onChange={handleChange}
          required
        />
        <label htmlFor="description">
          Descripción <span>(Máx 200 carácteres)</span>
        </label>
        <textarea
          maxLength="200"
          rows="5"
          cols="50"
          type="textarea"
          name="description"
          id="description"
          value={event.description || ""}
          onChange={handleChange}
          required
        />
        <label htmlFor="place">Donde se celebra:</label>
        <input
          type="text"
          name="place"
          id="place"
          value={event.place || ""}
          onChange={handleChange}
          required
        />
        <label htmlFor="category">Categoria del evento:</label>
        <select
          name="category"
          id="category"
          value={event.category || ""}
          onChange={handleChange}
          required
        >
          <option value="talleres">Talleres</option>
          <option value="deportes">Deporte</option>
          <option value="cine">Cine</option>
          <option value="charlas">Charlas</option>
          <option value="exposiciones">Exposiciones</option>
          <option value="Visitas y tours">Visitas y tours</option>
          <option value="infatil">Infatil</option>
          <option value="espectáculos">Espectáculos</option>
          <option value="música">Música</option>
          <option value="otros">Otros</option>
        </select>
        <label htmlFor="maxUsers">Nº máximo de plazas</label>
        <input
          type="number"
          name="maxUsers"
          id="maxUsers"
          value={event.maxUsers || ""}
          onChange={handleChange}
          required
        />
        <label htmlFor="date">¿Qué día será?</label>
        <input
          type="date"
          name="date"
          id="date"
          value={event.date || ""}
          min={currentDay()}
          onChange={handleChange}
          required
        />
        <label htmlFor="date">¿A que hora empieza?</label>
        <input
          type="time"
          name="hour"
          id="hour"
          value={event.hour || ""}
          onChange={handleChange}
          required
        />
        <label htmlFor="date">¿A que hora acaba?</label>
        <input
          type="time"
          name="end"
          id="end"
          value={event.end || ""}
          onChange={handleChange}
          required
        />
        <div className="check">
          <label htmlFor="free">¿Es gratuita?</label>
          <input
            type="checkbox"
            name="free"
            id="free"
            defaultChecked={event.free}
            value={event.free}
            onClick={handleFree}
          />
        </div>
        {!event.free && (
          <>
            <label htmlFor="price">Precio (€)</label>
            <input
              type="number"
              name="price"
              id="price"
              value={event.price || ""}
              onChange={handleChange}
              required
            />
          </>
        )}
        <input
          className="send"
          type="submit"
          value="Guardar cambios"
          disabled={!imageReady}
          onClick={handleSubmit}
        />
      </form>
    </main>
  );
};

export default EditEvent;
