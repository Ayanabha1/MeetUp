import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useDataLayerValue } from "../Datalayer/DataLayer";
const NewPollForm = ({ createPoll, closePollForm }) => {
  const optionLimit = 10;
  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState([
    {
      index: 0,
      option: "",
    },
  ]);
  const { state } = useDataLayerValue();
  const changePrompt = (val) => {
    setPrompt(val);
  };
  const addOption = () => {
    if (options.length === optionLimit) {
      return;
    }
    const newOp = {
      index: options.length,
      option: "",
    };
    setOptions((prev) => [...prev, newOp]);
  };

  const removeOption = (index) => {
    if (options.length === 1) {
      return;
    }
    let __options = options;
    __options = __options.filter((op) => op.index !== index);
    __options.forEach((op) => {
      if (op.index > index) {
        op.index = op.index - 1;
      }
    });
    setOptions(__options);
  };

  const handleOptionChange = (index, val) => {
    let optionsTemp = options;
    optionsTemp = optionsTemp.map((op) =>
      op.index === index ? { ...op, option: val } : op
    );
    setOptions(optionsTemp);
  };

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

  const submitForm = () => {
    if (prompt === "") {
      // Show error please enter a prompt
      console.log("please enter a prompt");
      return;
    }

    let emptyOption = false;
    options.forEach((op) => {
      if (op.option === "") {
        emptyOption = true;
        return;
      }
    });

    if (emptyOption) {
      // Show error empty options not allowed
      console.log("empty options not allowed");
      return;
    }
    const d = new Date();
    const timeInMs = d.getMilliseconds();
    const __options = options.map((op, i) => ({
      option: op.option?.trim(),
      votes: 0,
      id: i,
    }));

    const sender = state?.userData?.name;
    const sender_image = state?.userData?.profile_image;
    const newForm = {
      id: `${timeInMs}_${__options.length}`,
      sender: sender,
      sender_image: sender_image,
      time: getTime(),
      prompt: prompt,
      options: __options,
      total_votes: 0,
      selected: -1,
    };
    createPoll(newForm);
    closePollForm();
  };

  return (
    <form
      className="flex flex-col gap-2 border rounded-md p-4 shadow-md"
      onSubmit={(e) => {
        e.preventDefault();
        submitForm();
      }}
    >
      {/* Question */}

      <div>
        <label
          htmlFor="prompt"
          className="font-semibold text-[rgba(0,0,0,0.75)] text-[18px]"
        >
          Prompt
        </label>
        <input
          id="prompt"
          type="text"
          className="w-full border p-2 rounded-md mt-[10px]"
          placeholder="Please enter your prompt"
          onChange={(e) => changePrompt(e.target.value)}
        />
      </div>

      {/* Options */}
      <span className="text-[18px]">Options</span>

      {options.map((option, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            key={i}
            type="text"
            className="w-full border p-2 rounded-md "
            placeholder={`Option ${option?.index + 1}`}
            value={options[i].option}
            onChange={(e) => {
              handleOptionChange(i, e.target.value);
            }}
          />
          <button
            type="button"
            onClick={() => {
              removeOption(i);
            }}
          >
            <Trash2 color="rgb(195,63,62)" />
          </button>
        </div>
      ))}
      <button
        className="p-2  w-full shadow-md active:shadow-[inset_0_0px_4px_rgba(0,0,0,0.2)] border rounded-md"
        onClick={addOption}
        type="button"
      >
        Add option
      </button>

      {/* Buttons for sending or cancelling */}
      <div className="flex justify-end items-center mb-">
        <button
          className="p-1 text-md  shadow-md active:shadow-[inset_0_0px_4px_rgba(0,0,0,0.2)] flex-[0.5] rounded-tl-md rounded-bl-md border"
          type="submit"
        >
          Send
        </button>
        <button
          className="p-1 text-md  shadow-md active:shadow-[inset_0_0px_4px_rgba(0,0,0,0.2)] flex-[0.5] rounded-tr-md rounded-br-md border"
          onClick={closePollForm}
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NewPollForm;
