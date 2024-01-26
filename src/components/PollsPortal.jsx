import React, { useState } from "react";
import NewPollForm from "./NewPollForm";
import ProgressBar from "./ProgressBar";

const Poll = ({ data, selectPollOption, participants }) => {
  const handleChangeOption = (pollData, optionId) => {
    selectPollOption(pollData, optionId);
  };

  const getPercentage = (votes, total_votes) => {
    if (votes === 0) {
      return 0;
    }
    let total = Math.max(participants.length + 1, total_votes);

    return Math.floor((votes / total) * 100);
  };

  return (
    <div>
      {/* sender info */}
      <div className="flex items-center gap-2 mb-[10px] w-full">
        <img
          src={data?.sender_image}
          alt="sender_name"
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
        <span className="text-[18px]">{data?.sender}</span>
        <span className="text-sm ml-auto text-[rgba(0,0,0,0.65)]">
          {data?.time}
        </span>
      </div>
      {/* poll */}
      <div className="flex flex-col gap-2 border rounded-md p-2 shadow-md ">
        <p className="poll-option-prompt break-words">{data?.prompt}</p>

        <div className="flex flex-col gap-2">
          {data?.options?.map((op, i) => (
            <div key={i}>
              <ProgressBar
                completed={getPercentage(op?.votes, data?.total_votes)}
              >
                <div key={i} className={`z-[10] radio-button-outer-container`}>
                  <label key={i} className={`z-[20] radio-button-container `}>
                    <input
                      type="radio"
                      id={`${op?.id}_${data?.id}`}
                      name={`poll_option_${data?.id}`}
                      onClick={() => handleChangeOption(data, op?.id)}
                    />
                    <span className="checkmark"></span>
                    <p className="max-w-[80%] break-words">{op.option}</p>
                    <span className="ml-auto">
                      {`${getPercentage(op?.votes, data?.total_votes)}%`}
                    </span>
                  </label>
                </div>
              </ProgressBar>
            </div>
          ))}
          <span className="ml-[10px] text-sm text-[rgba(0,0,0,0.55)]">
            {data?.total_votes} votes
          </span>
        </div>
      </div>
    </div>
  );
};

const PollsPortal = ({ sendPoll, polls, selectPollOption, participants }) => {
  const [newPollFormOpen, setNewPollFormOpen] = useState(false);
  const openPollForm = () => {
    setNewPollFormOpen(true);
  };
  const closePollForm = () => {
    setNewPollFormOpen(false);
  };

  const createPoll = (data) => {
    sendPoll(data);
  };

  return (
    <div className="mt-10 flex flex-col h-[90%] justify-between overflow-scroll">
      {/* Polls will go here */}
      <div className="h-[90%] flex flex-col gap-10 overflow-scroll pb-2">
        {polls.map((poll, i) => (
          <Poll
            data={poll}
            selectPollOption={selectPollOption}
            participants={participants}
            key={i}
          />
        ))}

        {newPollFormOpen && (
          <div className="mt-auto mb-4">
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
              ? " text-[rgba(0,0,0,0.5)]"
              : "active:shadow-[inset_0_0px_4px_rgba(0,0,0,0.2)]"
          } p-2 w-full shadow-md mb-2 border rounded-md`}
          onClick={openPollForm}
        >
          Create New Poll
        </button>
      </div>
    </div>
  );
};

export default PollsPortal;
