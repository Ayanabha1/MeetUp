import { features } from "../constants";
import styles, { layout } from "../styles";
import Button from "./Button";

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
      <div className={`${layout.sectionInfo} text-center sm:text-left`}>
        <h2 className={styles.heading2}>
          You build relations, <br /> We'll handle connections.
        </h2>
        <p className={`${styles.paragraph} max-w-[600px] mt-5`}>
          At Meetup, we harness the power of seamless video calls to unite
          people. By enabling face-to-face interactions, we bring individuals
          together, regardless of distance, fostering authentic connections.
          Build meaningful relationships, both personally and professionally,
          with Meetup's transformative video call platform.
        </p>
        <div
          onClick={() => scrollToTop()}
          className="flex justify-center sm:justify-start w-full"
        >
          <Button styles="mt-10" />
        </div>
      </div>

      <div className={`${layout.sectionImg} flex-col mt-[100px] md:mt-0`}>
        {features.map((feature, index) => (
          <FeatureCard key={feature.id} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Features;
