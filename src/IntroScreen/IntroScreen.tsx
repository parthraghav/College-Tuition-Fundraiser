import React, { Component } from "react";
import AtomicImage from "./AtomicImage";
import IntroStickyBanner from "../Banners/IntroStickyBanner";
import { ScrollConsumer } from "../ScrollContext";

enum GogglePos {
  Out,
  On,
  Down,
  Up,
}

enum BackgroundPosition {
  HalfLeft,
  Center,
}

interface IntroScreenState {
  window_width: number;
  window_height: number;
  backgroundLeftMargin: number;
  foregroundTransform: string;
}

export default class IntroScreen extends Component<any, IntroScreenState> {
  foregroundToBackgroundHorizontalRatio: number = 0.32203389839 * 100;
  foregroundToBackgroundVerticalRatio: number = (210 / 551) * 100;

  activation_table = {};

  constructor(props: any) {
    super(props);
    this.state = {
      window_width: 0,
      window_height: 0,
      backgroundLeftMargin: 0,
      foregroundTransform: "unset",
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      window_width: window.innerWidth,
      window_height: window.innerHeight,
    });
  }

  get_slide_details = (slideNum: number) => {
    let currentBackgroundPos, currentGogglePos;
    switch (slideNum) {
      case 1:
        currentBackgroundPos = BackgroundPosition.HalfLeft;
        currentGogglePos = GogglePos.On;
        break;
      case 2:
        currentBackgroundPos = BackgroundPosition.Center;
        currentGogglePos = GogglePos.Out;
        break;
      case 3:
        currentBackgroundPos = BackgroundPosition.Center;
        currentGogglePos = GogglePos.Out;
        break;
      case 4:
        currentBackgroundPos = BackgroundPosition.Center;
        currentGogglePos = GogglePos.Down;
        break;
      case 5:
        currentBackgroundPos = BackgroundPosition.Center;
        currentGogglePos = GogglePos.On;
        break;
      case 6:
        currentBackgroundPos = BackgroundPosition.Center;
        currentGogglePos = GogglePos.Up;
        break;
      case 7:
        currentBackgroundPos = BackgroundPosition.Center;
        currentGogglePos = GogglePos.Out;
        break;
      default:
        currentBackgroundPos = BackgroundPosition.Center;
        currentGogglePos = GogglePos.On;
        break;
    }
    return { currentBackgroundPos, currentGogglePos };
  };

  get_foreground_transform = (goggle_pos: GogglePos) => {
    var foregroundTransform;
    switch (goggle_pos) {
      case GogglePos.Out:
        foregroundTransform = "translate(0%, -1000%)";
        break;
      case GogglePos.On:
        foregroundTransform = "translate(-50%, 0%)";
        break;
      case GogglePos.Down:
        foregroundTransform = "translate(-50%, 20%)";
        break;
      case GogglePos.Up:
        foregroundTransform = "translate(-50%, -140%) scale(1,-1)";
        break;
    }
    // this.setState({
    //   foregroundTransform,
    // });
    return foregroundTransform;
  };

  get_background_left_margin = (background_pos: BackgroundPosition) => {
    var backgroundLeftMargin;
    const img_width = this.state.window_height * (1080 / 564);
    const window_width = this.state.window_width;

    switch (background_pos) {
      case BackgroundPosition.HalfLeft:
        backgroundLeftMargin = -img_width / 2;
        break;
      case BackgroundPosition.Center:
        backgroundLeftMargin = (window_width - img_width) / 2;
        break;
    }

    // this.setState({
    //   backgroundLeftMargin,
    // });
    return backgroundLeftMargin;
  };

  render() {
    const img_width = this.state.window_height * (1080 / 564);
    const { currentBackgroundPos, currentGogglePos } = this.get_slide_details(
      this.props.slideNum
    );
    const backgroundLeftMargin = this.get_background_left_margin(
      currentBackgroundPos
    );
    const foregroundTransform = this.get_foreground_transform(currentGogglePos);

    return (
      <ScrollConsumer>
        {({ scrollX, scrollY, isScrollingDown }) => (
          <div style={{ background: "gray", height: "200vh" }}>
            <div
              style={{
                position: "absolute",
                left: backgroundLeftMargin + "px",
                transition: "left 2s",
                overflow: "hidden",
              }}
            >
              <h1>{isScrollingDown}</h1>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2F90497836_205798060836274_1081335742664220290_n.jpg?alt=media"
                //onLoad={() => this.set_background_pos(BackgroundPosition.HalfLeft)}
                style={{
                  width: `${scrollY}px`,
                }}
              />
              <img
                src="https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2F1431436876.png?alt=media"
                //onLoad={() => this.set_goggle_pos(GogglePos.On)}
                style={{
                  position: "absolute",
                  width: this.foregroundToBackgroundHorizontalRatio + "%",
                  top: this.foregroundToBackgroundVerticalRatio + "%",
                  left: "50%",
                  transform: foregroundTransform,
                  transition: "transform 2s",
                }}
              />
            </div>
          </div>
        )}
      </ScrollConsumer>
    );
  }
}
