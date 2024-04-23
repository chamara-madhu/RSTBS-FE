import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import {
  ADMIN_ALL_SEASON_TICKETS_PATH,
  ADMIN_DASHBOARD_PATH,
  ADMIN_NEW_APPLICATIONS_PATH,
  ADMIN_PENDING_PAYMENT_APPROVALS_PATH,
} from "../../../../constant/paths";
import { HelpCircle, CreditCard, Grid } from "feather-icons-react";
import { getPendingApplicationsAndPaymentsStats } from "../../../../api/dashboardAPI";

const AdminSidebar = () => {
  const [pendingStats, setPendingStats] = useState([]);

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    getPendingApplicationsAndPaymentsStats()
      .then((res) => {
        setPendingStats(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <div
      className="flex sticky top-[72px] flex-col w-[300px] h-full bg-pp-primary-25 border-r border-pp-primary-100 py-4"
      style={{ height: "calc(100vh - 72px)" }}
    >
      <Link to={ADMIN_DASHBOARD_PATH}>
        <div
          className={classNames(
            "flex text-sm items-center gap-3 px-4 h-[60px] ",
            pathname === ADMIN_DASHBOARD_PATH
              ? "bg-pp-primary-100 font-medium"
              : ""
          )}
        >
          <Grid size={16} /> Dashboard
        </div>
      </Link>
      <Link to={ADMIN_NEW_APPLICATIONS_PATH}>
        <div
          className={classNames(
            "flex text-sm items-center gap-3 px-4 h-[60px] ",
            pathname === ADMIN_NEW_APPLICATIONS_PATH
              ? "bg-pp-primary-100 font-medium"
              : ""
          )}
        >
          <HelpCircle size={16} /> New applications{" "}
          <span className="flex items-center text-white font-normal justify-center bg-pp-primary-600 w-6 h-6 rounded-full">
            {pendingStats?.[0]?.count}
          </span>
        </div>
      </Link>
      <Link to={ADMIN_PENDING_PAYMENT_APPROVALS_PATH}>
        <div
          className={classNames(
            "flex text-sm items-center gap-3 px-4 h-[60px] ",
            pathname === ADMIN_PENDING_PAYMENT_APPROVALS_PATH
              ? "bg-pp-primary-100 font-medium"
              : ""
          )}
        >
          <CreditCard size={16} /> Pending payment approvals{" "}
          <span className="flex items-center text-white font-normal justify-center bg-pp-primary-600 w-6 h-6 rounded-full">
            {pendingStats?.[1]?.count}
          </span>
        </div>
      </Link>
      <Link to={ADMIN_ALL_SEASON_TICKETS_PATH}>
        <div
          className={classNames(
            "flex text-sm items-center gap-3 px-4 h-[60px] ",
            pathname === ADMIN_ALL_SEASON_TICKETS_PATH
              ? "bg-pp-primary-100 font-medium"
              : ""
          )}
        >
          <CreditCard size={16} /> All season tickets
        </div>
      </Link>
    </div>
  );
};

export default AdminSidebar;
