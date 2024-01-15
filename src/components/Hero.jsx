import React from "react";
import styles from "../styles";
import { her1_new } from "../assets";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDataLayerValue } from "../Datalayer/DataLayer";
import { Reveal } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import { Api } from "../Api/Axios";

const Hero = () => {
  const [joinLink, setJoinLink] = useState("");
  const { state, showError, showWarning, startLoading, stopLoading } =
    useDataLayerValue();
  const navigate = useNavigate();

  const create_room = async () => {
    startLoading();
    if (!state.loggedIn) {
      showWarning("User needs to be logged in");
    } else {
      await Api.get("/meet/create-meeting")
        .then((res) => {
          const meeting_id = res.data.meeting_id;
          navigate(`/meet/${meeting_id}`);
        })
        .catch((err) => {
          showError("Could not create the meeting");
        });
    }

    stopLoading();
  };

  const join_room = async (e) => {
    e.preventDefault();
    startLoading();
    const trimmedLink = joinLink.trim();
    if (!state.loggedIn) {
      showWarning("User needs to be logged in");
    } else if (trimmedLink !== "") {
      await Api.post("/meet/check-meeting-exists", { meeting_id: trimmedLink })
        .then((res) => {
          navigate(`/meet/${trimmedLink}`);
        })
        .catch((err) => {
          showError("Invalid meeting id");
        });
    } else {
      showWarning("Please enter room id");
    }
    stopLoading();
  };

  const customAnimation = keyframes`
    from {
      opacity: 0;
      transform: translate3d(0px, 100px, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  `;

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
            join_room(e);
          }}
          className="flex flex-col sm:flex-row flex-1 mt-10 w-full items-center mbl:flex-nowrap flex-wrap"
        >
          <input
            type="text"
            placeholder="Enter meeting name"
            className="p-[10px] text-[16px] xs:text-[20px] w-full sm:w-[70%] bg-[rgba(255,255,255,0.15)] text-white border border-white "
            id="meet-name"
            value={joinLink}
            onChange={(e) => setJoinLink(e.target.value)}
          />
          <div className="flex w-full sm:w-[70%]">
            <div className="w-[50%]">
              <button
                type="submit"
                className="home-create-btn p-[10px] font-poppin font-medium text-[16px] xs:text-[20px] w-full  border border-white "
              >
                Join
              </button>
            </div>
            <div className="w-[50%]">
              <button
                type="button"
                className="home-create-btn p-[10px] font-poppin font-medium text-[16px] xs:text-[20px] w-full  border border-white"
                onClick={() => create_room()}
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
      <div
        className={`flex-1 flex md:justify-end ${styles.flexCenter} md:mt-[0px] relative`}
      >
        <Reveal
          triggerOnce={true}
          keyframes={customAnimation}
          delay={70}
          className="w-[80%] h-[80%] relative z-[5]"
        >
          <img
            src={her1_new}
            alt="hero image"
            className="h-full w-full xs:w-[90%]"
          />
        </Reveal>

        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient " />
        <div className="absolute z-[0] w-[80%] h-[85%] bottom-40 rounded-full white__gradient " />
        <div className="absolute z-[0] w-[50%] h-[50%] bottom-20 right-20 blue__gradient " />
      </div>
    </section>
  );
};

export default Hero;
