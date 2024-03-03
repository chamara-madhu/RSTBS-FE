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
  ADMIN_NEW_APPLICATIONS_PATH,
  ADMIN_PENDING_PAYMENT_APPROVALS_PATH,
  ADMIN_REVIEW_APPLICATION_PATH,
  ADMIN_REVIEW_PAYMENT_APPROVAL_PATH,
  BOOKING_HISTORY_PATH,
  BOOKING_PAYMENT_PATH,
  SEASON_TICKET_PATH,
} from "./constant/paths";
import AllNewApplications from "./pages/admin/AllNewApplications";
import PendingPaymentApprovals from "./pages/admin/PendingPaymentApprovals";
import ReviewNewApplication from "./pages/admin/ReviewNewApplication";
import PendingPayments from "./pages/passenger/PendingPayments";
import ReviewPaymentApproval from "./pages/admin/ReviewPaymentApproval";

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
        <Route exact path={BOOKING_PAYMENT_PATH} element={<PassengerRoute />}>
          <Route
            exact
            path={BOOKING_PAYMENT_PATH}
            element={<PendingPayments />}
          />
        </Route>
        <Route
          exact
          path={ADMIN_NEW_APPLICATIONS_PATH}
          element={<AdminRoute />}
        >
          <Route
            exact
            path={ADMIN_NEW_APPLICATIONS_PATH}
            element={<AllNewApplications />}
          />
        </Route>
        <Route
          exact
          path={ADMIN_PENDING_PAYMENT_APPROVALS_PATH}
          element={<AdminRoute />}
        >
          <Route
            exact
            path={ADMIN_PENDING_PAYMENT_APPROVALS_PATH}
            element={<PendingPaymentApprovals />}
          />
        </Route>
        <Route
          exact
          path={ADMIN_REVIEW_PAYMENT_APPROVAL_PATH}
          element={<AdminRoute />}
        >
          <Route
            exact
            path={ADMIN_REVIEW_PAYMENT_APPROVAL_PATH}
            element={<ReviewPaymentApproval />}
          />
        </Route>
        <Route
          exact
          path={ADMIN_REVIEW_APPLICATION_PATH}
          element={<AdminRoute />}
        >
          <Route
            exact
            path={ADMIN_REVIEW_APPLICATION_PATH}
            element={<ReviewNewApplication />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
