import React from "react";
import PersonalityAnimatedBackground from "./PersonalityAnimatedBackground";
import logo from "./logo.svg";
import "./App.css";
import IntroStickyBanner from "./IntroStickyBanner";

function App() {
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
      <IntroStickyBanner />
    </div>
  );
}

export default App;
