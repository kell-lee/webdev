import React from "react";
import { createContext, useState, useEffect } from 'react';
import getProducts from './ticketmaster/ticketmasterAPI';

export const EventContext = createContext();

export const EventProvider = ({children}) => {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const fetchEvents = async () => {
          try {
            const data = await getProducts();
            setEvents(data);
          } catch (error) {
            console.error("Error fetching events:", error);
          }
        };
    
        fetchEvents();
      }, []);
      return (
        <EventContext.Provider value={{events}}>
            {children}
        </EventContext.Provider>
      );
};

