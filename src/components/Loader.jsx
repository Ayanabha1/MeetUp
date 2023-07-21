import React from "react";
import { loader, loader2 } from "../assets";

const Loader = () => {
  const loaderStyle = {
    boxShadow: "1px 1px 5px rgb(0,0,0)",
  };

  return (
    <div
      style={loaderStyle}
      className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 p-2 bg-[rgba(255,255,255,0.8)] w-[100px]  rounded-[5px] flex flex-col items-center justify-center "
    >
      <img src={loader2} alt="" />
      <span className="font-poppins">Loading</span>
    </div>
  );
};

export default Loader;
