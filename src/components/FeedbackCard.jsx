import React from "react";

const FeedbackCard = ({ content, name, title, img, firstCard }) => {
  const quotes =
    "https://ik.imagekit.io/Ayanabha1/quotes%20-%20Copy.png?updatedAt=1706025234291";
  return (
    <div
      className={`${
        firstCard && "feedback-card-1"
      } flex justify-between flex-col px-10 py-12 rounded-[20px] max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card`}
    >
      <img
        loading="lazy"
        src={quotes}
        alt="double_quotes"
        className="w-[42px] object-contain"
      />
      <p className="font-poppins font-normal text-[18px] leading-[32px] text-white my-10">
        {content}
      </p>

      <div className="flex flex-row">
        <img
          loading="lazy"
          src={img}
          alt={name}
          className="w-[48px] h-[48px] rounded-full object-cover"
        />

        <div className="flex flex-col ml-4">
          <h4 className="font-poppins font-semibold text-[18px] leading-[24px] text-white">
            {name}
          </h4>
          <p className="font-poppins font-normal text-[16px] text-dimWhite">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
