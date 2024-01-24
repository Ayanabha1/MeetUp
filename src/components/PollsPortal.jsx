import React, { useState } from "react";
import NewPollForm from "./NewPollForm";

const PollsPortal = () => {
  const [newPollFormOpen, setNewPollFormOpen] = useState(false);
  const openPollForm = () => {
    setNewPollFormOpen(true);
  };
  const closePollForm = () => {
    setNewPollFormOpen(false);
  };

  const createPoll = (data) => {
    console.log(data);
  };

  return (
    <div className="mt-10 flex flex-col h-[90%] justify-between overflow-scroll">
      {/* Polls will go here */}
      <div className="h-[90%] flex flex-col">
        {newPollFormOpen && (
          <div className="mt-auto mb-4 overflow-scroll">
            <NewPollForm
              closePollForm={closePollForm}
              createPoll={createPoll}
            />
          </div>
        )}
      </div>
      {/* Create new poll */}
      <div className="flex flex-col">
        <button
          className={`${
            newPollFormOpen
              ? "bg-[rgb(229,229,229)] text-[rgba(0,0,0,0.5)]"
              : "active:shadow-[inset_0_0px_4px_rgba(0,0,0,0.2)]"
          } p-2 w-full shadow-md border rounded-md`}
          onClick={openPollForm}
        >
          Create New Poll
        </button>
      </div>
    </div>
  );
};

export default PollsPortal;
