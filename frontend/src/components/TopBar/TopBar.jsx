import "./TopBar.css";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

function TopBar({ onMenuClick }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/home/login");
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        {/* Mobile menu button */}
        <button className="menu-btn" onClick={onMenuClick}>
          ☰
        </button>

        <div className="logo-box1">
          <i className="fa-solid fa-utensils"></i>
        </div>
        <span className="title-topbar">Food Nova</span>
      </div>

      <div className="topbar-right">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default TopBar;
