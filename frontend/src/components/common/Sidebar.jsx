import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiGrid,
  FiShoppingCart,
  FiCalendar,
  FiMenu,
  FiInbox,
  FiMessageSquare,
  FiLayout
} from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/manager/dashboard', icon: <FiGrid size={20} /> },
    { id: 'orders', label: 'Orders', path: '/manager/orders', icon: <FiShoppingCart size={20} /> },
    { id: 'reservations', label: 'Reservations', path: '/manager/reservations', icon: <FiCalendar size={20} /> },
    { id: 'menu', label: 'Menu Management', path: '/manager/menu', icon: <FiMenu size={20} /> },
    { id: 'tables', label: 'Table Management', path: '/manager/tables', icon: <FiLayout size={20} /> },
    { id: 'feedback', label: 'Feedback', path: '/manager/feedback', icon: <FiMessageSquare size={20} /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <FiLayout size={24} color="white" />
        </div>
        <span>Manager Panel</span>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;