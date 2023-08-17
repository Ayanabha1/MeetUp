import React, { useEffect, useRef, useState } from "react";

import { AgoraVideoPlayer } from "agora-rtc-react";
import { micoff, person1, person2, user } from "../assets";

const RenderOnBigScreen = ({ tracks, participants, memberDetails, name }) => {
  const getParticipantName = (uid) => {
    const target = memberDetails?.filter((m) => m.uid === uid)[0];
    return target?.name;
  };

  return (
    <div className="flex justify-center flex-wrap gap-[30px] h-[95%] w-[100%] overflow-hidden mr-[10px]">
      {participants?.map((participant) => {
        if (participant.videoTrack) {
          return (
            <>
              <div
                className={`min-w-[150px] max-w-[470px] sm:w-[48%] object-contain rounded-[7px] overflow-hidden relative`}
              >
                <AgoraVideoPlayer
                  videoTrack={participant.videoTrack}
                  key={participant.uid}
                  className={`h-full w-full`}
                />
                {memberDetails.mic__muted && (
                  <img
                    className="absolute left-[10px] bottom-[10px] z-50 bg-[#FC5E5C] w-[30px] h-[30px] p-[5px] rounded-[50%]"
                    src={micoff}
                  />
                )}
                <span className="absolute right-[10px] bottom-[10px] text-black font-semibold bg-[rgba(255,255,255,0.3)]  px-[12px] py-[2px] rounded-[8px]">
                  {getParticipantName(participant.uid)}
                </span>
              </div>
            </>
          );
        } else {
          return (
            <div
              className={`min-w-[150px] max-w-[470px] sm:w-[48%] object-contain flex justify-center items-center bg-black rounded-[7px] overflow-hidden relative`}
            >
              <img
                src={person1}
                className="w-[25%] h-[25%] object-cover rounded-[50%]"
              />
              {memberDetails.mic__muted && (
                <img
                  className="absolute left-[10px] bottom-[10px] z-50 bg-[#FC5E5C] w-[30px] h-[30px] p-[5px] rounded-[50%]"
                  src={micoff}
                />
              )}
              <span className="absolute right-[10px] bottom-[10px] text-black font-semibold bg-[rgba(255,255,255,0.3)]  px-[12px] py-[2px] rounded-[8px]">
                {getParticipantName(participant.uid)}
              </span>
            </div>
          );
        }
      })}

      {tracks &&
        (!tracks[1]?.muted ? (
          <div
            className={`min-w-[150px] max-w-[470px] sm:w-[48%] object-contain rounded-[7px] overflow-hidden relative`}
          >
            <AgoraVideoPlayer
              videoTrack={tracks[1]}
              className="h-full w-full"
            />
            {tracks[0]?.muted && (
              <img
                className="absolute left-[10px] bottom-[10px] z-50 bg-[#FC5E5C] w-[30px] h-[30px] p-[5px] rounded-[50%]"
                src={micoff}
              />
            )}
            <span className="absolute right-[10px] bottom-[10px]  text-black font-semibold bg-[rgba(255,255,255,0.3)]  px-[12px] py-[2px] rounded-[8px]">
              {name} (You)
            </span>
          </div>
        ) : (
          <div
            className={`min-w-[150px] max-w-[470px] sm:w-[48%] object-contain flex justify-center items-center bg-black rounded-[7px] overflow-hidden relative`}
          >
            <img
              src={person2}
              className="w-[25%] h-[25%] object-cover rounded-[50%]"
            />
            {tracks[0]?.muted && (
              <img
                className="absolute left-[10px] bottom-[10px] z-50 bg-[#FC5E5C] w-[30px] h-[30px] p-[5px] rounded-[50%]"
                src={micoff}
              />
            )}
            <span className="absolute right-[10px] bottom-[10px] text-black font-semibold bg-[rgba(255,255,255,0.3)]  px-[12px] py-[2px] rounded-[8px]">
              {name} (You)
            </span>
          </div>
        ))}
    </div>
  );
};

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

const RenderOnSmallScreen = ({ tracks, participants, memberDetails, name }) => {
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
    <div className="flex flex-col h-[95%] w-[100%] ">
      <div className={`meet-spotlight w-[100%] h-[70%] relative`}>
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
      <div className={`meet-others h-[30%] flex mt-[20px] overflow-scroll`}>
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
  );
};

const MeetFeeds = ({ tracks, participants, memberDetails, name }) => {
  if (window.innerWidth >= 500) {
    return (
      <RenderOnBigScreen
        tracks={tracks}
        participants={participants}
        memberDetails={memberDetails}
        name={name}
      />
    );
  } else {
    return (
      <RenderOnSmallScreen
        tracks={tracks}
        participants={participants}
        memberDetails={memberDetails}
        name={name}
      />
    );
  }
};

export default MeetFeeds;
