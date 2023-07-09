import React, { useEffect, useState } from "react";
import {
  chat2,
  endcall,
  fullscreen,
  logo,
  micon,
  person1,
  person2,
  person3,
  user,
  videon,
  cancel,
} from "../assets";
import { Link } from "react-router-dom";
import MeetFeeds from "./MeetFeeds";

const MeetingPage = () => {
  const [duration, setDuration] = useState(0);

  const getTime = () => {
    const d = new Date();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();

    let formattedHours = hours % 12;
    if (formattedHours === 0) {
      formattedHours = 12;
    }

    const ampm = hours >= 12 ? "PM" : "AM";

    return `${formattedHours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;
  };

  const getDate = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const d = new Date();
    const date = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();

    return `${date} ${months[month]}, ${year}`;
  };

  const [chatOpen, setChatOpen] = useState(false);

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const startTime = new Date();
    const interval = setInterval(() => {
      const currentTime = new Date();
      const elapsed = Math.floor((currentTime - startTime) / 1000);
      // Calculate elapsed seconds
      setDuration(elapsed);
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="meeting-dock bg-primary w-full h-full overflow-hidden">
      <div className="flex flex-1 flex-col h-full">
        {/* Top portion  */}

        <div className="meet-top flex-[0.05] flex items-center">
          <Link to="/">
            <img
              src={logo}
              alt="meetup"
              className="w-[90px] xs:w-[124px] xs:h-[45px]"
            />
          </Link>
          <div className="h-[80%] w-[1px] bg-dimWhite ml-5 mr-5"></div>
          <span className="text-[14px] xs:text-[16px]">Very Good Meeting</span>
          <div className="w-fit bg-[rgba(255,255,255,0.2)] px-3 py-1 ml-auto ss:ml-5 rounded-xl text-[14px] xs:text-[16px]">
            {formatTime(duration)}
          </div>
          <span className="ml-0 ss:ml-auto hidden ss:block ">
            {getTime()} | {getDate()}
          </span>
        </div>

        {/* Bottom portion */}

        <div className="flex-[0.95] flex w-full h-[89%] relative">
          {/* Bottom left portion */}

          <div
            className={`flex flex-col  ${
              chatOpen ? "w-[100%] sm:w-[80%]" : "w-[100%]"
            }`}
          >
            <div className="flex-[0.95] flex justify-center overflow-hidden ">
              <MeetFeeds />
            </div>
            {/* Meeting controls */}
            <div className="flex-[0.05] flex justify-center relative">
              <div className="meetcode absolute left-0 bottom-[50%] translate-y-[50%] bg-[#2E3137] px-4 py-2 rounded-[8px] -z-10 hidden sm:block  sm:z-10 ">
                abc-def-ghi
              </div>
              <div className="flex w-[80%] items-center justify-center">
                <div className="meet-control-icon">
                  <img src={videon}></img>
                </div>
                <div className="meet-control-icon">
                  <img src={micon}></img>
                </div>

                <div className="meet-control-icon meet-end-btn">
                  <img src={endcall}></img>
                </div>

                <div className="meet-control-icon">
                  <img src={fullscreen}></img>
                </div>
                <div className="meet-control-icon" onClick={() => toggleChat()}>
                  <img src={chat2}></img>
                </div>
              </div>
            </div>
          </div>

          {/* Meet sidebar */}
          {chatOpen && (
            <div className="meet-sidebar flex flex-col justify-between bg-[rgb(24,24,35,0.75)] backdrop-blur-[3px] sm:bg-[rgb(24,24,35)] rounded-[8px] sm:w-[400px] h-[100%] absolute sm:static">
              {/* Chat section */}
              <div className="meet-sidebar-chat  flex-[0.88] overflow-y-scroll relative">
                <div
                  className="absolute right-5 top-3 block sm:hidden"
                  onClick={() => toggleChat()}
                >
                  <img src={cancel} className="w-[25px]" />
                </div>
                <p className="text-center my-3 mx-5 underline underline-offset-8">
                  Messages
                </p>
                {/* other's merssage */}
                <div className="flex flex-col p-5 ">
                  <div className="flex">
                    <img
                      src={person2}
                      alt="name"
                      className="w-[42px] h-[42px] object-cover rounded-[5px]"
                    />
                    <div className="flex flex-col w-full ml-4">
                      <div className="flex justify-between">
                        <span className="text-dimWhite">Sam Das</span>
                        <span className="text-[rgb(131,132,138)]">
                          10:29 PM
                        </span>
                      </div>
                      <p className="bg-[rgb(0,4,15,0.5)] sm:bg-[rgb(0,4,15)] rounded-[8px] rounded-tl-none my-3 p-3">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Quisquam ullam est culpa?
                      </p>
                    </div>
                  </div>
                </div>

                {/* user's merssage */}
                <div className="flex flex-col p-5">
                  <div className="flex flex-row-reverse">
                    <img
                      src={person3}
                      alt="name"
                      className="w-[42px] h-[42px] object-cover rounded-[5px]"
                    />
                    <div className="flex flex-col w-full mr-4">
                      <div className="flex flex-row-reverse justify-between">
                        <span className="text-dimWhite">You</span>
                        <span className="text-[rgb(131,132,138)]">
                          10:29 PM
                        </span>
                      </div>
                      <p className="bg-[rgb(0,4,15,0.5)] sm:bg-[rgb(0,4,15)] rounded-[8px] rounded-tr-none my-3 p-3">
                        Lorem, ipsum dolor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Send message */}
              <div className="flex-[0.1] px-5 w-full mt-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className=" px-3 py-2 bg-[rgb(0,4,15)] rounded-[8px] rounded-tr-none rounded-br-none w-[80%]"
                />
                <button className="px-3 py-2 bg-[rgb(0,209,205)] rounded-[8px] rounded-tl-none rounded-bl-none w-[20%] overflow-hidden">
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingPage;
