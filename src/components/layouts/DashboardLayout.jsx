import React from "react";
import Navbar from "../shared/Navbar";
import Sidebar from "../content/passenger/side-bar/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div className="relative flex w-full">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
