import React, { useEffect, useState } from "react";
import { AgoraVideoPlayer } from "agora-rtc-react";
import { Clock10, Link } from "lucide-react";
import { MeetingOverlay } from "./MeetingOverlay";
import { useDataLayerValue } from "../Datalayer/DataLayer";

const SpotLightFeedBigScreen = ({
  videoTrack,
  videoMuted,
  image,
  name,
  self,
}) => {
  if (!videoMuted && videoTrack) {
    return (
      <>
        <AgoraVideoPlayer videoTrack={videoTrack} className="h-full w-full" />
        <span className="absolute flex items-center gap-2 left-[10px] bottom-[20px] text-black font-semibold bg-[rgba(255,255,255,0.3)]  px-[12px] py-[3px] rounded-[8px] text-lg">
          {/* {tracks && tracks[0]?.muted && (
          <img
            className="bg-[rgb(217,84,58)] w-[25px] h-[25px] p-[5px] rounded-[50%]"
            src={micoff}
          />
        )} */}
          {name} {self && "(You)"}
        </span>{" "}
      </>
    );
  } else {
    return (
      <>
        <div className="flex h-full w-full justify-center items-center">
          <img
            src={image ? image : profile}
            className="min-w-[150px] min-h-[150px] max-h-[250px] max-w-[250px] h-[25vh] w-[25vh] object-cover rounded-[50%]"
          />
        </div>
        <span className="absolute flex items-center gap-2 left-[10px] bottom-[20px] text-black font-semibold bg-[rgba(255,255,255,0.3)]  px-[12px] py-[3px] rounded-[8px] text-lg">
          {/* {tracks && tracks[0]?.muted && (
          <img
            className="bg-[rgb(217,84,58)] w-[25px] h-[25px] p-[5px] rounded-[50%]"
            src={micoff}
          />
        )} */}
          {name} {self && "(You)"}
        </span>{" "}
      </>
    );
  }
};

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
  sendPoll,
  chats,
  polls,
  formatTime,
  duration,
  participantsOpen,
  toggleParticipants,
  selectPollOption,
  sendFile,
}) => {
  const { state, showSuccess, showError } = useDataLayerValue();
  const { userData } = state;
  const [spotLight, setSpotLight] = useState(null);
  const profile =
    "https://ik.imagekit.io/Ayanabha1/profile%20-%20Copy.png?updatedAt=1706025234240";
  const micoff =
    "https://ik.imagekit.io/Ayanabha1/micoff.png?updatedAt=1706031484472";

  const copyToClipboard = () => {
    try {
      const confLink = window.location;
      navigator.clipboard.writeText(confLink);
      showSuccess("Link copied to clipboard");
    } catch (err) {
      showError("Could not copy the link ... Please copy from the url bar");
    }
  };

  const changeSpotLight = (user) => {
    if (user?.uid === uid) {
      setSpotLight(null);
    } else {
      setSpotLight(user);
    }
  };

  return (
    <>
      <div
        className={`w-full h-full object-contain flex justify-center items-center bg-black rounded-[7px] overflow-hidden relative`}
      >
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

        {spotLight === null ? (
          <SpotLightFeedBigScreen
            image={userData?.profile_image || profile}
            name={userData?.name}
            self={true}
            videoMuted={tracks && tracks[1]?.muted}
            videoTrack={tracks && tracks[1]}
          />
        ) : (
          <SpotLightFeedBigScreen
            image={spotLight?.profile_image || profile}
            name={spotLight?.name}
            self={false}
            videoTrack={spotLight.videoTrack}
            videoMuted={!spotLight.videoTrack}
          />
        )}
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
        polls={polls}
        participantsOpen={participantsOpen}
        toggleParticipants={toggleParticipants}
        sendPoll={sendPoll}
        selectPollOption={selectPollOption}
        sendFile={sendFile}
        changeSpotLight={changeSpotLight}
        spotLight={spotLight}
      />
    </>
  );
};

export default RenderOnBigScreen;
