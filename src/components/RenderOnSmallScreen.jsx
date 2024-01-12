import React, { useEffect, useRef, useState } from "react";

import { AgoraVideoPlayer } from "agora-rtc-react";
import { micoff, person1, person2, user } from "../assets";
import MeetControls from "./MeetControls";
import ChatPortal from "./ChatPortal";

const SpotLightFeed = ({ videoTrack, videoMuted }) => {
  if (!videoMuted && videoTrack) {
    return (
      <AgoraVideoPlayer videoTrack={videoTrack} className={`h-full w-full`} />
    );
  } else {
    return (
      <div
        className={`h-full w-full object-contain flex justify-center items-center overflow-hidden`}
      >
        <img
          src={person2}
          className="w-[25%] h-[25%] object-cover rounded-[50%]"
        />
      </div>
    );
  }
};

const RenderOnSmallScreen = ({
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
}) => {
  const [people, setPeople] = useState(1);
  const [spotLight, setSpotLight] = useState(null);

  const getParticipantName = (uid) => {
    const target = memberDetails?.filter((m) => m.uid === uid)[0];
    return target?.name;
  };

  const setSpotlightSlot = (user) => {
    setSpotLight(user);
  };

  useEffect(() => {
    setPeople(participants.size);
    console.log(participants.length);
  }, [participants]);

  return (
    <div className="flex flex-col h-[100%] w-[100%] relative">
      <div className="flex flex-col h-[90%] w-full mb-[10px]">
        <div
          className={`w-[100%] ${
            participants?.length ? "h-[70%]" : "h-[100%]"
          } relative`}
        >
          {spotLight === null ? (
            <>
              <SpotLightFeed
                videoTrack={tracks && tracks[1]}
                videoMuted={tracks && tracks[1]?.muted}
              />
              <span className="absolute right-[10px] bottom-[10px] text-black font-semibold bg-[rgba(255,255,255,0.3)] text-[12px] px-[5px] py-[2px] rounded-[5px]">
                {name} (You)
              </span>
            </>
          ) : (
            <>
              <SpotLightFeed
                videoTrack={spotLight.videoTrack}
                videoMuted={!spotLight.videoTrack}
              />
              <span className="absolute right-[10px] bottom-[10px] text-black font-semibold bg-[rgba(255,255,255,0.3)] text-[12px] px-[5px] py-[2px] rounded-[5px]">
                {getParticipantName(spotLight?.uid)}
              </span>
            </>
          )}
        </div>
        <div
          className={` ${
            participants?.length ? "h-[30%]" : "h-0"
          } flex mt-[10px] overflow-scroll`}
        >
          {spotLight !== null && (
            <div
              className="h-[100%] min-w-[30%] max-w-[30%] mr-2 overflow-hidden rounded-[5px] relative"
              onClick={() => setSpotlightSlot(null)}
            >
              <AgoraVideoPlayer
                videoTrack={tracks && tracks[1]}
                className={`h-full w-full`}
              />
              <span className="absolute right-[10px] bottom-[10px] text-black font-semibold bg-[rgba(255,255,255,0.3)] text-[12px] px-[5px] py-[2px] rounded-[5px]">
                You
              </span>
            </div>
          )}

          {participants?.map(
            (user, i) =>
              spotLight !== user && (
                <div
                  key={i}
                  className="h-[100%] min-w-[30%] max-w-[30%] mr-2 overflow-hidden rounded-[5px] relative"
                  onClick={() => setSpotlightSlot(user)}
                >
                  <AgoraVideoPlayer
                    videoTrack={user.videoTrack}
                    className={`h-full w-full`}
                  />
                  <span className="absolute right-[10px] bottom-[10px] text-black font-semibold bg-[rgba(255,255,255,0.3)] text-[12px] px-[5px] py-[2px] rounded-[5px]">
                    {getParticipantName(user?.uid)}
                  </span>
                </div>
              )
          )}
        </div>
      </div>

      {/* Controls */}
      <MeetControls
        channelRef={channelRef}
        toggleChat={toggleChat}
        tracks={tracks}
        uid={uid}
      />

      <div
        className={`absolute left-0 w-full h-[95%] ${
          chatOpen ? "z-[20]" : "z-0"
        }`}
      >
        <ChatPortal
          chatOpen={chatOpen}
          chats={chats}
          handleChangeMessage={handleChangeMessage}
          newMessage={newMessage}
          sendMessage={sendMessage}
          toggleChat={toggleChat}
          uid={uid}
        />
      </div>
    </div>
  );
};

export default RenderOnSmallScreen;
