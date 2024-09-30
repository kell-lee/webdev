import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "../style/detail.css";
import { EventContext } from "../EventContext";
import { formatDateTS } from "../utility/formatDateTS";
import { formatPriceString } from "../utility/formatPrice";

export default function Detail() {
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently, user } = useAuth0();
  const navigate = useNavigate();
  const { id } = useParams();
  const { events } = useContext(EventContext);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const matchingEvent = events.find((e) => e.id === id);
    setEvent(matchingEvent);
  }, [id, events]);

  const addCart = async () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: user.sub,
            productId: event.id,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to add order`);
        }
        const result = await response.json();
        navigate(`${process.env.REACT_APP_API_URL}/product`);
        return result;
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  if (!event) {
    return <div>Loading</div>;
  }

  return (
    <div className="detail">
      <img src={event.imgURL} alt={event.name} className="product-img" />
      <div className="product-detail">
        <h2>{event.name}</h2>
        <div className="date-time">Date: {formatDateTS(event.date)}</div>
        <div className="location">Location</div>
        <div className="price">
          Price: {formatPriceString(event.minPrice)} ~ {formatPriceString(event.maxPrice)}
        </div>
        <div className="product-desc">{event.description}</div>
        <button className="cart" onClick={addCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
