import React from "react";
import Home from "../components/Home";
import Header from "../components/Header";
import {render, screen} from "@testing-library/react";
import {useAuth0} from "@auth0/auth0-react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { EventContext } from "../EventContext";
import ShuffledEvents from "../components/HomeShuffledEvents";

jest.mock("@auth0/auth0-react");
jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
  }));

  const mockEventContextValue = {
    events: [], 
  };

describe("Home Component Tests", () => {
    const mockLoginWithRedirect = jest.fn();
    const mockNavigate = jest.fn();
  
    beforeEach(() => {
        useAuth0.mockReturnValue({
            isAuthenticated: false,
            loginWithRedirect: mockLoginWithRedirect,
          });
          useNavigate.mockReturnValue(mockNavigate);
          jest.spyOn(React, "useContext").mockImplementation(() => mockEventContextValue);

    });
    test("render without crash", () => {
        render(<Home />);
        expect(screen.getByText("Weather this week in Boston!")).toBeInTheDocument();
    });


    // test("display Login and Create Account when not logged in", () => {
    //     render(<Home />);
        
    //     expect(screen.getByText("Login")).toBeInTheDocument();
    //     expect(screen.getByText("Create Account")).toBeInTheDocument();

    // });

    // test("display Log Out button when authenticated", () => {
    //     useAuth0.mockReturnValueOnce({
    //         isAuthenticated: true,
    //         loginWithRedirect: mockLoginWithRedirect,
    //       });
    //       render(<Home />);
    //       expect(screen.getByText("Log Out")).toBeInTheDocument();
    // });
})

