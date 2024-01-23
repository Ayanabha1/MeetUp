import React, { useEffect, useRef, useState } from "react";
import { X, Users, Search } from "lucide-react";
import { useDataLayerValue } from "../Datalayer/DataLayer";

const ParticipantsSheet = ({
  uid,
  participants,
  participantsOpen,
  toggleParticipants,
}) => {
  const { state } = useDataLayerValue();
  const [searchList, setSearchList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const profile =
    "https://ik.imagekit.io/Ayanabha1/profile%20-%20Copy.png?updatedAt=1706025234240";

  const handleSearch = (name) => {
    setSearchKey(name);
    if (!name || name === "") {
      setSearchList([]);
      return;
    }
    let key = name;
    key = key?.trim();
    let list = [];
    if (state?.userData?.name?.toLowerCase()?.includes(key?.toLowerCase())) {
      list.push({ ...state?.userData, uid: uid });
    }
    list = participants?.reduce((acc, curr) => {
      if (curr?.name?.toLowerCase()?.includes(key?.toLowerCase())) {
        acc.push(curr);
      }
      return acc;
    }, list);
    setSearchList(list);
  };

  return (
    <div
      className={`${
        participantsOpen ? "opacity-100 h-full" : "opacity-0 h-0"
      } m-3 p-5 bg-white  overflow-hidden transition-all duration-300 rounded-xl text-black flex flex-col relative`}
    >
      {/* Head */}
      <h1 className="text-xl font-semibold flex justify-between items-center border-b border-b-[rgba(0,0,0,0.25)] pb-2">
        <div className="flex gap-2 items-center">
          <span>Participants</span>
          <span className="text-sm flex items-center p-1 px-2 bg-black bg-opacity-[10%] rounded-md ">
            <Users className="h-4 w-4 mr-1" /> {participants?.length + 1}
          </span>
        </div>
        <button onClick={toggleParticipants}>
          <X />
        </button>
      </h1>

      {/* Search */}
      <div className="w-full py-2 relative">
        <input
          type="text"
          className="w-full p-2 border-2 rounded-lg pr-10"
          placeholder="Search a name"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="absolute right-2 top-[50%] translate-y-[-50%]">
          <Search className="text-[rgba(0,0,0,0.4)]" />
        </div>
      </div>

      {/* Participants */}
      <div className="flex flex-col gap-4 pt-2 h-full overflow-y-scroll">
        {searchKey === "" ? (
          <>
            <div className="flex gap-2 items-center">
              <img
                src={state?.userData?.profile_image || profile}
                className="h-10 w-10 rounded-full"
              />
              <span className="text-lg">{state?.userData?.name} (You)</span>
            </div>
            {participants?.map((user, i) => (
              <div className="flex gap-2 items-center" key={i}>
                <img
                  src={user?.profile_image || profile}
                  className="h-10 w-10 rounded-full"
                />
                <span className="text-lg">{user?.name || "User"}</span>
              </div>
            ))}
          </>
        ) : null}

        {searchKey !== "" ? (
          <>
            <span>Search Result:</span>
            {searchList?.map((user, i) => (
              <div className="flex gap-2 items-center" key={i}>
                <img
                  src={user?.profile_image || profile}
                  className="h-10 w-10 rounded-full"
                />
                <span className="text-lg">
                  {user?.name || "User"} {user?.uid === uid && "(You)"}
                </span>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ParticipantsSheet;
