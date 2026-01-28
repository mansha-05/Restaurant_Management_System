import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../../providers/AuthProvider";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/home/login");
  };

  return (
    <nav className="navbar">
      {/* Left */}
      <div className="nav-left">
        <div className="logo-box1">
          <i className="fa-solid fa-utensils"></i>
        </div>
        <span className="brand">Food Nova</span>
      </div>

      {/* Center */}
      <div className="nav-center">
        <div className="nav-item">
          <Link to="/home">
            <i className="fa-solid fa-house"></i> Home
          </Link>
        </div>

        <div className="nav-item">
          <Link to="/home/menu">🍽 Menu</Link>
        </div>

        <div className="nav-item">
          <Link to="/home/reserve">
            <i className="fa-regular fa-calendar"></i> Reserve
          </Link>
        </div>

        <div className="nav-item">
          <Link to="/home/orders">
            <i className="fa-solid fa-box"></i> Orders
          </Link>
        </div>
      </div>

      {/* Right */}
      <div className="nav-right">
        {/* Cart */}
        <Link to="/cart" style={{ position: "relative" }}>
          🛒
          {totalQuantity > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-12px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 7px",
                fontSize: "12px",
              }}
            >
              {totalQuantity}
            </span>
          )}
        </Link>

        {/* Login OR Profile dropdown */}
        {user ? (<ProfileDropdown onLogout={handleLogout} />) : 
          (
            <Link to="/home/login" className="signin-btn">
              Sign In
            </Link>
          )}

        {/* Mobile menu button */}
        <button className="hamburger" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mobile-menu">
          <Link to="/home" className="mobile-item" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/home/menu" className="mobile-item" onClick={() => setOpen(false)}>
            Menu
          </Link>
          <Link to="/home/reserve" className="mobile-item" onClick={() => setOpen(false)}>
            Reserve
          </Link>
          <Link to="/home/orders" className="mobile-item" onClick={() => setOpen(false)}>
            Orders
          </Link>

          {user ? (
            <button className="mobile-item logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/home/login" className="mobile-item" onClick={() => setOpen(false)}>
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
