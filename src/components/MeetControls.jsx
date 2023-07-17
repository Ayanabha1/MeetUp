import React, { useEffect } from "react";
import {
  chat2,
  endcall,
  fullscreen,
  micoff,
  micon,
  videoff,
  videon,
} from "../assets";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MeetControls = ({ toggleChat, tracks, channelRef, uid }) => {
  const [microphoneOn, setMicrophoneOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();
  const urlParams = useParams();

  useEffect(() => {
    setRoomId(urlParams?.roomId);
  }, [urlParams]);

  const toggleCamera = async () => {
    if (tracks[1].muted) {
      await tracks[1].setMuted(false);
      setCameraOn(true);
    } else {
      await tracks[1].setMuted(true);
      setCameraOn(false);
    }
  };

  const toggleMicrophone = async () => {
    if (tracks[0].muted) {
      await tracks[0].setMuted(false);
      setMicrophoneOn(true);
    } else {
      await tracks[0].setMuted(true);
      setMicrophoneOn(false);
    }
  };

  const leaveRoom = async (e) => {
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].close();
      tracks[i].stop();
    }
    navigate("/");
  };

  return (
    <div className="flex-[0.05] flex justify-center relative">
      <div className="meetcode absolute left-0 bottom-[50%] translate-y-[50%] bg-[#2E3137] px-4 py-2 rounded-[8px] -z-10 hidden sm:block  sm:z-10 ">
        Room Id : {roomId}
      </div>
      <div className="flex w-[80%] items-center justify-center">
        <div
          className={`meet-control-icon ${
            !cameraOn && "meet-control-icon-off"
          } `}
          onClick={() => toggleCamera()}
        >
          <img src={cameraOn ? videon : videoff}></img>
        </div>
        <div
          className={`meet-control-icon ${
            !microphoneOn && "meet-control-icon-off"
          } `}
          onClick={() => toggleMicrophone()}
        >
          <img src={microphoneOn ? micon : micoff}></img>
        </div>

        <div
          className="meet-control-icon meet-end-btn"
          onClick={() => leaveRoom()}
        >
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
  );
};

export default MeetControls;
