import React, { useState } from "react";
import "./App.css";
import IntroStickyBanner from "./Banners/IntroStickyBanner";
import SocialShareBanner from "./Banners/SocialShareBanner";
import FundScreen from "./FundScreen/FundScreen";
import IntroScreen from "./IntroScreen/IntroScreen";

import StoryScreen from "./StoryScreen/StoryScreen";
import Scroll from "react-scroll";
import { ScrollDirection } from "./Utils/utils";

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
    let scrollYAbsolute = element.clientHeight + element.scrollTop;
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
    console.log(currentScrollY);
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
        <StoryScreen scrollInfo={currentScrollY} />
      </ScrollElement>

      <ScrollElement name="FundScreen">
        <FundScreen />
      </ScrollElement>

      <IntroStickyBanner hidden={false} scrollInfo={currentScrollY} />
      <SocialShareBanner scrollInfo={currentScrollY} />
    </div>
  );
};

/*
function App() {
  const [isIntroStickyBannerHidden, setIsIntroStickyBannerHidden] = useState(
    false
  );
  const [slideNum, setSlideNum] = useState(1);
  const [introTextLabelIndex, setIntroTextLabelIndex] = useState(-1);
  const [isIntroTextHidden, setIsIntroTextHidden] = useState(true);
  const introTextLabelArr = [
    "Hi",
    "I'm Parth",
    "I am a 20 year old proud gay man.",
    "I have a dream to get a college degree",
    "This is my story",
  ];

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
      <IntroText
        hidden={isIntroTextHidden}
        labelTitle={introTextLabelArr[introTextLabelIndex]}
        labelSubtext={introTextLabelArr[introTextLabelIndex - 1]}
      />
      <InvisibleScroll
        threshmap={{
          10: (scroll_direction: ScrollDirection) => {
            let isScrollingDown = scroll_direction == ScrollDirection.Positive;
            setIsIntroStickyBannerHidden(isScrollingDown);
            setIsIntroTextHidden(!isScrollingDown);
            setSlideNum(isScrollingDown ? 2 : 1);
            setIntroTextLabelIndex(0);
            console.log(introTextLabelIndex);
          },
          20: (scroll_direction: ScrollDirection) => {
            let isScrollingDown = scroll_direction == ScrollDirection.Positive;
            setSlideNum(isScrollingDown ? 3 : 2);
            console.log(introTextLabelIndex);
            setIntroTextLabelIndex(1);
          },
          40: (scroll_direction: ScrollDirection) => {
            let isScrollingDown = scroll_direction == ScrollDirection.Positive;
            setSlideNum(isScrollingDown ? 4 : 3);
            console.log(introTextLabelIndex);
            setIntroTextLabelIndex(2);
          },
          60: (scroll_direction: ScrollDirection) => {
            let isScrollingDown = scroll_direction == ScrollDirection.Positive;
            setSlideNum(isScrollingDown ? 5 : 4);
            console.log(introTextLabelIndex);
            setIntroTextLabelIndex(3);
          },
          80: (scroll_direction: ScrollDirection) => {
            let isScrollingDown = scroll_direction == ScrollDirection.Positive;
            setSlideNum(isScrollingDown ? 6 : 5);
            console.log(introTextLabelIndex);
            setIntroTextLabelIndex(4);
          },
          90: (scroll_direction: ScrollDirection) => {
            let isScrollingDown = scroll_direction == ScrollDirection.Positive;
            setSlideNum(isScrollingDown ? 7 : 6);
          },
        }}
      />
      <IntroStickyBanner hidden={isIntroStickyBannerHidden} />
      <FundScreen />
    </div>
  );
}
*/

export default App;
