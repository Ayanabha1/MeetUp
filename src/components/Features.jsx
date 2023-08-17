import { features } from "../constants";
import styles, { layout } from "../styles";
import Button from "./Button";
import { Fade } from "react-reveal";

const FeatureCard = ({ icon, title, content, index }) => (
  <div
    className={`flex flex-row p-6 rounded-[20px] 
  ${index !== features.length - 1 ? "mb-6" : "mb-0"} feature-card`}
  >
    <div
      className={`w-[64px] h-[64px] ${styles.flexCenter} rounded-full bg-dimBlue`}
    >
      <img src={icon} alt="icon" className="w-[30px] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1 ">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px] mb-1 ">
        {content}
      </p>
    </div>
  </div>
);

const Features = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <section id="features" className={`${layout.section}`}>
      <div className={`${layout.sectionInfo}`}>
        <h2 className={styles.heading2}>
          You build relations, <br /> While we handle the connections.
        </h2>
        <p className={`${styles.paragraph} max-w-[600px] mt-5`}>
          At Meetup, we harness the power of seamless video calls to unite
          people. By enabling face-to-face interactions, we bring individuals
          together, regardless of distance, fostering authentic connections.
          Build meaningful relationships, both personally and professionally,
          with Meetup's transformative video call platform.
        </p>
        <div onClick={() => scrollToTop()}>
          <Button styles="mt-10" />
        </div>
      </div>

      <Fade bottom distance="10%">
        <div className={`${layout.sectionImg} flex-col `}>
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} {...feature} index={index} />
          ))}
        </div>
      </Fade>
    </section>
  );
};

export default Features;
