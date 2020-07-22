import React, { Component } from "react";
import Scroll from "react-scroll";
import "./styles.css";

const scroller = Scroll.scroller;

interface IntroStickyBannerState {}

/********************************/

interface LinkTextProps {
  label: string;
  onClick: Function;
}
const LinkText = ({ label, onClick }: LinkTextProps) => (
  <div onClick={() => onClick()} className="defocused">
    <span style={{ color: "#4B89F6" }}>{label}</span>
  </div>
);

/********************************/

interface LinkButtonProps {
  label: string;
  onClick: Function;
}
const LinkButton = ({ label, onClick }: LinkTextProps) => (
  <div
    className="defocused"
    onClick={() => onClick()}
    style={{
      background: "linear-gradient(#4B89F6,#2E7AFF)",
      padding: 10,
      borderRadius: 50,
      textAlign: "center",
      marginTop: 4,
      marginBottom: 4,
    }}
  >
    <span style={{ color: "#FFFFFF" }}>{label}</span>
  </div>
);

function scrollToStoryScreen() {
  scroller.scrollTo("StoryScreen", {
    duration: 1500,
    delay: 100,
    smooth: true,
    containerId: "main",
    offset: 0,
  });
}

function scrollToFundScreen() {
  scroller.scrollTo("FundScreen", {
    duration: 1500,
    delay: 100,
    smooth: true,
    containerId: "main",
    offset: 0,
  });
}

export default class IntroStickyBanner extends Component<
  any,
  IntroStickyBannerState
> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "20%",
          bottom: this.props.hidden ? "-20%" : 0,
          color: "white",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          transition: "bottom 1s",
          backgroundImage:
            "url('https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2F35324523450203539_364356239.png?alt=media')",
        }}
      >
        <div style={{ display: "flex", flex: 0, height: "100%" }}>
          <div
            style={{
              flexBasis: 2,
              display: "flex",
              flexGrow: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ padding: 10 }}>
              <p style={{ margin: 0 }}>
                Help me release my transcripts from a business hold. Since
                coming out as gay, my financial support has been rescinded.
              </p>
              <LinkText
                label="Read more"
                onClick={() => scrollToStoryScreen()}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexBasis: 1,
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <LinkButton
                label="Invest $10"
                onClick={() => scrollToFundScreen()}
              />
              <span>In my future</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
