import React, { useState } from "react";
import "./App.css";
import IntroStickyBanner from "./Banners/IntroStickyBanner";
import SocialShareBanner from "./Banners/SocialShareBanner";
import FundScreen from "./FundScreen/FundScreen";
import IntroScreen from "./IntroScreen/IntroScreen";

import StoryScreen from "./StoryScreen/StoryScreen";
import Scroll from "react-scroll";
import { ScrollDirection } from "./Utils";

const ScrollIndicator = ({ scrollInfo }: any) => {
  const { scrollYAbsolute } = scrollInfo;
  const isVisible = scrollYAbsolute < 100;
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "10%",
        textAlign: "center",
        paddingTop: 20,
        top: isVisible ? 0 : "-20%",
        transition: "top 1s ease 0s, background 0.5s ease 0s",
        background: isVisible
          ? "linear-gradient(180deg, rgba(0, 0, 0, 0.4), transparent)"
          : "linear-gradient(0deg, transparent, transparent)",
      }}
    >
      <img
        style={{
          height: "60%",
          margin: "0px auto",
        }}
        src="https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2Fd49a075f-e639-450c-8418-3f356d8e4e49.gif?alt=media&token=c61a38d5-fb27-4e6e-94e5-64a8eab6b320"
      />
    </div>
  );
};

const App = () => {
  let ScrollElement = Scroll.Element;
  const [currentScrollY, setCurrentScrollY] = useState({
    scrollYAbsolute: 0,
    scrollYPercent: 0,
    scrollDirection: ScrollDirection.Negative,
  });

  function handleScroll(evt: any) {
    let element = evt.target;
    if (element.clientHeight === 0) {
      return;
    }
    // console.log(
    //   element.clientHeight,
    //   element.scrollTop,
    //   element.clientHeight + element.scrollTop
    // );
    // let scrollYAbsolute = element.clientHeight + element.scrollTop;
    let scrollYAbsolute = element.scrollTop;
    let scrollYPercent =
      (element.scrollTop * 100) / (element.scrollHeight - element.clientHeight);
    let scrollDirection = currentScrollY.scrollDirection;
    if (scrollYAbsolute > currentScrollY.scrollYAbsolute) {
      scrollDirection = ScrollDirection.Positive;
    } else if (scrollYAbsolute < currentScrollY.scrollYAbsolute) {
      scrollDirection = ScrollDirection.Negative;
    }
    setCurrentScrollY({
      scrollYAbsolute,
      scrollYPercent,
      scrollDirection,
    });
  }

  return (
    <div
      id="main"
      onScroll={handleScroll}
      style={{
        width: "100vw",
        height: "100vh",
        //height: "-webkit-fill-available",
        backgroundColor: "#f0eef1",
        position: "relative",
        overflow: "scroll",
      }}
    >
      <ScrollElement name="IntroScreen">
        <IntroScreen scrollInfo={currentScrollY} />
      </ScrollElement>

      <ScrollElement name="StoryScreen">
        <StoryScreen />
      </ScrollElement>

      <ScrollElement name="FundScreen">
        <FundScreen />
      </ScrollElement>

      <ScrollIndicator scrollInfo={currentScrollY} />
      <IntroStickyBanner hidden={false} scrollInfo={currentScrollY} />
      <SocialShareBanner scrollInfo={currentScrollY} />
    </div>
  );
};

export default App;
