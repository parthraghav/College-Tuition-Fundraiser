import React, { useState, createRef, useRef } from "react";
import PersonalityAnimatedBackground from "./IntroScreen/PersonalityAnimatedBackground";
import logo from "./logo.svg";
import "./App.css";
import IntroStickyBanner from "./Banners/IntroStickyBanner";
import SocialShareBanner from "./Banners/SocialShareBanner";
import InvisibleScroll, { ScrollDirection } from "./InvisibleScroll";
import IntroText from "./IntroText";
import FundScreen from "./FundScreen/FundScreen";
import { Controller, Scene } from "react-scrollmagic";
import { Tween, Timeline } from "react-gsap";
import IntroScreen from "./IntroScreen/IntroScreen";
import { ScrollProvider } from "./ScrollContext";
import StoryScreen from "./StoryScreen/StoryScreen";
import Scroll from "react-scroll";

const App = () => {
  let appRef = useRef(null);
  let ScrollElement = Scroll.Element;

  return (
    <ScrollProvider scrollContainerRef={appRef}>
      <div
        id="main"
        ref={appRef}
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
          <IntroScreen />
        </ScrollElement>

        <ScrollElement name="StoryScreen">
          <StoryScreen />
        </ScrollElement>

        <ScrollElement name="FundScreen">
          <FundScreen />
        </ScrollElement>

        <IntroStickyBanner hidden={false} />
        {/* <SocialShareBanner /> */}
      </div>
    </ScrollProvider>
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
