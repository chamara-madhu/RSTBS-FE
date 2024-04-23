import React, { useState, useEffect } from "react";
import PageHeader from "../../shared/headers/PageHeader";
import { getSeasonTicketHistory } from "../../../api/seasonTicketAPI";
import moment from "moment";
import StatusIndicators from "../../shared/status-indicators/StatusIndicators";
import Button from "../../shared/buttons/Button";
import { APPLICATION_STATUSES } from "../../../constant/general";
import { useNavigate } from "react-router-dom";
import {
  APPLICATION_RE_SUBMISSION_PATH,
  BOOKING_PAYMENT_PATH,
  BOOKING_RENEW_PATH,
  BOOKING_USAGE_PATH,
} from "../../../constant/paths";

const BookingHistoryMain = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSeasonTicketHistory()
      .then((res) => {
        setData(res.data);
        // setLoading(false);
        // navigate("/booking-history");
      })
      .catch((err) => {
        // setLoading(false);
      });
  }, []);

  const handleApplicationReSubmissionClick = (id) => {
    navigate(`${APPLICATION_RE_SUBMISSION_PATH.replace(":id", id)}`);
  };

  const handlePayNowClick = (id) => {
    navigate(`${BOOKING_PAYMENT_PATH.replace(":id", id)}`);
  };

  const handleViewCalenderClick = (id) => {
    navigate(`${BOOKING_USAGE_PATH.replace(":id", id)}`);
  };

  const renewExpiredClick = (id) => {
    navigate(`${BOOKING_RENEW_PATH.replace(":id", id)}`);
  };

  return (
    <>
      <PageHeader title="Your booking history" />
      <div className="w-full" data-testid="booking-history-main">
        {data?.length > 0 ? (
          data.map((booking, i) => (
            <div
              key={booking._id}
              className="relative flex justify-between gap-6 p-4 mt-4 border rounded-lg border-pp-primary-200"
            >
              <div className="w-full">
                <div className="flex justify-between w-full">
                  <div>
                    <p className="mb-4 text-xs text-pp-gray-500">
                      Season Ticket ID:{" "}
                      <span className="font-medium text-black">
                        {booking._id}
                      </span>
                    </p>
                    <div className="flex items-center gap-4">
                      <p className="text-lg font-medium">{`${moment
                        .utc(booking.duration.start)
                        .local()
                        .format("DD MMM YYYY")} - ${moment
                        .utc(booking.duration.end)
                        .local()
                        .format("DD MMM YYYY")}`}</p>
                      <StatusIndicators status={booking.status} />
                    </div>
                    <span
                      className="text-xs font-medium text-pp-primary-600 cursor-pointer underline"
                      onClick={() => handleViewCalenderClick(booking._id)}
                    >
                      View timeline
                    </span>
                    {booking.status ===
                      APPLICATION_STATUSES.PAYMENT_PENDING && (
                      <p className="pt-3 text-[12px] text-green-700">
                        ** Your application has been approved and now you can
                        make the payments.
                      </p>
                    )}
                    {(booking.status ===
                      APPLICATION_STATUSES.APPLICATION_REJECTED ||
                      booking.status ===
                        APPLICATION_STATUSES.PAYMENT_REJECTED) && (
                      <p className="pt-3 text-[12px] text-red-500">
                        <b>Reason for the rejection:</b> {booking.note}
                      </p>
                    )}
                  </div>
                  {booking.status === APPLICATION_STATUSES.PAYMENT_PENDING && (
                    <Button
                      variant="dark"
                      className="w-[140px]"
                      handleButton={() => handlePayNowClick(booking._id)}
                    >
                      Pay now
                    </Button>
                  )}
                  {booking.status ===
                    APPLICATION_STATUSES.APPLICATION_REJECTED && (
                    <Button
                      variant="dark"
                      className="w-[140px]"
                      handleButton={() =>
                        handleApplicationReSubmissionClick(booking._id)
                      }
                    >
                      Re-submit
                    </Button>
                  )}
                  {booking.status === APPLICATION_STATUSES.PAYMENT_REJECTED && (
                    <Button
                      variant="dark"
                      className="w-[140px]"
                      handleButton={() => handlePayNowClick(booking._id)}
                    >
                      Re-payment
                    </Button>
                  )}
                  {(booking.status === APPLICATION_STATUSES.EXPIRED ||
                    moment().isAfter(
                      moment(booking.duration.end).subtract(5, "days")
                    )) &&
                    i === 0 && (
                      <Button
                        variant="dark"
                        className="w-[140px]"
                        handleButton={() => renewExpiredClick(booking._id)}
                      >
                        Renew
                      </Button>
                    )}
                  {booking.status === APPLICATION_STATUSES.ACTIVE && (
                    <Button
                      variant="primary"
                      className="w-[140px]"
                      handleButton={() => handleViewCalenderClick(booking._id)}
                    >
                      View Calender
                    </Button>
                  )}
                </div>
                <hr className="my-3 border-t-2 border-pp-gray-200" />

                <div className="flex gap-4">
                  <div className="flex items-center gap-3">
                    <p className="text-sm">Fee :</p>
                    <span className="flex items-center h-8 px-3 text-sm rounded-full bg-pp-gray-200">
                      LKR {booking.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm">Station Origin :</p>
                    <span className="flex items-center h-8 px-3 text-sm rounded-full bg-pp-gray-200">
                      {booking.applicationId.stations.origin}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm">Destination :</p>
                    <span className="flex items-center h-8 px-3 text-sm rounded-full bg-pp-gray-200">
                      {booking.applicationId.stations.destination}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm">Days :</p>
                    <span className="flex items-center h-8 px-3 text-sm font-bold rounded-full bg-pp-gray-200">
                      {moment(booking.duration.end).diff(
                        moment(booking.duration.start),
                        "days"
                      )}{" "}
                      days
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm">Days Left :</p>
                    <span className="flex items-center h-8 px-3 text-sm font-bold rounded-full bg-pp-gray-200">
                      {moment().isBefore(moment(booking.duration.end))
                        ? moment(booking.duration.end).diff(
                            moment().isBefore(booking.duration.start)
                              ? moment(booking.duration.start)
                              : moment(),
                            "days"
                          )
                        : 0}{" "}
                      days
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No records</p>
        )}
      </div>
    </>
  );
};

export default BookingHistoryMain;
