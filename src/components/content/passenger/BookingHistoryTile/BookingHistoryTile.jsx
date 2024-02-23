import React from 'react';

const BookingHistoryTile = () => {
  const bookingData = [
    {
      startDate: '01/01/2024',
      endDate: '01/02/2024',
      isActive: false,
      stationOrigin: 'Anuradhapura',
      destination: 'Maradana',
      daysLeft: 38
    },
    {
      startDate: '02/02/2024',
      endDate: '02/03/2024',
      isActive: true,
      stationOrigin: 'Anuradhapura',
      destination: 'Maradana',
      daysLeft: 10
    },
  ];

  return (
    <div className="flex flex-col gap-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", padding: "20px" }}>
      <h2 className="text-3xl font-bold">Your Booking History</h2>
      {bookingData.map((booking, index) => (
        <div key={index} className="mt-4 border-2 border-blue-500 p-4"> {/* Add border and padding */}
          {index > 0}
          <p className="font-bold">Current Season Ticket Details</p>
          <p>{`${booking.startDate} - ${booking.endDate}`} <span className={booking.isActive ? 'text-green-500' : 'text-red-500'}>{booking.isActive ? 'Active' : 'Inactive'}</span></p>
          <hr className="my-2 border-t-2 border-gray-400" /> {/* Horizontal line to separate sections within a block */}
          <p className="font-bold">Your Season Ticket</p>
          <p>Station Origin: {booking.stationOrigin}</p>
          <p>Destination: {booking.destination}</p>
          <p>Days Left: {booking.daysLeft} Days</p>
        </div>
      ))}
    </div>
  );
};

export default BookingHistoryTile;
