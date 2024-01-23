import React, { useEffect, useState } from "react";
import { useDataLayerValue } from "../Datalayer/DataLayer";
import { Api } from "../Api/Axios";
import { Pencil, ChevronLeft } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MeetHistoryCard = ({ meeting_id, start_time }) => {
  const getDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
  };

  const formatTime = (date) => {
    const d = new Date(date);
    const hours = d.getHours();
    const minutes = d.getMinutes();

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  // const getDuration = (st, end) => {
  //   const s = new Date(st),
  //     e = new Date(end);
  //   const td = e - s;
  //   const hours = Math.floor(td / (1000 * 60 * 60));
  //   const minutes = Math.floor((td % (1000 * 60 * 60)) / (1000 * 60));
  //   if (hours > 0) {
  //     return `${hours} hrs ${minutes} mins`;
  //   }
  //   return `${minutes} mins`;
  // };

  return (
    <div
      className="flex gap-[2px] w-full  bg-[rgba(255,255,255,0.05)] rounded-[5px] mt-4 p-2 justify-between px-3 border-[1px] border-[rgba(255,255,255,0.05)] "
      style={{ boxShadow: "1px 1px 3px rgba(0,0,0,0.25)" }}
    >
      <div className="flex flex-col gap-[2px] text-left">
        <span>Meeting code </span>
        <span>Date </span>
        <span>Start time </span>
      </div>
      <div className="flex flex-col gap-[2px] text-right">
        <span>{meeting_id}</span>
        <span>{getDate(start_time)}</span>
        <span>{formatTime(start_time)}</span>
      </div>
    </div>
  );
};

const Profile = () => {
  const {
    state,
    showError,
    showSuccess,
    startLoading,
    stopLoading,
    changeLoginState,
  } = useDataLayerValue();
  const { userData } = state;
  const profile =
    "https://ik.imagekit.io/Ayanabha1/profile%20-%20Copy.png?updatedAt=1706025234240";
  const [profileImage, setProfileImage] = useState(profile);
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();
  const getMeetingHistory = async () => {
    startLoading();
    await Api.get("/auth/get-meeting-history")
      .then((res) => {
        setMeetings(res.data.meetings);
      })
      .catch((err) => {
        showError(err?.response?.data?.message);
      });
    stopLoading();
  };

  const uploadImage = async (e) => {
    const baseURL = import.meta.env.VITE_API_URL;
    startLoading();

    const file = e.target.files[0];
    if (!file) {
      showError("Please upload a file");
      stopLoading();

      return;
    }
    if (!file.type.startsWith("image/")) {
      showError("Please select an image file");
      stopLoading();

      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    await axios
      .post(`${baseURL}/uploadImage`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.image) {
          setProfileImage(res.data.image);
        }
        changeLoginState(res.data.userData, res.data.token);
        showSuccess("Image uploaded successfully");
      })
      .catch((err) => {
        showError(
          err?.response?.data?.message ||
            "Image upload failed ... please try again"
        );
        stopLoading();
      });

    stopLoading();
  };

  useEffect(() => {
    getMeetingHistory();
  }, []);

  useEffect(() => {
    if (userData.profile_image) {
      setProfileImage(userData.profile_image);
    }
  }, [userData]);

  useEffect(() => {
    let first_name = undefined;
    if (state.userData) {
      first_name = state.userData.name.split(" ")[0];
    }
    document.title = `${first_name} - Meetup profile`;
  }, [state.userData]);

  return (
    <div className="relative bg-primary w-[100vw] h-[100vh] overflow-scroll flex flex-col items-center p-10 text-white gap-6 text-[15px] ss:text-[18px]  ">
      <button
        className="hidden absolute left-10 top-10 p-3 pr-6 sm:flex gap-1 items-center bg-[rgba(255,255,255,0.15)] rounded-lg shadow-xl z-50 text-white"
        onClick={() => {
          navigate("/");
        }}
      >
        <ChevronLeft className="h-6 w-6" /> Back
      </button>
      <div className="absolute z-[0] w-[40%] h-[35%] top-0 left-0 pink__gradient_2 " />
      <div className="absolute z-[0] w-[50%] h-[50%] bottom-0 right-0 blue__gradient_2 " />

      <div
        className="bg-[rgba(255,255,255,0.015)] backdrop-blur-[2px] w-[300px] ss:w-[500px] overflow-hidden flex flex-col py-10 rounded-[8px] items-center gap-2 ss:gap-7"
        style={{ boxShadow: "1px 1px 3px rgba(0,0,0,0.25)" }}
      >
        <div className="relative">
          <img
            src={profileImage}
            alt=""
            className=" w-[100px] h-[100px] ss:w-[125px] ss:h-[125px] rounded-full object-cover "
          />
          <label
            htmlFor="upload-image"
            className="absolute bottom-0 right-0 rounded-full p-2 z-[50] bg-white bg-opacity-50 backdrop-blur-[5px] text-black cursor-pointer"
          >
            <Pencil className="h-5 w-5 " />
          </label>
          <input
            type="file"
            id="upload-image"
            className="hidden"
            accept="image/*"
            onChange={uploadImage}
          />
        </div>
        <div className="flex flex-col text-center gap-2 ss:gap-4 mb-5">
          <span>Name : {userData?.name}</span>
          <span>Email: {userData?.email}</span>
        </div>
      </div>

      <div
        className="bg-[rgba(255,255,255,0.015)] backdrop-blur-[2px] p-5 w-[300px] ss:w-[500px] h-[65%] text-center rounded-[8px] overflow-hidden"
        style={{ boxShadow: "1px 1px 3px rgba(0,0,0,0.25)" }}
      >
        <span>
          Meetings Attended{" "}
          <span
            className="px-3 rounded-[3px] bg-[rgba(255,255,255,0.1)]"
            style={{ boxShadow: "1px 1px 3px rgba(0,0,0,0.15)" }}
          >
            {meetings?.length}
          </span>{" "}
        </span>
        <hr className="m-2 border-[rgba(255,255,255,0.25)]" />

        <div className="overflow-scroll h-[90%] relative">
          {meetings?.map((meeting, i) => (
            <MeetHistoryCard key={i} {...meeting} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
