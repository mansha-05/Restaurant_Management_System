import { useState, useRef, useEffect } from "react";
import "./ProfileDropdown.css";
const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="profile-wrapper" ref={dropdownRef}>
      <button
        className="profile-btn"
        onClick={() => setOpen((prev) => !prev)}
      >
        <i className="fa-regular fa-user"></i>

      </button>

      {open && (
        <div className="dropdown">
          <div className="dropdown-header">
            <strong>My Account</strong>
            <span>Customer</span>
          </div>

          <a href="/profile">Profile</a>
          <a href="/feedback">Feedback</a>
          <hr />
          <a href="/logout">Logout</a>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
