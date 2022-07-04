import React, { useEffect, useState } from "react";
import { MdSend } from "react-icons/md";
import { useParams } from "react-router-dom";
import userImage from "./Resources/user.png";

function ChatPanel({ showChat, socket, user }) {
  const [selectedBtn, setSelectedBtn] = useState(0);
  const [newMessage, setNewMessage] = useState("");
  const urlParams = useParams();
  const [messages, setMessages] = useState([]);

  const changeMessageText = (e) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage != "") {
      const roomId = urlParams.id;
      const d = new Date();
      const hr = d.getHours();
      const min = d.getMinutes();
      const time = `${hr < 10 ? "0" + hr : hr}:${min < 10 ? "0" + min : min}`;
      const dataTosend = {
        sender: user?.name,
        message: newMessage,
        picture: user?.picture,
        time: time,
        roomId: roomId,
      };
      socket.emit("send-message", dataTosend);
      setMessages((messages) => [
        ...messages,
        { sender: "You", message: newMessage, time: time },
      ]);
      setNewMessage("");
    }
  };

  useEffect(() => {
    socket?.on("receive-message", (data) => {
      const notification = new Audio("message.mp3");
      notification.play();
      setMessages((messages) => [...messages, data]);
    });
  }, [socket]);

  return (
    <div className={`chat-panel ${showChat && "chat-panel-vis"}`}>
      <div className="chat-container">
        <div className="chat-toggle">
          <button
            className={`${selectedBtn === 0 && "selected-btn"}`}
            onClick={() => setSelectedBtn(0)}
          >
            Messages
          </button>
          <button
            className={`${selectedBtn === 1 && "selected-btn"}`}
            onClick={() => setSelectedBtn(1)}
          >
            Participants
          </button>
        </div>
        <div className="chat-messages-container">
          <div className="chat-messages-container-main">
            <div className="chat-partition">
              <div className="chat-partition-line"></div>
              <span>Messages</span>
              <div className="chat-partition-line"></div>
            </div>
            {messages?.map((mess, i) => (
              <div
                className={`message-box ${
                  mess.sender === "You" && "message-box-self"
                }`}
              >
                {mess.sender !== "You" && (
                  <div className="left">
                    <img
                      src={mess?.picture || userImage}
                      alt=""
                      style={{ borderRadius: "50%" }}
                    />
                  </div>
                )}
                <div className="right">
                  <div
                    className={`${
                      mess.sender === "You" ? "from-self" : "from"
                    }`}
                  >
                    {mess.sender}
                  </div>
                  <div className="message">
                    <span>{mess.message}</span>
                    <span className="message-time">{mess.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="chat-messages-wrapper">
          <form className="chat-messages-input">
            <input
              type="text"
              placeholder="Write message here"
              value={newMessage}
              onChange={(e) => changeMessageText(e)}
            />
            <button
              className="chat-messages-input-send"
              onClick={(e) => sendMessage(e)}
            >
              <MdSend size={17} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatPanel;
