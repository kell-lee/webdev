import React from "react";
import Header from "../components/Header";
import App from "../App";
import {render, fireEvent, screen} from "@testing-library/react";
import {useAuth0} from "@auth0/auth0-react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { EventContext } from "../EventContext";

jest.mock("@auth0/auth0-react");


const mockEvent = {
    id: "1",
    name: "Mock Event",
    date: "2024-12-31",
    minPrice: "50.00",
    maxPrice: "100.00",
    imgURL: "mock-image-url.jpg",
    description: "This is a mock event description.",
  };
  

describe("Header Test", () => {
    const mockLoginWithRedirect = jest.fn();
    const mockLogout = jest.fn();
    beforeEach(() => {
        useAuth0.mockReturnValue({
            isAuthenticated: false,
            isLoading: false,
            logOut: mockLogout,
            loginWithRedirect: mockLoginWithRedirect,
          });

    });
    test("render without crash", () => {
        render(<BrowserRouter><Header/></BrowserRouter>);
        screen.debug();
        expect(screen.getByText("bosTea")).toBeInTheDocument();
    });

    test("display Login and Create Account when not logged in", () => {
        render(<BrowserRouter><Header/></BrowserRouter>);
        
        expect(screen.getByText("Log In")).toBeInTheDocument();
        expect(screen.getByText("Create Account")).toBeInTheDocument();

    });

    test("display Log Out button when authenticated", () => {
        useAuth0.mockReturnValueOnce({
            isAuthenticated: true,
            loginWithRedirect: mockLoginWithRedirect,
          });
          render(<BrowserRouter><Header/></BrowserRouter>);
          expect(screen.getByText("Log Out")).toBeInTheDocument();
    });

    test("Log In button triggers loginWithRedirect", () => {
        render(<BrowserRouter><Header/></BrowserRouter>);
        fireEvent.click(screen.getByText("Log In"));
        expect(mockLoginWithRedirect).toHaveBeenCalled();
      });

      test("Signup button triggers loginWithRedirect", () => {
        const eventsValue = { events: [mockEvent] };

        render(
          <BrowserRouter>
          <EventContext.Provider value={eventsValue}>
            <App />
          </EventContext.Provider>
          </BrowserRouter>
        );
        
        fireEvent.click(screen.getByText("Create Account"));
        expect(mockLoginWithRedirect).toHaveBeenCalledWith({
          screen_hint: "signup",
        });
      });
})

