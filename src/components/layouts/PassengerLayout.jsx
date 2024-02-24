import React from "react";
import Navbar from "../shared/Navbar";
import Sidebar from "../content/passenger/side-bar/Sidebar";

const PassengerLayout = ({ children }) => {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div className="relative flex w-full">
        <Sidebar />
        <div
          className="relative flex flex-col w-full px-14"
          style={{ width: "calc(100% - 300px)" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default PassengerLayout;
