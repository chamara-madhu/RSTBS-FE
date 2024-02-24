import React from "react";
import PageHeader from "../../shared/headers/PageHeader";

const BookingHistoryMain = () => {
  const bookingData = [
    {
      startDate: "02/02/2024",
      endDate: "02/03/2024",
      isActive: true,
      stationOrigin: "Anuradhapura",
      destination: "Maradana",
      daysLeft: 38,
    },
    {
      startDate: "01/01/2024",
      endDate: "01/02/2024",
      isActive: false,
      stationOrigin: "Anuradhapura",
      destination: "Maradana",
      daysLeft: 10,
    },
  ];

  return (
    <div className="relative flex flex-col w-full px-14">
      <PageHeader title="Your booking history" />
      <div className="w-full">
        {bookingData.map((booking, index) => (
          <div
            key={index}
            className="p-4 mt-4 border rounded-lg border-pp-primary-200"
          >
            {index > 0}
            <p className="mb-4 text-xs text-pp-gray-500">
              Season Ticket Details
            </p>
            <div className="flex items-center gap-4">
              <p className="text-lg font-medium">{`${booking.startDate} - ${booking.endDate}`}</p>
              <span
                className={`flex items-center text-white text-sm h-8 px-4 rounded-full ${
                  booking.isActive ? "bg-green-500" : "bg-red-500"
                }`}
              >
                Active
              </span>
            </div>
            <hr className="my-3 border-t-2 border-pp-gray-200" />

            <div className="flex gap-4">
              <div className="flex items-center gap-3">
                <p className="text-sm">Station Origin :</p>
                <span className="flex items-center h-8 px-3 text-sm rounded-full bg-pp-gray-200">
                  {booking.stationOrigin}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm">Destination :</p>
                <span className="flex items-center h-8 px-3 text-sm rounded-full bg-pp-gray-200">
                  {booking.destination}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm">Days Left :</p>
                <span className="flex items-center h-8 px-3 text-sm font-bold rounded-full bg-pp-gray-200">
                  {booking.daysLeft} days
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistoryMain;
