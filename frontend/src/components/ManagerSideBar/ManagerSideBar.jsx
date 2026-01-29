import "./ManagerSidebar.css";
import { Link } from "react-router-dom";

function ManagerSidebar({ isOpen, onClose }) {
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
          <h2>Manager Panel</h2>
        </div>

        <ul>
          <li><Link to="/manager/dashboard" onClick={onClose}><i className="fa-solid fa-chart-line"></i>Dashboard</Link></li>
          <li><Link to="/manager/orders" onClick={onClose}><i class="fa-solid fa-bag-shopping"></i>Orders</Link></li>
          <li><Link to="/manager/reservations" onClick={onClose}><i className="fa-solid fa-users"></i>Reservations</Link></li>
          <li><Link to="/manager/menu" onClick={onClose}><i className="fa-solid fa-utensils"></i>Menu Management</Link></li>
          <li><Link to="/manager/table" onClick={onClose}><i class="fa-solid fa-table"></i>Table Management</Link></li>
          <li><Link to="/manager/feedback" onClick={onClose}><i class="fa-solid fa-comment"></i>Feedback</Link></li>
        </ul>
      </div>
    </>
  );
}

export default ManagerSidebar;
