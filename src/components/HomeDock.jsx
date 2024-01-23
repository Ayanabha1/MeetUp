import React, { useEffect, useState } from "react";
import styles from "../styles";
import { Navbar, Hero, Stats, Testimonials, Footer } from "./index";
import Features from "./Features";
import { Link } from "react-router-dom";

const HomeDock = () => {
  const home =
    "https://ik.imagekit.io/Ayanabha1/home%20-%20Copy.png?updatedAt=1706025236870";
  const feedback =
    "https://ik.imagekit.io/Ayanabha1/feedback%20-%20Copy.png?updatedAt=1706025237199";
  const features =
    "https://ik.imagekit.io/Ayanabha1/features%20-%20Copy.png?updatedAt=1706025237106";
  const user =
    "https://ik.imagekit.io/Ayanabha1/user.png?updatedAt=1706025234288";

  const [sidebarVis, setSidebarVis] = useState(false);
  const appearSidebar = () => {
    if (window.scrollY >= 300) {
      setSidebarVis(true);
    } else {
      setSidebarVis(false);
    }
  };

  useEffect(() => {
    document.title = "Meetup - Conquer Together";
    window.addEventListener("scroll", appearSidebar);

    return () => {
      window.removeEventListener("scroll", appearSidebar);
    };
  }, []);

  return (
    <div className="App-Dock bg-primary w-full h-full overflow-hidden">
      <div className={`sidebar-nav ${sidebarVis && "sidebar-nav-appear"}`}>
        <a href="#">
          <img loading="lazy" src={home} alt="home" />
        </a>
        <a href="#features">
          <img loading="lazy" src={features} alt="features" />
        </a>
        <a href="#feedbacks">
          <img loading="lazy" src={feedback} alt="feedback" />
        </a>
        <Link to="/profile">
          <img loading="lazy" src={user} alt="profile" />
        </Link>
      </div>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className="flex w-full xl:px-6">
          <Navbar />
        </div>
      </div>
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>
      <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Stats />
          <Features />
          <Testimonials />
        </div>
      </div>
    </div>
  );
};

export default HomeDock;
