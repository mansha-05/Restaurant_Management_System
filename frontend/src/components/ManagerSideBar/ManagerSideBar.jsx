import "./ManagerSidebar.css";
import { Link } from "react-router-dom";
import {
  FiGrid,
  FiShoppingCart,
  FiCalendar,
  FiMenu,
  FiInbox,
  FiMessageSquare,
  FiLayout
} from 'react-icons/fi';
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
          <li><Link to="/manager/dashboard" onClick={onClose}><FiGrid size={18} /> Dashboard</Link></li>
          <li><Link to="/manager/orders" onClick={onClose}><FiShoppingCart size={20} /> Orders</Link></li>
          <li><Link to="/manager/reservations" onClick={onClose}><FiCalendar size={20} /> Reservations</Link></li>
          <li><Link to="/manager/menu" onClick={onClose}> <FiMenu size={20} /> Menu Management</Link></li>
          <li><Link to="/manager/tables" onClick={onClose}> <FiLayout size={20} /> Table Management</Link></li>
          <li><Link to="/manager/feedback" onClick={onClose}><FiMessageSquare size={20} /> Feedback</Link></li>
        </ul>
      </div>
    </>
  );
}

export default ManagerSidebar;
