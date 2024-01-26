import React, { useEffect, useRef, useState } from "react";
import {
  PlusSquare,
  Send,
  ChevronDown,
  FileText,
  Clapperboard,
  BookImage,
  ArrowDownToLine,
} from "lucide-react";
import { useDataLayerValue } from "../Datalayer/DataLayer";
import axios from "axios";
import loading from "../Assets/loading.gif";

const GetFileIcon = (fileType) => {
  if (fileType === "IMAGE") {
    return <BookImage />;
  } else if (fileType === "VIDEO") {
    return <Clipboard />;
  } else {
    return <FileText />;
  }
};

const SelfChat = ({ chat, image }) => {
  return (
    <div className="flex flex-col justify-end  w-full items-end">
      <div className="flex flex-col max-w-[88%] gap-[10px]">
        <div className="flex gap-2 justify-start items-start w-full">
          <img
            loading="lazy"
            src={image}
            className="h-[40px] w-[40px] object-cover rounded-full"
          />
          <span>You</span>
          <div className="text-[rgba(0,0,0,0.55)] flex gap-2">
            <span>•</span>
            <span>{chat?.time}</span>
          </div>
        </div>

        {/* Message */}
        {chat?.chatType === "chat" && (
          <div className="bg-[rgb(246,246,246)] p-3 px-5 shadow-md rounded-md border">
            <p className="overflow-hidden break-words">{chat?.message}</p>
          </div>
        )}

        {/* File */}
        {chat?.chatType === "file" && (
          <a href={chat?.url} target="_blank">
            <div className="flex bg-[rgb(246,246,246)] p-3 px-5 gap-2 shadow-md rounded-md border">
              <div>{GetFileIcon(chat?.chatType)}</div>
              <span className="overflow-x-scroll overflow-y-hidden max-w-[75%]">
                {chat?.fileName}
              </span>
              <ArrowDownToLine className="h-5 w-5" />
            </div>
          </a>
        )}
      </div>
    </div>
  );
};
const OthersChat = ({ chat, image }) => {
  return (
    <div className="flex flex-col justify-end w-full items-start">
      <div className="flex flex-col max-w-[88%] gap-[10px]">
        <div className="flex gap-2 justify-start items-start w-full">
          <img
            loading="lazy"
            src={image}
            className="h-[40px] w-10 rounded-full object-cover"
          />
          <span>{chat?.name}</span>
          <div className="text-[rgba(0,0,0,0.55)] flex gap-2">
            <span>•</span>
            <span>{chat?.time}</span>
          </div>
        </div>

        {/* Message */}
        {chat?.chatType === "chat" && (
          <div className="bg-[rgb(246,246,246)] p-3 px-5 shadow-md rounded-md border">
            <p className="overflow-hidden break-words">{chat?.message}</p>
          </div>
        )}

        {/* File */}
        {chat?.chatType === "file" && (
          <a href={chat?.url} target="_blank">
            <div className="flex bg-[rgb(246,246,246)] p-3 px-5 gap-2 shadow-md rounded-md border">
              <div>{GetFileIcon(chat?.chatType)}</div>
              <span className="overflow-x-scroll overflow-y-hidden max-w-[75%]">
                {chat?.fileName}
              </span>
              <ArrowDownToLine className="h-5 w-5" />
            </div>
          </a>
        )}
      </div>
    </div>
  );
};

const FileUploading = () => {
  return (
    <div className="flex items-center bg-[rgb(246,246,246)] p-3 shadow-md border rounded-md">
      <img alt="loading" src={loading} className="h-7 w-7" />
      <span>File Uploading</span>
    </div>
  );
};

