import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";
import "../style/authDebugger.css";

export default function AuthDebugger() {
  const { user } = useAuth0();
  const { accessToken } = useAuthToken();

  return (
    <div>
      <div className="access-token-container">
        <p>Access Token: </p>
        <pre className="access-token-content">{JSON.stringify(accessToken, null, 2)}</pre>
      </div>
      <div className="user-info-container">
        <p>User Info: </p>
        <pre className="usser-info-content">{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
}
