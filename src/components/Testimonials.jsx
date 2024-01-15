import { feedback } from "../constants";
import styles from "../styles";
import FeedbackCard from "./FeedbackCard";
import { Fade } from "react-awesome-reveal";

const Testimonials = () => {
  return (
    <section
      id="feedbacks"
      className={`${styles.paddingY} ${styles.flexCenter} flex-col relative`}
    >
      {/* Gradient */}
      <div className="absolute z-[0] w-[60%] h-[60%] -left-[50%] rounded-full blue__gradient" />
      <div className=" w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]">
        <h1 className={`${styles.heading2} text-center sm:text-left`}>
          What people are <br /> saying about us
        </h1>
        <div className="w-full md:mt-0 mt-6 flex justify-center sm:justify-normal">
          <p
            className={`${styles.paragraph} text-center sm:text-left md:text-right max-w-[500px] `}
          >
            Seamless video calls creating meaningful interactions. Join Meetup
            now for endless networking possibilities.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 sm:justify-start justify-center w-full feedback-container relative z-[1]">
        <Fade
          cascade
          damping={0.1}
          triggerOnce
          className="flex feedback-container-fade-container"
        >
          {feedback.map((card, i) => (
            <FeedbackCard key={i} {...card} firstCard={i === 0} />
          ))}
        </Fade>
      </div>{" "}
    </section>
  );
};

export default Testimonials;
