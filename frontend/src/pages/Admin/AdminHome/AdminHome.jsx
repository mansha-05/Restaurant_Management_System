import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/SideBar/SideBar";
import TopBar from "../../../components/TopBar/TopBar";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import "./AdminHome.css";

function AdminHome() {
  return (
    <div className="admin-layout-container">
      <TopBar />

      <div className="admin-body">
        <Sidebar />

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
