import React, { useEffect } from "react";
import {
  MicOff,
  Mic,
  VideoOff,
  Video,
  LogOut,
  MessageCircle,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MeetControls = ({
  toggleChat,
  tracks,
  channelRef,
  uid,
  toggleParticipants,
}) => {
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

  const controls = [
    {
      name: "mic",
      iconOn: Mic,
      iconOff: MicOff,
      action: toggleMicrophone,
      state: microphoneOn,
    },
    {
      name: "video",
      iconOn: Video,
      iconOff: VideoOff,
      action: toggleCamera,
      state: cameraOn,
    },
    {
      name: "chat",
      iconOn: MessageCircle,
      iconOff: MessageCircle,
      action: toggleChat,
      state: true,
    },
    {
      name: "participants",
      iconOn: Users,
      iconOff: Users,
      action: toggleParticipants,
      state: true,
    },
    {
      name: "leave",
      iconOn: LogOut,
      iconOff: LogOut,
      action: leaveRoom,
      state: true,
    },
  ];

  return (
    <div className="rounded-xl p-3 xs:backdrop-blur-[5px] bg-[rgb(246,246,246)] bg-opacity-20 xs:bg-black xs:bg-opacity-[8%]  border border-[rgba(255,255,255,0.25)] w-full xs:w-fit flex gap-2 justify-center z-[15] ">
      {controls?.map((control, i) => (
        <button
          key={i}
          className={`p-2 rounded-full bg-[rgba(255,255,255,0.3)] backdrop-blur-[8px] transition-all duration-300 ${
            !control.state && "bg-[rgb(217,84,58)_!important]"
          }`}
          onClick={control?.action}
        >
          {control?.state ? (
            <control.iconOn className="h-9 w-9 rounded-full bg-transparent" />
          ) : (
            <control.iconOff className="h-9 w-9 rounded-full bg-transparent" />
          )}
        </button>
      ))}
    </div>
  );
};

export default MeetControls;
