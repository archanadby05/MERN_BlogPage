import React, { useContext, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const User = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCreatePost = () => {
    if (user) {
      history.push("/create");
    } else {
      dispatch({ type: "LOGIN_SUCCESS", payload: "userToken" });
      history.push("/create");
    }
  };



  return (
    <div className="user-dropdown">
      <button onClick={toggleDropdown}>
        <IoSettingsOutline className="icon" />
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <div className="dropdown-item" onClick={handleCreatePost}>
            Create Post
          </div>
          <Link to="/login">
            <div className="dropdown-item">Log In</div>
          </Link>
          <Link to="/register">
            <div className="dropdown-item">Register</div>
          </Link>
          <div className="dropdown-item" style={{ color: "gray", cursor: "default" }}>
            Log Out (inactive)
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
