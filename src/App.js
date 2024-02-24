import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUpLogin from "./pages/SignUpLogin";
import SeasonTicket from "./pages/passenger/SeasonTicket";
import AdminDashboard from "./pages/admin/Dashboard";
import BookingHistory from "./pages/passenger/BookingHistory";
import { auth_token, isAdmin, isClient } from "./auth/auth";
import { BOOKING_HISTORY_PATH, SEASON_TICKET_PATH } from "./constant/paths";

// Create a private route for clients/passengers
const PassengerRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth_token() && isClient() ? (
        <Component {...props} />
      ) : (
        <Navigate to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

// Create a private route for admins
const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth_token() && isAdmin() ? (
        <Component {...props} />
      ) : (
        <Navigate to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

// Define the login route
const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth_token() ? (
        <Navigate
          to={{
            pathname: "/my-account/my-ads",
            state: { from: props.location },
          }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpLogin />} />
        <Route path={SEASON_TICKET_PATH} element={<SeasonTicket />} />
        <Route path={BOOKING_HISTORY_PATH} element={<BookingHistory />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
