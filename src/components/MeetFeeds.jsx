import React, { useEffect, useRef, useState } from "react";
import { useDataLayerValue } from "../Datalayer/DataLayer";

const MeetFeeds = () => {
  const { showError } = useDataLayerValue();
  const videoRef = useRef(null);
  const getLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      showError(err);
    }
  };

  useEffect(() => {
    // getLocalStream();
  }, []);

  return (
    <div className="flex justify-center flex-wrap gap-[30px] h-[95%] w-[100%] overflow-hidden mr-[10px]">
      {/* <video
        className={`min-w-[150px] max-w-[470px] sm:w-[48%] object-contain h-[${height}]`}
        ref={videoRef}
        autoPlay
        playsInline
      /> */}
    </div>
  );
};

export default MeetFeeds;
