import React, { useContext, useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { EventContext } from "../EventContext";
import Event from "./Event";
import shuffleEvents from "./ShuffleEvents";
import styles from "../style/product.module.css";

const Product = () => {
  const { events } = useContext(EventContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [shuffledArray, setShuffledArray] = useState([]);
  const categories = useMemo(() => ["Music", "Sports", "Arts & Theatre"], []);

  useEffect(() => {
    // use event context
    let eventArray = [];
    if (events.length > 0) {
      categories.forEach((category) => {
        let rowCount = 0;
        let currIndex = 0;

        while (rowCount < 5 && currIndex < events.length) {
          const currentEvent = events[currIndex];
          if (currentEvent && currentEvent.category === category) {
            eventArray.push(currentEvent);
            rowCount++;
          }
          currIndex++;
        }
      });
    }

    const shuffled = shuffleEvents(eventArray);

    setShuffledArray(shuffled);
  }, [events, categories]);

  const filteredEvents = shuffledArray.filter((event) => event.category === selectedCategory);
  const displayEvents = selectedCategory ? filteredEvents : shuffledArray;

  return (
    <div className={styles.product}>
      <div className={styles.categories}>
        {categories.map((category) => (
          <h5 key={category} onClick={() => setSelectedCategory(category)}>
            {category}
          </h5>
        ))}
        <h5 onClick={() => setSelectedCategory(null)}>All</h5>
      </div>
      <div className={styles.container}>
        {displayEvents.map((event) => (
          <div key={event.id} className={styles.column}>
            <Link to={`/detail/${event.id}`}>
              <div className={styles.description}>
                {" "}
                <Event id={event.id} />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
