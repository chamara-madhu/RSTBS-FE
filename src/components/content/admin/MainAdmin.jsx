import React, { useState } from "react";
import NewRequests from "./NewRequests/NewRequests";
import AllApplications from "./AllApplications/AllApplications";

import SeasonTicketsImage from "../../../assets/images/SeasonTicketsImage.jpg";
import Payments from "./Payments/Payments";

const MainAdmin = () => {
  const [selectedContent, setSelectedContent] = useState("seasonTickets");
  return (
    <div className="flex w-full">
    <div
      className="flex flex-col w-[300px] h-full bg-pp-gray-200 p-4"
      style={{ height: "calc(100vh - 72px)" }}
    >
      <div className="flex items-center mb-2 cursor-pointer" onClick={() => setSelectedContent("newRequests")}>
        <img  style={{ width: '30px', height: 'auto', marginLeft: '12px' }} alt="S icon" className="mr-2" />
        <span className={`font-bold ${selectedContent === "newRequests" ? "text-blue-500" : ""}`}>New Requests</span>
      </div>
      <div className="flex items-center mb-2 cursor-pointer" onClick={() => setSelectedContent("allapplications")}>
        <img style={{ width: '30px', height: 'auto', marginLeft: '12px' }} alt="B icon" className="mr-2" />
        <span className={`font-bold ${selectedContent === "allapplications" ? "text-blue-500" : ""}`}>All Applications</span>
      </div>
      <div className="flex items-center mb-2 cursor-pointer" onClick={() => setSelectedContent("payments")}>
        <img style={{ width: '30px', height: 'auto', marginLeft: '12px' }} alt="B icon" className="mr-2" />
        <span className={`font-bold ${selectedContent === "payments" ? "text-blue-500" : ""}`}>Payments</span>
      </div>
    </div>
    <div className="flex flex-1 w-full justify-center items-start p-14" style={{ backgroundImage: `url(${SeasonTicketsImage})`, backgroundSize: 'cover', backdropFilter: 'blur(20px)' }}>
      <div className="w-[700px]">
        {selectedContent === "newRequests" && <NewRequests />}
        {selectedContent === "allapplications" && <AllApplications />}
        {selectedContent === "payments" && <Payments />}
      </div>
    </div>
  </div>
  );
};

export default MainAdmin;
