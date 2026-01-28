import "./Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-box1">
          <i className="fa-solid fa-utensils"></i>
        </div>
        <h2>Admin Panel</h2>
      </div>

      <ul>
        <li><Link to="/admin/dashboard"><i className="fa-solid fa-chart-line"></i> Dashboard</Link></li>
        <li><Link to="/admin/staff"><i className="fa-solid fa-user-tie"></i> Staff Management</Link></li>
        <li><Link to="/admin/users"><i className="fa-solid fa-users"></i> User Management</Link></li>
        <li><Link to="/admin/categories"><i className="fa-solid fa-list"></i> Categories</Link></li>
        <li><Link to="/admin/analytics"><i className="fa-solid fa-chart-pie"></i> Analytics</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
