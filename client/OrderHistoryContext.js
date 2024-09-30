import React from "react";
import { createContext, useState, useEffect } from "react";
import backendURL from "./constants";

export const OrderHistoryContext = createContext();

export const OrderHistoryProvider = ({ children }) => {
  const [OrderHistorys, setOrderHistorys] = useState([]);
  useEffect(() => {
    const fetchOrderHistorys = async () => {
      try {
        const data = await fetch(`${backendURL}/assignment3db/orderhistory`);
        setOrderHistorys(data);
      } catch (error) {
        console.error("Error fetching OrderHistorys:", error);
      }
    };

    fetchOrderHistorys();
  }, []);
  return (
    <OrderHistoryContext.Provider value={{ OrderHistorys }}>
      {children}
    </OrderHistoryContext.Provider>
  );
};
