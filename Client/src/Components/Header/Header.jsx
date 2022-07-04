import React, { useState } from "react";
import { useDataLayerValue } from "../../Datalayer/DataLayer";
import "./header.css";
import { BiUserCircle } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";
import userImage from "./Resources/user.png";

function Header() {
  const [{ loginModalOpen, loggedIn, user, googleLoggedIn }, dispatch] =
    useDataLayerValue();
  const [openOptions, setOpenOptions] = useState(false);
  const logOutFunc = () => {
    dispatch({
      type: "SET_LOGIN_STATUS",
      loggedIn: false,
    });
    dispatch({
      type: "SET_GOOGLE_LOGGEDIN",
      googleLoggedIn: false,
    });
    dispatch({
      type: "SET_USER_DETAILS",
      user: {},
    });

    localStorage.removeItem("AUTH_TOKEN");
  };
  return (
    <nav className="header">
      <div className="navbar-container">
        <div className="nav-left">Meet-Up</div>
        <div className="nav-right">
          {!loggedIn ? (
            <>
              <button
                className="nav-btn"
                onClick={() => {
                  dispatch({
                    type: "SET_LOGIN_MODAL_OPEN",
                    loginModalOpen: true,
                  });
                }}
              >
                Login
              </button>
              <button
                className="nav-btn"
                onClick={() => {
                  dispatch({
                    type: "SET_SIGNUP_MODAL_OPEN",
                    signUpModalOpen: true,
                  });
                }}
              >
                SignUp
              </button>
            </>
          ) : (
            <>
              <div
                className={`user-details-container ${
                  openOptions && "user-details-container-open"
                }`}
                onClick={() => setOpenOptions(!openOptions)}
              >
                <img
                  src={user.picture || userImage}
                  alt=""
                  className="user-header-pic"
                />
                {user?.name}
                <FiChevronDown
                  size={20}
                  style={{
                    marginLeft: "5px",
                    transition: "all 250ms",
                    transform: `${
                      openOptions ? "rotate(180deg)" : "rotate(0deg)"
                    }`,
                  }}
                />
                <div
                  className={`user-details-ops ${
                    openOptions && "user-details-ops-open"
                  }`}
                >
                  {googleLoggedIn === false && loggedIn && (
                    <button>Edit</button>
                  )}
                  <button onClick={() => logOutFunc()}>Logout</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
