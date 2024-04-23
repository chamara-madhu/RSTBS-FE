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
  ADMIN_ALL_SEASON_TICKETS_PATH,
  ADMIN_DASHBOARD_PATH,
  ADMIN_NEW_APPLICATIONS_PATH,
  ADMIN_PENDING_PAYMENT_APPROVALS_PATH,
  ADMIN_REVIEW_APPLICATION_PATH,
  ADMIN_REVIEW_PAYMENT_APPROVAL_PATH,
  APPLICATION_RE_SUBMISSION_PATH,
  BOOKING_HISTORY_PATH,
  BOOKING_PAYMENT_PATH,
  BOOKING_RENEW_PATH,
  BOOKING_USAGE_PATH,
  PAYMENT_SUCCESS_PATH,
  SEASON_TICKET_PATH,
} from "./constant/paths";
import AllNewApplications from "./pages/admin/AllNewApplications";
import PendingPaymentApprovals from "./pages/admin/PendingPaymentApprovals";
import ReviewNewApplication from "./pages/admin/ReviewNewApplication";
import PendingPayments from "./pages/passenger/PendingPayments";
import ReviewPaymentApproval from "./pages/admin/ReviewPaymentApproval";
import BookingUsage from "./pages/passenger/BookingUsage";
import SeasonTicketReSubmission from "./pages/passenger/SeasonTicketReSubmission";
import RenewSeasonTicket from "./pages/passenger/RenewSeasonTicket";
import PaymentSuccess from "./pages/passenger/PaymentSuccess";
import Dashboard from "./pages/admin/Dashboard";
import AllSeasonTickets from "./pages/admin/AllSeasonTickets";

// Create a private route for passengers
const PassengerRoute = () => {
  return auth_token() && isPassenger() ? <Outlet /> : <Navigate to="/" />;
};

// Create a private route for admins
const AdminRoute = () => {
  return auth_token() && isAdmin() ? <Outlet /> : <Navigate to="/" />;
};

const handleLogout = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user_data");
  return <Navigate to={SEASON_TICKET_PATH} />;
};

const LoginRoute = () => {
  return auth_token() ? (
    isAdmin() ? (
      <Navigate to={ADMIN_NEW_APPLICATIONS_PATH} />
    ) : isPassenger() ? (
      <Navigate to={SEASON_TICKET_PATH} />
    ) : (
      handleLogout()
    )
  ) : (
    <Outlet />
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginRoute />}>
          <Route exact path="/" element={<SignUpLogin />} />
        </Route>
        <Route exact path={SEASON_TICKET_PATH} element={<PassengerRoute />}>
          <Route exact path={SEASON_TICKET_PATH} element={<SeasonTicket />} />
        </Route>
        <Route
          exact
          path={APPLICATION_RE_SUBMISSION_PATH}
          element={<PassengerRoute />}
        >
          <Route
            exact
            path={APPLICATION_RE_SUBMISSION_PATH}
            element={<SeasonTicketReSubmission />}
          />
        </Route>
        <Route exact path={BOOKING_HISTORY_PATH} element={<PassengerRoute />}>
          <Route
            exact
            path={BOOKING_HISTORY_PATH}
            element={<BookingHistory />}
          />
        </Route>
        <Route exact path={BOOKING_USAGE_PATH} element={<PassengerRoute />}>
          <Route exact path={BOOKING_USAGE_PATH} element={<BookingUsage />} />
        </Route>
        <Route exact path={BOOKING_PAYMENT_PATH} element={<PassengerRoute />}>
          <Route
            exact
            path={BOOKING_PAYMENT_PATH}
            element={<PendingPayments />}
          />
        </Route>
        <Route exact path={PAYMENT_SUCCESS_PATH} element={<PassengerRoute />}>
          <Route
            exact
            path={PAYMENT_SUCCESS_PATH}
            element={<PaymentSuccess />}
          />
        </Route>
        <Route exact path={BOOKING_RENEW_PATH} element={<PassengerRoute />}>
          <Route
            exact
            path={BOOKING_RENEW_PATH}
            element={<RenewSeasonTicket />}
          />
        </Route>
        <Route exact path={ADMIN_DASHBOARD_PATH} element={<AdminRoute />}>
          <Route exact path={ADMIN_DASHBOARD_PATH} element={<Dashboard />} />
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
        <Route
          exact
          path={ADMIN_ALL_SEASON_TICKETS_PATH}
          element={<AdminRoute />}
        >
          <Route
            exact
            path={ADMIN_ALL_SEASON_TICKETS_PATH}
            element={<AllSeasonTickets />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
