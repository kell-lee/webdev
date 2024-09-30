import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";

import fetchEvents from "./ticketmaster/fetchEvents.js";
import storeEvents from "./ticketmaster/storeEvents.js";

import userRoutes from "./routes/user.js";
import orderRoutes from "./routes/order.js";
import productRoutes from "./routes/product.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

// this is a public endpoint because it doesn't have the requireAuth middleware
app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

const processTicketmasterAPI = async () => {
  try {
    const events = await fetchEvents();
    if (events) {
      await storeEvents(events);
    }
  } catch (error) {
    console.log("error fetching and storing event data.");
  }
};

processTicketmasterAPI();

app.use(userRoutes);
app.use(orderRoutes);
app.use(productRoutes);

const PORT = parseInt(process.env.PORT) || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🎉 🚀`);
});
