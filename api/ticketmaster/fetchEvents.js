import * as dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.TICKETMASTER_API_KEY;
const batchSize = 200;

const fetchEvents = async () => {
  try {
    const params = new URLSearchParams({
      apikey: apiKey,
      size: batchSize,
      city: "Boston",
    });

    const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?${params}`);
    const data = await response.json();

    if (!data._embedded || !data._embedded.events) {
      throw new Error("No events found");
    }

    const events = data._embedded.events;

    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

export default fetchEvents;
