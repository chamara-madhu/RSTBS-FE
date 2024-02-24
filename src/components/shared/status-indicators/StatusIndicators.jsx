import classNames from "classnames";
import React from "react";
import { APPLICATION_STATUSES } from "../../../constant/general";

const StatusIndicators = ({ status }) => {
  const getStatus = () => {
    switch (status) {
      case APPLICATION_STATUSES.APPLICATION_PENDING:
        return {
          name: "Pending",
          css: "bg-gray-200 text-gray-900",
        };
      case APPLICATION_STATUSES.PAYMENT_PENDING:
        return {
          name: "Payment pending",
          css: "bg-orange-100 text-orange-900",
        };
      case APPLICATION_STATUSES.PAYMENT_APPROVAL_PENDING:
        return {
          name: "Payment approval pending",
          css: "bg-purple-100 text-purple-900",
        };
      case APPLICATION_STATUSES.APPLICATION_REJECTED:
        return {
          name: "Application rejected",
          css: "bg-red-100 text-red-900",
        };
      case APPLICATION_STATUSES.ACTIVE:
        return {
          name: "Active",
          css: "bg-green-100 text-green-900",
        };
      case APPLICATION_STATUSES.PAYMENT_REJECTED:
        return {
          name: "Payment rejected",
          css: "bg-pink-100 text-pink-900",
        };
      default:
        return {
          name: "Expired",
          css: "bg-red-200 text-pink-900",
        };
    }
  };
  return (
    <span
      className={classNames(
        "flex items-center bg-gray-300 text-xs font-medium h-8 px-4 rounded-full",
        getStatus().css
      )}
    >
      {getStatus().name}
    </span>
  );
};

export default StatusIndicators;
