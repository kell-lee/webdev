
import "../style/home.css";
import Slideshow from "./HomeSlideShow";
import Weather from "./HomeWeather";
import ShuffledEvents from "./HomeShuffledEvents";


function Home() {
  return (
    <div className="home">
      <div>

      </div>
      <div className="slideshow">
        <Slideshow />
      </div>
      <div className="forecast-container">
        <Weather />
      </div>
      <div className="event-container">
        <ShuffledEvents />
      </div>
    </div>
  );
}

export default Home;
