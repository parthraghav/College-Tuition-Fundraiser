import React, { Component } from "react";
import AtomicImage from "./AtomicImage";

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

interface PersonalityAnimatedBackgroundState {
  window_width: number;
  window_height: number;
  backgroundLeftMargin: number;
  foregroundTransform: string;
}

export default class PersonalityAnimatedBackground extends Component<
  any,
  PersonalityAnimatedBackgroundState
> {
  foregroundToBackgroundHorizontalRatio: number = 0.32203389839 * 100;
  foregroundToBackgroundVerticalRatio: number = (210 / 551) * 100;

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

  set_goggle_pos = (goggle_pos: GogglePos) => {
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
    this.setState({
      foregroundTransform,
    });
  };

  set_background_pos = (background_pos: BackgroundPosition) => {
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

    this.setState({
      backgroundLeftMargin,
    });
  };

  render() {
    const img_width = this.state.window_height * (1080 / 564);
    return (
      <div
        style={{
          position: "absolute",
          left: this.state.backgroundLeftMargin + "px",
          transition: "left 2s",
          overflow: "hidden",
        }}
      >
        <img
          src="https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2F90497836_205798060836274_1081335742664220290_n.jpg?alt=media"
          onLoad={() => this.set_background_pos(BackgroundPosition.HalfLeft)}
          style={{
            width: `${img_width}px`,
            zIndex: 1,
          }}
        />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2F1431436876.png?alt=media"
          onLoad={() => this.set_goggle_pos(GogglePos.On)}
          style={{
            position: "absolute",
            width: this.foregroundToBackgroundHorizontalRatio + "%",
            top: this.foregroundToBackgroundVerticalRatio + "%",
            left: "50%",
            transform: this.state.foregroundTransform,
            zIndex: 2,
            transition: "transform 2s",
          }}
        />
      </div>
    );
  }
}
