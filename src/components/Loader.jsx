import React from "react";
import { loader, loader2 } from "../assets";
import { useState } from "react";
import { useEffect } from "react";

const Loader = () => {
  const loaderStyle = {
    boxShadow: "1px 1px 5px rgb(0,0,0)",
  };
  const [loaderDots, setLoaderDots] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoaderDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div
      style={loaderStyle}
      className="absolute top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center text-[30px] text-white z-[50] bg-[rgba(0,0,0,0.5)] backdrop-blur-[10px]"
    >
      <p className="font-poppins flex">
        Loading <p className="font-poppins w-[1px]">{loaderDots}</p>
      </p>
    </div>
  );
};

export default Loader;
