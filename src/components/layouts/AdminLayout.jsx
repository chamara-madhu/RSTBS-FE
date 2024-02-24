import React from "react";
import Navbar from "../shared/Navbar";
import AdminSidebar from "../content/admin/admin-side-bar/AdminSideBar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div className="relative flex w-full">
        <AdminSidebar />
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

export default AdminLayout;
