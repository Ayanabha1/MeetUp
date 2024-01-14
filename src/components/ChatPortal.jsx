import React, { useEffect, useRef, useState } from "react";
import { person2, person3, cancel } from "../assets";
import { X, Send, ChevronDown } from "lucide-react";
import { useDataLayerValue } from "../Datalayer/DataLayer";

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
  const { state } = useDataLayerValue();
  const chatBoxRef = useRef();
  const [showDonwBtn, setShowDonwBtn] = useState(false);
  useEffect(() => {
    const chatBox = chatBoxRef.current;
    if (chatBox) {
      const chatHeight = chatBox?.scrollHeight;
      const currHeight = chatBox?.scrollTop;
      if (currHeight < chatHeight) {
        setShowDonwBtn(true);
      }
    }
  }, [chats]);

  const handleShowDownBtn = () => {
    console.log("first");
    const targetHeight =
      chatBoxRef.current?.scrollHeight - chatBoxRef.current?.offsetHeight;
    if (chatBoxRef.current?.scrollTop < targetHeight) {
      setShowDonwBtn(true);
    } else {
      setShowDonwBtn(false);
    }
  };

  const handleShowBtnClick = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current?.scrollHeight;
    }
  };

  useEffect(() => {
    if (chatBoxRef?.current) {
      handleShowDownBtn();
    }
  }, [chatBoxRef.current?.scrollTop]);

  return (
    <div
      className={`${
        chatOpen ? "opacity-100" : "opacity-0"
      } h-full m-3 p-5 bg-white  overflow-hidden transition-all duration-300 rounded-xl text-black flex flex-col relative`}
    >
      {/* Go down btn */}
      <button
        onClick={handleShowBtnClick}
        className={`absolute left-[50%] translate-x-[-50%] bottom-[100px] rounded-full shadow-[1px_1px_5px_rgba(0,0,0,0.5)] bg-white bg-opacity-50 transition-all duration-300 flex items-center justify-center active:shadow-none ${
          showDonwBtn ? "h-8 w-8 opacity-100" : "h-0 w-0 opacity-50"
        } `}
      >
        <ChevronDown color="rgba(0,0,0,0.6)" />
      </button>

      {/* Head */}
      <h1 className="text-xl font-semibold flex justify-between items-center border-b border-b-[rgba(0,0,0,0.25)] pb-2">
        <span>Live Chat</span>
        <button onClick={toggleChat}>
          <X />
        </button>
      </h1>
      <div
        className="flex flex-col mt-10 h-[80%] gap-[30px] overflow-y-scroll overflow-x-hidden"
        ref={chatBoxRef}
      >
        {chats?.map((chat, i) =>
          chat?.email === state?.userData?.email ? (
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
