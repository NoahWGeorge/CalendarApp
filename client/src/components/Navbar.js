import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../css/Navbar.css";

export default function Navbar({ user, onSignOut }) {
  const navigate = useNavigate();

  // Safely get username or email
  const username =
    user?.username ||
    user?.attributes?.preferred_username ||
    user?.attributes?.email ||
    "";

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => navigate("/")}>
        <span className="navbar-logo">📅 My Calendar App</span>
      </div>
      <div className="navbar-right">
        {username && (
          <span className="navbar-username" style={{ marginRight: 2, fontWeight: 500 }}>
            Welcome, {username}
          </span>
        )}
        <button className="navbar-profile" style={{ marginRight: 18 }} onClick={() => navigate("/profile")} title="Profile">
          <FaUserCircle size={32} />
        </button>
        <button className="navbar-signout" onClick={onSignOut}>
          Sign Out
        </button>
      </div>
    </nav>
  );
}


