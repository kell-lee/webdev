import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../style/profile.css";
import { eventCategories } from "../clientConstants";
import { profilePic } from "../ImageA";

const updatePreference = async (auth0Id, newPreference, getAccessTokenSilently) => {
  const token = await getAccessTokenSilently();

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${auth0Id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newPreference: newPreference }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const handlePreferenceChange = (e, setSelectedPreference) => {
  setSelectedPreference(e.target.value);
};

const handleConfirmClick = async (auth0Id, getAccessTokenSilently, selectedPreference) => {
  try {
    await updatePreference(auth0Id, selectedPreference, getAccessTokenSilently);
    console.log("Preference updated successfully");
  } catch (error) {
    console.error("Error updating preference:", error);
  }
};

const deleteUser = async (auth0Id, getAccessTokenSilently) => {
  const token = await getAccessTokenSilently();

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${auth0Id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const deets = await response.text();
      throw new Error(`HTTP error! status: ${deets}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const handleDeleteUserClick = async (auth0Id, getAccessTokenSilently, logout) => {
  try {
    await deleteUser(auth0Id, getAccessTokenSilently);
    console.log("user deleted successfully");
    logout({ returnTo: window.location.origin });
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

const deleteOrder = async (orderId, getAccessTokenSilently) => {
  const token = await getAccessTokenSilently();
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const handleDeleteOrderClick = async (orderId, getAccessTokenSilently, setOrders) => {
  try {
    await deleteOrder(orderId, getAccessTokenSilently);
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
  } catch (error) {
    console.error("Error deleting order:", error);
  }
};

const getOrders = async (getAccessTokenSilently) => {
  const token = await getAccessTokenSilently();
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const getUserData = async (auth0Id, getAccessTokenSilently) => {
  const token = await getAccessTokenSilently();

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${auth0Id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

const formatDateTS = (dateTS) => {
  const date = new Date(dateTS);

  const formattedDate = date.toISOString().split("T")[0];

  return formattedDate;
};

export default function Profile() {
  const { loginWithRedirect, isAuthenticated, isLoading, getAccessTokenSilently, logout } =
    useAuth0();

  if (!isAuthenticated) {
    loginWithRedirect();
  }

  const { user: auth0User } = useAuth0();
  const [user, setUser] = useState(auth0User);
  const [orders, setOrders] = useState([]);
  const [selectedPreference, setSelectedPreference] = useState();

  useEffect(() => {
    const fetchOrdersAndSetUser = async () => {
      try {
        setUser(auth0User);

        const fetchedOrders = await getOrders(getAccessTokenSilently);
        const fetchUserData = await getUserData(auth0User.sub, getAccessTokenSilently);
        setOrders(fetchedOrders);

        if (fetchUserData && fetchUserData.preference) {
          setSelectedPreference(fetchUserData.preference);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOrdersAndSetUser();
  }, [auth0User, getAccessTokenSilently]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="user-info-container">
          <div className="profile-picture">
            <img src={profilePic.path} alt={profilePic.alt} />
          </div>
          <div className="user-details">
            <div className="user-info-label">
              <div>
                <label htmlFor="name">Name:</label>
              </div>
              <div>
                <label htmlFor="email">Email: </label>
              </div>
              <div>
                <label htmlFor="preference">Preference: </label>
              </div>
            </div>
            <div className="user-info-input">
              <div className="user-info-detail">{user.name}</div>
              <div className="user-info-detail">{user.email}</div>
              <select
                className="user-info-detail"
                id="preference"
                value={selectedPreference}
                onChange={(e) => handlePreferenceChange(e, setSelectedPreference)}
              >
                {eventCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="buttonSection">
            {" "}
            <div className="updateButton">
              <button
                type="button"
                onClick={() => {
                  handleConfirmClick(auth0User.sub, getAccessTokenSilently, selectedPreference);
                }}
              >
                Confirm Update
              </button>
            </div>
            <div className="deleteButton">
              <button
                type="button"
                onClick={() => handleDeleteUserClick(auth0User.sub, getAccessTokenSilently, logout)}
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
        <div className="order-history-container">
          <h1>Order History</h1>
          {orders.map((order) => (
            <div key={order.id} className="order-row">
              <div className="order-img">
                <img src={order.product.imgURL} alt=""></img>
              </div>
              <div className="order-detail">
                <div className="order-detail-name">Event Name: {order.product.name}</div>{" "}
                <div className="order-detail-timestamp">
                  Ordered Date:{formatDateTS(order.orderedTS)}
                </div>
              </div>
              <div className="order-cancel-button">
                <button
                  type="button"
                  onClick={() =>
                    handleDeleteOrderClick(order.id, getAccessTokenSilently, setOrders)
                  }
                >
                  Cancel Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
