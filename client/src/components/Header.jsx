import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import "../style/header.css";

function Header() {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();
  const signUp = () => loginWithRedirect({ screen_hint: "signup" });

  return (
    <div className="header">
      <h1>
        <Link to="/">bosTea</Link>
      </h1>
      <nav>
        <ul className="left-side">
          <li>
            <Link to="/product">Products</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/authdebugger">Auth Debugger</Link>
          </li>
        </ul>
        <ul className="right-side">
          {!isLoading && (
            <>
              {!isAuthenticated ? (
                <>
                  <li>
                    <button className="log-in" onClick={loginWithRedirect}>
                      Log In
                    </button>
                  </li>
                  <li>
                    <button className="create-account" onClick={signUp}>
                      Create Account
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button
                      className="log-out"
                      onClick={() => logout({ returnTo: window.location.origin })}
                    >
                      Log Out
                    </button>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
