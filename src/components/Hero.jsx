import React from "react";
import styles from "../styles";
import GetStarted from "./GetStarted";
import { hero, hero2 } from "../assets";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const scrollToTop = () => {
    console.log("first");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <section id="home" className={`flex md:flex-row flex-col py-6`}>
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 py-[50px]`}
      >
        <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2 text-white">
          <p className={`${styles.paragraph}`}>
            <span>Unite and Thrive, with </span>
            <span className="text-white">Meetup's </span>
            <span>Virtual Hive</span>
          </p>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold mbl:text-[46px] ss:text-[72px] text-[35px]  text-white ss:leading-[100px]">
            Connect
            <br />
            <span className="text-gradient">Collaborate</span>
            <br className="sm:block hidden" />
          </h1>
          {/* <div className="ss:flex hidden mr-0">
            <label htmlFor="meet-name">
              <GetStarted />
            </label>
          </div> */}
        </div>

        <h1 className="font-poppins font-semibold mbl:text-[46px] ss:text-[72px] text-[35px] text-white ss:leading-[100px] w-full">
          Conquer Together
        </h1>
        <p className={`${styles.paragraph}   mt-5`}>
          Video Conferencing, Simplified. Elevate your online meetings with our
          seamless and engaging platform.
        </p>
        <div className="flex flex-1 mt-10 ss:w-[500px]  w-full mbl:flex-nowrap flex-wrap">
          <input
            type="text"
            placeholder="Enter meeting name"
            className="home-input"
            id="meet-name"
          />
          <button
            className="home-create-btn font-poppin font-medium text-[16px]"
            onClick={() => {
              navigate("/meet");
            }}
          >
            Connect
          </button>
        </div>
      </div>
      <div
        className={`flex-1 flex md:justify-end ${styles.flexCenter} md:mt-[0px] relative`}
      >
        <img
          src={hero2}
          alt="hero image"
          className="w-[80%] h-[80%] relative z-[5]"
        />
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient " />
        <div className="absolute z-[0] w-[80%] h-[85%] bottom-40 rounded-full white__gradient " />
        <div className="absolute z-[0] w-[50%] h-[50%] bottom-20 right-20 blue__gradient " />
      </div>

      {/* <div
        className={`ss:hidden ${styles.flexCenter}`}
        onClick={() => scrollToTop()}
      >
        <GetStarted />
      </div> */}
    </section>
  );
};

export default Hero;
