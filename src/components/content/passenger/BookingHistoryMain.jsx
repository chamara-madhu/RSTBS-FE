import React, { useState } from "react";
import PageHeader from "../../shared/headers/PageHeader";
import { useEffect } from "react";
import { getMySeasonTicket } from "../../../api/seasonTicketAPI";
import moment from "moment";
import StatusIndicators from "../../shared/status-indicators/StatusIndicators";
import Button from "../../shared/buttons/Button";
import { APPLICATION_STATUSES } from "../../../constant/general";
import { useNavigate } from "react-router-dom";
import { BOOKING_PAYMENT_PATH } from "../../../constant/paths";

const BookingHistoryMain = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMySeasonTicket()
      .then((res) => {
        setData(res.data);
        // setLoading(false);
        // navigate("/booking-history");
      })
      .catch((err) => {
        // setLoading(false);
      });
  }, []);

  const handlePayNowClick = (id) => {
    navigate(`${BOOKING_PAYMENT_PATH.replace(":id", id)}`);
  };

  return (
    <>
      <PageHeader title="Your booking history" />
      <div className="w-full">
        {data.map((booking) => (
          <div
            key={booking._id}
            className="p-4 mt-4 border rounded-lg border-pp-primary-200"
          >
            <div className="flex justify-between w-full">
              <div>
                <p className="mb-4 text-xs text-pp-gray-500">
                  Booking ID:{" "}
                  <span className="font-medium text-black">{booking._id}</span>
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
                {booking.status === APPLICATION_STATUSES.PAYMENT_PENDING && (
                  <p className="pt-3 text-[12px] text-pp-primary-700">
                    ** Your application has been approved and now you can make
                    the payments.
                  </p>
                )}
              </div>
              {booking.status === APPLICATION_STATUSES.PAYMENT_PENDING && (
                <Button
                  variant="dark"
                  className="w-fit"
                  handleButton={() => handlePayNowClick(booking._id)}
                >
                  Pay now
                </Button>
              )}
            </div>
            <hr className="my-3 border-t-2 border-pp-gray-200" />

            <div className="flex gap-4">
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
                <p className="text-sm">Days Left :</p>
                <span className="flex items-center h-8 px-3 text-sm font-bold rounded-full bg-pp-gray-200">
                  {moment(booking.duration.end).diff(moment(), "days")} days
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BookingHistoryMain;
