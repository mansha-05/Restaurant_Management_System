import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import "./ProfileDropdown.css";

export default function ProfileDropdown({ onLogout }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="profile-wrapper" ref={ref}>
      <div className="profile-icon" onClick={() => setOpen(!open)}>
        <i className="fa-regular fa-user"></i>
      </div>

      {open && (
        <div className="profile-dropdown">
          <div className="profile-header">
            <div className="profile-title">My Account</div>
            <div className="profile-role">{user?.role?.toLowerCase()}</div>
          </div>

          <div
            className="profile-item"
            onClick={() => {
              navigate("/home/profile");
              setOpen(false);
            }}
          >
            <i className="fa-regular fa-user"></i>
            Profile
          </div>

          <div
            className="profile-item"
            onClick={() => {
              navigate("/home/feedback");
              setOpen(false);
            }}
          >
            <i className="fa-regular fa-comment"></i>
            Feedback
          </div>

          <div
            className="profile-item logout"
            onClick={() => {
              onLogout();
              setOpen(false);
            }}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            Logout
          </div>
        </div>
      )}
    </div>
  );
}
