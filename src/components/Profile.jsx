import React, { useEffect, useState } from "react";
import { useDataLayerValue } from "../Datalayer/DataLayer";
import { person2 } from "../assets";
import { Api } from "../Api/Axios";

const MeetHistoryCard = ({ meeting_id, start_time }) => {
  const getDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
  };

  const formatTime = (date) => {
    const d = new Date(date);
    const hours = d.getHours();
    const minutes = d.getMinutes();

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  // const getDuration = (st, end) => {
  //   const s = new Date(st),
  //     e = new Date(end);
  //   const td = e - s;
  //   const hours = Math.floor(td / (1000 * 60 * 60));
  //   const minutes = Math.floor((td % (1000 * 60 * 60)) / (1000 * 60));
  //   if (hours > 0) {
  //     return `${hours} hrs ${minutes} mins`;
  //   }
  //   return `${minutes} mins`;
  // };

  return (
    <div
      className="flex gap-[2px] w-full  bg-[rgba(255,255,255,0.1)] rounded-[5px] mt-4 p-2 justify-between px-3 border-[1px] border-[rgba(255,255,255,0.05)] "
      style={{ boxShadow: "1px 1px 10px rgba(255,255,255,0.15)" }}
    >
      <div className="flex flex-col gap-[2px] text-left">
        <span>Meeting code </span>
        <span>Date </span>
        <span>Start time </span>
      </div>
      <div className="flex flex-col gap-[2px] text-right">
        <span>{meeting_id}</span>
        <span>{getDate(start_time)}</span>
        <span>{formatTime(start_time)}</span>
      </div>
    </div>
  );
};

const Profile = () => {
  const { state, showError, startLoading, stopLoading } = useDataLayerValue();
  const { userData } = state;
  const [meetings, setMeetings] = useState([]);
  const getMeetingHistory = async () => {
    startLoading();
    await Api.get("/auth/get-meeting-history")
      .then((res) => {
        setMeetings(res.data.meetings);
      })
      .catch((err) => {
        showError(err?.response?.data?.message);
      });
    stopLoading();
  };

  useEffect(() => {
    getMeetingHistory();
  }, []);

  return (
    <div className="bg-[rgba(0,4,15)] w-[100vw] h-[100vh] overflow-scroll flex flex-col items-center p-10 text-white gap-6 text-[15px] ss:text-[18px]  ">
      <div
        className="w-[300px] ss:w-[500px] overflow-hidden flex flex-col py-10 rounded-[8px] items-center gap-2 ss:gap-7"
        style={{ boxShadow: "1px 1px 10px rgba(255,255,255,0.15)" }}
      >
        <div className="">
          <img
            src={person2}
            alt=""
            className=" w-[100px] h-[100px] ss:w-[125px] ss:h-[125px] rounded-full object-cover "
          />
        </div>
        <div className="flex flex-col text-center gap-2 ss:gap-4 mb-5">
          <span>Name : {userData?.name}</span>
          <span>Email: {userData?.email}</span>
        </div>
      </div>

      <div
        className="p-5 w-[300px] ss:w-[500px] h-[65%] text-center rounded-[8px] overflow-hidden"
        style={{ boxShadow: "1px 1px 10px rgba(255,255,255,0.15)" }}
      >
        <span>
          Meetings Attended{" "}
          <span
            className="px-3 rounded-[3px] bg-[rgba(255,255,255,0.1)]"
            style={{ boxShadow: "1px 1px 10px rgba(255,255,255,0.15)" }}
          >
            {meetings?.length}
          </span>{" "}
        </span>
        <hr className="m-2 border-[rgba(255,255,255,0.25)]" />

        <div className="overflow-scroll h-[90%] relative">
          {meetings?.map((meeting, i) => (
            <MeetHistoryCard key={i} {...meeting} />
          ))}
          <div
            className="w-full h-[20px] sticky bottom-0"
            style={{
              background:
                "linear-gradient(rgba(0, 0, 0, 0.05) 0%,rgba(0, 0, 0, 0.75) 100%)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
