import React, { useState } from "react";
import NewRequests from "./NewRequests/NewRequests";
import AllApplications from "./AllApplications/AllApplications";
import SeasonTicketsImage from "../../../assets/images/SeasonTicketsImage.jpg";
import Payments from "./Payments/Payments";
import SendImage from "../../../assets/images/send.png";
import ArchiveImage from "../../../assets/images/archive.png";
import PaymentImage from "../../../assets/images/paymentImage.png";

const MainAdmin = () => {
  const [selectedContent, setSelectedContent] = useState("newRequests");
  return (
    <div className="flex w-full">
    <div
      className="flex flex-col w-[300px] h-full bg-pp-gray-200 p-4"
      style={{ height: "calc(100vh - 72px)" }}
    >
      <div className="flex items-center mb-2 cursor-pointer" onClick={() => setSelectedContent("newRequests")}>
        <img  src= {SendImage} style={{ width: '25px', height: 'auto', marginLeft: '35px' }} alt="N icon" className="mr-2" />
        <span className={`font-bold ${selectedContent === "newRequests" ? "text-blue-500" : ""}`}>New Requests</span>
      </div>
      <div className="flex items-center mb-2 cursor-pointer" onClick={() => setSelectedContent("allapplications")}>
        <img src={ArchiveImage} style={{ width: '22px', height: 'auto', marginLeft: '35px' }} alt="A icon" className="mr-2" />
        <span className={`font-bold ${selectedContent === "allapplications" ? "text-blue-500" : ""}`}>All Applications</span>
      </div>
      <div className="flex items-center mb-2 cursor-pointer" onClick={() => setSelectedContent("payments")}>
        <img src={PaymentImage} style={{ width: '22px', height: 'auto', marginLeft: '35px' }} alt="P icon" className="mr-2" />
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
