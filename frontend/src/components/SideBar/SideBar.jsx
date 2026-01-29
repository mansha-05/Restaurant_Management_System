import "./Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`sidebar-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      />

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo-box1">
            <i className="fa-solid fa-utensils"></i>
          </div>
          <h2>Admin Panel</h2>
        </div>

        <ul>
          <li><Link to="/admin/dashboard" onClick={onClose}><i className="fa-solid fa-chart-line"></i>Dashboard</Link></li>
          <li><Link to="/admin/staff" onClick={onClose}><i className="fa-solid fa-user-tie"></i>Staff Management</Link></li>
          <li><Link to="/admin/users" onClick={onClose}><i className="fa-solid fa-users"></i>User Management</Link></li>
          <li><Link to="/admin/categories" onClick={onClose}><i className="fa-solid fa-list"></i>Categories</Link></li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
