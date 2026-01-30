import { Outlet } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import "./ManagerLayout.css";

export default function ManagerLayout() {
  return (
    <div className="manager-layout">
      <Sidebar />
      <main className="manager-main-content">
        <Outlet />
      </main>
    </div>
  );
}
