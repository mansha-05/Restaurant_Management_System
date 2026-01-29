import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ManagerSidebar from "../../../components/ManagerSideBar/ManagerSideBar";
import TopBar from "../../../components/TopBar/TopBar";
import "./ManagerHome.css";

function ManagerHome() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="manager-layout-container">
      <TopBar onMenuClick={() => setSidebarOpen(true)} />

      <div className="manager-body">
        <ManagerSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="manager-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ManagerHome;
