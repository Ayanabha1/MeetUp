import React from "react";
import { BiErrorCircle } from "react-icons/bi";

export const Error = ({ message }) => {
  return (
    <p
      style={{
        color: "red",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
      }}
    >
      <BiErrorCircle style={{ marginRight: "5px" }} /> {message}
    </p>
  );
};
export const Success = ({ message }) => {
  return <p style={{ color: "limegreen" }}>{message}</p>;
};
