import React from "react";
import {render, screen} from "@testing-library/react";
import Profile from "../components/Profile";
import {useAuth0} from "@auth0/auth0-react";

jest.mock("@auth0/auth0-react");

describe("Profile Component Tests", () => {
    const mockLoginRedirect = jest.fn();
    const mockGetAccessTokenSilently = jest.fn();
    const mockUser = {
        name: "Kermit Frog",
        email: "kermitfrog@example.com",
        sub: "auth0|123456",
        
    };
    beforeEach(() => {
        useAuth0.mockReturnValue({
            user: mockUser,
            loginWithRedirect: mockLoginRedirect,
            getAccessTokenSilently: mockGetAccessTokenSilently,
        });
    });

    test("display profile information correctly", () => {
        render(<Profile/>);
        expect(screen.getByText(`${mockUser.name}`)).toBeInTheDocument();
        expect(screen.getByText(`${mockUser.email}`)).toBeInTheDocument();
        
    });
})

// describe("Profile is Loading", () => {
//     const mockIsLoading = jest.fn();
//     const mockLoginRedirect = jest.fn();
//     const mockGetAccessTokenSilently = jest.fn();
//     const mockUser = {
//         name: "Kermit Frog",
//         email: "kermitfrog@example.com",
//         sub: "auth0|123456",
        
//     };
//     beforeEach(() => {
//         useAuth0.mockReturnValue({
//             user: mockUser,
//             isLoading: mockIsLoading,
//             loginWithRedirect: mockLoginRedirect,
//             getAccessTokenSilently: mockGetAccessTokenSilently,
//         });
//     });
//     test("display profile information correctly", () => {
//         console.log(mockIsLoading);
//         expect(screen.getByText("Loading...")).toBeInTheDocument();
        
//     });
// })


