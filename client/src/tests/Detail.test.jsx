import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useNavigate, BrowserRouter } from "react-router-dom";
import { EventContext } from "../EventContext";
import Detail from "../components/Detail";

jest.mock("@auth0/auth0-react");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

const mockEvent = {
  id: "1",
  name: "Mock Event",
  date: "2024-12-31",
  minPrice: "50.00",
  maxPrice: "100.00",
  imgURL: "mock-image-url.jpg",
  description: "This is a mock event description.",
};

describe("Detail Component Tests", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      loginWithRedirect: jest.fn(),
      getAccessTokenSilently: jest.fn(),
      user: { sub: "auth0|123456" },
    });
    useNavigate.mockReturnValue(mockNavigate);
    useParams.mockReturnValue({
      id: "1",
    });
  });

  test("renders the detail component", async () => {
    const eventsValue = { events: [mockEvent] };

    render(
      <EventContext.Provider value={eventsValue}>
        <Detail />
      </EventContext.Provider>
    );
    screen.debug();
    expect(screen.getByText("Mock Event")).toBeInTheDocument();
    expect(screen.getByText("Date: 2024-12-31")).toBeInTheDocument();
    expect(screen.getByText("Price: 50.00 ~ 100.00")).toBeInTheDocument();
  });
});
