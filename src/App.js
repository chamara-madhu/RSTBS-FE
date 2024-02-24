import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import SignUpLogin from "./pages/SignUpLogin";
import SeasonTicket from "./pages/passenger/SeasonTicket";
import BookingHistory from "./pages/passenger/BookingHistory";
import { auth_token, isAdmin, isPassenger } from "./auth/auth";
import {
  ADMIN_ALL_APPLICATIONS_PATH,
  ADMIN_NEW_REQUESTS_PATH,
  ADMIN_PAYMENTS_PATH,
  ADMIN_REVIEW_REQUESTS_PATH,
  BOOKING_HISTORY_PATH,
  SEASON_TICKET_PATH,
} from "./constant/paths";
import NewRequests from "./pages/admin/NewRequests";
import AllApplications from "./pages/admin/AllApplications";
import Payments from "./pages/admin/Payments";
import ReviewRequests from "./pages/admin/ReviewRequests";

// Create a private route for clients/passengers
const PassengerRoute = () => {
  return auth_token() && isPassenger() ? <Outlet /> : <Navigate to="/" />;
};

const AdminRoute = () => {
  return auth_token() && isAdmin() ? <Outlet /> : <Navigate to="/" />;
};

// Define the login route
const LoginRoute = ({ element: Element, ...rest }) => (
  <Route
    {...rest}
    element={
      auth_token() ? <Navigate to="/my-account/my-ads" replace /> : <Element />
    }
  />
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpLogin />} />
        <Route exact path={SEASON_TICKET_PATH} element={<PassengerRoute />}>
          <Route exact path={SEASON_TICKET_PATH} element={<SeasonTicket />} />
        </Route>
        <Route exact path={BOOKING_HISTORY_PATH} element={<PassengerRoute />}>
          <Route
            exact
            path={BOOKING_HISTORY_PATH}
            element={<BookingHistory />}
          />
        </Route>
        <Route exact path={ADMIN_NEW_REQUESTS_PATH} element={<AdminRoute />}>
          <Route
            exact
            path={ADMIN_NEW_REQUESTS_PATH}
            element={<NewRequests />}
          />
        </Route>
        <Route
          exact
          path={ADMIN_ALL_APPLICATIONS_PATH}
          element={<AdminRoute />}
        >
          <Route
            exact
            path={ADMIN_ALL_APPLICATIONS_PATH}
            element={<AllApplications />}
          />
        </Route>
        <Route exact path={ADMIN_PAYMENTS_PATH} element={<AdminRoute />}>
          <Route exact path={ADMIN_PAYMENTS_PATH} element={<Payments />} />
        </Route>
        <Route exact path={ADMIN_REVIEW_REQUESTS_PATH} element={<AdminRoute />}>
          <Route
            exact
            path={ADMIN_REVIEW_REQUESTS_PATH}
            element={<ReviewRequests />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
