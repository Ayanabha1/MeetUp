const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
    allowEIO3: true,
  },
});
const PORT = process.env.PORT || 8000;
require("dotenv/config");

const mongoose = require("mongoose");

const authRoute = require("./Routes/authRoute");

app.use(cors());
app.use(express.json());

// DB connection
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("Yay! Database is connected");
});

// Routes and middlewares

app.get("/", (req, res) => {
  res.send("Heyy whatsup This is Ayanabha Misra");
});

app.use("/api/v1/auth", authRoute);

// Listening to the server
server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

// Functions and variables for socket.io

let rooms = [];

const createNewRoom = () => {
  let result = "";
  let characters = "abcdefghijklmnopqrstuvwxyz";
  let charactersLength = characters.length;
  for (let i = 0; i < 3; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  result += "-";
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  result += "-";
  for (let i = 0; i < 3; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// Rooms

app.get("/api/v1/get-new-room", (req, res) => {
  const newRoomId = createNewRoom();
  rooms.push({
    name: "New Room",
    roomId: newRoomId,
    participantsHistory: [],
    currentSessionParticipants: [],
    messages: [],
  });
  res.send({ roomId: newRoomId });
});
app.post("/api/v1/room-exists", (req, res) => {
  const roomId = req.body.roomId;
  const targetRoom = rooms.filter((room) => room.roomId === roomId);
  if (targetRoom.length > 0) {
    res.status(200).send({ status: "found" });
  } else {
    res.status(400).send({ message: "Room does not exist" });
  }
});

io.on("connection", (socket) => {
  socket.on("join-room", (dataToSend) => {
    const { roomId, newParticipant } = dataToSend;
    const targetRoom = rooms.filter((room) => room.roomId === roomId)[0];

    if (targetRoom) {
      socket.join(roomId);
      const newUserTemp = { ...newParticipant, socketId: socket.id };
      const inParticipantsHistory = targetRoom.participantsHistory.find(
        (part) => part.email === newParticipant.email
      );
      if (!inParticipantsHistory) {
        targetRoom.participantsHistory.push(newUserTemp);
      }
      targetRoom.currentSessionParticipants.push(newUserTemp);
      console.log(newParticipant.name + " Joining room" + targetRoom.roomId);

      const usersInTheRoom = targetRoom.currentSessionParticipants.filter(
        (part) => part.socketId !== socket.id
      );
      socket.emit("get-all-users", usersInTheRoom);
      console.log(targetRoom);
    } else {
      console.log("Room does not exist");
    }
  });

  // events for WebRTC connection
  socket.on("send-offer", (data) => {
    console.log("Sending Offer");
    socket.to(data?.to).emit("receive-offer", data);
  });
  socket.on("send-answer", (data) => {
    console.log("Sending Answer");
    socket.to(data?.to).emit("receive-answer", data);
  });
  socket.on("send-candidate", (data) => {
    console.log("Sending Candidate");
    socket.to(data?.to).emit("receive-candidate", data);
  });

  // events for chat
  socket.on("send-message", (data) => {
    console.log(data);
    socket.broadcast.to(data?.roomId).emit("receive-message", data);
  });

  socket.on("disconnecting", () => {
    let targetRoom;
    let participantDetails;
    rooms.forEach((room) => {
      room.currentSessionParticipants?.forEach((part) => {
        if (part.socketId === socket.id) {
          participantDetails = part;
          targetRoom = room;
          room.currentSessionParticipants =
            room.currentSessionParticipants.filter((p) => p !== part);
        }
      });
    });
    socket.leave(targetRoom?.roomId);
    console.log(
      participantDetails?.name + " user disconnected " + targetRoom?.roomId
    );
    socket.broadcast.to(targetRoom?.roomId).emit("user-disconnected", {
      disconnectedUser: participantDetails,
      currentSessionParticipants: targetRoom?.currentSessionParticipants,
    });
  });
});
