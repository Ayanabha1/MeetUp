import React from "react";
import styles from "../styles";
import GetStarted from "./GetStarted";
import { her1_new } from "../assets";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDataLayerValue } from "../Datalayer/DataLayer";

const Hero = () => {
  const [joinLink, setJoinLink] = useState("");
  const { state, showError, showWarning } = useDataLayerValue();
  const navigate = useNavigate();
  const scrollToTop = () => {
    console.log("first");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const generateRoomName = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const alphanumeric = "0123456789abcdefghijklmnopqrstuvwxyz";

    const randomChar = (characters) =>
      characters.charAt(Math.floor(Math.random() * characters.length));

    let randomString = randomChar(alphabet); // Start with an alphabet

    for (let i = 0; i < 9; i++) {
      // Append 9 more characters from the alphanumeric set
      randomString += randomChar(alphanumeric);
    }

    return randomString;
  };

  return (
    <section id="home" className={`flex md:flex-row flex-col py-6`}>
      <div
        className={`flex-1 ${styles.flexStart} z-[4]  flex-col xl:px-0 sm:px-16 px-6 py-[50px]`}
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
        </div>

        <h1 className="font-poppins font-semibold mbl:text-[46px] ss:text-[72px] text-[35px] text-white ss:leading-[100px] w-[220%]">
          Conquer Together
        </h1>
        <p className={`${styles.paragraph}   mt-5`}>
          Video Conferencing, Simplified. Elevate your online meetings with our
          seamless and engaging platform.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!state.loggedIn) {
              showWarning("User needs to be logged in");
              return;
            }
            if (joinLink !== "") {
              navigate(`/meet/${joinLink.trim()}`);
            } else {
              showWarning("Please enter room id");
            }
          }}
          className="flex flex-1 mt-10  items-center w-full mbl:flex-nowrap flex-wrap"
        >
          <input
            type="text"
            placeholder="Enter meeting name"
            className="home-input"
            id="meet-name"
            value={joinLink}
            onChange={(e) => setJoinLink(e.target.value)}
          />
          <button
            type="submit"
            className="home-create-btn font-poppin font-medium text-[16px]"
          >
            Join
          </button>
          <button
            type="button"
            className="home-create-btn font-poppin font-medium text-[16px] mx-[5px]"
            onClick={() => {
              if (!state.loggedIn) {
                showWarning("User needs to be logged in");
                return;
              }
              navigate(`/meet/${generateRoomName()}`);
            }}
          >
            Create
          </button>
        </form>
      </div>
      <div
        className={`flex-1 flex md:justify-end ${styles.flexCenter} md:mt-[0px] relative`}
      >
        <img
          src={her1_new}
          alt="hero image"
          className="w-[80%] h-[80%] relative z-[5]"
        />
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient " />
        <div className="absolute z-[0] w-[80%] h-[85%] bottom-40 rounded-full white__gradient " />
        <div className="absolute z-[0] w-[50%] h-[50%] bottom-20 right-20 blue__gradient " />
      </div>
    </section>
  );
};

export default Hero;
