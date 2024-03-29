import React, { useEffect, useState } from "react";
import { navLinks } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import { useDataLayerValue } from "../Datalayer/DataLayer";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [profileToggle, setProfileToggle] = useState(false);
  const { state, logoutFunc } = useDataLayerValue();
  const navigate = useNavigate();
  const profile =
    "https://ik.imagekit.io/Ayanabha1/profile%20-%20Copy.png?updatedAt=1706025234240";
  const down =
    "https://ik.imagekit.io/Ayanabha1/down.png?updatedAt=1706025827496";
  const menu =
    "https://ik.imagekit.io/Ayanabha1/menu.svg?updatedAt=1706025907074";
  const close =
    "https://ik.imagekit.io/Ayanabha1/close.png?updatedAt=1706025992615";
  const handleLogoutClick = () => {
    logoutFunc();
  };

  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [toggle]);

  return (
    <nav className="w-full flex py-6 justify-between items-center mavbar z-50">
      <Link to="/">
        <img
          loading="lazy"
          src="https://ik.imagekit.io/Ayanabha1/logo%20-%20Copy.png?updatedAt=1706025236906"
          alt="meetup"
          className="w-[124px] h-[45px]"
        />
      </Link>
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, i) => (
          <li
            key={i}
            className={`font-poppins font-normal cursor-pointer text-[18px] text-white ${
              i === navLinks.length - 1 ? "mr-0" : "mr-10"
            }`}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>
      {state.loggedIn ? (
        <div
          className="relative sm:flex hidden items-center font-poppins font-medium cursor-pointer text-[18px] text-white ml-10 rounded-md "
          onClick={() => setProfileToggle(!profileToggle)}
        >
          <img
            src={
              state?.userData?.profile_image
                ? state?.userData?.profile_image
                : profile
            }
            alt=""
            className="w-[35px] h-[35px] object-cover mr-2 rounded-full"
          />
          <span className="text-gradient">{state?.userData?.name}</span>
          <img
            src={down}
            alt=""
            className={`w-[20px] h-[25px] ml-2 ${
              profileToggle && "rotate-180"
            }`}
          />
          {profileToggle && (
            <ul className="absolute right-0 top-10 sm:block hidden bg-[rgba(255,255,255,0.05)] shadow-2xl rounded-md z-[1] overflow-hidden">
              <li
                className="menu-options-item font-poppins font-normal cursor-pointer text-[16px] text-white mb-1"
                onClick={() => navigate("profile")}
              >
                Profile
              </li>
              <li
                className="menu-options-item font-poppins font-normal cursor-pointer text-[16px] text-white "
                onClick={() => handleLogoutClick()}
              >
                Logout
              </li>
            </ul>
          )}
        </div>
      ) : (
        <div className="relative sm:flex hidden items-center font-poppins font-normal  text-[18px] text-white ml-10 rounded-md ">
          <span
            className="mr-10 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
          <span
            className="text-gradient font-medium cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </div>
      )}

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="h-[28px] w-[28px] object-contain z-50"
          onClick={() => {
            setToggle((prev) => !prev);
          }}
        />
        <div
          className={`${
            toggle ? "flex" : "hidden"
          } p-5 mx-4 min-w-[140px] w-[95vw] rounded-xl sidebar z-5 `}
        >
          <ul className="list-none flex-col  flex-1 ">
            {navLinks.map((nav, i) => (
              <li
                key={i}
                className={`font-poppins font-normal cursor-pointer  text-white text-center`}
                onClick={() => setToggle(false)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
            {state.loggedIn ? (
              <li
                className="font-poppins font-semibold cursor-pointer text-center text-gradient"
                onClick={() => navigate("/profile")}
              >
                My profile
              </li>
            ) : (
              <>
                <li
                  className="font-poppins font-semibold cursor-pointer text-center text-white"
                  onClick={() => navigate("/login")}
                >
                  Login
                </li>
                <li
                  className="font-poppins font-semibold cursor-pointer text-center text-gradient"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
