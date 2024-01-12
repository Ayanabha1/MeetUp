import React, { useEffect } from "react";
import { person2, person3, cancel } from "../assets";
import { X, Send } from "lucide-react";

const SelfChat = ({ chat }) => {
  return (
    <div className="flex flex-col justify-end  w-full items-end">
      <div className="flex flex-col max-w-[88%] gap-[10px]">
        <div className="flex gap-2 justify-start items-start w-full">
          <img src={person2} className="h-[40px] w-[40px] rounded-full" />
          <span>You</span>
          <div className="text-[rgba(0,0,0,0.55)] flex gap-2">
            <span>•</span>
            <span>{chat?.time}</span>
          </div>
        </div>

        {/* Message */}
        <div className="bg-[rgb(246,246,246)] rounded-lg p-3 px-5">
          <p className="overflow-hidden break-words">{chat?.message}</p>
        </div>
      </div>
    </div>
  );
};
const OthersChat = ({ chat }) => {
  return (
    <div className="flex flex-col justify-end  w-full items-start">
      <div className="flex flex-col max-w-[88%] gap-[10px]">
        <div className="flex gap-2 justify-start items-start w-full">
          <img src={person3} className="h-[40px] w-10 rounded-full" />
          <span>{chat?.name}</span>
          <div className="text-[rgba(0,0,0,0.55)] flex gap-2">
            <span>•</span>
            <span>{chat?.time}</span>
          </div>
        </div>

        {/* Message */}
        <div className="bg-[rgb(246,246,246)] rounded-lg p-3 px-5">
          <p className="overflow-hidden break-words">{chat?.message}</p>
        </div>
      </div>
    </div>
  );
};

const ChatPortal = ({
  toggleChat,
  chatOpen,
  chats,
  sendMessage,
  newMessage,
  handleChangeMessage,
  uid,
}) => {
  return (
    <div
      className={`${
        chatOpen ? "opacity-100" : "opacity-0"
      } h-full m-3 p-5 bg-white  overflow-hidden transition-all duration-300 rounded-xl text-black flex flex-col `}
    >
      {/* Head */}
      <h1 className="text-xl font-semibold flex justify-between items-center">
        <span>Live Chat</span>
        <button onClick={toggleChat}>
          <X />
        </button>
      </h1>
      <div className="flex flex-col mt-10 h-[80%] gap-[30px] overflow-y-scroll overflow-x-hidden">
        {/* Your chat */}
        {/* <OthersChat />
        <OthersChat />
        <OthersChat />
        <OthersChat /> */}
        {chats?.map((chat, i) =>
          chat?.uid === uid ? (
            <SelfChat chat={chat} key={i} />
          ) : (
            <OthersChat chat={chat} key={i} />
          )
        )}
      </div>

      {/* Send message */}
      <form
        className="relative mt-auto"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(e);
        }}
      >
        <input
          type="text"
          className="h-[50px] w-full px-3 pl-[60px] rounded-full border"
          placeholder="Type your message here"
          value={newMessage}
          onChange={(e) => handleChangeMessage(e.target.value)}
        />
        <img
          src={person2}
          className="h-[80%] w-10 absolute top-[50%] translate-y-[-50%] rounded-full left-[5px]"
        />
        <button
          type="submit"
          className="bg-[rgb(246,246,246)] absolute top-[50%] translate-y-[-50%] right-[10px] p-2 rounded-full"
        >
          <Send className="text-black opacity-50" />
        </button>
      </form>
    </div>
  );
};

export default ChatPortal;
