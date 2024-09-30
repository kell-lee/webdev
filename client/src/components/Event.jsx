import React, { useContext } from "react";
import { EventContext } from "../EventContext";
import "../style/event.css";

const Event = ({ id }) => {
  const { events } = useContext(EventContext);

  if (events.length === 0) {
    return <div>Loading Content</div>;
  }

  const event = events.find((event) => event.id === id);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="events-container">
      <div className="events">
        <h3>{event.name}</h3>
        <img src={event.imgURL} alt={event.name} className="event-img" />
      </div>
    </div>
  );
};

export default Event;
