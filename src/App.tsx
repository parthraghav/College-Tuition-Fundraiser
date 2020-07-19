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
      <PersonalityAnimatedBackground />
      <InvisibleScroll
        threshmap={{
          20: (scroll_direction: ScrollDirection) => {
            console.log("i was called", scroll_direction);
            setIsIntroStickyBannerHidden(
              scroll_direction == ScrollDirection.Positive
            );
          },
        }}
      />
      <IntroStickyBanner hidden={isIntroStickyBannerHidden} />
    </div>
  );
}

export default App;
