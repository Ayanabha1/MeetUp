import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
const NewPollForm = ({ createPoll, closePollForm }) => {
  const optionLimit = 10;
  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState([
    {
      index: 0,
      option: "",
    },
  ]);

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

    const __options = options.map((op) => ({
      option: op.option?.trim(),
      votes: 0,
    }));

    const newForm = {
      prompt: prompt,
      options: __options,
      totalVotes: 0,
    };
    createPoll(newForm);
    closePollForm();
  };

  return (
    <form
      className="flex flex-col gap-2 border rounded-md p-2"
      onSubmit={(e) => {
        e.preventDefault();
        submitForm();
      }}
    >
      {/* Question */}

      <div>
        <label htmlFor="prompt" className="font-semibold">
          Prompt
        </label>
        <input
          id="prompt"
          type="text"
          className="w-full border p-1 rounded-md"
          placeholder="Please enter your prompt"
          onChange={(e) => changePrompt(e.target.value)}
        />
      </div>

      {/* Options */}
      <span>Options</span>

      {options.map((option, i) => (
        <div className="flex items-center gap-2">
          <span>{i + 1}. </span>
          <input
            key={i}
            type="text"
            className="w-full border rounded-md p-1"
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
        className="p-1 w-full shadow-md active:shadow-[inset_0_0px_4px_rgba(0,0,0,0.2)] border rounded-md"
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
          className="p-1 text-md  shadow-md active:shadow-[inset_0_0px_4px_rgba(0,0,0,0.2)] flex-[0.5] rounded-tl-md rounded-bl-md border"
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
