import "./TopBar.css";

function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="logo-box1">
          <i className="fa-solid fa-utensils"></i>
        </div>
        <span className="title-topbar">Food Nova</span>
      </div>

      <div className="topbar-right">
        <i className="fa-regular fa-user"></i>
      </div>
    </div>
  );
}

export default TopBar
