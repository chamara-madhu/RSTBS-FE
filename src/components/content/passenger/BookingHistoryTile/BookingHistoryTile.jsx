import React from 'react';

const BookingHistoryTile = () => {
  const bookingData = [
    {
      startDate: '02/02/2024',
      endDate: '02/03/2024',
      isActive: true,
      stationOrigin: 'Anuradhapura',
      destination: 'Maradana',
      daysLeft: 38
    },
    {
      startDate: '01/01/2024',
      endDate: '01/02/2024',
      isActive: false,
      stationOrigin: 'Anuradhapura',
      destination: 'Maradana',
      daysLeft: 10
    },
  ];

  return (
    <div className="flex flex-col gap-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", padding: "20px" }}>
      <h2 className="text-3xl font-bold">Your Booking History</h2>
      {bookingData.map((booking, index) => (
        <div key={index} className="mt-4 border-4 border-blue-800 p-4 ">
          {index > 0}
          <p className="text-lg font-bold mb-4">Season Ticket Details</p>
          <p className="flex items-center">
            <span className="text-lg font-medium mb-2">{`${booking.startDate} - ${booking.endDate}`}</span>
            <span className="ml-4">
                <button className={`text-white font-bold py-2 px-4 rounded-full ${booking.isActive ? 'bg-green-500' : 'bg-red-500'}`}>
                {booking.isActive ? 'Active' : 'Inactive'}
                </button>
            </span>
           </p>
          <hr className="my-2 border-t-2 border-gray-400" />
          
        <p style={{ whiteSpace: 'nowrap' }}>
        <span style={{ display: 'inline-block', width: '250px' }}><span className="font-bold">Station Origin:</span> {booking.stationOrigin}</span>
        <span style={{ display: 'inline-block', width: '230px' }}><span className="font-bold">Destination:</span> {booking.destination}</span>
        <span style={{ display: 'inline-block', width: '230px' }}><span className="font-bold">Days Left:</span> {booking.daysLeft} Days</span>
        </p>
        </div>
      ))}
    </div>
  );
};

export default BookingHistoryTile;
