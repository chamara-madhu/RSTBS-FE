import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import PassengerDashboard from "./pages/passenger/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard"
import { auth_token, isAdmin, isClient } from "./auth/auth";

// Create a private route for clients/passengers
const PassengerRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth_token() && isClient() ? (
        <Component {...props} />
      ) : (
        <Navigate
          to={{ pathname: "/login", state: { from: props.location } }}
        />
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
        <Navigate
          to={{ pathname: "/login", state: { from: props.location } }}
        />
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
        <Route path="/" element={<Login />} />
        <Route path="/passenger" element={<PassengerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
