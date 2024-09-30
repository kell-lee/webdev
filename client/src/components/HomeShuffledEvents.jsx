import { useState, useEffect, useContext, useMemo } from "react";
import Event from "./Event";
import { EventContext } from "../EventContext";

// utility function for shuffling an array
function shuffleEvents(array) {
  let currentIndex = array.length;

  while (currentIndex > 0) {
    // assign index
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // swap it with two random elements in place
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

const ShuffledEvents = () => {
  const [shuffledArray, setShuffledArray] = useState([]);
  const { events } = useContext(EventContext);
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

  if (shuffledArray.length === 0) {
    return <p>Loading</p>;
  }

  return (
    <div className="event-grid-container">
      <svg className="event-banner" height="60" width="300">
        <text x="50%" y="50%" className="event-banner-text">
          What's the Tea in Boston?
        </text>
      </svg>
      <div className="event-row">
        {shuffledArray.map((event) => (
          <div key={event.id} className="event">
            <Event id={event.id} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ShuffledEvents;