const ChatPortal = ({
  chatOpen,
  chats,
  handleChangeMessage,
  newMessage,
  sendMessage,
  toggleChat,
  uid,
  sendFile,
}) => {
  const { state, showError, showSuccess } = useDataLayerValue();
  const chatBoxRef = useRef();
  const [showDonwBtn, setShowDonwBtn] = useState(false);
  const [sendOptionsOpen, setSendOptionsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const profile =
    "https://ik.imagekit.io/Ayanabha1/profile%20-%20Copy.png?updatedAt=1706025234240";

  const handleShowDownBtn = () => {
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
      setShowDonwBtn(false);
    }
  };

  const sendOptionsOpenToggle = () => {
    setSendOptionsOpen(!sendOptionsOpen);
  };

  const uploadFileToS3 = async (file, fileType) => {
    setSendOptionsOpen(false);
    setUploading(true);
    const baseURL = import.meta.env.VITE_API_URL;

    if (!file) {
      showError("Please upload a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    await axios
      .post(`${baseURL}/uploadDoc`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        showSuccess("File uploaded successfully");
        const data = {
          type: "chat",
          chatType: "file",
          fileType: fileType,
          url: res.data?.url,
          fileName: file?.name,
        };
        sendFile(data);
        handleShowBtnClick();
      })
      .catch((err) => {
        showError(
          err?.response?.data?.message ||
            "Image upload failed ... please try again"
        );
      });
    setUploading(false);
  };

  const uploadFileHandler = (event, __fileType) => {
    const input = event.target;
    const file = input.files[0];
    if (file) {
      const fileSize = file.size;
      const maxSize = 5 * 1024 * 1024; // 5 MB

      if (fileSize > maxSize) {
        showError("File size exceeds 5 MB. Please choose a smaller file.");
        return false;
      }
      const fileType = file.name.split(".").pop();
      const allowedTypes = input.accept.split(",").map((type) => type.trim());
      if (allowedTypes.includes(`.${fileType}`)) {
        uploadFileToS3(file, __fileType);
      } else {
        showError(`Please upload a ${__fileType?.toLowerCase()}`);
      }
    }
  };

  useEffect(() => {
    if (chatBoxRef?.current) {
      handleShowDownBtn();
    }
  }, [chats, chatBoxRef.current?.scrollTop]);

  return (
    <div
      className={`overflow-hidden transition-all duration-300 rounded-xl text-black flex flex-col relative h-full`}
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

      <div
        className="flex flex-col mt-10 pb-10 h-[80%] gap-[30px] overflow-y-scroll overflow-x-hidden"
        ref={chatBoxRef}
      >
        {chats?.map((chat, i) =>
          chat?.email === state?.userData?.email ? (
            <SelfChat
              chat={chat}
              image={state.userData.profile_image || profile}
              key={i}
            />
          ) : (
            <OthersChat chat={chat} image={chat.picture || profile} key={i} />
          )
        )}
      </div>

      {/* Send message */}
      <div className="flex mt-auto items-center relative w-full">
        {uploading && (
          <div className="absolute top-[-130%] left-[50%] translate-x-[-50%] z-[50000]">
            <FileUploading />
          </div>
        )}
        {sendOptionsOpen && (
          <div className="absolute top-[-410%] z-[500] bg-white flex flex-col gap-2 w-full">
            <div className="shadow-md border rounded-md">
              <label
                htmlFor="accept-photo"
                className="p-3 flex gap-1 border-b hover:bg-[rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer"
              >
                <BookImage /> Photo
                <input
                  id="accept-photo"
                  accept=".jpg, .jpeg, .png , .gif"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    uploadFileHandler(e, "PHOTO");
                  }}
                />
              </label>
              <label
                htmlFor="accept-video"
                className="p-3 flex gap-1 border-b hover:bg-[rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer"
              >
                <Clapperboard /> Video
                <input
                  id="accept-video"
                  type="file"
                  accept=".mp4, .avi, .mkv , .gif"
                  className="hidden"
                  onChange={(e) => {
                    uploadFileHandler(e, "VIDEO");
                  }}
                />
              </label>
              <label
                htmlFor="accept-doc"
                className="p-3 flex gap-1 hover:bg-[rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer"
              >
                <FileText /> Document
                <input
                  id="accept-doc"
                  accept=".doc, .docx, .pdf"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    uploadFileHandler(e, "DOCUMENT");
                  }}
                />
              </label>
            </div>
            <div className="shadow-md  border rounded-md text-center">
              <div
                className="p-2 hover:bg-[rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer"
                onClick={() => {
                  setSendOptionsOpen(false);
                }}
              >
                Cancel
              </div>
            </div>
          </div>
        )}

        <PlusSquare
          className="h-7 w-7 cursor-pointer text-black opacity-60 hover:opacity-[75%] transition-all duration-300 mr-1"
          onClick={sendOptionsOpenToggle}
        />
        <form
          className="relative w-full"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(e);
            setTimeout(() => {
              console.log("first");
              handleShowBtnClick();
            }, 50);
          }}
        >
          <input
            type="text"
            className="h-[50px] w-full px-3 pr-[60px] pl-[60px] rounded-full border"
            placeholder="Type your message here"
            value={newMessage}
            onChange={(e) => handleChangeMessage(e.target.value)}
          />
          <img
            loading="lazy"
            src={state?.userData?.profile_image || profile}
            className="h-[80%] object-cover w-10 absolute top-[50%] translate-y-[-50%] rounded-full left-[5px]"
          />
          <button
            type="submit"
            className="bg-[rgb(246,246,246)] absolute top-[50%] translate-y-[-50%] right-[10px] p-2 rounded-full"
          >
            <Send className="text-black opacity-50" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPortal;
