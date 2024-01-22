import React, { useEffect, useState } from "react";
import {
  micoff,
  logo,
  person1,
  person2,
  person3,
  cancel,
  profile,
} from "../assets";
import { AgoraVideoPlayer } from "agora-rtc-react";
import MeetControls from "./MeetControls";
import ChatPortal from "./ChatPortal";

const ParticipantTracks = ({
  tracks,
  participants,
  memberDetails,
  toggleChat,
  channelRef,
  uid,
}) => {
  return (
    <div className="absolute top-0 right-0 h-[98%] min-w-[25vw]  p-2 flex flex-col gap-1">
      {/* More participants */}
      {participants?.map((participant, i) => {
        if (i >= 3) return null;
        return (
          <>
            <div
              className={`w-full h-[33%] rounded-xl overflow-hidden relative border-2 border-[rgba(255,255,255,0.5)]`}
              key={i}
            >
              {participant?.videoTrack ? (
                <AgoraVideoPlayer
                  videoTrack={participant.videoTrack}
                  key={participant.uid}
                  className={`h-full w-full`}
                />
              ) : (
                <div className="bg-black flex justify-center items-center w-full h-full">
                  <img
                    src={participant?.profile_image || profile}
                    className="w-[10vh] h-[10vh] object-cover rounded-[50%]"
                  />
                </div>
              )}
              {participant?.mic__muted && (
                <img
                  className="absolute left-[10px] bottom-[10px] z-50 bg-[rgb(217,84,58)] w-[30px] h-[30px] p-[5px] rounded-[50%]"
                  src={micoff}
                />
              )}
              <span className="absolute left-[10px] bottom-[10px] text-black font-semibold bg-[rgba(255,255,255,0.3)]  px-[12px] py-[2px] rounded-[8px]">
                {participant?.name}
              </span>
            </div>
          </>
        );
      })}
      {participants?.length > 3 && (
        <div className="w-full bg-black bg-opacity-[40%] rounded-3xl py-2 px-3">
          <div className="flex h-full items-center gap-1">
            {participants?.map((participant, i) => {
              if (i >= 3 && i <= 7) {
                return (
                  <>
                    <div
                      className={`h-[45px] w-[45px] border border-[rgba(255,255,255,0.3)] rounded-full overflow-hidden`}
                    >
                      <img
                        src={participant?.profile_image || profile}
                        className="w-full h-full"
                      />
                    </div>
                  </>
                );
              }
              return null;
            })}
            {participants?.length > 8 && (
              <div
                className={`h-[45px] w-[45px] border bg-[rgba(255,255,255,0.3)] rounded-full overflow-hidden flex items-center justify-center`}
              >
                +{participants?.length - 8}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const MeetingOverlay = ({
  tracks,
  participants,
  memberDetails,
  channelRef,
  uid,
  chats,
  toggleChat,
  chatOpen,
  newMessage,
  handleChangeMessage,
  sendMessage,
}) => {
  return (
    <div className=" absolute top-0 left-0 w-full h-full flex transition-all duration-300">
      {/* Left portion: Controls */}
      <div className="flex flex-col flex-[0.8] flex-grow  justify-end items-center pb-[20px] relative transition-all duration-300">
        <MeetControls
          toggleChat={toggleChat}
          tracks={tracks}
          channelRef={channelRef}
          uid={uid}
        />
        <ParticipantTracks
          tracks={tracks}
          channelRef={channelRef}
          memberDetails={memberDetails}
          participants={participants}
          toggleChat={toggleChat}
          uid={uid}
        />
      </div>

      {/* Chat section */}
      <div
        className={`${
          chatOpen ? "sm:w-[400px]" : "sm:w-[0px]"
        } h-full transition-all duration-300 pb-[30px] absolute z-50 w-[94%] left-[50%] translate-x-[-50%] sm:left-[unset] sm:translate-x-[unset] sm:static`}
      >
        <ChatPortal
          chatOpen={chatOpen}
          toggleChat={toggleChat}
          chats={chats}
          newMessage={newMessage}
          sendMessage={sendMessage}
          handleChangeMessage={handleChangeMessage}
          uid={uid}
        />
      </div>
    </div>
  );
};
