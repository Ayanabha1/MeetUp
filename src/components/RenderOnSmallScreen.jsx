import React, { useEffect, useState } from "react";
import { AgoraVideoPlayer } from "agora-rtc-react";
import MeetControls from "./MeetControls";
import { useDataLayerValue } from "../Datalayer/DataLayer";
import ParticipantsSheet from "./ParticipantsSheet";
import ChatDock from "./ChatDock";
import { Link, Clock10 } from "lucide-react";

const SpotLightFeed = ({
  videoTrack,
  videoMuted,
  image,
  formatTime,
  duration,
}) => {
  const { showError, showSuccess } = useDataLayerValue();
  const copyToClipboard = () => {
    try {
      const confLink = window.location;
      navigator.clipboard.writeText(confLink);
      showSuccess("Link copied to clipboard");
    } catch (err) {
      showError("Could not copy the link ... Please copy from the url bar");
    }
  };

  if (!videoMuted && videoTrack) {
    return (
      <div className="relative h-full w-full rounded-md overflow-hidden border-2 border-[rgba(255,255,255,0.2)] shadow-xl">
        {/* Timer */}
        <div className="absolute top-[8px] left-[10px] flex items-center  gap-2 p-4 z-[1] bg-black bg-opacity-50 rounded-xl cursor-pointer backdrop-blur-[15px] shadow-xl hover:bg-opacity-80 transition-all duration-300">
          <Clock10 className="h-4 w-4" />
          {formatTime(duration)}
        </div>
        {/* Share Link button */}
        <div
          className="absolute top-[8px] left-[140px] flex items-center  gap-2 p-4 z-[1] bg-black bg-opacity-50 rounded-xl cursor-pointer backdrop-blur-[15px] shadow-xl hover:bg-opacity-80 transition-all duration-300"
          onClick={copyToClipboard}
        >
          <Link className="h-4 w-4" />
          <span>Share Link</span>
        </div>
        <AgoraVideoPlayer videoTrack={videoTrack} className={`h-full w-full`} />
      </div>
    );
  } else {
    return (
      <div
        className={`bg-black h-full w-full object-contain flex justify-center items-center overflow-hidden relative rounded-md border-2 border-[rgba(255,255,255,0.15)] shadow-xl`}
      >
        {/* Timer */}
        <div className="absolute top-[8px] left-[10px] flex items-center  gap-2 p-4 z-[1] bg-black bg-opacity-50 rounded-xl">
          <Clock10 className="h-4 w-4" />
          {formatTime(duration)}
        </div>
        {/* Share Link button */}
        <div
          className="absolute top-[8px] left-[140px] flex items-center  gap-2 p-4 z-[1] bg-black bg-opacity-50 rounded-xl cursor-pointer"
          onClick={copyToClipboard}
        >
          <Link className="h-4 w-4" />
          <span>Share Link</span>
        </div>
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
  sendPoll,
  chats,
  polls,
  formatTime,
  duration,
  selectPollOption,
  sendFile,
}) => {
  const [spotLight, setSpotLight] = useState(null);
  const { state } = useDataLayerValue();
  const { userData } = state;
  const profile =
    "https://ik.imagekit.io/Ayanabha1/profile%20-%20Copy.png?updatedAt=1706025234240";

  const setSpotlightSlot = (user) => {
    setSpotLight(user);
  };

  return (
    <div className="flex flex-col h-[100%] w-[100%] relative">
      <div className="flex flex-col h-[90%] w-full mb-[10px]">
        <div
          className={`w-[100%] ${
            participants?.length ? "h-[70%]" : "h-[100%]"
          } relative`}
        >
          {/* pinned video */}
          {spotLight === null ? (
            <>
              <SpotLightFeed
                image={userData.profile_image || profile}
                videoTrack={tracks && tracks[1]}
                videoMuted={tracks && tracks[1]?.muted}
                formatTime={formatTime}
                duration={duration}
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
                formatTime={formatTime}
                duration={duration}
              />
              <span className="absolute right-[10px] bottom-[10px] text-black font-semibold bg-[rgba(255,255,255,0.3)] text-[12px] px-[5px] py-[2px] rounded-[5px]">
                {spotLight?.name}
              </span>
            </>
          )}
        </div>

        {/* Participants videos */}
        <div
          className={` ${
            participants?.length ? "h-[30%]" : "h-0"
          } flex mt-[10px] overflow-scroll`}
        >
          {spotLight !== null && (
            <div
              className="h-[100%] min-w-[30%] max-w-[30%] mr-2 overflow-hidden rounded-[5px] relative "
              onClick={() => setSpotlightSlot(null)}
            >
              {tracks && tracks[1] ? (
                <AgoraVideoPlayer
                  videoTrack={tracks && tracks[1]}
                  className={`h-full w-full border-2 border-[rgba(255,255,255,0.25)] shadow-xl overflow-hidden rounded-md`}
                />
              ) : (
                <div className="bg-black flex justify-center items-center h-full w-full border-2 border-[rgba(255,255,255,0.15)] shadow-xl overflow-hidden rounded-md">
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
                  className="h-[100%] min-w-[30%] max-w-[30%] mr-2 overflow-hidden rounded-[5px] relative border-2 border-[rgba(255,255,255,0.15)] shadow-xl"
                  onClick={() => setSpotlightSlot(user)}
                >
                  {user.videoTrack ? (
                    <AgoraVideoPlayer
                      videoTrack={user.videoTrack}
                      className={`h-full w-full`}
                    />
                  ) : (
                    <div className="bg-black flex justify-center items-center h-full w-full">
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
        <ChatDock
          chatOpen={chatOpen}
          toggleChat={toggleChat}
          chats={chats}
          newMessage={newMessage}
          sendMessage={sendMessage}
          handleChangeMessage={handleChangeMessage}
          uid={uid}
          sendPoll={sendPoll}
          polls={polls}
          selectPollOption={selectPollOption}
          participants={participants}
          sendFile={sendFile}
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
          spotLight={spotLight}
          changeSpotLight={setSpotlightSlot}
        />
      </div>
    </div>
  );
};

export default RenderOnSmallScreen;
