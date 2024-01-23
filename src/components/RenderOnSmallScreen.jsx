import React, { useEffect, useState } from "react";
import { AgoraVideoPlayer } from "agora-rtc-react";
import MeetControls from "./MeetControls";
import ChatPortal from "./ChatPortal";
import { useDataLayerValue } from "../Datalayer/DataLayer";
import ParticipantsSheet from "./ParticipantsSheet";

const SpotLightFeed = ({ videoTrack, videoMuted, image }) => {
  if (!videoMuted && videoTrack) {
    return (
      <AgoraVideoPlayer videoTrack={videoTrack} className={`h-full w-full`} />
    );
  } else {
    return (
      <div
        className={`bg-black h-full w-full object-contain flex justify-center items-center overflow-hidden`}
      >
        <img
          src={image}
          className="w-[15vh] h-[15vh] object-cover rounded-[50%]"
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
  participantsOpen,
  toggleChat,
  toggleParticipants,
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
  const { state } = useDataLayerValue();
  const { userData } = state;
  const profile =
    "https://ik.imagekit.io/Ayanabha1/profile%20-%20Copy.png?updatedAt=1706025234240";

  const setSpotlightSlot = (user) => {
    setSpotLight(user);
  };

  useEffect(() => {
    setPeople(participants.size);
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
                image={userData.profile_image || profile}
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
                image={spotLight?.profile_image || profile}
                videoTrack={spotLight.videoTrack}
                videoMuted={!spotLight.videoTrack}
              />
              <span className="absolute right-[10px] bottom-[10px] text-black font-semibold bg-[rgba(255,255,255,0.3)] text-[12px] px-[5px] py-[2px] rounded-[5px]">
                {spotLight?.name}
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
              {tracks ? (
                <AgoraVideoPlayer
                  videoTrack={tracks && tracks[1]}
                  className={`h-full w-full`}
                />
              ) : (
                <div className="bg-black flex justify-center items-center h-full w-full">
                  <img
                    src={userData?.profile_image || profile}
                    className="w-[25%] h-[25%] object-cover rounded-[50%]"
                  />
                </div>
              )}
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
                  {user.videoTrack ? (
                    <AgoraVideoPlayer
                      videoTrack={user.videoTrack}
                      className={`h-full w-full`}
                    />
                  ) : (
                    <div className="bg-black  flex justify-center items-center h-full w-full">
                      <img
                        src={user?.profile_image || profile}
                        className="w-[7vh] h-[7vh] object-cover rounded-[50%]"
                      />
                    </div>
                  )}
                  <span className="absolute right-[10px] bottom-[10px] text-black font-semibold bg-[rgba(255,255,255,0.3)] text-[12px] px-[5px] py-[2px] rounded-[5px]">
                    {user?.name}
                  </span>
                </div>
              )
          )}
        </div>
      </div>

      {/* Controls */}
      <MeetControls
        channelRef={channelRef}
        toggleParticipants={toggleParticipants}
        toggleChat={toggleChat}
        tracks={tracks}
        uid={uid}
      />

      {/* Chat section */}
      <div
        className={`absolute left-0 w-full  ${
          chatOpen ? "z-[20] h-[95%]" : "z-[-10] h-0"
        } transition-all duration-300`}
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

      {/* Participants section */}
      <div
        className={`absolute left-0 w-full  ${
          participantsOpen ? "z-[20] h-[95%]" : "z-[-10] h-0"
        } transition-all duration-300`}
      >
        <ParticipantsSheet
          participants={participants}
          toggleParticipants={toggleParticipants}
          participantsOpen={participantsOpen}
          uid={uid}
        />
      </div>
    </div>
  );
};

export default RenderOnSmallScreen;
