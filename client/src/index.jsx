import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import Product from "./components/Product";
import AuthDebugger from "./components/AuthDebugger";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Detail from "./components/Detail";
import VerifyUser from "./components/VerifyUser";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthTokenProvider } from "./AuthTokenContext";
import { EventProvider } from "./EventContext";
import { requestedScopes } from "./clientConstants";

const container = document.getElementById("root");

const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/verify-user`,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        scope: requestedScopes.join(" "),
      }}
    >
      <AuthTokenProvider>
        <EventProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="/verify-user" element={<VerifyUser />} />
                <Route path="/product" element={<Product />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/authdebugger" element={<AuthDebugger />} />
                <Route path="/detail/:id" element={<Detail />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </EventProvider>
      </AuthTokenProvider>
    </Auth0Provider>
  </React.StrictMode>
);
