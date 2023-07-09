import React from "react";
import { stats } from "../constants";
import styles from "../styles";

const Stats = () => {
  return (
    <section
      className={`${styles.flexCenter} items-center sm:flex-row flex-col flex-wrap sm:mb-20 mb-6 sm:mt-0 mt-20 `}
    >
      {stats.map((stat, i) => (
        <div
          key={stat.id}
          className={`flex-1 flex md:justify-start justify-center items-center xs:flex-row flex-col sm:m-3  sm:mb-3 mb-10 `}
        >
          <h4 className="font-poppins font-semibold xs:text-[40px] text-[30px] xs:leading-[53px] leading-[43px] text-white">
            {stat.value}
          </h4>
          <p className="font-poppins font-normal xs:text-[20px] text-[15px] xs:leading-[26px] leading-[21px] text-gradient uppercase ml-3">
            {stat.title}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Stats;
