import React from "react";
import Navbar from "../shared/Navbar";
import AdminSidebar from "../content/admin/admin-side-bar/AdminSideBar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div className="relative flex w-full">
        <AdminSidebar />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
