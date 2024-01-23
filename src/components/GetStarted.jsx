import React from "react";
import styles from "../styles";

const GetStarted = () => {
  const topRight =
    "https://ik.imagekit.io/Ayanabha1/top-right.png?updatedAt=1706032517366";
  return (
    <div
      className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer`}
    >
      <div
        className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full`}
      >
        <div className={`${styles.flexStart} flex-rowrow`}>
          <p className="font-poppins font-medium text-[18px] leading-[23px] mr-4">
            <span className="text-gradient">Get</span>
          </p>
          <img src={topRight} alt="arrow" className="w-[18px] object-contain" />
        </div>
        <p className="font-poppins font-medium text-[18px] leading-[23px]">
          <span className="text-gradient">Started</span>
        </p>
      </div>
    </div>
  );
};

export default GetStarted;
