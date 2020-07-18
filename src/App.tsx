import React, {useState} from "react";
import PersonalityAnimatedBackground from "./PersonalityAnimatedBackground";
import logo from "./logo.svg";
import "./App.css";
import IntroStickyBanner from "./IntroStickyBanner";
import InvisibleScroll from "./InvisibleScroll";

function App() {

  const [ isIntroStickyBannerHidden, setIsIntroStickyBannerHidden ] = useState(false);

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
      <InvisibleScroll threshmap={{
        20: (isApproaching:boolean) {
          setIsIntroStickyBannerHidden(!isApproaching);
        },

      }} />
      <IntroStickyBanner hidden={isIntroStickyBannerHidden} />
    </div>
  );
}

export default App;
