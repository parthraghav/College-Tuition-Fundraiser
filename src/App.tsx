import React, { useState } from "react";
import "./App.css";
import IntroStickyBanner from "./Banners/IntroStickyBanner";
import SocialShareBanner from "./Banners/SocialShareBanner";
import FundScreen from "./FundScreen/FundScreen";
import IntroScreen from "./IntroScreen/IntroScreen";

import StoryScreen from "./StoryScreen/StoryScreen";
import Scroll from "react-scroll";
import { ScrollDirection } from "./Utils";

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

      <IntroStickyBanner hidden={false} scrollInfo={currentScrollY} />
      <SocialShareBanner scrollInfo={currentScrollY} />
    </div>
  );
};

export default App;
