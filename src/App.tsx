import React, { useState } from "react";
import PersonalityAnimatedBackground from "./PersonalityAnimatedBackground";
import logo from "./logo.svg";
import "./App.css";
import IntroStickyBanner from "./IntroStickyBanner";
import InvisibleScroll, { ScrollDirection } from "./InvisibleScroll";

function App() {
  const [isIntroStickyBannerHidden, setIsIntroStickyBannerHidden] = useState(
    false
  );
  const [slideNum, setSlideNum] = useState(1);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        //height: "-webkit-fill-available",
        backgroundColor: "#f0eef1",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <PersonalityAnimatedBackground slideNum={slideNum} />
      <InvisibleScroll
        threshmap={{
          20: (scroll_direction: ScrollDirection) => {
            let isScrollingDown = scroll_direction == ScrollDirection.Positive;
            setIsIntroStickyBannerHidden(isScrollingDown);
            setSlideNum(isScrollingDown ? 2 : 1);
          },
          30: (scroll_direction: ScrollDirection) => {
            let isScrollingDown = scroll_direction == ScrollDirection.Positive;
            setSlideNum(isScrollingDown ? 3 : 2);
          },
          40: (scroll_direction: ScrollDirection) => {
            let isScrollingDown = scroll_direction == ScrollDirection.Positive;
            setSlideNum(isScrollingDown ? 4 : 3);
          },
          50: (scroll_direction: ScrollDirection) => {
            let isScrollingDown = scroll_direction == ScrollDirection.Positive;
            setSlideNum(isScrollingDown ? 5 : 4);
          },
          60: (scroll_direction: ScrollDirection) => {
            let isScrollingDown = scroll_direction == ScrollDirection.Positive;
            console.log("should be up");
            setSlideNum(isScrollingDown ? 6 : 5);
          },
          70: (scroll_direction: ScrollDirection) => {
            let isScrollingDown = scroll_direction == ScrollDirection.Positive;
            setSlideNum(isScrollingDown ? 7 : 6);
          },
        }}
      />
      <IntroStickyBanner hidden={isIntroStickyBannerHidden} />
    </div>
  );
}

export default App;
