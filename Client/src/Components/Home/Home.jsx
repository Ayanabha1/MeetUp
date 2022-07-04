import { Button, TextField } from "@mui/material";
import Header from "../Header/Header";
import "./home.css";
import i1 from "./Resources/illstr1.png";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { useDataLayerValue } from "../../Datalayer/DataLayer";
import { Api } from "../../Api/axios";

function Home() {
  const navigate = useNavigate();
  const [newRoomId, setNewRoomId] = useState();
  const [{ loading, user, socket }, dispatch] = useDataLayerValue();
  const [targetRoomId, setTargetRoomId] = useState("");
  const newAnswerConnection = useRef();
  const newDataChannel = useRef();
  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  const createNewRoom = async () => {
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });

    let roomId;
    await Api.get("/get-new-room").then((res) => {
      roomId = res.data.roomId;
    });
    if (roomId) {
      navigate(`/conference/${roomId}`);
    }

    dispatch({
      type: "SET_LOADING",
      loading: false,
    });
  };
  const joinTargetRoom = async () => {
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });

    await Api.post("/room-exists", { roomId: targetRoomId })
      .then((res) => {
        navigate(`/conference/${targetRoomId}`);
      })
      .catch((err) => console.log(err?.response?.data?.message));

    dispatch({
      type: "SET_LOADING",
      loading: false,
    });
  };

  return (
    <div className="home">
      <Header />
      <div className="home-content-container">
        <div className="home-content-left">
          <h1>
            Get <span>more</span> productive meetings
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            aspernatur debitis, autem blanditiis nisi numquam atque facilis
            mollitia expedita corporis architecto veritatis labore! Voluptas,
            aliquid saepe?
          </p>
          <div className="home-content-inps">
            <TextField
              label="Meeting code"
              variant="outlined"
              sx={{
                "& .MuiInputLabel-root": { color: "rgb(159, 168, 178)" }, //styles the label
                "& .MuiOutlinedInput-root": {
                  "& > fieldset": {
                    borderColor: "rgb(159, 168, 178)",
                  },
                },
                input: { color: "white" },
              }}
              type="text"
              onChange={(e) => setTargetRoomId(e.target.value)}
            />
            <button onClick={() => joinTargetRoom()}>Join</button>
            <button onClick={() => createNewRoom()}>New Meeting</button>
          </div>
        </div>
        <div className="home-content-right">
          <div className="img-container">
            <img src={i1} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
