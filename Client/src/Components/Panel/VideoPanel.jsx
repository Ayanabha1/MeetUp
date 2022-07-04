import React, { useState, useEffect } from "react";
import {
  MdEdit,
  MdFrontHand,
  MdFullscreen,
  MdMicOff,
  MdPeople,
  MdScreenShare,
  MdVideocam,
  MdVolumeOff,
  MdVolumeUp,
} from "react-icons/md";
import "./panel.css";
import { getListItemTextUtilityClass, Grid } from "@mui/material";
import { useRef } from "react";
import { useParams } from "react-router-dom";

const Video = ({ peer }) => {
  console.log(peer);
  const ref = useRef();
  useEffect(() => {
    peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);
  return (
    <video
      ref={ref}
      className="video-container"
      style={{ width: "100%", height: "100%" }}
      autoPlay
    />
  );
};

function VideoPanel({ userVideo, peers }) {
  const [gridSpacing, setGridSpacing] = useState(12);
  const [noOfPeers, setNoOfPeers] = useState(1);
  const [time, setTime] = useState("00:43");
  const urlParams = useParams();
  const roomId = urlParams.id;

  // const getTime = () => {
  //   const d = new Date();
  //   let hr = d.getHours();
  //   let min = d.getMinutes();

  //   let timeTemp = `${hr < 10 ? "0" + hr : hr}:${min < 10 ? "0" + min : min}`;
  //   setTime(timeTemp);

  //   setInterval(() => {
  //     getTime();
  //   }, 1000);
  // };

  useEffect(() => {
    console.log(peers);
    setNoOfPeers(peers.length + 1);
  }, [peers]);

  return (
    <div className="video-panel">
      <div className="top">
        <div className="room-name">
          <p>Meet-Up Website UI</p>
          <MdEdit style={{ cursor: "pointer" }} />
        </div>
        <div className="member-count">
          <MdPeople style={{ marginRight: "4px" }} />
          <span>{noOfPeers}</span>
        </div>
      </div>

      {/* Trying some new way to deal with this layout shit ... might uncomment and use it later */}
      {/* <div className="mid">
        <Grid
          container
          style={{ height: "100%" }}
          justifyContent="center"
          spacing={1}
        >
          <Grid item xs={gridSpacing}>
            <div className="camera-container">
              <video
                ref={userVideo}
                autoPlay
                style={{
                  width: `${noOfPeers > 1 ? "100%" : "unset"}`,
                  height: `100%`,
                }}
              />
              <div className="name-tag">You</div>
            </div>
          </Grid>
          {peers.map((peer, i) => (
            <Grid item xs={gridSpacing} key={i}>
              <div className="camera-container">
                <Video peer={peer.peer} />
                <div className="name-tag">{peer.participant.name}</div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div> */}

      <div className="mid">
        <div className="mid-main-container">
          <div
            className="camera-container"
            style={{ height: `${noOfPeers > 3 ? "50%" : "100%"}` }}
          >
            <div className="video-container"></div>
            <div className="name-tag">You</div>
          </div>
          {peers?.map((peer) => (
            <div
              className="camera-container"
              style={{ height: `${noOfPeers > 3 ? "50%" : "100%"}` }}
            >
              <div className="video-container"></div>
              <div className="name-tag">{peer.participant.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bottom">
        <div className="left">
          <div className="room-info">
            <span>{time}</span>
            <span> | </span>
            <span> {roomId} </span>
          </div>
        </div>
        <div className="mid">
          <div className="meeting-controls">
            <button className="meeting-control-btn">
              <MdVolumeOff size={20} />
            </button>
            <button className="meeting-control-btn">
              <MdVideocam size={20} />
            </button>
            <button className="meeting-control-btn">
              <MdMicOff size={20} />
            </button>
            <button className="end-call">End call</button>
            <button className="meeting-control-btn">
              <MdFrontHand size={20} />
            </button>
            <button className="meeting-control-btn">
              <MdScreenShare size={20} />
            </button>
            <button className="meeting-control-btn">
              <MdFullscreen size={20} />
            </button>
          </div>
        </div>
        <div className="right">
          <button className="meeting-control-btn">
            <MdVolumeUp size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoPanel;
