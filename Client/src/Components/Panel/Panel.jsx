import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDataLayerValue } from "../../Datalayer/DataLayer";
import "./panel.css";
import Sidebar from "./Sidebar";
import VideoPanel from "./VideoPanel";
import socketIOClient from "socket.io-client";
import { Api } from "../../Api/axios";
import Peer from "simple-peer";
import ChatPanel from "./ChatPanel";

function Panel() {
  const [{ user, roomJoined, loggedIn }, dispatch] = useDataLayerValue();
  const navigate = useNavigate();
  const urlParams = useParams();
  const [peers, setPeers] = useState([]);
  const [audioOn, setAudioOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [newMessageReceived, setNewMessageReceived] = useState(false);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);

  // Creating the stream

  const createStream = async () => {
    await navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then((stream) => {
        // streamObject.srcObject = stream;
        userVideo.current.srcObject = stream;
        // Join the room
        const roomId = urlParams.id;
        const dataTosend = { roomId: roomId, newParticipant: user };
        socketRef.current.emit("join-room", dataTosend);
        socketRef.current.on("get-all-users", (users) => {
          console.log(users);
          const peers = [];
          users.forEach((user) => {
            const peer = createPeer(user, socketRef.current.id, stream);
            peersRef.current.push({ participant: user, peer: peer });
            peers.push({ participant: user, peer: peer });
          });
          setPeers(peers);
        });

        socketRef.current.on("receive-offer", (data) => {
          console.log("receiving offer from : " + data.senderUser.name);
          const peer = addPeer(data.from, data.offerSDP, stream);
          peersRef.current.push({ participant: data.senderUser, peer: peer });
          const peerObj = { participant: data.senderUser, peer: peer };
          setPeers((peers) => [...peers, peerObj]);
        });

        socketRef.current.on("receive-answer", (data) => {
          console.log("receiving answer");
          console.log(data);
          console.log(peersRef.current);
          const item = peersRef.current.find(
            (p) => p.participant.socketId === data.from
          );
          item?.peer?.signal(data.answerSDP);
        });

        socketRef.current.on("user-disconnected", (data) => {
          removeParticipant(data.disconnectedUser);
        });
      });
  };

  // Function to create peer

  const createPeer = (targetUser, mySocketId, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("send-offer", {
        from: mySocketId,
        to: targetUser.socketId,
        offerSDP: signal,
        senderUser: { ...user, socketId: socketRef.current.id },
      });
    });
    console.log("sending offer : " + user.name + " -> " + targetUser.name);

    return peer;
  };
  // Function to add peer

  const addPeer = (offerSenderSocketId, offerSDP, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("send-answer", {
        from: socketRef.current.id,
        to: offerSenderSocketId,
        answerSDP: signal,
        senderUser: { ...user, socketId: socketRef.current.id },
      });
    });
    console.log("sending answer");
    peer.signal(offerSDP);

    return peer;
  };

  // Function to remove participant

  const removeParticipant = (disconnectedUser) => {
    const currentUsers = peersRef.current.filter(
      (p) => p.participant.socketId !== disconnectedUser.socketId
    );
    if (currentUsers.length === 0) {
      setPeers([]);
      peersRef.current = [];
    } else {
      setPeers(currentUsers);
      peersRef.current = currentUsers;
    }
  };

  // Function to check if peerconnection already exists or not

  const peerConnectionExists = (socketId) => {
    // console.log("Check for " + socketId);
    const target = peersRef.current.filter(
      (p) => p.participant.socketId === socketId
    );
    if (target.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const ENDPOINT = "http://localhost:8000";
    socketRef.current = socketIOClient(ENDPOINT);

    // events
    socketRef.current.on("receive-message", (data) => {
      setNewMessageReceived(true);
    });
  }, []);

  useEffect(() => {
    if (user) {
      createStream();
    }
  }, [user]);

  // Sidebar functions

  const toggleShowChat = () => {
    if (!showChat) {
      setNewMessageReceived(false);
    }

    setShowChat(!showChat);
  };

  return (
    <div className="panel">
      <Sidebar
        user={user}
        toggleShowChat={toggleShowChat}
        newMessageReceived={newMessageReceived}
      />
      <VideoPanel userVideo={userVideo} peers={peers} />
      <ChatPanel showChat={showChat} socket={socketRef.current} user={user} />
    </div>
  );
}

export default Panel;
