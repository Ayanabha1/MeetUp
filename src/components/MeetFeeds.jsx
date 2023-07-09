import React from "react";

const Video = () => {
  return (
    <div className="min-w-[150px] max-w-[470px] sm:w-[48%] bg-white"></div>
  );
};

const MeetFeeds = () => {
  return (
    <div className="flex justify-center flex-wrap gap-[30px] h-[95%] w-[100%] overflow-hidden mr-[10px]">
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
    </div>
  );
};

export default MeetFeeds;
