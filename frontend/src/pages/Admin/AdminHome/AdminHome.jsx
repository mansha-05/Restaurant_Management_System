import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/SideBar/SideBar";
import TopBar from "../../../components/TopBar/TopBar";
import "./AdminHome.css";

function AdminHome() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout-container">
      <TopBar onMenuClick={() => setSidebarOpen(true)} />

      <div className="admin-body">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
