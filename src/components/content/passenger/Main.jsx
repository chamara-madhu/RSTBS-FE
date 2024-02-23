import React, { useState } from "react";
import SeasonTicketsIcon from "../../../assets/images/SeasonTicketsIcon.png";
import BookingHistoryIcon from "../../../assets/images/BookingHistoryIcon.png";
import SeasonTicketsTile from "./SeasonTicketsTile/SeasonTicketsTile";
import BookingHistoryTile from "./BookingHistoryTile/BookingHistoryTile";
import SeasonTicketsImage from "../../../assets/images/SeasonTicketsImage.jpg";

const Main = () => {
  const [selectedContent, setSelectedContent] = useState("seasonTickets");

  return (
    // <div className="flex w-full">
    //   <div
    //     className="flex flex-col w-[300px] h-full bg-pp-gray-200 p-4"
    //     style={{ height: "calc(100vh - 72px)" }}
    //   >
    //     <div className="flex items-center mb-2 cursor-pointer" onClick={() => setSelectedContent("seasonTickets")}>
    //       <img src={SeasonTicketsIcon} style={{ width: '30px', height: 'auto', marginLeft: '12px' }} alt="S icon" className="mr-2" />
    //       <span className={`font-bold ${selectedContent === "seasonTickets" ? "text-blue-500" : ""}`}>Season Tickets</span>
    //     </div>
    //     <div className="flex items-center mb-2 cursor-pointer" onClick={() => setSelectedContent("bookingHistory")}>
    //       <img src={BookingHistoryIcon} style={{ width: '30px', height: 'auto', marginLeft: '12px' }} alt="B icon" className="mr-2" />
    //       <span className={`font-bold ${selectedContent === "bookingHistory" ? "text-blue-500" : ""}`}>Booking History</span>
    //     </div>
    //   </div>
    <div
      className="flex flex-1 w-full justify-center items-start p-14"
      style={{
        backgroundImage: `url(${SeasonTicketsImage})`,
        backgroundSize: "cover",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="w-[700px]">
        {selectedContent === "seasonTickets" && <SeasonTicketsTile />}
        {selectedContent === "bookingHistory" && <BookingHistoryTile />}
      </div>
    </div>
    // </div>
  );
};

export default Main;
