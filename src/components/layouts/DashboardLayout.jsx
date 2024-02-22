import React from "react";
import Navbar from "../shared/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
