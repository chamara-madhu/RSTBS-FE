import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Book } from "feather-icons-react";
import QrIcon from "../../../../assets/icons/qr-code.svg";
import classNames from "classnames";
import {
  BOOKING_HISTORY_PATH,
  SEASON_TICKET_PATH,
} from "../../../../constant/paths";

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div
      className="flex sticky top-0 flex-col w-[300px] h-full bg-pp-gray-100 py-4"
      style={{ height: "calc(100vh - 72px)" }}
    >
      <Link to={SEASON_TICKET_PATH}>
        <div
          className={classNames(
            "flex text-sm items-center gap-2 px-4 h-[60px] ",
            pathname === SEASON_TICKET_PATH
              ? "bg-pp-primary-100 font-medium"
              : ""
          )}
        >
          <img src={QrIcon} alt="Season ticket" /> Season ticket
        </div>
      </Link>
      <Link to={BOOKING_HISTORY_PATH}>
        <div
          className={classNames(
            "flex text-sm items-center gap-2 px-4 h-[60px] ",
            pathname === BOOKING_HISTORY_PATH
              ? "bg-pp-primary-100 font-medium"
              : ""
          )}
        >
          <Book size={16} /> Booking history
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
