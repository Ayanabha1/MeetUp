import React, { useEffect, useRef, useState } from "react";
import { micoff, profile } from "../assets";
import { AgoraVideoPlayer } from "agora-rtc-react";
import { Clock10 } from "lucide-react";
import { MeetingOverlay } from "./MeetingOverlay";
import { useDataLayerValue } from "../Datalayer/DataLayer";

const RenderOnBigScreen = ({
  name,
  memberDetails,
  participants,
  tracks,
  chatOpen,
  toggleChat,
  channelRef,
  uid,
  newMessage,
  handleChangeMessage,
  sendMessage,
  chats,
  formatTime,
  duration,
  participantsOpen,
  toggleParticipants,
}) => {
  const { state } = useDataLayerValue();
  const { userData } = state;
  return (
    <>
      <div
        className={`w-full h-full object-contain flex justify-center items-center bg-black rounded-[7px] overflow-hidden relative`}
      >
        {/* Timer */}
        <div className="absolute top-[8px] left-[10px] flex items-center  gap-2 p-4 z-[1] bg-black bg-opacity-50 rounded-xl">
          <Clock10 className="h-4 w-4" />
          {formatTime(duration)}
        </div>

        {tracks &&
          (!tracks[1]?.muted ? (
            <AgoraVideoPlayer
              videoTrack={tracks[1]}
              className="h-full w-full"
            />
          ) : (
            <div className="flex h-full w-full justify-center items-center">
              <img
                src={userData.profile_image ? userData.profile_image : profile}
                className="min-w-[150px] min-h-[150px] max-h-[250px] max-w-[250px] h-[25vh] w-[25vh] object-cover rounded-[50%]"
              />
            </div>
          ))}

        <span className="absolute flex items-center gap-2 left-[10px] bottom-[20px] text-black font-semibold bg-[rgba(255,255,255,0.3)]  px-[12px] py-[3px] rounded-[8px] text-lg">
          {tracks && tracks[0]?.muted && (
            <img
              className="bg-[rgb(217,84,58)] w-[25px] h-[25px] p-[5px] rounded-[50%]"
              src={micoff}
            />
          )}
          {name} (You)
        </span>
      </div>
      {/* participants video tracks */}
      <MeetingOverlay
        memberDetails={memberDetails}
        participants={participants}
        tracks={tracks}
        chatOpen={chatOpen}
        toggleChat={toggleChat}
        channelRef={channelRef}
        uid={uid}
        newMessage={newMessage}
        handleChangeMessage={handleChangeMessage}
        sendMessage={sendMessage}
        chats={chats}
        participantsOpen={participantsOpen}
        toggleParticipants={toggleParticipants}
      />
    </>
  );
};

export default RenderOnBigScreen;
