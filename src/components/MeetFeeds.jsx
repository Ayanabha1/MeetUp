import React, { useEffect, useRef, useState } from "react";

import { AgoraVideoPlayer } from "agora-rtc-react";
import { micoff, person1, person2, user } from "../assets";

const MeetFeeds = ({ tracks, participants, memberDetails, name }) => {
  const getParticipantName = (uid) => {
    const target = memberDetails?.filter((m) => m.uid === uid)[0];
    return target?.name;
  };

  useEffect(() => {
    console.log(memberDetails);
  }, [memberDetails]);

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
        (!tracks[1].muted ? (
          <div
            className={`min-w-[150px] max-w-[470px] sm:w-[48%] object-contain rounded-[7px] overflow-hidden relative`}
          >
            <AgoraVideoPlayer
              videoTrack={tracks[1]}
              className="h-full w-full"
            />
            {tracks[0].muted && (
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
            {tracks[0].muted && (
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

export default MeetFeeds;
