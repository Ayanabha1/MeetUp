import React, { useState } from "react";
import { X } from "lucide-react";
import ChatPortal from "./ChatPortal";
import PollsPortal from "./PollsPortal";

const ChatDock = ({
  chatOpen,
  chats,
  handleChangeMessage,
  newMessage,
  sendMessage,
  toggleChat,
  uid,
  sendPoll,
  polls,
  selectPollOption,
  participants,
}) => {
  const [openSection, setOpenSection] = useState("chat");

  return (
    <div
      className={`${
        chatOpen ? "opacity-100 h-full" : "opacity-0 h-0"
      }  m-3 p-5 bg-white  overflow-hidden transition-all duration-300 rounded-xl text-black flex flex-col relative`}
    >
      {/* Head */}
      <h1 className="text-xl font-semibold flex justify-between items-center border-b border-b-[rgba(0,0,0,0.25)] pb-2">
        <span>{openSection === "chat" ? "Live Chat" : "Polls"}</span>
        <button onClick={toggleChat}>
          <X />
        </button>
      </h1>
      <div className="flex w-full mt-2">
        <button
          className={`${
            openSection === "chat" && "shadow-[inset_0_0px_4px_rgba(0,0,0,0.2)]"
          } p-1 text-md shadow-md active:shadow-[inset_0_0px_4px_rgba(0,0,0,0.2)] flex-[0.5] rounded-tl-md rounded-bl-md border`}
          onClick={() => {
            setOpenSection("chat");
          }}
        >
          Chat
        </button>
        <button
          className={`${
            openSection === "polls" &&
            "shadow-[inset_0_0px_4px_rgba(0,0,0,0.2)]"
          } p-1 text-md  shadow-md active:shadow-[inset_0_0px_4px_rgba(0,0,0,0.2)] flex-[0.5] rounded-tr-md rounded-br-md border`}
          onClick={() => {
            setOpenSection("polls");
          }}
        >
          Polls
        </button>
      </div>
      {openSection === "chat" ? (
        <ChatPortal
          chatOpen={chatOpen}
          chats={chats}
          handleChangeMessage={handleChangeMessage}
          newMessage={newMessage}
          sendMessage={sendMessage}
          toggleChat={toggleChat}
          uid={uid}
        />
      ) : (
        <PollsPortal
          sendPoll={sendPoll}
          polls={polls}
          selectPollOption={selectPollOption}
          participants={participants}
        />
      )}
    </div>
  );
};

export default ChatDock;
