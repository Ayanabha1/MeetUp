import React, { useState } from "react";
import { logo, menu, close, profile, down } from "../assets";
import { navLinks } from "../constants";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [profileToggle, setProfileToggle] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="w-full flex py-6 justify-between items-center mavbar z-50">
      <Link to="/">
        <img src={logo} alt="meetup" className="w-[124px] h-[45px]" />
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
      {loggedIn ? (
        <div
          className="relative sm:flex hidden items-center font-poppins font-medium cursor-pointer text-[18px] text-white ml-10 rounded-md "
          onClick={() => setProfileToggle(!profileToggle)}
        >
          <img src={profile} alt="" className="w-[25px] mr-2" />
          <span className="text-gradient">Ayanabha</span>
          <img
            src={down}
            alt=""
            className={`w-[20px] h-[25px] ml-2 ${
              profileToggle && "rotate-180"
            }`}
          />
          {profileToggle && (
            <ul className="absolute right-0 top-10 sm:block hidden bg-[rgba(255,255,255,0.05)] rounded-md z-[1] overflow-hidden">
              <li className="menu-options-item font-poppins font-normal cursor-pointer text-[16px] text-white mb-1">
                Profile
              </li>
              <li className="menu-options-item font-poppins font-normal cursor-pointer text-[16px] text-white ">
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
          } p-6 mx-4 min-w-[140px] w-[95vw] rounded-xl sidebar z-5 `}
        >
          <ul className="list-none flex-col  flex-1">
            {navLinks.map((nav, i) => (
              <li
                key={i}
                className={`font-poppins font-normal cursor-pointer  text-white text-center`}
                onClick={() => setToggle(false)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
            {loggedIn ? (
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
