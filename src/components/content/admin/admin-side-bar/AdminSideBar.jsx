import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PaymentsIcon from "../../../../assets/icons/credit-card.svg";
import NewRequestsIcon from "../../../../assets/icons/send.svg";
import AllApplicaticonsIcon from "../../../../assets/icons/file-minus.svg";
import classNames from "classnames";
import {
  ADMIN_ALL_APPLICATIONS_PATH,
  ADMIN_NEW_REQUESTS_PATH,
  ADMIN_PAYMENTS_PATH,
} from "../../../../constant/paths";

const AdminSidebar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div
      className="flex sticky top-[72px] flex-col w-[300px] h-full bg-pp-primary-25 border-r border-pp-primary-100 py-4"
      style={{ height: "calc(100vh - 72px)" }}
    >
      <Link to={ADMIN_NEW_REQUESTS_PATH}>
        <div
          className={classNames(
            "flex text-sm items-center gap-3 px-4 h-[60px] ",
            pathname === ADMIN_NEW_REQUESTS_PATH
              ? "bg-pp-primary-100 font-medium"
              : ""
          )}
        >
          <img src={NewRequestsIcon} alt="Season ticket" /> New Requests
        </div>
      </Link>
      <Link to={ADMIN_ALL_APPLICATIONS_PATH}>
        <div
          className={classNames(
            "flex text-sm items-center gap-3 px-4 h-[60px] ",
            pathname === ADMIN_ALL_APPLICATIONS_PATH
              ? "bg-pp-primary-100 font-medium"
              : ""
          )}
        >
          <img src={AllApplicaticonsIcon} alt="All applications" /> All Applications
        </div>
      </Link>
      <Link to={ADMIN_PAYMENTS_PATH}>
        <div
          className={classNames(
            "flex text-sm items-center gap-3 px-4 h-[60px] ",
            pathname === ADMIN_PAYMENTS_PATH
              ? "bg-pp-primary-100 font-medium"
              : ""
          )}
        >
          <img src={PaymentsIcon} alt="Payments" /> Payments
        </div>
      </Link>
    </div>
  );
};

export default AdminSidebar;
