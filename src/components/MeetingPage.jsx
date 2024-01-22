import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDataLayerValue } from "../Datalayer/DataLayer";
import {
  config,
  useRTCClient,
  useMicrophoneAndCameraTracks,
  useRTMClient,
} from "./commSettings";
import { Api } from "../Api/Axios";
import RenderOnBigScreen from "./RenderOnBigScreen";
import RenderOnSmallScreen from "./RenderOnSmallScreen";

const MeetingPage = () => {
  // agora variables and functions
  const [start, setStart] = useState(false);
  const [name, setName] = useState("");
  const [channelName, setChannelName] = useState("");
  const [participants, setParticipants] = useState([]);
  const rtc__client = useRTCClient();
  const rtm__client = useRTMClient();
  const [connectionEstablished, setConnectionEstablished] = useState(false);
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  const [uid, setUid] = useState(String(Math.floor(Math.random() * 10000)));
  const { state, showError, showInfo } = useDataLayerValue();
  const navigate = useNavigate();
  let channelRef = useRef();
  const [memberDetails, setMemberDetails] = useState([]);
  const [chats, setChats] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [duration, setDuration] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [participantsOpen, setParticipantsOpen] = useState(false);
  const urlParams = useParams();

  const init = async (roomName) => {
    // RTM

    try {
      await rtm__client.login({ uid });
      await rtm__client.addOrUpdateLocalUserAttributes({
        name: name,
        uid: uid,
        profile_image: state?.userData?.profile_image,
      });
      let channel = await rtm__client.createChannel(roomName);
      channelRef.current = channel;
      await channelRef.current.join();

      channelRef.current.on("MemberJoined", handleMemberJoined);
      channelRef.current.on("MemberLeft", handleMemberLeft);
      channelRef.current.on("ChannelMessage", handleRecieveMessage);
      getAllMemberDetails();
    } catch (err) {
      console.log(err);
    }

    // RTC

    rtc__client.on("user-published", async (user, mediaType) => {
      let { name, uid, profile_image } =
        await rtm__client.getUserAttributesByKeys(user.uid, [
          "name",
          "uid",
          "profile_image",
        ]);
      await rtc__client.subscribe(user, mediaType);
      if (participants.filter((p) => p.uid === user.uid)) {
        setParticipants((prevParts) =>
          prevParts.filter((p) => p.uid !== user.uid)
        );
      }
      const user_temp = user;
      user_temp.name = name;
      user_temp.profile_image = profile_image;
      setParticipants((prevParts) => [...prevParts, user_temp]);

      if (mediaType === "audio") {
        user?.audioTrack?.play();
      }
    });

    rtc__client.on("user-unpublished", (user, mediaType) => {
      if (mediaType === "audio") {
        if (user.audioTrack) {
          user.audioTrack.stop();
        }
        if (mediaType === "video") {
          setParticipants((prevParts) =>
            prevParts.filter((p) => p.uid !== user.uid)
          );
        }
      }
    });

    rtc__client.on("user-left", async (user) => {
      await handleMemberLeft(user.uid);
      setParticipants((prevParts) =>
        prevParts.filter((p) => p.uid !== user.uid)
      );
    });

    try {
      await rtc__client?.join(config.APP_ID, roomName, config.token, uid);
    } catch (err) {
      console.log(err);
    }

    if (tracks) {
      await rtc__client.publish([tracks[0], tracks[1]]);
    }
    setStart(true);
  };

  const joinMeeting = async (room_id) => {
    // startLoading();

    await Api.post("/meet/join-meeting", { meeting_id: room_id })
      .then((res) => {
        setConnectionEstablished(true);
      })
      .catch((err) => {
        navigate("/");
        showError(err?.response?.data?.message);
      });
    // stopLoading();
  };

  useEffect(() => {
    if (state.loggedIn) {
      setName(state?.userData?.name);
    }
  }, [state.loggedIn]);

  useEffect(() => {
    setChannelName(urlParams?.roomId);
  }, [urlParams]);

  const getTime = () => {
    const d = new Date();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();

    let formattedHours = hours % 12;
    if (formattedHours === 0) {
      formattedHours = 12;
    }

    const ampm = hours >= 12 ? "PM" : "AM";

    return `${formattedHours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;
  };

  const getDate = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const d = new Date();
    const date = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();

    return `${date} ${months[month]}, ${year}`;
  };

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };
  const toggleParticipants = () => {
    setParticipantsOpen(!participantsOpen);
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const startTime = new Date();
    const interval = setInterval(() => {
      const currentTime = new Date();
      const elapsed = Math.floor((currentTime - startTime) / 1000);
      // Calculate elapsed seconds
      setDuration(elapsed);
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleMemberJoined = async (MemberId) => {
    let { name, uid, profile_image } =
      await rtm__client.getUserAttributesByKeys(MemberId, [
        "name",
        "uid",
        "profile_image",
      ]);
    showInfo(`${name} joined the call`);
    setMemberDetails((prev) => [...prev, { name, uid, profile_image }]);
  };

  const handleMemberLeft = async (MemberId) => {
    try {
      const { name, uid, profile_image } =
        await rtm__client.getUserAttributesByKeys(MemberId, [
          "name",
          "uid",
          "profile_image",
        ]);
      console.log("Member left ... :(" + name);
      showInfo(`${name} left the call`);
    } catch (error) {
      console.log(error);
    }
  };

  const getAndAddMemberDetails = async (memberId) => {
    const { name, uid, profile_image } =
      await rtm__client.getUserAttributesByKeys(memberId, [
        "name",
        "uid",
        "profile_image",
      ]);
    setMemberDetails((prev) => [
      ...prev,
      { name, uid, profile_image, mic__muted: false },
    ]);
  };

  const getAllMemberDetails = async () => {
    let members = await channelRef.current?.getMembers();
    for (let i = 0; i < members.length; i++) {
      getAndAddMemberDetails(members[i]);
    }
  };

  const handleRecieveMessage = async (messageData, MemberId) => {
    console.log("Message Recieved");
    let data = JSON.parse(messageData.text);
    if (data.type === "chat") {
      console.log(data);
      setChats((chats) => [...chats, data]);
    }
  };

  const handleChangeMessage = (message) => {
    setNewMessage(message);
  };

  const sendMessage = (e) => {
    // e.preventDefault();
    if (newMessage === "") {
      return;
    }
    let __message = newMessage;
    __message = __message.trim();

    const newChat = {
      type: "chat",
      name: name,
      uid: uid,
      email: state?.userData?.email,
      time: getTime(),
      picture: state?.userData?.profile_image,
      message: __message,
    };
    setChats((chats) => [...chats, newChat]);
    channelRef.current.sendMessage({ text: JSON.stringify(newChat) });
    handleChangeMessage("");
    // console.log("first");
  };

  useEffect(() => {
    let timeoutId;
    if (!state.loggedIn) {
      timeoutId = setTimeout(() => {
        if (!state.loggedIn) {
          navigate("/");
          showError("User is not logged in");
        }
      }, 1000);
    }
    if (state.loggedIn && channelName !== "" && name && ready && tracks) {
      try {
        if (!connectionEstablished) {
          console.log("Hit route");
          joinMeeting(channelName);
        }
        init(channelName);
      } catch (err) {
        console.log(err);
      }
    }
    return () => {
      try {
        rtc__client.leave();
        channelRef.current?.leave();
        rtm__client.logout();

        if (tracks) {
          tracks[1].stop();
          tracks[1].close();
          tracks[0].stop();
          tracks[0].close();
        }
        // socketRef.current.close();
      } catch (error) {}
      clearTimeout(timeoutId);
    };
  }, [state, channelName, rtc__client, ready, tracks]);

  return (
    <div className="meeting-dock relative overflow-hidden bg-primary">
      {window.innerWidth >= 500 ? (
        <RenderOnBigScreen
          channelRef={channelRef}
          chatOpen={chatOpen}
          chats={chats}
          formatTime={formatTime}
          handleChangeMessage={handleChangeMessage}
          memberDetails={memberDetails}
          name={name}
          newMessage={newMessage}
          participants={participants}
          sendMessage={sendMessage}
          toggleChat={toggleChat}
          toggleParticipants={toggleParticipants}
          participantsOpen={participantsOpen}
          tracks={tracks}
          uid={uid}
          duration={duration}
        />
      ) : (
        <RenderOnSmallScreen
          channelRef={channelRef}
          chatOpen={chatOpen}
          chats={chats}
          formatTime={formatTime}
          handleChangeMessage={handleChangeMessage}
          memberDetails={memberDetails}
          name={name}
          newMessage={newMessage}
          participants={participants}
          sendMessage={sendMessage}
          toggleChat={toggleChat}
          toggleParticipants={toggleParticipants}
          participantsOpen={participantsOpen}
          tracks={tracks}
          uid={uid}
          duration={duration}
        />
      )}
    </div>
  );
};

export default MeetingPage;
