import React, { useEffect, useState } from "react";
import PageHeader from "../../shared/headers/PageHeader";
import PreLoading from "../../shared/loading/PreLoading";
import { APPLICATION_STATUSES } from "../../../constant/general";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { getSeasonTicketUsage } from "../../../api/seasonTicketAPI";
import { useParams } from "react-router-dom";

const BookingUsageMain = () => {
  const [booking, setBooking] = useState(null);
  const [preLoading, setPreLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getSeasonTicketUsage(id)
      .then((res) => {
        setBooking(res.data);
        setPreLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setPreLoading(false);
      });
  }, [id]);

  return (
    <>
      <PageHeader title="Calender" showBack />
      {preLoading ? (
        <PreLoading />
      ) : (
        <div className="relative flex w-full gap-6 mb-6">
          {(booking.status === APPLICATION_STATUSES.ACTIVE ||
            booking.status === APPLICATION_STATUSES.EXPIRED) && (
            <div>
              <Calendar
                tileClassName={({ date, view }) => {
                  if (
                    booking?.dates?.find((x) => {
                      return x === moment(date).format("YYYY-MM-DD");
                    })
                  ) {
                    return "highlight";
                  }
                }}
                minDate={new Date(moment.utc(booking.start).local().format())}
                maxDate={new Date(moment.utc(booking.end).local().format())}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BookingUsageMain;
