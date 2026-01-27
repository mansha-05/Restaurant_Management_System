import React, { useState } from "react";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";

import "./Navbar.css";
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const totalQuantity = useSelector(
    (state) => state.cart.totalQuantity
  );

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo-box1">
          <i className="fa-solid fa-utensils"></i>
        </div>
        <span className="brand">Food Nova</span>
      </div>

      <div className="nav-center">
        <div className="nav-item">
          <Link to="/home">
            <i className="fa-solid fa-house"></i>
            Home
          </Link>
        </div>

        <div className="nav-item">
          <Link to="/home/menu">🍽 Menu</Link>
        </div>

        <div className="nav-item">
          <Link to="/home/reserve">
            <i className="fa-regular fa-calendar"></i>
            Reserve
          </Link>
        </div>

        <div className="nav-item">
          <Link to="/home/orders">
            <i className="fa-solid fa-box"></i>
            Orders
          </Link>
        </div>
      </div>



       


      <div className="nav-right">
        {/*<span className="nav-icon">🛒</span>*/}
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
                fontSize: "12px"
              }}
            >
              {totalQuantity}
            </span>
          )}
        </Link>
        {/* <span className="nav-icon"><Link to="/home/login" className="btn btn-primary">
          Login
        </Link>
        </span>
          <span className="nav-icon">
                
            <ProfileDropdown />
          </span> */}

          <span className="nav-icon"><Link className="text-secondary" to='login'><i className="fa-regular fa-user"></i></Link></span>
        <button className="hamburger" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mobile-menu">
          <a className="mobile-item">Home</a>
          <a className="mobile-item">Menu</a>
          <a className="mobile-item">Reserve</a>
          <a className="mobile-item">Orders</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
